		function nozeros() {
			window.setTimeout( function () { 
				$('.nozero').each( function() {
					$(this).text( $(this).text().replace(/\.00/g, '') );
				});
			}, 1 );
		}

		jQuery( function($) {

			// Initialize the Zero Remover
			nozeros();

			// SearchLight - 3DCart Suggestive Search 
			// Check for the element
			if( jQuery('#searchlight').length ) {
				// See if the function loaded properly
				if( typeof jQuery('#searchlight').searchlight === 'function' ) {
					jQuery('#searchlight').searchlight('/search_quick.asp');
					$('.searchlight-balloon').css({'top': '80px' });
				} else {
					console.log( 'There was an issue loading the searchlight scripts' );
				}
			}

			// Sidebar Customizations
			// console.log( $(this).find('li').length );

// Big Issues with this code, does not work as expected, sidebar is a little wonky with current 'static nav' hacks
/*
				$( '#catframe ul' ).each( function( i, v ) {
					console.log(i);
					if( $(v).find('li').length !== 1 && i != 1) {
						$("<style>")
							.prop("type", "text/css")
							.html("							.hiddencat {								display: none;							}")
							.appendTo("head");
					} else {
						$(this).addClass('hiddencat');
					}
				});
*/

			// Cart Price Thing
			if( !$('.discount').length ) {
				$('.subtotes').hide();
			}


			// Template Name Finder/Helper
			template_slug = $('.template').first().data('template');
			console.log( 'Template: ' + template_slug );
			// @TODO remove template finder.
			if( template_slug === 'category' || template_slug === 'search' || template_slug === 'search_group' || template_slug === 'extrapage' ) {

				// Show left bar on select pages... Perhaps a bad idea for SEO
				$('.left-bar').show();

				// Pagination corner helpers
				$selected = $('.selected');
				if( $selected.first().text() === "1" ) {
					$selected.addClass('first');
				}

				$pagination_blocks = $('.pagination');

				$pagination_blocks.each( function( i , v ) {
					$pagination_links = $(v).find( 'a' );
					if( $pagination_links.last().hasClass('active') ) {
						$pagination_links.last().addClass('last');
					}
				});
			}

			// Remove 3DCart clears (use the 'clearfix' class instead)
			$('div[style*=both]').remove();

			// Start of Hellobar code
			
						// Hellobar Animation
/*
			var scrollfixdone = false;
			$(window).on('scroll', function () {
				if ( $(window).scrollTop() > 60 ){
					if( !scrollfixdone ) {
						$('body').css({'margin-top':'60px'});
						$("html, body").scrollTop( 120 );
						console.log( $("body").scrollTop() );
						scrollfixdone = true;
					}
				}
			});
*/
			var JSON_LOADED = false;
			$('.hello-container').delay(2000).animate({opacity: 1});
			
			var hbar_slug = 'default';
			// This code will change the slug if it finds an override.
			// <span class="custom_bar" data-bar="OverrideBarName"></span>
			if( $('.custom_bar').length ) {
				hbar_slug = $('.custom_bar').first().data('bar');
			}
			
			var url = "//json.stand.sh/standish/data.json";
			
			// Hellobar code for getting external data
			$.getJSON( url, function( data ) {
				JSON_LOADED = true;
				// console.log( data.content );
				// console.log( data );
				// console.log( data[hbar_slug] );
				// console.log( hbar_slug in data );
				if( hbar_slug in data ) {
					$('.hbar_content').html( data[hbar_slug] );
				} else {
					$('.hbar_content').html( data['default'] );
				}
			});
		});
