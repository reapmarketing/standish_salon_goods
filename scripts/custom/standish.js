/** Activation of scripts and app code
 *  @Author Lauren
 **/
;(function($) {
  $.Standish = (function() {});
  window.Standish = window.Standish || {};
  Standish.SiteListing = Standish.SiteListing || {};

  var resizeColumns = function(groups) {
    $.each(groups, function(index, value) {
      $(value).matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
      });
    });
  };

  // 1. Equal Heights
  Standish.EqualHeights = function() {
    if ($(window).width() >= 768) {
      var groups = [
        // '.listing',
        '.column .eqhgt',
        '.eqhgt',
        '.listing-container',
        '.column .eqhgt-g1',
        '.column .eqhgt-g2',
        '.pricebox-eqhgt',
        '.footer-logo-sm'
      ];
      resizeColumns(groups);
    }
  };

  Standish.EqualHeightsMobile = function() {
    if ($(window).width() <= 768) {
      var groups = [
        '.listing .listing-container',
        '.column .eqhgt',
        '.column .eqhgt-g1',
        '.pricebox-eqhgt',
        '.footer-logo-sm'
      ];
      resizeColumns(groups);
    }
  };

  // 3. convert search input large for mobile devices
  Standish.SearchForm = function() {
    var tabletBkPt = 991;
    
    if ( $(window).width() <= tabletBkPt) {
      $("form[name=searchForm]").children('.input-group').addClass('form-group-lg');
    }
    if ( $(window).width() > tabletBkPt) {
      if ( $("form[name=searchForm]").children('.input-group').hasClass('form-group-lg')) {
        $("form[name=searchForm]").children('.input-group').removeClass('form-group-lg');
      }
    }
    
  };

  Standish.applyFilters = function() {
    var tabletBkPt = 991;
    // console.log($('#category-selectors'));
    if ($('#category-selectors').length > 0 && $(window).width() >= tabletBkPt) {
      var $sideBar = $('#category-selectors').detach();
    
      $('.left-bar #catframe-wrapper').replaceWith($sideBar);

      $('.cat-filter-separator').remove();
    }
  };
  
  Standish.EmptyCart = function() {

    $("a[href='/view_cart.asp']").on('click', function(event) {
      if ( $(this).find('.cart-number').html() === "0" ) {
        event.preventDefault();

        var s = '<div id="cart-error" class="alert alert-danger fade in" style="display:none;" role="alert">  <button type="button" class="close" data-dismiss="alert" aria-label="Close">    <span aria-hidden="true">&times;</span> </button> <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <span class="sr-only">Error:</span> Please choose one or more items to put in your cart.</div>';
        $('section#prime-content').prepend(s);
        
        $('#cart-error').show();
        
        var timedResponse = setTimeout( function () {$('#cart-error').alert('close');}, 1000 );
      }
    });
  };
  Standish.optInPopover = function() {
    $(function () {
      $('[data-toggle="popover"]').popover({
        trigger:'hover',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><p class="popover-title"></p></div></div>'
      });
    });
  };

  Standish.getData = function(embed_code) {
    var baseUrl = "https://fast.wistia.com/oembed/?url=";
    var accountUrl = encodeURIComponent("https://home.wistia.com/medias/");
    return $.getJSON(baseUrl + accountUrl + embed_code + "&format=json&callback=?");
  };

  Standish.addTestimonials = function() {

    var url = "https://spreadsheets.google.com/feeds/list/1Sk_ITtWMcwRpjbw4stHpyRrQPZ9fdGMqk2hOCqWPa2Q/od6/public/values?alt=json-in-script";

    if ($('#left-bar-testimonials').length > 0) {
      //** Run the ajax to get the Brands's **//
      $.ajax({
        url:url,
        dataType:"jsonp",
        success:function(data) {
          /* ~~ Variable Declaration ~~ */
          var AJAX = [], video_data = {}, video_markup_main, video_markup_sub = '', video_markup_product_page = '', imgUrl, videoData, slideHtml, sliderStuff = [];

          $(data.feed.entry).each(function(i,v) {
            // console.log(v);
            var vidid = v.gsx$videoid.$t,
                vidname = v.gsx$name.$t;
            sliderStuff.push({name:vidname, videoid: vidid});
          });

          $.each( sliderStuff, function( i, slider ) {
            if (slider.videoid !== "") {
              AJAX.push( Standish.getData( slider.videoid ) );
            }
          });
          //* All the AJAX has loaded *//
          $.when.apply($, AJAX).done(function() {
            for(var i = 0; i < AJAX.length; i++){
              if( arguments[i].length ) {
                sliderStuff[i].video_data = arguments[i][0];
              } else {
                sliderStuff[i].video_data = arguments[i][0];
              }
            }
            $.each( sliderStuff, function( i, video ) {
              // console.log(video);
              video_markup_home_page = '';
              video_markup_home_page += '<div class="padd-bottom"><a href="#" class="col-md-12 no-padd video_popup_testimonial" data-video="'+ i +'" id="listing_main_image_link" style="position:relative;">';
              video_markup_home_page += '<i class="fa fa-play play-button play-button-sm" style="font-size: 1.5em;position: absolute;text-decoration: none;"></i>';
              video_markup_home_page +=  '<img itemprop="image" src="'+ video.video_data.thumbnail_url +'" align="middle" border="0" id="large" name="large" alt="'+ video.name +'" width="100%" data-href="'+ video.video_data.thumbnail_url +'" />';
              video_markup_home_page += '</a><p style="letter-spacing: -.05em;">'+ video.name +'  <i class="fa fa-star fa-xs standishyellow-text"></i><i class="fa fa-star fa-xs standishyellow-text"></i><i class="fa fa-star fa-xs standishyellow-text"></i><i class="fa fa-star fa-xs standishyellow-text"></i><i class="fa fa-star fa-xs standishyellow-text"></i></p></div>';
              $('#left-bar-testimonials').append(video_markup_home_page);
            });
            $('#left-bar-testimonials').append('<a target="_blank" href="/featured-salon" class="btn-block btn btn-light">See More</a>');

            $('.video_popup_testimonial').on( 'click', function( e ) {
              e.preventDefault();
              var video = $(this).data('video');
              vex.open({
                content: sliderStuff[video].video_data.html,
                contentCSS: { 'padding': '0', 'width': '960px' }
              });
            });
          });
        }
      });
    }
  };

  Standish.AddBottomMenu = function() {
    var url = "https://spreadsheets.google.com/feeds/list/1WXj97jT1kJQRmFQHmDMzPaPI8Xls94q0yRFTTOK9hGI/od6/public/values?alt=json-in-script";
    $.ajax({
      url: url,
      dataType:"jsonp",
      success:function(data) {
        outputHtml = '<ul class="list-unstyled col-md-12">';

        $(data.feed.entry).each(function(i,v) {
          outputHtml += '<li class="col-md-6 col-sm-6">';
          outputHtml += '<a href="'+v.gsx$url.$t + '">';
          outputHtml += v.gsx$name.$t;
          outputHtml += '</a>';
          outputHtml += '</li>';
        });
        outputHtml += '</ul>';
        $('#global-footer').append(outputHtml);
      }
    });
  };

  Standish.ActivatePredictiveSearch = function() {
    if( $('#searchlight').length ) {
    // See if the function loaded properly
      if( typeof $('#searchlight').searchlight === 'function' ) {
        $('#searchlight').searchlight('/search_quick.asp');
      } else {
        console.log( 'There was an issue loading the searchlight scripts' );
      }
    }
    // NOTE: the Searchlight element has to be loaded for the results
    // to display correctly using the elements offset.
  };

  Standish.AnimateHelloBar = function() {
    $('.hello-container').delay(1500).animate({opacity: 1});
  };

  Standish.Subtotes = function(that) {
    if( !$('.discount').length ) {
        $('.subtotes').hide();
    }
  };

  Standish.HannahChat = function() {

    $('[href="#contact-hannah"]').on('click', function() {
      $('#chat-modal-hannah').modal({
        keyboard: false
      });
      $(this).addClass('hidden');
    });
    $('#chat-modal-hannah').on('hidden.bs.modal', function (e) {
      $('[href="#contact-hannah"]').removeClass('hidden');
    });
  };

  Standish.NoZeros = function() {
    window.setTimeout( function () { 
      $('.nozero').each( function() {
        $(this).text( $(this).text().replace(/\.00/g, '') );
      });
    }, 10 );
  };

  $(function() {
    // Wait till dom is ready to use slick
    Standish.ActivateSliderNotFancy = function(htmlelement) {
      if ( typeof $.fn.slick == "function" ) {
        $(htmlelement).slick({
          vertical: true,
          arrows: false,
          slidesToShow: 1,
          autoplay: true
        });
      }
    };
    Standish.ActivateSliderFancy = function(element) {
      if ( typeof $.fn.slick == "function" ) {
        $(element).slick({

        });
      }

    };
  
  });

  // -- Toggle filters -- //
  Standish.ToggleCatFilters = function() {
    console.log('hello');
    $('.category-content').toggleClass('hidden');
  };

  // -- WISHLIST LINK FUNCTIONALITY -- //
  Standish.WishlistBtn = function() {
    $('.nav-menu .wishlist').on('click', function(e) {
      e.preventDefault();

      if (typeof username != 'undefined' && username !== "Guest") {
        window.open("/view_wishlist.asp",'_blank');
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

  // -- Buttons for number inputs -- //
  Standish.NumberInputs = function() {
    var input = $("input[name='qty-0']");
    var currentVal = parseInt(input.val());
    if (currentVal > 1) {
      $('.btn-number').attr('disabled', false);
    }
    //plugin bootstrap minus and plus
    //http://jsfiddle.net/laelitenetwork/puJ6G/
    $('.btn-number').on('click', function(e){
      e.preventDefault();

      var $el = $(this);
      var fieldName = $(this).attr('data-field');
      var type      = $(this).attr('data-type');
      
      console.log(fieldName);
      console.log(type);
        
      var input = $el.parent().siblings("input[name='"+fieldName+"']");
      var currentVal = parseInt(input.val());

      if (!isNaN(currentVal)) {
        if (currentVal > 0) {
          $('.btn-number').attr('disabled', false);
        }
        // console.log(currentVal);
        if(type === 'minus') {

          input.val(currentVal - 1);
          if(parseInt(input.val()) == input.attr('min')) {
            $(this).attr('disabled', true);
          }

        }
        else if(type === 'plus') {
          input.val(currentVal + 1);

          if(parseInt(input.val()) == input.attr('max')) {
            $(this).attr('disabled', true);
          }
        }
      } else {
          input.val(0);
      }
    });
    $('.input-number').focusin(function(){
      $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function() {

      minValue =  parseInt($(this).attr('min'));
      maxValue =  parseInt($(this).attr('max'));
      valueCurrent = parseInt($(this).val());

      name = $(this).attr('name');
      if(valueCurrent >= minValue) {
          $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled');
      } else {
          alert('Sorry, the minimum value was reached');
          $(this).val($(this).data('oldValue'));
      }
      if(valueCurrent <= maxValue) {
          $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled');
      } else {
          alert('Sorry, the maximum value was reached');
          $(this).val($(this).data('oldValue'));
      }


    });
    $(".input-number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) || 
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    });
  };

  nozeros = function() {
    window.setTimeout( function () { 
      $('.nozero').each( function() {
        $(this).text( $(this).text().replace(/\.00/g, '') );
      });
    }, 10 );
  };

  // Events
  $(function() {

    // 1. Activate Equal Heights
    Standish.EqualHeights();
    Standish.EqualHeightsMobile();
    // 2. Activate custom Template switching -- standish.templateswitcher
    Standish.TemplateSwitcher();
    // 3. Make search input large for mobile devices
    Standish.SearchForm();
    // 4. Empty cart message unless at a different page
    Standish.EmptyCart();
    // 6. Opt in to bootstrap popover
    Standish.optInPopover();
    // 7. add bottom menu items from spreadsheet
    Standish.AddBottomMenu();
    $( window ).load(function() {
      // 8. SearchLight - 3DCart Suggestive Search 
      Standish.ActivatePredictiveSearch();
    });
    // 9. Animate Hello Bar
    Standish.AnimateHelloBar();
    // 10. Remove trailing decimal zeros
    Standish.NoZeros();
    // 11. Remove subtotals
    Standish.Subtotes();
    // 12. Add Testimonials
    Standish.addTestimonials();

    // 14. Apply weird cat filters
    Standish.applyFilters();

    // 15. Wishlist
    Standish.WishlistBtn();

    // 16. Number + and - inputs
    Standish.NumberInputs();

    // Activate Hannah Chat
    Standish.HannahChat();

    // Run nozeros for templates that haven't been updated.
    nozeros();

  });
  // Add callback to window resize event
  $(window).on('resize', function() {
    Standish.EqualHeights();
    Standish.EqualHeightsMobile();
    Standish.SearchForm();
    Standish.applyFilters();
  });
  
})(jQuery);
