var searchTestPage = require('./zfjcloud10po/SearchTestPage.js');
var planTestCyclePage = require('./zfjcloud10po/PlanTestCyclePage.js');
var CreateTestPage = require('./zfjcloud10po/CreateTestPage.js');
var ViewTestPage = require('./zfjcloud10po/ViewTestPage.js');
var TestSummaryPage = require('./zfjcloud10po/TestSummaryPage.js');
var ZfjGeneralConfigPage = require('./zfjcloud10po/ZfjGeneralConfigPage.js');
var ExecuteTestPage = require('./zfjcloud10po/ExecuteTestPage.js');
var TestMetricsPage = require('./zfjcloud10po/TestMetricsPage.js');
var ZfjHelpPage = require('./zfjcloud10po/ZFJHelpPage.js');
var ZfjWelcomePage = require('./zfjcloud10po/ZFJWelcomePage.js');
var AboutZephyrPage = require('./zfjcloud10po/AboutZephyrPage.js');
var SearchTestExecutionPage = require('./zfjcloud10po/SearchTestExecutionPage.js');
var jiraNavigator = require('../jira/JiraNavigatorFactory.js').getInstance();
var ApiAccessPage = require('./zfjcloud10po/ApiAccessPage.js');

var commUtil = require('./../utils/commUtil.js');

