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
	};

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
	};
	var jsonUrl = 'https://raw.githubusercontent.com/reapmarketing/standish_salon_goods/master/scripts/menu-custom.json';

	// todo: create menu walker!
	// Convert json data into a menu
	MobileMenu.getItems = function() {
		return $.getJSON(jsonUrl, function(data) {
			var menuItems = [],
					unList = [], linkurl;
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
						linkurl = menuItems[key].url;
					}
					else {
						linkurl = '';
					}
					if (menuItems[key].subcategories !== undefined) {
						unList[key] += '<a class="menu-open" href="' + linkurl + '">';
					}
					else {
						unList[key] += '<a href="' + linkurl + '">';
					}
					
					unList[key] += key + '</a>';
					if (menuItems[key].subcategories !== undefined) {
						var subcategories = menuItems[key].subcategories,
								subcategoriesA = convertToArray(subcategories),
								subcategoriesB = sortItems(subcategoriesA);
						
						unList[key]	+= '<ul class="mobile-menu hidden menu" style="display:none;">';
						
						for (var k in subcategoriesB) {
							unList[key]	+= '<li>';
							if ( subcategoriesB[k].url !== undefined ) {
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
						unList[key]	+= '</li>';
					}
				}
			}
			unList = convertToArray(unList);
			$('#mobile-menu-json').append('<ul />');
			for (var i in unList) {
				$('#mobile-menu-json > ul').append(unList[i]);
			}
		});
	};

	MobileMenu.init = function() {	
		var el = this;		
		return el.getItems().done(function(context) {

			console.log($('#mobile-menu-json').length);
			$('.toggle-navigation').sidr({
				name: 'mobile-open',
				side: 'left',
				source: '#mobile-menu-json',
				onOpen: function() {
					var el = this;
					$('body').on('click', "#mobile-open", function(event) {
						this.stopPropagation();
						this.preventDefault();
					}).on('click', this, function(e) {
						if ($('body').hasClass('sidr-open')) {
							e.preventDefault();
						}
						console.log(e);
						$.sidr('close', 'mobile-open');
					});
				}
			});
			$('.sidr-inner > ul > li.sidr-class-subcategories').each(function() {
				var el = this;
				$(el).on('click', '.sidr-class-menu-open', function(e) {
					e.preventDefault();

					$(this).toggleClass('open-caret');
					$(this).siblings('.sidr-class-mobile-menu').toggle();
					$(el).siblings().children('.sidr-class-mobile-menu').hide();
				});
			});

			$('.standish-contact').on('click', function(e) {
				e.preventDefault();
				$('#rainbow-hamburger').slideToggle();
			});
			$('#rainbow-hamburger .close-icon').on('click', function(e) {
				$('#rainbow-hamburger').slideToggle();
			});
			
			
		});
	};

})(window.Standish.MobileMenu = window.Standish.MobileMenu || {}, jQuery);

// Activate My Class
(function($) {
	// Document Ready
	$(function() {
		Standish.MobileMenu.init();
	});
} (jQuery));