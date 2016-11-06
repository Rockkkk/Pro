
var commUtil = require('../../utils/commUtil.js');
var EditTestPage = require('./EditTestPage.js');
var CloneTestPage = require('./CloneTestPage.js');
var executeTestPage = require('./ExecuteTestPage.js');
var planTestCyclePage = require('./PlanTestCyclePage.js');
var DeleteTeststepPage = require('./DeleteTeststepPage.js' );
//var CloneTeststepPage = require('./CloneTeststepPage.js');

var ViewTestPage = function () {

    /******************************************************
     *  VIEW TEST PAGE
     *****************************************************/

    /******************************************************
     *  WEBELEMENTS
     *****************************************************/
    var xpathForIFrameForTestStep = "//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']";

    var xpathForIFrameForExec = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-executions_provider']";
    if(browser.params.testdata.projectCentricView === "enabled"){
        xpathForIFrameForExec = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-executions-projectCentric_provider']";
    }else if(browser.params.testdata.projectCentricView === "disabled"){
        xpathForIFrameForExec = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-executions_provider']";
    }
    if(browser.params.testdata.environment === "local"){
        //var xpathForIFrameForExecuteAdhoc = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__zephyr-je-test-execute_provider']";
        var xpathForIFrameForAddTestToCycle = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__zephyr-je-add-to-cycle_provider']";
    }
    //var xpathForIFrameForTestStep = "//*[@id='easyXDM_embedded-com.thed.zephyr.je__viewissue-teststep_provider']";
    //var xpathForIFrameForExec = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.je__viewissue-executions_provider']";

    var xpathForIFrameOfExecuteDialog = "//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__zephyr-je-test-execute_provider']";
                                         //*[@id='easyXDM_embedded-com.thed.zephyr.cloud__zephyr-je-test-execute_provider']
    var xpathForTestDetailsTable = "//*[text()='Test Details']";
    var xpathForTestExecutionTable = "//*[text()='Test Executions']";
    //var xpathForIframeForAddTestCycle = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__zephyr-je-add-to-cycle_provider']";
   // var xpathForIframeForExec = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-executions_provider']";
    var testId = element(by.id('key-val'));
    var issueSummary = element(by.id('summary-val'));
    var priority = element(by.id("priority-val"));
    var assignee = element(by.xpath("//li[@class='people-details']/dl/dd/span[@id='assignee-val']"));
    var reporter = element(by.xpath("//li[@class='people-details']/dl/dd/span[@id='reporter-val']/span[1]"));
    var environment = element(by.xpath("//*[@id='environment-val']/p"));
    var description = element(by.xpath("//*[@id='description-val']/div/p"));
    var component = element(by.id("components-val"));
    var affectedVersion = element(by.id("versions-val"));
    var fixVersion = element(by.id("fixfor-val"));
    var label = element(by.xpath("//*[@id='wrap-labels']/div"));
    var xpathOfCreatedDate = element(by.xpath("//*[span[@id='create-date']]"));
    var xpathOfUpdatedDate = element(by.xpath("//*[span[@id='updated-date']]"));

    //var teststepFrame = element(by.xpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']"));
    var xpathToAddTeststep = element(by.xpath("//*[@id='teststep-table']/tbody[2]/tr/td[3]/textarea"));
    var xpathToAddTestdata = element(by.xpath("//*[@id='teststep-table']/tbody[2]/tr/td[4]/textarea"));
    var xpathToAddExpectedResult = element(by.xpath("//*[@id='teststep-table']/tbody[2]/tr/td[5]/textarea"));
    var xpathOfAddButton = element(by.xpath("//*[@type='submit' and @value ='Add']"));
    var xpathOfUpdateButton = element(by.xpath("//*[@value='Update']"));
    var xpathOfCancelLink = element(by.xpath("//a[text()='Cancel']"));
    var editTest = element(by.id("edit-issue"));

    var xpathOfMoreOption = element(by.xpath("//*[@id='opsbar-operations_more']/span[text()='More']"));
    var xpathOfCloneLink = element(by.xpath("//*[@id='clone-issue']"));

    var xpathForTestID = "//*[@id='key-val']";
    var xpathForProjectNameValue = "//*[@id='project-name-val']";
    var xpathForSummaryValue = "//*[@id='summary-val']";
    var xpathForPriorityValue = "//*[@id='priority-val']";
    var xpathForComponent = "//*[@id='components-val']";
    var xpathForAffectedVersion = "//*[@id='versions-val']";
    var xpathForFixVersion = "//*[@id='fixfor-val']";
    var xpathForEnvironment = "//*[@id='environment-val']";
    var xpathForDescription = "//*[@id='description-val']";
    var xpathForLabel = "//*[@id='wrap-labels']/div";
    var xpathForCreatedDate = "//*[span[@id='create-date']]";

    var xpathForStepTextArea = "//*[@id='teststep-table']/tbody[2]/tr/td[3]/textarea";
    var xpathForStepDataTextArea = "//*[@id='teststep-table']/tbody[2]/tr/td[4]/textarea";
    var xpathForStepResultTextArea = "//*[@id='teststep-table']/tbody[2]/tr/td[5]/textarea";
    var xpathForAddBtn = "//*[@type='submit' and @value ='Add']";

    /******************************************************
     *  PAGE OBJECT METHODS
     *****************************************************/
    this.executeTest = function(executeTestMap, isExecutedTest){
        try{
            logger.info("123");
            validateViewTestPage(executeTestMap.TESTNAME, function (validateTitleStatus) {
                assert.ok(validateTitleStatus, "Not Validated View Test page.");
                logger.info("View Test Page Validated Successfully.");

                if(executeTestMap.hasOwnProperty("EXECUTETESTDIRECTLY")){
                    executeTestDirectlyFromViewTestPage(executeTestMap, function(executeTestStatus){
                        assert.ok(executeTestStatus, "Not Executed Test Directly.");
                        logger.info("Test is Executed Directly From View Test Page.");
                        isExecutedTest(executeTestStatus);
                    });
                }
                if(executeTestMap.hasOwnProperty("EXECUTEADHOC")){
                    navigateToExecuteTestPage(function(isNavigateToExecuteTestPage){
                        assert.ok(isNavigateToExecuteTestPage, "Not Navigated To Execute Test Page.");
                        isExecutedTest(isNavigateToExecuteTestPage);
                    });
                }
            });
        }catch(e){
            console.error(e);
            executeTestStatus(false);
        }
    };
    //var that = this;
    this.validateTestCreate = function(createTestMap, isValidateTest){
        validateTest(createTestMap, function(isCreateTest){
            isValidateTest(isCreateTest);
        });
    };
    var validateTest = function(createTestMap, isValidateTest){
        try{
            commUtil.implicitWait(200000);
            var counter = 0;
            var mapSize = Object.keys(createTestMap).length;
            if(createTestMap.hasOwnProperty("CLONESUMMARY")){
                mapSize--;
            }
            if(createTestMap.hasOwnProperty("CLONEDTEST")){
                mapSize--;
            }
            if(createTestMap.hasOwnProperty("ISSUETYPE")){
                mapSize--;
            }
            if(createTestMap.hasOwnProperty("STEPSTOCREATE")){
                mapSize--;
            }
            logger.info("Map Size : "+mapSize+"Summary : "+createTestMap.SUMMARY);

            validateViewTestPage(createTestMap.SUMMARY, function(isValidateViewTestPage){
                assert.ok(isValidateViewTestPage, "Not Validated View Test Page.");
                logger.info("View Test Page Validated Successfully.");
                commUtil.getTextByXpath(xpathForProjectNameValue, function(projectName){
                    assert.ok(projectName !== undefined);
                    logger.info("Project Selected : " + projectName);

                    commUtil.getTextByXpath(xpathForTestID, function(getTestID){
                        assert.ok(getTestID !== undefined);
                        logger.info("Test ID : " + getTestID);
                        if(createTestMap.hasOwnProperty("TESTNAME")){
                            assert.equal(createTestMap.TESTNAME, getTestID, "Not Validated Test Name.");
                            logger.info(getTestID + " : Test ID Validated Successfully.");
                            counter++;
                        }else{
                            createTestMap["TESTNAME"] = getTestID;
                            logger.info("Test ID Created : " + getTestID);
                        }


                        if(createTestMap.hasOwnProperty("SUMMARY")){
                            commUtil.getTextByXpath(xpathForSummaryValue, function(summaryValue) {
                                assert.ok(summaryValue !== undefined);
                                logger.info("Summary : " + summaryValue);
                                assert.equal(summaryValue, createTestMap.SUMMARY, "Test Summary Not Validated.");
                                logger.info("Test Summary Validated Successfully.");

                                counter++;
                                if (counter === mapSize) {
                                    assert.ok(counter === mapSize, "Not Validated Cycle.");
                                    commUtil.getAttributeValue(xpathForCreatedDate, "title", function(testCreatedDate){
                                        assert.ok(testCreatedDate !== undefined, "Date is Undefined");
                                        logger.info("Test Created On : " + testCreatedDate);
                                        isValidateTest(true);
                                    });
                                }
                            });
                        }
                        if(createTestMap.hasOwnProperty("PRIORITY")){
                            commUtil.getTextByXpath(xpathForPriorityValue, function(priorityValue) {
                                assert.ok(priorityValue !== undefined);
                                logger.info("Priority : " + priorityValue);
                                logger.info("Priority : " + createTestMap.PRIORITY);
                                assert.equal(priorityValue, createTestMap.PRIORITY, "Test Priority Not Validated.");
                                logger.info("Test Priority Validated Successfully.");
                                counter++;
                                if (counter === mapSize) {
                                    assert.ok(counter === mapSize, "Not Validated Cycle.");
                                    commUtil.getAttributeValue(xpathForCreatedDate, "title", function(testCreatedDate){
                                        assert.ok(testCreatedDate !== undefined, "Date is Undefined");
                                        logger.info("Test Created On : " + testCreatedDate);
                                        isValidateTest(true);
                                    });
                                }
                            });
                        }
                        if(createTestMap.hasOwnProperty("COMPONENT")){
                            if(createTestMap.COMPONENT instanceof Array){
                                for(var i=0; i < createTestMap.COMPONENT.length; i++) {
                                    (function (x) {
                                        commUtil.getTextByXpath(xpathForComponent, function(componentValue) {
                                            assert.ok(componentValue !== undefined);
                                            logger.info("Component : " + componentValue);
                                            assert.ok((componentValue.indexOf(createTestMap.COMPONENT[x]) != -1), "Test Component Not Validated.");
                                            if(x === (createTestMap.COMPONENT.length -1)){
                                                logger.info("Test Component Validated Successfully.");
                                                counter++;
                                                if (counter === mapSize) {
                                                    assert.ok(counter === mapSize, "Not Validated Cycle.");
                                                    commUtil.getAttributeValue(xpathForCreatedDate, "title", function(testCreatedDate){
                                                        assert.ok(testCreatedDate !== undefined, "Date is Undefined");
                                                        logger.info("Test Created On : " + testCreatedDate);
                                                        isValidateTest(true);
                                                    });
                                                }
                                            }
                                        });
                                    })(i);
                                }
                            }else{
                                commUtil.getTextByXpath(xpathForComponent, function(componentValue) {
                                    assert.ok(componentValue !== undefined);
                                    logger.info("Component : " + componentValue);
                                    assert.equal(componentValue, createTestMap.COMPONENT, "Test Component Not Validated.");
                                    logger.info("Test Component Validated Successfully.");
                                    counter++;
                                    if (counter === mapSize) {
                                        assert.ok(counter === mapSize, "Not Validated Cycle.");
                                        commUtil.getAttributeValue(xpathForCreatedDate, "title", function(testCreatedDate){
                                            assert.ok(testCreatedDate !== undefined, "Date is Undefined");
                                            logger.info("Test Created On : " + testCreatedDate);
                                            isValidateTest(true);
                                        });
                                    }
                                });
                            }
                        }
                        if(createTestMap.hasOwnProperty("AFFECTEDVERSION")){
                            if(createTestMap.AFFECTEDVERSION instanceof Array){
                                for(var i=0; i < createTestMap.AFFECTEDVERSION.length; i++) {
                                    (function (x) {
                                        commUtil.getTextByXpath(xpathForAffectedVersion, function(affectedVersionValue) {
                                            assert.ok(affectedVersionValue !== undefined);
                                            logger.info("Affected Version Value : " + affectedVersionValue);
                                            assert.ok((affectedVersionValue.indexOf(createTestMap.AFFECTEDVERSION[x]) != -1), "Test Affected Version Not Validated.");
                                            logger.info("Test Affected Version Validated Successfully.");

                                            if(x === (createTestMap.AFFECTEDVERSION.length -1)){
                                                logger.info("Test Affected Version Validated Successfully.");
                                                counter++;
                                                if (counter === mapSize) {
                                                    assert.ok(counter === mapSize, "Not Validated Cycle.");
                                                    commUtil.getAttributeValue(xpathForCreatedDate, "title", function(testCreatedDate){
                                                        assert.ok(testCreatedDate !== undefined, "Date is Undefined");
                                                        logger.info("Test Created On : " + testCreatedDate);
                                                        isValidateTest(true);
                                                    });
                                                }
                                            }
                                        });
                                    })(i);
                                }
                            }else{
                                commUtil.getTextByXpath(xpathForAffectedVersion, function(affectedVersionValue) {
                                    assert.ok(affectedVersionValue !== undefined);
                                    logger.info("Affected Version Value : " + affectedVersionValue);
                                    assert.equal(affectedVersionValue, createTestMap.AFFECTEDVERSION, "Test Affected Version Not Validated.");
                                    logger.info("Test Affected Version Validated Successfully.");
                                    counter++;
                                    if (counter === mapSize) {
                                        assert.ok(counter === mapSize, "Not Validated Cycle.");
                                        commUtil.getAttributeValue(xpathForCreatedDate, "title", function(testCreatedDate){
                                            assert.ok(testCreatedDate !== undefined, "Date is Undefined");
                                            logger.info("Test Created On : " + testCreatedDate);
                                            isValidateTest(true);
                                        });
                                    }
                                });
                            }
                        }
                        if(createTestMap.hasOwnProperty("FIXVERSION")){
                            if(createTestMap.FIXVERSION instanceof Array){
                                for(var i=0; i < createTestMap.FIXVERSION.length; i++) {
                                    (function (x) {
                                        commUtil.getTextByXpath(xpathForFixVersion, function(fixVersionValue) {
                                            assert.ok(fixVersionValue !== undefined);
                                            logger.info("Fix Version Value : " + fixVersionValue);
                                            assert.ok((fixVersionValue.indexOf(createTestMap.FIXVERSION[x]) != -1), "Test Fix Version Not Validated.");
                                            logger.info("Test Fix Version Validated Successfully.");

                                            if(x === (createTestMap.FIXVERSION.length -1)){
                                                logger.info("Test Component Validated Successfully.");
                                                counter++;
                                                if (counter === mapSize) {
                                                    assert.ok(counter === mapSize, "Not Validated Cycle.");
                                                    commUtil.getAttributeValue(xpathForCreatedDate, "title", function(testCreatedDate){
                                                        assert.ok(testCreatedDate !== undefined, "Date is Undefined");
                                                        logger.info("Test Created On : " + testCreatedDate);
                                                        isValidateTest(true);
                                                    });
                                                }
                                            }
                                        });
                                    })(i);
                                }
                            }else{
                                commUtil.getTextByXpath(xpathForFixVersion, function(fixVersionValue) {
                                    assert.ok(fixVersionValue !== undefined);
                                    logger.info("Fix Version Value : " + fixVersionValue);
                                    assert.equal(fixVersionValue, createTestMap.FIXVERSION, "Test Fix Version Not Validated.");
                                    logger.info("Test Fix Version Validated Successfully.");
                                    counter++;
                                    if (counter === mapSize) {
                                        assert.ok(counter === mapSize, "Not Validated Cycle.");
                                        commUtil.getAttributeValue(xpathForCreatedDate, "title", function(testCreatedDate){
                                            assert.ok(testCreatedDate !== undefined, "Date is Undefined");
                                            logger.info("Test Created On : " + testCreatedDate);
                                            isValidateTest(true);
                                        });
                                    }
                                });
                            }
                        }
                        if(createTestMap.hasOwnProperty("ENVIRONMENT")){
                            commUtil.getTextByXpath(xpathForEnvironment, function(environmentValue) {
                                assert.ok(environmentValue !== undefined);
                                logger.info("Fix Environment Value : " + environmentValue);
                                assert.equal(environmentValue, createTestMap.ENVIRONMENT, "Test Environment Not Validated.");
                                logger.info("Test Environment Validated Successfully.");
                                counter++;
                                if (counter === mapSize) {
                                    assert.ok(counter === mapSize, "Not Validated Cycle.");
                                    commUtil.getAttributeValue(xpathForCreatedDate, "title", function(testCreatedDate){
                                        assert.ok(testCreatedDate !== undefined, "Date is Undefined");
                                        logger.info("Test Created On : " + testCreatedDate);
                                        isValidateTest(true);
                                    });
                                }
                            });
                        }
                        if(createTestMap.hasOwnProperty("DESCRIPTION")){
                            commUtil.getTextByXpath(xpathForDescription, function(descriptionValue) {
                                assert.ok(descriptionValue !== undefined);
                                logger.info("Description Value : " + descriptionValue);
                                assert.equal(descriptionValue, createTestMap.DESCRIPTION, "Test Description Not Validated.");
                                logger.info("Test Description Validated Successfully.");
                                counter++;
                                if (counter === mapSize) {
                                    assert.ok(counter === mapSize, "Not Validated Cycle.");
                                    commUtil.getAttributeValue(xpathForCreatedDate, "title", function(testCreatedDate){
                                        assert.ok(testCreatedDate !== undefined, "Date is Undefined");
                                        logger.info("Test Created On : " + testCreatedDate);
                                        isValidateTest(true);
                                    });
                                }
                            });
                        }
                        if(createTestMap.hasOwnProperty("LABEL")){
                            if(createTestMap.LABEL instanceof Array){
                                for(var i=0; i < createTestMap.LABEL.length; i++) {
                                    (function (x) {
                                        commUtil.getTextByXpath(xpathForLabel, function(labelValue) {
                                            assert.ok(labelValue !== undefined);
                                            logger.info("Label Value : " + labelValue);
                                            logger.info(createTestMap.LABEL[x]);
                                            assert.ok((labelValue.indexOf(createTestMap.LABEL[x]) != -1), "Test Label Not Validated.");
                                            if(x === (createTestMap.LABEL.length -1)){
                                                logger.info("Test Label Validated Successfully.");
                                                counter++;
                                                if (counter === mapSize) {
                                                    assert.ok(counter === mapSize, "Not Validated Cycle.");
                                                    commUtil.getAttributeValue(xpathForCreatedDate, "title", function(testCreatedDate){
                                                        assert.ok(testCreatedDate !== undefined, "Date is Undefined");
                                                        logger.info("Test Created On : " + testCreatedDate);
                                                        isValidateTest(true);
                                                    });
                                                }
                                            }
                                        });
                                    })(i);
                                }
                            }else{
                                commUtil.getTextByXpath(xpathForLabel, function(labelValue) {
                                    assert.ok(labelValue !== undefined);
                                    logger.info("Label Value : " + labelValue);
                                    logger.info(createTestMap.LABEL);
                                    assert.equal(labelValue, createTestMap.LABEL, "Test Label Not Validated.");
                                    logger.info("Test Label Validated Successfully.");
                                    counter++;
                                    if (counter === mapSize) {
                                        assert.ok(counter === mapSize, "Not Validated Cycle.");
                                        commUtil.getAttributeValue(xpathForCreatedDate, "title", function(testCreatedDate){
                                            assert.ok(testCreatedDate !== undefined, "Date is Undefined");
                                            logger.info("Test Created On : " + testCreatedDate);
                                            isValidateTest(true);
                                        });
                                    }
                                });
                            }
                        }
                        if(createTestMap.hasOwnProperty("ATTACHMENT")) {
                            driver.sleep(500);
                            commUtil.waitForElement("//*[@id='attachmentmodule_heading']/h2[@class='toggle-title']", function(waitForAttachmentHeader){
                                assert.ok(waitForAttachmentHeader, "Not Visible Attachment section.");
                                commUtil.searchTextFromElements("//*[@id='attachmentmodule']//ol//a[@class='attachment-title']", createTestMap.ATTACHMENT, function(isSearchedAttachment){
                                    assert.ok(isSearchedAttachment, "Not validated Attachment.");
                                    logger.info("Attachments are validated successfully.");
                                    counter++;
                                    if (counter === mapSize) {
                                        assert.ok(counter === mapSize, "Not Validated Cycle.");
                                        commUtil.getAttributeValue(xpathForCreatedDate, "title", function(testCreatedDate){
                                            assert.ok(testCreatedDate !== undefined, "Date is Undefined");
                                            logger.info("Test Created On : " + testCreatedDate);
                                            isValidateTest(true);
                                        });
                                    }
                                });
                            });

                        }
                        /*if(createTestMap.hasOwnProperty("STEP")){
                            this.addMultipleSteps(function(abc){
                                assert.ok(abc);
                                counter++;
                                if (counter === mapSize) {
                                    assert.ok(counter === mapSize, "Not Validated Cycle.");
                                    commUtil.getAttributeValue(xpathForCreatedDate, "title", function(testCreatedDate){
                                        assert.ok(testCreatedDate !== undefined, "Date is Undefined");
                                        logger.info("Test Created On : " + testCreatedDate);
                                        isValidateTest(true);
                                    });
                                }
                            });
                        }*/
                    });
                });
            });

        }catch(err){
            isValidateTest(false);
        }
    };
    this.editTest = function(createTestMap, editTestMap, isEditedTest){
        try {
            validateViewTestPage(createTestMap.TESTNAME, function (validateTitleStatus) {
                assert.ok(validateTitleStatus, "Not Validated View Test page.");
                logger.info("View Test Page Validated Successfully.");

                commUtil.clickOnElementByXpath("//*[@id='edit-issue']", function(clickOnEditTestStatus){
                    assert.ok(clickOnEditTestStatus, "Not Clicked On Edit Test Link.");
                    logger.info("Clicked On Edit Test Link.");

                    EditTestPage.editTest(createTestMap, editTestMap,function(isEdited){
                        assert.ok(isEdited, "Not Edited Test.");
                        logger.info("Test Edited Successfully.");
                        /*that.validateTestCreate(editTestMap, function(isValidateTest){
                            assert.ok(isValidateTest, "Not Validated Test.");
                            logger.info("Test validated Successfully.");
                            isEditedTest(isValidateTest);
                        });*/
                        isEditedTest(true);
                    });
                });
            });
        }catch(e){
            isEditedTest(false);
        }
    };
    validateClonedTest = function(cloneTestMap, isValidateClonedTest){
        try{
            commUtil.moveToElementByXpath("//*[text()='Test Executions']", function(moveToExecutionTable){
                assert.ok(moveToExecutionTable, "Not moved To Execution Table.");
                commUtil.moveToElementByXpath("//*[text()='Issue Links']", function(moveToIssueLinkTable){
                    assert.ok(moveToIssueLinkTable, "Not moved To Execution Table.");
                    commUtil.waitForElement("//*[@class='mod-content']/dl/dt[@title='clones']", browser.params.testdata.implicitWaitTimeMedium, function(waitForCloneLickStatus){
                        assert.ok(waitForCloneLickStatus, "Not Found Clone Link.");
                        commUtil.getTextByXpath("//dl[dt[@title='clones']]/descendant::a[@class='issue-link link-title']", function(getCloneTest){
                            assert.ok(getCloneTest, cloneTestMap.CLONEDTEST, "Not Validated Clone Test Link.");
                            logger.info("Clone Test Link validated Successfully.");
                            commUtil.clickOnElementByXpath("//dl[dt[@title='clones']]/descendant::a[@class='issue-link link-title'][text()='"+cloneTestMap.CLONEDTEST+"']", function(clickOnCloneTestLinkStatus){
                                assert.ok(clickOnCloneTestLinkStatus, "Not Clicked On Clone Link Successfully.");
                                var tempTest = cloneTestMap.TESTNAME;
                                cloneTestMap["TESTNAME"] = cloneTestMap.CLONEDTEST;
                                cloneTestMap["CLONEDTEST"] = tempTest;
                                var tempSummary = cloneTestMap.SUMMARY;
                                cloneTestMap["SUMMARY"] = cloneTestMap.CLONESUMMARY;
                                cloneTestMap["CLONESUMMARY"] = tempSummary;
                                commUtil.implicitWait(200000);
                                validateTest(cloneTestMap, function(isValidateTest) {
                                    assert.ok(isValidateTest, "Not Validated Test After Cloned..");
                                    logger.info("Test validated Successfully.");
                                    commUtil.moveToElementByXpath("//h2[text()='Issue Links']", function (moveToIssueLinkStatus) {
                                        assert.ok(moveToIssueLinkStatus, "Not moved To Issue Link.");
                                        commUtil.waitForElement("//*[@class='mod-content']/dl/dt[@title='is cloned by']",browser.params.testdata.implicitWaitTimeMedium, function(waitForCloneByLickStatus) {
                                            assert.ok(waitForCloneByLickStatus, "Not Found Clone Link.");
                                            logger.info("Clone By Link Found Successfully.");

                                            logger.info("Clone By Link : "+cloneTestMap.CLONEDTEST);
                                            commUtil.searchTextFromElements("//dl[dt[@title='is cloned by']]/descendant::a[@class='issue-link link-title']",cloneTestMap.CLONEDTEST , function (getClonedTestStatus) {
                                                assert.ok(getClonedTestStatus, "Not Validated Clone Test Link.");
                                                logger.info("Clone By Test Link validated Successfully.");
                                                isValidateClonedTest(getClonedTestStatus);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }catch(e){
            console.error(e);
            isValidateClonedTest(false);
        }
    };
    /*var validateClonedTest = function(testsummary){
        commUtil.waitForElementByXpath("/*//*[@class='mod-content']/dl/dt[@title='clones']");
        commUtil.getTextUsingWebElement(testId).then(function(id){
            commUtil.validateTitle("["+id+"] "+testsummary);
        });
        commUtil.isElementDisplayed(commUtil.changeToWebElement("//dl[dt[@title='clones']]/dd/div/p/span/a")).then(function(result){
            expect(result).toBe(true);
            commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//dl[dt[@title='clones']]/dd/div/p/span/a")).then(function(idValue){
                commUtil.changeToWebElement("/*//*[text()='"+idValue+"']").click();
            });
        });
        commUtil.waitForElementByXpath("/*//*[@class='mod-content']/dl/dt[@title='is cloned by']");
        commUtil.getTextUsingWebElement(testId).then(function(idOfTest) {
            commUtil.validateTitle(idOfTest);
        });
        commUtil.isElementDisplayed(commUtil.changeToWebElement("//dl[dt[@title='is cloned by']]/dd/div/p/span/a")).then(function(result) {
            expect(result).toBe(true);
            commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//dl[dt[@title='is cloned by']]/dd/div/p/span/a")).then(function(valueOfId){
                logger.info(valueOfId);
            });

        });
    };*/

    /*this.addTeststeps = function (teststepMap){
        driver.wait(function(){
            commUtil.isElementDisplayed(commUtil.changeToWebElement("/*//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(value){
                if(value === true){

                    driver.switchTo().frame(commUtil.changeToWebElement("/*//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(){
                        teststepMap.forEach(function (teststep) {
                            createTeststep(teststep.step,teststep.data,teststep.result);
                        });
                    });
                    for(i=0;i<=(teststepMap.length)-1;i++){
                        validateTeststepCreated(teststepMap[i].step,teststepMap[i].data,teststepMap[i].result,i);
                    }
                    driver.switchTo().defaultContent();
                }
                else{
                    logger.info("i-frame not loaded.");
                }
            });
            return true;
        },30000,"Adding Test steps failed.");

    };*/

    this.editTestStep = function(stepEditMap, callback){
        var counter = 0;
        var size = 0;
        if(stepEditMap.hasOwnProperty("STEP")){
            size++;
        }
        if(stepEditMap.hasOwnProperty("DATA")){
            size++;
        }
        if(stepEditMap.hasOwnProperty("RESULT")){
            size++;
        }
        try {
            validateViewTestPage(stepEditMap.TESTNAME, function (validateTitleStatus) {
                assert.ok(validateTitleStatus, "Not Validated View Test page.");
                logger.info("View Test Page Validated Successfully.");
                //commUtil.moveToElementByXpath("//*[text()='Test Details']", function (moveToIFrameStatus) {
                   // assert.ok(moveToIFrameStatus, "Not Moved To Test Step Frame.");
                    commUtil.switchToFrameByXpath(xpathForIFrameForTestStep, function (switchToFrameStatus) {
                        assert.ok(switchToFrameStatus, "Not Switched To Test Step Frame Successfully.");
                        logger.info("Switched To Frame Successfully.");
                        returnTestSteps(function(totalSteps) {
                            logger.info("Total Steps : " + totalSteps);
                            //assert.ok();
                            //counter = totalSteps;
                            logger.info("Step is less / "+stepEditMap.STEPNUM);
                            logger.info("Step is less / "+stepEditMap.STEPNUM < totalSteps);
                            //var element = driver.findElement(by.xpath("//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']/td[3]/span"));
                            commUtil.doClickByXpath("//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']/td[3]/span", function(clickOnStepStatus){
                                assert.ok(clickOnStepStatus, "Not Clicked on Step for edit.");
                                logger.info("Click On Step.");
                                if(stepEditMap.hasOwnProperty("STEP")){
                                    commUtil.sendTextToElement("//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']//textarea[@name='step']", stepEditMap.STEP, function(sendStepStatus){
                                        assert.ok(sendStepStatus, "Not Sent Step.");
                                        logger.info("Given Test Step.");

                                        counter++;
                                        if(counter === size) {
                                            assert.ok(counter === size, "Not Created Cycle.");
                                            if(stepEditMap.hasOwnProperty("CANCEL")){
                                                getStepDetails(stepEditMap, function(getStepDetails) {
                                                    assert.ok(getStepDetails, "Not Got step details.");
                                                    var xpathForEditCancelBtn = "//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']//a[text()='Cancel']";
                                                    commUtil.clickOnElementByXpath(xpathForEditCancelBtn, function(clickOnEditStepCancelStatus) {
                                                        assert.ok(clickOnEditStepCancelStatus, "Not Clicked On Cancel button.");
                                                        logger.info("Clicked on Cancel button.");
                                                        logger.info("Step Edit Cancelled Successfully.");
                                                        validateStep(stepEditMap, function(validateStatus){
                                                            assert.ok(validateStatus, "Not validated Step Status.");
                                                            logger.info("Edited Step validated Successfully.");
                                                            callback(validateStatus);
                                                        });
                                                    });
                                                });
                                            }else{
                                                var xpathForStepEditUpdateBtn = "//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']//input[@value='Update']";
                                                commUtil.clickOnElementByXpath(xpathForStepEditUpdateBtn, function(clickOnUpdateStatus) {
                                                    assert.ok(clickOnUpdateStatus, "Not Clicked On Update button.");
                                                    logger.info("Clicked on Update button.");
                                                    logger.info("Step Edited Successfully.");
                                                    validateStep(stepEditMap, function(validateStatus){
                                                        assert.ok(validateStatus, "Not validated Step Status.");
                                                        logger.info("Edited Step validated Successfully.");
                                                        callback(validateStatus);
                                                    });
                                                });
                                            }
                                        }
                                    });
                                }
                                if(stepEditMap.hasOwnProperty("DATA")){
                                    commUtil.sendTextToElement("//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']//textarea[@name='data']", stepEditMap.DATA, function(sendStepStatus) {
                                        assert.ok(sendStepStatus, "Not Sent Test Data.");
                                        logger.info("Given Test Data.");
                                        counter++;
                                        if (counter === size) {
                                            assert.ok(counter === size, "Not Created Cycle.");
                                            if (stepEditMap.hasOwnProperty("CANCEL")) {
                                                getStepDetails(stepEditMap, function (getStepDetails) {
                                                    assert.ok(getStepDetails, "Not Got step details.");
                                                    var xpathForEditCancelBtn = "//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='" + stepEditMap.STEPNUM + "']//a[text()='Cancel']";
                                                    commUtil.clickOnElementByXpath(xpathForEditCancelBtn, function (clickOnEditStepCancelStatus) {
                                                        assert.ok(clickOnEditStepCancelStatus, "Not Clicked On Cancel button.");
                                                        logger.info("Clicked on Cancel button.");
                                                        logger.info("Step Edit Cancelled Successfully.");
                                                        validateStep(stepEditMap, function (validateStatus) {
                                                            assert.ok(validateStatus, "Not validated Step Status.");
                                                            logger.info("Edited Step validated Successfully.");
                                                            callback(validateStatus);
                                                        });
                                                    });
                                                });
                                            } else {
                                                var xpathForStepEditUpdateBtn = "//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='" + stepEditMap.STEPNUM + "']//input[@value='Update']";
                                                commUtil.clickOnElementByXpath(xpathForStepEditUpdateBtn, function (clickOnUpdateStatus) {
                                                    assert.ok(clickOnUpdateStatus, "Not Clicked On Update button.");
                                                    logger.info("Clicked on Update button.");
                                                    logger.info("Step Edited Successfully.");
                                                    validateStep(stepEditMap, function (validateStatus) {
                                                        assert.ok(validateStatus, "Not validated Step Status.");
                                                        logger.info("Edited Step validated Successfully.");
                                                        callback(validateStatus);
                                                    });
                                                });
                                            }
                                        }
                                    });
                                }
                                if(stepEditMap.hasOwnProperty("RESULT")){
                                    commUtil.sendTextToElement("//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']//textarea[@name='result']", stepEditMap.RESULT, function(sendStepStatus){
                                        assert.ok(sendStepStatus, "Not Sent Step.");
                                        logger.info("Given Test Step.");
                                        counter++;
                                        if(counter === size) {
                                            assert.ok(counter === size, "Not Created Cycle.");
                                            if(stepEditMap.hasOwnProperty("CANCEL")){
                                                getStepDetails(stepEditMap, function(getStepDetails) {
                                                    assert.ok(getStepDetails, "Not Got step details.");
                                                    var xpathForEditCancelBtn = "//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']//a[text()='Cancel']";
                                                    commUtil.clickOnElementByXpath(xpathForEditCancelBtn, function(clickOnEditStepCancelStatus) {
                                                        assert.ok(clickOnEditStepCancelStatus, "Not Clicked On Cancel button.");
                                                        logger.info("Clicked on Cancel button.");
                                                        logger.info("Step Edit Cancelled Successfully.");
                                                        validateStep(stepEditMap, function(validateStatus){
                                                            assert.ok(validateStatus, "Not validated Step Status.");
                                                            logger.info("Edited Step validated Successfully.");
                                                            callback(validateStatus);
                                                        });
                                                    });
                                                });
                                            }else{
                                                var xpathForStepEditUpdateBtn = "//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']//input[@value='Update']";
                                                commUtil.clickOnElementByXpath(xpathForStepEditUpdateBtn, function(clickOnUpdateStatus) {
                                                    assert.ok(clickOnUpdateStatus, "Not Clicked On Update button.");
                                                    logger.info("Clicked on Update button.");
                                                    logger.info("Step Edited Successfully.");
                                                    validateStep(stepEditMap, function(validateStatus){
                                                        assert.ok(validateStatus, "Not validated Step Status.");
                                                        logger.info("Edited Step validated Successfully.");
                                                        callback(validateStatus);
                                                    });
                                                });
                                            }
                                        }
                                        /*commUtil.clickOnElementByXpath("/*//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']//input[@value='Update']", function(clickOnUpdateStatus){
                                            assert.ok(clickOnUpdateStatus, "Not Clicked On Update button.");
                                            logger.info("Clicked on Update button.");
                                            if(counter === size) {
                                                assert.ok(counter === size, "Not Created Cycle.");
                                                logger.info("Step Edited Successfully.");
                                                validateStep(stepEditMap, function(validateStatus){
                                                    assert.ok(validateStatus, "Not validated Step Status.");
                                                    logger.info("Edited Step validated Successfully.");
                                                    editStepStatus(validateStatus);
                                                });
                                            }
                                        });*/
                                    });
                                }
                            });
                        });
                    });
                //});
            });
        }catch(err){

        }

        /*driver.wait(function(){
            commUtil.waitForElementByXpath("/*//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']");
            commUtil.isElementDisplayed(commUtil.changeToWebElement("/*//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(frameValue){
                if(frameValue === true){
                    driver.switchTo().frame(commUtil.changeToWebElement("/*//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(){
                        commUtil.changeToWebElement("/*//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[3]/span").click().then(function(){
                            commUtil.changeToWebElement("/*//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[3]/textarea").clear();
                            commUtil.changeToWebElement("/*//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[3]/textarea").sendKeys(teststepEditMap.CHANGETESTSTEPTO);
                        });
                        commUtil.changeToWebElement("/*//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[4]/textarea").click().then(function(){
                            commUtil.changeToWebElement("/*//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[4]/textarea").clear();
                            commUtil.changeToWebElement("/*//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[4]/textarea").sendKeys(teststepEditMap.CHANGEDATATO);
                        });
                        commUtil.changeToWebElement("/*//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[5]/textarea").click().then(function(){
                            commUtil.changeToWebElement("/*//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[5]/textarea").clear();
                            commUtil.changeToWebElement("/*//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[5]/textarea").sendKeys(teststepEditMap.CHANGERESULTTO);
                        });
                        xpathOfUpdateButton.click();
                    });
                    validateTeststepCreated(teststepEditMap.CHANGETESTSTEPTO,teststepEditMap.CHANGEDATATO,teststepEditMap.CHANGERESULTTO,(teststepEditMap.TESTSTEPID-1));
                    driver.switchTo().defaultContent();
                }
                else{
                    logger.info("i-frame not loaded.");
                }

            });

            return true;
        },30000,"Editing teststep failed.");
*/
    };
    var validateStep = function(stepEditMap, isValidatedStep){
        var stepNum = stepEditMap.STEPNUM;
        var step = stepEditMap.STEP;
        var data = stepEditMap.DATA;
        var result = stepEditMap.RESULT;

        var counter = 0;
        var size = 0;
        if(step !== "" || step == ""){
            size++;
        }
        if(data !== "" || data == ""){
            size++;
        }
        if(result !== "" || result == ""){
            size++;
        }
        var xpathForTestStepNum = "//*[@id='teststep-table']/descendant::td[@class='aui-restfultable-order']/following-sibling::td[text()='"+stepNum+"']";
        commUtil.moveToElementByXpath("//*[@id='teststep-table']", function(moveToStepStatus) {
            assert.ok(moveToStepStatus, "Not Moved To Step.");

            commUtil.getTextByXpath("//*[@id='teststep-table']/tbody[1]/tr["+stepNum+"]/td[3]/span", function(getTestStep){
                logger.info("Step "+getTestStep);
                if(getTestStep !== ""){
                    if(step.indexOf('[') != -1){
                        step = step.replace("[","");
                        logger.info(step);
                        step = step.replace("]","");
                        logger.info(step);
                        assert.equal(getTestStep, step, "Not Validated Step.");
                        logger.info("Step "+stepNum+" step Validated Successfully.");
                        counter++;
                        if(size === counter){
                            logger.info("Step "+stepNum+" Validated Successfully.");
                            isValidatedStep(true);
                        }
                    }else{
                        assert.equal(getTestStep, step, "Not Validated Step.");
                        logger.info("Step "+stepNum+" step Validated Successfully.");
                        counter++;
                        if(size === counter){
                            logger.info("Step "+stepNum+" Validated Successfully.");
                            isValidatedStep(true);
                        }
                    }

                }else {
                    assert.ok(getTestStep == "", "Not Validated Step.");
                    logger.info("Step "+stepNum+" step Validated Successfully.");
                    counter++;
                    if(size === counter){
                        logger.info("Step "+stepNum+" Validated Successfully.");
                        isValidatedStep(true);
                    }
                }
            });
            commUtil.getTextByXpath("//*[@id='teststep-table']/tbody[1]/tr["+stepNum+"]/td[4]/span", function(getTestStepData){
                if(getTestStepData !== ""){
                    if(data.indexOf('[') != -1) {
                        data = data.replace("[", "");
                        logger.info(data);
                        data = data.replace("]", "");
                        logger.info(data);
                        assert.equal(getTestStepData, data, "Not Validated Step Data.");
                        logger.info("Step "+stepNum+" data Validated Successfully.");
                        counter++;
                        if(size === counter){
                            logger.info("Step "+stepNum+" data Validated Successfully.");
                            isValidatedStep(true);
                        }
                    }else{
                        assert.equal(getTestStepData, data, "Not Validated Step Data.");
                        logger.info("Step "+stepNum+" data Validated Successfully.");
                        counter++;
                        if(size === counter){
                            logger.info("Step "+stepNum+" data Validated Successfully.");
                            isValidatedStep(true);
                        }
                    }
                }else {
                    assert.ok(getTestStepData == "", "Not Validated Step Data.");
                    logger.info("Step "+stepNum+" data Validated Successfully.");
                    counter++;
                    if(size === counter){
                        logger.info("Step "+stepNum+" Validated Successfully.");
                        isValidatedStep(true);
                    }
                }
            });
            commUtil.getTextByXpath("//*[@id='teststep-table']/tbody[1]/tr["+stepNum+"]/td[5]/span", function(getTestStepRes){
                if(getTestStepRes !== ""){
                    if(result.indexOf('[') != -1) {
                        result = result.replace("[", "");
                        logger.info(result);
                        result = result.replace("]", "");
                        logger.info(result);
                        assert.equal(getTestStepRes, result, "Not Validated Step Data.");
                        logger.info("Step "+stepNum+" result Validated Successfully.");
                        counter++;
                        if(size === counter){
                            logger.info("Step "+stepNum+" Validated Successfully.");
                            isValidatedStep(true);
                        }
                    }else{
                        assert.equal(getTestStepRes, result, "Not Validated Step Data.");
                        logger.info("Step "+stepNum+" result Validated Successfully.");
                        counter++;
                        if(size === counter){
                            logger.info("Step "+stepNum+" Validated Successfully.");
                            isValidatedStep(true);
                        }
                    }
                }else {
                    assert.ok(getTestStepRes == "", "Not Validated Step Data.");
                    logger.info("Step "+stepNum+" result Validated Successfully.");
                    counter++;
                    if(size === counter){
                        logger.info("Step "+stepNum+" Validated Successfully.");
                        isValidatedStep(true);
                    }
                }
            });
        });
        /*var counter = 0;
        var size = 0;
        if(stepEditMap.hasOwnProperty("STEP")){
            size++;
        }
        if(stepEditMap.hasOwnProperty("DATA")){
            size++;
        }
        if(stepEditMap.hasOwnProperty("RESULT")){
            size++;
        }
        commUtil.waitForElement("/*//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']", browser.params.testdata.implicitWaitTimeMedium, function(waitForStep){
            assert.ok(waitForStep, "Not Found Step");
            if(stepEditMap.hasOwnProperty("STEP")){
                //commUtil.getTextByXpath("/*//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']//td/span[@data-field-name='step']", function(getStep){
                commUtil.getAttributeValue("/*//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']", "data-step", function(getStep){
                    logger.info("Step : "+getStep+"::"+stepEditMap.STEP);
                    assert.ok(getStep === stepEditMap.STEP, "Not Sent Step.");
                    logger.info("Test Step Validated Successfully.");
                    counter++;
                    if(counter === size) {
                        assert.ok(counter === size, "Not Created Cycle.");
                        validateStatus(true);
                    }
                });

            }
            if(stepEditMap.hasOwnProperty("DATA")){
                //commUtil.getTextByXpath("/*//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']//td/span[@data-field-name='data']", function(gettestData){
                commUtil.getAttributeValue("/*//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']", "data-data", function(gettestData){
                    logger.info("Test Data : "+gettestData+"::"+stepEditMap.DATA);
                    assert.ok(gettestData === stepEditMap.DATA, "Not Validated Test Data.");
                    logger.info("Test Data Validated Successfully.");
                    counter++;
                    if(counter === size) {
                        assert.ok(counter === size, "Not Created Cycle.");
                        validateStatus(true);
                    }
                });
            }
            if(stepEditMap.hasOwnProperty("RESULT")){
                //commUtil.getTextByXpath("/*//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']//td/span[@data-field-name='result']", function(getTestResult){
                commUtil.getAttributeValue("/*//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+stepEditMap.STEPNUM+"']", "data-result", function(getTestResult){
                    logger.info("Test Result : "+getTestResult+"::"+stepEditMap.RESULT);
                    assert.ok(getTestResult === stepEditMap.RESULT, "Not Sent Step.");
                    logger.info("Test result Validated Successfully.");
                    counter++;
                    if(counter === size) {
                        assert.ok(counter === size, "Not Created Cycle.");
                        validateStatus(true);
                    }
                });
            }
        });*/
    };
    this.cloneTestStep = function(testStepMap, isStepCloned){
        validateViewTestPage(testStepMap.TESTNAME, function (validateTitleStatus) {
            assert.ok(validateTitleStatus, "Not Validated View Test page.");
            logger.info("View Test Page Validated Successfully.");
            commUtil.moveToElementByXpath("//*[text()='Test Details']", function (moveToIFrameStatus) {
                assert.ok(moveToIFrameStatus, "Not Moved To Test Step Frame.");
                commUtil.switchToFrameByXpath(xpathForIFrameForTestStep, function (switchToFrameStatus) {
                    assert.ok(switchToFrameStatus, "Not Switched To Test Step Frame Successfully.");
                    logger.info("Switched To Frame Successfully.");
                    returnTestSteps(function (totalSteps) {
                        logger.info("Total Steps : " + totalSteps);
                        //counter = totalSteps;
                       // logger.info(testStepMap.length - 1);
                        assert.ok(parseInt(testStepMap.STEPNUM) <= parseInt(totalSteps), "No steps are there for Clone.");
                        commUtil.getAttributeValue("//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+testStepMap.STEPNUM+"']", "data-id", function(getStepID){
                            assert.ok(getStepID != null, "Step ID Returning Null");
                            commUtil.doClick(driver.findElement(By.xpath("//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+testStepMap.STEPNUM+"']/td[@class='aui-restfultable-operations']/a[contains(@class, 'aui-steps-dropdown')]")), function(clickOnStepOptionLinkStatus){
                                assert.ok(clickOnStepOptionLinkStatus, "Not Clicked on Step Options.");
                                logger.info("Clicked On Step Options Link Successfully.");
                                var xpathForStepCloneActions = "//*[@id='step-"+getStepID+"-action-clone']";
                                logger.info(xpathForStepCloneActions);
                                commUtil.clickOnElementByXpath(xpathForStepCloneActions, function(clickOnCloneLInkStatus){
                                    assert.ok(clickOnCloneLInkStatus, "Not clicked On Clone Link.");
                                    logger.info("Clicked On Clone Link Successfully.");
                                    //changes because dev shifted clone and delete popup from iframe to outside
                                   // var xpathForClonePopupHeader = ".//*[@id='clone-entity-"+getStepID+"']//h2[contains(@class,'aui-dialog2')]";
                                    var xpathForClonePopupHeader= "//*[contains(@id,'ap-dialog')]//h2[contains(@class, 'aui-dialog2')]";
                                    driver.switchTo().defaultContent();
                                    driver.switchTo().defaultContent();
                                    commUtil.waitForElement(xpathForClonePopupHeader, browser.params.testdata.implicitWaitTimeMedium, function(waitForClonePopupStatus){
                                        assert.ok(waitForClonePopupStatus, "Not Visible Clone Popup.");
                                        commUtil.getTextByXpath(xpathForClonePopupHeader, function(getHeader){
                                            logger.info(getHeader);
                                            //assert.ok();
                                            commUtil.switchToFrameByXpath("//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__general-zephyr-dialog_provider']", function(switchToCloneIframeStatus){
                                                assert.ok(switchToCloneIframeStatus, "not Switched to Clone Iframe.");
                                                if("before step" === testStepMap.TYPE){
                                                    commUtil.clickOnElementByXpath("//*[@id='clone-append-above']", function(clickOnCloneBeforeStepStatus){
                                                        assert.ok(clickOnCloneBeforeStepStatus, "Not Clicked On Before Step Link On Clone Popup.");
                                                        logger.info("Clicked On Before Step Link On Clone popup.");

                                                        driver.switchTo().defaultContent();
                                                        driver.switchTo().defaultContent();
                                                        commUtil.clickOnElementByXpath("//button[text()='Clone']", function(clickOnCloneBtnStatus){
                                                            assert.ok(clickOnCloneBtnStatus, "Not Clicked On Clone Button.");
                                                            logger.info("Clicked On Clone Button.");
                                                            testStepMap["STEPNUM"] = parseInt(testStepMap.STEPNUM)+1;

                                                            commUtil.switchToFrameByXpath(xpathForIFrameForTestStep, function (switchToFrameStatus) {
                                                                assert.ok(switchToFrameStatus, "Not Switched To Test Step Frame Successfully.");
                                                                logger.info("Switched To Step Frame Successfully.");
                                                                getStepDetails(testStepMap, function(getStepDetails){
                                                                    assert.ok(getStepDetails, "Not Got step details.");
                                                                    testStepMap["STEP"] = "CLONE - "+testStepMap.STEP;
                                                                    testStepMap["STEPNUM"] = parseInt(testStepMap.STEPNUM) -1;
                                                                    returnTestSteps(function (totalStepsAfterClone) {
                                                                        logger.info("Total Steps after clone : " + totalStepsAfterClone);
                                                                        assert.ok( parseInt(totalSteps)+1 === parseInt(totalStepsAfterClone), "Total Steps After Clone Not Validated.");
                                                                        validateStep(testStepMap, function(validateStatus){
                                                                            assert.ok(validateStatus, "Not validated Step Status.");
                                                                            logger.info("Cloned Step validated Successfully.");
                                                                            isStepCloned(validateStatus);
                                                                        });
                                                                    });

                                                                });

                                                                driver.switchTo().defaultContent();
                                                            });

                                                        });
                                                    });
                                                }else if("after step" === testStepMap.TYPE){

                                                    driver.switchTo().defaultContent();
                                                    driver.switchTo().defaultContent();
                                                    commUtil.clickOnElementByXpath("//button[text()='Clone']", function(clickOnCloneBtnStatus){
                                                        assert.ok(clickOnCloneBtnStatus, "Not Clicked On Clone Button.");
                                                        logger.info("Clicked On Clone Button.");
                                                        //testStepMap["STEPNUM"] = parseInt(testStepMap.STEPNUM)+1;

                                                        commUtil.switchToFrameByXpath(xpathForIFrameForTestStep, function (switchToFrameStatus) {
                                                            assert.ok(switchToFrameStatus, "Not Switched To Test Step Frame Successfully.");
                                                            logger.info("Switched To Step Frame Successfully.");
                                                            getStepDetails(testStepMap, function(getStepDetails){
                                                                assert.ok(getStepDetails, "Not Got step details.");
                                                                testStepMap["STEP"] = "CLONE - "+testStepMap.STEP;
                                                                testStepMap["STEPNUM"] = parseInt(testStepMap.STEPNUM)+1;
                                                                returnTestSteps(function (totalStepsAfterClone) {
                                                                    logger.info("Total Steps after clone : " + totalStepsAfterClone);
                                                                    assert.ok( parseInt(totalSteps)+1 === parseInt(totalStepsAfterClone), "Total Steps After Clone Not Validated.");
                                                                    validateStep(testStepMap, function(validateStatus){
                                                                        assert.ok(validateStatus, "Not validated Step Status.");
                                                                        logger.info("Cloned Step validated Successfully.");
                                                                        isStepCloned(validateStatus);
                                                                    });
                                                                });

                                                            });

                                                            driver.switchTo().defaultContent();
                                                        });

                                                    });
                                                    /*commUtil.clickOnElementByXpath("/*//*[@id='clone-entity-dialog-Clone-button']", function(clickOnCloneBtnStatus){
                                                        assert.ok(clickOnCloneBtnStatus, "Not Clicked On Clone Button.");
                                                        logger.info("Clicked On Clone Button.");

                                                        getStepDetails(testStepMap, function(getStepDetails){
                                                            assert.ok(getStepDetails, "Not Got step details.");
                                                            testStepMap["STEP"] = "CLONE - "+testStepMap.STEP;
                                                            testStepMap["STEPNUM"] = parseInt(testStepMap.STEPNUM)+1;
                                                            returnTestSteps(function (totalStepsAfterClone) {
                                                                logger.info("Total Steps after clone : " + totalStepsAfterClone);
                                                                assert.ok( parseInt(totalSteps)+1 === parseInt(totalStepsAfterClone), "Total Steps After Clone Not Validated.");
                                                                validateStep(testStepMap, function(validateStatus){
                                                                    assert.ok(validateStatus, "Not validated Step Status.");
                                                                    logger.info("Cloned Step validated Successfully.");
                                                                    isStepCloned(validateStatus);
                                                                });
                                                            });

                                                        });

                                                    });*/
                                                }else if("step at" === testStepMap.TYPE){
                                                    commUtil.sendTextToElement("//*[@id='clone-insert-at']", testStepMap.CLONEAT , function(clickOnCloneBeforeStepStatus){
                                                        assert.ok(clickOnCloneBeforeStepStatus, "Not Clicked On Before Step Link On Clone Popup.");
                                                        logger.info("Clicked On Before Step Link On Clone popup.");

                                                        driver.switchTo().defaultContent();
                                                        driver.switchTo().defaultContent();
                                                        commUtil.clickOnElementByXpath("//button[text()='Clone']", function(clickOnCloneBtnStatus){
                                                            assert.ok(clickOnCloneBtnStatus, "Not Clicked On Clone Button.");
                                                            logger.info("Clicked On Clone Button.");
                                                            //testStepMap["STEPNUM"] = parseInt(testStepMap.STEPNUM)+1;

                                                            commUtil.switchToFrameByXpath(xpathForIFrameForTestStep, function (switchToFrameStatus) {
                                                                assert.ok(switchToFrameStatus, "Not Switched To Test Step Frame Successfully.");
                                                                logger.info("Switched To Step Frame Successfully.");
                                                                getStepDetails(testStepMap, function(getStepDetails){
                                                                    assert.ok(getStepDetails, "Not Got step details.");
                                                                    testStepMap["STEP"] = "CLONE - "+testStepMap.STEP;
                                                                    testStepMap["STEPNUM"] = parseInt(testStepMap.CLONEAT);
                                                                    returnTestSteps(function (totalStepsAfterClone) {
                                                                        logger.info("Total Steps after clone : " + totalStepsAfterClone);
                                                                        assert.ok( parseInt(totalSteps)+1 === parseInt(totalStepsAfterClone), "Total Steps After Clone Not Validated.");
                                                                        validateStep(testStepMap, function(validateStatus){
                                                                            assert.ok(validateStatus, "Not validated Step Status.");
                                                                            logger.info("Cloned Step validated Successfully.");
                                                                            isStepCloned(validateStatus);
                                                                        });
                                                                    });

                                                                });

                                                                driver.switchTo().defaultContent();
                                                            });

                                                        });

                                                        /*commUtil.clickOnElementByXpath("/*//*[@id='clone-entity-dialog-Clone-button']", function(clickOnCloneBtnStatus){
                                                            assert.ok(clickOnCloneBtnStatus, "Not Clicked On Clone Button.");
                                                            logger.info("Clicked On Clone Button.");
                                                            getStepDetails(testStepMap, function(getStepDetails){
                                                                assert.ok(getStepDetails, "Not Got step details.");
                                                                testStepMap["STEP"] = "CLONE - "+testStepMap.STEP;
                                                                testStepMap["STEPNUM"] = parseInt(testStepMap.CLONEAT);
                                                                returnTestSteps(function (totalStepsAfterClone) {
                                                                    logger.info("Total Steps after clone : " + totalStepsAfterClone);
                                                                    assert.ok( parseInt(totalSteps)+1 === parseInt(totalStepsAfterClone), "Total Steps After Clone Not Validated.");
                                                                    validateStep(testStepMap, function(validateStatus){
                                                                        assert.ok(validateStatus, "Not validated Step Status.");
                                                                        logger.info("Cloned Step validated Successfully.");
                                                                        isStepCloned(validateStatus);
                                                                    });
                                                                });
                                                            });
                                                        });*/
                                                    });
                                                }else if("last step" === testStepMap.TYPE){
                                                    commUtil.clickOnElementByXpath("//*[@id='clone-append-end']", function(clickOnCloneBeforeStepStatus){
                                                        assert.ok(clickOnCloneBeforeStepStatus, "Not Clicked On Before Step Link On Clone Popup.");
                                                        logger.info("Clicked On End Step Link On Clone popup.");

                                                        driver.switchTo().defaultContent();
                                                        driver.switchTo().defaultContent();
                                                        commUtil.clickOnElementByXpath("//button[text()='Clone']", function(clickOnCloneBtnStatus){
                                                            assert.ok(clickOnCloneBtnStatus, "Not Clicked On Clone Button.");
                                                            logger.info("Clicked On Clone Button.");
                                                            //testStepMap["STEPNUM"] = parseInt(testStepMap.STEPNUM)+1;

                                                            commUtil.switchToFrameByXpath(xpathForIFrameForTestStep, function (switchToFrameStatus) {
                                                                assert.ok(switchToFrameStatus, "Not Switched To Test Step Frame Successfully.");
                                                                logger.info("Switched To Step Frame Successfully.");
                                                                getStepDetails(testStepMap, function(getStepDetails){
                                                                    assert.ok(getStepDetails, "Not Got step details.");
                                                                    testStepMap["STEP"] = "CLONE - "+testStepMap.STEP;
                                                                    //testStepMap["STEPNUM"] = parseInt(testStepMap.STEPNUM) -1;
                                                                    returnTestSteps(function (totalStepsAfterClone) {
                                                                        testStepMap["STEPNUM"] = parseInt(totalStepsAfterClone);
                                                                        logger.info("Total Steps after clone : " + totalStepsAfterClone);
                                                                        assert.ok( parseInt(totalSteps)+1 === parseInt(totalStepsAfterClone), "Total Steps After Clone Not Validated.");
                                                                        validateStep(testStepMap, function(validateStatus){
                                                                            assert.ok(validateStatus, "Not validated Step Status.");
                                                                            logger.info("Cloned Step validated Successfully.");
                                                                            isStepCloned(validateStatus);
                                                                        });
                                                                    });

                                                                });

                                                                driver.switchTo().defaultContent();
                                                            });

                                                        });

                                                        /*commUtil.clickOnElementByXpath("/*//*[@id='clone-entity-dialog-Clone-button']", function(clickOnCloneBtnStatus){
                                                            assert.ok(clickOnCloneBtnStatus, "Not Clicked On Clone Button.");
                                                            logger.info("Clicked On Clone Button.");
                                                            getStepDetails(testStepMap, function(getStepDetails){
                                                                assert.ok(getStepDetails, "Not Got step details.");
                                                                testStepMap["STEP"] = "CLONE - "+testStepMap.STEP;

                                                                returnTestSteps(function (totalStepsAfterClone) {
                                                                    testStepMap["STEPNUM"] = parseInt(totalStepsAfterClone);
                                                                    logger.info("Total Steps after clone : " + totalStepsAfterClone);
                                                                    assert.ok( parseInt(totalSteps)+1 === parseInt(totalStepsAfterClone), "Total Steps After Clone Not Validated.");
                                                                    validateStep(testStepMap, function(validateStatus){
                                                                        assert.ok(validateStatus, "Not validated Step Status.");
                                                                        logger.info("Cloned Step validated Successfully.");
                                                                        isStepCloned(validateStatus);
                                                                    });
                                                                });

                                                            });

                                                        });*/
                                                    });
                                                }
                                                driver.switchTo().defaultContent();
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
    this.deleteTestStep = function(testStepMap, isStepdeleted){
        validateViewTestPage(testStepMap.TESTNAME, function (validateTitleStatus) {
            assert.ok(validateTitleStatus, "Not Validated View Test page.");
            logger.info("View Test Page Validated Successfully.");
            commUtil.moveToElementByXpath("//*[text()='Test Details']", function (moveToIFrameStatus) {
                assert.ok(moveToIFrameStatus, "Not Moved To Test Step Frame.");
                commUtil.switchToFrameByXpath(xpathForIFrameForTestStep, function (switchToFrameStatus) {
                    assert.ok(switchToFrameStatus, "Not Switched To Test Step Frame Successfully.");
                    logger.info("Switched To Frame Successfully.");
                    returnTestSteps(function (totalSteps) {
                        logger.info("Total Steps : " + totalSteps);
                        //counter = totalSteps;
                        // logger.info(testStepMap.length - 1);
                        assert.ok(parseInt(testStepMap.STEPNUM) <= parseInt(totalSteps), "No steps are there for Delete.");
                        commUtil.getAttributeValue("//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+testStepMap.STEPNUM+"']", "data-id", function(getStepID){
                            assert.ok(getStepID != null, "Step ID Returning Null");
                            getStepDetails(testStepMap, function(getStepDetails) {
                                assert.ok(getStepDetails, "Not Got step details.");
                                commUtil.doClick(driver.findElement(By.xpath("//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+testStepMap.STEPNUM+"']/td[@class='aui-restfultable-operations']/a[contains(@class, 'aui-steps-dropdown')]")), function(clickOnStepOptionLinkStatus){
                                    assert.ok(clickOnStepOptionLinkStatus, "Not Clicked on Step Options.");
                                    logger.info("Clicked On Step Options Link Successfully.");
                                    //var xpathForStepCloneActions = "//*[@id='step-"+getStepID+"-action-clone']";
                                    var xpathForStepDeleteActions = "//*[@id='step-"+getStepID+"-operations-trigger']";
                                    logger.info(xpathForStepDeleteActions);
                                    commUtil.clickOnElementByXpath(xpathForStepDeleteActions, function(clickOnDeleteLInkStatus){
                                        assert.ok(clickOnDeleteLInkStatus, "Not clicked On Delete Link.");
                                        logger.info("Clicked On Delete Link Successfully.");

                                        driver.switchTo().defaultContent();
                                        driver.switchTo().defaultContent();
                                        var xpathForDeletePopupHeader = "//*[contains(@id,'ap-dialog')]//h2[contains(@class, 'aui-dialog2')]";
                                        //var xpathForDeletePopupHeader = "//*[@id='delete-entity-"+getStepID+"']//h2[contains(@class,'aui-dialog2')]";
                                        commUtil.waitForElement(xpathForDeletePopupHeader, browser.params.testdata.implicitWaitTimeMedium, function(waitForDeletePopupStatus){
                                            assert.ok(waitForDeletePopupStatus, "Not Visible Delete Popup.");
                                            commUtil.getTextByXpath(xpathForDeletePopupHeader, function(getHeader){
                                                logger.info(getHeader);

                                                commUtil.clickOnElementByXpath("//button[text()='Delete']", function(clickOnDeleteBtnStatus){
                                                    assert.ok(clickOnDeleteBtnStatus, "Not Clicked On delete Button.");
                                                    logger.info("Clicked On Delete Button.");
                                                    commUtil.switchToFrameByXpath(xpathForIFrameForTestStep, function (switchToFrameStatus) {
                                                        assert.ok(switchToFrameStatus, "Not Switched To Test Step Frame Successfully.");
                                                        logger.info("Switched To Frame Successfully.");

                                                        returnTestSteps(function (totalStepsAfterClone) {
                                                            logger.info("Total Steps after clone : " + totalStepsAfterClone);
                                                            assert.ok( parseInt(totalSteps) - 1 === parseInt(totalStepsAfterClone), "Total Steps After Clone Not Validated.");
                                                            logger.info("Step Deleted Successfully.");
                                                            isStepdeleted(true);
                                                        });
                                                        driver.switchTo().defaultContent();
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
    var getStepDetails = function(testStepMap, isGetStepDetails){
        var xpathForStep = "//*[@id='teststep-table']/tbody[@class='ui-sortable']/tr[@data-orderid='"+testStepMap.STEPNUM+"']";
        commUtil.waitForElement(xpathForStep, browser.params.testdata.implicitWaitTimeMedium, function(waitForStep){
            assert.ok(waitForStep, "step Not Found.");
            commUtil.getAttributeValue(xpathForStep, "data-step", function(getStep){
                testStepMap["STEP"] = getStep;
                commUtil.getAttributeValue(xpathForStep, "data-data", function(getStepData){
                    testStepMap["DATA"] = getStepData;
                    commUtil.getAttributeValue(xpathForStep, "data-result", function(getStepResult){
                        testStepMap["RESULT"] = getStepResult;
                        isGetStepDetails(true);
                    });
                });
            });
        });
    };

    this.cloneTeststepByEnteringValidNumber = function(teststepToBeCloned, cloneAtPos){
        driver.wait(function () {
            commUtil.waitForElementByXpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']");
            commUtil.isElementDisplayed(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function (frameValue) {
                if(frameValue === true){
                    driver.switchTo().frame(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(){
                        driver.findElements(by.xpath("//tbody[@class='ui-sortable']/tr/td[2]")).then(function(totalTeststeps){
                            if(cloneAtPos <= (totalTeststeps.length+1)){
                                logger.info("position entered is valid.");
                                commUtil.getAttributeValueUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepToBeCloned+"]//div"),"id").then(function(idValue){
                                    commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepToBeCloned+"]/td[6]/a/span").click().then(function(){
                                        commUtil.changeToWebElement("//*[@id='"+idValue+"']//li[1]//a").click().then(function(){
                                            driver.sleep(1000);
                                            var divIdToClone = idValue.split('-dd-');
                                            CloneTeststepPage.cloneTeststepByEnteringValidNumber("clone-entity-"+divIdToClone[1],cloneAtPos);
                                        });
                                        validateClonedTeststep(cloneAtPos);
                                    });
                                });
                            }
                            else{
                                logger.info("position entered is invalid.");
                            }
                        });

                    });
                    driver.switchTo().defaultContent();
                }
                else{
                    logger.info("iframe not loaded.");
                }

            });

            return true;
        },30000,"cloning test step at a valid number failed.");
    };

    this.cloneTeststepInsertAfterStep = function(teststepToBeCloned){
        driver.wait(function () {
            commUtil.isElementDisplayed(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function (frameValue) {
                if(frameValue === true){
                    driver.switchTo().frame(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(){
                        commUtil.waitForElementByXpath("//tbody[@class='ui-sortable']/tr/td[2]");
                        driver.findElements(by.xpath("//tbody[@class='ui-sortable']/tr/td[2]")).then(function(totalTeststeps){
                            if(teststepToBeCloned <= (totalTeststeps.length+1)){
                                logger.info("position entered is valid.");
                                commUtil.getAttributeValueUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepToBeCloned+"]//div"),"id").then(function(idValue){
                                    commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepToBeCloned+"]/td[6]/a/span").click().then(function(){
                                        commUtil.changeToWebElement("//*[@id='"+idValue+"']//li[1]//a").click().then(function(){
                                            driver.sleep(1000);
                                            var divIdToClone = idValue.split('-dd-');
                                            CloneTeststepPage.cloneTeststepInsertAfterStep("clone-entity-"+divIdToClone[1]);
                                        });
                                        validateClonedTeststep(teststepToBeCloned);
                                    });

                                });
                            }
                            else{
                                logger.info("position entered is invalid.");
                            }
                        });
                    });
                    driver.switchTo().defaultContent();
                }
                else{
                    logger.info("iframe not loaded.");
                }

            });
            return true;
        },30000,"cloning test step at a valid number failed.");
    };




    this.cloneTest = function(cloneTestMap, isCloned){
        try{
            commUtil.waitForElement("//*[@id='opsbar-operations_more']/span[text()='More']", browser.params.testdata.implicitWaitTimeMedium, function(waitForMoreStatus){
                assert.ok(waitForMoreStatus, "Not Found More Link.");
                commUtil.clickOnElementByXpath("//*[@id='opsbar-operations_more']/span[text()='More']", function(clickOnMoreLink){
                    assert.ok(clickOnMoreLink, "Not clicked On More Link.");
                    cloneTestMap["CLONEDTEST"] = cloneTestMap.TESTNAME;
                    delete cloneTestMap["TESTNAME"];
                    commUtil.clickOnElementByXpath("//*[@id='clone-issue']", function(clickOnCloneLinkStatus){
                        assert.ok(clickOnCloneLinkStatus, "Not Clicked On Clone Link.");
                        logger.info("Clicked On Clone Link.");
                        CloneTestPage.cloneTest(cloneTestMap, function(isClonedTest){
                            assert.ok(isClonedTest, "not Cloned Test.");
                            validateTest(cloneTestMap, function(isValidateTest) {
                                assert.ok(isValidateTest, "Not Validated Test.");
                                logger.info("Test validated Successfully.");
                                validateClonedTest(cloneTestMap, function(isValidateClonedTest){
                                    assert.ok(isValidateClonedTest, "Not Validated Cloned Test.");
                                    logger.info("Cloned Test validated Successfully.");
                                    isCloned(isValidateClonedTest);
                                });
                            });
                        });
                    });
                });
            });
        }catch(e){
            isCloned(false);
        }
    };

     this.validateTestReturnFromExecuteTestPage = function (testName, isValidateReturnFromExecuteTestPage) {
        try{
            validateViewTestPage(testName, function (validateTitleStatus) {
                assert.ok(validateTitleStatus, "Not Validated View Test page.");
                logger.info("View Test Page Validated Successfully.");
                isValidateReturnFromExecuteTestPage(validateTitleStatus);
            });
        }catch(e){
            console.error(e);
            isValidateReturnFromExecuteTestPage(false);
        }
    };
    this.addTestToCycle = function (versionName, cycleName, testName, callback) {
        try {
            validateViewTestPage(testName, function (validateTitleStatus) {
                assert.ok(validateTitleStatus, "Not Validated View Test page.");
                logger.info("View Test Page Validated Successfully.");

                commUtil.clickOnElementByXpath("//a/*[text()='Add to Test Cycle(s)']", function (clickOnAddTestCycleLinkStatus) {
                    assert.ok(clickOnAddTestCycleLinkStatus, "Not clicked On Add Test To Cycle Button.");
                    logger.info("Clicked On Add Test To Cycle Link.");
                    addTestToCycle(versionName, cycleName, function (handleAddTestToCyclePopupStatus) {
                        assert.ok(handleAddTestToCyclePopupStatus, "Not Added Test To Cycle.");
                        logger.info("Test is Added Successfully.");
                        validateTestAfterAdd(versionName, cycleName, function (validateStatus) {
                            assert.ok(validateStatus, "Not validated Added Test  in Cycle.");
                            callback(validateStatus);
                        });
                    });
                });
            });

        } catch (err) {
            callback(false);
        }
    };
    addTestToCycle = function (versionName, cycleName, isAddedTestToCycle) {
        try {
            var xpathForAddTestToCycleDialog = "//*[@id='add-to-test-cycle']";
            var xpathForAddTestToCycleDialogHeader = "//*[@id='add-to-test-cycle']/descendant::h2[contains(@class, 'aui-dialog2')]";
            var xpathForAddTestToCycleDialogVersionDropDown = "//*[@id='add-to-test-cycle']/descendant::select[@id='project_version']";
            var xpathForAddTestToCycleDialogCycleDropDown = "//*[@id='add-to-test-cycle']/descendant::select[@id='cycle_names']";
            var xpathForAddTestToCycleDialogAddBtn = "//*[@id='add-to-test-cycle-dialog-delete-button']";
            commUtil.switchToFrameByXpath(xpathForIFrameForAddTestToCycle, function (frameSwitchStatus) {
                assert.ok(frameSwitchStatus, "Not Switched To Add Test to cycle frame.");
                logger.info("Clicked Successfully on Add Test To Cycle Link.");
                commUtil.waitForElement(xpathForAddTestToCycleDialog, browser.params.testdata.implicitWaitTimeMedium, function (waitForAddTestToCycleDialogStatus) {
                    assert.ok(waitForAddTestToCycleDialogStatus, "Not Waited For ");
                    logger.info("Now Add Test to Cycle Dialog Visible.");
                    commUtil.getTextByXpath(xpathForAddTestToCycleDialogHeader, function (getHeaderText) {
                        assert.ok(getHeaderText, "Add to Test Cycle(s)", "Add Test to cycle Header Validated Successfully.");
                        commUtil.waitForElement(xpathForAddTestToCycleDialogVersionDropDown, browser.params.testdata.implicitWaitTimeMedium, function(waitForVersionSelectDropDown){
                            assert.ok(waitForVersionSelectDropDown, "Not Visible Version drop Down.");
                            commUtil.selectDropdownByText(driver.findElement(By.xpath(xpathForAddTestToCycleDialogVersionDropDown)), versionName, function (selectVersionStatus) {
                                assert.ok(selectVersionStatus, "Not Selected Version Drop Down.");
                                logger.info("Version Is Selected Successfully.");
                                driver.sleep(1000);
                                var until = require('selenium-webdriver').until;
                               // var until = protractor.ExpectedConditions;
                                //driver.wait(until.presenceOf(By.xpath(xpathForAddTestToCycleDialogCycleDropDown)), 5000);
                                driver.wait(until.elementLocated(By.xpath(xpathForAddTestToCycleDialogCycleDropDown)), 10000);
                                //button.click();
                                logger.info("Version Is Selected Successfully..");
                                commUtil.selectDropdownByText(driver.findElement(By.xpath(xpathForAddTestToCycleDialogCycleDropDown)), cycleName, function (selectCycleStatus) {
                                    logger.info("Value : "+selectCycleStatus);
                                    assert.ok(selectCycleStatus, "Not Selected Cycle Drop Down.");
                                    logger.info("Cycle Is Selected Successfully.");

                                    commUtil.clickOnElementByXpath(xpathForAddTestToCycleDialogAddBtn, function (clickOnAddBtnStatus) {
                                        assert.ok(clickOnAddBtnStatus, "Not Clicked On Add button.");
                                        logger.info("Clicked On Add Test To Cycle Add Button.");
                                        commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                                        driver.sleep(2000);
                                        isAddedTestToCycle(clickOnAddBtnStatus);
                                        /*commUtil.isElementInVisible(xpathForAddTestToCycleDialogAddBtn, function (waitForInVisibleStatus) {
                                         assert.ok(waitForInVisibleStatus, "Add Test To cycle Add Button is Still Visible.");
                                         isAddedTestToCycle(waitForInVisibleStatus);
                                         });*/
                                    });
                                });
                            });
                        });
                    });
                });
                driver.switchTo().defaultContent();
            });
        } catch (err) {
            console.error(err);
            isAddedTestToCycle(false);
        }
    };
    changeTestExecStatusInViewTestPage = function (versionName, cycleName, changeStatus, isChangeStatus) {
        try {
            var xpathForCurrentExecStatus = ".//*[@id='ztestSchedulesTable']/descendant::tr[td[text()='" + versionName + "']][td/a[text()='" + cycleName + "']]/descendant::dd[contains(@id, 'current-execution-status-dd-schedule')]";
            var xpathForStatusSelectDrpDwn = ".//*[@id='ztestSchedulesTable']/descendant::tr[td[text()='" + versionName + "']][td/a[text()='" + cycleName + "']]/descendant::select[contains(@id, 'exec_status-schedule')]";
            var xpathForStatusUpdateBtn = ".//*[@id='ztestSchedulesTable']/descendant::tr[td[text()='" + versionName + "']][td/a[text()='" + cycleName + "']]/descendant::button[contains(@id, 'exec_status_update-schedule')]";
            commUtil.moveToElementByXpath("//*[@id='ztestSchedulesTable']/thead/tr/th[text()='Version']", function(moveToElementStatus){
                assert.ok(moveToElementStatus, "Not Moved To Element.");
                commUtil.hoverElementByXpath(xpathForCurrentExecStatus, function(hoverOnSelectDrpDwnStatus) {
                    assert.ok(hoverOnSelectDrpDwnStatus, "Not Hovered On Current Execution Status.");
                    commUtil.clickOnElementByXpath(xpathForCurrentExecStatus, function (elementClickStatus) {
                        assert.ok(elementClickStatus, "Not Clicked On Current Execution Status for Change Status.");
                        //commUtil.sleep(2000);
                        //commUtil.waitForElement(xpathForStatusSelectDrpDwn, function(waitElementStatus){
                        //expect(waitElementStatus).toBe.true;
                        logger.info("Clicked On Current Execution Status and waited for select drop down.");
                        //logger.info("======="+driver.isElementPresent(By.xpath(xpathForStatusSelectDrpDwn)));
                        //logger.info(driver.findElement(By.xpath(xpathForStatusSelectDrpDwn)).isDisplayed());
//                    /commUtil.selectDropdownByText(element(By.xpath(xpathForStatusSelectDrpDwn)), changeStatus, function(flag){
                        logger.info("================================== select drop down"+changeStatus);
                        commUtil.hoverElementByXpath(xpathForStatusSelectDrpDwn, function (hoverOnSelectDrpDwnStatus) {
                            assert.ok(hoverOnSelectDrpDwnStatus, "Not hover On Select drop Down.");
                            logger.info("================================== select drop down"+changeStatus);

                            commUtil.selectDropdownByText(driver.findElement(By.xpath(xpathForStatusSelectDrpDwn)), changeStatus, function (isSelectedDropDown) {
                                // commUtil.selectOption(driver.findElement(By.xpath(xpathForStatusSelectDrpDwn)), changeStatus, function (flag) {
                                assert.ok(isSelectedDropDown, "Not Selected Status Drop Down.");
                                //commUtil.sleep(1000);
                                logger.info("====================");
                                commUtil.clickOnElementByXpath(xpathForStatusUpdateBtn, function (clickOnUpdateBtnStatus) {
                                    assert.ok(clickOnUpdateBtnStatus, "Not Clicked On Status Update Button.");
                                    logger.info("====================");
                                    isChangeStatus(clickOnUpdateBtnStatus);
                                    /*commUtil.isElementInVisible(xpathForCurrentExecStatus, function(isVisibleStatusUpdateBtn){
                                        assert.ok(isVisibleStatusUpdateBtn, "Status is Not Committed till now.");
                                        isChangeStatus(clickOnUpdateBtnStatus);
                                    });*/
                                });
                            });
                        });
                        //});
                    });
                });
            });
        } catch (err) {
            console.error(err);
        }
    };
    validateSuccessfulPopupInViewTestPage = function (isValidateSuccessfulPopup) {
        try {
            driver.switchTo().defaultContent();
            commUtil.waitForElement("//div[contains(text(),'Successfully Executed Test.')]", browser.params.testdata.implicitWaitTimeMedium, function (waitElementStatus) {
                assert.ok(waitElementStatus, "Successful Message popup Not Visible.");
                commUtil.switchToFrameByXpath(xpathForIFrameForExec, function (frameSwitchStatus) {
                    assert.ok(frameSwitchStatus, "Not Switched To Frame.");
                    logger.info("Switched Successfully to IFrame Successfully After Validating Successful Popup.");
                    isValidateSuccessfulPopup(frameSwitchStatus);
                });
            });
        } catch (err) {
            console.error(err);
            isValidateSuccessfulPopup(false);
        }
    };
    getExecutedByInViewTestPage = function (versionName, cycleName, callback) {
        commUtil.getTextByXpath(".//*[@id='ztestSchedulesTable']/descendant::tr[td[text()='" + versionName + "']][td/a[text()='" + cycleName + "']]/descendant::td[contains(@id, 'executed-by-schedule')]", function (getExecByStatus) {
            callback(getExecByStatus);
        });
    };
    getExecutedOnInViewTestPage = function (versionName, cycleName, callback) {
        commUtil.getTextByXpath(".//*[@id='ztestSchedulesTable']/descendant::tr[td[text()='" + versionName + "']][td/a[text()='" + cycleName + "']]/descendant::td[contains(@id, 'executed-on-schedule')]", function (getExecOn) {
            callback(getExecOn);
        });
    };
    getCurrentExecutionInViewTestPage = function (versionName, cycleName, callback) {
        var xpathForCurrentExecStatus = ".//*[@id='ztestSchedulesTable']/descendant::tr[td[text()='" + versionName + "']][td/a[text()='" + cycleName + "']]/descendant::dd[contains(@id, 'current-execution-status-dd-schedule')]";
        commUtil.getTextByXpath(xpathForCurrentExecStatus, function (getCurrentExec) {
            callback(getCurrentExec);
        });
    };
    validateCurrentExecInViewTestPage = function (versionName, cycleName, currentStatus, callback) {
        getCurrentExecutionInViewTestPage(versionName, cycleName, function (getCurrentStatus) {
            logger.info(currentStatus + ":::" + getCurrentStatus);
            assert.equal(currentStatus, getCurrentStatus, "CurrentExecution Status is not validated in Plan Test Cycle.");
            callback(true);
        });
    };

    refreshExecutionTable = function (isRefreshExecutionTable) {
        try {
            var xpathForRefreshButton = "//*[@id='ztestSchedulesTable']/descendant::th/a[@id='refresh-executions']";
            commUtil.clickOnElementByXpath(xpathForRefreshButton, function (refreshExecutionStatus) {
                assert.ok(refreshExecutionStatus, "Not Clicked On Refresh Button.");
                commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                commUtil.isElementVisible("//*[@id='ztestSchedulesTable']", function (isElementVisibleStatus) {
                    assert.ok(isElementVisibleStatus, "Refresh Table is Not visible.");
                    isRefreshExecutionTable(isElementVisibleStatus);
                });
            });
        } catch (err) {
            console.error(err);
            isRefreshExecutionTable(false);
        }
    };
    validateTestAfterAdd = function (versionName, cycleName, isValidateTestAfterAdd) {
        try {
            driver.switchTo().defaultContent();
            commUtil.moveToElementByXpath(xpathForTestDetailsTable, function(moveToTestTableStatus){
                assert.ok(moveToTestTableStatus, "Not Moved To Test Details Table.");
                commUtil.moveToElementByXpath(xpathForTestDetailsTable, function(moveToTestExecTableStatus) {
                    assert.ok(moveToTestExecTableStatus, "Not Moved To Test Execution Details Table.");

                    commUtil.switchToFrameByXpath(xpathForIFrameForExec, function (frameSwitchStatus) {
                        assert.ok(frameSwitchStatus, "Not Switched To Frame.");
                        logger.info("Switched Successfully to Test Execution IFrame Successfully.");
                        //commUtil.sleep(3000);
                        refreshExecutionTable(function (refreshExecStatus) {
                            assert.ok(refreshExecStatus, "Not Refreshed Execution Table.");
                            logger.info("Execution Table Refreshed Successfully");
                            commUtil.searchTextFromElements(".//*[@id='ztestSchedulesTable']/tbody/tr/td[@class='zephyr-test-execution-entry-version']", versionName, function (searchVersionStatus) {
                                assert.ok(searchVersionStatus, "Not validated Version.");
                                logger.info("Version is Validated Successfully..");
                                commUtil.searchTextFromElements(".//*[@id='ztestSchedulesTable']/tbody/tr/td[@class='zephyr-test-execution-entry-cycle']", cycleName, function (searchCycleStatus) {
                                    assert.ok(searchCycleStatus, "Not Validated Cycle.");
                                    logger.info("Cycle is Validated.");
                                    isValidateTestAfterAdd(searchCycleStatus);
                                });
                            });
                        });
                        driver.switchTo().defaultContent();
                    });
                });
            });
        } catch (err) {
            console.error(err);
            isValidateTestAfterAdd(false);
        }
    };
    var executeTestDirectlyFromViewTestPage = function(executeTestMap, isExecuteTestDirectly){
        try{
            commUtil.switchToFrameByXpath(xpathForIFrameForExec, function (frameSwitchStatus) {
                assert.ok(frameSwitchStatus, "Not Switched To IFrame.");
                logger.info("Switched Successfully to IFrame Successfully.");

                refreshExecutionTable(function (refreshExecStatus) {
                    assert.ok(refreshExecStatus, "Not Refreshed Execution Table.");
                    logger.info("Execution Table Refreshed Successful");
                    changeTestExecStatusInViewTestPage(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.EXECUTETESTDIRECTLY, function (changeExecStatus) {
                        assert.ok(changeExecStatus, "Not Refreshed Execution Table.");
                        logger.info("Test is Executed Successfully.");

                        validateSuccessfulPopupInViewTestPage(function(validateSuccessfulPopup){
                            assert.ok(validateSuccessfulPopup, "Not Refreshed Execution Table.");
                            validateCurrentExecInViewTestPage(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.EXECUTETESTDIRECTLY, function(validateCurrentStatus){
                                assert.ok(validateCurrentStatus, "Not Refreshed Execution Table.");
                                logger.info("Execution Status is Validated Successfully.");
                                isExecuteTestDirectly(validateCurrentStatus);
                            });
                        });
                    });
                });
                driver.switchTo().defaultContent();
            });
        }catch(e){
            console.error(e);
            isExecuteTestDirectly(false);
        }
    };
    this.validateExecutionsFromViewTestPage = function(executeTestMap, isValidatedTest){
        try{
            validateViewTestPage(executeTestMap.TESTNAME, function (validateTitleStatus) {
                assert.ok(validateTitleStatus, "Not Validated View Test page.");
                logger.info("View Test Page Validated Successfully.");

                commUtil.moveToElementByXpath(xpathForTestDetailsTable, function(moveToTestTableStatus) {
                    assert.ok(moveToTestTableStatus, "Not Moved To Test Details Table.");
                    commUtil.moveToElementByXpath(xpathForTestDetailsTable, function (moveToTestExecTableStatus) {
                        assert.ok(moveToTestExecTableStatus, "Not Moved To Test Execution Details Table.");

                        commUtil.switchToFrameByXpath(xpathForIFrameForExec, function (frameSwitchStatus) {
                            assert.ok(frameSwitchStatus, "Not Switched To IFrame.");
                            logger.info("Switched Successfully to IFrame Successfully.");

                            refreshExecutionTable(function (refreshExecStatus) {
                                assert.ok(refreshExecStatus, "Not Refreshed Execution Table.");
                                logger.info("Execution Table Refreshed Successful");
                                validateCurrentExecInViewTestPage(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTSTATUS, function(validateCurrentStatus){
                                    assert.ok(validateCurrentStatus, "Not Refreshed Execution Table.");
                                    logger.info("Execution Status is Validated Successfully.");
                                    isValidatedTest(validateCurrentStatus);
                                });
                            });
                            driver.switchTo().defaultContent();
                        });
                    });
                });
            });
        }catch(e){
            console.error(e);
            isValidatedTest(false);
        }
    };
    /*this.executeTestDirectlyViewTestPage = function (versionName, cycleName, testName, changeStatus, callback) {
        try {
            validateViewTestPage(testName, function (validateTitleStatus) {
                assert.ok(validateTitleStatus, "Not validated View Test Page.");
                logger.info("View Test Page Validated Successfully.");

                commUtil.moveToElementByXpath()

                closeTestStepTable("close", function (closeStepTableStatus) {
                    commUtil.switchToFrameByxpath(xpathForIframeForExec, function (frameSwitchStatus) {
                        expect(frameSwitchStatus).toBe.true;
                        logger.info("Switched Successfully to Iframe Successfully.");
                        commUtil.sleep(3000);
                        refreshExecutionTable(function (refreshExecStatus) {
                            expect(refreshExecStatus).toBe.true;
                            logger.info("Execution Table Refreshed Successful");
                            changeTestExecStatusInViewTestPage(versionName, cycleName, testName, changeStatus, function (changeExecStatus) {
                                expect(changeExecStatus).toBe.true;
                                logger.info("Test is Executed Successfully.");

                                validateSuccessfulPopupInViewTestPage(function(validateSuccessfulPopup){
                                    expect(validateSuccessfulPopup).toBe.true;
                                    validateCurrentExecInViewTestPage(versionName, cycleName, changeStatus, function(validateCurrentStatus){
                                        expect(validateCurrentStatus).toBe.true;
                                        logger.info("Execution Status is Validated Successfully.");
                                        callback(validateCurrentStatus);
                                    });
                                });



                            });
                        });
                        driver.switchTo().defaultContent();
                    });
                });

            });

        } catch (err) {
            console.error(err);
        }
    };*/
    this.executeTestInAdHoc = function (executeTestMap, callback) {
        try {
            logger.info("Test Name : "+executeTestMap.TESTNAME);
            executeTestMap["VERSIONNAME"] = "Unscheduled";
            executeTestMap["CYCLENAME"] = "Ad hoc";
            executeTestMap["TESTSTATUS"] = executeTestMap.EXECUTEADHOC;
            //delete executeTestMap["EXECUTEADHOC"];
            logger.info("executeTestMap : "+executeTestMap.TESTSTATUS);
            validateViewTestPage(executeTestMap.TESTNAME, function (validateTitleStatus) {
                assert.ok(validateTitleStatus, "Not Validated View Test page.");
                logger.info("View Test Page Validated Successfully.");

                navigateToExecuteTestPage(function(isNavigateToExecuteTestPage){
                    assert.ok(isNavigateToExecuteTestPage, "Not Navigated To Execute Test Page.");

                    executeTestPage.changeExecutionStatus(executeTestMap, function (getChangeStatus) {
                        assert.ok(getChangeStatus, "Not Changed Execution status.");
                        logger.info("Status is Changed To : " + executeTestMap.TESTSTATUS);
                        //logger.info("Executed By : " + getExecByName);
                        //logger.info("Executed On : " + getExecOnDate);
                        logger.info("Executed By" + executeTestMap.EXECUTEDBY);
                        logger.info("Executed On" + executeTestMap.EXECUTEDON);
                        planTestCyclePage.validateTestAfterExecution(executeTestMap, function (validateTestStatus) {
                            assert.ok(validateTestStatus, "Not Validated Execution status After execution.");
                            logger.info("Test Execution Summary is validated successfully.");
                            callback(validateTestStatus);
                            /*closeCycle(executeTestMap.CYCLENAME, function (closeCycleStatus) {
                                assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                logger.info("Cycle Closed Successfully.");
                                callback(closeCycleStatus);
                            });*/
                        });
                    });
                    //callback(isNavigateToExecuteTestPage);
                });
            });

        } catch (err) {
            console.error(err);
            callback(false);
        }
    };
    var navigateToExecuteTestPage = function (isNavigateToExecuteTestPage) {
        try {
            var xpathForExecuteBtn = "//*[@id='com.thed.zephyr.cloud__zephyr-je-test-execute']";
            var xpathForExecuteDialogHeader = "//*[@id='delete-entity']/descendant::h2[contains(@class, 'aui-dialog2')]";
            var xpathForExecuteDialogExecuteBtn = "//*[@id='delete-entity']/descendant::button[text()='Execute']";
            commUtil.doClick(driver.findElement(by.xpath(xpathForExecuteBtn)), function (clickOnExecuteLinkStatus) {
                assert.ok(clickOnExecuteLinkStatus, "Not Clicked On Execute Button.");
                logger.info("Clicked On Execute Button in View Test Page.");
                commUtil.waitForElement(xpathForIFrameOfExecuteDialog, browser.params.testdata.implicitWaitTimeMedium, function(waitForExecuteDialogFrame){
                    assert.ok(waitForExecuteDialogFrame, "Not Visible Execute Dialog.");
                    commUtil.switchToFrameByXpath(xpathForIFrameOfExecuteDialog, function (frameSwitchStatus) {
                        assert.ok(frameSwitchStatus, "Not Switched To frame");
                        logger.info("Switched Successfully to IFrame Successfully.");
                        //commUtil.sleep(3000);
                        commUtil.getTextByXpath(xpathForExecuteDialogHeader, function (getText) {
                            assert.equal(getText, "Execute Test", "Not Validated Execute Dialog Header.");
                            driver.sleep(3000);
                            commUtil.clickOnElementByXpath(xpathForExecuteDialogExecuteBtn, function (clickOnExecuteBtnStatus) {
                                assert.ok(clickOnExecuteBtnStatus, "Not Clicked On Execute Button.");
                                logger.info("Clicked On Execute Button Successfully.");
                                isNavigateToExecuteTestPage(clickOnExecuteBtnStatus);
                            });
                        });
                        driver.switchTo().defaultContent();
                    });
                });
            });
        } catch (err) {
            console.error(err);
            isNavigateToExecuteTestPage(false);
        }
    };


    /******************************************************
     *  PAGE REUSABLE METHODS
     *****************************************************/
    var validateViewTestPage = function (testName, isValidateViewTestPage) {
        try{
            /*if(browser.params.testdata.environment === "prod"){
                xpathForIFrameForTestStep = "/*//*[@id='easyXDM_embedded-com.thed.zephyr.je__viewissue-teststep_provider']";
                xpathForIFrameForExec = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.je__viewissue-executions_provider']";
                xpathForIFrameForAddTestToCycle = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.je__zephyr-je-add-to-cycle_provider']";
                xpathForIFrameOfExecuteDialog = "/*//*[@id='easyXDM_embedded-com.thed.zephyr.je__zephyr-je-test-execute_provider']";
            }*/
            driver.switchTo().defaultContent();
            driver.wait(function(){
                return driver.executeScript("return document.readyState").then(function(state){
                    logger.info("Browse state : " + state);
                    return state === "complete";
                });
            }, browser.params.testdata.PageLoadTimeOut).then(function(){
                driver.sleep(1000);
                commUtil.waitForTitle(testName, function(waitForTitleStatus){
                    assert.ok(waitForTitleStatus, "Not Validate View Test Page Title.");

                    commUtil.waitForPageLoad(xpathForIFrameForTestStep,  function(waitForFrameStatus){
                        assert.ok(waitForFrameStatus, "NoT Able To Load IFrame in Plan test Cycle.");

                        isValidateViewTestPage(waitForFrameStatus);
                        /*commUtil.waitForPageLoad(xpathForIFrameForExec,  function(waitForFrameStatus){
                            assert.ok(waitForFrameStatus, "NoT Able To Load IFrame in Plan test Cycle.");
                            isValidateViewTestPage(waitForFrameStatus);
                        });*/
                    });
                });
            },function(e) {
                console.error("Browser is not Loaded.");
                isValidateViewTestPage(false);
            });
        }catch(err){
            console.error(err);
            isValidateViewTestPage(false);
        }
    };
    this.rearrangeTestSteps = function(testname, srcStep, destStep, isRearranged){
        try{
            //var srcStep = testStepMap.SRCSTEP;
            //var destStep = testStepMap.DESTSTEP;
            validateViewTestPage(testname, function (validateTitleStatus) {
                assert.ok(validateTitleStatus, "Not Validated View Test page.");
                logger.info("View Test Page Validated Successfully.");
                commUtil.moveToElementByXpath("//*[text()='Test Details']", function (moveToIFrameStatus) {
                    assert.ok(moveToIFrameStatus, "Not Moved To Test Step Frame.");
                    commUtil.switchToFrameByXpath(xpathForIFrameForTestStep, function (switchToFrameStatus) {
                        assert.ok(switchToFrameStatus, "Not Switched To Test Step Frame Successfully.");
                        logger.info("Switched To Frame Successfully.");
                        returnTestSteps(function (totalSteps) {
                            logger.info("Total Steps : " + totalSteps);
                            //counter = totalSteps;
                            //logger.info(testStepMap.length - 1);

                            commUtil.getAttributeValue("//*[@id='teststep-table']/tbody[1]/tr["+srcStep+"][td[1]/span]", "data-id", function(srcStepDataId){
                                commUtil.getAttributeValue("//*[@id='teststep-table']/tbody[1]/tr["+destStep+"][td[1]/span]", "data-id", function(destStepDataId){
                                    logger.info("Source Step id Before :  " + srcStepDataId);
                                    logger.info("Dest Step id Before :  " + destStepDataId);

                                    var source = driver.findElement(by.xpath("//*[@id='teststep-table']/tbody[1]/tr["+srcStep+"]/td[1]/span"));
                                    var destination = driver.findElement(by.xpath("//*[@id='teststep-table']/tbody[1]/tr["+(destStep+1)+"]/td[1]/span"));
                                    browser.actions()
                                        .mouseDown(source)
                                        .mouseMove(destination)
                                        .mouseUp()
                                        .perform().then(function(){
                                    //driver.actions().dragAndDrop( source, destination).perform().then(function(){
                                        driver.sleep(3000);
                                        commUtil.getAttributeValue("//*[@id='teststep-table']/tbody[1]/tr["+srcStep+"][td[1]/span]", "data-id", function(srcStepDataIdAfter) {
                                            commUtil.getAttributeValue("//*[@id='teststep-table']/tbody[1]/tr[" + destStep + "][td[1]/span]", "data-id", function (destStepDataIdAfter) {
                                                logger.info("Source Step id After :  " + srcStepDataIdAfter);
                                                logger.info("Dest Step id After :  " + destStepDataIdAfter);
                                                assert.equal(srcStepDataId, destStepDataIdAfter, "Src step Not validated.");
                                                assert.equal(destStepDataId, srcStepDataIdAfter, "Dest step Not validated.");
                                                logger.info("Steps rearranged Successful.");
                                                isRearranged(true);
                                            });
                                        });
                                    });
                                   /* browser.actions().mouseMove(source).mouseDown(source)
                                        .mouseMove(destination).mouseUp(destination)
                                        .perform();*/
                                    /*browser.actions()
                                        .mouseDown(source)
                                        .mouseMove(destination)
                                        .mouseUp()
                                        .perform();*/
                                    //browser.actions().dragAndDrop(source, destination).perform();
                                    //driver.actions().dragAndDrop(source, destination).perform();
                                    /*driver.actions()
                                        .mouseMove(source)
                                        .mouseDown(source)
                                        .mouseMove(destination)
                                        .mouseUp(destination)
                                        .perform();*/

                                });
                            });
                        });
                        driver.switchTo().defaultContent();
                    });
                });
            });
        }catch(e){

        }
    };
    this.deleteTestSteps = function(testname, step, isDeleted){
        try{
            //var srcStep = testStepMap.SRCSTEP;
            //var destStep = testStepMap.DESTSTEP;
            validateViewTestPage(testname, function (validateTitleStatus) {
                assert.ok(validateTitleStatus, "Not Validated View Test page.");
                logger.info("View Test Page Validated Successfully.");
                commUtil.moveToElementByXpath("//*[text()='Test Details']", function (moveToIFrameStatus) {
                    assert.ok(moveToIFrameStatus, "Not Moved To Test Step Frame.");
                    commUtil.switchToFrameByXpath(xpathForIFrameForTestStep, function (switchToFrameStatus) {
                        assert.ok(switchToFrameStatus, "Not Switched To Test Step Frame Successfully.");
                        logger.info("Switched To Frame Successfully.");
                        returnTestSteps(function (totalSteps) {
                            logger.info("Total Steps : " + totalSteps);
                            if(parseInt(totalSteps) >= 0){
                                commUtil.getAttributeValue("//*[@id='teststep-table']/tbody[1]/tr["+srcStep+"][td[1]/span]", "data-id", function(srcStepDataId){});
                                commUtil.clickOnElementByXpath("//*[@id='teststep-table']/tbody[1]/tr["+teststepToDelete+"]//a[contains(@class,'aui-steps-dropdown')]", function(clickOnDropDownStatus){
                                    assert.ok(clickOnDropDownStatus, "Not Clicked On drop Down Link.");//div[@id='teststep-dd-0001425218179583-242ac11a-0001']//a[text()='Delete']
                                })
                            }else{

                            }

                            commUtil.getAttributeValue("//*[@id='teststep-table']/tbody[1]/tr["+srcStep+"][td[1]/span]", "data-id", function(srcStepDataId){
                                commUtil.getAttributeValue("//*[@id='teststep-table']/tbody[1]/tr["+destStep+"][td[1]/span]", "data-id", function(destStepDataId){
                                    logger.info("Source Step id Before :  " + srcStepDataId);
                                    logger.info("Dest Step id Before :  " + destStepDataId);

                                    var source = element(by.xpath("//*[@id='teststep-table']/tbody[1]/tr["+srcStep+"]/td[1]/span"));
                                    var destination = element(by.xpath("//*[@id='teststep-table']/tbody[1]/tr["+(destStep+1)+"]/td[1]/span"));
                                    browser.actions().mouseMove(source).mouseDown(source)
                                        .mouseMove(destination).mouseUp(destination)
                                        .perform();
                                    /*browser.actions()
                                     .mouseDown(source)
                                     .mouseMove(destination)
                                     .mouseUp()
                                     .perform();*/
                                    //browser.actions().dragAndDrop(source, destination).perform();
                                    //driver.actions().dragAndDrop(source, destination).perform();
                                    /*driver.actions()
                                     .mouseMove(source)
                                     .mouseDown(source)
                                     .mouseMove(destination)
                                     .mouseUp(destination)
                                     .perform();*/
                                    driver.sleep(3000);
                                    commUtil.getAttributeValue("//*[@id='teststep-table']/tbody[1]/tr["+srcStep+"][td[1]/span]", "data-id", function(srcStepDataIdAfter) {
                                        commUtil.getAttributeValue("//*[@id='teststep-table']/tbody[1]/tr[" + destStep + "][td[1]/span]", "data-id", function (destStepDataIdAfter) {
                                            logger.info("Source Step id After :  " + srcStepDataIdAfter);
                                            logger.info("Dest Step id After :  " + destStepDataIdAfter);
                                            assert.equal(srcStepDataId, destStepDataIdAfter, "Src step Not validated.");
                                            assert.equal(destStepDataId, srcStepDataIdAfter, "Dest step Not validated.");
                                            logger.info("Steps rearranged Successful.");
                                            isRearranged(true);
                                        });
                                    });
                                });
                            });
                        });
                        driver.switchTo().defaultContent();
                    });
                });
            });
        }catch(e){

        }
    };
    this.deleteTeststep = function(teststepToDelete){
        driver.wait(function () {
            commUtil.isElementDisplayed(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(frameValue){
                if(frameValue === true){
                    //driver.executeScript("arguments[0].scrollIntoView();",teststepFrame);
                    driver.switchTo().frame(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(){
                        commUtil.getAttributeValueUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepToDelete+"]//div"),"id").then(function(idValue){
                            commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepToDelete+"]/td[6]/a/span").click().then(function(){
                                commUtil.changeToWebElement("//*[@id='"+idValue+"']//li[2]//a").click().then(function(){
                                    driver.sleep(1000);
                                    var divId = idValue.split('-dd-');
                                    DeleteTeststepPage.deleteTeststep("delete-entity-"+divId[1]);
                                });
                            });
                        });
                    });
                    driver.switchTo().defaultContent();
                }
                else{
                    logger.info("i-frame not loaded.");
                }

            });

            return true;
        },30000,"Deleting teststep failed.");

    };

    /*this.rearrangeTeststeps1111 = function(srcStep,destStep){
        driver.wait(function(){
            driver.sleep(3000);
            commUtil.waitForElementByXpath("/*//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']");
            commUtil.isElementDisplayed(commUtil.changeToWebElement("/*//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(frameValue) {
                if (frameValue === true) {
                    driver.switchTo().frame(commUtil.changeToWebElement("/*//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(){
                        var source = element(by.xpath("/*//*[@id='teststep-table']/tbody[1]/tr["+srcStep+"]/td[1]/span"));
                        var destination = element(by.xpath("/*//*[@id='teststep-table']/tbody[1]/tr["+(destStep+1)+"]/td[1]/span"));
                        driver.actions()
                        .mouseMove(source)
                        .mouseDown(source)
                        .mouseMove(destination)
                        .mouseUp(destination)
                        .perform();
                        driver.sleep(60000);
                    });
                }
            });
            driver.switchTo().defaultContent();
            return true;
        },30000,"Re-Arrange Teststeps failed.");


    };*/
    this.quickSearch = function(createTestMap, isSearched){
        commUtil.waitForElement("//*[@id='quickSearchInput']", browser.params.testdata.implicitWaitTimeHigh, function(waitForSearchInputStatus){
            assert.ok(waitForSearchInputStatus, "Not Found Quick Search Input");
            logger.info("Quick Search Text Box Found Successfully.");
            logger.info(createTestMap.TESTNAME);
            commUtil.sendTextToElement("//*[@id='quickSearchInput']", createTestMap.TESTNAME , function(sendTestStatus) {
                assert.ok(sendTestStatus, "Not Given Test To Quick search Input");
                driver.sleep(500);
                commUtil.actionClass().sendKeys(protractor.Key.ENTER).perform();
                //commUtil.sendTextToElement("//*[@id='quickSearchInput']", protractor.Key.ENTER , function(enterStatus) {
                   // assert.ok(enterStatus, "Not searched Test.");
                    commUtil.implicitWait(200000);
                    validateTest(createTestMap, function(isValidateTest){
                        assert.ok(isValidateTest, "Not validated Test.");
                        logger.info("Test Searched and Validated Successfully.");
                        isSearched(isValidateTest);
                    });
               // });
            });
        });
    };


    /*this.validateWorkflowToolbar = function(){
        driver.wait(function () {
            commUtil.isElementDisplayed(commUtil.changeToWebElement("/*//*[text()='Start Progress']")).then(function(firstElement){
                commUtil.isElementDisplayed(commUtil.changeToWebElement("/*//*[text()='Resolve Issue']")).then(function(secondElement){
                    if(firstElement === true && secondElement === true){
                        logger.info("workflow toolbar selected.");
                    }
                    else{
                        logger.info("workflow toolbar deselected.");
                    }


                });
            });


            return true;
        },30000,"validating workflowToolbar failed.");

    };*/



    closeTestStepTable = function (option, callback) {
        var xpathForStepDetailsTable = "//*[@id='com.thed.zephyr.cloud__viewissue-teststep']";
        //var filter = browser.findElement(by.xpath("/*//*[@id='ztestSchedulesTable']"));
        /*var filter = driver.findElement(By.xpath(xpathForStepDetailsTable));
        var scrollIntoView = function () {
            arguments[0].scrollIntoView();
        }
        driver.executeScript(scrollIntoView, filter);*/
        //commUtil.moveToElementByXpath(xpathForStepDetailsTable);
        var xpathForStepDetailsTable = "//*[@id='com.thed.zephyr.cloud__viewissue-teststep']";
        var xpathForStepDetailClickLink = "//*[@id='com.thed.zephyr.cloud__viewissue-teststep']/descendant::*[text()='Test Details']";
        if (option === "close") {
            commUtil.clickOnElementByxpath(xpathForStepDetailClickLink, function (clickElementStatus) {
                expect(clickElementStatus).toBe.true;
                commUtil.sleep(2000);
                callback(clickElementStatus);

            });
            /*commUtil.returnAttributeValue(driver.findElement(By.xpath(xpathForStepDetailsTable)), "class", function(getAttributeValue){
             logger.info("Attribute Value : " + getAttributeValue);
             if(getAttributeValue === "module toggle-wrap expanded"){
             commUtil.clickOnElementByxpath(xpathForStepDetailClickLink, function(clickElementStatus){
             commUtil.sleep(2000);
             commUtil.returnAttributeValue(driver.findElement(By.xpath(xpathForStepDetailsTable)), "class", function(getAttributeValue) {
             logger.info("Attribute Value : " + getAttributeValue);
             assert.equal(getAttributeValue, "module toggle-wrap collapsed", "Not closed the Step Execution Table");
             logger.info("Step Execution Table is Closed Successfully.");
             callback(true);
             });

             });
             }else if(getAttributeValue === "module toggle-wrap collapsed"){
             logger.info("Step Execution Table is already Closed Successfully.");
             callback(true);
             }
             })*/
        } else if (option === "open") {
            commUtil.returnAttributeValue(driver.findElement(By.xpath(xpathForStepDetailsTable)), "class", function (getAttributeValue) {
                logger.info("Attribute Value : " + getAttributeValue);
                if (getAttributeValue === "module toggle-wrap expanded") {
                    logger.info("Step Execution Table is already Opened Successfully.");
                    callback(true);
                } else if (getAttributeValue === "module toggle-wrap collapsed") {
                    commUtil.clickOnElementByxpath(xpathForStepDetailClickLink, function (clickElementStatus) {
                        commUtil.sleep(2000);
                        commUtil.returnAttributeValue(driver.findElement(By.xpath(xpathForStepDetailsTable)), "class", function (getAttributeValue) {
                            logger.info("Attribute Value : " + getAttributeValue);
                            assert.equal(getAttributeValue, "module toggle-wrap expanded", "Not closed the Step Execution Table");
                            logger.info("Step Execution Table is Opened Successfully.");
                            callback(true);
                        });

                    });

                }
            })
        } else {
            logger.info("Error In closing this.");
        }
    };
    this.addStepsToTest = function(testStepMap, isAddedStepToTest){
        var counter = 0;
        try{
            validateViewTestPage(testStepMap.TESTNAME, function (validateTitleStatus) {
                assert.ok(validateTitleStatus, "Not Validated View Test page.");
                logger.info("View Test Page Validated Successfully.");
                //commUtil.moveToElementByXpath("//*[text()='Test Details']", function(moveToIFrameStatus){
                    //assert.ok(moveToIFrameStatus, "Not Moved To Test Step Frame.");
                    commUtil.switchToFrameByXpath(xpathForIFrameForTestStep, function(switchToFrameStatus){
                        assert.ok(switchToFrameStatus, "Not Switched To Test Step Frame Successfully.");
                        logger.info("Switched To Frame Successfully.");
                        returnTestSteps(function(totalSteps){
                            logger.info("Total Steps : " + totalSteps);
                            counter = totalSteps;
                            //logger.info(testStepMap.length -1);
                            /*for(var i=0;i<= testStepMap.length -1; i++){
                                (function(x){
                                    logger.info(testStepMap[x].step+":"+testStepMap[x].data+":"+testStepMap[x].result);
                                    createTestStep(testStepMap[x].step,testStepMap[x].data,testStepMap[x].result, function(isCreatedStep){
                                        assert.ok(isCreatedStep, "Not Created Step.");
                                        totalSteps++;
                                        logger.info("Step "+totalSteps+" Created Successfully.");
                                        validateStepCreated(testStepMap[x].step,testStepMap[x].data,testStepMap[x].result, totalSteps, function(isValidateStep){
                                            assert.ok(isValidateStep, "Not Validated Step After Creation.");
                                            logger.info("Step is Validated Successfully After Creation.");
                                            if((testStepMap.length -1) === totalSteps){
                                                isAddedStepToTest(true);
                                            }
                                        });
                                    });
                                })(i);
                            }*/
                            testStepMap.forEach(function (teststep) {
                                logger.info(teststep.step+":"+teststep.data+":"+teststep.result);
                                createTestStep(teststep.step,teststep.data,teststep.result, function(isCreatedStep) {
                                    assert.ok(isCreatedStep, "Not Created Step.");
                                    counter++;
                                    logger.info("Step "+counter+" Created Successfully.");
                                    validateStepCreated(teststep.step,teststep.data,teststep.result, counter, function(isValidateStep){
                                        assert.ok(isValidateStep, "Not Validated Step After Creation.");
                                        logger.info("Step "+counter+" Validated Successfully After Creation.");
                                        logger.info(totalSteps +(testStepMap.length));
                                        if(counter === totalSteps +(testStepMap.length)){
                                            isAddedStepToTest(true);
                                        }
                                    });
                                });
                            });
                        });
                    });
                //});
            });
        } catch(e){
            console.error(e);
        }
    };

    var returnTestSteps = function(returnSteps){
        var count = 0;
        try{
            driver.sleep(500);
            commUtil.getCount("//*[@id='teststep-table']/tbody[1]/tr", function(getStepsCount){
                if(getStepsCount === 1){
                    commUtil.getTextByXpath("//*[@id='teststep-table']/tbody[1]/tr", function(stepData){
                        logger.info("Steps : "+stepData);
                        if(stepData.indexOf("Add new test steps, test data and expected results below") != -1){
                            returnSteps(0);
                        }else{
                            returnSteps(getStepsCount);
                        }
                    });
                }else{
                    returnSteps(getStepsCount);
                }
            });
        }catch(e){
            console.error(e);
        }
    };
    /*this.addTeststeps = function (teststepMap){
        driver.wait(function(){
            commUtil.isElementDisplayed(commUtil.changeToWebElement("//!*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(value){
                if(value === true){

                    driver.switchTo().frame(commUtil.changeToWebElement("//!*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(){
                        teststepMap.forEach(function (teststep) {
                            createTeststep(teststep.step,teststep.data,teststep.result);
                        });
                    });
                    for(i=0;i<=(teststepMap.length)-1;i++){
                        validateTeststepCreated(teststepMap[i].step,teststepMap[i].data,teststepMap[i].result,i);
                    }
                    driver.switchTo().defaultContent();
                }
                else{
                    logger.info("i-frame not loaded.");
                }
            });
            return true;
        },30000,"Adding Test steps failed.");

    };*/
    var createTestStep = function (step,data,result, isCreatedStep) {
        var counter = 0;
        var size = 0;
        if(step !== ""){
            size++;
        }
        if(data !== ""){
            size++;
        }
        if(result !== ""){
            size++;
        }
        var xpathForTestStepTable = "//*[@id='teststep-table']";
        try{
            //commUtil.moveToElementByXpath(xpathForTestStepTable, function(moveToStepTableStatus){
                //assert.ok(moveToStepTableStatus, "Not Moved To Step Table.");
                //logger.info
                if(step !== ""){
                    commUtil.sendTextToElement(xpathForStepTextArea,step, function(sendTextToStep){
                        assert.ok(sendTextToStep, "Not Able To Send Data To Step.");

                        commUtil.getAttributeValue(xpathForStepTextArea, "value", function(attValue){
                            assert.equal(attValue, step, "Not Validated Step After Given.");
                            counter++;
                            if(size === counter){
                                commUtil.clickOnElementByXpath(xpathForAddBtn, function(clickOnAddBtnStatus){
                                    assert.ok(clickOnAddBtnStatus, "Not Clicked On Add Button.");
                                    isCreatedStep(clickOnAddBtnStatus);
                                });
                            }
                        });
                    });
                }
                if(data !== ""){
                    commUtil.sendTextToElement(xpathForStepDataTextArea, data, function(sendTextToStepData){
                        assert.ok(sendTextToStepData, "Not Able To Send Data To Step Data Text Box.");

                        commUtil.getAttributeValue(xpathForStepDataTextArea, "value", function(attValue){
                            assert.equal(attValue, data, "Not Validated Result After Given.");
                            counter++;
                            if(size === counter){
                                commUtil.clickOnElementByXpath(xpathForAddBtn, function(clickOnAddBtnStatus){
                                    assert.ok(clickOnAddBtnStatus, "Not Clicked On Add Button.");
                                    isCreatedStep(clickOnAddBtnStatus);
                                });
                            }
                        });
                    });
                }
                if(result !== ""){
                    commUtil.sendTextToElement(xpathForStepResultTextArea, result, function(sendTextToStepResultStatus){
                        assert.ok(sendTextToStepResultStatus, "Not Able To Send Data To Step Result Status.");

                        commUtil.getAttributeValue(xpathForStepResultTextArea, "value", function(attValue){
                            assert.equal(attValue, result, "Not Validated Result After Given.");
                            counter++;
                            if(size === counter){
                                commUtil.clickOnElementByXpath(xpathForAddBtn, function(clickOnAddBtnStatus){
                                    assert.ok(clickOnAddBtnStatus, "Not Clicked On Add Button.");
                                    isCreatedStep(clickOnAddBtnStatus);
                                });
                            }
                        });
                    });
                }
                if(result === "" && data === "" && step === ""){
                    commUtil.clickOnElementByXpath(xpathForAddBtn, function(clickOnAddBtnStatus){
                        assert.ok(clickOnAddBtnStatus, "Not Clicked On Add Button.");
                        isCreatedStep(clickOnAddBtnStatus);
                    });
                }
            //});
        }catch(e){
            isCreatedStep(false);
        }
    };
    var validateStepCreated = function(step,data,result,stepNum, isValidatedStep){
        var counter = 0;
        var size = 0;
        if(step !== "" || step == ""){
            size++;
        }
        if(data !== "" || data == ""){
            size++;
        }
        if(result !== "" || result == ""){
            size++;
        }
        var xpathForTestStepNum = "//*[@id='teststep-table']/descendant::td[@class='aui-restfultable-order']/following-sibling::td[text()='"+stepNum+"']";
        //commUtil.moveToElementByXpath("//*[@id='teststep-table']", function(moveToStepStatus) {
            //assert.ok(moveToStepStatus, "Not Moved To Step.");

            commUtil.getTextByXpath("//*[@id='teststep-table']/tbody[1]/tr["+stepNum+"]/td[3]/span", function(getTestStep){
                logger.info("Step "+getTestStep);
                if(getTestStep !== ""){
                    if(step.indexOf('[') != -1){
                        step = step.replace("[","");
                        logger.info(step);
                        step = step.replace("]","");
                        logger.info(step);
                        assert.equal(getTestStep, step, "Not Validated Step.");
                        logger.info("Step "+stepNum+" step Validated Successfully.");
                        counter++;
                        if(size === counter){
                            logger.info("Step "+stepNum+" Validated Successfully.");
                            isValidatedStep(true);
                        }
                    }else{
                        assert.equal(getTestStep, step, "Not Validated Step.");
                        logger.info("Step "+stepNum+" step Validated Successfully.");
                        counter++;
                        if(size === counter){
                            logger.info("Step "+stepNum+" Validated Successfully.");
                            isValidatedStep(true);
                        }
                    }

                }else {
                    assert.ok(getTestStep == "", "Not Validated Step.");
                    logger.info("Step "+stepNum+" step Validated Successfully.");
                    counter++;
                    if(size === counter){
                        logger.info("Step "+stepNum+" Validated Successfully.");
                        isValidatedStep(true);
                    }
                }
            });
            commUtil.getTextByXpath("//*[@id='teststep-table']/tbody[1]/tr["+stepNum+"]/td[4]/span", function(getTestStepData){
                if(getTestStepData !== ""){
                    if(data.indexOf('[') != -1) {
                        data = data.replace("[", "");
                        logger.info(data);
                        data = data.replace("]", "");
                        logger.info(data);
                        assert.equal(getTestStepData, data, "Not Validated Step Data.");
                        logger.info("Step "+stepNum+" data Validated Successfully.");
                        counter++;
                        if(size === counter){
                            logger.info("Step "+stepNum+" data Validated Successfully.");
                            isValidatedStep(true);
                        }
                    }else{
                        assert.equal(getTestStepData, data, "Not Validated Step Data.");
                        logger.info("Step "+stepNum+" data Validated Successfully.");
                        counter++;
                        if(size === counter){
                            logger.info("Step "+stepNum+" data Validated Successfully.");
                            isValidatedStep(true);
                        }
                    }
                }else {
                    assert.ok(getTestStepData == "", "Not Validated Step Data.");
                    logger.info("Step "+stepNum+" data Validated Successfully.");
                    counter++;
                    if(size === counter){
                        logger.info("Step "+stepNum+" Validated Successfully.");
                        isValidatedStep(true);
                    }
                }
            });
            commUtil.getTextByXpath("//*[@id='teststep-table']/tbody[1]/tr["+stepNum+"]/td[5]/span", function(getTestStepRes){
                if(getTestStepRes !== ""){
                    if(result.indexOf('[') != -1) {
                        result = result.replace("[", "");
                        logger.info(result);
                        result = result.replace("]", "");
                        logger.info(result);
                        assert.equal(getTestStepRes, result, "Not Validated Step Data.");
                        logger.info("Step "+stepNum+" result Validated Successfully.");
                        counter++;
                        if(size === counter){
                            logger.info("Step "+stepNum+" Validated Successfully.");
                            isValidatedStep(true);
                        }
                    }else{
                        assert.equal(getTestStepRes, result, "Not Validated Step Data.");
                        logger.info("Step "+stepNum+" result Validated Successfully.");
                        counter++;
                        if(size === counter){
                            logger.info("Step "+stepNum+" Validated Successfully.");
                            isValidatedStep(true);
                        }
                    }
                }else {
                    assert.ok(getTestStepRes == "", "Not Validated Step Data.");
                    logger.info("Step "+stepNum+" result Validated Successfully.");
                    counter++;
                    if(size === counter){
                        logger.info("Step "+stepNum+" Validated Successfully.");
                        isValidatedStep(true);
                    }
                }
            });
       // });
    };
   /* var createTeststep = function (teststep,data,result) {
        driver.wait(function(){
            commUtil.waitForElementByXpath("/*//*[@id='teststep-table']");
            commUtil.isElementDisplayed(xpathToAddTeststep).then(function(){
                xpathToAddTeststep.sendKeys(teststep);
                logger.info("step entered: "+teststep);
            });
            commUtil.isElementDisplayed(xpathToAddTestdata).then(function(){
                xpathToAddTestdata.sendKeys(data);
                logger.info("data entered: "+data);
            });
            commUtil.isElementDisplayed(xpathToAddExpectedResult).then(function(){
                xpathToAddExpectedResult.sendKeys(result);
                logger.info("result entered: "+result);
                logger.info("---------------");

            });

            commUtil.isElementDisplayed(xpathOfAddButton).then(function(){
                driver.sleep(3000);
                xpathOfAddButton.click();
                driver.sleep(5000);
            });
            return true;
        },30000);
    };*/

   /* var validateTeststepCreated = function(stepValue,dataValue,resultValue,i){
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("/*//*[@id='teststep-table']/tbody[1]/tr["+(i+1)+"]/td[3]/span")).then(function(teststepValue){
            expect(stepValue).toBe(teststepValue);
            logger.info("step"+(i+1)+" :"+teststepValue);

        });
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("/*//*[@id='teststep-table']/tbody[1]/tr["+(i+1)+"]/td[4]/span")).then(function(testDataValue){
            expect(dataValue).toBe(testDataValue);
            logger.info("data"+(i+1)+" :"+ testDataValue);

        });
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("/*//*[@id='teststep-table']/tbody[1]/tr["+(i+1)+"]/td[5]/span")).then(function(testResultValue){
            expect(resultValue).toBe(testResultValue);
            logger.info("result"+(i+1)+" :"+ testResultValue);
            logger.info("--------------------------");

        });
    };*/

    var displayTeststep = function(teststep){
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststep+"]/td[3]/span")).then(function(teststepValue){
            logger.info("step"+teststep+" :"+teststepValue);
        });
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststep+"]/td[4]/span")).then(function(testDataValue){
            logger.info("data"+teststep+" :"+ testDataValue);
        });
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststep+"]/td[5]/span")).then(function(resultValue){
            logger.info("data"+teststep+" :"+ resultValue);
        });


    };

    var validateTeststep = function(stepValue,dataValue,resultValue,i){
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+i+"]/td[3]/span")).then(function(teststepValue){
            expect(stepValue).toBe(teststepValue);
            logger.info("step"+i+" :"+teststepValue);

        });
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+i+"]/td[4]/span")).then(function(testDataValue){
            expect(dataValue).toBe(testDataValue);
            logger.info("data"+i+" :"+ testDataValue);

        });
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+i+"]/td[5]/span")).then(function(testResultValue){
            expect(resultValue).toBe(testResultValue);
            logger.info("result"+i+" :"+ testResultValue);

        });
    };
    var validateClonedTeststep = function(teststepNumber){
        driver.sleep(10000);
        commUtil.waitForElementByXpath("//*[@id='teststep-table']/tbody[1]/tr["+teststepNumber+"]/td[3]/span");
        commUtil.isElementDisplayed(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepNumber+"]/td[3]/span")).then(function(teststepDisplayed){
            if(teststepDisplayed === true){
                commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepNumber+"]/td[3]/span")).then(function(teststepValue){
                    commUtil.getTextUsingWebElement(commUtil.changeToWebElement("/*//*[@id='teststep-table']/tbody[1]/tr["+teststepNumber+"]/td[4]/span")).then(function(testDataValue){
                        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("/*//*[@id='teststep-table']/tbody[1]/tr["+teststepNumber+"]/td[5]/span")).then(function(testResultValue){
                            validateTeststep(teststepValue,testDataValue,testResultValue,(teststepNumber));
                        });
                    });
                });
            }
        });
    };


    var getTestDetails = function(){

    };

    /******************************************************
     * 	METHODS USED IN FUNCTIONAL TESTING.
     *****************************************************/

    this.addBlankTeststeps = function (count){
        driver.wait(function(){
            commUtil.isElementDisplayed(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(value){
                if(value === true){
                    driver.switchTo().frame(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(){
                        for(i=0;i<=(count-1);i++) {
                            createBlankTeststep();
                        }
                    });
                    for(i=0;i<=(count-1);i++){
                        validateBlankTeststepCreated(i);
                    }
                    driver.switchTo().defaultContent();
                }
                else{
                    logger.info("i-frame not loaded.");
                }
            });
            return true;
        },30000,"Adding Test steps failed.");
    };

    this.addTeststepsWith = function(teststepDatas){
        driver.wait(function(){
            commUtil.isElementDisplayed(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(value){
                if(value === true){
                    driver.switchTo().frame(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(){
                        teststepDatas.forEach(function (teststep) {
                            createTeststep(teststep.step,teststep.data,teststep.result)
                        });
                        driver.findElements(by.xpath("//*[@id='teststep-table']/tbody[1]//td[1]/span")).then(function(count){
                            if(teststepDatas.length < count.length){
                                var startFrom = (count.length-teststepDatas.length)+1;
                                validateTeststepsFrom(startFrom,teststepDatas,count.length);

                            }
                            else{
                                for(var i= 0;i<=teststepDatas.length-1;i++){
                                    validateTeststepCreated(teststepDatas[i].step, teststepDatas[i].data, teststepDatas[i].result, i);
                                }

                            }
                        });
                    });
                    driver.switchTo().defaultContent();
                }
                else{
                    logger.info("i-frame not loaded.");
                }
            });
            return true;
        },30000,"Adding Test steps failed.");
    };

    var createBlankTeststep = function () {
        driver.wait(function(){
            commUtil.waitForElementByXpath("//*[@id='teststep-table']");
            commUtil.isElementDisplayed(xpathOfAddButton).then(function(){
                driver.sleep(5000);
                xpathOfAddButton.click();
                driver.sleep(5000);
            });
            return true;
        },30000);
    };

    var validateBlankTeststepCreated = function(i){
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+(i+1)+"]/td[3]/span")).then(function(teststepValue){
            expect(teststepValue).toBe("");
            logger.info("step"+(i+1)+" :"+teststepValue);

        });
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+(i+1)+"]/td[4]/span")).then(function(testDataValue){
            expect(testDataValue).toBe("");
            logger.info("data"+(i+1)+" :"+ testDataValue);

        });
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+(i+1)+"]/td[5]/span")).then(function(testResultValue){
            expect(testResultValue).toBe("");
            logger.info("result"+(i+1)+" :"+ testResultValue);

        });
    };

    var validateTeststepsFrom = function(fromStep,teststepDetails,totalCount){
        for(var i= fromStep,j=0;i<=totalCount;i++,j++){
            (function(x){
                commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+(i)+"]/td[3]/span")).then(function(teststepValue){
                    expect(teststepDetails[x].step).toBe(teststepValue);
                    logger.info("step"+(fromStep+x)+" :"+teststepValue);
                });
                commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+(i)+"]/td[4]/span")).then(function(testDataValue){
                    expect(teststepDetails[x].data).toBe(testDataValue);
                    logger.info("data"+(fromStep+x)+" :"+ testDataValue);
                });
                commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+(i)+"]/td[5]/span")).then(function(testResultValue){
                    expect(teststepDetails[x].result).toBe(testResultValue);
                    logger.info("result"+(fromStep+x)+" :"+ testResultValue);
                });

            })(j);
        }

    };




    this.editTeststepAndCancel = function(teststepEditMap){
        driver.wait(function(){
            commUtil.isElementDisplayed(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(frameValue){
                if(frameValue === true){
                    driver.switchTo().frame(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']")).then(function(){
                        commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[3]/span").click().then(function(){
                            commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[3]/textarea").clear();
                            commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[3]/textarea").sendKeys(teststepEditMap.CHANGETESTSTEPTO);
                        });
                        commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[4]/textarea").click().then(function(){
                            commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[4]/textarea").clear();
                            commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[4]/textarea").sendKeys(teststepEditMap.CHANGEDATATO);
                        });
                        commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[5]/textarea").click().then(function(){
                            commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[5]/textarea").clear();
                            commUtil.changeToWebElement("//*[@id='teststep-table']/tbody[1]/tr["+teststepEditMap.TESTSTEPID+"]/td[5]/textarea").sendKeys(teststepEditMap.CHANGERESULTTO);
                        });
                        xpathOfCancelLink.click();
                    });
                    //validateTeststepCreated(teststepEditMap.CHANGETESTSTEPTO,teststepEditMap.CHANGEDATATO,teststepEditMap.CHANGERESULTTO,(teststepEditMap.TESTSTEPID-1));
                    driver.switchTo().defaultContent();
                }
                else{
                    logger.info("i-frame not loaded.");
                }

            });

            return true;
        },30000,"Editing teststep failed.");

    };
    this.validateTestWithSummary = function(summary, callback){
        try{
            commUtil.waitForElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__viewissue-teststep_provider']", function(waitForTestStep){
                assert.ok(waitForTestStep, "Test Step Not Found.");
                browser.refresh();
                commUtil.implecitWait(browser.params.testdata.implicitWaitTimeMedium);
                commUtil.getTextByXpath("//*[@id='key-val']", function(getTestID){
                    logger.info("Test Id : " + getTestID);
                    title = "["+getTestID+"] " + summary;
                    commUtil.validateTitle(title);
                    commUtil.getTextByXpath("//*[@id='summary-val']", function(getSummaryValue){
                        assert.equal(summary, getSummaryValue, "Summary is not Matching.");
                        logger.info("Summary Validated Successfully.");
                        callback(getTestID);
                    });
                });

            });
        }catch(err){
            throw err;
        }
    };
    this.addMultipleSteps = function(callback){
        if(browser.params.testdata.environment === "prod"){
            xpathForIFrameForTestStep = "//*[@id='easyXDM_embedded-com.thed.zephyr.je__viewissue-teststep_provider']";
            xpathForIFrameForExec = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.je__viewissue-executions_provider']";
            xpathForIFrameForAddTestToCycle = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.je__zephyr-je-add-to-cycle_provider']";
            xpathForIFrameOfExecuteDialog = "//*[@id='easyXDM_embedded-com.thed.zephyr.je__zephyr-je-test-execute_provider']";
        }
        commUtil.waitForElement(xpathForIFrameForTestStep, browser.params.testdata.implicitWaitTimeMedium, function(waitElementStatus){
            assert.ok(waitElementStatus, "Iframe Element Not Found.");
            commUtil.switchToFrameByXpath(xpathForIFrameForTestStep, function(switchToFrameStatus){
                assert.ok(switchToFrameStatus, "Not Switched to frame.");
                logger.info("Switched Successfully to iframe.");
                var totalStepsToCreate = 5;
                //logger.info("Total steps To create : "+stepToCreate.STEPSTOCREATE);
                logger.info("Total steps To create : "+totalStepsToCreate);
                returnTestSteps(function(totalSteps) {
                    logger.info("Total Steps Created Before : " + totalSteps);
                    if(totalSteps <= totalStepsToCreate ){
                        for(var i=1; i <= (totalStepsToCreate - totalSteps); i++){
                            (function(x){
                                var step = "Step " + x;
                                var data = "data " + x;
                                var result = "res " + x;
                                createTestStep(step,data,result, function(isCreatedStep) {
                                    assert.ok(isCreatedStep, "Not Created Step.");
                                    //counter++;
                                    logger.info("Step " + x + " Created Successfully.");
                                    validateStepCreated(step, data, result, x, function (isValidateStep) {
                                        assert.ok(isValidateStep, "Not Validated Step After Creation.");
                                        logger.info("Step " + x + " Validated Successfully After Creation.");
                                        //logger.info(totalSteps + (testStepMap.length));


                                        if (x == (totalStepsToCreate)) {
                                            driver.switchTo().defaultContent();
                                            callback(true);
                                        }
                                    });
                                });

                            })(i);

                        }
                    }
                });

            });

        });
        /*for(var i=1; i <= returnSteps; i++){
            (function(x){
                changeStepExecStatus(x, changeStepStatus, function(getChangeStatus){
                    expect(getChangeStatus).toBe.true;
                    logger.info("Step "+x+" is executed successfully.");

                    if(x==(returnSteps)){
                        falg=true;
                        callback(falg);
                    }
                });
            })(i);

        }
        driver.wait(function(){
            commUtil.isElementDisplayed(teststepFrame).then(function(value){
                if(value === true){


                    driver.switchTo().defaultContent();
                }
                else{
                    logger.info("i-frame not loaded.");
                }1
            });
            return true;
        },60000,"Adding Test steps failed.").then(function(createStepStatus){
            assert.ok(createStepStatus, "Steps Not Created");
            callback(createStepStatus);
        });*/

    };
    this.createTestDirectly = function(createTestMap, isCreated){
        try{
            var xpathForCreateBtn = "//*[@id='create_link']";
            commUtil.waitForElement(xpathForCreateBtn, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateButtonStatus){
                assert.ok(waitForCreateButtonStatus, "Not Visible Create Button.");
                commUtil.clickOnElementByXpath(xpathForCreateBtn, function(clickOnCreateBtnStatus){
                    assert.ok(clickOnCreateBtnStatus, "Not clicked On Create Button.");
                    require('./CreateTestPage.js').createTestDirectly(createTestMap, function(isCreateTest){
                        assert.ok(isCreateTest, "Not Created test.");
                        driver.sleep(1000);
                        isCreated(isCreateTest);
                    });
                });
            });
        }catch(e){

        }
    };

};
 module.exports = new ViewTestPage();