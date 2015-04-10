/** Activation of scripts and app code
 *  @Author Lauren
 **/
;(function($) {
	$.Standish = (function() {});
	window.Standish = window.Standish || {};

	Standish.EqualHeights = function() {
		function resizeColumns(groups) {
			$.each(groups, function(index, value) {
				$(value).matchHeight({
					byRow: true,
					property: 'height',
					target: null,
					remove: false
				});
			});
		}
		var groups = [
			'.listing',
			'.listing .listing-container',
			'.column .eqhgt',
			'.column .eqhgt-g1',
			'.pricebox-eqhgt'
		];
		resizeColumns(groups);
	}
	
	Standish.SearchForm = function() {
		var tabletBkPt = 991;
		
		if ( $(window).width() <= tabletBkPt) {
			$("form[name=searchForm]").children('.input-group').addClass('form-group-lg');
		}
		if ( $(window).width() > tabletBkPt) {
			if ( $("form[name=searchForm]").children('.input-group').hasClass('form-group-lg')) {
				$("form[name=searchForm]").children('.input-group').removeClass('form-group-lg');
			}
		}
		
	}
	
	// Do different things based on the template slug
	Standish.TemplateSwitcher = function() {
			template_slug = $('.template').first().data('template');
			switch(template_slug) {
				case 'home':
					// Remove breadcrumbs from home page because
					// it is not a valid variable and shows an ugly
					// bracket listing on this page:
					$('.breadcrumb').hide();
				return;
			}
	}

	// Events
	$(function() {
		Standish.EqualHeights();
		Standish.TemplateSwitcher();
		Standish.SearchForm();
	});
	// Add callback to window resize event
	$(window).on('resize', function() {
		Standish.EqualHeights();
		Standish.SearchForm();
	});
	
})(jQuery);
