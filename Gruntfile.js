'use strict';

module.exports = function(grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  
  // Automatically load required Grunt tasks
  // Inform jit-grunt that useminPrepare will be handled by grunt-usemin plugin
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  // Declare Sass implementation with node-sass plugin
  const sass = require("node-sass");

  // Define the configuration for all the TASKS
  grunt.initConfig({
    // DEVELOPMENT Tasks
    // Sass conversion to css Options
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
    // Watch Scss changes
    watch: {
      files: 'css/*.scss',
      tasks: ['sass']
    },
    // Syncronize browser with any change in css, html, js files
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
    },
    // BUILD for production Tasks
    // Copy files from dev folder to dist (distribution) folder - task
    copy: {
      // copy html to dist folder
      html: {
        files: [{
          expand: true,
          dot: true,
          cwd: './',
          src: ['*.html'],
          dest: 'dist'
        }]
      },
      //copy fonts to dist folder
      fonts: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'node_modules/font-awesome',
          src: ['fonts/*.*'],
          dest: 'dist'
        }]
      }
    },
    // Clean disttribution folder - task
    clean: {
      build: {
        src: ['dist/']
      }
    },
    // Image minimization - task
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          dot: true,
          cwd: './',
          src: ['img/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    },
    // Prepare usemin to work with css and js minim. ang uglify plugins
    useminPrepare: {
      foo: {
        dest: 'dist',
        src: ['contactus.html','aboutus.html','index.html']
      },
      options: {
        flow: {
          steps: {
            css: ['cssmin'],
            js: ['uglify']
          },
          post: {
            css: [{
              name: 'cssmin',
              createConfig: function(context, block) {
                var generated = context.options.generated;
                generated.options = {
                  keepSpecialComments: 0, rebase: false
                };
              }
            }]
          }
        }
      }
    },
    // Concatenation Task
    concat: {
      options: {
        separator: ';'
      },
      // dist configuration is provided by useminPrepare
      dist: {}
    },
    // Uglify javascript task
    uglify: {
      // dist configuration is provided by useminPrepare
      dist: {}
    },
    // CSS minification task
    cssmin: {
      // dist configuration is provided by useminPrepare
      dist: {}
    },
    // Filerev - Adds file revision number to JS and CSS files
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 20
      },
      release: {
        // filerev:release - hashes(using md5) all assets (img, js, css)
        // in 'dist' folder
        files: [{
          src: ['dist/js/*.js', 'dist/css/*.css']
        }]
      }
    },
    // Configure the Usemin task
    // Replaces all assets with their revved version in html and css files.
    usemin: {
      html: ['dist/contactus.html','dist/aboutus.html','dist/index.html'],
      options: {
        // options.assetDirs contains the directories for finding the assets
        // according to their relative paths
        assetsDirs: ['dist', 'dist/css','dist/js']
      }
    },
    // Configure html min task 
    // (AFTER Usemin replaces HTML files 
    // and concatenates CSS and JS files)
    htmlmin: {
      // Target is dist
      dist: {
        // Target options
        options: {
          collapseWhitespace: true
        },
        // Dictionary of files
        files: {
          // 'destination': 'source'
          'dist/index.html': 'dist/index.html',
          'dist/contactus.html': 'dist/contactus.html',
          'dist/aboutus.html': 'dist/aboutus.html',
        }
      }
    }

  });

  // Register the SASS task (at line 12)
  grunt.registerTask('css', ['sass']);
  
  // Register the watch and browserSync tasks
  // The WATCH task MUST be always the LAST task,
  // otherwise watch will stop all other tasks that comes after it.
  grunt.registerTask('default', ['browserSync', 'watch']);

  // Register for build - in ORDER of execution!!
  // the tasks of: clean, copy, imagemin etc. 
  grunt.registerTask('build', [
    'clean', 
    'copy', 
    'imagemin',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);
};