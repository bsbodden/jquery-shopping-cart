// create a shopping cart instance, set all callbacks
var myShoppingCart = new INTEGRALLIS.commerce.ShoppingCart({ removeItem : removeItem,
	                                                         removeAll : removeAll,
	                                                         updateTotal : updateCartTotal,
	                                                         updateItemQuantity : updateItemQuantity });
	
// shopping cart UI callbacks

function updateItemQuantity(id) {
	$('#cart #' + id)
	    .children('#qty')
	    .text(myShoppingCart.quantityFor(id))
	    .effect("highlight", {}, 1500);		
}

function updateCartTotal() {
	$('#total').text(myShoppingCart.total()).effect("highlight", {}, 1500);
}

function removeItem(id) {
	$('#cart #' + id).effect("puff", {}, "slow", function(){ $(this).remove(); });
}

function removeAll() {
	$('#cart .product').effect("puff", {}, "slow", function(){ $('#cart').empty(); });
}

function decorateForCart(item, id) {
	   item.append(' (<span id="qty">1</span>)')
           .append(' <a href="#" id="add">+</a>')
           .append(' <a href="#" id="remove">-</a>');
       item.children('#add').click(function() {
	       myShoppingCart.increase(id);
       });
       item.children('#remove').click(function() {
	       myShoppingCart.decrease(id);
       });
}

$(document).ready(function() {
	// make products draggable
	$(".product").draggable({ helper: 'clone', opacity: "0.5" });
	
	// allow products to be dropped in the cart
	$("#cart").droppable({ accept: '.product', 
	                       drop: function(ev, ui) {
						       var item_dropped = ui.draggable;
						       var id = item_dropped.attr('id');
					           var price = item_dropped.attr('price');	      
						       if (myShoppingCart.add(id, price)) {
							       var item = item_dropped.clone();
							       decorateForCart(item, id);
							       $(this).append(item);
						       }
		                   }
	});
	
	// jquery-fy the 'clear shopping cart' button
	$('#dump').button().click(function() { myShoppingCart.clear() });
});