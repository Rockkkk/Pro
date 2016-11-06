var commUtil = require('../utils/commUtil.js');

var zfjcloudNavigator = require('../zfjcloud/ZFJCloudNavigatorFactory.js').getInstance();
var jiraNavigator = require('../jira/JiraNavigatorFactory.js').getInstance();

var params = browser.params;
var isSuccess;
var logout;
beforeEach(function () {
    return  browser.ignoreSynchronization = true;
});

describe('ZFJ Cloud Testing For Plan Test Cycle', function() {

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
                    jiraNavigator.selectProject(function(selectprojectStatus){
                        assert.ok(selectprojectStatus, "Not Selected Project.");
                        console.log("Project is Selected Successfully.");

                    });
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


            //bvt-13
           /*it('Cycle is Created successfully.', function(done) {
                var createCycleMap = {
                    VERSIONNAME : "Unscheduled",
                    CYCLENAME : "mnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmn12",
                    DESCRIPTION : "cycle one description.",
                    BUILD : "build 1",
                    ENVIROMENT : "env",
                    STARTDATE : "2014-12-12",
                    ENDDATE : "2014-12-12"
                };

                jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
                    expect(navigateStatus).toBe.true;
                    console.log("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                        expect(createCycleStatus).toBe.true;
                        console.log("Cycle is Created Successfully.");
                        //zfjcloudNavigator.createTestCycle("Unscheduled", "cycle three", function(createCycleStatus){
                            //expect(createCycleStatus).toBe.true;
                            console.log("Cycle is Created Successfully.");
                            isSuccess = true;
                            logout = false;
                            done();
                        //});
                    });
                });

            });
*/    // Create test with minimum fields
    xit('Create Cycle with minimum field successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Version 1.0",
            CYCLENAME : "Create Cycle with Minimum fields."
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            assert.ok(navigateStatus, "Navigate to cycle not Successful.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle not Created");
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('Create Cycle with special chars in cycle name successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "!@#$%^&*()"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            assert.ok(navigateStatus, "Navigate to cycle not Successful.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle not Created");
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });
    });
    xit('Create Cycle with Alpha numeric chars in cycle name successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Zephyr 123"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            assert.ok(navigateStatus, "Navigate to cycle not Successful.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle( createCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle not Created");
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });
    });
    xit('Create Cycle with Numbers in cycle name successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "123456789"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            assert.ok(navigateStatus, "Navigate to cycle not Successful.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle not Created");
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });
    });
    xit('Create Cycle with Capital letters in cycle name successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "ZEPHYR"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            assert.ok(navigateStatus, "Navigate to cycle not Successful.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle not Created");
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });
    });
    xit('Create Cycle with 210 chars in cycle name successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            assert.ok(navigateStatus, "Navigate to cycle not Successful.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle not Created");
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });
    });
    // cricket match in chinese 板球比賽
    xit('Create Cycle with International chars in cycle name successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "板球比賽"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            assert.ok(navigateStatus, "Navigate to cycle not Successful.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle not Created");
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });
    });
    // cycle name in japanese
    xit('Create Cycle with spanning multiple months successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "match jangkrik",
            STARTDATE : "2014-12-12",
            ENDDATE : "2015-02-13"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            assert.ok(navigateStatus, "Navigate to cycle not Successful.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle not Created");
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });
    });
    xit('Create cycles with 1- day span successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "match jangkrik",
            STARTDATE : "2014-12-12",
            ENDDATE : "2015-12-13"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            assert.ok(navigateStatus, "Navigate to cycle not Successful.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle not Created");
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });
    });
    xit('Create Cycle with all fields successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Create Cycle with All Fields",
            DESCRIPTION : "description.",
            BUILD : "build 1",
            ENVIRONMENT : "env",
            STARTDATE : "2015-04-12",
            ENDDATE : "2015-04-12"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('Create Cycle with long description successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Create Cycle wit long description.",
            DESCRIPTION : "description description description description description description description description description description"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('Create a Cycle with description duplicate to another successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Create Cycle with duplicate desc",
            DESCRIPTION : "description."
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('create a Cycle with alphanumeric characters & spaces in the description successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Create Cycle with alphanumeric characters & spaces in the description",
            DESCRIPTION : "Appha 123"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });

    xit('create a Cycle with Special characters in the description successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Create Cycle with special characters in the description",
            DESCRIPTION : "!@#$%^&*()"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
/*    it('create a Cycle with International characters in the description successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Create Cycle with International characters in the description",
            DESCRIPTION : "match jangkrik"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });*/
    xit('create a Cycle with International characters in the description successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Create Cycle with International characters in the description",
            DESCRIPTION : "match jangkrik"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('create a Cycle with build duplicate to others successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Create Cycle with build duplicate to others",
            DESCRIPTION : "build duplicate to others",
            BUILD : "build 1"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('create a Cycle with alphanumeric characters & spaces in the build successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "create a Cycle with alphanumeric characters & spaces in the build",
            DESCRIPTION : "alphanumeric characters & spaces in the build",
            BUILD : "Zephyr 123"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('create a Cycle with only numbers in the build successfully.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "create a Cycle with only numbers in the build",
            DESCRIPTION : "create a Cycle with only numbers in the build",
            BUILD : "123456789"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('create a Cycle with Capital Letters in the build.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "create a Cycle with Capital Letters in the build.",
            DESCRIPTION : "Capital Letters in the build",
            BUILD : "ZEPHYR"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('Create a Cycle with special characters in the build.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Create a Cycle with special characters in the build.",
            DESCRIPTION : "special characters in the build",
            BUILD : "!@#$%^&*()"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('Create a Cycle with international characters in build.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Create a Cycle with international characters in build",
            DESCRIPTION : "international characters in build",
            BUILD : "match jangkrik"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    //
    xit('Create a Cycle with Environment duplicate to another.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Create a Cycle with Environment duplicate to another",
            DESCRIPTION : "Environment duplicate to another.",
            BUILD :"build 1",
            ENVIRONMENT : "env"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('create a Cycle with alphanumeric characters & spaces in Environment.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "create a Cycle with alphanumeric characters & spaces in Environment",
            DESCRIPTION : "alphanumeric characters & spaces in Environment",
            BUILD : "build 1",
            ENVIRONMENT : "zephyr 123"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('create a Cycle with special characters in Environment.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "create a Cycle with special characters in Environment",
            DESCRIPTION : "special characters in Environment",
            BUILD : "build 1",
            ENVIRONMENT : "!@#$%^&*()"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('Create a Cycle with international characters in Environment.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Create a Cycle with international characters in Enviroment",
            DESCRIPTION : "international characters in Enviroment",
            BUILD : "build 1",
            ENVIRONMENT : "match jangkrik"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('Create a Cycle with question marks ?? in cycle name/description/build/environment.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Create a Cycle with question marks ?? in cycle name/description/build/environment.",
            DESCRIPTION : "question marks ?? in cycle name/description/build/environment",
            BUILD : "build 1 ????",
            ENVIRONMENT : "env ????"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    xit('Create Cycle with only Start date and No End date.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Unscheduled",
            CYCLENAME : "Create Cycle with only Start date and No End date.",
            DESCRIPTION : "Create Cycle with only Start date and No End date.",
            BUILD : "build 1",
            ENVIRONMENT : "env",
            STARTDATE : "2014-12-12"
        };

        jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
            expect(navigateStatus).toBe.true;
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                expect(createCycleStatus).toBe.true;
                console.log("Cycle is Created Successfully.");
                isSuccess = true;
                logout = false;
                done();
            });
        });

    });
    // edit cycles
    xit('Edit Cycle and rename cycle name and save changes.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "cycle for rename cycle name"

        };
        var editCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "cycle for rename cycle name edited"
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
                    logout = false;
                    done();
                });
            });

        });
    });
    xit('Edit Cycle and modify Cycle Description and save Changes.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "cycle for modify description.",
            DESCRIPTION : "cycle for modify description."

        };
        var editCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "cycle with modified description.",
            DESCRIPTION : "cycle for modify description edited."
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
                    console.log("bvt-28 executed Successfully.");
                    isSuccess = true;
                    logout = false;
                    done();
                });
            });
        });
    });
    xit('Edit Cycle and modify build and save changes.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "cycle for modify build.",
            DESCRIPTION : "description.",
            BUILD : "build 1"
        };
        var editCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "cycle with modified build.",
            BUILD : "build 1 edit"
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
                    console.log("bvt-28 executed Successfully.");
                    isSuccess = true;
                    logout = false;
                    done();
                });
            });
        });
    });
    xit('Edit Cycle and modify Environment and save changes.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "cycle for modify environment.",
            DESCRIPTION : "description.",
            BUILD : "build 1",
            ENVIRONMENT : "environment"
        };
        var editCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "cycle with modified environment.",
            ENVIRONMENT : "environment edited"
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
                    console.log("bvt-28 executed Successfully.");
                    isSuccess = true;
                    logout = false;
                    done();
                });
            });
        });
    });
    xit('Edit Cycle and modify Start Date.', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "cycle for modify start date.",
            DESCRIPTION : "description.",
            BUILD : "build 1",
            ENVIRONMENT : "environment",
            STARTDATE : "2014-12-12"
        };
        var editCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "cycle with modified start date.",
            STARTDATE : "2014-12-13"
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
                    console.log("bvt-28 executed Successfully.");
                    isSuccess = true;
                    logout = false;
                    done();
                });
            });
        });
    });
    xit('Edit Cycle and modify End date', function(done) {
        var createCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "cycle for modify end date.",
            DESCRIPTION : "description.",
            BUILD : "build 1",
            ENVIRONMENT : "environment",
            STARTDATE : "2014-12-12",
            ENDDATE : "2014-12-12"
        };
        var editCycleMap = {
            VERSIONNAME : "Version 2.0",
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
                    console.log("bvt-28 executed Successfully.");
                    isSuccess = true;
                    logout = false;
                    done();
                });
            });
        });
    });
    // Add Test To Cycle
    xit('Add Test To Cycle Successfully.', function(done) {
        var executeTestMap = {
            VERSIONNAME: "Version 1.0",
            CYCLENAME: "cycle one",
            TESTNAME: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function (isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            executeTestMap["TESTNAME"]=createTestMap.TESTNAME;
            jiraNavigator.navigateToPlanTestCyclePage(function (isNavigateToPlanTestCycle) {
             assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
             console.log("Navigated Successfully to Plan Test Cycle.");
             zfjcloudNavigator.addTestToCycle(executeTestMap, function (isAddedTestToCycle) {
                assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                    console.log("Test is added to Cycle Successfully.");
                    isSuccess = true;
                    done();
                });
             });
        });

        /*zfjcloudNavigator.createTestWithSummary("Test To Add To Cycle.", function(getTestID){
            jiraNavigator.navigateToPlanTestCyclePage(function(navigateStatus){
                expect(navigateStatus).toBe.true;
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.addTestToCycle("Version 1.0", "cycle one", getTestID, function(addTestToCycleStatus){
                    expect(addTestToCycleStatus).toBe.true;
                    console.log("Test is added to Cycle Successfully.");
                    isSuccess = true;
                    logout = false;
                    done();
                });
            });
        });*/
    });
    //Clone Cycle

    xit('Clone a Cycle with No Tests added ', function(done) {
        var createCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME: "Clone a Cycle with No Tests added."
        };
        var cloneCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME: "Clone a Cycle with No Tests added."
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
                    logout = false;
                    done();
                });
            });
        });
    });
    xit('Clone a cycle and change Cycle name ', function(done) {
        var createCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME: "Clone a cycle and change Cycle name."
        };
        var cloneCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME: "Cloned the cycle and changed the Cycle name"
        };
        /*var cloneCycleMap = {
         VERSIONNAME : "Version 3.0",
         CYCLENAME : "Clone a cycle and change Cycle name ",
         CLONECYCLENAME : "Cloned the cycle and changed the Cycle name ",
         TYPE : "change"
         };*/
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
                    logout = false;
                    done();
                });
            });
        });
    });
    xit('Clone a Cycle with long Cycle name', function(done) {
        var createCycleMap = {
            VERSIONNAME: "Version 3.0",
            CYCLENAME: "Clone a Cycle with long Cycle name Clone a Cycle with long Cycle name Clone a Cycle with long Cycle name Clone a Cycle with long Cycle name Clone a Cycle with long Cycle name"
        };
        var cloneCycleMap = {
            VERSIONNAME: "Version 3.0",
            CYCLENAME: "Clone a Cycle with long Cycle name Clone a Cycle with long Cycle name Clone a Cycle with long Cycle name Clone a Cycle with long Cycle name Clone a Cycle with long Cycle name"
        };
        /*var cloneCycleMap = {
         VERSIONNAME : "Version 3.0",
         CYCLENAME : "Clone a Cycle with long Cycle name Clone a Cycle with long Cycle name Clone a Cycle with long Cycle name Clone a Cycle with long Cycle name Clone a Cycle with long Cycle name",
         TYPE : "default"
         };*/
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
            assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(cloneCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle Not Created.");
                console.log("Cycle is Created Successfully.");
                zfjcloudNavigator.cloneCycle(createCycleMap, cloneCycleMap, function(cloneCycleStatus){
                    assert.ok(cloneCycleStatus, "Cycle not Cloned.");
                    console.log("Cycle is Cloned Successfully.");
                    isSuccess = true;
                    logout = false;
                    done();
                });
            });
        });
    });
    xit('Clone Cycle with all fields filled in cycle headers (Name,Description,Build,Env,From/To dates)', function(done) {
        var createCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME : "Clone Cycle with all fields filled in cycle headers",
            DESCRIPTION : "cycle description.",
            BUILD : "build 1",
            ENVIRONMENT : "env"
        };
        var cloneCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME : "Clone Cycle with all fields filled in cycle headers",
            DESCRIPTION : "cycle description.",
            BUILD : "build 1",
            ENVIRONMENT : "env"
        };
        /* var cloneCycleMap = {
         VERSIONNAME : "Version 3.0",
         CYCLENAME : "Clone Cycle with all fields filled in cycle headers",
         DESCRIPTION : "cycle description.",
         BUILD : "build 1",
         ENVIROMENT : "env",
         //STARTDATE : "2014-12-25",
         //ENDDATE : "2014-12-26",
         //CLONECYCLENAME : "cloned cycle for clone without test",
         TYPE : "default"
         };*/
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
            assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle Not Created.");
                console.log("Cycle Created Successfully.");
                zfjcloudNavigator.cloneCycle(createCycleMap, cloneCycleMap, function(cloneCycleStatus){
                    assert.ok(cloneCycleStatus, "Cycle not Cloned.");
                    console.log("Cycle is Cloned Successfully.");
                    isSuccess = true;
                    logout = false;
                    done();
                });
            });
        });
    });
    xit('Clone a Cycle with one test scheduled have no teststeps.', function(done) {
        var createCycleMap = {
            VERSIONNAME: "Version 3.0",
            CYCLENAME : "Clone a Cycle with one test scheduled have no teststeps"
        };
        var cloneCycleMap = {
            VERSIONNAME: "Version 3.0",
            CYCLENAME : "Clone a Cycle with one test scheduled have no teststeps"
        };

        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Clone a Cycle with one test scheduled have no teststeps"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function (isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");

            jiraNavigator.navigateToPlanTestCyclePage(function (navigateToPlanCycleStatus) {
                assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.createTestCycle(createCycleMap, function (createCycleStatus) {
                    assert.ok(createCycleStatus, "Cycle Not Created.");
                    console.log("Cycle Created Successfully.");
                    createCycleMap.TESTNAME = createTestMap.TESTNAME;
                    zfjcloudNavigator.addTestToCycle(createCycleMap, function (addTestToCycleStatus) {
                        assert.ok(addTestToCycleStatus, "Test Not Added To Cycle.");
                        console.log("Test is added to Cycle Successfully.");
                        zfjcloudNavigator.cloneCycle(createCycleMap, cloneCycleMap, function (cloneCycleStatus) {
                            assert.ok(cloneCycleStatus, "Cycle not Cloned.");
                            console.log("Cycle is Cloned Successfully.");
                            isSuccess = true;
                            logout = false;
                            done();
                        });
                    });
                });
            });
        });
    });
    xit('Clone a Cycle with one test scheduled have teststeps.', function(done) {
        var cloneCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME : "Clone a Cycle with one test scheduled have teststeps."
        };
        var executeTestMap = {
            VERSIONNAME: cloneCycleMap.VERSIONNAME,
            CYCLENAME: "cycle one",
            TESTNAME: ""
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Clone a Cycle with one test scheduled have teststeps."
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function (isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            zfjcloudNavigator.addSteps(createTestMap, function (isAddedStep) {
                assert.ok(isAddedStep);
                cloneCycleMap.TESTNAME = createTestMap.TESTNAME;
                jiraNavigator.navigateToPlanTestCyclePage(function (navigateToPlanCycleStatus) {
                    assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
                    console.log("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.createTestCycle(cloneCycleMap, function (createCycleStatus) {
                        assert.ok(createCycleStatus, "Cycle Not Created.");
                        console.log("Cycle Created Successfully.");
                        zfjcloudNavigator.addTestToCycle(cloneCycleMap, function (addTestToCycleStatus) {
                            assert.ok(addTestToCycleStatus, "Test Not Added To Cycle.");
                            console.log("Test is added to Cycle Successfully.");
                            zfjcloudNavigator.cloneCycle(cloneCycleMap, cloneCycleMap, function (cloneCycleStatus) {
                                assert.ok(cloneCycleStatus, "Cycle not Cloned.");
                                console.log("Cycle is Cloned Successfully.");
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
    xit("Clone a Cycle with tests executed (execute testcases but steps doesn't matter)", function(done) {
        var createCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME : "Clone a Cycle with tests executed (execute testcases but steps does not matter"
        };
        var cloneCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME : "Clone a Cycle with tests executed (execute testcases but steps does not matter"
        };
        /*var cloneCycleMap = {
         VERSIONNAME : "Version 3.0",
         CYCLENAME : "Clone a Cycle with tests executed (execute testcases but steps does not matter)",
         TYPE : "default"
         };*/
        /*var executeTestMap = {
         VERSIONNAME: "Version 1.0",
         CYCLENAME: "cycle one",
         TESTNAME: "",
         TESTSTATUS: "FAIL"
         };*/
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            createCycleMap.TESTNAME = createTestMap.TESTNAME;
            // zfjcloudNavigator.createTestWithTestStep("Clone a Cycle with one test scheduled have teststeps", function(getTestID){
            jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
                assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                    assert.ok(createCycleStatus, "Cycle Not Created.");
                    console.log("Cycle Created Successfully.");
                    zfjcloudNavigator.addTestToCycle(createCycleMap, function(addTestToCycleStatus) {
                        assert.ok(addTestToCycleStatus, "Test Not Added To Cycle.");
                        console.log("Test is added to Cycle Successfully.");
                        createCycleMap.TESTSTATUS = "FAIL";
                        zfjcloudNavigator.executeTestUsingE(createCycleMap, function(executeTestStatus) {
                            assert.ok(executeTestStatus, "Test is not executed.");
                            console.log("Test is Executed to Default Status in Cycle Successfully.");
                            zfjcloudNavigator.cloneCycle(createCycleMap, cloneCycleMap, function(cloneCycleStatus){
                                assert.ok(cloneCycleStatus, "Cycle not Cloned.");
                                console.log("Cycle is Cloned Successfully.");
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
    xit('Clone a cycle Multiple times.', function(done) {
        var createCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME : "Clone a cycle Multiple times."
        };
        var cloneCycleMap = {
            VERSIONNAME: "Version 2.0",
            CYCLENAME : "Cloned the cycle 1st time."
        };
        /*var cloneCycleMap = {
         CYCLENAME : "Clone a cycle Multiple times.",
         CLONECYCLENAME : "Clone a cycle Multiple times.",
         TYPE : "change"
         };*/
        jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
            assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
            console.log("Navigated Successfully to Plan Test Cycle.");
            zfjcloudNavigator.createTestCycle(createCycleMap, function(createCycleStatus){
                assert.ok(createCycleStatus, "Cycle Not Created.");
                console.log("Cycle is Created Successfully.");

                //cloneCycleMap["CYCLENAME"] = "Clone a cycle Multiple times.";
                //cloneCycleMap["CLONECYCLENAME"] = "Cloned the cycle 1st time.";
                zfjcloudNavigator.cloneCycle(createCycleMap, cloneCycleMap, function(cloneCycleStatus){
                    assert.ok(cloneCycleStatus, "Cycle not Cloned.");
                    console.log("Cycle is Cloned Successfully.");
                    //createCycleMap["CYCLENAME"] = "Clone a cycle Multiple times.";
                    cloneCycleMap["CYCLENAME"] = "Cloned the cycle 2nd time.";
                    zfjcloudNavigator.cloneCycle(createCycleMap, cloneCycleMap, function(cloneCycleStatus){
                        assert.ok(cloneCycleStatus, "Cycle not Cloned.");
                        console.log("Cycle is Cloned Successfully.");
                        isSuccess = true;
                        logout = false;
                        done();
                    });
                });
                /*for (var i = 1 ; i <= 2; i++){
                 (function(x){
                 console.log("========"+x);
                 console.log("========"+i);
                 cloneCycleMap["CYCLENAME"] = "Clone a cycle Multiple times.";
                 cloneCycleMap["CLONECYCLENAME"] = "Cloned the cycle "+x+" times.";
                 zfjcloudNavigator.cloneCycle("Version 3.0", cloneCycleMap, function(cloneCycleStatus){
                 assert.ok(cloneCycleStatus, "Cycle not Cloned.");
                 console.log("Cycle is Cloned Successfully.");
                 isSuccess = true;
                 logout = false;
                 done();
                 });

                 })(i);

                 }*/

            });
        });
    });
    //Delete Cycle
    xit('Delete a Cycle with No Tests added ', function(done) {
        var deleteCycleMap = {
            VERSIONNAME : "Version 2.0",
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
                    logout = false;
                    done();
                });
            });
        });
    });
    xit('Delete cycle with long cycle name', function(done) {
        var deleteCycleMap = {
            VERSIONNAME : "Version 3.0",
            CYCLENAME : "Delete cycle with long cycle name Delete cycle with long cycle name Delete cycle with long cycle name Delete cycle with long cycle name Delete cycle with long cycle name"
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
                    logout = false;
                    done();
                });
            });
        });
    });

    xit('Delete a Cycle with one test scheduled ', function(done) {
        var deleteCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "Delete a Cycle with one test scheduled"
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Test one."
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            deleteCycleMap.TESTNAME = createTestMap.TESTNAME;
            //zfjcloudNavigator.createTestWithSummary("Delete a Cycle with one test scheduled", function(getTestID){
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
    xit('Delete cycle, with tests executed to any status', function(done) {
        var deleteCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "Delete cycle, with tests executed to any status"
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Delete cycle, with tests executed to any status"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            //zfjcloudNavigator.createTestWithSummary("Delete cycle, with tests executed", function(getTestID){
            jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
                assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.createTestCycle(deleteCycleMap, function(createCycleStatus){
                    assert.ok(createCycleStatus, "Cycle Not Created.");
                    console.log("Cycle is Created Successfully.");
                    deleteCycleMap["TESTNAME"] = createTestMap.TESTNAME;
                    deleteCycleMap["TESTSTATUS"] = "FAIL";
                    zfjcloudNavigator.addTestToCycle(deleteCycleMap, function(addTestToCycleStatus) {
                        assert.ok(addTestToCycleStatus, "Test Not Added To Cycle.");
                        console.log("Test is added to Cycle Successfully.");
                        zfjcloudNavigator.executeTestUsingE(deleteCycleMap, function(executeTestStatus) {
                            assert.ok(executeTestStatus, "Not Executed Test.");
                            console.log("Test is Executed to Default Status in Cycle Successfully.");
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
    });
    xit('Delete cycle, with tests executed to New status', function(done) {
        var deleteCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "Delete cycle, with tests executed to New status"
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Delete cycle, with tests executed to New status"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            deleteCycleMap["TESTNAME"] = createTestMap.TESTNAME;
            deleteCycleMap["TESTSTATUS"] = "INVALID";

            //zfjcloudNavigator.createTestWithSummary("Delete cycle, with tests executed", function(getTestID){
            jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
                assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.createTestCycle(deleteCycleMap, function(createCycleStatus){
                    assert.ok(createCycleStatus, "Cycle Not Created.");
                    console.log("Cycle is Created Successfully.");
                    zfjcloudNavigator.addTestToCycle(deleteCycleMap, function(addTestToCycleStatus) {
                        assert.ok(addTestToCycleStatus, "Test Not Added To Cycle.");
                        console.log("Test is added to Cycle Successfully.");
                        zfjcloudNavigator.executeTestUsingE(deleteCycleMap, function(executeTestStatus) {
                            assert.ok(executeTestStatus, "Not Executed Test.");
                            console.log("Test is Executed to Default Status in Cycle Successfully.");
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
    });
    xit('Delete cycle, have test executed with one or more defects associated ', function(done) {
        var deleteCycleMap = {
            VERSIONNAME : "Version 2.0",
            CYCLENAME : "Delete cycle, have test executed with one or more defects associated.",
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
            SUMMARY : "Delete cycle, with tests executed to New status."
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            zfjcloudNavigator.addSteps(createTestMap, function (isAddedStep) {
                assert.ok(isAddedStep);
                deleteCycleMap.TESTNAME = createTestMap.TESTNAME;
                logger.info("Test To Execute ID :" + deleteCycleMap.TESTNAME);
                jiraNavigator.navigateToPlanTestCyclePage(function(isNavigateToPlanTestCycle) {
                    assert.ok(isNavigateToPlanTestCycle, "Not Navigated To plan Test cycle");
                    logger.info("Navigated Successfully to Plan Test Cycle.");
                    zfjcloudNavigator.createTestCycle(deleteCycleMap, function(createCycleStatus) {
                        assert.ok(createCycleStatus, "Cycle Not Created.");
                        console.log("Cycle is Created Successfully.");
                        zfjcloudNavigator.addTestToCycle(deleteCycleMap, function(isAddedTestToCycle) {
                            assert.ok(isAddedTestToCycle, "Not Added Test To cycle.");
                            logger.info("Test is added to Cycle Successfully.");
                            zfjcloudNavigator.executeTestUsingE(deleteCycleMap, function(isExecutedTest){
                                assert.ok(isExecutedTest, "Not Executed Test.");
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
        });
        /*zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
         assert.ok(isCreateTest, "Not Created test.");
         deleteCycleMap["TESTNAME"] = createTestMap.TESTNAME;
         deleteCycleMap["TESTSTATUS"] = "INVALID";
         //zfjcloudNavigator.createTestWithSummary("Delete cycle, have test executed with one or more defects associated", function(getTestID){
         zfjcloudNavigator.createTestWithSummary(createTestMap, function(attachDefectID) {
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

    xit('Delete cycle, have tests scheduled with same summary and same defects associated', function(done) {
        var deleteCycleMap = {
            CYCLENAME : "Delete cycle, have tests scheduled with same summary and same defects associated"
        };
        zfjcloudNavigator.createTestWithSummary("Delete cycle, have tests scheduled with same summary and same defects associated", function(getTestID){
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
        });
    });
    xit('Delete cycle, have tests with long summary', function(done) {
        var deleteCycleMap = {
            CYCLENAME : "Delete cycle, have tests with long summary"
        };
        zfjcloudNavigator.createTestWithSummary("Delete cycle, have tests with long summaryDelete cycle, have tests with long summaryDelete cycle, have tests with long summaryDelete cycle, have tests with long summary", function(getTestID){
            jiraNavigator.navigateToPlanTestCyclePage(function(navigateToPlanCycleStatus){
                assert.ok(navigateToPlanCycleStatus, "Not Navigated to Plan Cycle Page.");
                console.log("Navigated Successfully to Plan Test Cycle.");
                zfjcloudNavigator.createTestCycle("Version 3.0", deleteCycleMap, function(createCycleStatus){
                    assert.ok(createCycleStatus, "Cycle Not Created.");
                    console.log("Cycle is Created Successfully.");
                    zfjcloudNavigator.addTestToCycle("Version 3.0", deleteCycleMap.CYCLENAME, getTestID, function(addTestToCycleStatus) {
                        assert.ok(addTestToCycleStatus, "Test Not Added To Cycle.");
                        console.log("Test is added to Cycle Successfully.");
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
    xit('Delete cycle, have Tests and test steps executed to same status', function(done) {
        var deleteCycleMap = {
            CYCLENAME : "Delete cycle, have Tests and test steps executed to same status"
        };
        zfjcloudNavigator.createTestWithTestStep("Delete cycle, have Tests and test steps executed to same status", function(getTestID){
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
        zfjcloudNavigator.createTestWithTestStep("Delete cycle, have Tests and test steps executed to different statuses", function(getTestID){
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
            VERSIONNAME: "Version 3.0",
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

    it('Add Test From Cycle Successfully.', function(done) {
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
    it('Delete Test From Cycle Successfully.', function(done) {
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

});