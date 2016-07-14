module.exports = function(grunt) {
  // Configure grunt
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'scripts/custom/*', '!scripts/custom/_magic-zoom-options-ex.js', '!scripts/custom/listing-scripts.js', '!scripts/custom/listing-scripts.js', '!scripts/custom/urlParams.js', '!scripts/custom/test-script-listing-product.js', '!scripts/custom/hacks.js'], // Add more to the list later on
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    sass: {
      dist: {
        files: {
          'dist/css/main.css': 'sass/main.scss'
        },
        options: {
          lineNumbers: true,
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css/',
          src: ['main.css'],
          dest: 'dist/css',
          ext: '.<%= pkg.version %>.min.css'
        }]
      }
    },
    replace: {
      version: {
        src: ['frame.source.html'],             // source files array (supports minimatch) 
        dest: 'frame.html',             // destination directory or file 
        replacements: [{
          from: /{{ VERSION }}/g,                   // string replacement 
          to: '<%= pkg.version %>'
        }]
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
        separator: ';',
      },
      dist: {
        src: ['bower_components/bootstrap/dist/js/bootstrap.min.js', 'scripts/jquery.sidr.min.js', 'bower_components/bootbox.js/bootbox.js', 'scripts/slick.min.js', 'scripts/instafeed.js', 'scripts/masonry.pkgd.min.js', 'scripts/scrollDepth.js', 'scripts/custom/standish.js', 'scripts/custom/standish.mobilemenu.js', 'scripts/custom/standish.sitelisting.js', 'scripts/custom/standish.homepage.js', 'scripts/custom/standish.templateswitcher.js', 'scripts/custom/hubspot-newsletter-sign-up-form.js', 'scripts/custom/template-slug.js', 'scripts/custom/hacks.js' ],
        dest: 'dist/js/app.js',
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      build: {
        src: 'dist/js/app.js',
        dest: 'dist/js/app.min.js'
      },
      jqueryMigrate: {
        src: 'scripts/jquery.migrate.js',
        dest: 'dist/js/jquery.migrate.min.js'
      }
    },
    sprite:{
      headerSprites: {
        src: 'images/header-icons/*.png',
        dest: 'dist/sprites/header-icons.png',
        destCss: 'sass/_header-sprites.scss',
        algorithm: 'left-right'
      },
      whiteSprites: {
        src: 'images/badges-sprites/*.png',
        dest: 'dist/sprites/badges-sprites.png',
        destCss: 'sass/_badges-sprites.scss'
      },
      greenSprites: {
        src: ['images/individual-badges-main/Green/*.png', 'images/individual-badges-main/Orange/*.png'],
        dest: 'dist/sprites/individual-badges-main.png',
        destCss: 'sass/_badges-sprites-colors.scss'
      }
    },
    watch: {
      sass: {
        files: ['sass/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      },
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      source: {
        files: ['<%= replace.version.src %>'],
        tasks: ['replace']
      },
      concat: {
        files: ['<%= concat.dist.src %>'],
        tasks: ['concat']
      },
      uglify: {
        files: ['<%= uglify.build.src %>'],
        tasks: ['uglify']
      },
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch'); 
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-text-replace');

  grunt.registerTask('default', ['sprite', 'jshint', 'concat', 'uglify', 'sass', 'cssmin', 'replace']);
};