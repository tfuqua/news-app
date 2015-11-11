module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // JS TASKS ================================================================
    jshint: {
      options: {
          smarttabs:true
      },
      all: ['public/src/js/controllers/*.js'],
    },

    uglify: {
      build: {
        files: {
          'public/dist/js/app.min.js': ['public/src/js/**/*.js', 'public/src/js/*.js']
        }
      }
    },

    // CSS TASKS ===============================================================
    less: {
      build: {
        files: {
          'public/dist/css/style.css': 'public/src/css/style.less'
        }
      }
    },

    sass: {
      dist: {
        options:{
          style: 'compressed'
        },
        files: {
          'public/dist/css/sass.css' : 'public/src/css/sass.scss'
        }
      }
    },

    cssmin: {
      build: {
        files: {
          'public/dist/css/style.min.css': 'public/dist/css/style.css'
        }
      }
    },

    // COOL TASKS ==============================================================
    watch: {
      css: {
        files: ['public/src/css/**/*.less'],
        tasks: ['less', 'cssmin']
      },
      js: {
        files: ['public/src/js/controllers/*.js'],
        tasks: ['jshint', 'uglify']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    },

    compress: {
      main: {
        options: {
          archive: 'dist/code.zip'
        },
        files: [
          {src: ['public/**']},
          {src: ['package.json']},
          {src: ['server.js']}
        ]
      }
    }

  });

  grunt.registerTask('default', ['less', 'sass', 'cssmin', 'jshint', 'uglify', 'concurrent']);
  grunt.registerTask('jenkins', ['less', 'cssmin', 'jshint', 'uglify', 'compress']);

};
