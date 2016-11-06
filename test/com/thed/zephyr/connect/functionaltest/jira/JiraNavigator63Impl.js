var loginPage = require('./jira63po/LoginPage.js');
var jiraLandingPage = require('./jira63po/JiraLandingPage.js');
var customizeTestStatusPage = require('./jira63po/CustomizeTestStatusPage.js');
var customizeStepStatusPage = require('./jira63po/CustomizeStepStatusPage.js');
var zfjcloudNavigator = require('../zfjcloud/ZFJCloudNavigatorFactory.js').getInstance();
var manageAddonsPage = require('./jira63po/ManageAddonsPage.js');
var searchTestPage = require('../zfjcloud/zfjcloud10po/SearchTestPage.js');
var CreateTestPage = require('../zfjcloud/zfjcloud10po/CreateTestPage.js');
var planTestCyclePage = require('../zfjcloud/zfjcloud10po/PlanTestCyclePage.js');
var ExecuteTestPage = require('../zfjcloud/zfjcloud10po/ExecuteTestPage.js');
var TestSummaryPage = require('../zfjcloud//zfjcloud10po/TestSummaryPage.js');
var TestMetricsPage = require('../zfjcloud/zfjcloud10po/TestMetricsPage.js');
var ZfjHelpPage = require('../zfjcloud//zfjcloud10po/ZFJHelpPage.js');
var ZfjWelcomePage = require('../zfjcloud//zfjcloud10po/ZFJWelcomePage.js');
var AboutZephyrPage = require('../zfjcloud//zfjcloud10po/AboutZephyrPage.js');

