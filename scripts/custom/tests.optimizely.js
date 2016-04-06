;(function() {


  // window.optimizely = window.optimizely || [];
  // window.optimizely.push(["activate", 4970230722]);

  OptTest.homepageHozSlider = function() {
    $('.video_popup_hoz_slider').slick('reInit', function() {
      if ($(this).slick('slickCurrentSlide') === 4) {
        window.optimizely = window.optimizely || [];
        window.optimizely.push(["activate", 4970230722]);
      }
    });
  }

  OptTest.menuHover = function() {
    $('a[title="Tools"]').on('hover', function() {
      window.optimizely = window.optimizely || [];
      // window.optimizely.push(["activate", 4970230722]);
    });
  }

  




})(window.Standish.OptTest = window.Standish.OptTest || {}, jQuery)