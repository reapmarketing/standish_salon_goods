(function($) {

  HomePageOptTest = function() {
    
    // Only activate if exp # is 9111010936
    window.optimizely = window.optimizely || [];
    var isTestActivated = false;

    if (window.optimizely.data.state.activeExperiments.length > 0) {
      if (window.optimizely.activeExperiments.indexOf("9188174390") > -1) {
        var experimentID = "9188174390";
        var variationID = window.optimizely.data.state.variationIdsMap[experimentID];

        isTestActivated = variationID == "9181684539";
      }
    }

    function homePagePlacementModel() {
      var self = this;

      this.isTestActivated = isTestActivated;

      this.popularProd = [
        {
          prodImg: 'https://www.standishsalongoods.com/assets/images/popprod1.jpg',
          prodLink: '/salon-furniture-packages',
          prodLinkText: 'Salon Equipment'
        },
        {
          prodImg: 'https://www.standishsalongoods.com/assets/images/popprod2.jpg',
          prodLink: '/nail-salon-supplies-accessories',
          prodLinkText: 'Spa Equipment'
        },
        {
          prodImg: 'https://www.standishsalongoods.com/assets/images/popprod3.jpg',
          prodLink: '/sunless-tanning-equipment',
          prodLinkText: 'Tanning Equipment'
        }
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
          img_src: 'https://www.standishsalongoods.com/assets/images/test1.png',
          testimonial_name: 'Josh Siegel, Owner of Dane Lyric Salon',
          testimonial_content: '"Standish really stepped up to the plate. They were extremely accessible, there was always somebody there to help."',
          testimonial_link_title: 'Watch Josh\'s testimonial »',
          testimonial_link: 'https://www.standishsalongoods.com/Create-A-Brand-Share-Your-Story-Make-History_b_165.html'
        },
        {
          img_src: 'https://www.standishsalongoods.com/assets/images/test2.png',
          testimonial_name: 'Recebba Tudor, Co-Owner of Salon Suides at Hillside',
          testimonial_content: '"It was a fun experience. The sales people at Standish were very helpful, very accomodating to a new salon owner."',
          testimonial_link_title: 'Watch Recebba\'s testimonial »',
          testimonial_link: 'https://www.standishsalongoods.com/featured-salon-bleach-salon'
        },
        {
          img_src: 'https://www.standishsalongoods.com/assets/images/test3.png',
          testimonial_name: 'Nicolette Schwanz, Owner of Bleach Hair Studio',
          testimonial_content: '"From the customer service to the selection, I couldn’t imagine a better store to shop from. Best equipment and staff possible."',
          testimonial_link_title: 'Watch Nicolette\'s testimonial »',
          testimonial_link: 'https://www.standishsalongoods.com/The-Perfect-Pairing-An-Avant-Garde-Salon-Idea-and-Classic-Standish-Style_b_126.html'
        },
        {
          img_src: 'https://www.standishsalongoods.com/assets/images/test4.png',
          testimonial_name: 'Michael Sturns, Owner of Duwa the RV Salon',
          testimonial_content: '"From the customer service to the selection, I couldn’t imagine a better store to shop from. Best equipment and staff possible."',
          testimonial_link_title: 'Watch Michael\'s testimonial »',
          testimonial_link: 'https://www.standishsalongoods.com/Featured-Salon-DUWA-The-RV-Salon_b_161.html'
        }
      ];

      this.buyersLove = [
        {
          img_src: 'https://www.standishsalongoods.com/assets/images/cl1.png',
          title: '2,400+',
          description: 'SALONS SERVED'
        },
        {
          img_src: 'https://www.standishsalongoods.com/assets/images/cl2.png',
          title: '1,000,000+',
          description: 'CUSTOM ITEMS AVAILABLE'
        },
        {
          img_src: 'https://www.standishsalongoods.com/assets/images/cl3.png',
          title: '2000+',
          description: 'PRODUCTS'
        },
        {
          img_src: 'https://www.standishsalongoods.com/assets/images/cl4.png',
          title: '125+',
          description: 'PRODUCT VIDEOS'
        },
        {
          img_src: 'https://www.standishsalongoods.com/assets/images/cl5.png',
          title: '28',
          description: 'BRANDS CARRIED'
        },
        {
          img_src: 'https://www.standishsalongoods.com/assets/images/cl6.png',
          title: '200+ YEARS',
          description: 'BRANDS CARRIED'
        },
        {
          img_src: 'https://www.standishsalongoods.com/assets/images/cl7.png',
          title: '500+',
          description: 'PRODUCT MADE IN US'
        },
        {
          img_src: 'https://www.standishsalongoods.com/assets/images/cl8.png',
          title: '4.7/5 Stars',
          description: 'AVERAGE RATING'
        }
      ];

      var dreamHtml = '<div class="steps1-inner panel row"> ';
        dreamHtml += '<div class="col-xs-4 eq-heights no-padd">';
          dreamHtml += '<div class="profile-photo--wrapper"><img class="profile-photo" src="https://www.standishsalongoods.com/assets/images/photoThumbnail3.png"></div>';
        dreamHtml += '</div>';

        dreamHtml += '<div class="col-xs-8 eq-heights no-padd">';
          dreamHtml += '<div class="steps-img--wrapper">';
            dreamHtml += '<img class="steps-img" src="https://www.standishsalongoods.com/assets/images/dream.png">';
          dreamHtml += '</div>';
          dreamHtml += '<h3>Dream</h3>';
          dreamHtml += '<p>Our team is here to help you plan your salon, build a new package, and more. Call, text, or email us and we’ll be there!</p>';
        dreamHtml += '</div>';

        dreamHtml += '<div class="col-md-12 text-center guide-links">';
          dreamHtml += '<div class="row">';
            dreamHtml += '<a href="">Download the Guide to Starting a Salon »</a><br>';
            dreamHtml += '<a href="">Download Example Blueprint »</a>';
          dreamHtml += '</div>';
        dreamHtml += '</div>';
      dreamHtml += '</div>';
      this.dreamSection = dreamHtml;

      var trustHtml = '<div class="steps2-inner panel row"> ';
        trustHtml += '<div class="col-xs-4 eq-heights no-padd">';
          trustHtml += '<div class="profile-photo--wrapper"><img class="profile-photo" src="https://www.standishsalongoods.com/assets/images/photoThumbnail1.png"></div>';
        trustHtml += '</div>';

        trustHtml += '<div class="col-xs-8 eq-heights no-padd">';
          trustHtml += '<div class="steps-img--wrapper">';
            trustHtml += '<img class="steps-img" src="https://www.standishsalongoods.com/assets/images/trust.png">';
          trustHtml += '</div>';
          trustHtml += '<h3>Trust</h3>';
          trustHtml += '<p>Our team has 200+ years of combined experience in the Salon Idustry</p>';
        trustHtml += '</div>';
        trustHtml += '<div class="clearfix"></div>';
        trustHtml += '<div class="soc-meds row">';
          trustHtml += '<div class="col-xs-4">';
            trustHtml += '<a href=""><img src="https://www.standishsalongoods.com/assets/images/google.png"></a>';
          trustHtml += '</div>';
          trustHtml += '<div class="col-xs-4">';
            trustHtml += '<a href=""><img src="https://www.standishsalongoods.com/assets/images/facebook.png"></a>';
          trustHtml += '</div>';
          trustHtml += '<div class="col-xs-4">';
            trustHtml += '<a href=""><img src="https://www.standishsalongoods.com/assets/images/yelp.png"></a>';
          trustHtml += '</div>';
        trustHtml += '</div>';
      trustHtml += '</div>';
      this.trustSection = trustHtml;

      var saveHtml = '<div class="steps3-inner panel row"> ';
        saveHtml += '<div class="col-xs-4 eq-heights no-padd">';
          saveHtml += '<div class="profile-photo--wrapper"><img class="profile-photo" src="https://www.standishsalongoods.com/assets/images/photoThumbnail2.png"></div>';
        saveHtml += '</div>';

        saveHtml += '<div class="col-xs-8 eq-heights steps-img--wrapper no-padd">';
          saveHtml += '<div class="steps-img--wrapper">';
            saveHtml += '<img class="steps-img" src="https://www.standishsalongoods.com/assets/images/save.png">';
          saveHtml += '</div>';
          saveHtml += '<h3>Save</h3>';
          saveHtml += '<p>We want you to afford the space of your dreams!</p>';
        saveHtml += '</div>';

        saveHtml += '<div class="col-md-12">';
            saveHtml += '<a class="financing-link" href="/"><img src="https://www.standishsalongoods.com/assets/images/questresources-2.png"></a>';
            saveHtml += '<a class="financing-link" href="/"><img src="https://www.standishsalongoods.com/assets/images/snap_.png"></a>';
        saveHtml += '</div>';
      saveHtml += '</div>';
      this.saveSection = saveHtml;

      self.topProd = function() {
        var html = $('.products-wrapper .product-wrapper-inner').html();

        return html;
      };
    }
    var listingsPlace = new homePagePlacementModel();



    ko.applyBindings(listingsPlace);

    if (isTestActivated ) {
      $(function() {
        $('.left-bar').hide();
        $('.content-main').removeClass('col-md-10');

        $('#prime-content').removeClass('container');
      });
    }
  };

  // Run it.
  HomePageOptTest();

})(jQuery);