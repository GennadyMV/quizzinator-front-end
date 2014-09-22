module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: ['js/app.js', 'js/services/*.js', 'js/directives/*.js', 'js/controllers/*.js'],
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
      files: ['js/app.js', 'js/services/*.js', 'js/directives/*.js', 'js/controllers/*.js', 'css/quiz.less'],
      tasks: ['uglify', 'less']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify','less', 'watch']);

};