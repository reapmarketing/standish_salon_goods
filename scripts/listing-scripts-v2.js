

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

  
} (jQuery));





