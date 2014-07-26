module.exports = function(grunt) {

  grunt.initConfig({
    
   
    qunit: {
        all: {
          options: {
            urls: [
              "http://127.0.0.1/simplepubsub/tests/testrunner.html",
            ]
          }
        }
    },
    uglify: {
    my_target: {
      files: {
        'sps.min.js': ['sps.js']
      }
    }
  },
  jsdoc : {
        dist : {
            src: ['sps.js'],
            jsdoc: './node_modules/.bin/jsdoc',
            options: {
                destination: 'doc'
                
            }
        }
    }
    
  });

  
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsdoc');
  

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('doc', ['jsdoc']);

  grunt.registerTask('default', ['qunit','uglify','jsdoc']);

};