var JiraNavigator63Impl = function() {

  
  /******************************************************
   *  JIRA NAVIGATOR METHODS
   *****************************************************/

   this.doLogin = function(username, password, isLoginStatus) {
      loginPage.login(username, password, function(loginStatus){
         assert.ok(loginStatus, "Not Logged in to Jira.");
         logger.info("Logged to Jira Successfully.");
          isLoginStatus(loginStatus);
      });
   };

   this.doLogout = function(isLogoutStatus) {
      jiraLandingPage.logout(function(logoutStatus){
         assert.ok(logoutStatus, "Not logged out from Jira.");
         logger.info(" Logged out and ready to login in Login Page.");
          isLogoutStatus(logoutStatus);
      });
   };
    this.navigateToCreateTestPage = function(isNavigateToCreateTestPage){
        jiraLandingPage.navigateToCreateTestPage(function(isNavigateStatus){
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            isNavigateToCreateTestPage(isNavigateStatus);
        });
    };
   this.navigateToSearchTestPage = function(callback) {
      jiraLandingPage.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
         assert.ok(navigateToSearchTestPageStatus, "Not Navigated To search Test page.");
         callback(navigateToSearchTestPageStatus);
      });
   };
    this.navigateToPlanTestCyclePage = function(callback) {
        jiraLandingPage.navigateToPlanTestCyclePage(function(navigateStatus){
            assert.ok(navigateStatus, "Not Navigated To Plan test Cycle page.");
            callback(navigateStatus);
        });
    };
    this.navigateToSearchTestExecutionPage = function(callback) {
        jiraLandingPage.navigateToSearchTestExecutionPage(function(navigateStatus){
            assert.ok(navigateStatus, "Not Navigated To Search Test Execution page.");
            callback(navigateStatus);
        });
    };
    this.navigateToExecuteTestPage = function(isNavigate) {
        jiraLandingPage.navigateToExecuteTestPage(function(navigateStatus){
            assert.ok(navigateStatus, "Not Navigated To Execute Test Page.");
            isNavigate(navigateStatus);
        });
    };
    this.navigateToTestSummaryPage = function(isNavigate){
        jiraLandingPage.navigateToTestSummaryPage(function(navigateToTestSummaryPageStatus){
            assert.ok(navigateToTestSummaryPageStatus, "Not Navigated To Test Summary Page.");
            isNavigate(navigateToTestSummaryPageStatus);
        });
    };
    this.navigateToTestMetricsPage = function(isNavigate){
        jiraLandingPage.navigateToTestMetricsPage(function(navigateToTestMetricsPageStatus){
            assert.ok(navigateToTestMetricsPageStatus, "Not Navigated To Test Metrics Page.");
            isNavigate(navigateToTestMetricsPageStatus);
        });
    };
    this.navigateToWelcomePage = function(isNavigate){
        jiraLandingPage.navigateToWelcomePage(function(navigateToWelcomePageStatus){
            assert.ok(navigateToWelcomePageStatus, "Not Navigated To Welcome Page.");
            isNavigate(navigateToWelcomePageStatus);
        });
    };
    this.navigateToZFJHelpPage = function(isNavigate){
        jiraLandingPage.navigateToZFJHelpPage(function(navigateToZFJHelpPageStatus){
            assert.ok(navigateToZFJHelpPageStatus, "Not Navigated To ZFJ Help Page.");
            isNavigate(navigateToZFJHelpPageStatus);
        });
    };
    this.navigateToAboutZephyrPage = function(isNavigate){
        jiraLandingPage.navigateToAboutZephyrPage(function(navigateToAboutZephyrPageStatus){
            assert.ok(navigateToAboutZephyrPageStatus, "Not Navigated To About Zephyr Page.");
            isNavigate(navigateToAboutZephyrPageStatus);
        });
    };
    this.updateTestExecStatus = function(oldExecStatus, newExecStatus, callback){
        jiraLandingPage.navigateToCustomizeTestStatusPage(function(navigateStatus){
            assert.ok(navigateStatus, "Not Navigated to Step Status Page.");
            logger.info("Navigated To Customize Test Status Page");
            customizeTestStatusPage.updateTestExecStatus(oldExecStatus, newExecStatus, function(updateTestStatus){
                assert.ok(updateTestStatus, "Not updated STatus.");
                logger.info("Test Status is Updated Successfully.");
                callback(updateTestStatus);
            });
        });
    };
    this.addTestExecStatus = function(newExecStatus, statusSummary, statusColor, callback){
        jiraLandingPage.navigateToCustomizeTestStatusPage(function(navigateStatus){
            assert.ok(navigateStatus, "Not Navigated to Step Status Page.");
            logger.info("Navigated to navigate To Customize Test Status Page");
            customizeTestStatusPage.addNewStatus(newExecStatus, statusSummary, statusColor, function(addTestStatus){
                assert.ok(addTestStatus, "Not added STatus.");
                logger.info("Test Status is Updated Successfully.");
                callback(addTestStatus);
            });
        });

    };
    this.updateStepExecStatus = function(oldStepExecStatus, newStepExecStatus, callback){
        jiraLandingPage.navigateToCustomizeStepStatusPage(function(navigateStatus){
            assert.ok(navigateStatus, "Not Navigated to Step Status Page.");
            logger.info("Navigated to navigate To Customize Step Status Page");
            customizeStepStatusPage.updateStepExecStatus(oldStepExecStatus, newStepExecStatus, function(updateStepStatus){
                assert.ok(updateStepStatus, "Not updated STatus.");
                logger.info("Step Status is Updated Successfully.");
                callback(updateStepStatus);
            });
        });
    };
    this.addStepExecStatus = function(newStepExecStatus, statusSummary, statusColor, callback){
        jiraLandingPage.navigateToCustomizeStepStatusPage(function(navigateStatus){
            assert.ok(navigateStatus, "Not Navigated to Step Status Page.");
            logger.info("Navigated to navigate To Customize Step Status Page");
            customizeStepStatusPage.addNewStepStatus(newStepExecStatus, statusSummary, statusColor, function(addStepStatus){
                assert.ok(addStepStatus, "Not added Status.");
                logger.info("Step Status is Updated Successfully.");
                callback(addStepStatus);
            });
        });
    };

    /*this.verifyTestMenu = function() {
        driver.wait(function(){
            jiraLandingPage.navigateToSearchTestpage().then(searchTestPage.validateSearchTestpage);
            jiraLandingPage.navigateToCreateTestPage().then(CreateTestPage.validateCreateTestPage);
            jiraLandingPage.navigateToPlanTestCyclepage().then(planTestCyclePage.validatePlanTestCyclepage);
            jiraLandingPage.navigateToExecuteTestpage().then(ExecuteTestPage.validateExecuteTestpage);
            jiraLandingPage.navigateToTestSummarypage().then(TestSummaryPage.validateTestSummarypage);
            jiraLandingPage.navigateToTestMetricspage().then(TestMetricsPage.validateTestMetricspage);
            jiraLandingPage.navigateToZfjWelcomepage().then(ZfjWelcomePage.validateZfjWelcomepage);
            jiraLandingPage.navigateToZfjHelppage().then(ZfjHelpPage.validateZfjHelppage);
            jiraLandingPage.navigateToAboutZephyrpage().then(AboutZephyrPage.validateAboutZephyrpage);

            return true;
        },30000,"verifying Test Menu failed...!");
    };*/

    /*this.navigateToSearchTestpage = function() {
        return jiraLandingPage.navigateToSearchTestpage();
    };



    this.navigateToPlanTestCyclepage = function(){
        return jiraLandingPage.navigateToPlanTestCyclepage();
    };

    this.navigateToExecuteTestpage = function(){
        return jiraLandingPage.navigateToExecuteTestpage();
    };

    this.navigateToTestSummarypage = function(){
        return jiraLandingPage.navigateToTestSummarypage();
    };

    this.navigateToTestMetricspage = function(){
        return jiraLandingPage.navigateToTestMetricspage();
    };

    this.navigateToZfjWelcomepage = function(){
        return jiraLandingPage.navigateToZfjWelcomepage();
    };

    this.navigateToZfjHelppage = function(){
        return jiraLandingPage.navigateToZfjHelppage();
    };

    this.navigateToAboutZephyrpage = function(){
        return jiraLandingPage.navigateToAboutZephyrpage();
    };

    this.navigateToGeneralConfigPage = function(){
        return jiraLandingPage.navigateToGeneralConfigPage();
    };*/
    this.uploadPlugin = function(url, callback){
        jiraLandingPage.navigateToManageAddOnsPage(function(navigateStatus){
            assert.ok(navigateStatus, "Not Navigated to Manage plugin page.");
            logger.info("Navigated To Manage Addons Page Successfully.");
            manageAddonsPage.uploadAddOns(url, function(uploadAddOnsStatus){
                assert.ok(uploadAddOnsStatus, "Not uploaded plugin.");
                logger.info("Addons is Uploaded Successfully");
                callback(uploadAddOnsStatus);
            });

        });
    };
    this.selectProject = function(callback){
        jiraLandingPage.selectProject(function(status){
           callback(status);
        });
    };
    this.createVersions = function(versionName, sizeOfVersion, callback){
        jiraLandingPage.navigateToProjectPage(function(navigateStatus){
            assert.ok(navigateStatus, "Not navigated To Project Page");
            jiraLandingPage.createVersion(versionName, sizeOfVersion, function(status){
                assert.ok(status, "Not created Version");
                callback(status);
            });
        });

    };
    this.createComponents = function(component, sizeOfComponent, callback){
        jiraLandingPage.navigateToProjectPage(function(navigateStatus){
            assert.ok(navigateStatus, "Not navigated To Project Page");
            jiraLandingPage.createComponent(component, sizeOfComponent, function(status){
                assert.ok(status, "Not created Component");
                callback(status);
            });
        });

    };
    this.navigateToApiAccessPage = function(isNavigate) {
        jiraLandingPage.navigateToApiAccessPage(function(navigateStatus){
            assert.ok(navigateStatus, "Not Navigated To Api Access Page.");
            isNavigate(navigateStatus);
        });
    };
    this.navigateToIssueTypeSchemaPage = function(isNavigate) {
        jiraLandingPage.navigateToIssueTypeSchemaPage(function(navigateStatus){
            assert.ok(navigateStatus, "Not Navigated To Issue Type Schema Page.");
            isNavigate(navigateStatus);
        });
    };
    this.updateBaseUrl = function(isClosed) {
        logger.info("Inside close popup method.");
        jiraLandingPage.closeAllPopupAndNavigate(function(closedStatus){
            assert.ok(closedStatus, "Not closed all popup.");
            isClosed(closedStatus);
        });
    };
    this.createProject = function(isCreatedProject) {
        jiraLandingPage.createProject(function(isCreated){
            assert.ok(isCreated, "Not created project.");
            isCreatedProject(isCreated);
        });
    };

};
module.exports = new JiraNavigator63Impl();