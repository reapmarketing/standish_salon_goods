/* Homepage custom class -- activated in standish.templateswitcher */
(function( Homepage, $, undefined ) {

  // ---- ADD PRICE SALE CORNERTAG ---- //
  Homepage.videosFeedSlider = function() {
    $('.brand-videos').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 3,
      prevArrow: '<button type="button" class="fa fa-chevron-left slick-prev">Previous</button>',
      nextArrow: '<button type="button" class="fa fa-chevron-right slick-next">Next</button>'
    });

    var desWidth =  $('.hoz-slider-top').width();

    $('.hoz-slider-top').slick({
      width: desWidth + 'px',
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      variableWidth: true,
      zIndex: 0,
      centerMode: false,
      adaptiveHeight: true,
      asNavFor: '.hoz-slider-sub'
    });
    $('.hoz-slider-sub').slick({
      vertical: true,
      slidesToScroll: 1,
      verticalSwiping: true,
      slidesToShow: 4,
      dots: false,
      centerMode: false,
      focusOnSelect: true,
      arrows: false,
      accessibility: true,
      swipeToSlide: true,
      asNavFor: '.hoz-slider-top'
    });
  };

  Homepage.getData = function(embed_code) {
    var baseUrl = "https://fast.wistia.com/oembed/?url=";
    var accountUrl = encodeURIComponent("https://home.wistia.com/medias/");
    return $.getJSON(baseUrl + accountUrl + embed_code + "&format=json&callback=?");
  };

  Homepage.videosFeed = function() {
    var url = "https://spreadsheets.google.com/feeds/list/1iNOQQpNDSGdpWw4Y5t32z8teqm0pz2yRL7ymVS7PtVg/od6/public/values?alt=json-in-script",
      video_embed_codes = [];

    function getVideos(video_embed_codes) {
      /* ~~ Variable Declaration ~~ */
      var AJAX = [], video_data = {}, video_markup_main, video_markup_sub = '', video_markup_product_page = '', imgUrl, videoData, slideHtml;

      if( video_embed_codes ) {
        $.each( video_embed_codes, function( i, embed_code ) {
          if (embed_code !== "") {
            AJAX.push( Homepage.getData( embed_code ) );
          }
        });

        $.when.apply($, AJAX).done(function() {
          for(var i = 0; i < AJAX.length; i++){
            if( arguments[i].length ) {
              video_data[video_embed_codes[i]] = arguments[i][0];
            } else {
              video_data[video_embed_codes[i]] = arguments[i][0];
            }
          }
          $.each( video_data, function( i, video ) {
            video_markup_home_page = '';
            video_markup_home_page += '<a href="#" class="padd-block video_popup" data-video="'+ i +'" id="listing_main_image_link" style="position:relative;">';
            video_markup_home_page += '<i class="fa fa-play play-button play-button-sm" style="font-size: 2em;position: absolute;text-decoration: none;"></i>';
            video_markup_home_page +=  '<img itemprop="image" src="'+ video.thumbnail_url +'" align="middle" border="0" id="large" name="large" alt="'+ video.title +'" width="100%" data-href="'+ video.thumbnail_url +'" />';
            video_markup_home_page += '</a>';
            $('.brand-videos').slick('slickAdd', video_markup_home_page);
          });

          $('.video_popup').on( 'click', function( e ) {
            e.preventDefault();
            var video = $(this).data('video');
            // console.log(video_data[video]);
            vex.open({
              content: video_data[video].html,
              contentCSS: { 'padding': '0' }
            });
          });
        });
        
      }
    }
    //** Run the ajax to get the ID's **//
    $.ajax({
      url:url,
      dataType:"jsonp",
      success:function(data) {

        $(data.feed.entry).each(function(i,v) {
          video_embed_codes.push(v.gsx$id.$t);
        });
        getVideos(video_embed_codes);

      }
    });
  };

  Homepage.homepageBrands = function() {
    var url = "https://spreadsheets.google.com/feeds/list/1BLiH1rzKlbyAoS98jCnEONjbAzE8SrUx7lxR055Fy98/od6/public/values?alt=json-in-script";

    //** Run the ajax to get the Brands's **//
    $.ajax({
      url:url,
      dataType:"jsonp",
      success:function(data) {
        var image, link, logoHtml = '';

        $('.homepage-brands').append();
        $(data.feed.entry).each(function(i,v) {
          var image = v['gsx$img-url'].$t,
              link = v.gsx$link.$t;

          logoHtml += '<a href="'+link+'"><img style="max-width: 82px;" src="'+image+'"></a>';

        });
        $('.homepage-brands').append(logoHtml);
      }
    });

  };

  Homepage.homepageHozSlider = function() {

    var url = "https://spreadsheets.google.com/feeds/list/1QDnWz5FymPD0kqnpXhTUlNgSDQz9viEffUIyZeLXCd0/od6/public/values?alt=json-in-script";

    //** Run the ajax to get the Brands's **//
    $.ajax({
      url:url,
      dataType:"jsonp",
      success:function(data) {
        var backgroundimage, ctatext, headline, smallversioncta, smallversionheader, subheader, videolink, sliderHtml = '', imgnotext, sliderNavHtml = '', sliderStuff = [], AJAX = [], video_data = [], desWidth =  $('.hoz-slider-top').width();

        $(data.feed.entry).each(function(i,v) {
          var image = v.gsx$backgroundimage.$t,
              imgpreview = v.gsx$imgpreview.$t,
              videoid = v.gsx$videoid.$t,
              mobileurl = v.gsx$mobileurl.$t,
              mobileimage = v.gsx$mobileimage.$t;
          sliderStuff.push({image:image, imgpreview:imgpreview, videoid:videoid, mobileurl:mobileurl, mobileimage:mobileimage});
        });

        $.each( sliderStuff, function( i, slider ) {
          if (slider.videoid !== "") {
            AJAX.push( Homepage.getData( slider.videoid ) );
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
            if ( sliderStuff[i].image !== '') {
              sliderHtml = '<a href class="img-container video_popup_hoz_slider" style="width:'+desWidth+'px;" data-video="'+ i +'">';
              sliderHtml += '<img class="img-responsive" style="width:'+desWidth+'px;" src="'+sliderStuff[i].image+'"/>';
              sliderHtml += '</a>';
            }
            if ( sliderStuff[i].imgpreview !== '') {
              sliderNavHtml = '<img src="'+sliderStuff[i].imgpreview+'" class="img-responsive" />';   
            }
            $('.hoz-slider-top').slick('slickAdd', sliderHtml);
            $('.hoz-slider-sub').slick('slickAdd', sliderNavHtml);
          });
          $('#loadingDiv').fadeOut(1000);
          // Applies Bindings to mobile slots
          $('[data-bind=mobile-promos]').find('[data-bind=mobile-slot]').each(function(i,v) {
            $(this).find('a').attr('href', sliderStuff[i].mobileurl);
            $(this).find('a > img').attr('src', sliderStuff[i].mobileimage);
          });

          $('.video_popup_hoz_slider').on( 'click', function( e ) {
            e.preventDefault();
            var video = $(this).data('video');
            vex.open({
              content: sliderStuff[video].video_data.html,
              contentCSS: { 'padding': '0' }
            });
          });
        });
      }
    });
  };

})(window.Standish.Homepage = window.Standish.Homepage || {}, jQuery);
