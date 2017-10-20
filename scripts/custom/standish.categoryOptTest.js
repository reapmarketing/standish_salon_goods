(function($) {

  CategoryOptTest = function() {

    function listingsPagePlacementModel() {

      var self = this;
      self.listings = ko.observableArray(window.Listings);

      self.getSaleprice = function(saleprice) {
        if (saleprice == '[ITEMSALEPRICE]') {
          return '';
        }
        else {
          return saleprice;
        }
      };

      self.getPrice = function(price, saleprice) {

        var outPutHtml = '';
        if (saleprice == '[ITEMSALEPRICE]') {
          return price;
        }
        else {
          var pricenum = Number(price.replace('$', ''));
          var salepricenum = Number(saleprice.replace('$', ''));

          if (pricenum > salepricenum) {
            var saveDiff = pricenum - salepricenum;
            console.log(saveDiff);
            outPutHtml += '$' + salepricenum;
            outPutHtml += '<small class="yousave">  You Save: $' + saveDiff + '</small>';
          }
          else {
            outPutHtml += price;
          }

          return outPutHtml;
        }
      };

      self.getReviewsAvg = function(reviewAverage) {
        var reviewAverageNum = Number(reviewAverage);
        var outPutHtml = '';
        if (reviewAverageNum !== 0) {
          for (var i = 0; i < reviewAverageNum; i++) {
            outPutHtml += '<i class="fa fa-star star-review-avg" aria-hidden="true"></i>';
          }
        }
        return outPutHtml;
      };

      self.getReviewsCount = function(reviewCount) {
        var reviewCountNum = Number(reviewCount);
        var outPutHtml = '';
        if (reviewCountNum !== 0) {
          outPutHtml += reviewCount + ' Review(s)';
        }
        return outPutHtml;
      };
    }

    var listingsPlace = new listingsPagePlacementModel();

    // Only activate if exp # is 9111010936
    window.optimizely = window.optimizely || [];
    if (window.optimizely.activeExperiments.indexOf("9111010936") > -1) {
      ko.applyBindings(listingsPlace);

      $(function() {
        $('.listings-cat-opt-test').removeClass('hidden');
        $('.category-wrapper').addClass('hidden');
      });
    }
    
  };

  CategoryOptTest();

})(jQuery);