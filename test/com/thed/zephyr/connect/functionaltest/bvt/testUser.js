/**
 * Created by zephyr on 23/12/2015.
 */
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
var addDefectMap = "";
var commentTestMap = "";
beforeEach(function () {
    browser.ignoreSynchronization = true;
});

describe('ZFJ Cloud Testing For Jira Admin', function() {
    beforeAll(function () {
        var x = new Date();
        logger.info("Time Starts : " + x);
        logger.info('Before All of test.');
        //driver.manage().window().maximize();
        //driver.get(browser.params.testdata.jiraUrl, browser.params.testdata.waitTimeOutMedium);
        if (params.testdata.createProject == "true") {
            logger.info("Create project status :::" + params.testdata.createProject);
            jiraNavigator.doLogin(params.testdata.userUsername, params.testdata.userPassword, function (doLoginStatus) {
                assert.ok(doLoginStatus, "Login Not Successful.");
                logger.info("Login Successful.");
                browser.ignoreSynchronization = true;
                jiraNavigator.updateBaseUrl(function (isClosedPopups) {
                    assert.ok(isClosedPopups, "Not closed all popups.");
                    logger.info("All popups are closed Successfully.");
                    jiraNavigator.createProject(function (createProjectStatus) {
                        assert.ok(createProjectStatus, "Not Selected Project.");
                        logger.info("Project is Created Successfully.");

                        jiraNavigator.createComponents("Component", 3, function (createStatus) {
                            assert.ok(createStatus, "Not Created Versions.");
                            logger.info("Project Components Created Successfully.");

                            jiraNavigator.createVersions("Version", 3, function (createStatus) {
                                assert.ok(createStatus, "Not Created Versions.");
                                logger.info("Project Versions Created Successfully.");
                                params.testdata.createProject = "false";

                            });
                        });

                    });
                });

            });
        } else {
            logger.info("Create project status :" + params.testdata.createProject);
            jiraNavigator.doLogin(params.testdata.userUsername, params.testdata.userPassword, function (doLoginStatus) {
                assert.ok(doLoginStatus, "Login Not Successful.");
                logger.info("Login Successful.");
                browser.ignoreSynchronization = true;
                jiraNavigator.updateBaseUrl(function (isClosedPopups) {
                    assert.ok(isClosedPopups, "Not closed all popups.");
                    logger.info("All popups are closed Successfully.");
                    /*jiraNavigator.selectProject(function (selectprojectStatus) {
                        assert.ok(selectprojectStatus, "Not Selected Project.");
                        logger.info("Project is Selected Successfully.");

                    });*/
                });
            });
        }

    });
    afterAll(function () {
        logger.info('After All of test.');
        //driver.quit();
    });
    beforeEach(function () {
        logger.info('Before each of test.');
        isSuccess = false;
        logout = false;
        var x = new Date();
        logger.info("Time Starts : " + x);
        driver.switchTo().defaultContent();
        driver.sleep(1000);
        driver.getTitle().then(function (title) {
            logger.info(title);
            if (title.indexOf("Log in") != -1 || title === "Atlassian Cloud") {
                jiraNavigator.doLogin(params.testdata.userUsername, params.testdata.userPassword, function (doLoginStatus) {
                    assert.ok(doLoginStatus, "Login Not Successful.");
                    logger.info("Login Successful.");
                    browser.ignoreSynchronization = true;
                    /*jiraNavigator.closeAllPopupAndNavigate(function(isClosedPopups){
                     assert.ok(isClosedPopups, "Not closed all popups.");
                     logger.info("All popups are closed Successfully.");
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
        logger.info('after each of test.');
        driver.switchTo().defaultContent();
        driver.switchTo().defaultContent();
        var x = new Date();
        logger.info("Time Starts : " + x);
        //commUtil.actionClass().sendKeys(protractor.Key.CANCEL).perform();
        //commUtil.actionClass().sendKeys(protractor.Key.CANCEL).perform();
        if (isSuccess == false) {
            /*jiraNavigator.doLogout(function(doLogoutStatus){
             assert.ok(doLogoutStatus, "Logout is not Successful");
             logger.info("Logout Successful.");
             browser.ignoreSynchronization = true;
             });*/

        } else if (logout == true) {
            jiraNavigator.doLogout(function (doLogoutStatus) {
                assert.ok(doLogoutStatus, "Logout is not Successful");
                logger.info("Logout Successful.");
                browser.ignoreSynchronization = true;
            });
        }
    });
    //bvt-39
    xit('Test Menus verified successfully.', function() {
        logout = false;
        zfjcloudNavigator.verifyTestMenu(function(verifyStatus){
            assert.ok(verifyStatus, "Not Validated Menus.");
            logger.info("Test Menu Links are Validated Successfully.");
            logger.info("bvt-41 executed Successfully.");
            isSuccess = true;
        });
    });
    /**
     * A new Test can be created cleanly in a Jira project (For issue type=Test)
     */
    xit('Test is Created Successfully.', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Test For admin",
            PRIORITY: browser.params.testdata.priority1,
            COMPONENT: browser.params.testdata.component1,
            //AFFECTEDVERSION: "Version 1.0",
            FIXVERSION: "Version 2.0",
            //ENVIRONMENT: "Env",
            DESCRIPTION: "testing angry bird against Android os",
            LABEL: "jellybean"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            logger.info("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                logger.info("Test name :" + createTestMap.TESTNAME);
                testOneMap = createTestMap;
                logger.info("Test name After Assigned  :" + testOneMap.TESTNAME);
                logger.info("BVT-7 executed Successfully.");
                isSuccess = true;
                done();
            });
        });

    });
    /**
     * Able to add test steps to the Test
     */
    xit('Create Test steps.', function (done) {
        logout = false;
        var testStepMap = [];
        testStepMap.push({
            step: 'test step 1',
            data: 'test data 1',
            result: 'test result 1'
        });
        testStepMap.push({
            step: 'test step 2',
            data: 'test data 2',
            result: 'test result 2'
        });
        testStepMap.push({
            step: 'test step 3',
            data: 'test data 3',
            result: 'test result 3'
        });
        testStepMap.push({
            step: 'test step 4',
            data: 'test data 4',
            result: 'test result 4'
        });
        testStepMap.push({
            step: 'test step 5',
            data: 'test data 5',
            result: 'test result 5'
        });
        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            assert.ok(navigateToSearchTestPageStatus, "Not navigated to search test page");
            logger.info("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.addTeststepsToTest(testStepMap, function (executeTestStatus) {
                assert.ok(executeTestStatus, "Not added step to test.");
                logger.info("Added Step To Test Successfully.");
                logger.info("bvt-8 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Should able to edit and modify a test step
     */
    xit('Should able to edit and modify a test step.', function (done) {
        logout = false;
        /*var createTestMap = {
         TESTNAME : "IE-1",
         SUMMARY: "test"
         };*/

        var createTestMap = testOneMap;
        var editStepMap = {
            TESTNAME : createTestMap.TESTNAME,
            STEP : "step dited",
            DATA : "Data edited",
            RESULT : "Result Edited",
            STEPNUM : "1"
        };
        logger.info("Test name After Assigned  :" + createTestMap.TESTNAME);
        zfjcloudNavigator.quickSearchById(createTestMap, function (isSearched) {
            assert.ok(isSearched, "Not searched Test.");
            logger.info("Test Searched Successfully.");
            zfjcloudNavigator.editTestStep(editStepMap, function(stepEditStatus){
                assert.ok(stepEditStatus, "Not Edited Step");
                logger.info("Step Edited Successfully.");
                isSuccess = true;
                done();
            });

        });
    });
    xit('Should able to Clone a test Step after the selected row.', function (done) {
        logout = false;
        /*var createTestMap = {
         TESTNAME : "IE-12",
         SUMMARY: "Version 2.0"
         };*/

        var createTestMap = testOneMap;
        var testStepMap = {
            TESTNAME : createTestMap.TESTNAME,
            STEPNUM : "3",
            TYPE : "after step"
            //TYPE : "before step"
        };
        logger.info("Test name After Assigned  :" + createTestMap.TESTNAME);
        zfjcloudNavigator.quickSearchById(createTestMap, function (isSearched) {
            assert.ok(isSearched, "Not searched Test.");
            logger.info("Test Searched Successfully.");
            zfjcloudNavigator.cloneTestStep(testStepMap, function(stepEditStatus){
                assert.ok(stepEditStatus, "Not Edited Step");
                logger.info("Step Cloned Successfully.");
                isSuccess = true;
                done();
            });

        });
    });
    xit('Should able to Delete a Test step.', function (done) {
        logout = false;
        /*var createTestMap = {
         TESTNAME : "IE-12",
         SUMMARY: "Version 2.0"
         };*/

        var createTestMap = testOneMap;
        var testStepMap = {
            TESTNAME : createTestMap.TESTNAME,
            STEPNUM : "4"
        };
        logger.info("Test name After Assigned  :" + createTestMap.TESTNAME);
        zfjcloudNavigator.quickSearchById(createTestMap, function (isSearched) {
            assert.ok(isSearched, "Not searched Test.");
            logger.info("Test Searched Successfully.");
            zfjcloudNavigator.deleteTestStep(testStepMap, function(stepEditStatus){
                assert.ok(stepEditStatus, "Not Edited Step");
                logger.info("Step Cloned Successfully.");
                isSuccess = true;
                done();
            });

        });
    });
    //bvt-14
    xit('Search test by id', function (done) {
        logout = false;
        /*var createTestMap = {
         SUMMARY: "Version 1.0",
         PRIORITY: "Minor",
         COMPONENT: "Component1",
         AFFECTEDVERSION: "Version 1.0",
         FIXVERSION: "Version 2.0",
         ENVIRONMENT: "Env",
         DESCRIPTION: "testing angry bird against Android os",
         LABEL: "jellybean"
         };*/
        var createTestMap = testOneMap;
        logger.info("Test name After Assigned  :" + createTestMap.TESTNAME);
        zfjcloudNavigator.quickSearchById(createTestMap, function (isSearched) {
            assert.ok(isSearched, "Not searched Test.");
            logger.info("Test Searched Successfully.");
            isSuccess = true;
            done();
        });
    });
    xit('Test is executed In Adhoc from View Test Page.', function(done) {
        logout = false;
        var executeTestMap = {
            // VERSIONNAME : "Version 1.0",
            //CYCLENAME : "cycle one",
            TESTNAME : "",
            EXECUTEADHOC : "BLOCKED"
            //TESTDEFECT : "IE-3",
            //TESTCOMMENT : "comment"

        };
        executeTestMap = testOneMap;
        executeTestMap["EXECUTEADHOC"] = "BLOCKED";
        zfjcloudNavigator.quickSearchById(executeTestMap, function(isSearched){
            assert.ok(isSearched, "Not searched Test.");
            logger.info("Test Searched Successfully.");
            zfjcloudNavigator.executeTestInAdHocFromViewTestPage(executeTestMap, function(executeTestStatus){
                assert.ok(executeTestStatus, "Not Executed Test.");
                logger.info("Test is Executed in view Issue Page Successfully.");
                logger.info("bvt-55 executed Successfully.");
                isSuccess = true;
                done();
            });
        });

    });
    xit('Test is executed In Adhoc from View Test Page.', function(done) {
        logout = false;
        var executeTestMap = {
            // VERSIONNAME : "Version 1.0",
            //CYCLENAME : "cycle one",
            TESTNAME : "",
            EXECUTEADHOC : "BLOCKED"
            //TESTDEFECT : "IE-3",
            //TESTCOMMENT : "comment"

        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY : "Eecute Test in Ad hoc."
            //TESTNAME : "IE-14"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            executeTestMap.TESTNAME = createTestMap.TESTNAME;
            logger.info("Test To Execute ID :" + executeTestMap.TESTNAME);
            zfjcloudNavigator.quickSearchById(createTestMap, function(isSearched){
                assert.ok(isSearched, "Not searched Test.");
                logger.info("Test Searched Successfully.");
                zfjcloudNavigator.executeTestInAdHocFromViewTestPage(executeTestMap, function(executeTestStatus){
                    assert.ok(executeTestStatus, "Not Executed Test.");
                    logger.info("Test is Executed in view Issue Page Successfully.");
                    logger.info("bvt-55 executed Successfully.");
                    isSuccess = true;
                    done();
                });
            });
        });

    });
    //bvt-47
    it('Test is executed With Defect.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "",
            TESTSTATUS : "FAIL",
            TESTDEFECT : ""
            //TESTCOMMENT : "comment"
            //STEPSTATUS : "FAIL",
            //STEPDEFECT : "IE-1",
            //STEPCOMMENT : "Comment On Step",
            //STEPNUM : "2"

        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY : "Test one."
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            zfjcloudNavigator.addSteps(createTestMap, function(isAddedStep) {
                assert.ok(isAddedStep);
                executeTestMap.TESTNAME = createTestMap.TESTNAME;
                logger.info("Test To Execute ID :"+executeTestMap.TESTNAME);
                jiraNavigator.navigateToPlanTestCyclePage(function(isNavigateToPlanTestCycle){
                    assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                    logger.info("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.addTestToCycle(executeTestMap, function(isAddedTestToCycle){
                        assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                        logger.info("Test is added to Cycle Successfully.");
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest){
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTDEFECT = createTestMap.TESTNAME;
                            logger.info("Test defect ID :"+executeTestMap.TESTDEFECT);
                            addDefectMap = executeTestMap;
                            zfjcloudNavigator.executeTestUsingE(executeTestMap, function(isExecutedTest){
                                assert.ok(isExecutedTest, "Not Executed Test.");
                                logger.info("Test is executed Directly Plan test Cycle Page.");
                                logger.info("bvt-23 executed Successfully.");
                                isSuccess = true;
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
    //bvt-48
    it('Step is executed with Defect Successfully.', function(done) {
        logout = false;
        /*var executeTestMap = {
         VERSIONNAME : "Version 1.0",
         CYCLENAME : "cycle two",
         TESTNAME : "",
         //TESTSTATUS : "FAIL"
         //TESTDEFECT : "IE-1",
         //TESTCOMMENT : "comment"
         STEPSTATUS : "FAIL",
         STEPDEFECT : "",
         //STEPCOMMENT : "Comment On Step",
         STEPNUM : "2"

         };
         var createTestMap = {
         ISSUETYPE: "Test",
         SUMMARY : "Test one."
         //PRIORITY : "Minor"
         };*/
        var executeTestMap = addDefectMap;
        executeTestMap["STEPSTATUS"] = "FAIL";
        executeTestMap["STEPDEFECT"] = executeTestMap.TESTDEFECT;
        executeTestMap["STEPNUM"] = 2;
        delete executeTestMap["TESTDEFECT"];
        delete executeTestMap["TESTSTATUS"];
        /*zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
         assert.ok(isCreateTest, "Not Created test.");
         executeTestMap.TESTNAME = createTestMap.TESTNAME;
         zfjcloudNavigator.addSteps(createTestMap, function(isAddedStep){
         assert.ok(isAddedStep);*/
        jiraNavigator.navigateToPlanTestCyclePage(function(isNavigateToPlanTestCycle){
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function(isExecutedTest){
                assert.ok(isExecutedTest, "Not Executed Test.");
                logger.info("Test is executed Directly Plan test Cycle Page.");
                logger.info("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
            /*zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
             assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
             logger.info("Test is added to Cycle Successfully.");

             });*/
        });
        //});
        //});
    });
    //bvt-50
    it('Test and Steps are executed With Comment Successfully.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle two",
            TESTNAME : "",
            TESTSTATUS : "FAIL",
            //TESTDEFECT : "IE-1",
            TESTCOMMENT : "comment",
            STEPSTATUS : "FAIL",
            //STEPDEFECT : "IE-1",
            STEPCOMMENT : "Comment On Step",
            STEPNUM : "2"

        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY : "Test one."
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest){
            assert.ok(isCreateTest, "Not Created test.");
            executeTestMap.TESTNAME = createTestMap.TESTNAME;
            zfjcloudNavigator.addSteps(createTestMap, function(isAddedStep){
                assert.ok(isAddedStep);
                jiraNavigator.navigateToPlanTestCyclePage(function(isNavigateToPlanTestCycle){
                    assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                    logger.info("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.addTestToCycle(executeTestMap, function(isAddedTestToCycle){
                        assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                        logger.info("Test is added to Cycle Successfully.");
                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function(isExecutedTest){
                            assert.ok(isExecutedTest, "Not Executed Test.");
                            logger.info("Test is executed Directly Plan test Cycle Page.");
                            logger.info("bvt-23 executed Successfully.");
                            isSuccess = true;
                            commentTestMap = executeTestMap;
                            done();
                        });
                    });
                });
            });
        });
    });
    //bvt-51
    it('Test and Steps Comments are executed Successfully.', function(done) {
        logout = false;
        /* var executeTestMap = {
         VERSIONNAME : "Version 1.0",
         CYCLENAME : "cycle two",
         TESTNAME : "",
         //TESTSTATUS : "FAIL",
         //TESTDEFECT : "IE-1",
         TESTCOMMENT : "comment",
         //STEPSTATUS : "FAIL",
         //STEPDEFECT : "IE-1",
         STEPCOMMENT : "Comment On Step",
         STEPNUM : "2"

         };*/
        var executeTestMap = commentTestMap;
        executeTestMap["TESTEDITCOMMENT"] = "Test comment Edited";
        executeTestMap["STEPEDITCOMMENT"] = "Step comment Edited";
        /*var createTestMap = {
         ISSUETYPE: "Test",
         SUMMARY : "Test one."
         //PRIORITY : "Minor"
         };*/
        /*zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest){
         assert.ok(isCreateTest, "Not Created test.");
         executeTestMap.TESTNAME = createTestMap.TESTNAME;
         zfjcloudNavigator.addSteps(createTestMap, function(isAddedStep){
         assert.ok(isAddedStep);*/
        logger.info("Version : "+executeTestMap.VERSIONNAME);
        logger.info("Cycle : "+executeTestMap.TESTNAME);
        logger.info("Test : "+executeTestMap.CYCLENAME);
        jiraNavigator.navigateToPlanTestCyclePage(function(isNavigateToPlanTestCycle){
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function(isExecutedTest){
                assert.ok(isExecutedTest, "Not Executed Test.");
                logger.info("Test is executed Directly Plan test Cycle Page.");
                logger.info("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
            /*zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
             assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
             logger.info("Test is added to Cycle Successfully.");

             });*/
        });
        //});
        //});
    });
    it('Test is executed With Defect, Comment and Attachment.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle one",
            TESTNAME: "",
            TESTSTATUS: "FAIL",
            TESTDEFECT: "",
            TESTCOMMENT : "Test Comment",
            ATTACHMENT : "upload.png"
            //STEPSTATUS : "FAIL",
            //STEPDEFECT : "IE-1",
            //STEPCOMMENT : "Comment On Step",
            //STEPNUM : "2"

        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            executeTestMap.TESTNAME = createTestMap.TESTNAME;
            logger.info("Test To Execute ID :"+executeTestMap.TESTNAME);
            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                logger.info("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.addTestToCycle(executeTestMap, function(isAddedTestToCycle){
                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                    logger.info("Test is added to Cycle Successfully.");
                    zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest){
                        assert.ok(isCreateTest, "Not Created test.");
                        executeTestMap.TESTDEFECT = createTestMap.TESTNAME;
                        logger.info("Test defect ID :"+executeTestMap.TESTDEFECT);
                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                            assert.ok(isExecutedTest, "Not Executed Test.");
                            logger.info("Test is executed Directly Plan test Cycle Page.");
                            logger.info("bvt-23 executed Successfully.");
                            isSuccess = true;
                            done();
                        });
                    });
                });
            });
        });
    });
    it('Test is executed Directly In Plan test Cycle Page.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle two",
            TESTNAME : "",
            EXECUTETESTDIRECTLY : "BLOCKED"
            //TESTDEFECT : "IE-3",
            //TESTCOMMENT : "comment"

        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY : "Test is executed Directly Plan test Cycle Page."
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest){
            assert.ok(isCreateTest, "Not Created test.");
            executeTestMap.TESTNAME = createTestMap.TESTNAME;

            jiraNavigator.navigateToPlanTestCyclePage(function(isNavigateToPlanTestCycle){
                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                logger.info("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.addTestToCycle(executeTestMap, function(isAddedTestToCycle){
                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                    logger.info("Test is added to Cycle Successfully.");
                    zfjcloudNavigator.executeTestUsingE(executeTestMap, function(isExecutedTest){
                        assert.ok(isExecutedTest, "Not Executed Test.");
                        logger.info("Test is executed Directly Plan test Cycle Page.");
                        logger.info("bvt-23 executed Successfully.");
                        isSuccess = true;
                        done();
                    });
                });
            });
            //});
        });
    });
    //bvt-56
    it('Test is executed Directly In View Issue Page.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle two",
            TESTNAME : "",
            EXECUTETESTDIRECTLY : "WIP"
            //TESTDEFECT : "IE-3",
            //TESTCOMMENT : "comment"

        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY : "Test is executed Directly View Issue Page."
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest){
            assert.ok(isCreateTest, "Not Created test.");
            executeTestMap.TESTNAME = createTestMap.TESTNAME;

            jiraNavigator.navigateToPlanTestCyclePage(function(isNavigateToPlanTestCycle){
                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                logger.info("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.addTestToCycle(executeTestMap, function(isAddedTestToCycle){
                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                    logger.info("Test is added to Cycle Successfully.");
                    jiraNavigator.navigateToSearchTestPage(function(isNavigateToSearchTestPage){
                        assert.ok(isNavigateToSearchTestPage, "Not Navigated To Search Test Page.");
                        logger.info("Navigated Successfully To Search Test Page.");
                        zfjcloudNavigator.executeTestFromViewTestPage(executeTestMap, function(isExecutedTest){
                            assert.ok(isExecutedTest, "Not Executed Test.");
                            logger.info("Test is executed Directly View Issue Page.");
                            logger.info("bvt-55 executed Successfully.");
                            isSuccess = true;
                            done();
                        });
                    });
                });
            });
            //});
        });
    });
    it('Add Test To Cycle Successfully In View Test Cycle.', function(done) {
        logout = false;
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY : "Add Test To Cycle Successfully."
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            //executeTestMap.TESTNAME = createTestMap.TESTNAME;
            jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
                assert.ok(navigateToSearchTestPageStatus, "Not Navigated to Search Test Page.");
                logger.info("Navigated Successfully To Search Test Page.");
                zfjcloudNavigator.addTestToCycleInViewTestPage("Version 1.0", "cycle two", createTestMap.TESTNAME, function(addTestToCycleStatus){
                    assert.ok(addTestToCycleStatus, "Not Added Test to Cycle from View Issue Page.");
                    logger.info("Test is Added Successfully To Cycle in View test Page.");
                    logger.info("bvt-53 executed Successfully.");
                    isSuccess = true;
                    done();
                });
            });
        });

    });
    xit('Undock and run any pre-defined filter.', function () {
        logout = false;
        jiraNavigator.navigateToSearchTestExecutionPage(function (navigateToSearchTestExecutionPageStatus) {
            assert.ok(navigateToSearchTestExecutionPageStatus, "Not Navigated To Search Test Execution Page.");
            logger.info("Search Test Execution Validated Successfully.");
            zfjcloudNavigator.UnDockFilterPanel(function(validateChartsStatus) {
                assert.ok(validateChartsStatus, "Failed To UnDock Filter Panel.");
                logger.info("Filter Panel UnDocked Successfully.");
                zfjcloudNavigator.executePreDinedFilters("My Executed Tests", function(validateChartsStatus) {
                    assert.ok(validateChartsStatus, "Failed To UnDock Filter Panel.");
                    logger.info("Filter Panel UnDocked Successfully.");
                    isSuccess = true;
                });
            });
        });

    });
    xit('Search Component from Simple Search.', function () {
        logout = false;
        jiraNavigator.navigateToSearchTestExecutionPage(function (navigateToSearchTestExecutionPageStatus) {
            assert.ok(navigateToSearchTestExecutionPageStatus, "Not Navigated To Search Test Execution Page.");
            logger.info("Search Test Execution Validated Successfully.");
            zfjcloudNavigator.searchComponentFromSimpleFilter(function(searchComponentStatus) {
                assert.ok(searchComponentStatus, "Not Searched Component in Simple Search.");
                logger.info("Component Searched Successfully in Simple Search.");
                isSuccess = true;
            });
        });

    });
    it('Bulk Execute Test and Step Status execution navigator.', function () {
        logout = false;
        var bulkChangeMap = {
            PROJECTNAME : browser.params.testdata.project,
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle two",
            //TESTNAME : "",
            TESTSTATUS : "WIP",
            STEPSTATUS : "FAIL"
            //TESTDEFECT : ""s
            //TESTCOMMENT : "comment"
            //STEPSTATUS : "FAIL",
            //STEPDEFECT : "IE-1",
            //STEPCOMMENT : "Comment On Step",
            //STEPNUM : "2"

        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY : "Test one."
            //PRIORITY : "Minor"
        };
        /*zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
         assert.ok(isCreateTest, "Not Created test.");
         executeTestMap.TESTNAME = createTestMap.TESTNAME;
         logger.info("Test To Execute ID :" + executeTestMap.TESTNAME);
         jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
         assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
         logger.info("Navigated Successfully to Plan Test Cycle.");
         zfjcloudNavigator.addTestToCycle("Version 1.0", executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function (isAddedTestToCycle) {
         assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
         logger.info("Test is added to Cycle Successfully.");
         jiraNavigator.navigateToSearchTestExecutionPage(function (navigateToSearchTestExecutionPageStatus) {
         assert.ok(navigateToSearchTestExecutionPageStatus, "Not Navigated To Search Test Execution Page.");
         logger.info("Search Test Execution Validated Successfully.");
         zfjcloudNavigator.executeTestDirectlyInExecutionNavigator(browser.params.testdata.project, executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, executeTestMap.TESTSTATUS, function(validateChartsStatus) {
         assert.ok(validateChartsStatus, "Failed To UnDock Filter Panel.");
         logger.info("Filter Panel UnDocked Successfully.");
         isSuccess = true;
         });
         });

         });
         });
         });111*/
        jiraNavigator.navigateToSearchTestExecutionPage(function (navigateToSearchTestExecutionPageStatus) {
            assert.ok(navigateToSearchTestExecutionPageStatus, "Not Navigated To Search Test Execution Page.");
            logger.info("Search Test Execution Validated Successfully.");
            zfjcloudNavigator.bulkChangeStatus(bulkChangeMap, function(validateChartsStatus) {
                assert.ok(validateChartsStatus, "Failed To UnDock Filter Panel.");
                logger.info("Filter Panel UnDocked Successfully.");
                isSuccess = true;
            });
        });
    });
    xit('Should able to generate Access key and Secret Keys when Access key and Secret Keys are blank login first time', function () {
        logout = false;
        jiraNavigator.navigateToApiAccessPage(function (navigateToTestSummaryPageStatus) {
            assert.ok(navigateToTestSummaryPageStatus, "Not Navigated To Api Access Page.");
            logger.info("Api Access Page Validated Successfully.");
            zfjcloudNavigator.generateApiKeys(function(validateChartsStatus) {
                assert.ok(validateChartsStatus, "Failed To Regenerate Keys");
                logger.info("Regeneration of Keys Successfully.");
                isSuccess = true;
            });
        });
    });
    /**
     * Should be able to view Test summary and can be drilled down the count
     */
    xit('validate Test Summary Links',function(done){
        logout = false;
        jiraNavigator.navigateToTestSummaryPage(function(navigateToTestSummaryPageStatus){
            assert.ok(navigateToTestSummaryPageStatus, "Not Navigated To Test Summary Page.");
            logger.info("Test Summary Page Validated Successfully.");
            zfjcloudNavigator.viewAndDrillDownTestSummary(function(validateLinksStatus){
                assert.ok(validateLinksStatus, "Failed To Validate Test Summary Links");
                logger.info("Test summary Links Validated Successfully.");
                logger.info("bvt-34 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Should be able to view the 30-day summary chart for created and executed  tests in Test Summary page
     */
    xit('validate 30 day Test Summary Charts',function(done){
        logout = false;
        jiraNavigator.navigateToTestSummaryPage(function(navigateToTestSummaryPageStatus){
            assert.ok(navigateToTestSummaryPageStatus, "Not Navigated To Test Summary Page.");
            logger.info("Test Summary Page Validated Successfully.");
            zfjcloudNavigator.validateSummaryCharts(function(validateChartsStatus){
                assert.ok(validateChartsStatus, "Failed To Validate Test Summary Charts");
                logger.info("Test summary Charts Validated Successfully.");
                logger.info("bvt-34 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Should Launch Test Metrics cleanly and display Execution charts in Dashboard - Daily Execution Progress, Execution By Cycle, Execution By Person, Execution By Date, Lists
     */
    xit('validate Test Metrics Charts', function () {
        logout = false;
        jiraNavigator.navigateToTestMetricsPage(function (navigateToTestSummaryPageStatus) {
            assert.ok(navigateToTestSummaryPageStatus, "Not Navigated To Test Metrics Page.");
            logger.info("Test Metrics Page Validated Successfully.");
            zfjcloudNavigator.doValidateTestSummaryCharts(function (validateChartsStatus) {
                assert.ok(validateChartsStatus, "Failed To Validate Test Summary Charts");
                logger.info("Test Metrics Charts Validated Successfully.");
                logger.info("bvt-34 executed Successfully.");
                isSuccess = true;
            });
        });
    });
    /**
     * All Charts showing right data based on above actions
     */
    xit('Validate Data in Test Metrics Charts', function () {
        logout = true;
        zfjcloudNavigator.getTotalExecutedFromTestSummaryPage(function(getTotalExecutedTest){
            jiraNavigator.navigateToTestMetricsPage(function (navigateToTestSummaryPageStatus) {
                assert.ok(navigateToTestSummaryPageStatus, "Not Navigated To Test Metrics Page.");
                logger.info("Test Metrics Page Validated Successfully.");
                zfjcloudNavigator.doValidateTestMetricsChartsWithData(getTotalExecutedTest, function(validateChartsStatus) {
                    assert.ok(validateChartsStatus, "Failed To Validate Test Summary Charts");
                    logger.info("Test Metrics Charts Validated Successfully.");
                    logger.info("bvt-34 executed Successfully.");
                    isSuccess = true;
                });
            });
        });

    });
});