/** Activation of scripts and app code
 *  @Author Lauren
 **/
;(function($) {
	$.Standish = (function() {});
	window.Standish = window.Standish || {};


	Standish.EqualHeights = function() {
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
			'.listing',
			'.listing .listing-container',
			'.column .eqhgt',
			'.column .eqhgt-g1',
			'.pricebox-eqhgt',
			'.footer-logo-sm'
		];
		resizeColumns(groups);
	}

	Standish.CloseHello = function(helloparent) {
		$(helloparent).find('.close').on('click', function() {
			$(helloparent).fadeOut(300, function() { $(this).remove(); });

		});

	}
	
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
	
	// Do different things based on the template slug
	// @todo Activate class functions based on template slug here
	Standish.TemplateSwitcher = function() {
			template_slug = $('.template').first().data('template');
			switch ( template_slug ) {
				// case for product pages
				case 'listing_0':
				case 'listing_1':
				case 'listing_3':
					var script = document.createElement('script');
					script.id = 'listing';
					script.src = '/assets/templates/salon-responsive/scripts/listing-scripts.js';
					document.head.appendChild(script);
				return;
				case ( 'listing_2' ):
					var script = document.createElement('script');
					script.id = 'listing';
					script.src = '/assets/templates/salon-responsive/scripts/listing-scripts.js';
					document.head.appendChild(script);
					// Insert hbspt script
					var scriptb = document.createElement('script');
					scriptb.charset = "utf-8";
					scriptb.src = '//js.hsforms.net/forms/current.js';
					document.head.appendChild(scriptb);

					hbspt.forms.create({ 
						portalId: '239485',
						formId: 'f1f6150e-c064-474e-889d-e5060e3e6ba7',
						target: '#hs-quote',
						css: '',
						onFormReady: function() {
							// --- REQUEST A QUOTE ---- ONLY TEMPALTE LISTING_2 -- form has already been added --- //
							$('.request-quote').on('click', function(e) {
								e.preventDefault();
								$('.modal.modal-request-quote').modal();
							});	
						}
					});
				return;
				default:
				return;
			}
	}
	
	Standish.EmptyCart = function() {
		$('button.cart').on('click', function(event) {
			if ( $(this).children('.cart-number').html() === "0" ) {
				event.preventDefault();
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
		// 2. Activate custom Template switching
		Standish.TemplateSwitcher();
		// 3. Make search input large for mobile devices
		Standish.SearchForm();
		// 4. Empty cart message unless at a different page
		Standish.EmptyCart();
		// 5. Close the Hello Bar		
		Standish.CloseHello('.hello-container');
		// 6. Activate the slider for features at top
		Standish.ActivateSliderNotFancy('#slickShow');

	});
	// Add callback to window resize event
	$(window).on('resize', function() {
		Standish.EqualHeights();
		Standish.SearchForm();
	});
	
})(jQuery)
