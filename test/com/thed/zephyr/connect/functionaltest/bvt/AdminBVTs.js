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
        var x = new Date();
        logger.info("Time Starts : "+x);
        logger.info('Before All of test.');
        //driver.manage().window().maximize();
        //driver.get(browser.params.testdata.jiraUrl, browser.params.testdata.waitTimeOutMedium);
        if(params.testdata.createProject == "true"){
            logger.info("Create project status :::"+params.testdata.createProject);
            jiraNavigator.doLogin(params.testdata.adminUsername, params.testdata.adminPassword, function (doLoginStatus) {
                assert.ok(doLoginStatus, "Login Not Successful.");
                logger.info("Login Successful.");
                browser.ignoreSynchronization = true;
                jiraNavigator.updateBaseUrl(function(isClosedPopups) {
                    assert.ok(isClosedPopups, "Not closed all popups.");
                    logger.info("All popups are closed Successfully.");
                    jiraNavigator.createProject(function (createProjectStatus) {
                        assert.ok(createProjectStatus, "Not Selected Project.");
                        logger.info("Project is Created Successfully.");

                        jiraNavigator.createComponents("Component", 3, function(createStatus) {
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
        }else{
            logger.info("Create project status :"+params.testdata.createProject);
            jiraNavigator.doLogin(params.testdata.adminUsername, params.testdata.adminPassword, function (doLoginStatus) {
                assert.ok(doLoginStatus, "Login Not Successful.");
                logger.info("Login Successful.");
                browser.ignoreSynchronization = true;
                jiraNavigator.updateBaseUrl(function(isClosedPopups){
                    assert.ok(isClosedPopups, "Not closed all popups.");
                    logger.info("All popups are closed Successfully.");
                    jiraNavigator.selectProject(function (selectprojectStatus) {
                        assert.ok(selectprojectStatus, "Not Selected Project.");
                        logger.info("Project is Selected Successfully.");

                    });
                });
            });
        }

    });
    afterAll(function () {
        logger.info('After All of test.');
        driver.quit();
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
                    jiraNavigator.closeAllPopupAndNavigate(function(isClosedPopups){
                        assert.ok(isClosedPopups, "Not closed all popups.");
                        logger.info("All popups are closed Successfully.");
                    });
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
    xit('Test is Created with more than 100 steps.', function(done) {
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
                isSuccess = true;
                done();
            });
        });
    });
    xit('Version created successfully.', function (done) {
        logout = false;
      /*  jiraNavigator.createVersions("Versions - ", function (createStatus) {
            assert.ok(createStatus, "Not Created Versions.");
            logger.info("Project Versions Created Successfully.");
            logger.info("bvt-41 executed Successfully.");
            isSuccess = true;
            done();
        });*/

        for(var i=1; i<=1000; i++){
         (function(x) {
         var summary = "Summary "+x;
         var Label = "Label"+x;
         var createTestMap = {
         ISSUETYPE: "Test",
         SUMMARY : summary,
         //PRIORITY : "Minor"
         LABEL : Label
         };
         zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
         assert.ok(isCreateTest, "Not Created test.");
         logger.info("Test "+x+" Created Successfully.");
         if(x === 1000){
         isSuccess = true;
         done();
         }
         });
         })(i);
         }

    });
    xit('Component created successfully.', function (done) {
        logout = false;
        jiraNavigator.createComponents("Components - ", function (createStatus) {
            assert.ok(createStatus, "Not Created Versions.");
            logger.info("Project Components Created Successfully.");
            logger.info("bvt-42 executed Successfully.");
            isSuccess = true;
            done();
        });
    });

     /**
      * Install "Zephyr Connect" plugin using json URL on Jira ondemand version, should create top-level "Tests" menu in the top navigation bar with list of Zephyr apps
      */
     xit('Addons is Uploaded Successfully.', function (done) {
         logout = false;
         jiraNavigator.uploadPlugin(params.testdata.connectUrl, function (uploadAddonsStatus) {
             assert.ok(uploadAddonsStatus, "Upload Addons Failed");
             logger.info("Addon is uploaded and Validated Successfully");
             logger.info("bvt-1 executed Successfully.");
             isSuccess = true;
             done();
         });
     });
    /**
     * Should able to launch all zephyr apps in "Tests" menu cleanly without an error being thrown
     */
    xit('Test Menus verified successfully.', function () {
        logout = false;
        zfjcloudNavigator.verifyTestMenu(function (verifyStatus) {
            assert.ok(verifyStatus, "Not Validated Menus.");
            logger.info("Test Menu Links are Validated Successfully.");
            logger.info("bvt-2 executed Successfully.");
            isSuccess = true;
        });
    });
    /**
     * Should be able to customize the default Test level execution Status
     */
    xit("Customized Default Test Status Successfully", function (done) {
        logout = false;
        jiraNavigator.updateTestExecStatus("PASS", "PASSED", function (updateTestStatus) {
            expect(updateTestStatus).toBe.true;
            logger.info("Test Status is Updated Successfully.");
            logger.info("bvt-3 executed successfully.");
            isSuccess = true;
            done();
        });

    });

    /**
     * Should be able to add a new Test Execution Status
     */
    xit("Add a New Test Execution Status Successfully", function (done) {
        logout = false;
        jiraNavigator.addTestExecStatus("INVALID", "Summary of INVALID.", "#63E89F", function (addNewTestStatus) {
            expect(addNewTestStatus).toBe.true;
            logger.info("Test Status is Added Successfully.");
            logger.info("bvt-4 executed successfully.");
            isSuccess = true;
            done();
        });

    });
    /**
     * Should be able to customize default Test step level execution Status
     */
    xit("Customized Default Step Status Successfully", function (done) {
        logout = false;
        jiraNavigator.updateStepExecStatus("PASS", "PASSED", function (updateStepStatus) {
            expect(updateStepStatus).toBe.true;
            logger.info("Customized Default Step Status Successfully");
            logger.info("bvt-5 executed successfully.");
            isSuccess = true;
            done();
        });

    });
    /**
     * Should be able to add a new Status for step level execution
     */
    xit("Add a New Test Execution Status Successfully", function (done) {
        logout = false;
        jiraNavigator.addStepExecStatus("INVALID", "Summary Of INVALID.", "#63E89F", function (addStepStatus) {
            expect(addStepStatus).toBe.true;
            logger.info("Add a New Test Execution Status Successfully");
            logger.info("bvt-6 executed successfully.");
            isSuccess = true;
            done();
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
            AFFECTEDVERSION: "Version 1.0",
            FIXVERSION: "Version 2.0",
            ENVIRONMENT: "Env",
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
    /**
     * Clone a Test step by entered a valid step number
     */
    xit('Clone a Test step by entered a valid step number.', function (done) {
        logout = false;
        /*var createTestMap = {
         TESTNAME : "IE-12",
         SUMMARY: "Version 2.0"
         };*/

        var createTestMap = testOneMap;
        var testStepMap = {
            TESTNAME : createTestMap.TESTNAME,
            STEPNUM : "2",
            //TYPE : "after step"
            TYPE : "step at",
            CLONEAT : "5"
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
    /**
     * Should able to "Clone" test with Test steps
     */
    xit('Test is Cloned Successfully.', function (done) {
        logout = false;
        /*var createTestMap = {
         SUMMARY: "Version 1.0",
         PRIORITY: "Minor",
         COMPONENT: "Component1",
         AFFECTEDVERSION: "Version 1.0",
         FIXVERSION: "Version 2.0",
         ENVIRONMENT: "Env",
         DESCRIPTION: "testing angry bird against Android os",
         LABEL: "jellybean",
         CLONESUMMARY: "Version 1.0"
         };*/
        var createTestMap = testOneMap;
        //createTestMap["CLONESUMMARY"] = "Cloned Test";
        logger.info("Test name After Assigned  :" + testOneMap.TESTNAME);
        createTestMap["CLONESUMMARY"] = "Cloned Test";

        /*jiraNavigator.navigateToCreateTestPage(function(isNavigateStatus){
         assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
         logger.info("Create Test Page Validated Successfully.");
         zfjcloudNavigator.createTest(createTestMap, function(isCreatedTest){
         assert.ok(isCreatedTest, "Not created Test.");
         zfjcloudNavigator.cloneTest(createTestMap, function(isEditedTest){
         assert.ok(isEditedTest, "Not Edited Test.");
         done();
         });
         });
         });*/
        zfjcloudNavigator.quickSearchById(createTestMap, function (isSearched) {
            assert.ok(isSearched, "Not searched Test.");
            logger.info("Test Searched Successfully.");
            zfjcloudNavigator.cloneTest(createTestMap, function (isEditedTest) {
                assert.ok(isEditedTest, "Not Cloned Test.");
                isSuccess = true;
                logout = true;
                done();
            });
        });

    });

    xit('Rearranged Test Steps Successfully.', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Version 1.00",
            PRIORITY: "Minor",
            COMPONENT: "Component1",
            AFFECTEDVERSION: "Version 1.0",
            FIXVERSION: "Version 2.0",
            ENVIRONMENT: "Env",
            DESCRIPTION: "testing angry bird against Android os",
            LABEL: "jellybean",
            TESTNAME: "IE-69"
        };
        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            expect(navigateToSearchTestPageStatus).toBe.true;
            logger.info("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.reArrangeTeststeps(1, 3, function (isSearched) {
                assert.ok(isSearched, "Not searched Test.");
                logger.info("Steps Rearranged Successfully.:>:>:");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Should able to search tests using a keyword in Summary
     */
    xit('Search test by Summary', function (done) {
        logout = false;
        /*var createTestMap = {
            TESTNAME : "IE-12",
            SUMMARY: "Version 2.0"
        };*/
        var createTestMap = testOneMap;
        logger.info("Test name After Assigned  :" + createTestMap.TESTNAME);
        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            expect(navigateToSearchTestPageStatus).toBe.true;
            logger.info("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.quickSearchBySummary(createTestMap, function (isSearched) {
                assert.ok(isSearched, "Not searched Test.");
                logger.info("Test Searched Successfully.:>:>:");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Should be able to "Edit" the test and change Summary and Details (Priority, Component etc.,)
     */
    xit('Test is Edited Successfully.', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Version 1.0",
            PRIORITY: "Minor",
            COMPONENT: "Component1",
            AFFECTEDVERSION: "Version 1.0",
            FIXVERSION: "Version 2.0",
            ENVIRONMENT: "Env",
            DESCRIPTION: "testing angry bird against Android os",
            LABEL: "jellybean"
        };
        var editTestMap = {
            SUMMARY: "Version 2.0",
            PRIORITY: browser.params.testdata.priority2,
            COMPONENT: browser.params.testdata.component1,
            AFFECTEDVERSION: "Version 2.0",
            FIXVERSION: "Version 2.0",
            ENVIRONMENT: "Env",
            DESCRIPTION: "testing angry bird against Android os",
            LABEL: "jellybean"
        };
        /*jiraNavigator.navigateToCreateTestPage(function(isNavigateStatus){
         assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
         logger.info("Create Test Page Validated Successfully.");
         testOneMap = createTestMap;
         zfjcloudNavigator.createTest(createTestMap, function(isCreatedTest){
         assert.ok(isCreatedTest, "Not created Test.");
         zfjcloudNavigator.editTest(createTestMap, editTestMap, function(isEditedTest){
         assert.ok(isEditedTest, "Not Edited Test.");
         done();
         });
         });
         });*/
        var createTestMap = testOneMap;
        logger.info("Test name After Assigned  :" + createTestMap.TESTNAME);
        zfjcloudNavigator.quickSearchById(createTestMap, function (isSearched) {
            assert.ok(isSearched, "Not searched Test.");
            logger.info("Test Searched Successfully.");
            zfjcloudNavigator.editTest(createTestMap, editTestMap, function (isEditedTest) {
                assert.ok(isEditedTest, "Not Edited Test.");
                isSuccess = true;
                done();
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
    /**
     * Create a new Test Cycle cleanly in a selected Version
     */
    it('Cycle is Created successfully.', function (done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle one"
            //DESCRIPTION : "cycle one description.",
            //BUILD : "build 1",
            // ENVIRONMENT : "env"
            //STARTDATE : "2014-12-12",
            //ENDDATE : "2014-12-12"
        };
        var createCycleMap1 = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle two"
        };
        var createCycleMap2 = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle three"
        };
        var createCycleMap3 = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle four"
        };
        var createCycleMap4 = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle five"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                logger.info("Cycle Created Successfully.");
                zfjcloudNavigator.createTestCycle(createCycleMap1, function (isCreatedCycle) {
                    assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                    zfjcloudNavigator.createTestCycle(createCycleMap2, function (isCreatedCycle) {
                        assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                        logger.info("Cycle Created Successfully.");
                        zfjcloudNavigator.createTestCycle(createCycleMap3, function (isCreatedCycle) {
                            assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                            logger.info("Cycle Created Successfully.");
                            zfjcloudNavigator.createTestCycle(createCycleMap4, function (isCreatedCycle) {
                                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                                logger.info("Cycle Created Successfully.");
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
     * Able to add a test to the Test Cycle individually
     */
    it('Add Test To Cycle Successfully.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle one",
            TESTNAME: ""
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
                zfjcloudNavigator.addSteps(createTestMap, function (isAddedStep) {
                    assert.ok(isAddedStep);
                    executeTestMap.TESTNAME = createTestMap.TESTNAME;
                    jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                        assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                        logger.info("Navigated Successfully to Plan Test Cycle.");
                        zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function (isAddedTestToCycle) {
                            assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                            logger.info("Test is added to Cycle Successfully.");
                            isSuccess = true;
                            executeMap1 = executeTestMap;
                            done();
                        });
                    });
                });
            });
        });
    });
    /**
     * Able to Execute Test using [E] and change test status to any
     */
    it('Test is executed Successfully.', function (done) {
        logout = false;
        /*var executeTestMap = {
         VERSIONNAME: "Version 1.0",
         CYCLENAME: "cycle one",
         TESTNAME: executeMap1.TESTNAME,
         TESTSTATUS: "FAIL"

         };*/
        var executeTestMap = executeMap1;
        executeTestMap["TESTSTATUS"] = "FAIL";
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            logger.info(executeMap1.VERSIONNAME);logger.info(executeTestMap.VERSIONNAME);
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                assert.ok(isExecutedTest, "Not Executed Test.");
                logger.info("Test is executed Directly Plan test Cycle Page.");
                logger.info("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Able to Execute test step and change Teststep status to any
     */
    it('Step is executed Successfully.', function(done) {
        logout = false;
        var executeTestMap = executeMap1;
        if (executeTestMap.hasOwnProperty("TESTSTATUS")) {
            delete executeTestMap["TESTSTATUS"];
        }
        executeTestMap["STEPSTATUS"] = "FAIL";
        executeTestMap["STEPNUM"] = "2";
        logger.info(executeMap1.VERSIONNAME);logger.info(executeTestMap.VERSIONNAME);
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                assert.ok(isExecutedTest, "Not Executed Test.");
                logger.info("Test is executed Directly Plan test Cycle Page.");
                logger.info("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Should be able to Execute Test with a New status added- User defined
     */
    it('Test is executed Successfully.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle one",
            TESTNAME: "",
            TESTSTATUS: "INVALID"
            //TESTDEFECT : "IE-1",
            //TESTCOMMENT : "comment"
            //STEPSTATUS : "FAIL",
            //STEPDEFECT : "IE-1",
            //STEPCOMMENT : "Comment On Step",
            //STEPNUM : "2"

        };
        var createTestMap = {
            SUMMARY: "Test For change status to Invalid",
            PRIORITY: browser.params.testdata.priority1
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            logger.info("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                logger.info("Test name :" + createTestMap.TESTNAME);
                zfjcloudNavigator.addSteps(createTestMap, function (isAddedStep) {
                    assert.ok(isAddedStep);
                    executeTestMap.TESTNAME = createTestMap.TESTNAME;
                    jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                        assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                        logger.info("Navigated Successfully to Plan Test Cycle.");
                        zfjcloudNavigator.addTestToCycle("Version 1.0", "cycle one", executeTestMap.TESTNAME, function (isAddedTestToCycle) {
                            assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                            logger.info("Test is added to Cycle Successfully.");
                            executeMap2 = executeTestMap;
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
    });
    /**
     * Should be able to Execute Test step with a New status added- User defined
     */
    it('Step is executed To New Status Successfully.', function (done) {
        logout = false;
        var executeTestMap = executeMap2;
        if (executeTestMap.hasOwnProperty("TESTSTATUS")) {
            delete executeTestMap["TESTSTATUS"];
        }
        executeTestMap["STEPSTATUS"] = "INVALID";
        executeTestMap["STEPNUM"] = "2";
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                assert.ok(isExecutedTest, "Not Executed Test.");
                logger.info("Test is executed Directly Plan test Cycle Page.");
                logger.info("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
        });

        /*var executeTestMap = {
         VERSIONNAME : "Version 1.0",
         CYCLENAME : "cycle one",
         TESTNAME : "",
         // TESTSTATUS : "FAIL"
         //TESTDEFECT : "IE-1",
         //TESTCOMMENT : "comment"
         STEPSTATUS : "INVALID",
         //STEPDEFECT : "IE-1",
         //STEPCOMMENT : "Comment On Step",
         STEPNUM : "2"

         };
         var createTestMap = {
         ISSUETYPE: "Test",
         SUMMARY : "Test one."
         //PRIORITY : "Minor"
         };*/
        /*zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest){
         assert.ok(isCreateTest, "Not Created test.");
         executeTestMap.TESTNAME = createTestMap.TESTNAME;
         zfjcloudNavigator.addSteps(createTestMap, function(isAddedStep){
         assert.ok(isAddedStep);
         jiraNavigator.navigateToPlanTestCyclePage(function(isNavigateToPlanTestCycle){
         assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
         logger.info("Navigated Successfully to Plan Test Cycle.");
         zfjcloudNavigator.addTestToCycle("Version 1.0", "cycle one", executeTestMap.TESTNAME, function(isAddedTestToCycle){
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
         });
         });*/
    });
    /**
     * Execute all test steps to a single status and set overall test execution status to suggested value
     */
    it('All Steps are executed..', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle one",
            TESTNAME: "",
            EXECUTEALLSTEP: "FAIL"
            //STEPNUM : "2"

        };
        var createTestMap = {
            SUMMARY: "Test For execute All Steps to Single status",
            PRIORITY: browser.params.testdata.priority1
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            logger.info("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                logger.info("Test name :" + createTestMap.TESTNAME);
                zfjcloudNavigator.addSteps(createTestMap, function (isAddedStep) {
                    assert.ok(isAddedStep);
                    jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                        assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                        logger.info("Navigated Successfully to Plan Test Cycle.");
                        zfjcloudNavigator.addTestToCycle("Version 1.0", "cycle one", executeTestMap.TESTNAME, function (isAddedTestToCycle) {
                            assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                            logger.info("Test is added to Cycle Successfully.");
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
    });
    /**
     * Able to add an existing bug to  the Test during execution
     */
    xit('Test is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle one",
            TESTNAME: "",
            TESTSTATUS: "FAIL",
            TESTDEFECT: ""
            //TESTCOMMENT : "comment"
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
                zfjcloudNavigator.addTestToCycle("Version 1.0", executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
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

    xit('Test is executed in Plan test Cycle Page.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle one",
            TESTNAME: "",
            TESTSTATUS: "FAIL",
            TESTDEFECT: "",
            TESTCOMMENT: "comment"
            //STEPSTATUS : "FAIL",
            //STEPDEFECT : "IE-1",
            //STEPCOMMENT : "Comment On Step",
            //STEPNUM : "2"

        };
        var createTestMap = {
            SUMMARY: "Test one.",
            PRIORITY: "Minor"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            logger.info("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                executeTestMap.TESTNAME = createTestMap.TESTNAME;

                jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                    assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                    logger.info("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.addTestToCycle("Version 1.0", "cycle one", createTestMap.TESTNAME, function (isAddedTestToCycle) {
                        assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                        logger.info("Test is added to Cycle Successfully.");
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
    xit('Test is executed Directly In Plan test Cycle Page.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle one",
            TESTNAME: "",
            EXECUTETESTDIRECTLY: "FAIL"
            //TESTDEFECT : "IE-3",
            //TESTCOMMENT : "comment"

        };
        var createTestMap = {
            SUMMARY: "Test is executed Directly Plan test Cycle Page.",
            PRIORITY: "Minor"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            logger.info("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                executeTestMap.TESTNAME = createTestMap.TESTNAME;

                jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                    assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                    logger.info("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.addTestToCycle("Version 1.0", "cycle one", createTestMap.TESTNAME, function (isAddedTestToCycle) {
                        assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                        logger.info("Test is added to Cycle Successfully.");
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
    xit('Test is executed Directly In View Issue Page.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle one",
            TESTNAME: "IE-1",
            EXECUTETESTDIRECTLY: "FAIL"
            //TESTDEFECT : "IE-3",
            //TESTCOMMENT : "comment"

        };
        var createTestMap = {
            SUMMARY: "Test is executed Directly In View Test Cycle.",
            PRIORITY: "Minor"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            logger.info("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                executeTestMap.TESTNAME = createTestMap.TESTNAME;

                jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                    assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                    logger.info("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.addTestToCycle("Version 1.0", "cycle one", createTestMap.TESTNAME, function (isAddedTestToCycle) {
                        assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                        logger.info("Test is added to Cycle Successfully.");
                        jiraNavigator.navigateToSearchTestPage(function (isNavigateToSearchTestPage) {
                            assert.ok(isNavigateToSearchTestPage, "Not Navigated To Search Test Page.");
                            logger.info("Navigated Successfully To Search Test Page.");
                            zfjcloudNavigator.executeTestFromViewTestPage(executeTestMap, function (isExecutedTest) {
                                assert.ok(isExecutedTest, "Not Executed Test.");
                                logger.info("Test is executed Directly View Issue Page.");
                                logger.info("bvt-55 executed Successfully.");
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
     * Should be able to [Return to Test Cycle] from execute page
     */
    it('Return to Test Cycle From Execute Test Page Successfully.', function (done) {
        logout = false;
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
                jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
                    expect(navigateStatus).toBe.true;
                    logger.info("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.addTestToCycle("Version 1.0", "cycle one", createTestMap.TESTNAME, function (addTestToCycleStatus) {
                        expect(addTestToCycleStatus).toBe.true;
                        logger.info("Test is added to Cycle Successfully.");//createTestMap.TESTNAME
                        zfjcloudNavigator.checkReturnToCycle("Version 1.0", "cycle one", createTestMap.TESTNAME, function (executeTestStatus) {
                            expect(executeTestStatus).toBe.true;
                            logger.info("Returned To Test From Execute Test Page Successfully.");
                            logger.info("bvt-52 executed Successfully.");
                            isSuccess = true;
                            done();
                        });
                    });
                });
            });

        });
    });

    xit('Return To Test.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle one",
            TESTNAME: "",
            RETURNTOTEST: "FAIL"
            //TESTDEFECT : "IE-3",
            //TESTCOMMENT : "comment"

        };
        var createTestMap = {
            SUMMARY: "Test 1",
            PRIORITY: "Minor"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            logger.info("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                //executeTestMap.TESTNAME = createTestMap.TESTNAME;

                jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
                    expect(navigateStatus).toBe.true;
                    logger.info("Navigated Successfully to Plan Test Cycle.");
                     zfjcloudNavigator.addTestToCycle("Version 1.0", "cycle one", createTestMap.TESTNAME, function(addTestToCycleStatus){
                     expect(addTestToCycleStatus).toBe.true;
                     logger.info("Test is added to Cycle Successfully.");
                         jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
                         expect(navigateToSearchTestPageStatus).toBe.true;
                         logger.info("Navigated Successfully To Search Test Page.");
                            zfjcloudNavigator.executeTestUsingE(executeTestMap, function (executeTestStatus) {
                                expect(executeTestStatus).toBe.true;
                                logger.info("Test is Executed to Default Status in Cycle Successfully.");
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
    xit('Add Tests in multiple to a Test Cycle and execute tests with different statuses.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle four",
            //EXECUTETESTDIRECTLY : "BLOCKED"
            TESTSTATUS : ["FAIL", "WIP","BLOCKED"]

        };

        zfjcloudNavigator.getTests(5, function (isGetTests) {
            logger.info("Test : "+isGetTests);
            executeTestMap["TESTNAME"] = isGetTests;
            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                logger.info("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.addMultipleTests(executeTestMap, function (isExecutedTest) {
                    assert.ok(isExecutedTest, "Not Executed Test.");
                    logger.info("Tests are added successfully.");
                    //delete executeTestMap["TESTNAME"];
                    //executeTestMap["TESTNAME"] = "";
                    //logger.info("::::::::::::::::::"+executeTestMap.TESTNAME);
                    var counter = 0;
                    zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                        assert.ok(isExecutedTest, "Not Executed Test.");
                        logger.info("Test is executed Directly Plan test Cycle Page.");
                        logger.info("bvt-23 executed Successfully.");
                        isSuccess = true;
                        done();
                    });
                    /*isGetTests.forEach(function (test) {
                     (function(x){
                     executeTestMap["TESTNAME"] = x;
                     logger.info(test+"Test for execution : "+executeTestMap.TESTNAME);
                     var statuses = ['PASSED','FAIL','WIP','BLOCKED'];
                     var ri = Math.floor(Math.random() * statuses.length); // Random Index position in the array
                     executeTestMap["EXECUTETESTDIRECTLY"] = statuses[ri];
                     logger.info("Status for execution : "+executeTestMap.EXECUTETESTDIRECTLY);
                     zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                     assert.ok(isExecutedTest, "Not Executed Test.");
                     logger.info("Test is executed Directly Plan test Cycle Page.");
                     counter++;
                     logger.info(isGetTests +"::"+counter);
                     if(counter === (isGetTests.length)){
                     logger.info("bvt-23 executed Successfully.");
                     isSuccess = true;
                     done();
                     }
                     });
                     })(test);

                     });*/
                    /*for(var i=0; i < isGetTests.length; i++){
                     (function(x){
                     executeTestMap["TESTNAME"] = isGetTests[x];
                     logger.info(isGetTests[x]+"Test for execution : "+executeTestMap.TESTNAME);
                     var statuses = ['PASSED','FAIL','WIP','BLOCKED'];
                     var ri = Math.floor(Math.random() * statuses.length); // Random Index position in the array
                     executeTestMap["EXECUTETESTDIRECTLY"] = statuses[ri];
                     logger.info("Status for execution : "+executeTestMap.EXECUTETESTDIRECTLY);
                     zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                     assert.ok(isExecutedTest, "Not Executed Test.");
                     logger.info("Test is executed Directly Plan test Cycle Page.");
                     if(x === (isGetTests.length-1)){
                     logger.info("bvt-23 executed Successfully.");
                     isSuccess = true;
                     done();
                     }
                     });
                     })(i);
                     }*/
                });
            });
        });
    });
    /**
     * Should be able to Edit the Test Cycle and change cycle name, dates etc.,
     */
    it('Test Cycle is Edited successfully.', function (done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle for edit",
            DESCRIPTION: "cycle description.",
            BUILD: "build 1",
            ENVIRONMENT: "env"
            //STARTDATE : "2014-12-12",
            // ENDDATE : "2014-12-12"
        };
        var editCycleMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle edited",
            DESCRIPTION: "cycle description edited.",
            BUILD: "build 1 edited",
            ENVIRONMENT: "env edited"
            //STARTDATE : "2014-12-13",
            //ENDDATE : "2014-12-13"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
            expect(navigateStatus).toBe.true;
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (createCycleStatus) {
                expect(createCycleStatus).toBe.true;
                logger.info("Cycle is Created Successfully.");
                zfjcloudNavigator.editCycle(createCycleMap, editCycleMap, function (editCycleStatus) {
                    expect(editCycleStatus).toBe.true;
                    logger.info("Cycle is Edited Successfully.");
                    isSuccess = true;
                    done();
                });
            });
        });

    });
    /**
     * Add Tests from another Cycle
     */
    it('Add Test From Cycle Successfully.', function(done) {
        logout = false;
        var addTestFromCycleMap = {
            VERSION_NAME : "Version 1.0",
            CYCLE_NAME : "cycle three",
            FROM_CYCLE_NAME : "cycle one"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
            assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.addTestFromCycle(addTestFromCycleMap, function(addTestFromCycleStatus){
                assert.ok(addTestFromCycleStatus, "Tests are not added.");
                logger.info("Test is added to Cycle Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Move Cycle from one version to other
     */
    it('Move test cycle from one version to other with different name have Tests 1 or more scheduled', function (done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "Move test cycle from one version to other with same name have Tests scheduled"
        };
        var moveCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME: "Move test cycle from one version to other with same name have Tests scheduled"

            //MOVE_VERSION_NAME : "Version 2.0"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (navigateStatus) {
            expect(navigateStatus).toBe.true;
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
    /**
     * Should able to delete a Cycle
     */
    it('Delete a Cycle with No Tests added ', function (done) {
        logout = false;
        var deleteCycleMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "Delete a Cycle with No Tests added1."
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (navigateToPlanCycleStatus) {
            assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(deleteCycleMap, function (createCycleStatus) {
                assert.ok(createCycleStatus, "Cycle Not Created.");
                logger.info("Cycle is Created Successfully.");
                zfjcloudNavigator.deleteCycle(deleteCycleMap.VERSIONNAME, deleteCycleMap.CYCLENAME, function (deleteCycleStatus) {
                    assert.ok(deleteCycleStatus, "Cycle not deleted.");
                    logger.info("Cycle Deleted Successfully.");
                    isSuccess = true;
                    done();
                });
            });
        });
    });
    /**
     * Should be able to Clone a Cycle
     */
    it('Clone a Cycle with No Tests added ', function (done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "Clone a Cycle with No Tests added."
            //TYPE : "default"
        };
        var cloneCycleMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "Clone a Cycle with No Tests added new1"
            //TYPE : "default"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (navigateToPlanCycleStatus) {
            assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (createCycleStatus) {
                assert.ok(createCycleStatus, "Cycle Not Created.");
                logger.info("Cycle is Created Successfully.");
                zfjcloudNavigator.cloneCycle(createCycleMap, cloneCycleMap, function (cloneCycleStatus) {
                    assert.ok(cloneCycleStatus, "Cycle not Cloned.");
                    logger.info("Cycle is Cloned Successfully.");
                    isSuccess = true;
                    done();
                });
            });
        });
    });
    /**
     * Dock/Undock the execution Filter
     */
    it('Dock and Undock the execution Filter', function (done) {
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
    /**
     * Run any pre-defined filter
     */
    it('Run any pre-defined filter.', function (done) {
        logout = false;
        jiraNavigator.navigateToSearchTestExecutionPage(function (navigateToSearchTestExecutionPageStatus) {
            assert.ok(navigateToSearchTestExecutionPageStatus, "Not Navigated To Search Test Execution Page.");
            logger.info("Search Test Execution Validated Successfully.");
            zfjcloudNavigator.executePreDinedFilters("My Executed Tests", function(validateChartsStatus) {
                assert.ok(validateChartsStatus, "Failed To UnDock Filter Panel.");
                logger.info("Filter Panel UnDocked Successfully.");
                isSuccess = true;
                done();
            });
        });

    });
    /**
     * Search executions, Filter by Project,Version,Cyclename (Simple search)
     */
    it('Select Project, Version and Cycle from Simple Search.', function (done) {
        logout = false;
        jiraNavigator.navigateToSearchTestExecutionPage(function (navigateToSearchTestExecutionPageStatus) {
            assert.ok(navigateToSearchTestExecutionPageStatus, "Not Navigated To Search Test Execution Page.");
            logger.info("Search Test Execution Validated Successfully.");
            zfjcloudNavigator.selectProjectVersionAndCycle(browser.params.testdata.project, "Version 1.0", "cycle one", function(validateChartsStatus) {
                assert.ok(validateChartsStatus, "Failed To UnDock Filter Panel.");
                logger.info("Filter Panel UnDocked Successfully.");
                isSuccess = true;
                done();
            });
        });

    });
    /**
     * Bulk change status on test executions
     */
    it('Bulk Execute Test Status execution navigator with Test Status.', function (done) {
        logout = false;
        var bulkChangeMap = {
            PROJECTNAME : browser.params.testdata.project,
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle three",
            //TESTNAME : "",
            TESTSTATUS : "FAIL"
            //STEPSTATUS : "WIP"
            //TESTDEFECT : ""s
            //TESTCOMMENT : "comment"
            //STEPSTATUS : "FAIL",
            //STEPDEFECT : "IE-1",
            //STEPCOMMENT : "Comment On Step",
            //STEPNUM : "2"

        };

        jiraNavigator.navigateToSearchTestExecutionPage(function (navigateToSearchTestExecutionPageStatus) {
            assert.ok(navigateToSearchTestExecutionPageStatus, "Not Navigated To Search Test Execution Page.");
            logger.info("Search Test Execution Validated Successfully.");
            zfjcloudNavigator.bulkChangeStatus(bulkChangeMap, function(validateChartsStatus) {
                assert.ok(validateChartsStatus, "Failed To UnDock Filter Panel.");
                logger.info("Filter Panel UnDocked Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Bulk change status on test executions with Test steps
     */
    it('Bulk Execute Test and Step Status execution navigator.', function (done) {
        logout = false;
        var bulkChangeMap = {
            PROJECTNAME : browser.params.testdata.project,
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle three",
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

        jiraNavigator.navigateToSearchTestExecutionPage(function (navigateToSearchTestExecutionPageStatus) {
            assert.ok(navigateToSearchTestExecutionPageStatus, "Not Navigated To Search Test Execution Page.");
            logger.info("Search Test Execution Validated Successfully.");
            zfjcloudNavigator.bulkChangeStatus(bulkChangeMap, function(validateChartsStatus) {
                assert.ok(validateChartsStatus, "Failed To UnDock Filter Panel.");
                logger.info("Filter Panel UnDocked Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Should able to Delete test executions in Bulk (1 or more)
     */
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
                jiraNavigator.navigateToPlanTestCyclePage(function(isNavigateToPlanTestCycle) {
                    assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                    logger.info("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.addTestToCycle(bulkDeleteMap.VERSIONNAME, bulkDeleteMap.CYCLENAME, bulkDeleteMap.TESTNAME, function(isAddedTestToCycle) {
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

    /**
     * Should able to directly execute a test in Execution Navigator
     */
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
            });
        });
    });
    xit('Execute Test Directly from execution navigator.', function () {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle three",
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
        });*/
        jiraNavigator.navigateToSearchTestExecutionPage(function (navigateToSearchTestExecutionPageStatus) {
            assert.ok(navigateToSearchTestExecutionPageStatus, "Not Navigated To Search Test Execution Page.");
            logger.info("Search Test Execution Validated Successfully.");
            zfjcloudNavigator.executeTestDirectlyInExecutionNavigator(browser.params.testdata.project, executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, "FAIL", "", function(validateChartsStatus) {
                assert.ok(validateChartsStatus, "Failed To UnDock Filter Panel.");
                logger.info("Filter Panel UnDocked Successfully.");
                isSuccess = true;
            });
        });



    });
    /**
     * Should be able to view Test summary and can be drilled down the count
     */
    it('validate Test Summary Links', function (done) {
        logout = false;
        jiraNavigator.navigateToTestSummaryPage(function (navigateToTestSummaryPageStatus) {
            assert.ok(navigateToTestSummaryPageStatus, "Not Navigated To Test Summary Page.");
            logger.info("Test Summary Page Validated Successfully.");
            zfjcloudNavigator.viewAndDrillDownTestSummary(function (validateLinksStatus) {
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
    it('validate 30 day Test Summary Charts', function () {
        logout = false;
        jiraNavigator.navigateToTestSummaryPage(function (navigateToTestSummaryPageStatus) {
            assert.ok(navigateToTestSummaryPageStatus, "Not Navigated To Test Summary Page.");
            logger.info("Test Summary Page Validated Successfully.");
            zfjcloudNavigator.validateSummaryCharts(function (validateChartsStatus) {
                assert.ok(validateChartsStatus, "Failed To Validate Test Summary Charts");
                logger.info("Test summary Charts Validated Successfully.");
                logger.info("bvt-34 executed Successfully.");
                isSuccess = true;
            });
        });
    });
    /**
     * Should Launch Test Metrics cleanly and display Execution charts in Dashboard - Daily Execution Progress, Execution By Cycle, Execution By Person, Execution By Date, Lists
     */
    it('validate Test Metrics Charts', function () {
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
    it('Validate Data in Test Metrics Charts', function () {
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
    /**
     * Should able to generate Access key and Secret Keys when Access key and Secret Keys are blank login first time
     */
    it('Should able to generate Access key and Secret Keys when Access key and Secret Keys are blank login first time', function () {
        logout = true;
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

});