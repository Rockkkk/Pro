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
            jiraNavigator.doLogin(params.testdata.adminUsername, params.testdata.adminPassword, function (doLoginStatus) {
                assert.ok(doLoginStatus, "Login Not Successful.");
                logger.info("Login Successful.");
                browser.ignoreSynchronization = true;
                /*jiraNavigator.updateBaseUrl(function (isClosedPopups) {
                    assert.ok(isClosedPopups, "Not closed all popups.");
                    logger.info("All popups are closed Successfully.");
                    jiraNavigator.selectProject(function (selectprojectStatus) {
                        assert.ok(selectprojectStatus, "Not Selected Project.");
                        logger.info("Project is Selected Successfully.");

                    });
                });*/
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
                jiraNavigator.doLogin(params.testdata.adminUsername, params.testdata.adminPassword, function (doLoginStatus) {
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
    xit('Test is executed With Defect.', function(done) {
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
                    zfjcloudNavigator.addTestToCycle("Version 1.0", executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
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
    /**
     * Should be able to "Delete" a Test
     */
    xit("Delete Test Successfully.", function (done) {
        logout = false;
        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            expect(navigateToSearchTestPageStatus).toBe.true;
            logger.info("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.deleteTest(function (deleteTestStatus) {
                expect(deleteTestStatus).toBe.true;
                logger.info("Test is Deleted Successfully");
                isSuccess = true;
                done();
            });
        });

    });
    xit('Test is executed With New Defect.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "",
            TESTSTATUS : "FAIL",
            TESTDEFECT : "NEW DEFECT",
            TESTDEFECTTYPE : "Bug",
            TESTDEFECTSUMMARY : "NEW DEFECT"
            //TESTCOMMENT : "comment"
           // STEPSTATUS : "FAIL",
            //STEPDEFECT : "NEW DEFECT",
            //STEPDEFECTTYPE : "Bug",
            //STEPDEFECTSUMMARY : "NEW DEFECT",
            //STEPCOMMENT : "Comment On Step",
            //STEPNUM : "4"

        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY : "Test is executed With New Defect."
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            zfjcloudNavigator.addSteps(createTestMap, function (isAddedStep) {
                assert.ok(isAddedStep);
                executeTestMap.TESTNAME = createTestMap.TESTNAME;
                logger.info("Test To Execute ID :" + executeTestMap.TESTNAME);
                jiraNavigator.navigateToPlanTestCyclePage(function(isNavigateToPlanTestCycle) {
                    assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                    logger.info("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.addTestToCycle("Version 1.0", executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle) {
                        assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                        logger.info("Test is added to Cycle Successfully.");
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
    xit('STEP is executed With New Defect.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : addDefectMap.TESTNAME,
            //TESTSTATUS : "FAIL",
            //TESTDEFECT : "NEW DEFECT",
            //TESTDEFECTTYPE : "Bug",
            //TESTDEFECTSUMMARY : "NEW DEFECT"
            //TESTCOMMENT : "comment"
            STEPSTATUS : "FAIL",
            STEPDEFECT : "NEW DEFECT",
            STEPDEFECTTYPE : "Bug",
            STEPDEFECTSUMMARY : "NEW DEFECT",
            //STEPCOMMENT : "Comment On Step",
            STEPNUM : "4"

        };
       /*var executeTestMap = addDefectMap;

        executeTestMap["STEPSTATUS"] = "FAIL";
        executeTestMap["STEPDEFECT"] = "NEW DEFECT";
        executeTestMap["STEPDEFECTTYPE"] ="Bug";
        executeTestMap["STEPDEFECTSUMMARY"] ="NEW DEFECT";
        executeTestMap["STEPNUM"]  = "4";*/
        jiraNavigator.navigateToPlanTestCyclePage(function(isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function(isExecutedTest){
                assert.ok(isExecutedTest, "Not Executed Test.");
                logger.info("Test is executed Directly Plan test Cycle Page.");
                logger.info("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    xit("Delete Test Successfully.", function (done) {
        logout = false;
        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            expect(navigateToSearchTestPageStatus).toBe.true;
            logger.info("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.exportTests(function (deleteTestStatus) {
                expect(deleteTestStatus).toBe.true;
                logger.info("Test is Deleted Successfully");
                isSuccess = true;
                done();
            });
        });

    });
    xit('Move test cycle from one version to other with different name have Tests 1 or more scheduled', function (done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME: "Version 3.0",
            CYCLENAME: "Move test cycle from one version to other with same name have Tests scheduled"
        };
        var moveCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME: "Move test cycle from one version to other with same name have Tests scheduled"

            //MOVE_VERSION_NAME : "Version 2.0"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
            assert.ok(navigateStatus, "Not Navigated to plan Test cycle Page.");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (createCycleStatus) {
                assert.ok(createCycleStatus, "Not created Cycle.");
                logger.info("Cycle is Created Successfully.-===+++");
                zfjcloudNavigator.moveCycle(createCycleMap, moveCycleMap, function (moveCycleStatus) {
                    assert.ok(moveCycleStatus, "Not Moved Cycle.");
                    logger.info("Cycle is Moved Successfully.-===+++");
                    isSuccess = true;
                    done();
                });
            });

        });
    });
    xit('Delete cycle, have tests scheduled with same summary and same defects associated', function(done) {

        var deleteCycleMap = {
            VERSIONNAME : "Version 3.0",
            CYCLENAME : "Delete cycle, have tests scheduled with same summary and same defects associated.",
            TESTNAME : "",
            TESTSTATUS : "FAIL"
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY : "Delete cycle, with tests executed to New status."
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            zfjcloudNavigator.addSteps(createTestMap, function (isAddedStep) {
                assert.ok(isAddedStep);
                deleteCycleMap.TESTNAME = createTestMap.TESTNAME;
                logger.info("Test To Execute ID :" + deleteCycleMap.TESTNAME);
                jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                    assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                    logger.info("Navigated Successfully to Plan Test Cycle.");
                    createTestMap["ISSUETYPE"]="Bug";
                    zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                        assert.ok(isCreateTest, "Not Created test.");
                        deleteCycleMap["TESTDEFECT"]=createTestMap.TESTNAME;
                        zfjcloudNavigator.createTestCycle(deleteCycleMap, function (createCycleStatus) {
                            assert.ok(createCycleStatus, "Cycle Not Created.");
                            console.log("Cycle is Created Successfully.");
                            zfjcloudNavigator.addTestToCycle(deleteCycleMap, function (isAddedTestToCycle) {
                                assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                logger.info("Test is added to Cycle Successfully.");
                                zfjcloudNavigator.executeTestUsingE(deleteCycleMap, function (isExecutedTest) {
                                    assert.ok(isExecutedTest, "Not Executed Test.");
                                    zfjcloudNavigator.deleteCycle(deleteCycleMap.VERSIONNAME, deleteCycleMap.CYCLENAME, function (deleteCycleStatus) {
                                        assert.ok(deleteCycleStatus, "Cycle not deleted.");
                                        console.log("Cycle Deleted Successfully.");
                                        isSuccess = true;
                                        logout = false;
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        /*zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            deleteCycleMap["TESTNAME"] = createTestMap.TESTNAME;
            deleteCycleMap["TESTSTATUS"] = "NEWSTATUS";
        //zfjcloudNavigator.createTestWithSummary("Delete cycle, have tests scheduled with same summary and same defects associated", function(getTestID){
            zfjcloudNavigator.createTestWithSummary("Delete cycle, have tests scheduled with same summary and same defects associated", function(attachDefectID) {
                jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
                    assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
                    console.log("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.createTestCycle("Version 3.0", deleteCycleMap, function(createCycleStatus){
                        assert.ok(createCycleStatus, "Cycle Not Created.");
                        console.log("Cycle is Created Successfully.");
                        zfjcloudNavigator.addTestToCycle("Version 3.0", deleteCycleMap.CYCLENAME, getTestID, function(addTestToCycleStatus) {
                            assert.ok(addTestToCycleStatus, "Test Not Added To Cycle.");
                            console.log("Test is added to Cycle Successfully.");
                            zfjcloudNavigator.executeTestWithDefectUsingE("Version 3.0", deleteCycleMap.CYCLENAME, getTestID, "FAIL", attachDefectID, function(executeTestStatusWithDefect){
                                expect(executeTestStatusWithDefect).toBe.true;
                                console.log("Test is Executed with Defect and Status Successfully.");
                                zfjcloudNavigator.deleteCycle("Version 3.0", deleteCycleMap.CYCLENAME, function(deleteCycleStatus){
                                    assert.ok(deleteCycleStatus, "Cycle not deleted.");
                                    console.log("Cycle Deleted Successfully.");
                                    isSuccess = true;
                                    logout = false;
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });*/
    });
    xit('Delete cycle, have tests with long summary', function(done) {
        var deleteCycleMap = {
            VERSIONNAME: "Version 3.0",
            CYCLENAME : "Delete cycle, have tests with long summary"
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Delete cycle, have tests with long summaryDelete cycle, have tests with long summaryDelete cycle, have tests with long summaryDelete cycle, have tests with long summary"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            deleteCycleMap["TESTNAME"] = createTestMap.TESTNAME;
        //zfjcloudNavigator.createTestWithSummary("Delete cycle, have tests with long summaryDelete cycle, have tests with long summaryDelete cycle, have tests with long summaryDelete cycle, have tests with long summary", function(getTestID){
            jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
                assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.createTestCycle(deleteCycleMap, function(createCycleStatus){
                    assert.ok(createCycleStatus, "Cycle Not Created.");
                    console.log("Cycle is Created Successfully.");
                    zfjcloudNavigator.addTestToCycle(deleteCycleMap, function(addTestToCycleStatus) {
                        assert.ok(addTestToCycleStatus, "Test Not Added To Cycle.");
                        console.log("Test is added to Cycle Successfully.");
                        zfjcloudNavigator.deleteCycle(deleteCycleMap.VERSIONNAME, deleteCycleMap.CYCLENAME, function(deleteCycleStatus){
                            assert.ok(deleteCycleStatus, "Cycle not deleted.");
                            console.log("Cycle Deleted Successfully.");
                            isSuccess = true;
                            logout = false;
                            done();
                        });
                    });
                });
            });
        });
    });
    xit('Delete cycle, have Tests and test steps executed to same status', function(done) {
        var deleteCycleMap = {
            CYCLENAME : "Delete cycle, have Tests and test steps executed to same status"
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Delete cycle, with tests executed to New status"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            deleteCycleMap["TESTNAME"] = createTestMap.TESTNAME;
            deleteCycleMap["TESTSTATUS"] = "NEWSTATUS";
        //zfjcloudNavigator.createTestWithTestStep("Delete cycle, have Tests and test steps executed to same status", function(getTestID){
            jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
                assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.createTestCycle("Version 3.0", deleteCycleMap, function(createCycleStatus){
                    assert.ok(createCycleStatus, "Cycle Not Created.");
                    console.log("Cycle is Created Successfully.");
                    zfjcloudNavigator.addTestToCycle("Version 3.0", deleteCycleMap.CYCLENAME, getTestID, function(addTestToCycleStatus) {
                        assert.ok(addTestToCycleStatus, "Test Not Added To Cycle.");
                        console.log("Test is added to Cycle Successfully.");
                        zfjcloudNavigator.executeStepUsingE("Version 3.0", deleteCycleMap.CYCLENAME, getTestID, 1 , "FAIL", function(executeStepStatus) {
                            expect(executeStepStatus).toBe.true;
                            console.log("Step is Executed to New Step Status Successfully.");
                            zfjcloudNavigator.executeTestUsingE("Version 3.0", deleteCycleMap.CYCLENAME, getTestID, "FAIL", function(executeTestStatus) {
                                expect(executeTestStatus).toBe.true;
                                console.log("Test is Executed to Default Status in Cycle Successfully.");
                                zfjcloudNavigator.deleteCycle("Version 3.0", deleteCycleMap.CYCLENAME, function(deleteCycleStatus){
                                    assert.ok(deleteCycleStatus, "Cycle not deleted.");
                                    console.log("Cycle Deleted Successfully.");
                                    isSuccess = true;
                                    logout = false;
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    xit('Delete cycle, have Tests and test steps executed to different statuses', function(done) {
        var deleteCycleMap = {
            CYCLENAME : "Delete cycle, have Tests and test steps executed to different statuses"
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Delete cycle, have tests with long summaryDelete cycle, have tests with long summaryDelete cycle, have tests with long summaryDelete cycle, have tests with long summary"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            deleteCycleMap["TESTNAME"] = createTestMap.TESTNAME;
        //zfjcloudNavigator.createTestWithTestStep("Delete cycle, have Tests and test steps executed to different statuses", function(getTestID){
            jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
                assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.createTestCycle("Version 3.0", deleteCycleMap, function(createCycleStatus){
                    assert.ok(createCycleStatus, "Cycle Not Created.");
                    console.log("Cycle is Created Successfully.");
                    zfjcloudNavigator.addTestToCycle("Version 3.0", deleteCycleMap.CYCLENAME, getTestID, function(addTestToCycleStatus) {
                        assert.ok(addTestToCycleStatus, "Test Not Added To Cycle.");
                        console.log("Test is added to Cycle Successfully.");
                        zfjcloudNavigator.executeStepUsingE("Version 3.0", deleteCycleMap.CYCLENAME, getTestID, 1 , "FAIL", function(executeStepStatus) {
                            expect(executeStepStatus).toBe.true;
                            console.log("Step is Executed to New Step Status Successfully.");
                            zfjcloudNavigator.executeTestUsingE("Version 3.0", deleteCycleMap.CYCLENAME, getTestID, "WIP", function(executeTestStatus) {
                                expect(executeTestStatus).toBe.true;
                                console.log("Test is Executed to Default Status in Cycle Successfully.");
                                zfjcloudNavigator.deleteCycle("Version 3.0", deleteCycleMap.CYCLENAME, function(deleteCycleStatus){
                                    assert.ok(deleteCycleStatus, "Cycle not deleted.");
                                    console.log("Cycle Deleted Successfully.");
                                    isSuccess = true;
                                    logout = false;
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    //Move Cycle
    xit('Move test cycle from one version to other with same name have No Tests scheduled', function(done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME: "Version 3.0",
            CYCLENAME: "Move test cycle from one version to other with same name have No Tests scheduled"
        };
        var moveCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME: "Move test cycle from one version to other with same name have No Tests scheduled"

            //MOVE_VERSION_NAME : "Version 2.0"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
            assert.ok(navigateStatus, "Not Navigated to plan Test cycle Page.");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (createCycleStatus) {
                assert.ok(createCycleStatus, "Not created Cycle.");
                logger.info("Cycle is Created Successfully.-===+++");
                zfjcloudNavigator.moveCycle(createCycleMap, moveCycleMap, function (moveCycleStatus) {
                    assert.ok(moveCycleStatus, "Not Moved Cycle.");
                    logger.info("Cycle is Moved Successfully.");
                    isSuccess = true;
                    done();
                });
            });

        });
    });
    xit('Move test cycle from one version to other with different name have Tests 1 or more scheduled', function(done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME: "Version 3.0",
            CYCLENAME: "Move test cycle from one version to other with different name have Tests 1 or more scheduled"
        };
        var moveCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME: "Move test cycle from one version to other with different name have Tests 1 or more scheduled"
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY : "Move test cycle from one version to other with different name have Tests 1 or more scheduled."
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            createCycleMap["TESTNAME"] = createTestMap.TESTNAME;
            jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
                assert.ok(navigateStatus, "Not Navigated to plan Test cycle Page.");
                logger.info("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.createTestCycle(createCycleMap, function (createCycleStatus) {
                    assert.ok(createCycleStatus, "Not created Cycle.");
                    logger.info("Cycle is Created Successfully.");
                    zfjcloudNavigator.addTestToCycle(createCycleMap, function(isAddedTestToCycle) {
                        assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                        logger.info("Test is added to Cycle Successfully.");
                        zfjcloudNavigator.moveCycle(createCycleMap, moveCycleMap, function (moveCycleStatus) {
                            assert.ok(moveCycleStatus, "Not Moved Cycle.");
                            logger.info("Cycle is Moved Successfully.");
                            isSuccess = true;
                            done();
                        });
                    });
                });
            });
        });
    });
    xit('Move test cycle from one version to other with different name have Tests 1 or more scheduled', function(done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME: "Version 3.0",
            CYCLENAME: "Move test cycle from one version to other with different name have Tests 1 or more scheduled"
        };
        var moveCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME: "Move test cycle from one version to other with different name have Tests 1 or more scheduled(Changed)"
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY : "Move test cycle from one version to other with different name have Tests 1 or more scheduled"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            createCycleMap["TESTNAME"] = createTestMap.TESTNAME;
            jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
                assert.ok(navigateStatus, "Not Navigated to plan Test cycle Page.");
                logger.info("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.createTestCycle(createCycleMap, function (createCycleStatus) {
                    assert.ok(createCycleStatus, "Not created Cycle.");
                    logger.info("Cycle is Created Successfully.");
                    zfjcloudNavigator.addTestToCycle(createCycleMap, function(isAddedTestToCycle) {
                        assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                        logger.info("Test is added to Cycle Successfully.");
                        zfjcloudNavigator.moveCycle(createCycleMap, moveCycleMap, function (moveCycleStatus) {
                            assert.ok(moveCycleStatus, "Not Moved Cycle.");
                            logger.info("Cycle is Moved Successfully.");
                            isSuccess = true;
                            done();
                        });
                    });
                });
            });
        });
    });
    xit('Move test cycle from one version to other with all tests executed', function(done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME: "Version 3.0",
            CYCLENAME: "Move test cycle from one version to other with all tests executed"
        };
        var moveCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME: "Move test cycle from one version to other with all tests executed"
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY : "Move test cycle from one version to other with all tests executed"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            createCycleMap["TESTNAME"] = createTestMap.TESTNAME;
            jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
                assert.ok(navigateStatus, "Not Navigated to plan Test cycle Page.");
                logger.info("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.createTestCycle(createCycleMap, function (createCycleStatus) {
                    assert.ok(createCycleStatus, "Not created Cycle.");
                    logger.info("Cycle is Created Successfully.");
                    zfjcloudNavigator.addTestToCycle(createCycleMap, function(isAddedTestToCycle) {
                        assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                        logger.info("Test is added to Cycle Successfully.");
                        createCycleMap["TESTSTATUS"] = "FAIL";
                        zfjcloudNavigator.executeTestUsingE(createCycleMap, function(isExecutedTest) {
                            assert.ok(isExecutedTest, "Not Executed Test.");
                            logger.info("Test is executed Successfully.");
                            zfjcloudNavigator.moveCycle(createCycleMap, moveCycleMap, function (moveCycleStatus) {
                                assert.ok(moveCycleStatus, "Not Moved Cycle.");
                                logger.info("Cycle is Moved Successfully.");
                                isSuccess = true;
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
    xit('Move test cycle from one version to other with tests executed in custom status', function(done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME: "Version 3.0",
            CYCLENAME: "Move test cycle from one version to other with tests executed in custom status"
        };
        var moveCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME: "Move test cycle from one version to other with tests executed in custom status"
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY : "Move test cycle from one version to other with tests executed in custom status"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            createCycleMap["TESTNAME"] = createTestMap.TESTNAME;
            jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
                assert.ok(navigateStatus, "Not Navigated to plan Test cycle Page.");
                logger.info("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.createTestCycle(createCycleMap, function (createCycleStatus) {
                    assert.ok(createCycleStatus, "Not created Cycle.");
                    logger.info("Cycle is Created Successfully.");
                    zfjcloudNavigator.addTestToCycle(createCycleMap, function(isAddedTestToCycle) {
                        assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                        logger.info("Test is added to Cycle Successfully.");
                        createCycleMap["TESTSTATUS"] = "INVALID";
                        zfjcloudNavigator.executeTestUsingE(createCycleMap, function(isExecutedTest) {
                            assert.ok(isExecutedTest, "Not Executed Test.");
                            logger.info("Test is executed Successfully.");
                            zfjcloudNavigator.moveCycle(createCycleMap, moveCycleMap, function (moveCycleStatus) {
                                assert.ok(moveCycleStatus, "Not Moved Cycle.");
                                logger.info("Cycle is Moved Successfully.");
                                isSuccess = true;
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
    var createCycleMap1 = "";
    var createCycleMap2 = "";
    xit('Move test cycle from current version to Unscheduled version', function(done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME: "Move test cycle from current version to Unscheduled version"
        };
        var moveCycleMap = {
            VERSIONNAME: "Unscheduled",
            CYCLENAME: "Move test cycle from current version to Unscheduled version"

            //MOVE_VERSION_NAME : "Version 2.0"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
            assert.ok(navigateStatus, "Not Navigated to plan Test cycle Page.");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (createCycleStatus) {
                assert.ok(createCycleStatus, "Not created Cycle.");
                logger.info("Cycle is Created Successfully.-===+++");
                zfjcloudNavigator.moveCycle(createCycleMap, moveCycleMap, function (moveCycleStatus) {
                    assert.ok(moveCycleStatus, "Not Moved Cycle.");
                    logger.info("Cycle is Moved Successfully.");
                    createCycleMap1 = createCycleMap;
                    createCycleMap2 = moveCycleMap;
                    isSuccess = true;
                    done();
                });
            });

        });
    });
    xit('Move test cycle to a different version and move back again to previous version', function(done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME: "Move test cycle to a different version and move back again to previous version."
        };
        var moveCycleMap = {
            VERSIONNAME: "Unscheduled",
            CYCLENAME: "Move test cycle to a different version and move back again to previous version."

            //MOVE_VERSION_NAME : "Version 2.0"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
            assert.ok(navigateStatus, "Not Navigated to plan Test cycle Page.");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            //zfjcloudNavigator.createTestCycle(createCycleMap, function (createCycleStatus) {
                //assert.ok(createCycleStatus, "Not created Cycle.");
               // logger.info("Cycle is Created Successfully.");
                zfjcloudNavigator.moveCycle(createCycleMap2, createCycleMap1, function (moveCycleStatus) {
                    assert.ok(moveCycleStatus, "Not Moved Cycle.");
                    logger.info("Cycle is Moved Successfully.//");
                    done();
                    /*var cycleMap = createCycleMap;
                    createCycleMap = moveCycleMap;
                    /!*var temp = createCycleMap.VERSIONNAME;
                    createCycleMap["VERSIONNAME"] = moveCycleMap.VERSIONNAME;
                    moveCycleMap["VERSIONNAME"] = temp;*!/
                    zfjcloudNavigator.moveCycle(createCycleMap, cycleMap, function (moveCycleStatus1) {
                        assert.ok(moveCycleStatus1, "Not Moved Cycle.");
                        logger.info("Cycle is Moved back Successfully.");
                        isSuccess = true;
                        done();
                    });*/
                });
            //});
        });
    });
    xit('Clone test cycle after moving to a different version', function(done) {
        var createCycleMap = {
            VERSIONNAME: "Version 3.0",
            CYCLENAME: "Clone test cycle after moving to a different version"
        };
        var moveCycleMap = {
            VERSIONNAME: "Unscheduled",
            CYCLENAME: "Clone test cycle after moving to a different version"

            //MOVE_VERSION_NAME : "Version 2.0"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
            assert.ok(navigateStatus, "Not Navigated to plan Test cycle Page.");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.cloneCycle(createCycleMap1, createCycleMap2, function (cloneCycleStatus) {
                assert.ok(cloneCycleStatus, "Cycle not Cloned.");
                logger.info("Cycle is Cloned Successfully.");
                isSuccess = true;
                done();
            });
        });
        /*jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
            assert.ok(navigateStatus, "Not Navigated to plan Test cycle Page.");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (createCycleStatus) {
                assert.ok(createCycleStatus, "Not created Cycle.");
                logger.info("Cycle is Created Successfully.");
                zfjcloudNavigator.moveCycle(createCycleMap, moveCycleMap, function (moveCycleStatus) {
                    assert.ok(moveCycleStatus, "Not Moved Cycle.");
                    logger.info("Cycle is Moved Successfully.");
                    var temp = createCycleMap.VERSIONNAME;
                    createCycleMap["VERSIONNAME"] = moveCycleMap.VERSIONNAME;
                    moveCycleMap["VERSIONNAME"] = temp;
                    zfjcloudNavigator.cloneCycle(createCycleMap, moveCycleMap, function (cloneCycleStatus) {
                        assert.ok(cloneCycleStatus, "Cycle not Cloned.");
                        logger.info("Cycle is Cloned Successfully.");
                        isSuccess = true;
                        done();
                    });
                });
            });
        });*/
    });

    xit('Add Test From Cycle Successfully.', function(done) {
        var addTestFromCycleMap = {
            VERSION_NAME : "Version 1.0",
//            CYCLE_NAME : "Ad hoc",
            CYCLE_NAME : "cycle three",
            FROM_CYCLE_NAME : "cycle one"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
            assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.addTestFromCycle(addTestFromCycleMap, function(addTestFromCycleStatus){
                assert.ok(addTestFromCycleStatus, "Tests are not added.");
                console.log("Test is added to Cycle Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });
    });
    xit('Delete Test From Cycle Successfully.', function(done) {
        var deleteTestFromCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Ad hoc",
            TESTNAME : ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Move test cycle from one version to other with different name have Tests 1 or more scheduled"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            //zfjcloudNavigator.createTestWithSummary("Move test cycle from one version to other with different name have Tests 1 or more scheduled", function(getTestID) {
            deleteTestFromCycleMap["TESTNAME"] = createTestMap.TESTNAME;
            jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
                assert.ok(navigateStatus, "Not Navigated to Plan Cycle Page");
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.addTestToCycle(deleteTestFromCycleMap, function (addTestToCycleStatus) {
                    assert.ok(addTestToCycleStatus, "Test Not Added To Cycle.");
                    console.log("Test is added to Cycle Successfully.");
                    zfjcloudNavigator.deleteTestFromCycle(deleteTestFromCycleMap, function(deleteTestFromCycleStatus){
                        assert.ok(deleteTestFromCycleStatus, "Tests are not Deleted.");
                        console.log("Test is Deleted from Cycle Successfully.");
                        isSuccess = true;
                        logout = true;
                        done();
                    });
                });
            });
        });
        /*jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
         assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page");
         console.log("Navigated Successfully to Plan Test Cycle.");
         zfjcloudNavigator.deleteTestFromCycle(deleteTestFromCycleMap, function(addTestFromCycleStatus){
         assert.ok(addTestFromCycleStatus, "Tests are not Deleted.");
         console.log("Test is Deleted from Cycle Successfully.");
         isSuccess = true;
         logout = true;
         done();
         });
         });*/
    });
    xit("Delete Test Successfully.", function (done) {
        logout = false;
        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            expect(navigateToSearchTestPageStatus).toBe.true;
            logger.info("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.deleteTest(function (deleteTestStatus) {
                expect(deleteTestStatus).toBe.true;
                logger.info("Test is Deleted Successfully");
                isSuccess = true;
                done();
            });
        });
    });
    xit("Should be able to add tests to Test Cycle Via Saved JIRA search Successfully.", function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle four",
            FILTERNAME : "Filter One111e"
        };
        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            assert.ok(navigateToSearchTestPageStatus, "Not Navigated to search Test page.");
            logger.info("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.saveAsFilter(executeTestMap.FILTERNAME, function (totalTests) {
                executeTestMap["TOTALTESTS"] = totalTests;
                //assert.ok(deleteTestStatus, "Not Save as Filter Successfully.");
                jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                    assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                    logger.info("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.addTestToCycle(executeTestMap, function (isAddedTestToCycle) {
                        assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                        logger.info("Test is added to Cycle Successfully.");
                        isSuccess = true;
                        done();
                    });
                });
            });
        });
    });
    xit('Dock/Undock the predefined Filter', function (done) {
        logout = false;
        jiraNavigator.navigateToSearchTestExecutionPage(function (navigateToSearchTestExecutionPageStatus) {
            assert.ok(navigateToSearchTestExecutionPageStatus, "Not Navigated To Search Test Execution Page.");
            logger.info("Search Test Execution Validated Successfully.");
            zfjcloudNavigator.UnDockFilterPanel(function(validateChartsStatus) {
                assert.ok(validateChartsStatus, "Failed To UnDock Filter Panel.");
                logger.info("Filter Panel UnDocked Successfully.");
                zfjcloudNavigator.DockFilterPanel(function(validateChartsStatus) {
                    assert.ok(validateChartsStatus, "Failed To Dock Filter Panel.");
                    logger.info("Filter Panel Docked Successfully.");
                    logger.info("bvt-34 executed Successfully.");
                    isSuccess = true;
                    done();
                });
            });
        });
    });
    it('Bulk Delete Executions From Execution navigator.', function () {
        logout = false;
        var bulkDeleteMap = {
            PROJECTNAME : browser.params.testdata.project,
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            DELETEEXEC : ""

        };
        var createTestMap = {
            SUMMARY: "Test For admin",
            PRIORITY: browser.params.testdata.priority1
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            logger.info("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                logger.info("Test name :" + createTestMap.TESTNAME);
                bulkDeleteMap["TESTNAME"] = createTestMap.TESTNAME;
                jiraNavigator.navigateToPlanTestCyclePage(function(isNavigateToPlanTestCycle) {
                    assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                    logger.info("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.addTestToCycle(bulkDeleteMap, function(isAddedTestToCycle) {
                        assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                        logger.info("Test is added to Cycle Successfully.");
                        jiraNavigator.navigateToSearchTestExecutionPage(function (navigateToSearchTestExecutionPageStatus) {
                            assert.ok(navigateToSearchTestExecutionPageStatus, "Not Navigated To Search Test Execution Page.");
                            logger.info("Search Test Execution Validated Successfully.");
                            zfjcloudNavigator.deleteBulkExecutions(bulkDeleteMap, function(validateChartsStatus) {
                                assert.ok(validateChartsStatus, "Failed To Bulk Delete  Executions.");
                                logger.info("Bulk Deleted  Executions Successfully.");
                                isSuccess = true;
                            });
                        });
                    });
                });
            });
        });
    });
    it('Execute Test Directly from execution navigator.', function () {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "",
            TESTSTATUS : "INVALID"
            //TESTDEFECT : ""
            //TESTCOMMENT : "comment"
            //STEPSTATUS : "FAIL",
            //STEPDEFECT : "IE-1",
            //STEPCOMMENT : "Comment On Step",
            //STEPNUM : "2"

        };
        var createTestMap = {
            SUMMARY: "Execute Test Directly from execution navigator.",
            PRIORITY: browser.params.testdata.priority1
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            logger.info("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                logger.info("Test name :" + createTestMap.TESTNAME);
                executeTestMap["TESTNAME"] = createTestMap.TESTNAME;
                jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                    assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                    logger.info("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.addTestToCycle(executeTestMap, function (isAddedTestToCycle) {
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
            });
        });
    });
    xit('Add Test To Cycle Successfully In View Test Cycle.', function(done) {
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

});