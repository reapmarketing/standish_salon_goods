(function(TestScriptListing, $, undefined ) {

	TestScriptListing.createPageElements = function() {
		// dollar div
		$('<div/>', {
	    'id':'whyPrice',
	    'class':'icon-holder',
	    'style':'font-size: 20px; position: relative; top: -3em; float: right; curser: pointer;',
	    'html':'<a class="tooltipplacehtml" data-content=""><i class="fa fa-money fa-sm"></i> <i class="fa fa-question fa-sm"></i> </a>',
		}).appendTo('.left-price');

		var productTitle = $('h1.product-title.hidden-sm').text();
		var badgesList = $('.badges-list');
		console.log(badgesList);

  	var tooltiphtml = '<h3> Why this price? </h3>';
  	tooltiphtml += 'The ' + productTitle + ' is an American-made product, handcrafted by artisans here in the united states.'; 
  	tooltiphtml += '<br/>';
  	tooltiphtml += badgesList;
  	tooltiphtml += 'To learn more about our American-made products, take a look at <a href="">this video</a>!'
  	tooltiphtml += '</div>'
  	$('.tooltipplacehtml').attr('data-content', tooltiphtml);


		$('.tooltipplacehtml').popover({
		  offset: 10,
		  trigger: 'manual',
		  html: true,
		  placement: 'right',
		  template: '<div class="popover dark" onmouseover="$(this).mouseleave(function() {setTimeout(function(){ $(this).hide(); });});"><div class="arrow"></div><div class="popover-content"><p></p></div></div></div>',
			content: function() {
				return tooltiphtml;
			}
		}).mouseenter(function(e) {
		  $(this).popover('show');
		}).mouseleave(function(e) {
		  var ref = $(this);
		  setTimeout(function(){
		      ref.popover('hide');
		  }, 784500);
		});
	}



	// @TODO MAKE SURE THIS LOADS AFTER BADGES
	$(window).ready(function() {
		window.TestScriptListing.createPageElements();
		
	});

})(window.TestScriptListing = window.TestScriptListing || {}, jQuery);

