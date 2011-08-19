var INTEGRALLIS = {};
INTEGRALLIS.commerce = {};

INTEGRALLIS.commerce.ShoppingCart = function(options) {
	// initializes the cart
	this.items = {};
	
	// callbacks
	var defaults = {
		removeAll: function() {},
		updateTotal: function() {},
       	updateItemQuantity: function() {},
       	removeItem: function() {}
	};
	
	// merge options with defaults
	for (property in defaults) { 
		if (!options.hasOwnProperty(property)) { 
			options[property] = defaults[property]
		} 
	}
	
	this.options = options;
}

// removes all items from the cart
INTEGRALLIS.commerce.ShoppingCart.prototype.clear = function() {
	this.items = {};
	this.options.removeAll();
	this.options.updateTotal();
}

// returns the value of all items in the cart
INTEGRALLIS.commerce.ShoppingCart.prototype.total = function() {
	var sum = 0.0;
	for (var index in this.items) {
		var item = this.items[index];
		sum = sum + (item.price * item.quantity);
	}
	return sum;
}

// returns the number of unique items in the cart
INTEGRALLIS.commerce.ShoppingCart.prototype.itemsCount = function() {
	var size = 0, key;
    for (key in this.items) {
        if (this.items.hasOwnProperty(key)) size++;
    }

	return size;
}

// returns whether the cart is empty or not
INTEGRALLIS.commerce.ShoppingCart.prototype.isEmpty = function() {
	return this.itemsCount() == 0;
}
	
// adds a new item to the cart or increases the quantity of an existing item
INTEGRALLIS.commerce.ShoppingCart.prototype.add = function(id, price, quantity) {
	var is_new;
	quantity = (typeof(quantity) != 'undefined') ? quantity : 1;
	if (this.items.hasOwnProperty(id)) {
		var item = this.items[id];
		item.quantity = item.quantity + quantity;
		this.options.updateItemQuantity(id);
		this.options.updateTotal();
		is_new = false;
	}
	else {
	    this.items[id] = { quantity : quantity, price : price };
	    this.options.updateTotal();
	    is_new = true;
    }
    return is_new;
}
		
// increases the quantity of an item in the cart
INTEGRALLIS.commerce.ShoppingCart.prototype.increase = function(id, quantity) {
	quantity = (typeof(quantity) != 'undefined') ? quantity : 1;
	if (this.items.hasOwnProperty(id)) {
		var item = this.items[id];
		item.quantity = item.quantity + quantity;
		this.options.updateItemQuantity(id);
		this.options.updateTotal();
	}
}
		
// decreases the quantity of an item in the cart
INTEGRALLIS.commerce.ShoppingCart.prototype.decrease = function(id, quantity) {
	quantity = (typeof(quantity) != 'undefined') ? quantity : 1;
	if (this.items.hasOwnProperty(id)) {
		var item = this.items[id];
		if (item.quantity >= quantity) {
		    item.quantity = item.quantity - quantity;
	    }
	    else {
		    item.quantity = 0;
	    }
		this.options.updateItemQuantity(id);
		if (item.quantity == 0) {
			delete this.items[id];
			this.options.removeItem(id);
		}
		this.options.updateTotal();
	}
}
		
// returns the quantity of an item in the cart
INTEGRALLIS.commerce.ShoppingCart.prototype.quantityFor = function(id) {
	return this.items.hasOwnProperty(id) ? this.items[id].quantity : 0;
} 