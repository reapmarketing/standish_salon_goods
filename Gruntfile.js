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
  grunt.loadNpmTasks('grunt-notify');

  grunt.registerTask('default', ['jshint', 'sass']);
};