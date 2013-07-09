module.exports = function(grunt) {
  // Project configuration.
  var config =
      { reload:
        { port: 35729 // LR default
        , liveReload: {}
        }
      , stylus:
        { compile:
          { options: { compress: true }
          , files: { 'build/assets/css/global.css': 'app/stylus/main.styl' }
          }
        }
      , jade:
        { compile:
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
          { files: 'app/stylus/*.styl'
          , tasks: 'stylus reload'
          }
        , jade:
          { files: ['app/templates/*.jade', 'app/templates/*/*.jade']
          , tasks: 'jade reload'
          }
        }
      }

  grunt.initConfig(config)

  // Load tasks from "grunt-sample" grunt plugin installed via Npm.
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-reload')

  // Default task.
  grunt.registerTask('default', ['stylus', 'jade', 'watch'])
  grunt.registerTask('build', ['stylus', 'jade'])
}
