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
                    jiraNavigator.selectProject(function (selectprojectStatus) {
                        assert.ok(selectprojectStatus, "Not Selected Project.");
                        console.log("Project is Selected Successfully.");

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
        console.log('after each of test.');
        driver.switchTo().defaultContent();
        driver.switchTo().defaultContent();
        var x = new Date();
        console.log("Time Starts : " + x);
        commUtil.actionClass().sendKeys(protractor.Key.CANCEL).perform();
        commUtil.actionClass().sendKeys(protractor.Key.CANCEL).perform();
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
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                zfjcloudNavigator.createTestCycle(createCycleMap1, function (isCreatedCycle) {
                    assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                    zfjcloudNavigator.createTestCycle(createCycleMap2, function (isCreatedCycle) {
                        assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                        console.log("Cycle Created Successfully.");
                        zfjcloudNavigator.createTestCycle(createCycleMap3, function (isCreatedCycle) {
                            assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                            console.log("Cycle Created Successfully.");
                            zfjcloudNavigator.createTestCycle(createCycleMap4, function (isCreatedCycle) {
                                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                                console.log("Cycle Created Successfully.");
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
    iit('Test is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 4.0",
            CYCLENAME: "cycle two",
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
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 6"
        };
       /* for(var j=1; j<=10; j++){
            (function(z) {
                var cycle = "cycle "+z;
                createCycleMap["CYCLENAME"] = cycle;

            })(j);
        }*/
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });



        /*zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
        assert.ok(isCreateTest, "Not Created test.");
        executeTestMap.TESTNAME = createTestMap.TESTNAME;
        console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.addTestToCycle("Version 1.0", executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                    console.log("Test is added to Cycle Successfully.");
                    zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest){
                    assert.ok(isCreateTest, "Not Created test.");
                    executeTestMap.TESTDEFECT = createTestMap.TESTNAME;
                    console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                            assert.ok(isExecutedTest, "Not Executed Test.");
                            console.log("Test is executed Directly Plan test Cycle Page.");
                            console.log("bvt-23 executed Successfully.");
                            isSuccess = true;
                            done();
                        });
                    });
                });
            });
        });
*/    });
    iit('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 4.0",
            CYCLENAME: "cycle two",
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
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 7"
        };
        /* for(var j=1; j<=10; j++){
         (function(z) {
         var cycle = "cycle "+z;
         createCycleMap["CYCLENAME"] = cycle;

         })(j);
         }*/
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
   });
    iit('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 4.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "WIP",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 8"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    iit('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 4.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "BLOCKED",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 9"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    iit('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 4.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "FAIL",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 10"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    iit('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 4.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 11"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });

    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 8.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 8.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 8.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 8.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 8.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 8.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 8.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 8.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });

    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 7.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 7.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 7.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 7.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 7.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 7.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 6.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 6.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 6.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 6.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 6.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 6.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });

    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 5.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 5.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 5.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 5.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 5.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
    it('Tests is executed With Defect.', function (done) {
        logout = false;
        var executeTestMap = {
            VERSIONNAME: "Version 5.0",
            CYCLENAME: "cycle two",
            TESTNAME: "",
            TESTSTATUS: "PASS",
            TESTDEFECT: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        var createTestMap1 = {
            ISSUETYPE: "Bug",
            SUMMARY : "Bug"
        };
        var createCycleMap = {
            VERSIONNAME: executeTestMap.VERSIONNAME,
            CYCLENAME: "cycle 5"
        };
        jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
            assert.ok(isNavigateToPlanTestCycle, "Not Navigated To Plan Test Cycle.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function (isCreatedCycle) {
                assert.ok(isCreatedCycle, "Not Created Cycle In Plan Cycle Page.");
                console.log("Cycle Created Successfully.");
                executeTestMap["CYCLENAME"] = createCycleMap.CYCLENAME;
                driver.switchTo().defaultContent();
                for(var i=1; i<=10; i++){
                    (function(x) {
                        var summary = "Summary "+x;

                        var createTestMap = {
                            ISSUETYPE: "Test",
                            SUMMARY: summary
                            //PRIORITY : "Minor"
                        };
                        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
                            assert.ok(isCreateTest, "Not Created test.");
                            executeTestMap.TESTNAME = createTestMap.TESTNAME;
                            console.log("Test To Execute ID :"+executeTestMap.TESTNAME);
                            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
                                assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                                console.log("Navigated Successfully to Plan Test Cycle.");
                                zfjcloudNavigator.addTestToCycle(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(isAddedTestToCycle){
                                    assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                                    console.log("Test is added to Cycle Successfully.");
                                    zfjcloudNavigator.createTestDirectly(createTestMap1, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        executeTestMap.TESTDEFECT = createTestMap1.TESTNAME;
                                        console.log("Test defect ID :"+executeTestMap.TESTDEFECT);
                                        zfjcloudNavigator.executeTestUsingE(executeTestMap, function (isExecutedTest) {
                                            assert.ok(isExecutedTest, "Not Executed Test.");
                                            console.log("Test is executed Directly Plan test Cycle Page.");
                                            console.log("bvt-23 executed Successfully.");
                                            if(x === 10){
                                                if(z === 10){
                                                    isSuccess = true;
                                                    done();
                                                }
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    })(i);
                }
            });
        });
    });
  });