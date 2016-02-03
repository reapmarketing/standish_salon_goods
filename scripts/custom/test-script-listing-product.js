(function($) {
  var originalLeave = $.fn.popover.Constructor.prototype.leave;

  // Bootstrap Hack -- http://jsfiddle.net/wojtekkruszewski/zf3m7/22/
  $.fn.popover.Constructor.prototype.leave = function(obj){
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
    var container, timeout;

    originalLeave.call(this, obj);

    if(obj.currentTarget) {
      container = $(obj.currentTarget).siblings('.popover')
      timeout = self.timeout;
      container.on('mouseenter', function(){
        // Customization to make sure that timeout is set
        if (typeof timeout === 'undefined') {
          timeout = 238;
        }
        //We entered the actual popover – call off the dogs
        clearTimeout(timeout);  
        //Let's monitor popover content instead
        container.on('mouseleave', function(){
          $.fn.popover.Constructor.prototype.leave.call(self, self);
        });
      })
    }
  };



})(jQuery);


(function(TestScriptListing, $, undefined ) {

  TestScriptListing.createPageElements = function() {
    // dollar div
    $('<div/>', {
      'id':'whyPrice',
      'class':'icon-holder',
      'style':'font-size: 20px; position: relative; top: -3em; float: right; curser: pointer;',
      'html':'<a class="tooltipplacehtml" data-popover data-content=""><i class="fa fa-money fa-sm"></i> <i class="fa fa-question fa-sm"></i> </a>',
    }).appendTo('.left-price');
  }

  var badgesList = $('.badges-list .badge-text');
  $(window).on('load', function() {
    window.TestScriptListing.createPageElements();
    var productTitle = $('h1.product-title.hidden-sm').text();
    
    var badgesList = $('.badges-list').html();
      var tooltiphtml = '<h3> Why this price? </h3>';
      tooltiphtml += 'The ' + productTitle + ' is an American-made product, handcrafted by artisans here in the united states.'; 
      tooltiphtml += '<br/>';
      tooltiphtml += '<div class="tooltip-badges">'
      tooltiphtml += badgesList;
      tooltiphtml += '</div>';
      tooltiphtml += 'To learn more about our American-made products, take a look at <a href="">this video</a>!'
      tooltiphtml += '</div>'

    $('.tooltipplacehtml').popover({
      offset: 10,
      trigger: 'hover', //manual
      html: true,
      placement: 'right',
      template: '<div class="popover dark popover-custom"><div class="arrow"></div><div class="popover-content"><p></p></div></div></div>',
      content: function() {
        return tooltiphtml;
      },
      delay: {show: 40, hide: 1000}
    });
  });

})(window.TestScriptListing = window.TestScriptListing || {}, jQuery);




