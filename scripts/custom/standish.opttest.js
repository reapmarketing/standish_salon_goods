(function($) {

  optTestNum = '';

  optTestRunning = false;

  var getBadges = function() {
    // ---- FIELD 8: BADGES ---- //
    var badges = $( '.field8' ).data( 'field8' );
    var badges_list = [];

    var badgetext = {
      'affordable-imports': {
        'title': 'Affordable Import',
        'class': 'affordable-imports',
        'tooltip': 'Affordable Import Product quality assured right here in the USA!'
      },
      'free-shipping': {
        'title': 'Free Shipping',
        'class': 'free-shipping',
        'tooltip': 'This product qualifies for free shipping!'
      },
      'fire-retardant': {
        'title': 'Fire Retardant',
        'class': 'fire-retardant',
        'tooltip': 'When you shop at Standish, you can rest assured that your chairs meet the California TB117 Fire Retardant Standards.'
      },
      'heavy-duty': {
        'title': 'Heavy Duty Hardware',
        'class': 'heavy-duty',
        'tooltip': 'At Standish, we provide you with quality parts on your equipment, such as cabinet hinges that are able to withstand everyday salon and spa use.'
      },
      'iron-life': {
        'title': '50% Longer Iron Life',
        'class': 'iron-life',
        'tooltip': 'On many of our stations, the appliance holders are made of iron, and powder-coated steel. Even better, they\'re ventilated.'
      },
      'ten-thousand-rub': {
        'title': '10,000 Rub Count',
        'class': 'ten-thousand-rub',
        'tooltip': 'Leather chairs are not build to withstand the salon lifestyle--they will not hold up. We use vinyl that is certified over 10,000 rubs on the Wyzenbeek rub test.'
      },
      'swap-base': {
        'title': 'Swappable Bases for Free',
        'class': 'swap-base',
        'tooltip': 'At Standish, we let you pick out whichever base you want for your chair top, at no extra charge!'
      },
      'new-arrival': {
        'title': 'New Arrival',
        'class': 'new-arrival',
        'tooltip': ''
      },
      'service': {
        'title': 'Personal Service',
        'class': 'service',
        'tooltip': ''
      },
      'warranty': {
        'title': '2-5 Yr. Warranty',
        'class': 'warranty',
        'tooltip': 'We understand that products need some love in order to stay looking new and beautiful. The quality of our products is something that we stand firmly behind, which is why we have the best warranty out there.'
      },
      'color': {
        'title': 'Free Color Variations',
        'class': 'color',
        'tooltip': ''
      },
      'returns': {
        'title': 'No Hassle Return Policy',
        'class': 'returns',
        'tooltip': 'At Standish, we will offer you a 30-day money-back guarantee on all products.'
      },
      'hardwood': {
        'title': 'Real Hardwood',
        'class': 'hardwood',
        'tooltip': ''
      },
      'extra-wide': {
        'title': 'Extra Wide',
        'class': 'extra-wide',
        'tooltip': ''
      },
      'double-stitched': {
        'title': 'Double Stitching',
        'class': 'double-stitched',
        'tooltip': ''
      },
      'inspected': {
        'title': 'Guaranteed To Pass Inspection',
        'class': 'inspected',
        'tooltip': 'All of our products pass fire retardant codes and meet Universal Plumbing Code (UPC) specifications.'
      },
      'made-usa': {
        'title': 'Made in the USA',
        'class': 'made-usa',
        'tooltip': 'Proudly Made in the USA!'
      },
      'gluten-free': {
        'title': 'Gluten Free',
        'class': 'gluten-free',
        'tooltip': "We want to respect your skin, and in doing so, we've taken into account gluten allergies and offer a product that is gluten-free."
      },
      'paraben-free': {
        'title': 'Paraben Free',
        'class': 'paraben-free',
        'tooltip': "Our products are delivered to you fresh, so you don't have to worry about extra additives and preservatives like Parabens."
      }, 
      'vegan': {
        'title': 'Vegan',
        'class': 'vegan',
        'tooltip': "We love your skin, we love the environment, and we love animals. With this gluten-free product, you have something to benefit all three."
      },
      'oil-free': {
        'title': 'Oil Free',
        'class': 'oil-free',
        'tooltip': "Keep your pores clear and your skin looking great when you use this oil-free product"
      },
      'soap-free': {
        'title': 'Soap Free',
        'class': 'soap-free',
        'tooltip': "We want to make sure you get the most out of this product, and by not using soap as ingredient, we do just that!"
      },
      'hypoallergenic': {
        'title': 'Hypoallergenic',
        'class': 'hypoallergenic',
        'tooltip':  "Sensitive skin? Don't worry, we've got you covered. This product is hypoallergenic and thoughtful of all skin types."
      },
      'sulfate-free': {
        'title': 'Sulfate Free',
        'class': 'sulfate-free',
        'tooltip': "You want the best for your skin and so do you. With Sulfate-Free products, we're able to do just that."
      }
    };

    if( badges ) {
      badges = badges.split(/(\s+)/);
      $.each( badges, function( i, v ) {
        var badgeslug = v.trim();
        if( typeof( badgetext[badgeslug] ) != 'undefined' ) {
          badges_list.push( { 'className': badgetext[badgeslug].class, 'title': badgetext[badgeslug].title } );
        }     
      });
    }
    return badges_list;
  };

  var listingPagePlacementModel = function() {
    var self = this;

    self.testActivated = true;

    self.name = Standish.SiteListing.name;
    self.price = Standish.SiteListing.price;
    self.title = Standish.SiteListing.name;
    self.id = Standish.SiteListing.id;

    self.price = Standish.SiteListing.price;
    self.savings = Standish.SiteListing.savings;
    self.onSale = self.savings !== "" ? true : false;

    self.category = Standish.SiteListing.category;
    self.list = Standish.SiteListing.list;
    self.position = Standish.SiteListing.position;
    self.partnum = Standish.SiteListing.partnum;
    self.numReviews = Standish.SiteListing.numReviews;

    var reviewAvg = parseInt(Standish.SiteListing.reviewAvg),
        reviewsArr = [],
        negReviewsArr = [];

    for (var i = 0; i < reviewAvg; i++) {
      reviewsArr.push(i);
    }
    self.reviewAvg = reviewsArr;

    for (var x = reviewAvg; x < 5; x++) {
      negReviewsArr.push(x);
    }
    self.negReviews = negReviewsArr;


    self.headerSlidesBackground = Standish.SiteListing.loadedImages || [];
    self.activeImg = ko.observable(self.headerSlidesBackground[0].image);

    self.setActiveImg = function(img) {
      self.activeImg(img);
    };

    var formHtmlPlace = $('form.product-form').clone(true);

    $('form.product-form').remove();

    self.formHtml = function() {
      return formHtmlPlace[0].outerHTML;
    };

    self.badges = getBadges();

    console.log(self.badges);


  };

  function preliminaryFab() {
    $('.post-header-slides').insertAfter('nav');
    $('#product-description-whole-inner').removeClass('col-md-12').addClass('col-sm-8');
    $('#post-header-breadcrumb-search').hide();
    $('#product-head').hide();
    $('#product-badges-container').remove();
    $('#product-whole-wrapper').hide();
    $('.related-products .listing').removeClass('col-md-2').addClass('col-md-3');
  }

  function init() {

    preliminaryFab();


    var listingPlace = new listingPagePlacementModel();
    ko.applyBindings(listingPlace);

  }


  init();

})(jQuery);
