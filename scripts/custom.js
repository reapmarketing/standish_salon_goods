/** Activation of scripts and app code
 *  @Author Lauren
 **/
;(function($) {
	var Standish = {};

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
			'.column .eqhgt-g1'
		];
		resizeColumns(groups);
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
	});
	// Add callback to window resize event
	$(window).on('resize', function() {
		Standish.EqualHeights();
	});
	
})(jQuery);
