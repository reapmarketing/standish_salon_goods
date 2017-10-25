(function($) {

	HomePageOptTest = function() {
		function homePagePlacementModel() {

			var self = this;

      this.popularProd = [
        {
          prodImg: '',
          prodContent: ''
        },
      ];

      this.categories = [
        {
          categoryName: 'Accessories',
          categoryLink: '/salon-supplies-online',
        },
        {
          categoryName: 'Barber Poles',
          categoryLink: '/barber-poles',
        },
        {
          categoryName: 'Break Room Essentials',
          categoryLink: '/Break-Room-Essentials_c_110616.html',
        },
        {
          categoryName: 'Color Bars',
          categoryLink: '/hair-salon-color-bars',
        },
        {
          categoryName: 'Dryers',
          categoryLink: '/salon-hair-dryers',
        },
        {
          categoryName: 'Facial Beds',
          categoryLink: '/facial-beds',
        },
        {
          categoryName: 'Floor Mats',
          categoryLink: '/salon-floor-mats',
        },
        {
          categoryName: 'Mani and Pedi',
          categoryLink: '/manicure-pedicure-equipment',
        },
        {
          categoryName: 'Massage Beds',
          categoryLink: '/massage-chairs-beds',
        },
        {
          categoryName: 'Reception Area',
          categoryLink: '/salon-reception-furniture',
        },
        {
          categoryName: 'Retail Tanning Products',
          categoryLink: '/tanning-retail-products',
        },
        {
          categoryName: 'Salon Chairs',
          categoryLink: '/hair-salon-chairs',
        },
        {
          categoryName: 'Salon Packages',
          categoryLink: '/salon-furniture-packages',
        },
        {
          categoryName: 'Salon Stations',
          categoryLink: '/salon-styling-stations',
        },
        {
          categoryName: 'Shampoo Equipment',
          categoryLink: '/salon-shampoo-area',
        },
        {
          categoryName: 'Spa Packages',
          categoryLink: '/spa-equipment-packages',
        },
        {
          categoryName: 'Tanning Equipment',
          categoryLink: '/sunless-tanning-equipment',
        },
        {
          categoryName: 'Tanning Packages',
          categoryLink: '/sunless-tanning-packages-gift-sets',
        }
      ];

      this.testimonials = [
        {
          img_src: '',
          testimonial_content: ''
        }
      ];

      this.buyersLove = [
        {
          img_src: '',
          title: '',
          description: ''
        }
      ];

      this.dreamSection = '<p class=""> dream section </div>';
      this.trustSection = '<p class=""> trustSection </div>';
      this.saveSection = '<p class=""> saveSection </div>';

      self.topProd = function() {
        var html = $('.products-wrapper').clone().remove();
        return html;
      };
		}

	  var listingsPlace = new homePagePlacementModel();

    var isTestActivated = window.optimizely.activeExperiments.indexOf("9111010936") > -1;

    if (window.location.host == "devstandishsalongoods.3dcartstores.com") {
      isTestActivated = true;
    }
  
    // Only activate if exp # is 9111010936
    window.optimizely = window.optimizely || [];

    if (isTestActivated) {
      ko.applyBindings(listingsPlace);

      $(function() {
      	$('.left-bar').hide();
      	$('.content-main').hide();
        // $('.listings-cat-opt-test').removeClass('hidden');
        // $('.category-wrapper').addClass('hidden');
      });
    }

	};

	HomePageOptTest();

})(jQuery);