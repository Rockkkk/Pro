var commUtil = require('../utils/commUtil.js');

var zfjcloudNavigator = require('../zfjcloud/ZFJCloudNavigatorFactory.js').getInstance();
var jiraNavigator = require('../jira/JiraNavigatorFactory.js').getInstance();

var params = browser.params;
var isSuccess;
var logout;
var editStepTest;
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
    /**
     * Create a Test using "Tests" menu with minimum required fields
     */
    it('Create a Test using Tests menu with minimum required fields', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Create a Test using Tests menu with minimum required fields"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a Test using Tests menu with minimum required fields Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Create a Test using "Tests" menu with all fields filled-in (optional)
     */
    it('Create a Test using Tests menu with all fields filled-in (optional)', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Create a Test using Tests menu with all fields filled-in (optional)",
            PRIORITY: browser.params.testdata.priority2,
            COMPONENT: browser.params.testdata.component1,
            AFFECTEDVERSION: "Version 1.0",
            FIXVERSION: "Version 2.0",
            ENVIRONMENT: "Env",
            DESCRIPTION: "testing angry bird against Android os",
            LABEL: "jellybean"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a Test using Tests menu with all fields filled-in (optional) Successfully.");
                isSuccess = true;
                done();
            });
        });

    });
    /**
     * Create a test have summary in UPPER case and view issue details
     */
    it('Create a test have summary in UPPER case and view issue details', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "ZEPHYR TEST"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a test have summary in UPPER case and view issue details Successfully.");
                isSuccess = true;
                done();
            });
        });

    });
    /**
     * Create a test have summary in lower case
     */
    it('Create a test have summary in lower case', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "create a test have summary in lower case"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a test have summary in lower case Successfully.");
                isSuccess = true;
                done();
            });
        });

    });
    /**
     * Create a test have summary in numeric characters
     */
    it('Create a test have summary in numeric characters', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "1234567890"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a test have summary in numeric characters Successfully.");
                isSuccess = true;
                done();
            });
        });

    });
    /**
     * Create a test have summary in alpha numeric characters and spaces
     */
    it('Create a test have summary in alpha numeric characters and spaces', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Zephyr 123456"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a test have summary in alpha numeric characters and spaces Successfully.");
                isSuccess = true;
                done();
            });
        });

    });
    /**
     * Create a test have summary in special characters
     */
    it('Create a test have summary in special characters', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "*(*#@#*)*"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a test have summary in special characters Successfully.");
                isSuccess = true;
                done();
            });
        });

    });
    /**
     * Create a test have summary in international characters(mi prueba - my test)
     */
    it('Create a test have summary in international characters', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "mi prueba"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a test have summary in international characters Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Create a test have summary with min. required chars (atleast 1 or 2)
     */
    it('Create a test have summary with min. required chars atleast 1 or 2', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "me"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a test have summary with min. required chars (atleast 1 or 2) Successfully.");
                isSuccess = true;
                done();
            });
        });

    });
    /**
     * Create a test with long summary have 255 characters
     */
    it('Create a test with long summary have 255 characters', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Long "
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a test with long summary have 255 characters Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Create a Test with long Environment
     */
    it('Create a Test with long Environment', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Create a Test with long Environment",
            ENVIRONMENT: "Long Environment"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a Test with long Environment Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Create a Test with long Description
     */
    it('Create a Test with long Description', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Create a Test with long Description",
            DESCRIPTION: "Long description"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a Test with long Description Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Create Test with a Label associated
     */
    it('Create Test with a Label associated', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Create Test with a Label associated",
            LABEL: "browser"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a Test with a Label associated Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Create test with Label duplicate to another label have only change in First char
     */
    it('Create test with Label duplicate to another label have only change in First char', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Create test with Label duplicate to another label have only change in First char",
            LABEL: "Browser"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created test with Label duplicate to another label have only change in First char Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Create test with numbers in Label
     */
    it('Create test with numbers in Label ', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Create test with numbers in Label",
            LABEL: "123456"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created test with numbers in Label Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Create test with alpha numeric charcters in Label (ex: Asgb-39)
     */
    it('Create test with alpha numeric characters in Label', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Create a test with alpha numeric charcters in Label",
            LABEL: "Asgb-39"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a Test with alpha numeric charcters in Label Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Create test with a long label
     */
    it('Create test with a long label', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Create test with a long label",
            LABEL: "LongLebel"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created a Test with a Long Label Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     *Create Test with multiple Labels associated (>1)
     */
    it('Create Test with multiple Labels associated more than 1.', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Create Test with multiple Labels associated (>1)",
            LABEL: ["jellybean", "123"]
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created Test with multiple Labels associated (>1) Successfully.");
                isSuccess = true;
                done();
            });
        });

    });
    /**
     *Create a Test with multiple Affects Versions associated more than >1
     */
    it('Create a Test with multiple Affects Versions associated more than 1.', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Create Test with multiple Labels associated (>1)",
            AFFECTEDVERSION: ["Version 1.0","Version 2.0"]
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Created Test with multiple Labels associated (>1) Successfully.");
                isSuccess = true;
                done();
            });
        });

    });
    /**
     *Create a Test with multiple Fix Versions associated more than >1 (atleast 5)
     */
    it('Create a Test with multiple Fix Versions associated more than 1 (atleast 5).', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Create a Test with multiple Fix Versions associated more than >1 (atleast 5)",
            FIXVERSION: ["Version 1.0","Version 2.0"]
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Create a Test with multiple Fix Versions associated more than >1 (atleast 5) Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    xit('Create a Test with multiple Fix Versions associated more than 1 (atleast 5).', function (done) {
        logout = false;
        var createTestMap = {
            SUMMARY: "Create a Test with multiple Fix Versions associated more than >1 (atleast 5)",
            DESCRIPTION: "testing angry bird against Android os",
            ATTACHMENT: "upload.png"
        };
        jiraNavigator.navigateToCreateTestPage(function (isNavigateStatus) {
            assert.ok(isNavigateStatus, "Not Navigated To create Test Page.");
            console.log("Create Test Page Validated Successfully.");
            zfjcloudNavigator.createTest(createTestMap, function (isCreatedTest) {
                assert.ok(isCreatedTest, "Not created Test.");
                console.log("Create a Test with multiple Fix Versions associated more than >1 (atleast 5) Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Add Teststep to a Test, in View issue page/under Test Details section
     */
    it('Add test step to a Test, in View issue page under Test Details section', function (done) {
        logout = false;
        var testStepMap = [];
        testStepMap.push({
            step: 'test step 1',
            data: 'test data 1',
            result: 'test result 1'
        });

        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            expect(navigateToSearchTestPageStatus).toBe.true;
            console.log("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.addTeststepsToTest(testStepMap, function (executeTestStatus) {
                expect(executeTestStatus).toBe.true;
                console.log("Added Step To Test Successfully.");
                console.log("bvt-8 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     *Add Test step with Blank Body(No Content)
     */
    it('Add Test step with Blank Body(No Content)', function (done) {
        logout = false;
        var testStepMap = [];
        testStepMap.push({
            step: '',
            data: '',
            result: ''
        });

        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            expect(navigateToSearchTestPageStatus).toBe.true;
            console.log("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.addTeststepsToTest(testStepMap, function (executeTestStatus) {
                expect(executeTestStatus).toBe.true;
                console.log("Added Step To Test Successfully.");
                console.log("bvt-8 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     *Add Test step with special Characters to Test
     */
    it('Add Test step with special Characters to Test', function (done) {
        logout = false;
        var testStepMap = [];
        testStepMap.push({
            step: '!@#',
            data: '$%^',
            result: '(*)'
        });

        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            expect(navigateToSearchTestPageStatus).toBe.true;
            console.log("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.addTeststepsToTest(testStepMap, function (executeTestStatus) {
                expect(executeTestStatus).toBe.true;
                console.log("Added Step To Test Successfully.");
                console.log("bvt-8 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     *Add Test step with International Characters(mi prueba - my test)
     */
    it('Add Test step with International Characters', function (done) {
        logout = false;
        var testStepMap = [];
        testStepMap.push({
            step: 'mi prueba',
            data: 'mi prueba',
            result: 'mi prueba'
        });

        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            expect(navigateToSearchTestPageStatus).toBe.true;
            console.log("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.addTeststepsToTest(testStepMap, function (executeTestStatus) {
                expect(executeTestStatus).toBe.true;
                console.log("Added Step To Test Successfully.");
                console.log("bvt-8 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     *Add Test step with a link (example.. http://www.getzephyr.com) in teststeps, test data and expected results
     */
    it('Add Test step with a link in test steps, test data and expected results', function (done) {
        logout = false;
        var testStepMap = [];
        testStepMap.push({
            step: '[http://www.getzephyr.com]',
            data: '[http://www.getzephyr.com]',
            result: '[http://www.getzephyr.com]'
        });

        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            expect(navigateToSearchTestPageStatus).toBe.true;
            console.log("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.addTeststepsToTest(testStepMap, function (executeTestStatus) {
                expect(executeTestStatus).toBe.true;
                console.log("Added Step To Test Successfully.");
                console.log("bvt-8 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     *Add Test step with tags <> in test steps, test data and expected results
     */
    it('Add Test step with tags in test steps, test data and expected results', function (done) {
        logout = false;
        var testStepMap = [];
        testStepMap.push({
            step: "<zephyr>",
            data: "<zephyr>",
            result: "<zephyr>"
        });

        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            expect(navigateToSearchTestPageStatus).toBe.true;
            console.log("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.addTeststepsToTest(testStepMap, function (executeTestStatus) {
                expect(executeTestStatus).toBe.true;
                console.log("Added Step To Test Successfully.");
                console.log("bvt-8 executed Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     *Add Test step with question marks ?? in test steps, test data and expected results
     */
    it('Add Test step with question marks Question marks in test steps, test data and expected results', function (done) {
        logout = false;
        var testStepMap = [];
        testStepMap.push({
            step: '??zephyr??',
            data: '??zephyr??',
            result: '??zephyr??'
        });

        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            expect(navigateToSearchTestPageStatus).toBe.true;
            console.log("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.addTeststepsToTest(testStepMap, function (executeTestStatus) {
                expect(executeTestStatus).toBe.true;
                console.log("Added Step To Test Successfully.");
                console.log("Added Step with ?? Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     *Add a long Test step >1028 chars to Test  in teststeps, test data and expected results
     */
    it('Add a long Test step more than 1028 chars to Test  in test steps, test data and expected (results)', function (done) {
        logout = true;
        var testStepMap = [];
        testStepMap.push({
            step: "|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890\1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123",
            data: "|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890\1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123",
            result: "|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890\1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890|1234567890123"
        });

        jiraNavigator.navigateToSearchTestPage(function (navigateToSearchTestPageStatus) {
            expect(navigateToSearchTestPageStatus).toBe.true;
            console.log("Navigated Successfully To Search Test Page.");
            zfjcloudNavigator.addTeststepsToTest(testStepMap, function (executeTestStatus) {
                expect(executeTestStatus).toBe.true;
                console.log("Added Step To Test Successfully.");
                console.log("Added Step with ?? Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    //Update Steps
    /**
     * Edit test step and Cancel the Changes
     */
    it('Edit test step and Cancel the Changes', function (done) {
        logout = false;
        var editStepMap = {
            STEP : "Step edited",
            DATA : "Data edited",
            RESULT : "Res edited",
            STEPNUM : "1",
            CANCEL : "true"
        };
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY : "Test For Edit Step",
            STEPSTOCREATE : 5
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function(isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            editStepMap["TESTNAME"] = createTestMap.TESTNAME;
            zfjcloudNavigator.addSteps(createTestMap, function(isAddedStep) {
                assert.ok(isAddedStep, "Not Create Step.");
                zfjcloudNavigator.editTestStep(editStepMap, function(stepEditStatus){
                    assert.ok(stepEditStatus, "Not Edited Step");
                    console.log("Step Edited Successfully.");
                    editStepTest = createTestMap;
                    isSuccess = true;
                    done();
                });
            });
        });
    });
    /**
     * Edit test step and Update teststeps, test data and expected results
     */
    it('Edit test step and Update teststeps, test data and expected results', function (done) {
        logout = false;
        var editStepMap = {
            STEP : "Step edited",
            DATA : "Data edited",
            RESULT : "Res edited",
            STEPNUM : "1"
        };
        var createTestMap = editStepTest;
        editStepMap["TESTNAME"] = createTestMap.TESTNAME;
        zfjcloudNavigator.quickSearchById(createTestMap, function (isSearched) {
            assert.ok(isSearched, "Not searched Test.");
            console.log("Test Searched Successfully.");
            zfjcloudNavigator.editTestStep(editStepMap, function(stepEditStatus){
                assert.ok(stepEditStatus, "Not Edited Step");
                console.log("Step Edited Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Edit test step and Update teststeps, test data and expected result with no content.
     */
    it('Edit test step and Update teststeps, test data and expected result with no content.', function (done) {
        logout = false;
        var editStepMap = {
            STEP : "",
            DATA : "",
            RESULT : "",
            STEPNUM : "2"
        };
        var createTestMap = editStepTest;
        editStepMap["TESTNAME"] = createTestMap.TESTNAME;
        zfjcloudNavigator.quickSearchById(createTestMap, function (isSearched) {
            assert.ok(isSearched, "Not searched Test.");
            console.log("Test Searched Successfully.");
            zfjcloudNavigator.editTestStep(editStepMap, function(stepEditStatus){
                assert.ok(stepEditStatus, "Not Edited Step");
                console.log("Step Edited Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     * Append Test by adding few more teststeps in view issue page
     */
    it('Apend Test by adding few more teststeps in view issue page', function (done) {
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
        var createTestMap = editStepTest;
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
    /**
     * Delete a teststep if Test has only one 1-test step created
     */
    it('Delete a teststep if Test has only one 1-test step created', function (done) {
        logout = false;
        var testStepMap = [];
        testStepMap.push({
            step: 'test step 1',
            data: 'test data 1',
            result: 'test result 1'
        });

        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Delete a teststep if Test has only one 1-test step created"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function (isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
                expect(navigateToSearchTestPageStatus).toBe.true;
                console.log("Navigated Successfully To Search Test Page.");
                zfjcloudNavigator.addTeststepsToTest(testStepMap, function(executeTestStatus){
                    expect(executeTestStatus).toBe.true;
                    console.log("Added Step To Test Successfully.");
                    testStepMap["TESTNAME"] = createTestMap.TESTNAME;
                    testStepMap["STEPNUM"] = 1;
                    zfjcloudNavigator.deleteTestStep(testStepMap, function(stepEditStatus){
                        assert.ok(stepEditStatus, "Not Edited Step");
                        console.log("Step Cloned Successfully.");
                        isSuccess = true;
                        done();
                    });
                });
            });

        });

    });
    /**
    *Delete a teststep if Test has multiple test steps created
    */
    it('Delete a teststep if Test has multiple test steps created', function (done) {
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

        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Delete a teststep if Test has only one 1-test step created"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function (isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
                expect(navigateToSearchTestPageStatus).toBe.true;
                console.log("Navigated Successfully To Search Test Page.");
                zfjcloudNavigator.addTeststepsToTest(testStepMap, function(executeTestStatus){
                    expect(executeTestStatus).toBe.true;
                    console.log("Added Step To Test Successfully.");
                    testStepMap["TESTNAME"] = createTestMap.TESTNAME;
                    testStepMap["STEPNUM"] = 1;
                    zfjcloudNavigator.deleteTestStep(testStepMap, function(stepEditStatus){
                        assert.ok(stepEditStatus, "Not Edited Step");
                        console.log("Step Cloned Successfully.");
                        isSuccess = true;
                        done();
                    });
                });
            });

        });
    });
    /**
     *Delete alternative teststeps if Test has multiple steps created >10
     */
    it('Delete alternative teststeps if Test has multiple steps created more than 10', function (done) {
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
        testStepMap.push({
            step: 'test step 6',
            data: 'test data 6',
            result: 'test result 6'
        });
        testStepMap.push({
            step: 'test step 7',
            data: 'test data 7',
            result: 'test result 7'
        });
        testStepMap.push({
            step: 'test step 8',
            data: 'test data 8',
            result: 'test result 8'
        });
        testStepMap.push({
            step: 'test step 9',
            data: 'test data 9',
            result: 'test result 9'
        });
        testStepMap.push({
            step: 'test step 10',
            data: 'test data 10',
            result: 'test result 10'
        });

        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Delete a teststep if Test has only one 1-test step created"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function (isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
                expect(navigateToSearchTestPageStatus).toBe.true;
                console.log("Navigated Successfully To Search Test Page.");
                zfjcloudNavigator.addTeststepsToTest(testStepMap, function(executeTestStatus){
                    expect(executeTestStatus).toBe.true;
                    console.log("Added Step To Test Successfully.");
                    testStepMap["TESTNAME"] = createTestMap.TESTNAME;
                    testStepMap["STEPNUM"] = 7;
                    zfjcloudNavigator.deleteTestStep(testStepMap, function(stepEditStatus){
                        assert.ok(stepEditStatus, "Not Edited Step");
                        console.log("Step Deleted Successfully.");
                        testStepMap["STEPNUM"] = 5;
                        zfjcloudNavigator.deleteTestStep(testStepMap, function(stepEditStatus){
                            assert.ok(stepEditStatus, "Not Edited Step");
                            console.log("Step Deleted Successfully.");
                            testStepMap["STEPNUM"] = 3;
                            zfjcloudNavigator.deleteTestStep(testStepMap, function(stepEditStatus){
                                assert.ok(stepEditStatus, "Not Edited Step");
                                console.log("Step Deleted Successfully.");
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
     *Delete multiple steps consecutively (4th,2nd &3rd steps)
     */
    it('Delete multiple steps consecutively', function (done) {
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
        testStepMap.push({
            step: 'test step 6',
            data: 'test data 6',
            result: 'test result 6'
        });
        testStepMap.push({
            step: 'test step 7',
            data: 'test data 7',
            result: 'test result 7'
        });
        testStepMap.push({
            step: 'test step 8',
            data: 'test data 8',
            result: 'test result 8'
        });
        testStepMap.push({
            step: 'test step 9',
            data: 'test data 9',
            result: 'test result 9'
        });
        testStepMap.push({
            step: 'test step 10',
            data: 'test data 10',
            result: 'test result 10'
        });

        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Delete a teststep if Test has only one 1-test step created"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function (isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
                expect(navigateToSearchTestPageStatus).toBe.true;
                console.log("Navigated Successfully To Search Test Page.");
                zfjcloudNavigator.addTeststepsToTest(testStepMap, function(executeTestStatus){
                    expect(executeTestStatus).toBe.true;
                    console.log("Added Step To Test Successfully.");
                    testStepMap["TESTNAME"] = createTestMap.TESTNAME;
                    testStepMap["STEPNUM"] = 4;
                    zfjcloudNavigator.deleteTestStep(testStepMap, function(stepEditStatus){
                        assert.ok(stepEditStatus, "Not Edited Step");
                        console.log("Step Deleted Successfully.");
                        testStepMap["STEPNUM"] = 3;
                        zfjcloudNavigator.deleteTestStep(testStepMap, function(stepEditStatus){
                            assert.ok(stepEditStatus, "Not Edited Step");
                            console.log("Step Deleted Successfully.");
                            testStepMap["STEPNUM"] = 2;
                            zfjcloudNavigator.deleteTestStep(testStepMap, function(stepEditStatus){
                                assert.ok(stepEditStatus, "Not Edited Step");
                                console.log("Step Deleted Successfully.");
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
     *Clone a Test step in view issue
     */
    it('Clone a Test step in view issue', function (done) {
        logout = false;
        var testStepMap = [];
        testStepMap.push({
            step: 'stepone',
            data: 'dataone',
            result: 'resone'
        });
        testStepMap.push({
            step: 'STEPTWO',
            data: 'DATATWO',
            result: 'RESTWO'
        });
        testStepMap.push({
            step: 'test step 3',
            data: 'test data 3',
            result: 'test result 3'
        });
        testStepMap.push({
            step: '!@#',
            data: '!@#',
            result: '!@#'
        });
        testStepMap.push({
            step: 'mi prueba',
            data: 'mi prueba',
            result: 'mi prueba'
        });

        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Clone a test steps"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function (isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
                expect(navigateToSearchTestPageStatus).toBe.true;
                console.log("Navigated Successfully To Search Test Page.");
                zfjcloudNavigator.addTeststepsToTest(testStepMap, function(executeTestStatus){
                    expect(executeTestStatus).toBe.true;
                    console.log("Added Step To Test Successfully.");
                    testStepMap["TESTNAME"] = createTestMap.TESTNAME;
                    editStepTest = createTestMap;
                    testStepMap["STEPNUM"] = 5;
                    testStepMap["TYPE"] = "after step";
                    zfjcloudNavigator.cloneTestStep(testStepMap, function(stepEditStatus){
                        assert.ok(stepEditStatus, "Not Cloned Step");
                        console.log("Step Cloned Successfully.");
                        testStepMap["STEPNUM"] = 4;
                        zfjcloudNavigator.cloneTestStep(testStepMap, function(stepEditStatus){
                            assert.ok(stepEditStatus, "Not Cloned Step");
                            console.log("Step Cloned Successfully.");
                            testStepMap["STEPNUM"] = 3;
                            zfjcloudNavigator.cloneTestStep(testStepMap, function(stepEditStatus){
                                assert.ok(stepEditStatus, "Not Cloned Step");
                                console.log("Step Cloned Successfully.");
                                testStepMap["STEPNUM"] = 2;
                                zfjcloudNavigator.cloneTestStep(testStepMap, function(stepEditStatus){
                                    assert.ok(stepEditStatus, "Not Cloned Step");
                                    console.log("Step Cloned Successfully.");
                                    testStepMap["STEPNUM"] = 1;
                                    zfjcloudNavigator.cloneTestStep(testStepMap, function(stepEditStatus){
                                        assert.ok(stepEditStatus, "Not Cloned Step");
                                        console.log("Step Cloned Successfully.");
                                        isSuccess = true;
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    /**
     *Edit/Modify a Cloned step in View Issue Page.
     */
    it('Edit/Modify a Cloned step in View Issue Page.', function (done) {
        logout = false;
        var createTestMap = editStepTest;
        var editStepMap = {
            TESTNAME : createTestMap.TESTNAME,
            STEP : "Step edited",
            DATA : "Data edited",
            RESULT : "Res edited",
            STEPNUM : "2"
        };
        console.log("Test name After Assigned  :" + createTestMap.TESTNAME);
        zfjcloudNavigator.quickSearchById(createTestMap, function (isSearched) {
            assert.ok(isSearched, "Not searched Test.");
            console.log("Test Searched Successfully.");
            zfjcloudNavigator.editTestStep(editStepMap, function(stepEditStatus){
                assert.ok(stepEditStatus, "Not Edited Step");
                console.log("Step Edited Successfully.");
                isSuccess = true;
                done();
            });
        });
    });
    /**
     *Delete a cloned step.
     */
    it('Delete a cloned step.', function (done) {
        logout = false;
        var createTestMap = editStepTest;
        var testStepMap = {
            TESTNAME : createTestMap.TESTNAME,
            STEPNUM : "4"
        };

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
    /**
     * Clone an empty step.
     */
    it('Clone an empty step.', function (done) {
        logout = false;
        var testStepMap = [];
        testStepMap.push({
            step: '',
            data: '',
            result: ''
        });
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Clone a test steps"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function (isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
                expect(navigateToSearchTestPageStatus).toBe.true;
                console.log("Navigated Successfully To Search Test Page.");
                zfjcloudNavigator.addTeststepsToTest(testStepMap, function(executeTestStatus){
                    expect(executeTestStatus).toBe.true;
                    console.log("Added Step To Test Successfully.");
                    testStepMap["TESTNAME"] = createTestMap.TESTNAME;
                    editStepTest = createTestMap;
                    testStepMap["STEPNUM"] = 1;
                    testStepMap["TYPE"] = "after step";
                    zfjcloudNavigator.cloneTestStep(testStepMap, function(stepEditStatus){
                        assert.ok(stepEditStatus, "Not Cloned Step");
                        console.log("Step Cloned Successfully.");
                        isSuccess = true;
                        done();
                    });
                });
            });
        });
    });
    /**
     * Clone an empty step.
     */
    xit('Clone an empty step.', function (done) {
        logout = false;
        var testStepMap = [];
        testStepMap.push({
            step: '',
            data: '',
            result: ''
        });
        var createTestMap = {
            ISSUETYPE: "Test",
            SUMMARY: "Clone a test steps"
            //PRIORITY : "Minor"
        };
        zfjcloudNavigator.createTestDirectly(createTestMap, function (isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            isSuccess = true;
            done();
        });
        /*zfjcloudNavigator.createTestDirectly(createTestMap, function (isCreateTest) {
            assert.ok(isCreateTest, "Not Created test.");
            jiraNavigator.navigateToSearchTestPage(function(navigateToSearchTestPageStatus){
                expect(navigateToSearchTestPageStatus).toBe.true;
                console.log("Navigated Successfully To Search Test Page.");
                zfjcloudNavigator.addTeststepsToTest(testStepMap, function(executeTestStatus){
                    expect(executeTestStatus).toBe.true;
                    console.log("Added Step To Test Successfully.");
                    testStepMap["TESTNAME"] = createTestMap.TESTNAME;
                    editStepTest = createTestMap;
                    testStepMap["STEPNUM"] = 1;
                    testStepMap["TYPE"] = "after step";
                    zfjcloudNavigator.cloneTestStep(testStepMap, function(stepEditStatus){
                        assert.ok(stepEditStatus, "Not Cloned Step");
                        console.log("Step Cloned Successfully.");
                        isSuccess = true;
                        done();
                    });
                });
            });
        });*/
    });




});