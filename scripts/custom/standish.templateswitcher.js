;(function($) {
  $.Standish = (function() {});
  window.Standish = window.Standish || {};

  // Do different things based on the template slug
  // @todo Activate class functions based on template slug here
  Standish.TemplateSwitcher = function() {
    template_slug = $('.template').first().data('template');
    switch ( template_slug ) {
      // case for product pages
      case 'listing_3':
        var inlineScript = document.createElement('inlineScript');
        inlineScript.id = 'listing';
        inlineScript.src = '/assets/templates/standish-responsive/scripts/custom/listing-scripts.js';
        document.head.appendChild(script);
      return;
      case 'listing_0':
      case 'listing_1':
        // Activate Standish.SiteListing
        if (Standish.SiteListing) {
          $('#loadingDiv').height($('.product_left').height());

          var sitelisting = Standish.SiteListing.Slider.init();
          Standish.SiteListing.financing();
          Standish.SiteListing.salePrice();
          Standish.SiteListing.doBadges();
          Standish.SiteListing.commenceGrid();
          Standish.SiteListing.getBrand();
          Standish.SiteListing.getAvailability();
          Standish.SiteListing.productDetailsFormat();
          Standish.SiteListing.updatePricing();
          Standish.SiteListing.changeColorsSlides();
        }
      return;
      case 'listing_2':
        // Activate Standish.SiteListing
        if (Standish.SiteListing) {
          $('#loadingDiv').height($('.product_left').height());

          var sitelisting2 = Standish.SiteListing.Slider.init().then(function() {
            $('.main-slider').show();
            $('.sub-slider').show();
            $('#loadingDiv').hide();
          });
          Standish.SiteListing.addToWishlist();
          Standish.SiteListing.financing();
          Standish.SiteListing.salePrice();
          Standish.SiteListing.doBadges();
          Standish.SiteListing.commenceGrid();
          Standish.SiteListing.getBrand();
          Standish.SiteListing.getAvailability();
          Standish.SiteListing.productDetailsFormat();
          Standish.SiteListing.updatePricing();
          Standish.SiteListing.changeColorsSlides();
        }
        hbspt.forms.create({ 
          portalId: '239485',
          formId: 'f1f6150e-c064-474e-889d-e5060e3e6ba7',
          target: '#hs-quote',
          css: '',
          onFormReady: function() {
            // --- REQUEST A QUOTE ---- ONLY TEMPALTE LISTING_2 -- form has already been added --- //
            $('.request-quote').on('click', function(e) {
              e.preventDefault();
              $('.modal.modal-request-quote').modal();
            }); 
          }
        });
      break;
      case 'home':
        // Activate Standish.Homepage
        if (Standish.Homepage) {
          Standish.Homepage.homepageHozSlider();
          Standish.Homepage.videosFeed();
          Standish.Homepage.videosFeedSlider();
          Standish.Homepage.homepageBrands();
        }
      return;
      default:
      return;
    }
  };
  

})(jQuery);