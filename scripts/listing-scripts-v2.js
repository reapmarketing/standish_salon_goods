
// Async Loading of Pinterest Pin-It Button Script
(function(d){
  var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
  p.type = 'text/javascript';
  p.async = true;
  p.src = 'https://assets.pinterest.com/js/pinit.js';
  f.parentNode.insertBefore(p, f);
}(document));

// Async Tweet This Button Script
/* // Twitter implementation has been manually create to support changing the message after DOM load.
!function(d,s,id){
  var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
  if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}
}(document, 'script', 'twitter-wjs');
*/

// Async Facebook Like Button Script
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=163542803667984";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// jQuery
(function($) {
  
  // ---- PRICEBOX FINANCING FEATURE ---- //
  var interest_rate, term_years, price, yearly_interest, total_interest, payment;
  interest_rate = 0.12;
  term_years = 3;
  price = Number( $('#price').text().replace("$", "").replace(",", "") );
  yearly_interest = Math.round( ( price * interest_rate ) * 100 ) / 100;
  total_interest = Math.round( ( yearly_interest * term_years ) * 100 ) / 100;
  payment = ( Math.round( ( ( total_interest + price ) / ( term_years * 12 ) ) * 100 ) / 100 ).toFixed(2);
  // console.log( "PRICE: ", price, yearly_interest, total_interest, payment );
  if( price > 1000 ) {
    $(".pricebox .left-price").append('<a href="/financing.html" class="financing">* or as low as $' + payment + '/month</a>');
  }

  // ---- IMAGE COLOR CHANGING FEATURE ---- //
  color_list = [];
  $('.showcase a').each( function( i, v ) {
    if( $(v).data('caption') ) {
      color_list.push( $(v).data('caption').trim().toLowerCase() );
    }
  });
  // console.log( color_list );

  $('.option-row').each( function( i, v ) {
    if( $(v).find('label').text().toLowerCase().indexOf("color") ) {
      $(v).on('change', function( e ) {
        // image_click( $(v).find('select')[0].selectedIndex + 1 );  // Match Index
        current_color_text = $(v).find('select option:selected').text().trim().toLowerCase();
        image_click( $.inArray( current_color_text, color_list ) + 1 );
      });
    }
  });


  // ---- ADD PRICE SALE CORNERTAG ---- //
  // SalePrice display and sale cornertag activation on Listing Page
  // SalePrice Checker
  var price = $('#price').text().replace('$','').replace(',',''),
  price = parseInt(price);
  var saleprice = $('#saleprice').text().replace('$','').replace(',','');

  if (typeof saleprice != undefined && saleprice != 0) {
    saleprice = parseInt(saleprice);
    $('.pricebox').addClass('sale-cornertag');
    $('.strike-perhaps').addClass('strike');

    if( price != saleprice ) {
      $('#price.price').text('$' + saleprice);
    }
  }
  else {
    $('#saleprice').parent().hide();
  }

  // ---- FIELD 2: BROCHURE LINK ---- //
  var brochure = $( '.field2' ).data( 'field2' );
  var brochureLink = $( '.brochure-download a' );
  if( brochure !== '' ){
    brochureLink.text( 'Download Brochure' ).attr( 'href', brochure );
  }
  // ---- BROCHURE LINK CALLBACK DOWNLOAD HUBSPOT FORM ---- //
  // Hubspot + Vex Popup form
  $('.brochure-download a').first().on( 'click', function( e ) {
    e.preventDefault();
    vex.open({
      // content: '<p>Please provide your email address</p>',
      afterOpen: function() {
        hbspt.forms.create({
          portalId: '239485',
          formId: '253a1f08-bebc-40c3-ab80-88ac7e518e74',
          target: '.vex-content',
          redirectUrl: $( '.brochure-download a' ).attr('href'),
          onFormReady: function() {
            if( !$( '.vex-content .hs_email' ).length > 0 ) {
              $( '.vex-content .hs-button' ).click();
            }
          }
        });
      }
    });
  });

  // ---- FIELD 3: Availability Text ---- //
  var availability = $( '.field3' ).data( 'field3' );
  if( availability != null ) {
    var availabilityText = $( '.availability' );
    if( availability != '' ){
      availabilityText.text( availability.replace() );
    }
  }

  

  // ---- FIELD 5: Price Drop Notification Form ---- //
  var priceDropForm = $( '.field5' ).data( 'field5' );
  if( priceDropForm != null ) { 
    var priceDropTitle = $('<h4 class="priceDropTitle">Notify Me When The Price Drops!</h4><div class="priceDropForm"></div>');
    var priceDropButton = $('<a class="button medium priceDropButton">I want to be the first to know &raquo;</a>');
    $('.product-options').append( priceDropTitle, priceDropButton );
  }
  // ---- HUBSPOT PRICE DROP NOTIFICATION DROPDOWN ---- //
  $(document).on('click', '.priceDropButton', function( e ) {
    e.preventDefault();
    vex.open({
      // content: '<p>Please provide your email address</p>',
      afterOpen: function() {
        hbspt.forms.create({
          css: '',
          portalId: '239485',
          formId: priceDropForm,
          target: '.vex-content',
          submitButtonClass: 'hs-button primary medium button',
          onFormReady: function() {
            $( '.vex-content .hs-input' ).first().focus();
          }
        });
      }
    });
  });


  // ---- FIELD 7: Product Details List ---- //
  var details = $( '.field7' ).data( 'field7' );
  var $detailsList = $( '.details-list' );

  if( details ){
    $detailsList.find( 'li' ).remove();
    $.each( details.split( '\n' ), function( i, v ){
      $detailsList.append( '<li><span>' + v + '</li></span>' );
    });
  } else {
    $('.product-details').hide();
  }

  // ---- FIELD 8: BADGES ---- //
  var badges = $( '.field8' ).data( 'field8' );
  var $badges = $( '.badges' );
  var $badges_list = $( '.badges-list' );

  var badgetext = {
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
    'no-sales-tax': {
      'title': 'No Sales Tax',
      'class': 'no-sales-tax',
      'tooltip': ''
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
  }

  if( badges ) {
    badges = badges.split(/(\s+)/);
    $.each( badges, function( i, v ) {
      var badgeslug = v.trim();
      if( typeof( badgetext[badgeslug] ) != 'undefined' ) {
//        console.log( badgetext[badgeslug].title );
        $badges_list.append( '<a href="http://www.standishsalongoods.com/quality#' + badgetext[badgeslug].class + '" style="display:block;color:#696969;" class="badge-product badge-' + badgetext[badgeslug].class + '" title="' + badgetext[badgeslug].tooltip + '"><i></i><div class="badge-text">' + badgetext[badgeslug].title + '</div></a>' );
      }     
    });

  } else {
    $badges.remove();
  }

  // ---- FIELD 9: TWEET TEXT ---- //
  var tweet_text = $( '.field9' ).data( 'field9' );
  // console.log( tweet_text );

  // Default Share Message

  short_description = 'Standish Salon Goods is a seller of uncommonly cool salon chairs, salon furniture, and salon goods at great prices';

  if( tweet_text != null ) {
    short_description = tweet_text;
  }

  // console.log( 'tweet: ' + short_description );

/*
  var $detailsList = $( '.details-list' );
  $.each( details.split( '\n' ), function( i, v ){
    $detailsList.append( '<li><span>' + v + '</li></span>' );
  });
*/

  // Pin-it Link helper
  pinimage = encodeURIComponent( 'http://' + document.domain + '/' + $( '.product-image' ).first().attr( 'href' ) );
  pindescription = encodeURIComponent( short_description );
  pinurl = encodeURIComponent( document.URL );

  // Pulls first sentance from the description (Old way)
  // short_description = $('.extended-description').text().split('.')[0] + '.';

  $( '.pinit a' ).attr('href', 'http://www.pinterest.com/pin/create/button/?url=' + pinurl + '&amp;media=' + pinimage + '&amp;description=' + pindescription );

  // Twitter Implementation
  $( '.tweet_button' ).attr('href', 'https://twitter.com/intent/tweet?url=' + pinurl + '&text=' + pindescription );
  // Reload the button, after change above
  // twttr.widgets.load();

  


  var SiteListing = function() {};

  SiteListing.prototype = {
    activateSlideShow: function() {

      $('.main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.sub-slider'
      });
      $('.sub-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        centerMode: false,
        asNavFor: '.main-slider',
        focusOnSelect: true
      });

    },
    switchImageSlideshow: function() {
      $('.sub-slider').on('init', function(event, slick) {
        var mainSlides = [];

        $(slick['$slides']).each(function(i,v) {
          var imgHref = $(v).attr('href'),
              origImgLoaded = $('.main-slider').find('img:first-of-type').attr('data-href');

          if (typeof imgHref !== 'undefined' && imgHref !== origImgLoaded) {
            var slideElement = '<a href="'+imgHref+'" class="MagicZoomPlus" id=""><img itemprop="image" src="thumbnail.asp?file='+imgHref+'&maxx=400&maxy=0" align="middle" border="0" id="large" name="large" alt="" width="380" /></a>';
            $('.main-slider').slick('slickAdd', slideElement);
          }
        });
      });
    },
    addVideoToSlider: function() {
      var video_embed_codes = '';

      if( embed_data = $( '.field10' ).data( 'field10' ) ) {
        video_embed_codes = embed_data.split( ' ' );
      }

      function getData(embed_code) {
        var baseUrl = "https://fast.wistia.com/oembed/?url=";
        var accountUrl = encodeURIComponent("https://home.wistia.com/medias/");
        return $.getJSON(baseUrl + accountUrl + embed_code + "&format=json&callback=?");
      }

      /* ~~ Variable Declaration ~~ */
      var AJAX = [], video_data = {}, video_markup_main, video_markup_sub = '', imgUrl, videoData, slideHtml;

      if( video_embed_codes ) {
        $.each( video_embed_codes, function( i, embed_code ) {
          if (embed_code !== "") {
            AJAX.push( getData( embed_code ) );
          }
        });

        $.when.apply($, AJAX).done(function(){

          for(var i = 0; i < AJAX.length; i++){
            if( arguments[i].length ) {
              video_data[video_embed_codes[i]] = arguments[i][0];
            } else {
              video_data[video_embed_codes[i]] = arguments[0];
            }
          }
          $.each( video_data, function( i, video ) {
            // console.log(video);
            video_markup_main = '';
            video_markup_main += '<a href="#" class="video_popup" data-video="'+ i +'" id="listing_main_image_link">';
            video_markup_main += '<i class="icon-play-sign" style="font-size: 120px;position: absolute;text-decoration: none;top: 3rem;left: 31%;"></i>';
            video_markup_main +=  '<img itemprop="image" src="thumbnail.asp?file='+ video.thumbnail_url +'&maxx=440&maxy=0" align="middle" border="0" id="large" name="large" alt="'+ video.title +'" width="380" data-href="'+ video.thumbnail_url +'" />';
            video_markup_main += '</a>';

            $('.main-slider').slick('slickAdd', video_markup_main);
          });

          $.each( video_data, function( i, video ) {
            video_markup_sub = '';
            video_markup_sub += '<a data-caption="'+ video.title +'" href="'+ video.thumbnail_url +'" rel="thumb-id:listing_main_image_link" rev="thumbnail.asp?file='+ video.thumbnail_url +'&amp;maxx=400&amp;maxy=0">';
            video_markup_sub +=  '<img border="0" src="thumbnail.asp?file='+ video.thumbnail_url +'&amp;maxx=75&amp;maxy=75" alt="" name="" />';
            video_markup_sub += '</a>';

            $('.sub-slider').slick('slickAdd', video_markup_sub);
          });

          $('.video_popup').on( 'click', function( e ) {
            // console.log(e);
            e.preventDefault();
            var video = $(this).data('video');
            console.log(video_data[video]);
            vex.open({
              content: video_data[video].html,
              contentCSS: { 'padding': '0', 'width': '960px' }
            });
          });
        });
      }
    },
    addInstagramToSlider: function() {
      // ---- FIELD 4: Instagram Hashtag ---- //
      var instagramHashtag = $( '.field4' ).data( 'field4' );
      if( instagramHashtag != null ) {
        // var instaText = "<h6 style='text-align:center; text-transform: uppercase;'>TAG PHOTOS OF YOUR SALON WITH #"+instagramHashtag+" AND MENTION @STANDISHSTUFF TO SEE YOUR PHOTOS BELOW!</h6>";
        // console.log( 'Instagram', instagramHashtag, instaText );
        // The limit parameter does not seem to work, this is an Instagram API issue. (not an issue with instafeed) I've implemented a bit of css to limit the display to 3 instead.
        var feed = new Instafeed({
          get: 'tagged',
          tagName: instagramHashtag,
          clientId: '87b875b4c64341998ef11099c0a71f76',
          mock: true,
          limit: 3,
          success: function(data) {
            // console.log(data);
            $(data.data).each(function(i, v) {
              console.log(v);
              var classname, dataVideo;
              /* Add conditions for instagram video! */
              if (v.type === "video") {
                classname = 'video_popup';
                dataVideo = v.videos.low_bandwidth.url;
              }
              else {
                classname = 'MagicZoomPlus';
                dataVideo = false;
              }

              video_markup_main = '';
              video_markup_main += '<a href="'+v.link+'" class="'+classname+'" data-video-insta="'+ dataVideo +'" id="listing_main_image_link">';
              if (v.type === "video") {
                video_markup_main += '<i class="icon-play-sign" style="font-size: 120px;position: absolute;text-decoration: none;top: 3rem;left: 31%;"></i>';
              }
              video_markup_main +=  '<img itemprop="image" src="'+ v.images.standard_resolution.url +'" align="middle" border="0" id="large" name="large" alt="'+  v.caption.text +'" width="380" data-href="'+ v.images.standard_resolution.url +'" />';
              video_markup_main += '</a>';
              $('.main-slider').slick('slickAdd', video_markup_main);
            });

            $(data.data).each(function(i, v) {
              video_markup_sub = '';
              video_markup_sub += '<a data-caption="'+ v.caption.text +'" href="'+ v.images.thumbnail.url +'" rel="thumb-id:listing_main_image_link" rev="thumbnail.asp?file='+ v.images.thumbnail.url +'&amp;maxx=400&amp;maxy=0">';
              video_markup_sub +=  '<img border="0" src="thumbnail.asp?file='+ v.images.thumbnail.url +'&amp;maxx=75&amp;maxy=75" alt="" name="" />';
              video_markup_sub += '</a>';

              $('.sub-slider').slick('slickAdd', video_markup_sub);
            });

            
          }
        });
        feed.run();
      }
    }
  }

  var sitelisting = new SiteListing;
  $(function() {
    if (typeof $.fn.slick === "function") {
      sitelisting.switchImageSlideshow();
      sitelisting.activateSlideShow();
      sitelisting.addVideoToSlider();
      sitelisting.addInstagramToSlider();
    }
    
  });
  
} (jQuery));