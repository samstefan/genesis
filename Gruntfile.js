module.exports = function(grunt) {

  // Set up project build folder structure.
  var path = require('path')
  ,   root = path.normalize(__dirname)

  grunt.file.mkdir(root+'/build/assets/css/')
  grunt.file.mkdir(root+'/build/assets/img/')
  grunt.file.mkdir(root+'/build/assets/js/')
  grunt.file.mkdir(root+'/build/assets/js/vendor/')

  // Project configuration.
  var config =
    { rsync:
      { images:
        { options:
          { recursive: true
          , syncDest: true
          , exclude: ['.gitkeep']
          , src: 'app/images/'
          , dest: 'build/assets/img/'
          }
        }
      , javascript:
        { options:
          { recursive: true
            // Javascript files that are not concatenated into the app.min.js need to be rsynced into the build folder.
          , src: 'app/javascript/vendor/modernizr.custom.38277.js'
          , dest: 'build/assets/js/vendor/'
          }
        }
      }
    , imagemin:
      { compress:
        { options:
          // Image compression level.
          { optimizationLevel: 3 }
          , files:
          [ { expand: true
            , cwd: 'build/assets/img/'
            , src: ['**/*.{png,jpg,gif}']
            , dest: 'build/assets/img/'
            }
          ]
        }
      }
    , stylus:
      { compile:
        { options:
          { compress: false
          , data: { debug: true, }
          }
        , files: { 'build/assets/css/global.css': 'app/stylus/main.styl' }
        }
      , deploy:
        { options: { compress: true }
        , files: { 'build/assets/css/global.css': 'app/stylus/main.styl' }
        }
      }
    , jade:
      { compile:
        { options:
          { pretty: true
          , data:
            { debug: true
            , compress: false
            }
          }
        , files:
          // Add in your jade template files here.
          { 'build/index.html': [ 'app/templates/index.jade' ] }
        }
      , deploy:
         { options:
          { data:
            { debug: false
            , compress: true
            }
          }
        , files:
          // Add in your jade template files here.
          { 'build/index.html': [ 'app/templates/index.jade' ] }
        }
      }
    , watch:
      { stylus:
        { files: ['app/stylus/*.styl', 'app/stylus/*/*.styl']
        , tasks: 'stylus:compile'
        , options: { livereload: true }
        }
      , jade:
        { files: ['app/templates/*.jade', 'app/templates/*/*.jade']
        , tasks: 'jade:compile'
        , options: { livereload: true }
        }
      , rsync:
        { files: ['app/images/*']
        , tasks: 'rsync'
        }
      , javascript:
        { files: ['app/javascript/*', 'app/javascript/vendor/*']
        , tasks: 'uglify:compile'
        }
      , images:
        { files: ['build/assets/img/*', 'build/assets/img/**/*']
        , tasks: 'imagemin'
        }
      }
    , connect:
      { server:
        { options:
          { port: 1337
          , base: 'build'
          , hostname: '*'
          }
        }
      , keepalive:
        { options:
          { keepalive: true
          , port: 1337
          , base: 'build'
          }
        }
      }
    , uglify:
      { compile:
        { options:
          { beautify:
            { width: 120
            , beautify: true
            }
          }
        , files:
          // Add in your Javascript files here.
          // Made sure you added the javascript files in order of the dependency tree.
          { 'build/assets/js/app.min.js': ['app/javascript/vendor/jquery-1.9.1.min.js', 'app/javascript/vendor/respond.min.js', 'app/javascript/app.js'] }
        }
      , deploy:
        { files:
          // Add in your Javascript files here.
          // Made sure you added the Javascript files in order of the dependency tree.
          { 'build/assets/js/app.min.js': ['app/javascript/vendor/jquery-1.9.1.min.js', 'app/javascript/vendor/respond.min.js', 'app/javascript/app.js']
          , 'build/assets/js/vendor/modernizr.custom.38277.js': ['app/javascript/vendor/modernizr.custom.38277.js']
          }
        }
      }
    }

  grunt.initConfig(config)

  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-rsync')
  grunt.loadNpmTasks('grunt-contrib-imagemin')

  // Tasks.
  grunt.registerTask('default', ['stylus:compile', 'jade:compile', 'uglify:compile', 'rsync', 'imagemin', 'connect:server', 'watch'])
  grunt.registerTask('build', ['stylus:compile', 'jade:compile', 'uglify:compile', 'rsync'])
  grunt.registerTask('server', 'connect:keepalive')
  grunt.registerTask('deploy', ['stylus:deploy', 'jade:deploy', 'uglify:deploy', 'rsync', 'imagemin'])

}