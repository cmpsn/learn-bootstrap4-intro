'use strict';

module.exports = function(grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  
  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt);

  // Declare Sass implementation with node-sass plugin
  const sass = require("node-sass");

  // Define the configuration for all the tasks
  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
        sourceMap: true
      },
      dist: {
        files: {
          'css/styles.css': 'css/styles.scss'
        }
      }
    },
    watch: {
      files: 'css/*.scss',
      tasks: ['sass']
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'css/*.css',
            '*.html',
            'js/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: './'
          }
        }
      }
    }
  });

  // Register the SASS task (at line 12)
  grunt.registerTask('css', ['sass']);
  
  // Register the watch and browserSync tasks
  // The WATCH task MUST be the LAST task always,
  // otherwise watch will stop all other tasks that comes after it
  grunt.registerTask('default', ['browserSync', 'watch']);
};