  (function( Promotions, $, undefined ) {

  Promotions.CyberWeek = Promotions.CyberWeek || {};

  Promotions.CyberWeek = {
    init: function() {
      this.paintItBlack();

      if (!Promotions.checkCookie('cyberWkX23DF')) {
        this.modalize();
        Promotions.setCookie('cyberWkX23DF', 1, 1);
      }
    },
    paintItBlack: function() {
      $('.hello-container').addClass('black-friday');

      var blkFridayCopy = '<span class="text-white">FREE SHIPPING <strong>+</strong> PRICE MATCH </span>';
      blkFridayCopy += '<a style="margin-left:2.5rem;" href="https://standishsalongoods.com/standish-salon-equipment-sale?__hstc=125570901.38abd277a73faf59ad3167cded008023.1472659058235.1479409475398.1479482689503.22&amp;__hssc=125570901.6.1479482689503&amp;__hsfp=2895187479" class="btn btn-sm uppercase design-text button">See How</a>';

      $('.hello-container .hbar_content p').html(blkFridayCopy);
    },
    modalize: function() {
      $('#cyber-week-modal').modal({
        keyboard: false
      });
    }
  };

  /* Check for existence of Cookie. */
  Promotions.checkCookie = function(token) {
    var name = token + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length,c.length);
        }
    }
    return false;
  };

  Promotions.setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };


  Promotions.TextDeals = {
    init: function() {
      this.paintItBlack();

      // console.log(Promotions.checkCookie('TxtDeals'));
      if (window.location.pathname !== "/standish-salon-equipment-sale") {
        if (!Promotions.checkCookie('TxtDeals')) {
          this.modalize();
          Promotions.setCookie('TxtDeals', 1, 99);
        }
      }
      else {
        this.modalize();
      }
    },
    paintItBlack: function() {
      $('.hello-container').addClass('black-friday');

      var blkFridayCopy = '<span class="text-white">FREE SHIPPING <strong>+</strong> PRICE MATCH </span>';
      blkFridayCopy += '<a style="margin-left:2.5rem;" href="https://standishsalongoods.com/standish-salon-equipment-sale?__hstc=125570901.38abd277a73faf59ad3167cded008023.1472659058235.1479409475398.1479482689503.22&amp;__hssc=125570901.6.1479482689503&amp;__hsfp=2895187479" class="btn btn-sm uppercase design-text button">See How</a>';

      $('.hello-container .hbar_content p').html(blkFridayCopy);
    },
    modalize: function() {
      $('#text-deals').modal({
        keyboard: false
      });
    }
  };

  Promotions.ShareDiscount = {
    init: function() {
      /*window.fbAsyncInit = function() {
        FB.init({
          appId      : '1474161279271975',
          xfbml      : true,
          version    : 'v2.9'
        });
        FB.AppEvents.logPageView();
      };

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));*/

      this.shareClick();      
    },
    shareClick: function() {
      $shareBtn = $('[data-share="discount"]');

      var urlToShare = window.location.href;

      $shareBtn.on('click', function(e) {
        e.preventDefault();

        var checkoff = $(this).find('input[type=checkbox]');

        FB.ui({
            method: 'share',
            display: 'popup',
            href: urlToShare,
          }, function(response){
            if (typeof response === "undefined") {
              return;
            }
            else {
              $('[data-share="discount"]').remove();
              if ($('#fb-modal-share').length > 0 ) {
                $('#fb-modal-share').modal();
              }
            }
          });
      });
    }
  };

  $(function() {

    Promotions.ShareDiscount.init();

    // Promotions.CyberWeek.init();

    // Promotions.TextDeals.init();

    // Send form data to HubSpot from the client.
    function submitToHubSpot(data) {
      var $form = $('#hubspot-form form'),
          k;

      // Loop through each value and find a matching input.
      // NOTE: Doesn't support checkbox/radio.
      for (k in data) {
        $form.find("input[name='" + k + "']").val(data[k]);
      }

      $form.submit();
    }

    function validateEmail(email) {
      var x = email;
      var atpos = x.indexOf("@");
      var dotpos = x.lastIndexOf(".");
      if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        return false;
      }
      else {
        return true;
      }
    }

    // Here's how you'd use this.
    $('#cyberweek-form').on('submit', function(e) {

      e.preventDefault();


      var formData = {};
      $(this).serializeArray().forEach(function(data) {
        formData[data.name] = data.value;
      });
      
      var emailVal = validateEmail(formData.email);
      if (emailVal) {
        submitToHubSpot(formData);  
        $('#cyber-week-modal').modal('hide');

        $('#cyber-week-modal-thanks').modal({
          keyboard: false
        });
      }
      else {
        $('#cyberweek-form .warning').remove();
        $('#cyberweek-form').append('<div class="warning">Please enter a valid email address.</div>');
      }
    });
  });

})(window.Standish.Promotions = window.Standish.Promotions || {}, jQuery);