var commUtil = require('../../utils/commUtil.js');
var ViewTestPage = require('./ViewTestPage.js');

var params = browser.params;

var CreateTestPage = function() {

    /******************************************************
     * 	WEBELEMENTS
     *****************************************************/
    var summaryTextbox = element(by.id('summary'));
    var createIssueBtn = element(by.id('issue-create-submit'));
    var xpathToValidateCreatePage = element(by.xpath("//*[@id='content']//h1"));
    var xpathOfNextButton = element(by.xpath("//*[@name='Next' and @type='submit']"));
    var xpathToGetIssueType = element(by.xpath("//*[@id='issue-create']/descendant::*[text()='Issue Type']/following-sibling::img"));
    var xpathToGetIssueName = element(by.id("issue-create-issue-type"));
    var xpathToEnterPriority = element(by.id("priority-field"));
    var xpathOfPriorityDropdown = element(by.xpath("//*[@id='priority-single-select']/span"));
    var xpathOfComponentDropdown = element(by.xpath("//*[@id='components-multi-select']/span"));
    var xpathOfAffectedVersionDropdown = element(by.xpath("//*[@id='versions-multi-select']/span"));
    var toEnterFixVersion = element(by.id("fixVersions-textarea"));
    var toEnterEnvironment = element(by.id("environment"));
    var toEnterDescription = element(by.id("description"));
    var toEnterLabel = element(by.id("labels-textarea"));
    var project =element(by.id("issue-create-project-name"));



    var xpathForIssueTypeImage = "//*[@id='issue-create']/descendant::*[text()='Issue Type']/following-sibling::img";
    var xpathForProjectName = "//*[@id='project-field']";
    var xpathForIssueType = "//*[@id='issue-create-issue-type']";
    var xpathForCreateTestHeader = "//*[@id='create-issue-dialog']//h2[@title='Create Issue']";
    var xpathForSummary = "//*[@id='create-issue-dialog']//*[@id='summary']";
    var xpathForPriority = "//*[@id='create-issue-dialog']//*[@id='priority-field']";
    var xpathForPriorityDropDown = "//*[@id='priority-single-select']/span";
    var xpathForComponent = "//*[@id='create-issue-dialog']//*[@id='components-textarea']";
    var xpathForFixedVersion = "//*[@id='create-issue-dialog']//*[@id='fixVersions-textarea']";
    var xpathForFixVersionDropDown = "//*[@id='create-issue-dialog']//*[@id='fixVersions-multi-select']/span";
    var xpathForSelectedFixVersion = "//*[@id='create-issue-dialog']//*[@id='fixVersions-textarea']/following-sibling::div[@class='representation']";
    var xpathForAffectedVersion = "//*[@id='create-issue-dialog']//*[@id='versions-textarea']";
    var xpathForAffectedVersionSelectDrpDwn = "//*[@id='create-issue-dialog']//*[@id='versions-multi-select']/span";
    var xpathForSelectedAffectedVersion = "//*[@id='create-issue-dialog']//*[@id='versions-textarea']/following-sibling::div[@class='representation']";
    var xpathForComponent = "//*[@id='create-issue-dialog']//*[@id='components-textarea']";
    var xpathForComponentDropDown ="//*[@id='create-issue-dialog']//*[@id='components-multi-select']/span";
    var xpathForSelectedComponent = "//*[@id='create-issue-dialog']//*[@id='components-textarea']/following-sibling::div[@class='representation']";
    var xpathForEnvironmentTextArea = "//*[@id='create-issue-dialog']//*[@id='environment']";
    var xpathForDescriptionTextArea = "//*[@id='create-issue-dialog']//*[@id='description']";
    var xpathForLabelTextArea = "//*[@id='create-issue-dialog']//*[@id='labels-textarea']";
    var xpathForSelectedLabel = "//*[@id='create-issue-dialog']//*[@id='labels-textarea']/following-sibling::div[@class='representation']";

    var xpathForSuccessfulPopupDivTag = "//div[@id='aui-flag-container']/div/div";
    var xpathForSuccessfulIssueCreatedLink = "//a[@class='issue-created-key issue-link']";

    var xpathForCreateButton = "//*[@id='create-issue-submit']";
    /******************************************************
     * 	PAGE OBJECT METHODS
     *****************************************************/

    this.validateCreateTestPage = function(isValidateCreateTestPage) {
        try{
            driver.switchTo().defaultContent();
            driver.wait(function(){
                return driver.executeScript("return document.readyState").then(function(state){
                    logger.info("Browse state : " + state);
                    return state === "complete";
                });
            }, browser.params.testdata.PageLoadTimeOut).then(function(){
                driver.sleep(1000);
                commUtil.waitForTitle("admin.issue.operations.create", function(waitForTitleStatus){
                    assert.ok(waitForTitleStatus, "Not Validate Execute Test Page Title.");

                    //commUtil.waitForElement(xpathForIssueTypeImage, browser.params.testdata.implicitWaitTimeLow,  function(waitForFrameStatus){
                        //assert.ok(waitForFrameStatus, "Not visible Test Image.");

                        commUtil.getTextByXpath(xpathForCreateTestHeader, function(getCreateTestHeader){
                            logger.info("Create Test Header : "+getCreateTestHeader);
                            assert.equal(getCreateTestHeader, "Create Issue","Not Validated Create Test Header.");
                            logger.info("Create Issue Header validated Successfully.");

                            isValidateCreateTestPage(true);
                            /*commUtil.getAttributeValue(xpathForIssueTypeImage, "alt", function(altText){
                                logger.info("Alt text : "+altText);
                                assert.ok(altText === "Test", "Not validated Test Image.");
                                logger.info("Test Image Validated Successfully.");

                                commUtil.getTextByXpath(xpathForProjectName, function(getProjectName){
                                    assert.equal(getProjectName, params.testdata.project,"Not the same Project");
                                    logger.info("Create Issue Page Project validated Successfully.");

                                    commUtil.getTextByXpath(xpathForIssueType, function(getIssueType){
                                        assert.equal(getIssueType, "Test","Issue Type Test is not Selected");
                                        logger.info("Create Issue Issue Type Test validated Successfully.");
                                        isValidateCreateTestPage(true);
                                    });
                                });
                            });*/
                        });
                    //});
                });
            },function(e) {
                console.error("Browser is not Loaded.");
                isValidateCreateTestPage(false);
            });
        }catch(err){
            isValidateCreateTestPage(false);
        }
    };

    this.createTest = function(createTestMap, isCreatedTest){
        try{
            var counter = 0;
            var mapSize = Object.keys(createTestMap).length;
            if(createTestMap.hasOwnProperty("CLONESUMMARY")){
                mapSize--;
            }
            logger.info("Create Test map Size : " + mapSize);
            this.validateCreateTestPage(function(isValidateCreateTestPage){
                assert.ok(isValidateCreateTestPage, "Not Validated Create Test Page.");
                logger.info("Create Test Page Validated Successfully.");

                if(createTestMap.hasOwnProperty("SUMMARY")){
                    commUtil.sendTextToElement(xpathForSummary, createTestMap.SUMMARY, function(sendSummaryStatus){
                        assert.ok(sendSummaryStatus, "Not Found Summary Field.");
                        logger.info("Summary Given Successfully.");

                        counter++;
                        if (counter === mapSize) {
                            assert.ok(counter === mapSize, "Not Created Cycle.");
                            commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                logger.info("Clicked on Create Button.");
                                //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                commUtil.implicitWait(200000);

                                commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                    assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                    commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                        logger.info("Test Created Successfully. : "+getTestId);
                                        assert.ok(getTestId !== null, "Test ID is Undefined.");
                                        createTestMap["TESTNAME"] = getTestId;
                                        isCreatedTest(true);
                                    });
                                });
                                /*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                    assert.ok(isValidateTest, "Not Validated Test.");
                                    logger.info("Test validated Successfully.");
                                    isCreatedTest(isValidateTest);
                                });*/
                                //isCreatedTest(clickOnSaveButtonStatus);
                            });
                        }
                    });
                }
                if(createTestMap.hasOwnProperty("PRIORITY")){
                    commUtil.getAttributeValue(xpathForPriority, "value", function(currentPriority) {
                        logger.info("Current Priority is : " + currentPriority +" : but looking for : "+createTestMap.PRIORITY);
                        if(currentPriority == createTestMap.PRIORITY){
                            logger.info(createTestMap.PRIORITY + " is already Selected.");

                            counter++;
                            if (counter === mapSize) {
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Create Button.");
                                    //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                    commUtil.implicitWait(200000);
                                    commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                        assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                        commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                            logger.info("Test Created Successfully. : "+getTestId);
                                            assert.ok(getTestId !== null, "Test ID is Undefined.");
                                            createTestMap["TESTNAME"] = getTestId;
                                            isCreatedTest(true);
                                        });
                                    });
                                    /*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                        assert.ok(isValidateTest, "Not Validated Test.");
                                        logger.info("Test validated Successfully.");
                                        isCreatedTest(isValidateTest);
                                    });*/
                                });
                            }
                        }else{
                            logger.info("Else part/.");
                            commUtil.moveToElementByXpath(xpathForPriorityDropDown, function(moveToPriorityDropDownStatus) {
                                assert.ok(moveToPriorityDropDownStatus, "Not Clicked On Priority Drop Down.");
                                commUtil.clickOnElementByXpath(xpathForPriorityDropDown, function(clickOnPriorityDropDownStatus){
                                    assert.ok(clickOnPriorityDropDownStatus, "Not Clicked On Priority Drop Down.");

                                    var xpathForPriority = "//a[text()='"+createTestMap.PRIORITY+"']";
                                    commUtil.waitForElement(xpathForPriority, browser.params.testdata.implicitWaitTimeMedium, function(waitElementStatus) {
                                        assert.ok(waitElementStatus, "Waiting priority popup.");
                                        commUtil.doClickByXpath(xpathForPriority, function(clickOnPriorityStatus){
                                            assert.ok(clickOnPriorityStatus, "Not clicked On Priority.");
                                            commUtil.getAttributeValue(xpathForPriority, "value", function(currentPriority) {
                                                logger.info("After Selecting Current Priority is : " + currentPriority);

                                                counter++;
                                                if (counter === mapSize) {
                                                    assert.ok(counter === mapSize, "Not Created Cycle.");
                                                    commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                                        assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                                        logger.info("Clicked on Create Button.");
                                                        //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                                        commUtil.implicitWait(200000);
                                                        commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                            assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                            commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                                                logger.info("Test Created Successfully. : "+getTestId);
                                                                assert.ok(getTestId !== null, "Test ID is Undefined.");
                                                                createTestMap["TESTNAME"] = getTestId;
                                                                isCreatedTest(true);
                                                            });
                                                        });
                                                        /*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                                         assert.ok(isValidateTest, "Not Validated Test.");
                                                         logger.info("Test validated Successfully.");
                                                         isCreatedTest(isValidateTest);
                                                         });*/
                                                    });
                                                }
                                            });
                                        });
                                    });
                                });
                            });

                        }

                    });
                }
                if(createTestMap.hasOwnProperty("COMPONENT")){
                    driver.sleep(500);
                    if(createTestMap.COMPONENT instanceof Array){
                        for(var i=0; i < createTestMap.COMPONENT.length; i++) {
                            (function (x) {
                                commUtil.sendTextToElement(xpathForComponent, createTestMap.COMPONENT[x], function(sendTextToLabelStatus){
                                    assert.ok(sendTextToLabelStatus, "Not Send Text To Component.");
                                    logger.info(createTestMap.COMPONENT[x]);
                                    commUtil.sendTextToElement(xpathForComponent, "\uE004", function(selectLabelStatus){
                                        assert.ok(selectLabelStatus, "Not Selected Component.");
                                        commUtil.getTextByXpath(xpathForSelectedComponent, function(getCurrentSelectedComponent){
                                            logger.info("Selected Components are :"+getCurrentSelectedComponent);
                                            logger.info("Component Selected Successfully.");
                                            assert.ok((getCurrentSelectedComponent.indexOf(createTestMap.COMPONENT[x]) != -1), "Not Validating Component After Selecting.");
                                            logger.info("Selected Component Validated Successfully After Selected.");

                                            if(x === (createTestMap.COMPONENT.length -1)){
                                                counter++;
                                                if (counter === mapSize) {
                                                    assert.ok(counter === mapSize, "Not Created Cycle.");
                                                    commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                                        assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                                        logger.info("Clicked on Create Button.");
                                                        //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                                        commUtil.implicitWait(200000);

                                                        commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                            assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                            commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                                                logger.info("Test Created Successfully. : "+getTestId);
                                                                assert.ok(getTestId !== null, "Test ID is Undefined.");
                                                                createTestMap["TESTNAME"] = getTestId;
                                                                isCreatedTest(true);
                                                            });
                                                        });
                                                        /*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                                         assert.ok(isValidateTest, "Not Validated Test.");
                                                         logger.info("Test validated Successfully.");
                                                         isCreatedTest(isValidateTest);
                                                         });*/
                                                    });
                                                }
                                            }
                                        });
                                    });
                                });
                            })(i);
                        }
                    }else{
                        commUtil.sendTextToElement(xpathForComponent, createTestMap.COMPONENT, function(sendTextToLabelStatus){
                            assert.ok(sendTextToLabelStatus, "Not Send Text To Component.");
                            logger.info(createTestMap.LABEL);
                            commUtil.sendTextToElement(xpathForComponent, "\uE004", function(selectLabelStatus){
                                assert.ok(selectLabelStatus, "Not Selected Component.");
                                commUtil.getTextByXpath(xpathForSelectedComponent, function(getCurrentComponent){
                                    logger.info("Selected Component : "+getCurrentComponent);
                                    logger.info("Component Selected Successfully.");
                                    assert.equal(getCurrentComponent, createTestMap.COMPONENT, "Not Validating Component After Selecting.");
                                    logger.info("Component Validated Successfully After Selected.");

                                    counter++;
                                    if (counter === mapSize) {
                                        assert.ok(counter === mapSize, "Not Created Test.");
                                        commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                            assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                            logger.info("Clicked on Create Button.");
                                            //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                            commUtil.implicitWait(200000);

                                            commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                                    logger.info("Test Created Successfully. : "+getTestId);
                                                    assert.ok(getTestId !== null, "Test ID is Undefined.");
                                                    createTestMap["TESTNAME"] = getTestId;
                                                    isCreatedTest(true);
                                                });
                                            });
                                            /*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                             assert.ok(isValidateTest, "Not Validated Test.");
                                             logger.info("Test validated Successfully.");
                                             isCreatedTest(isValidateTest);
                                             });*/
                                        });
                                    }
                                });
                            });
                        });
                    }
                   /* if(createTestMap.COMPONENT instanceof Array){
                        for(var i=0; i < createTestMap.COMPONENT.length; i++) {
                            (function (x) {
                                commUtil.clickOnElementByXpath(xpathForComponentDropDown, function(clickOnComponentDropDownStatus){
                                    assert.ok(clickOnComponentDropDownStatus, "Not Clicked On Component Drop Down.");
                                    commUtil.clickOnElementByXpath("//a[contains(text(),'"+createTestMap.COMPONENT[x]+"')]", function(clickOnComponentStatus){
                                        assert.ok(clickOnComponentStatus, "Not Clicked On Component Drop Down.");
                                        commUtil.getTextByXpath(xpathForSelectedComponent, function(getCurrentSelectedComponent){
                                            logger.info("Selected Components are :"+getCurrentSelectedComponent);
                                            logger.info("Component Selected Successfully.");
                                            assert.ok((getCurrentSelectedComponent.indexOf(createTestMap.COMPONENT[x]) != -1), "Not Validating Component After Selecting.");
                                            logger.info("Selected Component Validated Successfully After Selected.");
                                            if(x === (createTestMap.COMPONENT.length -1)){
                                                counter++;
                                                if (counter === mapSize) {
                                                    assert.ok(counter === mapSize, "Not Created Test.");
                                                    commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                                        assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                                        logger.info("Clicked on Create Button.");
                                                        //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                                        commUtil.implicitWait(200000);
                                                        commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                            assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                            commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                                                logger.info("Test Created Successfully. : "+getTestId);
                                                                assert.ok(getTestId !== null, "Test ID is Undefined.");
                                                                createTestMap["TESTNAME"] = getTestId;
                                                                isCreatedTest(true);
                                                            });
                                                        });
                                                        /!*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                                            assert.ok(isValidateTest, "Not Validated Test.");
                                                            logger.info("Test validated Successfully.");
                                                            isCreatedTest(isValidateTest);
                                                        });*!/
                                                    });
                                                }
                                            }
                                        });
                                    });
                                });
                            })(i);
                        }
                    }else{
                        driver.sleep(500);
                        commUtil.doClickByXpath(xpathForComponentDropDown, function(clickOnComponentDropDownStatus){
                            assert.ok(clickOnComponentDropDownStatus, "Not Clicked On Component Drop Down.");
                            driver.sleep(500);
                            commUtil.doClickByXpath("//!*[@id='components-suggestions']//a[text()='"+createTestMap.COMPONENT+"']", function(clickOnComponentStatus){
                                assert.ok(clickOnComponentStatus, "Not Clicked On Component Drop Down.");
                                driver.sleep(500);
                                commUtil.getTextByXpath(xpathForSelectedComponent, function(getCurrentSelectedComponent){
                                    logger.info("Selected Components are :"+getCurrentSelectedComponent);
                                    logger.info("Component Selected Successfully.");
                                    assert.equal(getCurrentSelectedComponent, createTestMap.COMPONENT, "Not Validating Component After Selecting.");
                                    logger.info("Selected Component Validated Successfully After Selected.");

                                    counter++;
                                    if (counter === mapSize) {
                                        assert.ok(counter === mapSize, "Not Created Cycle.");
                                        commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                            assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                            logger.info("Clicked on Create Button.");
                                            //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                            commUtil.implicitWait(200000);

                                            commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                                    logger.info("Test Created Successfully. : "+getTestId);
                                                    assert.ok(getTestId !== null, "Test ID is Undefined.");
                                                    createTestMap["TESTNAME"] = getTestId;
                                                    isCreatedTest(true);
                                                });
                                            });
                                            /!*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                                assert.ok(isValidateTest, "Not Validated Test.");
                                                logger.info("Test validated Successfully.");
                                                isCreatedTest(isValidateTest);
                                            });*!/
                                        });
                                    }
                                });
                            });
                        });
                    }*/
                }
                if(createTestMap.hasOwnProperty("AFFECTEDVERSION")){
                    driver.sleep(500);
                    if(createTestMap.AFFECTEDVERSION instanceof Array){
                        for(var i=0; i < createTestMap.AFFECTEDVERSION.length; i++) {
                            (function (x) {
                                commUtil.clickOnElementByXpath(xpathForAffectedVersionSelectDrpDwn, function(clickOnAffectedVersionDropDownStatus){
                                    assert.ok(clickOnAffectedVersionDropDownStatus, "Not Clicked On Affected version Drop Down.");
                                    commUtil.clickOnElementByXpath("//a[contains(text(),'"+createTestMap.AFFECTEDVERSION[x]+"')]", function(clickOnAffectedVersionStatus){
                                        assert.ok(clickOnAffectedVersionStatus, "Not Clicked On Affected version Drop Down.");
                                        commUtil.getTextByXpath(xpathForSelectedAffectedVersion, function(getCurrentSelectedVersion){
                                            logger.info("Selected Versions are : "+getCurrentSelectedVersion);
                                            logger.info("Affected Version Selected Successfully.");
                                            assert.ok((getCurrentSelectedVersion.indexOf(createTestMap.AFFECTEDVERSION[x]) != -1), "Not Validating Affected Version After Selecting.");
                                            logger.info("Affected Version Validated Successfully After Selected.");

                                            if(x === (createTestMap.AFFECTEDVERSION.length -1)){
                                                counter++;
                                                if (counter === mapSize) {
                                                    assert.ok(counter === mapSize, "Not Created Test.");
                                                    commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                                        assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                                        logger.info("Clicked on Create Button.");
                                                        //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                                        commUtil.implicitWait(200000);

                                                        commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                            assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                            commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                                                logger.info("Test Created Successfully. : "+getTestId);
                                                                assert.ok(getTestId !== null, "Test ID is Undefined.");
                                                                createTestMap["TESTNAME"] = getTestId;
                                                                isCreatedTest(true);
                                                            });
                                                        });
                                                        /*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                                            assert.ok(isValidateTest, "Not Validated Test.");
                                                            logger.info("Test validated Successfully.");
                                                            isCreatedTest(isValidateTest);
                                                        });*/
                                                    });
                                                }
                                            }
                                        });
                                    });
                                });
                            })(i);
                        }
                    }else{
                        commUtil.doClickByXpath(xpathForAffectedVersionSelectDrpDwn, function(clickOnAffectedVersionDropDownStatus){
                            assert.ok(clickOnAffectedVersionDropDownStatus, "Not Clicked On Affected version Drop Down.");
                            commUtil.doClickByXpath("//a[contains(text(),'"+createTestMap.AFFECTEDVERSION+"')]", function(clickOnAffectedVersionStatus){
                                assert.ok(clickOnAffectedVersionStatus, "Not Clicked On Affected version Drop Down.");
                                commUtil.getTextByXpath(xpathForSelectedAffectedVersion, function(getCurrentSelectedVersion){
                                    logger.info("Selected Versions are : "+getCurrentSelectedVersion);
                                    logger.info("Affected Version Selected Successfully.");
                                    assert.equal(getCurrentSelectedVersion, createTestMap.AFFECTEDVERSION, "Not Validating Affected Version After Selecting.");
                                    logger.info("Affected Version Validated Successfully After Selected.");

                                    counter++;
                                    if (counter === mapSize) {
                                        assert.ok(counter === mapSize, "Not Created Cycle.");
                                        commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                            assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                            logger.info("Clicked on Create Button.");
                                            //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                            commUtil.implicitWait(200000);

                                            commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                                    logger.info("Test Created Successfully. : "+getTestId);
                                                    assert.ok(getTestId !== null, "Test ID is Undefined.");
                                                    createTestMap["TESTNAME"] = getTestId;
                                                    isCreatedTest(true);
                                                });
                                            });
                                            /*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                                assert.ok(isValidateTest, "Not Validated Test.");
                                                logger.info("Test validated Successfully.");
                                                isCreatedTest(isValidateTest);
                                            });*/
                                        });
                                    }
                                });
                            });
                        });
                    }
                }
                if(createTestMap.hasOwnProperty("FIXVERSION")){
                    driver.sleep(500);
                    if(createTestMap.FIXVERSION instanceof Array){
                        for(var i=0; i < createTestMap.FIXVERSION.length; i++) {
                            (function (x) {
                                commUtil.sendTextToElement(xpathForFixedVersion, createTestMap.FIXVERSION[x], function(sendTextToFixVersionStatus){
                                    assert.ok(sendTextToFixVersionStatus, "Not Send Text To Fix Version.");
                                    logger.info(createTestMap.FIXVERSION);
                                    commUtil.sendTextToElement(xpathForFixedVersion, "\uE004", function(selectFixVersionStatus){
                                        assert.ok(selectFixVersionStatus, "Not Selected Fix Version.");
                                        commUtil.getTextByXpath(xpathForSelectedFixVersion, function(getCurrentSelectedVersion){
                                            logger.info("Selected Versions are : "+getCurrentSelectedVersion);
                                            logger.info("Fix-Version Selected Successfully.");
                                            assert.ok((getCurrentSelectedVersion.indexOf(createTestMap.FIXVERSION[x]) != -1), "Not Validating Fix Version After Selecting.");
                                            logger.info("Fix Version Validated Successfully After Selected.");

                                            if(x === (createTestMap.FIXVERSION.length -1)){
                                                counter++;
                                                if (counter === mapSize) {
                                                    assert.ok(counter === mapSize, "Not Created Test.");
                                                    commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                                        assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                                        logger.info("Clicked on Create Button.");
                                                        //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                                        commUtil.implicitWait(200000);

                                                        commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                            assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                            commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                                                logger.info("Test Created Successfully. : "+getTestId);
                                                                assert.ok(getTestId !== null, "Test ID is Undefined.");
                                                                createTestMap["TESTNAME"] = getTestId;
                                                                isCreatedTest(true);
                                                            });
                                                        });
                                                        /*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                                            assert.ok(isValidateTest, "Not Validated Test.");
                                                            logger.info("Test validated Successfully.");
                                                            isCreatedTest(isValidateTest);
                                                        });*/
                                                    });
                                                }
                                            }
                                        });
                                    });
                                });
                            })(i);
                        }
                    }else{
                        commUtil.sendTextToElement(xpathForFixedVersion, createTestMap.FIXVERSION, function(sendTextToFixVersionStatus){
                            assert.ok(sendTextToFixVersionStatus, "Not Send Text To Fix Version.");
                            logger.info(createTestMap.FIXVERSION);
                            commUtil.sendTextToElement(xpathForFixedVersion, "\uE004", function(selectFixVersionStatus){
                                assert.ok(selectFixVersionStatus, "Not Selected Fix Version.");
                                commUtil.getTextByXpath(xpathForSelectedFixVersion, function(getCurrentSelectedVersion){
                                    logger.info("Selected Versions are : "+getCurrentSelectedVersion);
                                    logger.info("Fix-Version Selected Successfully.");
                                    assert.equal(getCurrentSelectedVersion, createTestMap.FIXVERSION, "Not Validating Fix Version After Selecting.");
                                    logger.info("Fix Version Validated Successfully After Selected.");

                                    counter++;
                                    if (counter === mapSize) {
                                        assert.ok(counter === mapSize, "Not Created Cycle.");
                                        commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                            assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                            logger.info("Clicked on Create Button.");
                                            //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                            commUtil.implicitWait(200000);

                                            commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                                    logger.info("Test Created Successfully. : "+getTestId);
                                                    assert.ok(getTestId !== null, "Test ID is Undefined.");
                                                    createTestMap["TESTNAME"] = getTestId;
                                                    isCreatedTest(true);
                                                });
                                            });
                                            /*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                                assert.ok(isValidateTest, "Not Validated Test.");
                                                logger.info("Test validated Successfully.");
                                                isCreatedTest(isValidateTest);
                                            });*/
                                        });
                                    }
                                });
                            });
                        });

                    }
                                        /*commUtil.clickOnElementByXpath(xpathForFixVersionDropDown, function(clickOnFixVersionDropDownStatus){
                        assert.ok(clickOnFixVersionDropDownStatus, "Not Clicked On Fix version Drop Down.");
                        logger.info(createTestMap.FIXVERSION);
                        driver.sleep(1000);
                        commUtil.clickOnElementByXpath("//a[contains(text(),'"+createTestMap.FIXVERSION+"')]", function(clickOnFixVersionStatus){
                            assert.ok(clickOnFixVersionStatus, "Not Clicked On Fix version Drop Down.");
                            commUtil.getTextByXpath(xpathForSelectedFixVersion, function(getCurrentSelectedVersion){
                                logger.info("Selected Versions are : "+getCurrentSelectedVersion);
                                logger.info("Fix-Version Selected Successfully.");
                                assert.equal(getCurrentSelectedVersion, createTestMap.FIXVERSION, "Not Validating Fix Version After Selecting.");
                                logger.info("Fix Version Validated Successfully After Selected.");

                                counter++;
                                if (counter === mapSize) {
                                    assert.ok(counter === mapSize, "Not Created Cycle.");
                                    commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                        assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                        logger.info("Clicked on Create Button.");
                                        //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                        commUtil.implicitWait(200000);

                                        ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                            assert.ok(isValidateTest, "Not Validated Test.");
                                            logger.info("Test validated Successfully.");
                                            isCreatedTest(isValidateTest);
                                        });
                                    });
                                }
                            });
                        });
                    });*/
                }
                if(createTestMap.hasOwnProperty("ENVIRONMENT")){
                    driver.sleep(1000);
                    commUtil.sendTextToElement(xpathForEnvironmentTextArea, createTestMap.ENVIRONMENT, function(sendTextToEnvironmentTextAreaStatus){
                        assert.ok(sendTextToEnvironmentTextAreaStatus, "Not Send Text To Environment Text Area.");
                        logger.info(createTestMap.ENVIRONMENT);
                        commUtil.getAttributeValue(xpathForEnvironmentTextArea, "value", function(attributeValue){
                            logger.info("Attribute Value : " + attributeValue);
                            assert.equal(attributeValue, createTestMap.ENVIRONMENT, "Not validated Environment After Given.");
                            logger.info("Test Environment Validated Successfully After Given.");

                            counter++;
                            if (counter === mapSize) {
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Create Button.");
                                    //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                    commUtil.implicitWait(200000);

                                    commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                        assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                        commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                            logger.info("Test Created Successfully. : "+getTestId);
                                            assert.ok(getTestId !== null, "Test ID is Undefined.");
                                            createTestMap["TESTNAME"] = getTestId;
                                            isCreatedTest(true);
                                        });
                                    });
                                    /*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                        assert.ok(isValidateTest, "Not Validated Test.");
                                        logger.info("Test validated Successfully.");
                                        isCreatedTest(isValidateTest);
                                    });*/
                                });
                            }
                        });
                    });
                }
                if(createTestMap.hasOwnProperty("DESCRIPTION")){
                    driver.sleep(1000);
                    commUtil.sendTextToElement(xpathForDescriptionTextArea, createTestMap.DESCRIPTION, function(sendTextToDescTextAreaStatus){
                        assert.ok(sendTextToDescTextAreaStatus, "Not Send Text To Description Text Area.");
                        logger.info(createTestMap.DESCRIPTION);
                        commUtil.getAttributeValue(xpathForDescriptionTextArea, "value", function(attributeValue){
                            logger.info("Attribute Value : " + attributeValue);
                            assert.equal(attributeValue, createTestMap.DESCRIPTION, "Not validated Description After Given.");
                            logger.info("Test Description Validated Successfully After Given.");

                            counter++;
                            if (counter === mapSize) {
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Create Button.");
                                    //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                    commUtil.implicitWait(200000);

                                    commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                        assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                        commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                            logger.info("Test Created Successfully. : "+getTestId);
                                            assert.ok(getTestId !== null, "Test ID is Undefined.");
                                            createTestMap["TESTNAME"] = getTestId;
                                            isCreatedTest(true);
                                        });
                                    });
                                    /*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                        assert.ok(isValidateTest, "Not Validated Test.");
                                        logger.info("Test validated Successfully.");
                                        isCreatedTest(isValidateTest);
                                    });*/
                                });
                            }
                        });
                    });
                }
                if(createTestMap.hasOwnProperty("ATTACHMENT")){
                    driver.sleep(500);
                    //var xpathForAttachment = "//*[*[text()='Attachment']]/following-sibling::div//input[@type='file']";
                    var  xpathForAttachment = "//input[@class='issue-drop-zone__file ignore-inline-attach']";
                    commUtil.moveToElementByXpath("//*[*[text()='Attachment']]", function(moveToElement){
                       assert.ok(moveToElement);
                        driver.isElementPresent(by.xpath(xpathForAttachment)).then(function(isPresent){
                            logger.info(isPresent);
                            driver.findElement(by.xpath(xpathForAttachment)).isEnabled().then(function(isPresent1) {
                                logger.info(isPresent1);
                                commUtil.hoverElementByXpath(xpathForAttachment, function(hoverOnAddFileLinkStatus){
                                    assert.ok(hoverOnAddFileLinkStatus, "Not hovered On Add Files Link.");
                                    var path = require('path');
                                    var absolutePath = "E:\\project_zfjcloud\\zfjconnect\\test\\resources\\"+createTestMap.ATTACHMENT;
                                    //var fileToUpload = 'E:\\Installation\\ex.png';
                                    //var absolutePath = path.resolve(__dirname, attachmentFile);
                                    //var absolutePath = path.resolve("./test/resources/", createTestMap.ATTACHMENT);
                                    logger.info(absolutePath);
                                    //commUtil.sendTextToElement(xpathForAttachment,absolutePath, function(sendToElementStatus){
                                    driver.findElement(By.xpath(xpathForAttachment)).click();
                                    driver.findElement(By.xpath(xpathForAttachment)).sendKeys("E:\\project_zfjcloud\\zfjconnect\\test\\resources\\upload.png").then(function(sendToElementStatus) {
                                        //commUtil.sendTextToWebelement(".//*[@id='fileupload']", "E:/Installation/ex.png", function(sendToElementStatus){
                                        //assert.ok(sendToElementStatus, "Not uploaded the file.");
                                        logger.info("Attachment is uploaded.");
                                        commUtil.waitForElement("//*[*[text()='Attachment']]/following-sibling::div/div[contains(@class,'upload-progress-bar__upload-finished')]", browser.params.testdata.implicitWaitTimeMedium , function(waitForAttachments){
                                            assert.ok(waitForAttachments, "Not waiting for Attachments.");
                                            commUtil.searchTextFromElements("//*[*[text()='Attachment']]/following-sibling::div/div[contains(@class,'upload-progress-bar__upload-finished')]/span[@class='upload-progress-bar__file-name']", function(searchAttachments){
                                                assert.ok(searchAttachments, "Not Validated Attachments after attach.");
                                                logger.info("Attachment Validated Successfully.");

                                                counter++;
                                                if (counter === mapSize) {
                                                    assert.ok(counter === mapSize, "Not Created Test.");
                                                    commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                                        assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                                        logger.info("Clicked on Create Button.");
                                                        //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                                        commUtil.implicitWait(200000);

                                                        commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                            assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                            commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                                                logger.info("Test Created Successfully. : "+getTestId);
                                                                assert.ok(getTestId !== null, "Test ID is Undefined.");
                                                                createTestMap["TESTNAME"] = getTestId;
                                                                isCreatedTest(true);
                                                            });
                                                        });
                                                        /*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                                            assert.ok(isValidateTest, "Not Validated Test.");
                                                            logger.info("Test validated Successfully.");
                                                            isCreatedTest(isValidateTest);
                                                        });*/
                                                    });
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
                if(createTestMap.hasOwnProperty("LABEL")){
                    driver.sleep(500);
                    if(createTestMap.LABEL instanceof Array){
                        for(var i=0; i < createTestMap.LABEL.length; i++) {
                            (function (x) {
                                commUtil.sendTextToElement(xpathForLabelTextArea, createTestMap.LABEL[x], function(sendTextToLabelStatus){
                                    assert.ok(sendTextToLabelStatus, "Not Send Text To Label.");
                                    logger.info(createTestMap.LABEL[x]);
                                    commUtil.sendTextToElement(xpathForLabelTextArea, "\uE004", function(selectLabelStatus){
                                        assert.ok(selectLabelStatus, "Not Selected Label.");
                                        commUtil.getTextByXpath(xpathForSelectedLabel, function(getCurrentLabel) {
                                            logger.info("Selected Label : " + getCurrentLabel);
                                            logger.info("Label Selected Successfully.");
                                            assert.ok((getCurrentLabel.indexOf(createTestMap.LABEL[x]) != -1), "Not Validating Label After Selecting.");
                                            if(x === (createTestMap.LABEL.length -1)){
                                                counter++;
                                                if (counter === mapSize) {
                                                    assert.ok(counter === mapSize, "Not Created Cycle.");
                                                    commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                                        assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                                        logger.info("Clicked on Create Button.");
                                                        //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                                        commUtil.implicitWait(200000);

                                                        commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                            assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                            commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                                                logger.info("Test Created Successfully. : "+getTestId);
                                                                assert.ok(getTestId !== null, "Test ID is Undefined.");
                                                                createTestMap["TESTNAME"] = getTestId;
                                                                isCreatedTest(true);
                                                            });
                                                        });
                                                        /*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                                            assert.ok(isValidateTest, "Not Validated Test.");
                                                            logger.info("Test validated Successfully.");
                                                            isCreatedTest(isValidateTest);
                                                        });*/
                                                    });
                                                }
                                            }
                                        });
                                    });
                                });
                            })(i);
                        }
                    }else{
                        commUtil.sendTextToElement(xpathForLabelTextArea, createTestMap.LABEL, function(sendTextToLabelStatus){
                            assert.ok(sendTextToLabelStatus, "Not Send Text To Label.");
                            logger.info(createTestMap.LABEL);
                            commUtil.sendTextToElement(xpathForLabelTextArea, "\uE004", function(selectLabelStatus){
                                assert.ok(selectLabelStatus, "Not Selected Label.");
                                commUtil.getTextByXpath(xpathForSelectedLabel, function(getCurrentLabel){
                                    logger.info("Selected Label : "+getCurrentLabel);
                                    logger.info("Label Selected Successfully.");
                                    assert.equal(getCurrentLabel, createTestMap.LABEL, "Not Validating Label After Selecting.");
                                    logger.info("Label Validated Successfully After Selected.");

                                    counter++;
                                    if (counter === mapSize) {
                                        assert.ok(counter === mapSize, "Not Created Cycle.");
                                        commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                            assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                            logger.info("Clicked on Create Button.");
                                            //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                            commUtil.implicitWait(200000);

                                            commUtil.waitForElement(xpathForSuccessfulPopupDivTag, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                commUtil.getAttributeValue(xpathForSuccessfulIssueCreatedLink, "data-issue-key", function(getTestId){
                                                    logger.info("Test Created Successfully. : "+getTestId);
                                                    assert.ok(getTestId !== null, "Test ID is Undefined.");
                                                    createTestMap["TESTNAME"] = getTestId;
                                                    isCreatedTest(true);
                                                });
                                            });
                                            /*ViewTestPage.validateTestCreate(createTestMap, function(isValidateTest){
                                                assert.ok(isValidateTest, "Not Validated Test.");
                                                logger.info("Test validated Successfully.");
                                                isCreatedTest(isValidateTest);
                                            });*/
                                        });
                                    }
                                });
                            });
                        });
                    }
                }
            });
        }catch(e){
            console.error(e);
            isCreatedTest(false);
        }
    };

    this.createTestDirectly = function(createTestMap, isCreatedTest){
        try{
            var counter = 0;
            var mapSize = Object.keys(createTestMap).length;
            if(createTestMap.hasOwnProperty("CLONESUMMARY")){
                mapSize--;
            }
            if(createTestMap.hasOwnProperty("STEPSTOCREATE")){
                mapSize--;
            }
            if(createTestMap.hasOwnProperty("TESTNAME")){
                delete createTestMap["TESTNAME"];
                mapSize--;
            }
            logger.info("Create Test map Size : "+mapSize);
            driver.switchTo().defaultContent();
            commUtil.waitForElement("//*[@id='create-issue-dialog']", browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueDialogStatus) {
                assert.ok(waitForCreateIssueDialogStatus, "Not Visible Create Issue Dialog.");
                driver.sleep(500);
                commUtil.getTextByXpath("//*[@id='create-issue-dialog']//h2", function(headerText){
                    assert.equal(headerText, "Create Issue", headerText+"Not validated Create Test Header.");
                    logger.info("Create Test Header Validated Successfully.");
                    commUtil.getAttributeValue("//*[@id='project-field']", "value", function(currentProject) {
                        logger.info("Current Project is : " + currentProject);
                        assert.ok(currentProject.indexOf(params.testdata.project) != -1,"Not the same Project");
                        logger.info("Create Issue Page Project validated Successfully.");
                        if(createTestMap.hasOwnProperty("ISSUETYPE")){
                            commUtil.getAttributeValue("//*[@id='issuetype-field']", "value", function(currentIssueType) {
                                logger.info("Current Issue Type is : " + currentIssueType);
                                if(currentIssueType === createTestMap.ISSUETYPE){
                                    logger.info(createTestMap.ISSUETYPE + " is already Selected.");
                                    counter++;
                                    if (counter === mapSize) {
                                        assert.ok(counter === mapSize, "Not Created Cycle.");
                                        commUtil.clickOnElementByXpath("//*[@id='create-issue-submit']", function (clickOnSaveButtonStatus) {
                                            assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                            logger.info("Clicked on Create Button.");
                                            commUtil.waitForElement("//div[@id='aui-flag-container']/div/div", browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                commUtil.getTextByXpath("//a[@class='issue-created-key issue-link']", function(getTestId){
                                                    assert.ok(getTestId == undefined, "Test ID is Undefined.");
                                                    logger.info("Test Created Successfully. : "+getTestId);
                                                    createTestMap["TESTNAME"] = getTestId;
                                                    isCreatedTest(true);
                                                });
                                            });
                                        });
                                    }
                                }else{
                                    commUtil.sendTextToElement("//*[@id='issuetype-field']", createTestMap.ISSUETYPE, function(sendValue){
                                        driver.sleep(500);
                                        commUtil.sendTextToElement("//*[@id='issuetype-field']", "\uE004", function(selectLabelStatus) {
                                            assert.ok(selectLabelStatus, "Not Selected Component.");
                                            commUtil.getAttributeValue("//*[@id='issuetype-field']", "value", function(currentIssueType) {
                                                logger.info("After Selecting Current Issue Type is : " + currentIssueType);
                                                counter++;
                                                if (counter === mapSize) {
                                                    assert.ok(counter === mapSize, "Not Created Test.");
                                                    commUtil.clickOnElementByXpath("//*[@id='create-issue-submit']", function (clickOnSaveButtonStatus) {
                                                        assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                                        logger.info("Clicked on Create Button.");
                                                        commUtil.waitForElement("//div[@id='aui-flag-container']/div/div", browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                            assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                            commUtil.getTextByXpath("//a[@class='issue-created-key issue-link']", function(getTestId){
                                                                assert.ok(getTestId == undefined, "Test ID is Undefined.");
                                                                logger.info("Test Created Successfully. : "+getTestId);
                                                                createTestMap["TESTNAME"] = getTestId;
                                                                isCreatedTest(true);
                                                            });
                                                        });
                                                    });
                                                }
                                            });
                                        });
                                    });
                                    /*commUtil.doClickByXpath("//!*[@id='issuetype-field']/following-sibling::span", function(clickOnPriorityDropDownStatus){
                                        assert.ok(clickOnPriorityDropDownStatus, "Not Clicked On IssueType Drop Down.");
                                        driver.sleep(500);
                                        logger.info("Issue Type we are going to select :"+createTestMap.ISSUETYPE);
                                        var xpathForSelectIssueType="//!*[@id='issuetype-suggestions']//li[a[contains(text(),'"+createTestMap.ISSUETYPE+"')]]";
                                        logger.info(xpathForSelectIssueType);
                                        commUtil.doClickByXpath(xpathForSelectIssueType, function(clickOnIssueTypeStatus){
                                            assert.ok(clickOnIssueTypeStatus, "Not clicked On Issue Type.");
                                            driver.sleep(1500);
                                            commUtil.getAttributeValue("//!*[@id='issuetype-field']", "value", function(currentIssueType) {
                                                logger.info("After Selecting Current Issue Type is : " + currentIssueType);
                                                counter++;
                                                if (counter === mapSize) {
                                                    assert.ok(counter === mapSize, "Not Created Test.");
                                                    commUtil.clickOnElementByXpath("//!*[@id='create-issue-submit']", function (clickOnSaveButtonStatus) {
                                                        assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                                        logger.info("Clicked on Create Button.");
                                                        commUtil.waitForElement("//div[@id='aui-flag-container']/div/div", browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                            assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                            commUtil.getTextByXpath("//a[@class='issue-created-key issue-link']", function(getTestId){
                                                                assert.ok(getTestId == undefined, "Test ID is Undefined.");
                                                                logger.info("Test Created Successfully. : "+getTestId);
                                                                createTestMap["TESTNAME"] = getTestId;
                                                                isCreatedTest(true);
                                                            });
                                                        });
                                                    });
                                                }
                                            });
                                        });
                                    });*/
                                }

                            });
                        }
                        if(createTestMap.hasOwnProperty("SUMMARY")){
                            commUtil.sendTextToElement(xpathForSummary, createTestMap.SUMMARY, function(sendSummaryStatus){
                                assert.ok(sendSummaryStatus, "Not Found Summary Field.");
                                logger.info("Summary Given Successfully.");

                                counter++;
                                if (counter === mapSize) {
                                    assert.ok(counter === mapSize, "Not Created Cycle.");
                                    commUtil.clickOnElementByXpath("//*[@id='create-issue-submit']", function (clickOnSaveButtonStatus) {
                                        assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                        logger.info("Clicked on Create Button.");
                                        commUtil.waitForElement("//a[@class='issue-created-key issue-link']", browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                            assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                            commUtil.getAttributeValue("//a[@class='issue-created-key issue-link']", "data-issue-key", function(getTestId){
                                                logger.info("Test Created Successfully. : "+getTestId);
                                                assert.ok(getTestId !== undefined, "Test ID is Undefined.");
                                                createTestMap["TESTNAME"] = getTestId;
                                                if(createTestMap.hasOwnProperty("STEPSTOCREATE")){
                                                    ViewTestPage.quickSearch(createTestMap, function(searchedTestStatus) {
                                                        assert.ok(searchedTestStatus, "Not Searched Test.");
                                                        logger.info("Steps : "+createTestMap);

                                                    });
                                                }else{
                                                    isCreatedTest(true);
                                                }

                                            });
                                        });
                                    });
                                }
                            });
                        }
                        if(createTestMap.hasOwnProperty("LABEL")){
                            driver.sleep(1000);
                            commUtil.sendTextToElement(xpathForLabelTextArea, createTestMap.LABEL, function(sendTextToLabelStatus){
                                assert.ok(sendTextToLabelStatus, "Not Send Text To Label.");
                                logger.info(createTestMap.LABEL);
                                commUtil.sendTextToElement(xpathForLabelTextArea, "\uE004", function(selectLabelStatus){
                                    assert.ok(selectLabelStatus, "Not Selected Label.");
                                    commUtil.getTextByXpath(xpathForSelectedLabel, function(getCurrentLabel){
                                        logger.info("Selected Label : "+getCurrentLabel);
                                        logger.info("Label Selected Successfully.");
                                        assert.equal(getCurrentLabel, createTestMap.LABEL, "Not Validating Label After Selecting.");
                                        logger.info("Label Validated Successfully After Selected.");

                                        counter++;
                                        if (counter === mapSize) {
                                            assert.ok(counter === mapSize, "Not Created Cycle.");
                                            commUtil.clickOnElementByXpath("//*[@id='create-issue-submit']", function (clickOnSaveButtonStatus) {
                                                assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                                logger.info("Clicked on Create Button.");
                                                commUtil.waitForElement("//a[@class='issue-created-key issue-link']", browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateIssueStatus){
                                                    assert.ok(waitForCreateIssueStatus, "Not Created Successfully.");
                                                    commUtil.getAttributeValue("//a[@class='issue-created-key issue-link']", "data-issue-key", function(getTestId){
                                                        logger.info("Test Created Successfully. : "+getTestId);
                                                        assert.ok(getTestId !== undefined, "Test ID is Undefined.");
                                                        createTestMap["TESTNAME"] = getTestId;
                                                        isCreatedTest(true);
                                                    });
                                                });
                                            });
                                        }
                                    });
                                });
                            });
                        }
                    });
                });
            });
        }catch(e){
            console.error(e);
            isCreatedTest(false);
        }
    };
    this.createTest12 = function(map) {
      driver.wait(function(){
          commUtil.waitForElementByXpath("//*[@id='issue-create']/descendant::*[text()='Issue Type']/following-sibling::img");
          commUtil.getTextUsingWebElement(project).then(function(projectName){
              logger.info("Project selected: "+projectName);
              expect(projectName).toBe(params.testdata.project);
          });
          commUtil.getAttributeValueUsingWebElement(xpathToGetIssueType,"alt").then(function(issueType){
              logger.info("issueType: "+issueType);
              expect(issueType).toBe("Test");
          });
          commUtil.getTextUsingWebElement(xpathToGetIssueName).then(function(issueName){
              logger.info("issueName: "+issueName);
              expect(issueName).toBe("Test");
          });
          commUtil.isElementDisplayed(xpathToValidateCreatePage).then(function(value){
              if(value === true){
                  logger.info("CreateTestPage validated successfully...!");
              }
          });
          commUtil.implecitWait(20000);
          summaryTextbox.clear();
          summaryTextbox.sendKeys(map.SUMMARY).then(function(){
              logger.info("Test summary Entered : "+map.SUMMARY);
          });

          //To select priority
          commUtil.getAttributeValueUsingWebElement(xpathToEnterPriority,"value").then(function(selectedPriority){
              if(!(selectedPriority === map.PRIORITY)){
                  xpathOfPriorityDropdown.click().then(function(){
                      commUtil.sleep(1000);
                      commUtil.changeToWebElement("//a[contains(text(),'"+map.PRIORITY+"')]").click().then(function(){
                          logger.info("Priority Selected: "+map.PRIORITY);
                      });
                      commUtil.sleep(1000);
                  });
              }
          });

          //To select component
          xpathOfComponentDropdown.click().then(function(){
              commUtil.sleep(1000);
              commUtil.changeToWebElement("//a[contains(text(),'"+map.COMPONENT+"')]").click().then(function(){
                  logger.info("Component Selected: "+map.COMPONENT);
              });
              commUtil.sleep(1000);
          });

          //To select affectedVersion
          xpathOfAffectedVersionDropdown.click().then(function(){
              commUtil.sleep(1000);
              commUtil.changeToWebElement("//a[contains(text(),'"+map.AFFECTEDVERSION+"')]").click().then(function(){
                  logger.info("AffectedVersion Selected: "+map.AFFECTEDVERSION);
              });
              commUtil.sleep(1000);
          });

          //To select fixVersion
          toEnterFixVersion.isPresent().then(function(value){
              if(value === true){
                  commUtil.sleep(1000);
                  toEnterFixVersion.clear();
                  toEnterFixVersion.sendKeys(map.FIXVERSION);
                  toEnterFixVersion.sendKeys('\uE004').then(function(){
                      logger.info("FixVersion Selected: "+map.FIXVERSION);
                  });
                  commUtil.sleep(1000);
              }

          });

          //To enter Environment
          commUtil.sleep(1000);
          toEnterEnvironment.clear();
          toEnterEnvironment.sendKeys(map.ENVIRONMENT).then(function(){
              logger.info("Environment Entered: "+map.ENVIRONMENT);
          });
          commUtil.sleep(1000);

          //To enter Description
          commUtil.sleep(1000);
          toEnterDescription.clear();
          toEnterDescription.sendKeys(map.DESCRIPTION).then(function(){
              logger.info("Description Entered: "+map.DESCRIPTION);
          });
          commUtil.sleep(1000);

          //To enter Label
          commUtil.sleep(1000);
          toEnterLabel.clear();
          toEnterLabel.sendKeys(map.LABEL);
          toEnterLabel.sendKeys('\uE004').then(function(){
              logger.info("Label Entered: "+map.LABEL);
          });
          commUtil.sleep(2000);
          createIssueBtn.click();
          commUtil.implecitWait(browser.params.testdata.implicitWaitTimeMedium);
          ViewTestPage.validateTestCreate(map);
          return true;
      },browser.params.testdata.waitTimeOutLow,"Creating Test failed...!");
  };
    this.createTestWithSummary = function(summary, callback) {
       try{
           driver.wait(function(){
               return driver.executeScript("return document.readyState").then(function(state){
                   logger.info("ready state status : " + state);
                   return state === "complete";
               });
           }, browser.params.testdata.implicitWaitTimeMedium, "Browser is not loaded properly.").then(function(pageLoadStatus){
               assert.ok(pageLoadStatus, "Not loaded the page.");
               commUtil.waitForElement("//*[@id='issue-create']/descendant::*[text()='Issue Type']/following-sibling::img", function(waitForPageStatus){
                   assert.ok(waitForPageStatus, "Not Visible Test image in Create Test page.");
                   commUtil.getTextByXpath("//*[@id='issue-create-project-name']", function(projectName){
                       assert.equal(projectName, params.testdata.project, "Project is not Selected.");
                       logger.info("Project selected : "+projectName);
                       commUtil.getAttributeValueUsingWebElement(xpathToGetIssueType,"alt").then(function(issueType){
                           assert.equal(issueType, "Test", "Issue Type Test is not Selected.");
                           logger.info("issueType Selected : "+issueType);
                           commUtil.getTextUsingWebElement(xpathToGetIssueName).then(function(issueName){
                               assert.equal(issueName, "Test", "Issue Name is not Validated.");
                               logger.info("issueName Selected : "+issueName);
                               commUtil.isElementDisplayed(xpathToValidateCreatePage).then(function(value){
                                   assert.ok(value,  "Create Test Page Not Validated.");
                                   logger.info("CreateTestPage validated successfully...!");

                                   summaryTextbox.clear();
                                   summaryTextbox.sendKeys(summary);
                                   commUtil.clickOnElementByxpath("//*[@id='issue-create-submit']", function(clickOnCreateBtnStatus){
                                       assert.ok(clickOnCreateBtnStatus, "Not Clicked on Create Button.");
                                       logger.info("Clicked On Create Test Button.");
                                       commUtil.implecitWait(browser.params.testdata.implicitWaitTimeMedium);
                                       logger.info("Test is Created Successfully.");
                                       ViewTestPage.validateTestWithSummary(summary, function(getTestID){
                                           //expect(getTestID)
                                           callback(getTestID);
                                       });
                                   });
                               });
                           });
                       });
                   });
               });

           });


          /* driver.wait(function(){


               commUtil.waitForElementByXpath("/*//*[@id='issue-create']/descendant::*[text()='Issue Type']/following-sibling::img");
               commUtil.getTextUsingWebElement(project).then(function(projectName){

               });
               commUtil.getAttributeValueUsingWebElement(xpathToGetIssueType,"alt").then(function(issueType){
                   assert.equal(issueType, "Test", "Issue Type Test is not Selected.");
                   logger.info("issueType Selected : "+issueType);
               });
               commUtil.getTextUsingWebElement(xpathToGetIssueName).then(function(issueName){
                   assert.equal(issueName, "Test", "Issue Name is not Validated.");
                   logger.info("issueName Selected : "+issueName);
               });
               commUtil.isElementDisplayed(xpathToValidateCreatePage).then(function(value){
                   assert.ok(value,  "Create Test Page Not Validated.");
                   logger.info("CreateTestPage validated successfully...!");
               });
               commUtil.implecitWait(20000);
               summaryTextbox.clear();
               summaryTextbox.sendKeys(summary);

               commUtil.sleep(1000);
               createIssueBtn.click();
               commUtil.implecitWait(20000);
               return true;
           },60000,"Creating Test failed...!").then(function(createTestStatus){
               assert.ok(createTestStatus, "Not Created Test.");
               logger.info("Test is Created Successfully.");
               ViewTestPage.validateTestWithSummary(summary, function(getTestID){
                   //expect(getTestID)
                   callback(getTestID);
               });
           });*/
       }catch(err){
           throw err;
       }
    };
};
module.exports= new CreateTestPage();