module.exports = function(grunt) {

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
    'string-replace': {
      version: {
        files: {
          'frame.html': 'frame.source.html' // Version out certain files
        },
        options: {
          replacements: [{
            pattern: /{{ VERSION }}/g,
            replacement: '<%= pkg.version %>'
          }]
        }
      }
    },
    // pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['sass/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      },
      cssmin: {
        files: ['<%= cssmin.target.files %>'],
        tasks: ['cssmin']
      },
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      strrplc: {
        files: ['<%= [string-replace].version.files %>'],
        tasks: ['string-replace']
      },
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        },
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch'); 
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('default', ['jshint', 'sass', 'cssmin', 'string-replace']);
};