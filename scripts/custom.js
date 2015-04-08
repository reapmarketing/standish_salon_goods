/** Activation of scripts and app code
 *  @Author Lauren
 **/


;(function($) {
	$(function(){
		// Initialize certian groups to have matching heights
		$('.listing').matchHeight({
			byRow: true,
			property: 'height',
			target: null,
			remove: false
		});
		$('.listing .listing-container').matchHeight({
			property: 'height',
			byRow: true,
			target: null,
			remove: false
		});
		$('.column .eqhgt').matchHeight({
			property: 'height',
			byRow: true,
			target: null,
			remove: false
		});
		$('.column .eqhgt-g1').matchHeight({
			property: 'height',
			byRow: true,
			target: null,
			remove: false
		});
	});
	
})(jQuery);

/* MobileMenu custom class */
// Get custom menu from menu-options.json and aggregate it into a div container
(function( MobileMenu, $, undefined ) {
	
	MobileMenu.convertToArray = function(data) {
		var array = [];
		for ( var key in data ) {
			array[key] = data[key];
		}
		return array;
	}
	
	// Sort the menu items according to object's order property
	MobileMenu.sortItems = function(menuItems) {
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
	
	MobileMenu.getItems = function() {
		return $.getJSON('https://json.stand.sh/standish/menu-custom.json', function(data) {
				
			var menuItems = [],
					unList = [];
			// Convert to array
			menuItems = MobileMenu.convertToArray(data);
			// Sort the menu items according to order property
			menuItems = MobileMenu.sortItems(menuItems);
			
			// Traverse through my object
			for (var key in menuItems) {
				if (menuItems[key].show_mobile === true) {
					unList[key]	= '';
					unList[key]	+= '<li>';
					if ( menuItems[key].url !== undefined ) {
						unList[key] += '<a href="' + menuItems[key].url + '">';
					}
					else {
						unList[key] += '<a href="">';
					}	
					unList[key] += key + '</a>';
					if (menuItems[key].subcategories !== undefined) {
						var subcategories = menuItems[key].subcategories,
								subcategories = MobileMenu.convertToArray(subcategories),
								subcategories = MobileMenu.sortItems(subcategories);
								// subcategories = sortItems(subcategories);
						
						unList[key]	+= '<ul>';
						
						for (var k in subcategories) {
							unList[key]	+= '<li>';
							if ( subcategories[k].url !== undefined ) {
								unList[key] += '<a href="' + subcategories[k].url + '">';
							}
							else {
								unList[key] += '<a href="">';
							}	
							unList[key]	+= k;
							unList[key]	+= '</a>';
							unList[key]	+= '</li>';
						}
						unList[key]	+= '</ul>';
						unList[key]	+= '</li>';
					}
					else {
						unList[key]	+= '</li>'
					}
				}
				
			}
			unList = MobileMenu.convertToArray(unList);
			
			for (var i in unList) {
				$('#mobile-menu').append(unList[i]);
			}
		});
	}
})(window.MobileMenu = window.MobileMenu || {}, jQuery);

// Activate My Class
(function($) {
	// Document Ready
	$(function() {
			MobileMenu.getItems().done(function(context) {
				$('.toggle-navigation').sidr({
					source: '#mobile-menu'	
				});
				console.log('menu is done :>')});
	});
	
} (jQuery));
