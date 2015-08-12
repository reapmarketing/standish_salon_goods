/**
 *  @Author Lurn
 **/
(function($) {
	
	// Call Once Function if it needs to be used for ajax purposes
	var callOnce = function(selector, processed, context, callback) {
		var element = $(selector, context);
		if ((element.length > 0) && !element.hasClass(processed)) {
			callback(element.addClass(processed));
		}
	};
	 
	 
}(jQuery));
 


/* MobileMenu custom class */
// Get custom menu from menu-options.json and aggregate it into a div container
(function( MobileMenu, $, undefined ) {

	convertToArray = function(data) {
		var array = [];
		for ( var key in data ) {
			array[key] = data[key];
		}
		return array;
	}

	// Sort the menu items according to object's order property
	sortItems = function(menuItems) {
		return menuItems.sort(function( a , b ) {
			if (a.order > b.order) {
				return 1;
			}
			if (a.order < b.order) {
				return -1;	
			}
			return 0;	
		});
	}


	MobileMenu.init = function() {	
		var el = this;

		$('.toggle-navigation').sidr({
			name: 'mobile-open',
			side: 'right',
			source: '.main-navigation',
			onOpen: function() {
				$('.sidr-inner > ul > li.sidr-class-subcategories').each(function() {
					var el = this;
					$(el).on('click', '.sidr-class-menu-open', function(e) {
						e.preventDefault();
						$(this).siblings('.sidr-class-mobile-menu').toggle();
						$(el).siblings().children('.sidr-class-mobile-menu').hide();
					});
				});
			}
		});
	}

})(window.Standish.MobileMenu = window.Standish.MobileMenu || {}, jQuery);

// Activate My Class
(function($) {
	// Document Ready
	$(function() {
		Standish.MobileMenu.init();
	});
} (jQuery));