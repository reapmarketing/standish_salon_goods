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
	
	Standish.CollapseMenus = function() {
			
	}
	

	// Events
	$(function() {
		Standish.EqualHeights();
	});
	// Add callback to window resize event
	$(window).on('resize', function() {
		Standish.EqualHeights();
	});
	
})(jQuery);
