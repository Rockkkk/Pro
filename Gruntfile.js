//'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        //pkg: grunt.file.readJSON('package.json'),
		//var path = require('path');
		//var isWindows = (process.platform === 'win32'),
		//var ptorDir = 'node_modules' + (isWindows ? '/.' : '/protractor/') + 'bin/';
        protractor: {
            options: {
                configFile: "protractor.conf.js", // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            your_target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
                    configFile: "protractor.conf.js", // Target-specific config file
                    args: {} // Target-specific arguments
                }
            }
        },
        /*exec: {	  

            webdriverStart :{
                command: '.\\node_modules\\.bin\\webdriver-manager start'
            },
            webdriverStop :{
                command: 'start http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer'
            }


        },*/
        protractor_webdriver: {
            target: {
                options: {
                   // path: 'node_modules/.bin/',
                    path: '',
                    keepAlive:true,
                    command: 'webdriver-manager start'
                }
            }
        },
		
        concurrent: {
            target: {
                //tasks: ['exec:webdriverStart', 'protractor'],
                tasks: ['protractor_webdriver', 'protractor'],
                //tasks: ['protractor'],
                options: {
                    logConcurrentOutput: false
                }
            }
        },
        
        /**
         * ========================================
         * create the tasks for unit tests - client side
         * Using: Karma
         * ========================================
         */
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                reporters: ['progress', 'junit'],
                junitReporter: {
                  outputFile: 'reports/qunit-testresults.xml',
                  suite: ''
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-protractor-runner');
    //grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-concurrent');    
    grunt.loadNpmTasks('grunt-protractor-webdriver');

    grunt.loadNpmTasks('grunt-karma');
    //grunt.registerTask('default', ['concurrent:target']);    
    //grunt.registerTask('default', ['exec:webdriverStart','protractor']);
    grunt.registerTask('test', ['protractor_webdriver','protractor']);
    grunt.registerTask('karma-unit', ['karma']);

};
