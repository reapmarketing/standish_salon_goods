/**
 *  @Author Lurn
 **/
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

	// todo: create menu walker!
	// Convert json data into a menu
	MobileMenu.getItems = function() {
		return $.getJSON('https://json.stand.sh/standish/menu-custom.json', function(data) {

			var menuItems = [],
					unList = [];
			// Convert to array
			menuItems = convertToArray(data);
			// Sort the menu items according to order property
			menuItems = sortItems(menuItems);

			// Traverse through my object
			for (var key in menuItems) {
				if (menuItems[key].show_mobile === true) {
					unList[key]	= '';
					if (menuItems[key].subcategories !== undefined) {
						unList[key]	+= '<li class="subcategories">';
					}
					else {
						unList[key]	+= '<li>';
					}
					if ( menuItems[key].url !== undefined ) {
						unList[key] += '<a class="menu-open" href="' + menuItems[key].url + '">';
					}
					else {
						unList[key] += '<a class="menu-open" href="">';
					}	
					unList[key] += key + '</a>';
					if (menuItems[key].subcategories !== undefined) {
						var subcategories = menuItems[key].subcategories,
								subcategories = convertToArray(subcategories),
								subcategories = sortItems(subcategories);
								// subcategories = sortItems(subcategories);
						
						unList[key]	+= '<ul class="mobile-menu hidden menu" style="display:none;">';
						
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
			unList = convertToArray(unList);
			$('#mobile-menu').append('<ul />');
			for (var i in unList) {
				$('#mobile-menu > ul').append(unList[i]);
			}
		});
	}

	MobileMenu.init = function() {	
		var el = this;		
		return el.getItems().done(function(context) {
			$('.toggle-navigation').sidr({
				name: 'mobile-open',
				source: '#mobile-menu'
			});
			$('.sidr-inner > ul > li.sidr-class-subcategories').each(function() {
				var el = this;
				$(el).on('click', '.sidr-class-menu-open', function(e) {
					e.preventDefault();
					$(this).siblings('.sidr-class-mobile-menu').toggle();
					$(el).siblings().children('.sidr-class-mobile-menu').hide();
				});
			});
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