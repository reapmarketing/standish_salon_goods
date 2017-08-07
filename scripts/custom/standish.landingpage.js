(function( LandingPage, $, undefined ) {

	LandingPage.WhyStandish = LandingPage.WhyStandish || {};

	LandingPage.WhyStandish = {
		slides: function() {
			if ( $(window).width() > 425 ) {

				$('[data-img-load]').magnificPopup({
					type:'image',
					closeBtnInside: '',
					index: $('[data-img-load]').attr('data-index'),
					gallery: {
						enabled: true
					}
				});
			}
			else {
				$('.why-buy__imspiration-local__row').slick({
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true
				});
			}
		}
	};
	$(function() {
		LandingPage.WhyStandish.slides();
	});

})(window.Standish.Promotions = window.Standish.Promotions || {}, jQuery);