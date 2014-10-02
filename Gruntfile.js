module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: ['vendor/dependencies/angular.min.js', 'vendor/dependencies/jquery.min.js', 'vendor/dependencies/*.js', 'js/views/templates.js', 'js/app.js', 'js/services/*.js', 'js/filters/*.js', 'js/directives/*.js', 'js/controllers/*.js'],
        dest: 'build/quiz.min.js'
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "build/quiz.min.css": "css/quiz.less"
        }
      }
    },
    watch: {
      files: ['js/views/*.html', 'js/views/*/*.html', 'js/app.js', 'js/services/*.js', 'js/filters/*.js', 'js/directives/*.js', 'js/controllers/*.js', 'css/quiz.less'],
      tasks: ['uglify', 'less', 'cssmin']
    },
    cssmin: {
      combine: {
        files: {
          'build/quiz.min.css': ['build/quiz.min.css', 'css/*.css']
        }
      }
    },
    html2js: {
      options: {
        module: 'templates'
      },
      main: {
        src: ['js/views/*.html', 'js/views/*/*.html'],
        dest: 'js/views/templates.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html2js');

  // Default task(s).
  grunt.registerTask('template-cache', ['html2js']);
  grunt.registerTask('default', ['uglify', 'less', 'cssmin', 'html2js', 'watch']);

};