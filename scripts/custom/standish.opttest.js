(function($) {

  optTestNum = '';

  optTestRunning = false;




  var listingPagePlacementModel = function() {

    this.testActivated = true;

    this.name = Standish.SiteListing.name;
    this.price = Standish.SiteListing.price;
    this.title = Standish.SiteListing.name;
    this.id = Standish.SiteListing.id;

    this.price = Standish.SiteListing.price;
    this.savings = Standish.SiteListing.savings;
    this.onSale = this.savings !== "" ? true : false;

    this.category = Standish.SiteListing.category;
    this.list = Standish.SiteListing.list;
    this.position = Standish.SiteListing.position;
    this.partnum = Standish.SiteListing.partnum;
    this.numReviews = Standish.SiteListing.numReviews;

    var reviewAvg = parseInt(Standish.SiteListing.reviewAvg),
        reviewsArr = [],
        negReviewsArr = [];

    for (var i = 0; i < reviewAvg; i++) {
      reviewsArr.push(i);
    }
    this.reviewAvg = reviewsArr;

    for (var i = reviewAvg; i < 5; i++) {
      negReviewsArr.push(i);
    }
    this.negReviews = negReviewsArr;


    this.headerSlidesBackground = Standish.SiteListing.loadedImages || [];
    this.activeImg = this.headerSlidesBackground[0].image;

    var formHtmlPlace = $('form.product-form').clone(true);

    this.formHtml = function() {
      return formHtmlPlace[0].outerHTML;
    };


  }

  function preliminaryFab() {
    $('.post-header-slides').insertAfter('nav');
    $('#product-description-whole-inner').removeClass('col-md-12').addClass('col-sm-8');
    $('#post-header-breadcrumb-search').hide();
    $('#product-head').hide();
    $('#product-badges-container').remove();
    $('#product-whole-wrapper').hide();

  }

  function init() {

    preliminaryFab();


    var listingPlace = new listingPagePlacementModel();
    ko.applyBindings(listingPlace);

  }


  init();

})(jQuery);
