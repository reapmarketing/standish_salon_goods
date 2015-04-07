// Activation and app code

;(function($) {
	$(function(){
		$('.listing').matchHeight({
			byRow: true,
			property: 'height',
			target: null,
			remove: false
		});
		/*$('.listing').matchHeight({
			byRow: true,
			property: 'height',
			target: null,
			remove: false
		});*/
	});
})(jQuery)