var zfjcloudNavigator10Impl = function() {

  
  /******************************************************
   *  CONNECT NAVIGATOR METHODS
   *****************************************************/
   
    this.deleteTest = function(callback) {
      searchTestPage.deleteTest(function(deleteTestStatus){
          expect(deleteTestStatus).toBe.true;
          callback(deleteTestStatus);
      });
    };
    this.exportTests = function(callback) {
        searchTestPage.exportTests(function(deleteTestStatus){
            expect(deleteTestStatus).toBe.true;
            callback(deleteTestStatus);
        });
    };
    this.saveAsFilter = function(filterName, callback) {
        searchTestPage.saveAsFilter(filterName, function(totalTests){
            //expect(totalTests).not.toBe.true;
            callback(totalTests);
        });
    };
    this.createTestCycle = function(createCycleMap, callback) {
        planTestCyclePage.createCycle(createCycleMap, function(createCycleStatus){
            expect(createCycleStatus).toBe.true;
            callback(createCycleStatus);
        });
    };
    this.deleteCycle = function(versionName, cycleName, isDeletedCycle){
        planTestCyclePage.deleteCycle(versionName, cycleName, function(deleteCycleStatus){
            assert.ok(deleteCycleStatus, "Not Deleted Cycle");
            logger.info(cycleName+ " is deleted Successfully.");
            isDeletedCycle(deleteCycleStatus);
        });
    };
    /*this.editCycle = function(versionName, cycleName, newCycleName, callback){
        planTestCyclePage.editCycle(versionName, cycleName, newCycleName, function(editCycleStatus){
            expect(editCycleStatus).toBe.true;
            logger.info(cycleName+ " is edited to "+newCycleName+" Successfully.");
            callback(editCycleStatus);
        });
    };*/
    this.editCycle = function(createCycleMap, editCycleMap, isEditedCycle){
        planTestCyclePage.editCycle(createCycleMap, editCycleMap, function(editCycleStatus){
            expect(editCycleStatus).toBe.true;
            //logger.info(cycleName+ " is edited to "+newCycleName+" Successfully.");
            isEditedCycle(editCycleStatus);
        });
    };

    this.cloneCycle = function(CreateCycleMap, cloneCycleMap, callback){
        planTestCyclePage.cloneCycle(CreateCycleMap, cloneCycleMap, function(cloneCycleStatus){
            expect(cloneCycleStatus).toBe.true;
            //onsole.log(cycleName + " is Cloned to "+"CLONE - "+cycleName+" Successfully.");
            callback(cloneCycleStatus);
        });
    };
    this.addTestToCycle = function(versionName, cycleName, testName, callback){
        planTestCyclePage.addTestToCycle(versionName, cycleName, testName, function(addTestToCycleStatus){
            assert.ok(addTestToCycleStatus);
            driver.switchTo().defaultContent();
            logger.info(testName + " is added to "+cycleName+" Successfully.");
            callback(addTestToCycleStatus);
        });
    };
    this.addTestToCycle = function(addTestToCycleMap, callback){
        planTestCyclePage.addTestToCycle(addTestToCycleMap, function(addTestToCycleStatus){
            assert.ok(addTestToCycleStatus);
            driver.switchTo().defaultContent();
            //logger.info(testName + " is added to "+cycleName+" Successfully.");
            callback(addTestToCycleStatus);
        });
    };
    this.addMultipleTests = function(addTestsMap, callback){
        planTestCyclePage.addMultipleTests(addTestsMap, function(addTestToCycleStatus){
            assert.ok(addTestToCycleStatus, "Not Added Tests.");
            driver.switchTo().defaultContent();
            //logger.info(testName + " is added to "+cycleName+" Successfully.");
            callback(addTestToCycleStatus);
        });
    };
    this.addTesstToCycleByJiraSearch = function(versionName, cycleName, filterName, totalTests, callback){
        planTestCyclePage.addTestToCycleByJiraFilter(versionName, cycleName, filterName, totalTests, function(addTestToCycleStatus){
            expect(addTestToCycleStatus).toBe.true;
            logger.info(totalTests + " is added to "+cycleName+" Successfully.");
            callback(addTestToCycleStatus);
        });
        /*this.saveAsFilter(filterName, function(totalTests){

        });*/

    };
    this.executeTestUsingE = function(executeTestMap, callback){
        planTestCyclePage.executeTestStatus(executeTestMap, function(executeTestStatus){
            assert.ok(executeTestStatus, "Not Executed Test.");
            //logger.info(testName + " is executed in "+cycleName+" Successfully.");
            callback(executeTestStatus);
        });
    };
    this.executeTestWithDefectUsingE = function(versionName, cycleName, testName, changeTestStatus, defectID, callback){
        planTestCyclePage.executeTestStatusWithDefect(versionName, cycleName, testName, changeTestStatus, defectID, function(executeTestStatus){
            expect(executeTestStatus).toBe.true;
            logger.info(testName + " is executed in "+cycleName+" Successfully.");
            callback(executeTestStatus);
        });
    };
    this.executeStepUsingE = function(versionName, cycleName, testName, stepNum, changeStepStatus, callback){
        planTestCyclePage.executeStepStatus(versionName, cycleName, testName, stepNum, changeStepStatus, function(executeStepStatus){
            expect(executeStepStatus).toBe.true;
            logger.info(stepNum + "of "+ testName + " is executed in "+cycleName+" Successfully.");
            callback(executeStepStatus);
        });
    };
    this.executeStepWithExistingDefectUsingE = function(versionName, cycleName, testName, stepNum, changeStepStatus, stepDefectID, callback){
        planTestCyclePage.executeStepStatusWithExistingDefect(versionName, cycleName, testName, stepNum, changeStepStatus,stepDefectID, function(executeStepStatus){
            expect(executeStepStatus).toBe.true;
            logger.info(stepNum + "of "+ testName + " is executed in "+cycleName+" Successfully.");
            callback(executeStepStatus);
        });
    };
    this.addCommentToTest = function(versionName, cycleName, testName, commentText, callback){
        planTestCyclePage.addCommentToTest(versionName, cycleName, testName, commentText, function(addCommentStatus){
            expect(addCommentStatus).toBe.true;
            logger.info("Comment is added Successfully.");
            callback(addCommentStatus);
        });
    };
    this.addCommentToStep = function(versionName, cycleName, testName, stepNum, commentText, callback){
        planTestCyclePage.addCommentToStep(versionName, cycleName, testName, stepNum, commentText, function(addCommentStatus){
            expect(addCommentStatus).toBe.true;
            logger.info("Comment is added Successfully.");
            callback(addCommentStatus);
        });
    };
    this.executeTestDirectlyInPlanTestCycle = function(versionName, cycleName, testName, changeStatus, callback){
        planTestCyclePage.executeTestDirectly(versionName, cycleName, testName, changeStatus, function(changeTestStatus){
            expect(changeTestStatus).toBe.true;
            logger.info("Test is Executed Successfully.");
            callback(changeTestStatus);
        });
    };
    this.addTestToCycleInViewTestPage = function(versionName, cycleName, testName, callback){
        searchTestPage.navigateToTest(testName, function( navigateToTestStatus){
            assert.ok(navigateToTestStatus, "Not Navigated to Test.");
            logger.info("Navigated To First Test Successfully.");
            ViewTestPage.addTestToCycle(versionName, cycleName, testName, function(addTestToCycleStatus){
                assert.ok(addTestToCycleStatus, "Not added Test to Cycle.");
                logger.info("Test Is added Successfully To Cycle.");
                callback(addTestToCycleStatus);
            });

        });
    };
    this.executeTestFromViewTestPage = function(executeTestMap, isExecutedTest){
        searchTestPage.navigateToTest(executeTestMap.TESTNAME, function( navigateToTestStatus) {
            assert.ok(navigateToTestStatus, "Not Navigated To Test For Issue Navigator.");
            logger.info("Navigated To Test Successfully.");

            if(executeTestMap.hasOwnProperty("EXECUTEADHOC")){
                planTestCyclePage.executeTestFromViewTestPage(executeTestMap, function(isExecuteTestInAdHoc){
                    assert.ok(isExecuteTestInAdHoc, "Not Executed Test in Adhoc.");
                    isExecutedTest(isExecuteTestInAdHoc);
                });
            }else{
                ViewTestPage.executeTest(executeTestMap, function (isExecuteStatus) {
                    assert.ok(isExecuteStatus, "Not Executed Test From view Issue page.");
                    //logger.info("Test is Executed Successfully in View test Page.");
                    isExecutedTest(isExecuteStatus);
                });
            }

        });
    };
    /*this.executeTestDirectlyViewTestPage = function(versionName, cycleName, testName, changeStatus, callback){
        searchTestPage.navigateToTest(testName, function( navigateToTestStatus) {
            assert.ok(navigateToTestStatus, "Not Navigated To Test For Issue Navigator.");
            logger.info("Navigated To Test Successfully.");

            ViewTestPage.executeTestDirectlyViewTestPage(versionName, cycleName, testName, changeStatus, function (changeTestStatus) {
                expect(changeTestStatus).toBe.true;
                logger.info("Test is Executed Successfully in View test Page.");
                callback(changeTestStatus);
            });
        });
    };*/
    /*this.executeTestInAdHocFromViewTestPage = function(executeTestMap, callback){
        searchTestPage.navigateToTest(executeTestMap.TESTNAME, function( navigateToTestStatus) {
            expect(navigateToTestStatus).toBe.true;
            logger.info("Navigated To Test Successfully.");

            require('./zfjcloud10po/PlanTestCyclePage.js').executeTestFromViewTestPage(testName, changeStatus, function (changeTestStatus) {
                expect(changeTestStatus).toBe.true;
                logger.info("Test is Executed Successfully in Ad hoc cycle in View test Page.");
                callback(changeTestStatus);
            });
        });
    };*/
    this.executeTestInAdHocFromViewTestPage = function(executeTestMap, callback){
        logger.info("Test Name : "+executeTestMap.TESTNAME);
        ViewTestPage.executeTestInAdHoc(executeTestMap, function(isExecuteTestInAdHoc){
            assert.ok(isExecuteTestInAdHoc, "Not Executed Test in Adhoc.");
            logger.info("Navigated To Execute Test Page Successfully.");
            callback(true);
            /*planTestCyclePage.executeTestFromViewTestPage(executeTestMap, function(isExecuteTestInAdHocStatus){
                assert.ok(isExecuteTestInAdHocStatus, "Not Executed Test in Adhoc.");
                callback(isExecuteTestInAdHocStatus);
            });*/
        });
        /*searchTestPage.navigateToTest(executeTestMap.TESTNAME, function( navigateToTestStatus) {
            expect(navigateToTestStatus).toBe.true;
            logger.info("Navigated To Test Successfully.");

            ViewTestPage.executeTestInAdhocFromViewTestPage(executeTestMap.TESTNAME, function(isExecuteTestInAdHoc){
                assert.ok(isExecuteTestInAdHoc, "Not Executed Test in Adhoc.");
                planTestCyclePage.executeTestFromViewTestPage1(executeTestMap, function(isExecuteTestInAdHocStatus){
                    assert.ok(isExecuteTestInAdHocStatus, "Not Executed Test in Adhoc.");
                    callback(isExecuteTestInAdHocStatus);
                });
            });
        });*/
    };
    this.addAttachmentToTest = function(versionName, cycleName, testName, attachmentFile, callback){
        planTestCyclePage.addAttachmentToTest(versionName, cycleName, testName, attachmentFile, function(addCommentStatus){
            expect(addCommentStatus).toBe.true;
            logger.info("Attachment is added Successfully.");
            callback(addCommentStatus);
        });
    };
    this.checkReturnToCycle = function(versionName, cycleName, testName, callback){
        planTestCyclePage.checkReturnToCycle(versionName, cycleName, testName, function(executeTestStatus){
            expect(executeTestStatus).toBe.true;
            logger.info("Returned to plan Test Cycle Successfully.");
            callback(executeTestStatus);
        });
    };
    this.checkReturnToTest = function(versionName, cycleName, testName, callback){
        planTestCyclePage.checkReturnToTest(versionName, cycleName, testName, function(executeTestStatus){
            expect(executeTestStatus).toBe.true;
            logger.info("Returned to plan Test Cycle Successfully.");
            callback(executeTestStatus);
        });
    };
    this.executeAllStepsToOne = function(versionName, cycleName, testName, testStatusToChange, callback){
        planTestCyclePage.executeAllStepsToOne(versionName, cycleName, testName, testStatusToChange, function(executeStepStatus){
            expect(executeStepStatus).toBe.true;
            logger.info( testName + " is executed in "+cycleName+" Successfully.");
            callback(executeStepStatus);
        });
    };
    //Added by Karthik.

    this.createTest = function(createTestMap, isCreatedTest) {
        CreateTestPage.createTest(createTestMap, function(isCreateTest){
            assert.ok(isCreateTest, "Not created Test.");
            //isCreatedTest(isCreateTest);
            ViewTestPage.quickSearch(createTestMap, function(searchedTestStatus){
                assert.ok(searchedTestStatus, "Not Searched Test.");
                ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                    assert.ok(isValidateTest, "Not Validated Test.");
                    console.log("Test validated Successfully.");
                    isCreatedTest(isValidateTest);
                });
            });
        });
    };

    /*this.validateSearchTestpage = function(){
        searchTestPage.validateSearchTestpage();
    };

    this.validateCreateTestPage = function(){
        CreateTestPage.validateCreateTestPage();
    };

    this.validatePlanTestCyclepage = function(){
      planTestCyclePage.validatePlanTestCyclepage();
    };

    this.validateExecuteTestpage = function(){
        ExecuteTestPage.validateExecuteTestpage();
    };

    this.validateTestSummarypage = function(){
        TestSummaryPage.validateTestSummarypage();
    };

    this.validateTestMetricspage = function(){
        TestMetricsPage.validateTestMetricspage();
    };

    this.validateZfjHelppage = function(){
        ZfjHelpPage.validateZfjHelppage();
    };

    this.validateZfjWelcomepage = function(){
        ZfjWelcomePage.validateZfjWelcomepage();
    };

    this.validateAboutZephyrpage = function(){
        AboutZephyrPage.validateAboutZephyrpage();
    };
*/
    this.addTeststepsToTest = function(testStepMap, isAddedSteps){
       /* ViewTestPage.quickSearch(testStepMap.TESTNAME, function(searchedTestStatus){
            assert.ok(searchedTestStatus, "Not Searched Test.");
            ViewTestPage.addStepsToTest(testStepMap, function(isAdded){
                assert.ok(isAdded, "Not Added Steps To Test.");
                isAddedSteps(isAdded);
            });
        });*/
        searchTestPage.getFirstTest(function(test){
            testStepMap["TESTNAME"] = test;
            logger.info(" Test : "+test);
            searchTestPage.navigateToTest(test, function(isNavigate){
                assert.ok(isNavigate, "Not navigated To Test.");
                ViewTestPage.addStepsToTest(testStepMap, function(isAdded){
                    assert.ok(isAdded, "Not Added Steps To Test.");
                    isAddedSteps(isAdded);
                });
            });
        });
    };
    /*this.addTeststepsToTest = function(teststepMap){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.addTeststeps(teststepMap);
    };*/

    this.editTestStep = function(stepEditMap, editStepStatus){

        /*searchTestPage.navigateToFirstTest();
        ViewTestPage.editTestStep(teststepEditMap);*/
        ViewTestPage.editTestStep(stepEditMap, function(stepEditStatus){
            assert.ok(stepEditStatus, "Not Edited Step");
            editStepStatus(stepEditStatus);
        });

    };

    this.reArrangeTeststeps = function(srcStep,destStep, isRearranged){
        searchTestPage.getFirstTest(function(test){
            //testStepMap["TESTNAME"] = test;
            logger.info(" Test : "+test);
            searchTestPage.navigateToTest(test, function(isNavigate){
                assert.ok(isNavigate, "Not navigated To Test.");
                ViewTestPage.rearrangeTestSteps(test, srcStep, destStep, function(isAdded){
                    assert.ok(isAdded, "Not Rearranged Steps.");
                    isRearranged(isAdded);
                });
            });
        });
       // searchTestPage.navigateToFirstTest();
       // ViewTestPage.rearrangeTestSteps(createTestmap, isRearrange);
    };

    this.editAndRearrangeTeststeps = function(teststepEditMap,srcStep,destStep){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.editTeststep(teststepEditMap);
        ViewTestPage.rearrangeTeststeps(srcStep,destStep);


    };

    this.cloneTeststepByEnteringValidNumber = function(teststep, cloneAt){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.cloneTeststepByEnteringValidNumber(teststep, cloneAt);
    };

    this.cloneTeststepInsertAfterStep = function(teststepToBeCloned){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.cloneTeststepInsertAfterStep(teststepToBeCloned);

    };

    this.deleteTeststep = function(teststepToDelete){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.deleteTeststep(teststepToDelete);

    };

    /*this.cloneTest = function(testSummary){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.cloneTest(testSummary);
    };*/
    this.cloneTest = function(cloneTestMap, isCloned){
        logger.info(cloneTestMap.TESTNAME);
        ViewTestPage.quickSearch(cloneTestMap, function(searchedTestStatus){
            assert.ok(searchedTestStatus, "Not Searched Test.");
            ViewTestPage.cloneTest(cloneTestMap, function(isClonedTest){
                assert.ok(isClonedTest);
                isCloned(isClonedTest);
            });
        });
        /*searchTestPage.navigateToTest(cloneTestMap.TESTNAME, function(isNavigate){
            assert.ok(isNavigate, "Not navigated To Test.");
            ViewTestPage.cloneTest(cloneTestMap, function(isClonedTest){
                assert.ok(isClonedTest);
                isCloned(isClonedTest);
            });
        });*/
    };

    this.editTest = function (createTestMap, editTestMap,isEdited) {
        /*searchTestPage.navigateToFirstTest();
        ViewTestPage.editTestAndValidate(map);*/
        ViewTestPage.quickSearch(createTestMap, function(searchedTestStatus){
            assert.ok(searchedTestStatus, "Not Searched Test.");
            ViewTestPage.editTest(createTestMap, editTestMap, function(isEditedTest){
                assert.ok(isEditedTest, "Not Edited test.");
                isEdited(isEditedTest);
            });
        });
        /*searchTestPage.navigateToTest(createTestMap.TESTNAME, function(isNavigate){
            assert.ok(isNavigate, "Not navigated To Test.");
            ViewTestPage.editTest(createTestMap, editTestMap, function(isEditedTest){
                assert.ok(isEditedTest, "Not Edited test.");
                isEdited(isEditedTest);
            });
        });*/

    };

    this.quickSearchBySummary = function(createTestMap, isSearched){
        searchTestPage.searchTestBySummary(createTestMap, function(searchedTestStatus){
            assert.ok(searchedTestStatus, "Not Searched Test.");
            ViewTestPage.validateTestCreate(createTestMap, function(isValidatedTest){
                assert.ok(isValidatedTest, "Not Validated Test.");
                isSearched(searchedTestStatus);
            });
        });
    };

    this.quickSearchById = function(createTestMap, isSearched){
        ViewTestPage.quickSearch(createTestMap, function(searchedTestStatus){
            assert.ok(searchedTestStatus, "Not Searched Test.");
            isSearched(searchedTestStatus);
        });
    };
    this.createTestDirectly = function(createTestMap, isCreated){
        ViewTestPage.createTestDirectly(createTestMap, function(isCreateTest){
            assert.ok(isCreateTest, "Not Created test.");
            isCreated(isCreateTest);
        });
    };

    this.viewAndDrillDownTestSummary = function(isValidate){
        TestSummaryPage.validateTestSummaryLinks(function(validateLinkStatus){
            assert.ok(validateLinkStatus, "Not Validate Links.");
            isValidate(validateLinkStatus);
        });
        //TestSummaryPage.validateTestSummary();
    };
    this.validateSummaryCharts = function(callback){
        TestSummaryPage.validateTestSummaryChart(function(testSummaryChartStatus){
            assert.ok(testSummaryChartStatus, "Validate testSummaryCharts Failed.");
            callback(testSummaryChartStatus);
        });
    };

    this.exportAndValidateTest = function(){
      searchTestPage.exportTests();
    };

    this.checkWorkflowToolbar = function(){
        ZfjGeneralConfigPage.checkWorkFlowToolbar();
    };

    this.changeWorkflowToolbar = function(){
        ZfjGeneralConfigPage.changeWorkflowToolbar();
    };

    this.validateWorkflowToolbar = function(){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.validateWorkflowToolbar();
    };

    this.changeIssueLinkStatus = function(){
        ZfjGeneralConfigPage.changeIssueLinkStatus();
    };

    this.checkIssueLink = function(){
        ZfjGeneralConfigPage.checkIssueLink();

    };

    this.checkRemoteIssueLinkStatus = function(){
        ZfjGeneralConfigPage.checkRemoteIssueLinkStatus();

    };

    this.changeRemoteIssueLinkStatus = function(){
        ZfjGeneralConfigPage.changeRemoteIssueLinkStatus();
    };


    /******************************************************
     * 	METHODS USED IN FUNCTIONAL TESTING.
     *****************************************************/

    this.addBlankTeststeps = function(count){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.addBlankTeststeps(count);
    };

    this.addTeststepsWithLinks = function(teststepDatas){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.addTeststepsWith(teststepDatas);

    };

    this.addTeststepsWithLinebreak = function (teststepDatas) {
        searchTestPage.navigateToFirstTest();
        ViewTestPage.addTeststepsWith(teststepDatas);

    };

    this.addTeststepsWithAlphaNumricCharacters = function(teststepDatas){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.addTeststepsWith(teststepDatas);
    };

    this.addTeststepsWithOnlyNumbers = function(teststepDatas){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.addTeststepsWith(teststepDatas);
    };

    this.addTeststepsWithOnlyCapitalLetters = function(teststepDatas){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.addTeststepsWith(teststepDatas);

    };

    this.addTeststepsWithSpecialCharacters = function(teststepDatas){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.addTeststepsWith(teststepDatas);
    };
    this.addTeststepsWithInternationalCharacters = function(teststepDatas){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.addTeststepsWith(teststepDatas);
    };

    this.addTeststepsWithQuestionMark = function(teststepDatas){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.addTeststepsWith(teststepDatas);
    };

    this.addTeststepsWithAngularTags = function(teststepDatas){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.addTeststepsWith(teststepDatas);
    };

    this.editTeststepAndCancel = function(teststepEditMap){
        searchTestPage.navigateToFirstTest();
        ViewTestPage.editTeststepAndCancel(teststepEditMap);
    };
    this.getTotalTests = function(callback){
        searchTestPage.totalTests(function(totalTests){
            callback(totalTests);
        });
    };
    this.createTestWithSummary = function(summary, callback){
        try{
            var jiraLandingPage = require('../jira/jira63po/JiraLandingPage.js');
            jiraLandingPage.navigateToCreateTestPage().then(function(){
                CreateTestPage.createTestWithSummary(summary, function(getTestID){
                    callback(getTestID);
                });
            });
        }catch(err){
            console.error(err);
        }
    };
    this.createTestWithTestStep = function(summary, callback){
        try{
            var jiraLandingPage = require('../jira/jira63po/JiraLandingPage.js');
            jiraLandingPage.navigateToCreateTestPage().then(function(){
                CreateTestPage.createTestWithSummary(summary, function(getTestID){
                    ViewTestPage.addMultipleSteps(function(stepCreateStatus){
                        assert.ok(stepCreateStatus, "Steps Not Created.");
                        callback(getTestID);
                    });
                });
            });
        }catch(err){
            console.error(err);
        }
    };
    this.moveCycle = function(createCycleMap, moveCycleMap, callback){
        planTestCyclePage.moveCycle(createCycleMap, moveCycleMap, function(moveCycleStatus){
            assert.ok(moveCycleStatus, "Cycle Not Moved.");
            //logger.info(cycleName+ " is edited to "+newCycleName+" Successfully.");
            callback(moveCycleStatus);
        });
    };
    this.addTestFromCycle = function(addTestFromCycleMap, callback){
        planTestCyclePage.addTestFromCycle(addTestFromCycleMap, function(addTestFromCycleStatus){
            assert.ok(addTestFromCycleStatus, "Tests are not added.");
            //logger.info(cycleName+ " is edited to "+newCycleName+" Successfully.");
            callback(addTestFromCycleStatus);
        });
    };

    this.deleteTestFromCycle = function(deleteTestFromCycleMap, callback){
        try{
            planTestCyclePage.deleteTestFromCycle(deleteTestFromCycleMap, function(deleteTestStatus){
                assert.ok(deleteTestStatus, "Test is not deleted.");
                callback(deleteTestStatus);
            });
        }catch(err){
            throw err;
        }
    };
    this.getTest  = function(type, isGetTest){
        try{
            if(type === "test"){
                searchTestPage.totalTests(function(getTestStatus){
                    assert.ok(getTestStatus, "Not Fetched Test For Execution.");
                    isGetTest();
                });
            }else{
                searchTestPage.totalTests(function(getTestStatus){
                    assert.ok(getTestStatus, "Not Fetched Test For Execution.");
                    ViewTestPage.addMultipleSteps(function(abc){

                    });
                });
            }

        }catch(e){

        }
    };
    this.doValidateTestSummaryCharts = function(isValidateCharts){
        TestMetricsPage.doValidateTestMetricsCharts(function(validateCharts){
            assert.ok(validateCharts, "Not validated Charts.");
            isValidateCharts(validateCharts);
        });
    };
    this.doValidateTestMetricsChartsWithData = function(totalExecuted, isValidateCharts){
        TestMetricsPage.doValidateCharts(totalExecuted, function(validateCharts){
            assert.ok(validateCharts, "Not validated Charts.");
            isValidateCharts(validateCharts);
        });
    };
    this.getTotalExecutedFromTestSummaryPage = function(isGetTotalExecuted){
        jiraNavigator.navigateToTestSummaryPage(function (navigateToTestSummaryPageStatus) {
            assert.ok(navigateToTestSummaryPageStatus, "Not Navigated To Test Summary Page.");
            logger.info("Test Summary Page Validated Successfully.");
            TestSummaryPage.getTotalTestExecuted(function(totalExecuted){
                isGetTotalExecuted(totalExecuted);
            });
        });
    };
    this.addSteps = function(createTestMap, callback){
        /*jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus) {
            expect(navigateToSearchTestPageStatus).toBe.true;
            logger.info("Navigated Successfully To Search Test Page.");
            searchTestPage.navigateToTest(createTestMap.TESTNAME, function(isNavigate) {
                assert.ok(isNavigate, "Not navigated To Test.");
                ViewTestPage.addMultipleSteps(function(abc) {
                    assert.ok(abc);
                    callback(abc);
                });
            });
        });*/

        ViewTestPage.quickSearch(createTestMap, function(searchedTestStatus){
            assert.ok(searchedTestStatus, "Not Searched Test.");
            ViewTestPage.addMultipleSteps(function(abc) {
                assert.ok(abc);
                callback(abc);
            });
        });

    };
    this.addSteps = function(createTestMap, callback){
        //logger.info("mk :"+createTestMap.STEPSTOCREATE);
        ViewTestPage.quickSearch(createTestMap, function(searchedTestStatus){
            assert.ok(searchedTestStatus, "Not Searched Test.");
            //logger.info("mk :"+createTestMap.STEPSTOCREATE);
            ViewTestPage.addMultipleSteps(function(isAdded) {
                assert.ok(isAdded, "Not Added Step.");
                callback(isAdded);
            });
        });
    };
    this.verifyTestMenu = function(isVerify) {
        driver.switchTo().defaultContent();
        jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestStatus){
            assert.ok(navigateToSearchTestStatus, "Not Navigated To Search Test Page.");
            searchTestPage.doValidateSearchTestPage(function(validateSearchTestPageStatus){
                assert.ok(validateSearchTestPageStatus, "Not Validated Search Test Page.");
                logger.info("Search Test Page Validated Successfully.");

                jiraNavigator.navigateToCreateTestPage(function(navigateToCreateTestStatus) {
                    assert.ok(navigateToCreateTestStatus, "Not Navigated To Create Test Page.");
                    CreateTestPage.validateCreateTestPage(function(validateCreateTestPageStatus) {
                        assert.ok(validateCreateTestPageStatus, "Not Validated Create Test Page.");
                        logger.info("Create Test Page Validated Successfully.");

                        //browser.actions().keyDown(protractor.Key.ESCAPE).perform();
                        commUtil.actionClass().sendKeys(protractor.Key.ESCAPE).perform();

                        jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus) {
                            assert.ok(navigateToPlanCycleStatus, "Not Navigated To Plan Test Cycle Page.");
                            planTestCyclePage.doValidatePlanTestCyclePage(function (validatePlanTestCyclePageStatus) {
                                assert.ok(validatePlanTestCyclePageStatus, "Not Validated Create Test Page.");
                                logger.info("Plan Test Cycle Page Validated Successfully.");
                                jiraNavigator.navigateToExecuteTestPage(function(navigateToExecuteTestPageStatus) {
                                    assert.ok(navigateToExecuteTestPageStatus, "Not Navigated To Execute Test Page.");
                                    planTestCyclePage.doValidatePlanTestCyclePage(function (validatePlanTestCyclePageStatus) {
                                        assert.ok(validatePlanTestCyclePageStatus, "Not Validated Execute Test Page.");
                                        logger.info("Execute Test Page Validated Successfully.");
                                        jiraNavigator.navigateToTestSummaryPage(function(navigateToTestSummaryPageStatus) {
                                            assert.ok(navigateToTestSummaryPageStatus, "Not Navigated To Test Summary Page.");
                                            TestSummaryPage.doValidateTestSummaryPage(function (validateTestSummaryPageStatus) {
                                                assert.ok(validateTestSummaryPageStatus, "Not Validated Test Summary Page.");
                                                logger.info("Test Summary Page Validated Successfully.");
                                                jiraNavigator.navigateToTestMetricsPage(function(navigateToTestMetricsPageStatus) {
                                                    assert.ok(navigateToTestMetricsPageStatus, "Not Navigated To Test Metrics Page.");
                                                    TestMetricsPage.doValidateTestMetricsPage(function(validateTestMetricsPageStatus) {
                                                        assert.ok(validateTestMetricsPageStatus, "Not Validated Test Metrics Page.");
                                                        logger.info("Test Metrics Page Validated Successfully.");
                                                        jiraNavigator.navigateToApiAccessPage(function (navigateToApiAccessPageStatus) {
                                                            assert.ok(navigateToApiAccessPageStatus, "Not Navigated To Api Access Page.");
                                                            logger.info("Api Access Page Validated Successfully.");
                                                            ApiAccessPage.doValidateApiAccessPage(function (doValidateApiAccessPage) {
                                                                assert.ok(doValidateApiAccessPage, "Failed To Validate Api Access Page");
                                                                logger.info("Api Access Page Validated Successfully.");
                                                                jiraNavigator.navigateToWelcomePage(function(isNavigateToWelcomePage) {
                                                                    assert.ok(isNavigateToWelcomePage, "Not Navigated To Welcome Page.");
                                                                    ZfjWelcomePage.doValidateZfjWelcomePage(function(isValidateWelcomePage) {
                                                                        assert.ok(isValidateWelcomePage, "Not Validated Welcome Page.");
                                                                        logger.info("Welcome Page Validated Successfully.");
                                                                        jiraNavigator.navigateToZFJHelpPage(function(isNavigateToZFJHelpPage) {
                                                                            assert.ok(isNavigateToZFJHelpPage, "Not Navigated To ZFJ Help Page.");
                                                                            ZfjHelpPage.doValidateZfjHelpPage(function(isValidateZFJHelpPage) {
                                                                                assert.ok(isValidateZFJHelpPage, "Not Validated ZFJ Help Page.");
                                                                                logger.info("ZFJ Help Page Validated Successfully.");
                                                                                jiraNavigator.navigateToAboutZephyrPage(function(isNavigateToAboutZephyrPage) {
                                                                                    assert.ok(isNavigateToAboutZephyrPage, "Not Navigated To About Zephyr Page.");
                                                                                    AboutZephyrPage.validateAboutZephyrPage(function(isValidateAboutZephyrPage) {
                                                                                        assert.ok(isValidateAboutZephyrPage, "Not Validated About Zephyr Page.");
                                                                                        logger.info("About Zephyr Page Validated Successfully.");
                                                                                        isVerify(isValidateAboutZephyrPage);
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    this.DockFilterPanel = function(isDockFilterPanel){
        SearchTestExecutionPage.DockFilterPanel(function (dockFilterStatus) {
            assert.ok(dockFilterStatus, "Not Docked Filter Panel.");
            isDockFilterPanel(dockFilterStatus);
        });
    };
    this.UnDockFilterPanel = function(isUnDockFilterPanel){
        SearchTestExecutionPage.UnDockFilterPanel(function (UnDockFilterStatus) {
            assert.ok(UnDockFilterStatus, "Not UnDocked Filter Panel.");
            isUnDockFilterPanel(UnDockFilterStatus);
        });
    };
    this.executePreDinedFilters = function(filterName, isExecutePreDefinedFilters){
        SearchTestExecutionPage.runPreDefinedFilters(filterName,function(isExecuted) {
            assert.ok(isExecuted, "Not Executed PreDefined Filters.");
            isExecutePreDefinedFilters(isExecuted);
        });
    };
    this.searchComponentFromSimpleFilter = function(isSearchedComponent){
        SearchTestExecutionPage.searchComponentInSimpleFilter(function(isSearched) {
            assert.ok(isSearched, "Not Searched Component in  Simple Search.");
            isSearchedComponent(isSearched);
        });
    };
    this.selectProjectVersionAndCycle = function(projectName, versionName, cycleName, isSelected){
        SearchTestExecutionPage.selectProjectVersionAndCycle(projectName, versionName, cycleName, function(isExecuted) {
            assert.ok(isExecuted, "Not Executed PreDefined Filters.");
            isSelected(isExecuted);
        });
    };
    this.executeTestDirectlyInExecutionNavigator = function(projectName, versionName, cycleName, testName, testStatus, isSelected){
        SearchTestExecutionPage.executeTestDirectlyInExecutionNavigator(projectName, versionName, cycleName, testName, testStatus, function(isExecuted) {
            assert.ok(isExecuted, "Not Executed test.");
            isSelected(isExecuted);
        });
    };
    this.bulkChangeStatus = function(bulkChangeMap, isChangedBulk){
        SearchTestExecutionPage.bulkChangeStatus(bulkChangeMap, function(isExecuted) {
            assert.ok(isExecuted, "Not Executed test.");
            isChangedBulk(isExecuted);
        });
    };
    this.getTests = function(tests, isGetTests){
        jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestStatus) {
            assert.ok(navigateToSearchTestStatus, "Not Navigated To Search Test Page.");
            searchTestPage.getTests(tests, function(getTests){
                assert.ok(getTests != null, "Not Searched Test.");
                isGetTests(getTests);
            });
        });
    };
    this.executeAllTests = function(){

    };
    this.cloneTestStep = function(testStepMap, isClonedStep){
        ViewTestPage.cloneTestStep(testStepMap, function (isCloned) {
            assert.ok(isCloned, "Not Cloned Test Step.");
            isClonedStep(isCloned);
        });
    };
    this.deleteTestStep = function(testStepMap, isClonedStep){
        ViewTestPage.deleteTestStep(testStepMap, function (isCloned) {
            assert.ok(isCloned, "Not Cloned Test Step.");
            isClonedStep(isCloned);
        });
    };
    this.deleteBulkExecutions = function(bulkDeleteMap, isDeleted){
        SearchTestExecutionPage.bulkDeleteExecutions(bulkDeleteMap, function(isDeletedBulk){
            isDeleted(isDeletedBulk);
        });
    };
    this.generateApiKeys = function(isDone){
        ApiAccessPage.generateApiAccessKeys(function(isGenerated){
            isDone(isGenerated);
        });
    };
    this.doValidateApiAccessPage = function(isDone){
        ApiAccessPage.doValidateApiAccessPage(function(isGenerated){
            isDone(isGenerated);
        });
    };

};
module.exports = new zfjcloudNavigator10Impl();