/** Activation of scripts and app code
 *  @Author Lauren
 **/
;(function($) {
	$.Standish = (function() {});
	window.Standish = window.Standish || {};

	// 1. Equal Heights
	Standish.EqualHeights = function() {
		if ($(window).width() >= 768) {
			function resizeColumns(groups) {
				$.each(groups, function(index, value) {
					$(value).matchHeight({
						byRow: true,
						property: 'height',
						target: null,
						remove: false
					});
				});
			}
			var groups = [
				// '.listing',
				'.listing .listing-container',
				'.column .eqhgt',
				'.eqhgt',
				'.column .eqhgt-g1',
				'.pricebox-eqhgt',
				'.footer-logo-sm'
			];
			resizeColumns(groups);
		}
	}

	Standish.EqualHeightsMobile = function() {
		if ($(window).width() <= 768) {
			function resizeColumns(groups) {
				$.each(groups, function(index, value) {
					$(value).matchHeight({
						byRow: true,
						property: 'height',
						target: null,
						remove: false
					});
				});
			}
			var groups = [
				'.listing .listing-container',
				'.column .eqhgt',
				'.column .eqhgt-g1',
				'.pricebox-eqhgt',
				'.footer-logo-sm'
			];
			resizeColumns(groups);
		}
	}

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
		
	}
	
	Standish.EmptyCart = function() {

		$("a[href='/view_cart.asp']").on('click', function(event) {
			event.preventDefault();
			console.log($(this).find('.cart-number').html());
			if ( $(this).find('.cart-number').html() === "0" ) {
				
				var s = '<div id="cart-error" class="alert alert-danger fade in" style="display:none;" role="alert">\
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">\
						<span aria-hidden="true">&times;</span>\
					</button>\
					<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\
					<span class="sr-only">Error:</span>\
					Please choose one or more items to put in your cart.\
				</div>';
				$('section#prime-content').prepend(s);
				
				$('#cart-error').show();
				
				var timedResponse = setTimeout( function () {$('#cart-error').alert('close');}, 1000 );
			}
		})	
		
	}
	Standish.optInPopover = function() {
		$(function () {
		  $('[data-toggle="popover"]').popover({
		  	trigger:'hover',
		  	template: '<div class="popover" role="tooltip"><div class="arrow"></div><p class="popover-title"></p></div></div>'
		  });
		});
	}

	Standish.AddBottomMenu = function() {
		var url = "https://spreadsheets.google.com/feeds/list/1WXj97jT1kJQRmFQHmDMzPaPI8Xls94q0yRFTTOK9hGI/od6/public/values?alt=json-in-script";
    $.ajax({
      url: url,
      dataType:"jsonp",
      success:function(data) {
				outputHtml = '<ul class="list-unstyled col-md-12">';

        $(data.feed.entry).each(function(i,v) {
					outputHtml += '<li class="col-md-6 col-sm-6">';
					outputHtml += '<a href="'+v['gsx$url']['$t'] + '">'
        	outputHtml += v['gsx$name']['$t'];
        	outputHtml += '</a>';
        	outputHtml += '</li>';
        });
        outputHtml += '</ul>';
        $('#global-footer').append(outputHtml);
      }
    });
	}

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
	}

	Standish.AnimateHelloBar = function() {
		$('.hello-container').delay(1500).animate({opacity: 1});
	}

	Standish.Subtotes = function(that) {
		if( !$('.discount').length ) {
				$('.subtotes').hide();
		}
	}


	Standish.NoZeros = function() {
		window.setTimeout( function () { 
			$('.nozero').each( function() {
				$(this).text( $(this).text().replace(/\.00/g, '') );
			});
		}, 10 );
	}

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
		}
		Standish.ActivateSliderFancy = function(element) {
			if ( typeof $.fn.slick == "function" ) {
				$(element).slick({

				});
			}

		}
	
	});

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


	});
	// Add callback to window resize event
	$(window).on('resize', function() {
		Standish.EqualHeights();
		Standish.EqualHeightsMobile();
		Standish.SearchForm();
	});
	
})(jQuery)
