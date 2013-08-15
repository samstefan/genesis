module.exports = function(grunt) {
  // Project configuration.
  var config =
    { stylus:
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
      }
    , connect:
      { server:
        { options:
          { port: 1337
          , base: 'build'
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
            { width: 80
            , beautify: true
            }
          }
        , files:
          // Add in your javascript files here.
          { 'build/assets/js/app.min.js': ['app/javascript/app.js'] }
        }
      , deploy:
        { files:
          // Add in your javascript files here.
          { 'build/assets/js/app.min.js': ['app/javascript/app.js'] }
        }
      }
    }

  grunt.initConfig(config)

  // Load tasks from "grunt-sample" grunt plugin installed via Npm.
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-uglify')

  // Default task.
  grunt.registerTask('default', ['stylus:compile', 'jade:compile', 'uglify:compile', 'connect:server', 'watch'])
  grunt.registerTask('build', ['stylus:compile', 'jade:compile', 'uglify:compile'])
  grunt.registerTask('server', 'connect:keepalive')
  grunt.registerTask('deploy', ['stylus:deploy', 'jade:deploy', 'uglify:deploy'])

}