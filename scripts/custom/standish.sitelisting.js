(function( SiteListing, $, undefined ) {


  /** ~~Start Slider JS -- Add existing images to
  /* main slider then add wistia and instagram ~~ */
  SiteListing.Slider = SiteListing.Slider || {};

  /* My new slider wooooo */
  SiteListing.NewSlider = SiteListing.NewSlider || {};

  SiteListing.Slides = SiteListing.Slides || {};
  SiteListing.Slides.content = SiteListing.Slides.content || [];


  SiteListing.Slider.init = function() {
    var dfd = $.Deferred();
    // Promises for each function ensure that everything has loaded.
    // Add videos then images  
    Standish.SiteListing.NewSlider.addRegImagesToSlideshow().done(function() {
      Standish.SiteListing.NewSlider.addVideoImagesToSlideshow().done(function() {
        // Do all the templating now that my object is ready

        SiteListing.Slider.activateSlickTemplating();
        SiteListing.Slider.activateFilters();

        $('.main-slider').show();

        $('#loadingDiv').hide();

        $('.sub-slider').show();
        $('.nav-filters').show();

        addVideosToContentSection(Standish.SiteListing.Slides.content);
        SiteListing.Slider.activateVideos();

        dfd.resolve( "done" );
        return dfd.promise();
      });
    });

  };

  SiteListing.Slider.activateVideos = function() {
    $('.video_popup').on( 'click', function( e ) {
      // e.preventDefault();
      var videoID = $(this).data('video');

      /* Go through the global window object
      and check to see if its there */ 
      var videoObj = Standish.SiteListing.Slides.content.filter(function(value) {
        if (value.videoID === videoID) {
          return value;
        }
      });

      if (videoObj.length > 0) {
        vex.open({
          content: videoObj[0].videoHTML,
          contentCSS: { 'padding': '0' }
        });
      }
    });
  };

  function addVideosToContentSection(slides) {

    slides.filter(function(value) {
      if (value.type === "video") {
        //console.log(slide);
        var video_markup_main = '<div class="col-md-4 col-sm-6"><a class="video_popup" data-video="'+value.videoID+'" data-type="'+value.type+'" data-media-source="'+value.source+'">';
        video_markup_main += '<i class="fa fa-play play-button" style="font-size: 4em;position: absolute;text-decoration: none;"></i>';
        video_markup_main +=  '<img itemprop="image" src="'+ value.image +'" align="middle" id="large" alt="'+ value.title +'" width="100%" data-href="'+ value.thumbnail +'" />';
        video_markup_main += '</a></div>';

        $('#product-videos-header .details-video').append(video_markup_main);
      }
    });
  }

  SiteListing.Slider.activateFilters = function() {
    if (typeof $.fn.slick === "function" && $('.template').attr('data-template')) {
      Standish.SiteListing.filtered = false;
      Standish.SiteListing.currentFiltered = '';

      $('.show-all').on('click', function(e) {
        e.preventDefault();
        $('.filterProductImg').prop('checked', false);
        $('.sub-slider').slick('slickUnfilter');
      });

      $('.filterProductImg').on('change', function(){

        $('.filterProductImg').not(this).prop('checked', false);

        var filterName = $(this).data('filter-media');
        if ( Standish.SiteListing.filtered === false || Standish.SiteListing.currentFiltered !== filterName ) {
          $('.sub-slider').slick('slickUnfilter');

          $('.sub-slider').slick('slickFilter', '[data-media-source="'+filterName+'"]');

          Standish.SiteListing.currentFiltered = filterName;
          Standish.SiteListing.filtered = true;
        } else {
          $('.sub-slider').slick('slickUnfilter');
          // $(this).text('Filter Slides');
          Standish.SiteListing.filtered = false;
        }
      });
    }
  };

  SiteListing.Slider.activateSlickTemplating = function() {
    if (typeof $.fn.slick === "function" && $('.template').attr('data-template')) {
      var mainVidTpl = function(slide) {
        var video_markup_main = '<a class="video_popup" data-video="'+slide.videoID+'" data-type="'+slide.type+'" data-media-source="'+slide.source+'">';
        video_markup_main += '<i class="fa fa-play play-button" style="font-size: 7em;position: absolute;text-decoration: none;"></i>';
        video_markup_main +=  '<img itemprop="image" src="'+ slide.image +'" align="middle" id="large" alt="'+ slide.title +'" width="100%" data-href="'+ slide.thumbnail +'" />';
        video_markup_main += '</a>';
        return video_markup_main;
      }, navVidTpl = function(slide) {
        /* Add videos to sub slick slider */
        var video_markup_sub = '<a data-caption="'+ slide.title +'" data-video="'+slide.videoID+'" data-media-source="'+slide.source+'"><i class="fa fa-play" aria-hidden="true"></i>';
        video_markup_sub +=  '<img src="'+ slide.thumbnail +'" alt="" />';
        video_markup_sub += '</a>';
        return video_markup_sub;
      }, mainNatTpl = function(slide) {
        var markup_main = '<a data-caption="'+ slide.title +'" data-media-source="'+slide.source+'"><img itemprop="image" src="'+ slide.image +'" id="large" alt="'+ slide.title +'" style="max-height: 375px; text-align: center;"/></a>';
        return markup_main;
      }, navNatTpl = function(slide) {
        /* Add videos to sub slick slider */
        var markup_sub = '<a data-caption="'+ slide.title +'" data-video="'+slide.videoID+'" data-media-source="'+slide.source+'"><i class="fa fa-camera" aria-hidden="true"></i>';
        markup_sub +=  '<img src="'+ slide.thumbnail +'" alt="" />';
        markup_sub += '</a>';
        return markup_sub;
      };
      $(Standish.SiteListing.Slides.content).each(function(i,v) {
        if ( v.source == "wistia" ) {
          $('.main-slider').append(mainVidTpl(v));
          $('.sub-slider').append(navVidTpl(v));
        }
        if ( v.source == "3DCart" ) {
          $('.main-slider').append(mainNatTpl(v));
          $('.sub-slider').append(navNatTpl(v));
        }
      });
      $('.main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        centerMode: false,
        arrows: false,
        asNavFor: '.sub-slider'
      });
      $('.sub-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        variableWidth: true,
        centerMode: false,
        asNavFor: '.main-slider',
        focusOnSelect: true
      });
    }
  };

  /* Video Utility Functions */
  function getData(embed_code) {
    var baseUrl = "https://fast.wistia.com/oembed/?url=";
    var accountUrl = encodeURIComponent("https://home.wistia.com/medias/");
    return $.getJSON(baseUrl + accountUrl + embed_code + "&format=json&callback=?");
  }

  function parseEmbedData(selector) {
    var embed_data = $( '.field10' ).attr( 'data-field10' );

    if( typeof embed_data !== 'undefined' ) {
      embed_data = embed_data.trim();
      video_embed_codes = embed_data.split( ' ' );
      return video_embed_codes;
    }
    else {
      $('.nav-filters > label:nth-of-type(2)').css('display', 'none');
      return false;
    }
  }
  /* End -- Video Utility Functions */

  function pushHello(index, type, pushedObj, pushObj) {
    var source = (type == "video") ? 'wistia' : 'instagram';

    pushedObj.push(
      {
        title: pushObj.title,
        type: type,
        videoID: video_embed_codes[index],
        videoHTML: pushObj.html,
        image: pushObj.thumbnail_url,
        thumbnail: pushObj.thumbnail_url + '&image_crop_resized=75x75',
        source: source
      }
    );
  }

  SiteListing.NewSlider.addRegImagesToSlideshow = function() {
    if (Standish.SiteListing.loadedImages.length > 0) {
      var dfd = $.Deferred();
      
      if ( Standish.SiteListing.Slides.content instanceof Array ) {
        Standish.SiteListing.Slides.content = Standish.SiteListing.Slides.content.concat(Standish.SiteListing.loadedImages);
          dfd.resolve( "Native Content Returned" );
      }
      else {
        Standish.SiteListing.Slides.content = Standish.SiteListing.Slides.content.push(Standish.SiteListing.loadedImages);
          dfd.resolve( "Native Content Returned" );
      }
      return dfd.promise();
    }
  };

  SiteListing.NewSlider.addVideoImagesToSlideshow = function() {
    /* ~~ Variable Declaration ~~ */
    var dfd = $.Deferred();

    var AJAX = [],
        video_embed_codes = parseEmbedData('.field10'),
        videoHello = [];
    // console.log(video_embed_codes);

    if (video_embed_codes) {
      $.each( video_embed_codes, function( i, embed_code ) {
        if (embed_code !== "") {
          AJAX.push(getData( embed_code ));
        }
      });
      // console.log('ajax', AJAX);
      $.when.apply($, AJAX).done(function() {
        for ( var i = 0; i < AJAX.length; i++ ) {
          if ( arguments[i].length ) {
            // video_data[video_embed_codes[i]] = arguments[i][0];
            pushHello(i, 'video', videoHello, arguments[i][0]);

          } else {
            // video_data[video_embed_codes[i]] = arguments[0];
            pushHello(i, 'video', videoHello, arguments[0]);
          }
        }
        Standish.SiteListing.Slides.content = Standish.SiteListing.Slides.content.concat(videoHello);
        dfd.resolve( "hurray" );
      });
    }
    else {
      dfd.resolve( "No Video Codes" );
    }
    return dfd.promise();
  };

  /*
  The code below will change
  instagram integration has
  yet to be decided upon.
  */
  SiteListing.Slider.addInstagramToSlider = function() {

    // ---- FIELD 4: Instagram Hashtag ---- //
    var instagramHashtag = $( '.field4' ).data( 'field4' );

    if( typeof instagramHashtag !== 'undefined' ) {
      // var instaText = "<h6 style='text-align:center; text-transform: uppercase;'>TAG PHOTOS OF YOUR SALON WITH #"+instagramHashtag+" AND MENTION @STANDISHSTUFF TO SEE YOUR PHOTOS BELOW!</h6>";
      // //console.log( 'Instagram', instagramHashtag, instaText );
      // The limit parameter does not seem to work, this is an Instagram API issue. (not an issue with instafeed) I've implemented a bit of css to limit the display to 3 instead.
      var feed = new Instafeed({
        get: 'user',
        clientId: '950c733b1e9e4ceb9501cd339ae2edae',
        accessToken: '17236515.1677ed0.b21a263c14b04df69f2932b06ebf799f',
        userId: 17236515,
        limit: 3,
        filter: function(image) {
          return image.tags.indexOf('standishcharlotte') > 0;
        },
        mock: true,
        success: function(data) {
          $(data.data).each(function(i, v) {
            var classname, dataVideo, instaHeight;
            /* Add conditions for instagram video! */
            if (v.type === "video") {
              classname = 'video_popup';
              dataVideo = v.videos.low_bandwidth.url;
            }
            else {
              classname = '';
              dataVideo = false;
            }
            // Set the height of the main slide instagram photo
            instaHeight = $('#product-actions-wrapper').height();
            // //console.log(instaHeight);
            /* Add instagram to main slick slider */
            var instagram_markup_main = '';
            instagram_markup_main += '<a class="'+classname+'" data-video-insta="'+ dataVideo +'" id="listing_main_image_link">';
            instagram_markup_main +=  '<img itemprop="image" src="'+ v.images.standard_resolution.url +'" align="middle" id="large" alt="'+  v.caption.text +'" style="max-height:'+instaHeight+'px;" data-href="'+ v.images.standard_resolution.url +'" />';
            instagram_markup_main += '</a>';
            $('.main-slider').slick('slickAdd', instagram_markup_main);
            /* Add instagram to sub slick slider */
            var instagram_markup_sub = '';
            instagram_markup_sub += '<a data-caption="'+ v.caption.text +'" rel="thumb-id:listing_main_image_link">';
            instagram_markup_sub +=  '<img src="'+ v.images.thumbnail.url +'" alt="" width="75" height="75" />';
            instagram_markup_sub += '</a>';

            $('.sub-slider').slick('slickAdd', instagram_markup_sub);
          });
        }
      });
      feed.run();
    }
  };

  // -- ADD WISHLIST BUTTON FUNCTIONALITY -- //
  SiteListing.addToWishlist = function() {
    $('.add-wishlist').on('click', function(e) {
      e.preventDefault();

      if (typeof username != 'undefined' && username !== "Guest") {
        document.add.action = "add_cart.asp?action=addWishList";
        document.add.submit();
      }
      else {
        bootbox.confirm("Please log in in order to add this item to your wishlist.", function(result) {
          if (result == 1) {
            window.open("/myaccount.asp",'_blank');
            // window.location.href = "/myaccount.asp";
          }
        });
      }
    });
  };

  // ---- ADD PRICE SALE CORNERTAG ---- //
  SiteListing.salePrice = function() {
    // SalePrice display and sale cornertag activation on Listing Page
    // SalePrice Checker


    var price = parseInt($('[data-prop="itemprice"]').text().replace('$','').replace(',','')),
        saleprice = parseInt($('[data-prop="saleprice"]').text().replace('$','').replace(',',''));
    ////console.log(price);
    ////console.log(saleprice);

    if (typeof saleprice !== undefined && saleprice !== 0 && !isNaN(saleprice)) {

      if( price != saleprice ) {
        // $('.itemprice.price').text('$' + saleprice);
        $('.pricebox').addClass('sale-cornertag');
        $('#sale-tag').removeClass('hidden');
        $('.item-regprice-mobile').remove();
      }
    }
    else {
      $('.saleprice').hide();
    }
  };

  // ---- ADD PRODUCT BADGES ---- //
  SiteListing.doBadgesSplatter = function() {
    // ---- FIELD 8: BADGES ---- //
    var splatter = $( '.field2' ).data( 'field2' );
    var $splatter = $( '.splatter' );

    console.log(splatter);

    var sludgetext = {
      'brand-new': {
        'title': 'Brand New',
        'class': 'brand-new'
      },
      'exclusive-item': {
        'title': 'Exclusive Item',
        'class': 'exclusive-item'
      },
      'extra-wide': {
        'title': 'Extra Wide',
        'class': 'extra-wide'
      },
      'limited-supply': {
        'title': 'Limited Supply',
        'class': 'limited-supply'
      },
      'top5-product': {
        'title': 'Top 5 Product',
        'class': 'top5-product'
      },
      'top-seller': {
        'title': 'Top Seller',
        'class': 'top-seller'
      },
      'extended-warranty': {
        'title': 'Extended Warranty',
        'class': 'extended-warranty'
      },
      'ships-free': {
        'title': 'Ships Free',
        'class': 'ships-free'
      }
    };

    if( splatter ) {
      splatter = splatter.split(/(\s+)/);
      $.each( splatter, function( i, v ) {
        var splatterslug = v.trim();
        if( typeof( sludgetext[splatterslug] ) != 'undefined' ) {
          $splatter.append( '<div class="' + sludgetext[splatterslug].class + '"></div>');
        }     
      });

    } else {
      $splatter.remove();
    }
  };

  // ---- ADD PRODUCT BADGES ---- //
  SiteListing.doBadges = function() {
    // ---- FIELD 8: BADGES ---- //
    var badges = $( '.field8' ).data( 'field8' );
    var $badges = $( '.badges' );
    var $badges_list = $( '.badges-list' );

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
          ////console.log( badgetext[badgeslug].title );
          //href="http://www.standishsalongoods.com/quality#' + badgetext[badgeslug].class + '"
          $badges_list.append( '<a target="_blank" href="https://www.standishsalongoods.com/quality#' + badgetext[badgeslug].class + '" style="display:block;color:#696969;" data-toggle="popover" data-placement="right" class="col-xs-12 col-md-1 col-sm-1 standish-tooltip badge-product badge-' + badgetext[badgeslug].class + '" title="' + badgetext[badgeslug].title + '"><i></i><div class="hidden-sm hidden-md hidden-lg badge-text">' + badgetext[badgeslug].title + '</div></a>' );
        }     
      });

    } else {
      $badges.remove();
    }
  };

  // ---- ADD GRID EFFECT TO THE PRODUCT REVIEWS Using Isotope ---- //
  SiteListing.commenceGrid = function() {

    var $container = $('.grid');
    $container.imagesLoaded(function(){
      $container.masonry({
            itemSelector : '.grid-item',
            percentPosition: true,
            gutterWidth: 20
      });
    });
  };

  // ---- FIELD 1: Get info about the brand! ---- //
  SiteListing.getBrand = function() {
    var brand = $( '.field1' ).data( 'field1' );

    var url = "https://spreadsheets.google.com/feeds/list/15lkOyeqw1lP0njGihJXj5AnrSYnB8DIQ06bHVnctwzs/od6/public/values?alt=json-in-script";
    $.ajax({
      url:url,
      dataType:"jsonp",
      success:function(data) {

        $(data.feed.entry).each(function(i,v) {
          if ( v.gsx$keyterm.$t === brand ) {
            $('#sub-resources-about-brand p').append(v.gsx$blurb.$t);
          }

        });

      }
    });

  };

  // ---- FIELD 3: Swap out availability text if product ---- //
  // ---- is custom made and needs more time to ship ---- //
  SiteListing.getAvailability = function() {
    // ---- FIELD 3: Availability Text ---- //
    var availability = $( '.field3' ).data( 'field3' );
    if( typeof availability !== undefined ) {
      var availabilityText = $( '.availability' );
      if( availability !== '' ){
        availabilityText.text( availability );
      }
    } 
  };
  
  // ---- FIELD 5: Notify me when the price drops ---- //
  SiteListing.priceDropForm = function() {
    // ---- FIELD 5: Price Drop Notification Form ---- //
    var priceDropForm = $( '.field5' ).data( 'field5' );
    if( priceDropForm !== null ) { 
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
  };

  // ---- FIELD 7: Product Details List ---- //
  // ---- @todo this doesn't have to be formatted in JS ---- //
  SiteListing.productDetailsFormat = function() {

    var details = $( '.field7' ).data( 'field7' );
    var $detailsList = $( '.details-list' );

    if( details ){
      $detailsList.find( 'li' ).remove();
      $.each( details.split( '\n' ), function( i, v ){
        $detailsList.append( '<li class="col-md-6"><span>' + v + '</li></span>' );
      });
    } else {
      $('.product-details').hide();
    }
  };

  // ---- FIELD 2: BROCHURE LINK ---- //
  SiteListing.brochureDownload = function() {
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
              if( $( '.vex-content .hs_email' ).length <= 0 ) {
                $( '.vex-content .hs-button' ).click();
              }
            }
          });
        }
      });
    });
  };

  // ---- Update pricing everytime original pricing changes ---- //
  SiteListing.updatePricing = function() {

    $('#price').bind("DOMSubtreeModified",function(){
      $('.price-wrapper').html($('#price').text());
    });

  };

  // ---- IMAGE COLOR CHANGING FEATURE -- SLIDESHOW ---- //
  SiteListing.changeColorsSlides = function() {
    color_list = [];
    $('.sub-slider a').each( function( i, v ) {
      if( $(v).data('caption') ) {
        color_list.push( $(v).data('caption').trim().toLowerCase() );
      }
    });

    $('.option-row').each( function( i, v ) {
      var findColor = $(v).find('label').text().toLowerCase().indexOf("color");

      if( findColor > 0 ) {
        $(v).on('change', function( e ) {
          current_color_text = $(v).find('select option:selected').text().trim().toLowerCase();
          // Change Slick Slide
          $('.sub-slider').slick('slickGoTo', $.inArray( current_color_text, color_list ));
        });
      }
    });
  };

  SiteListing.financing = function() {
    // ---- PRICEBOX FINANCING FEATURE ---- //
    var interest_rate, term_years, price, yearly_interest, total_interest, payment;
    // Do the math
    interest_rate = 0.12;
    term_years = 3;
    price = Number( $('#price').text().replace("$", "").replace(",", "") );
    yearly_interest = Math.round( ( price * interest_rate ) * 100 ) / 100;
    total_interest = Math.round( ( yearly_interest * term_years ) * 100 ) / 100;
    payment = ( Math.round( ( ( total_interest + price ) / ( term_years * 12 ) ) * 100 ) / 100 ).toFixed(2);

    // //console.log( "PRICE: ", price, yearly_interest, total_interest, payment );
    // Add Financing option link
    if( Number(price) > 1000 ) {
      $('#financing-add').removeClass('hidden');
      $("#financing-add .financing-price").append('$' + payment);
    }
  };

})(window.Standish.SiteListing = window.Standish.SiteListing || {}, jQuery);

