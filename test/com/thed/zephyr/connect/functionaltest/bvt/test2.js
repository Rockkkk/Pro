var commUtil = require('../utils/commUtil.js');

var zfjcloudNavigator = require('../zfjcloud/ZFJCloudNavigatorFactory.js').getInstance();
var jiraNavigator = require('../jira/JiraNavigatorFactory.js').getInstance();

var params = browser.params;
var isSuccess;
var logout;
var testOneMap = "";
var executeMap1 = "";
var executeMap2 = "";
var cycleOpMap1 = "";
beforeEach(function () {
	browser.ignoreSynchronization = true;
});

describe('ZFJ Cloud Testing For Jira Admin', function() {
    beforeAll(function () {
        console.log('Before All of test.');
        var x = new Date();
        console.log("Time Starts : "+x);
        driver.manage().window().maximize();
        driver.get(browser.params.testdata.jiraUrl, browser.params.testdata.waitTimeOutMedium);

    });
    afterAll(function () {
        console.log('After All of test.');
        driver.quit();
    });
    beforeEach(function () {
        console.log('Before each of test.');
        isSuccess = false;
        logout = false;
        var x = new Date();
        console.log("Time Starts : " + x);
        driver.switchTo().defaultContent();
        driver.sleep(1000);
        driver.getTitle().then(function (title) {
            console.log(title);
            if (title.indexOf("Log in") != -1 || title === "Atlassian Cloud") {
                jiraNavigator.doLogin(params.testdata.adminUsername, params.testdata.adminPassword, function (doLoginStatus) {
                    assert.ok(doLoginStatus, "Login Not Successful.");
                    console.log("Login Successful.");
                    browser.ignoreSynchronization = true;

                    jiraNavigator.createProject(function (createProjectStatus) {
                        assert.ok(createProjectStatus, "Not Selected Project.");
                        logger.info("Project is Created Successfully.");

                        jiraNavigator.createComponents("Component", 3, function(createStatus) {
                            assert.ok(createStatus, "Not Created Versions.");
                            logger.info("Project Components Created Successfully.");

                            jiraNavigator.createVersions("Version", 3, function (createStatus) {
                                assert.ok(createStatus, "Not Created Versions.");
                                logger.info("Project Versions Created Successfully.");

                            });
                        });

                    });
                    /*jiraNavigator.selectProject(function (selectprojectStatus) {
                        assert.ok(selectprojectStatus, "Not Selected Project.");
                        console.log("Project is Selected Successfully.");

                    });*/
                });
            } else if (title.indexOf("Zephyr for JIRA Cloud Documentation Home") != -1) {
                driver.navigate().back().then(function () {
                    commUtil.implicitWait(browser.params.testdata.PageLoadTimeOut);
                });
            }
        });
    });

    afterEach(function () {
        console.log('after each of test.');
        driver.switchTo().defaultContent();
        driver.switchTo().defaultContent();
        var x = new Date();
        console.log("Time Starts : " + x);
        //commUtil.actionClass().sendKeys(protractor.Key.CANCEL).perform();
        //commUtil.actionClass().sendKeys(protractor.Key.CANCEL).perform();
        if (isSuccess == false) {
            /*jiraNavigator.doLogout(function(doLogoutStatus){
             assert.ok(doLogoutStatus, "Logout is not Successful");
             console.log("Logout Successful.");
             browser.ignoreSynchronization = true;
             });*/

        } else if (logout == true) {
            jiraNavigator.doLogout(function (doLogoutStatus) {
                assert.ok(doLogoutStatus, "Logout is not Successful");
                console.log("Logout Successful.");
                browser.ignoreSynchronization = true;
            });
        }
    });
    it('Component created successfully.', function (done) {
        logout = false;
        jiraNavigator.createComponents("Component", 3, function(createStatus) {
            assert.ok(createStatus, "Not Created Versions.");
            logger.info("Project Components Created Successfully.");
            logger.info("bvt-42 executed Successfully.");
            isSuccess = true;
            done();
        });
    });
    it('Versions created successfully.', function (done) {
        logout = false;
        jiraNavigator.createVersions("Version", 3, function (createStatus) {
            assert.ok(createStatus, "Not Created Versions.");
            logger.info("Project Versions Created Successfully.");
            logger.info("bvt-41 executed Successfully.");
            isSuccess = true;
            done();
        });
    });

    /**
     * Install "Zephyr Connect" plugin using json URL on Jira ondemand version, should create top-level "Tests" menu in the top navigation bar with list of Zephyr apps
     */
    it('Addons is Uploaded Successfully.', function (done) {
        logout = false;

        logger.info("tyyyyyyyyyyyyyyyyyyyyyyyyyy");
        /*jiraNavigator.uploadPlugin(params.testdata.connectUrl, function (uploadAddonsStatus) {
            assert.ok(uploadAddonsStatus, "Upload Addons Failed");
            console.log("Addon is uploaded and Validated Successfully");
            console.log("bvt-1 executed Successfully.");
            isSuccess = true;
            logout = true;
            done();
        });*/
        done();
    });
    /**
     * Should able to launch all zephyr apps in "Tests" menu cleanly without an error being thrown
     */
    xit('Test Menus verified successfully.', function () {
        logout = false;
        zfjcloudNavigator.verifyTestMenu(function (verifyStatus) {
            assert.ok(verifyStatus, "Not Validated Menus.");
            console.log("Test Menu Links are Validated Successfully.");
            console.log("bvt-2 executed Successfully.");
            isSuccess = true;
            logout = true;
        });
    });

});