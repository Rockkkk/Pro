var commUtil = require('../utils/commUtil.js');

var zfjcloudNavigator = require('../zfjcloud/ZFJCloudNavigatorFactory.js').getInstance();
var jiraNavigator = require('../jira/JiraNavigatorFactory.js').getInstance();

var params = browser.params;
var isSuccess;
var logout;
beforeEach(function () {
    browser.ignoreSynchronization = true;
});

describe('ZFJ Cloud Testing For Jira Admin', function() {

beforeEach(function () {
        console.log('Before each of test.');
        isSuccess = false;
        logout = false;
        driver.getTitle().then(function(title){
            if(title.indexOf("Log in") != -1){
                jiraNavigator.doLogin(params.testdata.adminUsername, params.testdata.adminPassword, function(doLoginStatus){
                    assert.ok(doLoginStatus, "Login Not Successful.");
                    console.log("Login Successful.");
                    browser.ignoreSynchronization = true;
                    /*jiraNavigator.selectProject(function(selectprojectStatus){
                        assert.ok(selectprojectStatus, "Not Selected Project.");
                        console.log("Project is Selected Successfully.");

                    });*/
                });
            }
        });
    });

    afterEach(function () {
        console.log('after each of test.');
        driver.switchTo().defaultContent();
        driver.switchTo().defaultContent();
        if(isSuccess == false ){

        /*jiraNavigator.doLogout(function(doLogoutStatus){
               assert.ok(doLogoutStatus, "Logout is not Successful");
               console.log("Logout Successful.");
               browser.ignoreSynchronization = true;
        });*/

        }else if(logout == true){
            jiraNavigator.doLogout(function(doLogoutStatus){
                assert.ok(doLogoutStatus, "Logout is not Successful");
                console.log("Logout Successful.");
                browser.ignoreSynchronization = true;
            });
        }


    });

    it('Addons is Uploaded Successfully.', function(done) {
        logout = false;
        jiraNavigator.uploadPlugin(params.testdata.connectUrl, function(uploadAddonsStatus){
            assert.ok(uploadAddonsStatus, "Upload Addons Failed");
            console.log("Addon is uploaded and Validated Successfully");
            console.log("bvt-1 executed Successfully.");
            isSuccess = true;
            done();
        });

    });
    //bvt-3
    it("Customized Default Test Status Successfully", function(done){
        logout = false;
        jiraNavigator.updateTestExecStatus("PASS", "PASSED", function(updateTestStatus){
            expect(updateTestStatus).toBe.true;
            console.log("Test Status is Updated Successfully.");
            console.log("bvt-3 executed successfully.");
            isSuccess = true;
            done();
        });

    });

    //bvt-4
    it("Add a New Test Execution Status Successfully", function(done){
        logout = false;
        jiraNavigator.addTestExecStatus("INVALID", "Summary of INVALID.", "#63E89F", function(addNewTestStatus){
            expect(addNewTestStatus).toBe.true;
            console.log("Test Status is Added Successfully.");
            console.log("bvt-4 executed successfully.");
            isSuccess = true;
            done();
        });

    });
    //bvt-5
    it("Customized Default Step Status Successfully", function(done){
        logout = false;
        jiraNavigator.updateStepExecStatus("PASS", "PASSED", function(updateStepStatus){
            expect(updateStepStatus).toBe.true;
            console.log("Customized Default Step Status Successfully");
            console.log("bvt-5 executed successfully.");
            isSuccess = true;
            done();
        });

    });

    //bvt-6
    it("Add a New Test Execution Status Successfully", function(done){
        logout = false;
        jiraNavigator.addStepExecStatus("INVALID", "Summary Of INVALID.", "#63E89F", function(addStepStatus){
            expect(addStepStatus).toBe.true;
            console.log("Add a New Test Execution Status Successfully");
            console.log("bvt-6 executed successfully.");
            isSuccess = true;
            done();
        });

    });
    //bvt15
    it("Delete Test Successfully.", function(done){
        logout = false;
        jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
            expect(navigateToSearchTestPageStatus).toBe.true;
            console.log("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.deleteTest(function(deleteTestStatus){
                expect(deleteTestStatus).toBe.true;
                console.log("Test is Deleted Successfully");
                isSuccess = true;
                done();
            });
        });

    });
    it('Cycle is Created successfully.', function(done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            DESCRIPTION : "cycle f description.",
            BUILD : "build 1",
            ENVIRONMENT : "env",
            STARTDATE : "2014-12-12",
            ENDDATE : "2014-12-12"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle Created Successfully.");
                isSuccess = true;
                done();
            });
        });

    });
    iit('Clone Step.', function (done) {
        logout = false;
        var createTestMap = {
            TESTNAME : "ZIM-17",
            SUMMARY: "drtyu"
        };

        // var createTestMap = testOneMap;
        var testStepMap = {
            TESTNAME : createTestMap.TESTNAME,
            STEPNUM : "2",
            //TYPE : "after step"
            TYPE : "before step"
        };
        console.log("Test name After Assigned  :" + createTestMap.TESTNAME);
        zfjcloudNavigator.quickSearchById(createTestMap, function (isSearched) {
            assert.ok(isSearched, "Not searched Test.");
            console.log("Test Searched Successfully.");
            zfjcloudNavigator.cloneTestStep(testStepMap, function(stepEditStatus){
                assert.ok(stepEditStatus, "Not Edited Step");
                console.log("Step Cloned Successfully.");
                isSuccess = true;
                done();
            });

        });
    });
    iit('Clone Step.', function (done) {
        logout = false;
        var createTestMap = {
            TESTNAME : "ZIM-17",
            SUMMARY: "drtyu"
        };

        // var createTestMap = testOneMap;
        var testStepMap = {
            TESTNAME : createTestMap.TESTNAME,
            STEPNUM : "3",
            TYPE : "after step"
            //TYPE : "before step"
        };
        console.log("Test name After Assigned  :" + createTestMap.TESTNAME);
        zfjcloudNavigator.quickSearchById(createTestMap, function (isSearched) {
            assert.ok(isSearched, "Not searched Test.");
            console.log("Test Searched Successfully.");
            zfjcloudNavigator.cloneTestStep(testStepMap, function(stepEditStatus){
                assert.ok(stepEditStatus, "Not Edited Step");
                console.log("Step Cloned Successfully.");
                isSuccess = true;
                done();
            });

        });
    });
    iit('Clone Step.', function (done) {
        logout = false;
        var createTestMap = {
            TESTNAME : "ZIM-17",
            SUMMARY: "drtyu"
        };

        // var createTestMap = testOneMap;
        var testStepMap = {
            TESTNAME : createTestMap.TESTNAME,
            STEPNUM : "2",
            //TYPE : "after step"
            TYPE : "step at",
            CLONEAT : "5"
        };
        console.log("Test name After Assigned  :" + createTestMap.TESTNAME);
        zfjcloudNavigator.quickSearchById(createTestMap, function (isSearched) {
            assert.ok(isSearched, "Not searched Test.");
            console.log("Test Searched Successfully.");
            zfjcloudNavigator.cloneTestStep(testStepMap, function(stepEditStatus){
                assert.ok(stepEditStatus, "Not Edited Step");
                console.log("Step Cloned Successfully.");
                isSuccess = true;
                done();
            });

        });
    });
    iit('Clone Step.', function (done) {
        logout = false;
        var createTestMap = {
            TESTNAME : "ZIM-17",
            SUMMARY: "drtyu"
        };

        // var createTestMap = testOneMap;
        var testStepMap = {
            TESTNAME : createTestMap.TESTNAME,
            STEPNUM : "2",
            //TYPE : "after step"
            TYPE : "last step"
        };
        console.log("Test name After Assigned  :" + createTestMap.TESTNAME);
        zfjcloudNavigator.quickSearchById(createTestMap, function (isSearched) {
            assert.ok(isSearched, "Not searched Test.");
            console.log("Test Searched Successfully.");
            zfjcloudNavigator.cloneTestStep(testStepMap, function(stepEditStatus){
                assert.ok(stepEditStatus, "Not Edited Step");
                console.log("Step Cloned Successfully.");
                isSuccess = true;
                done();
            });

        });
    });
    iit('Delete Step.', function (done) {
        logout = false;
        var createTestMap = {
            TESTNAME : "ZIM-17",
            SUMMARY: "drtyu"
        };

        // var createTestMap = testOneMap;
        var testStepMap = {
            TESTNAME : createTestMap.TESTNAME,
            STEPNUM : "2"
            //TYPE : "after step"
            //TYPE : "last step"
        };
        console.log("Test name After Assigned  :" + createTestMap.TESTNAME);
        zfjcloudNavigator.quickSearchById(createTestMap, function (isSearched) {
            assert.ok(isSearched, "Not searched Test.");
            console.log("Test Searched Successfully.");
            zfjcloudNavigator.deleteTestStep(testStepMap, function(stepEditStatus){
                assert.ok(stepEditStatus, "Not Edited Step");
                console.log("Step Cloned Successfully.");
                isSuccess = true;
                done();
            });

        });
    });
    //bvt-27
    it('Test Cycle is Edited successfully.', function(done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME : "Version 3.0",
            CYCLENAME : "cycle for edit",
            DESCRIPTION : "cycle description.",
            BUILD : "build 1",
            ENVIRONMENT : "env",
            STARTDATE : "2014-12-12",
            ENDDATE : "2014-12-12"
        };
        var editCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "cycle edited",
            DESCRIPTION : "cycle description edited.",
            BUILD : "build 1 edited",
            ENVIRONMENT : "env edited",
            STARTDATE : "2014-12-13",
            ENDDATE : "2014-12-13"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                zfjcloudNavigator.editCycle(createCycleMap , editCycleMap, function(editCycleStatus){
                    expect(editCycleStatus).toBe.true;
                    console.log("Cycle is Edited Successfully.");
                    isSuccess = true;
                    done();
                });
            });

        });

    });
    it('Move test cycle from one version to other with different name have Tests 1 or more scheduled', function(done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "Move test cycle from one version to other with same name have Tests scheduled"
        };
        var moveCycleMap = {
            VERSIONNAME : "Version 3.0",
            CYCLENAME : "Move test cycle from one version to other with same name have Tests scheduled"

            //MOVE_VERSION_NAME : "Version 2.0"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Not created Cycle.");
                console.log("Cycle is Created Successfully.-===+++");
                zfjcloudNavigator.moveCycle(createCycleMap, moveCycleMap, function (moveCycleStatus) {
                    assert.ok(moveCycleStatus, "Not Moved Cycle.");
                    console.log("Cycle is Moved Successfully.-===+++");
                    isSuccess = true;
                    done();
                });
            });

        });
    });
    it('Delete a Cycle with No Tests added ', function(done) {
        logout = false;
        var deleteCycleMap = {
            VERSIONNAME : "Version 3.0",
            CYCLENAME : "Delete a Cycle with No Tests added."
        };
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
            assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(deleteCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle Not Created.");
                console.log("Cycle is Created Successfully.");
                zfjcloudNavigator.deleteCycle(deleteCycleMap.VERSIONNAME, deleteCycleMap.CYCLENAME, function(deleteCycleStatus){
                    assert.ok(deleteCycleStatus, "Cycle not deleted.");
                    console.log("Cycle Deleted Successfully.");
                    isSuccess = true;
                    done();
                });
            });
        });
    });
    it('Clone a Cycle with No Tests added ', function(done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "Clone a Cycle with No Tests added."
            //TYPE : "default"
        };
        var cloneCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "Clone a Cycle with No Tests added new"
            //TYPE : "default"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
            assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle Not Created.");
                console.log("Cycle is Created Successfully.");
                zfjcloudNavigator.cloneCycle(createCycleMap, cloneCycleMap, function(cloneCycleStatus){
                    assert.ok(cloneCycleStatus, "Cycle not Cloned.");
                    console.log("Cycle is Cloned Successfully.");
                    isSuccess = true;
                    done();
                });
            });
        });
    });
    it('Clone a Cycle with No Tests added ', function(done) {
        logout = false;
        var createCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "Clone a Cycle."
            //TYPE : "default"
        };
        var cloneCycleMap = {
            VERSIONNAME : "Version 3.0",
            CYCLENAME : "Clone a Cycle."
            //TYPE : "default"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
            assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle Not Created.");
                console.log("Cycle is Created Successfully.");
                zfjcloudNavigator.cloneCycle(createCycleMap, cloneCycleMap, function(cloneCycleStatus){
                    assert.ok(cloneCycleStatus, "Cycle not Cloned.");
                    console.log("Cycle is Cloned Successfully.");
                    isSuccess = true;
                    done();
                });
            });
        });
    });
    it('validate 30 day Test Summary Charts',function(){
        logout = true;
        jiraNavigator.navigateToTestSummaryPage(function(navigateToTestSummaryPageStatus){
            assert.ok(navigateToTestSummaryPageStatus, "Not Navigated To Test Summary Page.");
            console.log("Test Summary Page Validated Successfully.");
            zfjcloudNavigator.validateSummaryCharts(function(validateChartsStatus){
                assert.ok(validateChartsStatus, "Failed To Validate Test Summary Charts");
                console.log("Test summary Charts Validated Successfully.");
                console.log("bvt-34 executed Successfully.");
                isSuccess = true;
            });
        });
    });
    it('Add Test To Cycle Successfully.', function(done) {
        logout = true;
        //zfjcloudNavigator.createTestWithSummary("Test To Add To Cycle.", function(getTestID){
            jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
                expect(navigateStatus).toBe.true;
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.addTestToCycle("Version 1.0", "cycle one", "IE-1", function(addTestToCycleStatus){
                    expect(addTestToCycleStatus).toBe.true;
                    console.log("Test is added to Cycle Successfully.");
                    isSuccess = true;
                    done();
                });
            });
        //});

    });
    it('Return to Plan Test Cycle From Execute Test Page Successfully.', function(done) {
        logout = false;
        //zfjcloudNavigator.createTestWithSummary("Test to Return to Plan Test Cycle.", function(getTestID){
            jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
                expect(navigateStatus).toBe.true;
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.addTestToCycle("Version 1.0", "cycle one", "IE-1", function(addTestToCycleStatus) {
                    expect(addTestToCycleStatus).toBe.true;
                    console.log("Test is added to Cycle Successfully.");
                    zfjcloudNavigator.checkReturnToCycle("Version 1.0", "cycle one", "IE-1", function(executeTestStatus){
                        expect(executeTestStatus).toBe.true;
                        console.log("Returned To Plan Test Cycle Successfully.");
                        isSuccess = true;
                        done();
                    });
                });
            });
        //});

    });
    it('Test is Executed to New Test Status Successfully.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "IE-1",
            TESTSTATUS : "FAIL"
            //TYPE : "default"
        };
        //zfjcloudNavigator.createTestWithSummary("Execute Test into New Status.", function(getTestID){
            jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
                expect(navigateStatus).toBe.true;
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.executeTestUsingE(executeTestMap, function(executeTestStatus){
                    expect(executeTestStatus).toBe.true;
                    console.log("Test is Executed to Default Status in Cycle Successfully.");
                    console.log("bvt-23 executed Successfully.");
                    isSuccess = true;
                    done();
                });
            });
        //});

    });
    it('Test is Executed to New Test Status Successfully.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "IE-3",
            STEPSTATUS : "FAIL",
            STEPNUM : "2"

        };
        //zfjcloudNavigator.createTestWithSummary("Execute Test into New Status.", function(getTestID){
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function(executeTestStatus){
                expect(executeTestStatus).toBe.true;
                console.log("Test is Executed to Default Status in Cycle Successfully.");
                console.log("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
        //});

    });
    it('Test is Executed to New Test Status Successfully.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "IE-3",
            EXECUTEALLSTEP : "FAIL"
            //STEPNUM : "2"

        };
        //zfjcloudNavigator.createTestWithSummary("Execute Test into New Status.", function(getTestID){
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function(executeTestStatus){
                expect(executeTestStatus).toBe.true;
                console.log("Test is Executed to Default Status in Cycle Successfully.");
                console.log("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
        //});

    });
    it('Test is Executed to New Test Status Successfully.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "IE-3",
            EXECUTEALLSTEP : "FAIL"
            //STEPNUM : "2"

        };
        //zfjcloudNavigator.createTestWithSummary("Execute Test into New Status.", function(getTestID){
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function(executeTestStatus){
                expect(executeTestStatus).toBe.true;
                console.log("Test is Executed to Default Status in Cycle Successfully.");
                console.log("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
        //});

    });
    it('Test is Edited Successfully.', function(done) {
        logout = false;
        var createTestMap = {
            SUMMARY : "Version 1.0",
            PRIORITY : "Minor",
            COMPONENT : "Component1",
            AFFECTEDVERSION : "Version 1.0",
            FIXVERSION : "Version 2.0",
            ENVIRONMENT : "Env",
            DESCRIPTION : "testing angry bird against Android os",
            LABEL : "jellybean"
        };
        var editTestMap = {
            SUMMARY : "Version 2.0",
            PRIORITY : "Minor",
            COMPONENT : "Component1",
            AFFECTEDVERSION : "Version 1.0",
            FIXVERSION : "Version 2.0",
            ENVIRONMENT : "Env"
        };
        jiraNavigator.navigateToCreateTestPage(function(isNavigateStatus){
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function(isCreatedTest){
                assert.ok(isCreatedTest, "Not created Test.");
                zfjcloudNavigator.editTest(createTestMap, editTestMap, function(isEditedTest){
                    assert.ok(isEditedTest, "Not Edited Test.");
                    done();
                });
            });
        });

    });
    it('Test is Executed to New Test Status Successfully.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "IE-1",
            TESTSTATUS : "FAIL",
            TESTDEFECT : "IE-3"
            //STEPNUM : "2"

        };
        //zfjcloudNavigator.createTestWithSummary("Execute Test into New Status.", function(getTestID){
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function(executeTestStatus){
                expect(executeTestStatus).toBe.true;
                console.log("Test is Executed to Default Status in Cycle Successfully.");
                console.log("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
        //});

    });
    it('Test is Executed to New Test Status Successfully.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "IE-3",
            STEPSTATUS : "FAIL",
            STEPDEFECT : "IE-1",
            STEPNUM : "2"

        };
        //zfjcloudNavigator.createTestWithSummary("Execute Test into New Status.", function(getTestID){
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function(executeTestStatus){
                expect(executeTestStatus).toBe.true;
                console.log("Test is Executed to Default Status in Cycle Successfully.");
                console.log("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
        //});

    });
    it('Test is Executed to New Test Status Successfully.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "IE-4",
            TESTSTATUS : "FAIL",
            TESTDEFECT : "IE-3",
            TESTCOMMENT : "comment"

        };
        //zfjcloudNavigator.createTestWithSummary("Execute Test into New Status.", function(getTestID){
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function(executeTestStatus){
                expect(executeTestStatus).toBe.true;
                console.log("Test is Executed to Default Status in Cycle Successfully.");
                console.log("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
        //});

    });
    it('Test is Executed to New Test Status Successfully.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "IE-3",
            TESTSTATUS : "FAIL",
            TESTDEFECT : "IE-4",
            TESTCOMMENT : "comment",
            STEPSTATUS : "FAIL",
            STEPDEFECT : "IE-1",
            STEPCOMMENT : "Comment On Step",
            STEPNUM : "2"

        };
        //zfjcloudNavigator.createTestWithSummary("Execute Test into New Status.", function(getTestID){
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function(executeTestStatus){
                expect(executeTestStatus).toBe.true;
                console.log("Test is Executed to Default Status in Cycle Successfully.");
                console.log("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
        //});

    });
    it('Test is Executed to New Test Status Successfully.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "IE-1",
            EXECUTETESTDIRECTLY : "FAIL"
            //TESTDEFECT : "IE-3",
            //TESTCOMMENT : "comment"

        };
        //zfjcloudNavigator.createTestWithSummary("Execute Test into New Status.", function(getTestID){
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function(executeTestStatus){
                expect(executeTestStatus).toBe.true;
                console.log("Test is Executed to Default Status in Cycle Successfully.");
                console.log("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
        //});

    });
    it('Test is Executed to New Test Status Successfully.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "IE-1",
            EXECUTETESTDIRECTLY : "FAIL"
            //TESTDEFECT : "IE-3",
            //TESTCOMMENT : "comment"

        };
        //zfjcloudNavigator.createTestWithSummary("Execute Test into New Status.", function(getTestID){
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function(executeTestStatus){
                expect(executeTestStatus).toBe.true;
                console.log("Test is Executed to Default Status in Cycle Successfully.");
                console.log("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
        //});

    });
    //bvt-56
    it('Test is executed Directly In View Test Cycle.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "IE-1",
            EXECUTETESTDIRECTLY : "FAIL"
            //TESTDEFECT : "IE-3",
            //TESTCOMMENT : "comment"

        };
       /* zfjcloudNavigator.createTestWithSummary("Test is executed Directly In View Test Cycle.", function(getTestID){
            jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
                expect(navigateStatus).toBe.true;
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.addTestToCycle("Unscheduled", "cycle three", getTestID, function(addTestToCycleStatus) {
                    expect(addTestToCycleStatus).toBe.true;
                    console.log("Test is added to Cycle Successfully.");*/
                    jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
                        expect(navigateToSearchTestPageStatus).toBe.true;
                        console.log("Navigated Successfully To Search Test Page.");
                        zfjcloudNavigator.executeTestFromViewTestPage(executeTestMap, function(executeTestStatus){
                            expect(executeTestStatus).toBe.true;
                            console.log("Test is Executed in view Issue Page Successfully.");
                            console.log("bvt-55 executed Successfully.");
                            isSuccess = true;
                            done();
                        });
                    });
                //});
            //});
    });
    it('Add Test To Cycle Successfully In View Test Cycle.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "IE-1",
            EXECUTETESTDIRECTLY : "FAIL"
            //TESTDEFECT : "IE-3",
            //TESTCOMMENT : "comment"

        };
        /* zfjcloudNavigator.createTestWithSummary("Test is executed Directly In View Test Cycle.", function(getTestID){
         jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
         expect(navigateStatus).toBe.true;
         console.log("Navigated Successfully to Plan Test Cycle.");
         zfjcloudNavigator.addTestToCycle("Unscheduled", "cycle three", getTestID, function(addTestToCycleStatus) {
         expect(addTestToCycleStatus).toBe.true;
         console.log("Test is added to Cycle Successfully.");*/
        jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
            expect(navigateToSearchTestPageStatus).toBe.true;
            console.log("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.addTestToCycleInViewTestPage("Version 1.0", "cycle one", "IE-5", function(addTestToCycleStatus){
                expect(addTestToCycleStatus).toBe.true;
                console.log("Test is Added Successfully To Cycle in View test Page.");
                console.log("bvt-53 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
        //});
        //});
    });
    it('Test is Executed to New Test Status Successfully.', function(done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "cycle one",
            TESTNAME : "IE-1",
            RETURNTOTEST : "FAIL"
            //TESTDEFECT : "IE-3",
            //TESTCOMMENT : "comment"

        };
        //zfjcloudNavigator.createTestWithSummary("Execute Test into New Status.", function(getTestID){
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.executeTestUsingE(executeTestMap, function(executeTestStatus){
                expect(executeTestStatus).toBe.true;
                console.log("Test is Executed to Default Status in Cycle Successfully.");
                console.log("bvt-23 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
        //});

    });
    it('Test is Created Successfully.', function(done) {
        logout = false;
        var createTestMap = {
            SUMMARY : "Version 1.0",
            PRIORITY : "Minor",
            COMPONENT : "Component1",
            AFFECTEDVERSION : "Version 1.0",
            FIXVERSION : "Version 2.0",
            ENVIRONMENT : "Env",
            DESCRIPTION : "testing angry bird against Android os",
            LABEL : "jellybean"
        };
        jiraNavigator.navigateToCreateTestPage(function(isNavigateStatus){
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function(isCreatedTest){
                assert.ok(isCreatedTest, "Not created Test.");
                done();
            });
        });

    });
    it('Test is Created Successfully.', function(done) {
        logout = false;
        var createTestMap = {
            SUMMARY : "Test 1",
            PRIORITY : "Minor"
        };
        jiraNavigator.navigateToCreateTestPage(function(isNavigateStatus){
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function(isCreatedTest){
                assert.ok(isCreatedTest, "Not created Test.");
                done();
            });
        });

    });
    it('Test is Created Successfully.', function(done) {
        logout = false;
        var createTestMap = {
            SUMMARY : "Version 1.0",
            PRIORITY : "Minor",
            COMPONENT : "Component1"
        };
        jiraNavigator.navigateToCreateTestPage(function(isNavigateStatus){
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function(isCreatedTest){
                assert.ok(isCreatedTest, "Not created Test.");
                done();
            });
        });

    });
    it('Test is Created Successfully.', function(done) {
        logout = false;
        var createTestMap = {
            SUMMARY : "Version 1.0",
            PRIORITY : "Minor",
            COMPONENT : "Component1",
            AFFECTEDVERSION : "Version 1.0"
        };
        jiraNavigator.navigateToCreateTestPage(function(isNavigateStatus){
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function(isCreatedTest){
                assert.ok(isCreatedTest, "Not created Test.");
                done();
            });
        });

    });
    it('Test is Created Successfully.', function(done) {
        logout = false;
        var createTestMap = {
            SUMMARY : "Version 1.0",
            PRIORITY : "Minor",
            COMPONENT : "Component1",
            AFFECTEDVERSION : "Version 1.0",
            FIXVERSION : "Version 2.0"
        };
        jiraNavigator.navigateToCreateTestPage(function(isNavigateStatus){
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function(isCreatedTest){
                assert.ok(isCreatedTest, "Not created Test.");
                done();
            });
        });

    });
    it('Test is Created Successfully.', function(done) {
        logout = false;
        var createTestMap = {
            SUMMARY : "Version 1.0",
            PRIORITY : "Minor",
            COMPONENT : "Component1",
            AFFECTEDVERSION : "Version 1.0",
            FIXVERSION : "Version 2.0",
            ENVIRONMENT : "Env"
        };
        jiraNavigator.navigateToCreateTestPage(function(isNavigateStatus){
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function(isCreatedTest){
                assert.ok(isCreatedTest, "Not created Test.");
                done();
            });
        });

    });
    it('Test is Created Successfully.', function(done) {
        logout = false;
        var createTestMap = {
            SUMMARY : "Version 1.0",
            PRIORITY : "Minor",
            COMPONENT : "Component1",
            AFFECTEDVERSION : "Version 1.0",
            FIXVERSION : "Version 2.0",
            ENVIRONMENT : "Env",
            DESCRIPTION : "testing angry bird against Android os"
        };
        jiraNavigator.navigateToCreateTestPage(function(isNavigateStatus){
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function(isCreatedTest){
                assert.ok(isCreatedTest, "Not created Test.");
                done();
            });
        });

    });

    it('Test is Created Successfully.', function(done) {
        logout = false;
        var createTestMap = {
            SUMMARY : "Version 1.0",
            PRIORITY : "Minor",
            COMPONENT : "Component1",
            DESCRIPTION : "testing angry bird against Android os",
            LABEL : "jellybean"
        };
        jiraNavigator.navigateToCreateTestPage(function(isNavigateStatus){
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function(isCreatedTest){
                assert.ok(isCreatedTest, "Not created Test.");
                done();
            });
        });

    });
    it('Create Test steps.',function(done){
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
        jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
            expect(navigateToSearchTestPageStatus).toBe.true;
            console.log("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.addTeststepsToTest(testStepMap, function(executeTestStatus){
                expect(executeTestStatus).toBe.true;
                console.log("Added Step To Test Successfully.");
                console.log("bvt-55 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    it('Return to Plan Test Cycle From Execute Test Page Successfully.', function(done) {
        logout = false;
        //zfjcloudNavigator.createTestWithSummary("Test to Return to Plan Test Cycle.", function(getTestID){
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.addTestToCycle("Version 1.0", "cycle one", "IE-1", function(addTestToCycleStatus) {
                expect(addTestToCycleStatus).toBe.true;
                console.log("Test is added to Cycle Successfully.");
                zfjcloudNavigator.checkReturnToTest("Unscheduled", "cycle one", "IE-1", function(executeTestStatus){
                    expect(executeTestStatus).toBe.true;
                    console.log("Returned To Test From Execute Test Page Successfully.");
                    console.log("bvt-52 executed Successfully.");
                    isSuccess = true;
                    done();
                });
            });
        });
        //});

    });
    it('Test is executed In Adhoc from View Test Page.', function(done) {
        logout = false;
        var executeTestMap = {
           // VERSIONNAME : "Version 1.0",
            //CYCLENAME : "cycle one",
            TESTNAME : "IE-1",
            EXECUTEADHOC : "FAIL"
            //TESTDEFECT : "IE-3",
            //TESTCOMMENT : "comment"

        };
        /* zfjcloudNavigator.createTestWithSummary("Test is executed Directly In View Test Cycle.", function(getTestID){
         jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
         expect(navigateStatus).toBe.true;
         console.log("Navigated Successfully to Plan Test Cycle.");
         zfjcloudNavigator.addTestToCycle("Unscheduled", "cycle three", getTestID, function(addTestToCycleStatus) {
         expect(addTestToCycleStatus).toBe.true;
         console.log("Test is added to Cycle Successfully.");*/
        jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
            expect(navigateToSearchTestPageStatus).toBe.true;
            console.log("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.executeTestInAdHocFromViewTestPage(executeTestMap, function(executeTestStatus){
                expect(executeTestStatus).toBe.true;
                console.log("Test is Executed in view Issue Page Successfully.");
                console.log("bvt-55 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
        //});
        //});
    });
    /*it("Execute Test in Ad hoc Cycle From View test Page.", function(done){
        logout = false;
        //zfjcloudNavigator.createTestWithSummary("Execute Test in Ad hoc Cycle From View test Page.", function(getTestID){
            jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
                expect(navigateToSearchTestPageStatus).toBe.true;
                console.log("Navigated Successfully To Search Test Page.");
                zfjcloudNavigator.executeTestInAdhocInViewTestPage("IE-1", "FAIL", function(executeTestStatus){
                    expect(executeTestStatus).toBe.true;
                    console.log("Execute Test in Ad hoc Cycle From View test Page.");
                    console.log("bvt-46 executed Successfully.");
                    isSuccess = true;
                    done();
                });
            });
        //});

    });*/

    /*//bvt-1
     it('Addons is Uploaded Successfully.', function(done) {
         logout = true;
         console.log("Completed");
         done();
         *//*commUtil.waitForTitle("Log in", function(title){
             console.log("element visible : "+ title);
             console.log("Login Page loaded Successfully.");
             commUtil.waitForElement1("*//*//**//*[@id='login-form-username1']", 10000, function(flag){
                 console.log("element visible : "+ flag);
                 driver.findElement(By.xpath("*//*//**//*[@id='login-form-username']")).sendKeys("admin");
                 console.log("Username Given Successfully.");
                 done();
             });
         });*//*

     });*/
    //bvt-39
    it('Test Menus verified successfully.', function() {
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
    it('Test is Created Successfully.', function (done) {
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
    it('Create Test steps.', function (done) {
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
    it('Should able to edit and modify a test step.', function (done) {
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
    it('Should able to Clone a test Step after the selected row.', function (done) {
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
    it('Should able to Delete a Test step.', function (done) {
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
    it('Search test by id', function (done) {
        logout = true;
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
    it('Test is executed In Adhoc from View Test Page.', function(done) {
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
    it('Test is executed In Adhoc from View Test Page.', function(done) {
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
            TESTNAME : "GOOG-63",
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
        /*zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
         assert.ok(isCreateTest, "Not Created test.");
         zfjcloudNavigator.addSteps(createTestMap, function(isAddedStep) {
         assert.ok(isAddedStep);
         executeTestMap.TESTNAME = createTestMap.TESTNAME;*/
        logger.info("Test To Execute ID :"+executeTestMap.TESTNAME);
        jiraNavigator.navigateToPlanTestCyclePage(function(isNavigateToPlanTestCycle){
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
            logger.info("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
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
        //});
        //});
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
                    zfjcloudNavigator.addTestToCycle("Version 1.0", executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
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
                zfjcloudNavigator.addTestToCycle("Version 1.0", executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
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
                zfjcloudNavigator.addTestToCycle("Version 1.0", executeTestMap.CYCLENAME, createTestMap.TESTNAME, function(isAddedTestToCycle){
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
                expect(navigateToSearchTestPageStatus).toBe.true;
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
    it('Undock and run any pre-defined filter.', function () {
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
    it('Search Component from Simple Search.', function () {
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
    it('Should able to generate Access key and Secret Keys when Access key and Secret Keys are blank login first time', function () {
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
    it('validate Test Summary Links',function(done){
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
    it('validate 30 day Test Summary Charts',function(done){
        logout = true;
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

});
