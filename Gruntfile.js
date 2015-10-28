module.exports = function(grunt) {
  // Configure grunt
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js'], // Add more to the list later on
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    sass: {
      dist: {
        files: {
          'style/main.css': 'sass/main.scss'
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
          cwd: 'style',
          src: ['main.css'],
          dest: 'style',
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
    sprite:{
      headerSprites: {
        src: 'images/header-icons/*.png',
        dest: 'images/header-icons.png',
        destCss: 'sass/_header-sprites.scss',
        algorithm: 'left-right'
      },
      whiteSprites: {
        src: 'images/badges-sprites/*.png',
        dest: 'images/badges-sprites.png',
        destCss: 'sass/_badges-sprites.scss'
      },
      greenSprites: {
        src: ['images/individual-badges-main/Green/*.png', 'images/individual-badges-main/Orange/*.png'],
        dest: 'images/individual-badges-main.png',
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
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch'); 
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-text-replace');

  grunt.registerTask('default', ['sprite', 'jshint', 'sass', 'cssmin', 'replace']);
};