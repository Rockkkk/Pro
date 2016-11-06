var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var path = require('path');
var fs = require('fs');
var jasmineReporters = require('jasmine-reporters');
//var commUtil = require('./test/com/thed/zephyr/connect/functionaltest/utils/commUtil.js');
var q = require("q");
var FirefoxProfile = require("firefox-profile");


exports.config = {
    framework: "jasmine2",
  allScriptsTimeout: 10000000,
  seleniumServerJar: null,
  //seleniumServerJar: "./test/resources/selenium-server.jar",
  //seleniumServerJar: "./node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar",
 // seleniumPort: null,
  //seleniumArgs: ['-browserTimeout=60'],
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  //specs: ['./test/com/thed/zephyr/connect/functionaltest/functionaltest/PlanTestCycle.js'],
    //specs: ['./test/com/thed/zephyr/connect/functionaltest/functionaltest/CreateTest.js'],
    //specs: ['./test/com/thed/zephyr/connect/functionaltest/bvt/testUser1.js'],
    //specs: ['./test/com/thed/zephyr/connect/functionaltest/bvt/testUser1.js'],
    specs: ['./test/com/thed/zephyr/connect/functionaltest/functionaltest/PlanTestCycle.js'],
    //specs: ['./test/com/thed/zephyr/connect/functionaltest/bvt/testBamboo.js', './test/com/thed/zephyr/connect/functionaltest/bvt/testUser.js'],
    //specs: ['./test/com/thed/zephyr/connect/functionaltest/bvt/AdminBVTs.js', './test/com/thed/zephyr/connect/functionaltest/bvt/UserBvts.js'],
  // specs: ['./test/com/thed/zephyr/connect/functionaltest/bvt/AdminBVTs.js'],
    //specs: ['./test/com/thed/zephyr/connect/functionaltest/bvt/testAdmin.js'],
    //seleniumArgs: ['-Dwebdriver.ie.driver = ./node_modules/protractor/selenium/IEDriverServer.exe'],
   capabilities: {
      browserName: 'firefox'
      //'phantomjs.binary.path': require('phantomjs').path
    },
  /*  getMultiCapabilities: function() {
        return q.all([
            makeFirefoxProfile(
                {
                    "browser.download.folderList": 2,
                    "browser.download.dir": "D:\\export\\",
                    "browser.helperApps.neverAsk.saveToDisk": "image/jpg, text/csv,text/xml,application/xml,application/vnd.ms-excel,application/x-excel,application/x-msexcel,application/excel,application/pdf,application/octet-stream"
                },
                ['./test/com/thed/zephyr/connect/functionaltest/bvt/testUser1.js']
            )
        ]);
    },*/
    /*capabilities: {
        'browserName': 'chrome',
        'platform': 'ANY',
        'version': 'ANY',
        'chromeOptions': {
            // Get rid of --ignore-certificate yellow warning
            args: ['--no-sandbox', '--test-type=browser'],
            // Set download path and avoid prompting for download even though
            // this is already the default on Chrome but for completeness
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'default_directory': 'D:\\export\\',
                },
            },
        },
        // No way around for Firefox until https://code.google.com/p/selenium/issues/detail?id=7978
        // 'profile.browser.helperApps.neverAsk.saveToDisk': mimeTypes.join(', '),
        // 'profile.browser.download.dir': '/e2e/downloads/',
    },*/
  params: {
    testdata: {
        environment : "local",
        //projectCentricView : "disabled",
        projectCentricView : "enabled",
      //jiraUrl: 'http://192.168.11.92:2990/jira/login.jsp',
        //jiraUrl: 'http://52.74.62.238/jira/login.jsp',
        jiraUrl: 'http://52.74.148.7/jira/login.jsp',
         //jiraUrl: 'https://zfjcloud-qa3.atlassian.net/',
	  connectUrl : "http://192.168.11.92/connect/atlassian-connect.json",
	  //connectUrl : "http://54.186.101.54/connect/atlassian-connect.json",
      adminUsername: 'admin',
      //adminPassword: 'ZfjCloud#1',
        adminPassword: 'admin',
      userUsername: 'user1',
      userPassword: 'user1',
      //pageLoadTimeout : 3000,
      //loadTimeout : 1000,
      waitTimeOutHigh: 180000,
      waitTimeOutMedium :150000,
      waitTimeOutLow : 15000,
      implicitWaitTimeHigh : 120000,
      implicitWaitTimeMedium : 60000,
      implicitWaitTimeLow : 15000,
      HardCodedWaitTimeOutHigh : 5000,
      HardCodedWaitTimeOutMedium : 3000,
      HardCodedWaitTimeOutLow : 1000,
      PageLoadTimeOut : 250000,
      project: 'IE',
      projectSchema: 'JIRA Default Schemes',
      createProject : "false",
      jiraVersion : 63,
      zfjcloudVersion : 10,
      component1 : 'Component1',
      component2 : 'Component2',
      component3 : 'Component3',
      version1 : 'Version 1.0',
      version2 : 'Version 2.0',
      version3 : 'Version 3.0',
      priority1 : 'Highest',
      priority2 : 'High',
      priority3 : 'Medium',
      priority4 : 'Low',
      priority5 : 'Lowest'
    }
  },
  onPrepare: function() {

      global.driver = browser.driver;
    // for non-angular page
    browser.ignoreSynchronization = true;
      //driver.manage().deleteAllCookies();
     // driver.manage().timeouts().setScriptTimeout(500000);
    // implicit and page load timeouts
     // driver.manage().timeouts().pageLoadTimeout(180000);
     // driver.manage().timeouts().implicitlyWait(180000);
      global.assert = require('assert');
      global.list = [];
      if(browser.params.testdata.environment === "prod"){
          browser.params.testdata.priority1 = "Highest";
          browser.params.testdata.priority2 = "High";
          browser.params.testdata.priority3 = "Medium";
          browser.params.testdata.priority4 = "Low";
          browser.params.testdata.priority5 = "Lowest";
          console.log(browser.params.testdata.priority1);
          console.log(browser.params.testdata.priority2);
          console.log(browser.params.testdata.priority3);
          console.log(browser.params.testdata.priority4);
          console.log(browser.params.testdata.priority5);
          //browser.params.testdata.adminUsername = "manoj.behera";
          //browser.params.testdata.adminPassword = "m@n0j@zephyr";
      }
      //Configuration of Logger
      var log4js = require('log4js');
      log4js.loadAppender('file');
      var fileName = new Date().toDateString()+'-logs.log';
      console.log("reports/"+fileName);
      console.log("exist : "+fs.existsSync("reports/"+fileName));
      if (!fs.existsSync("reports")){
          fs.mkdirSync("reports");
      }
      if (fs.existsSync("reports/"+fileName)) {
          console.log('Found file');
          fs.unlink(fileName, function(err) {console.log("Successfully deleted old logs")})
      }
      log4js.addAppender(log4js.appenders.file("./reports/"+fileName), 'logs');
      global.logger = log4js.getLogger('logs');
      logger.setLevel('INFO');

      jasmine.getEnv().addReporter(
          new HtmlScreenshotReporter({
              dest: './reports/Html Reports/screenshots',
              filename: 'zfjCloudReport.html'
          })
      );

      var capsPromise = browser.getCapabilities();
      capsPromise.then(function(caps){
          var browserName = caps.caps_.browserName.toUpperCase();
          console.log("======="+browserName);
          var browserVersion = caps.caps_.version;
          var prePendStr = browserName + "-" + browserVersion + "-";
          jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
              consolidateAll: true,
              filePrefix: prePendStr,
              savePath: './reports/XMLReport'
          }));
      });

      //var x = new Date();
      //console.log("Time Starts : "+x);
      driver.manage().window().maximize();
      driver.get(browser.params.testdata.jiraUrl, browser.params.testdata.waitTimeOutMedium);

      /*var jiraNavigator1 = require('./test/com/thed/zephyr/connect/functionaltest/jira/JiraNavigatorFactory.js').getInstance();
      browser.ignoreSynchronization = true;
      jiraNavigator1.doLogin(browser.params.testdata.adminUsername, browser.params.testdata.adminPassword, function(doLoginStatus){
          assert.ok(doLoginStatus, "Login Not Successful.");
          browser.ignoreSynchronization = true;
          console.log("Login Successful.");
      });*/
  },

  onComplete: function() {
    // At this point, tests will be done but global objects will still be
      driver.quit();
  },

  
  //onCleanUp: function(exitCode) {},
  onCleanUp: function() {},


    jasmineNodeOpts: {
        onComplete: null,
        showColors: true,
        defaultTimeoutInterval: 900000,
        includeStackTrace: true,
        isVerbose: false,
        // If true, output nothing to the terminal. Overrides other printing options.
        silent: false,
        // If true, print timestamps for failures
        showTiming: true,
        // Print failures in real time.
        realtimeFailure: true
    }


};
var makeFirefoxProfile = function(preferenceMap, specs) {
    var deferred = q.defer();
    var firefoxProfile = new FirefoxProfile();

    for (var key in preferenceMap) {
        firefoxProfile.setPreference(key, preferenceMap[key]);
    }

    firefoxProfile.encoded(function (encodedProfile) {
        var capabilities = {
            browserName: "firefox",
            firefox_profile: encodedProfile,
            specs: specs
        };

        deferred.resolve(capabilities);
    });
    return deferred.promise;
};