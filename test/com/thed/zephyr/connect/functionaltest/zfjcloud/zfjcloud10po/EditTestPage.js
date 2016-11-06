var commUtil = require('../../utils/commUtil.js');
var ViewTestPage = require('./ViewTestPage.js');

/******************************************************
 * 	WEBELEMENTS
 *****************************************************/
/*var summaryTextbox = element(by.id('summary'));
var updateIssueBtn = element(by.id('edit-issue-submit'));
var priorityField = element(by.id('priority-field'));
var componentField = element(by.id('components-textarea'));
var affectedVersionField = element(by.id('versions-textarea'));
var fixVersionField = element(by.id('fixVersions-textarea'));
var environmentField = element(by.id('environment'));
var descriptionField = element(by.id('description'));
var labelField = element(by.id('labels-textarea'));
var headerOfEditTestPage = element(by.xpath("/*//*[@id='edit-issue-dialog']//h2"));*/
var componentField = element(by.id('components-textarea'));
var xpathForIssueTypeImage = "//*[@id='issue-create']/descendant::*[text()='Issue Type']/following-sibling::img";
var xpathForProjectName = "//*[@id='issue-create-project-name']";
var xpathForIssueType = "//*[@id='issue-create-issue-type']";
var xpathForCreateTestHeader = "//*[@id='content']//h1";
var xpathForSummary = "//*[@id='summary']";
var xpathForPriority = "//*[@id='priority-field']";
var xpathForPriorityDropDown = "//*[@id='priority-single-select']/span";
var xpathForComponent = "//*[@id='components-textarea']";
var xpathForFixedVersion = "//*[@id='fixVersions-textarea']";
var xpathForFixVersionDropDown = "//*[@id='fixVersions-multi-select']/span";
var xpathForSelectedFixVersion = "//*[@id='fixVersions-textarea']/following-sibling::div[@class='representation']";
var xpathForAffectedVersion = "//*[@id='versions-textarea']";
var xpathForAffectedVersionSelectDrpDwn = "//*[@id='versions-multi-select']/span";
var xpathForSelectedAffectedVersion = "//*[@id='versions-textarea']/following-sibling::div[@class='representation']";
var xpathForComponent = "//*[@id='components-textarea']";
var xpathForComponentDropDown ="//*[@id='components-multi-select']/span";
var xpathForSelectedComponent = "//*[@id='components-textarea']/following-sibling::div[@class='representation']";
var xpathForEnvironmentTextArea = "//*[@id='environment']";
var xpathForDescriptionTextArea = "//*[@id='description']";
var xpathForLabelTextArea = "//*[@id='labels-textarea']";
var xpathForSelectedLabel = ".//*[@id='labels-textarea']/following-sibling::div[@class='representation']";

var xpathForCreateButton = "//*[@id='edit-issue-submit']";
/******************************************************
 * 	PAGE OBJECT METHODS
 *****************************************************/


var EditTestPage = function() {

    this.editTest = function(createTestMap, editTestMap, isEditedTest){
        try{
            var counter = 0;
            logger.info("Edit Test map Size : "+Object.keys(editTestMap).length);
            var mapSize = Object.keys(editTestMap).length;
            validateEditTestPage(createTestMap.TESTNAME, function(isValidateEditTestPage){
                assert.ok(isValidateEditTestPage, "Not Validated Edit Test Page.");
                logger.info("Edit Test Page Validated Successfully.");

                if(editTestMap.hasOwnProperty("SUMMARY")){
                    commUtil.sendTextToElement(xpathForSummary, editTestMap.SUMMARY, function(sendSummaryStatus){
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

                                //isEditedTest(clickOnSaveButtonStatus);
                                require('./ViewTestPage.js').validateTestCreate(editTestMap, function(isValidateTest){
                                    assert.ok(isValidateTest, "Not Validated Test.");
                                    logger.info("Test validated Successfully.");
                                    isEditedTest(isValidateTest);
                                });
                            });
                        }
                    });
                }
                if(editTestMap.hasOwnProperty("PRIORITY")){
                    commUtil.getAttributeValue(xpathForPriority, "value", function(currentPriority) {
                        logger.info("Current Priority is : " + currentPriority);
                        if(currentPriority == editTestMap.PRIORITY){
                            logger.info(editTestMap.PRIORITY + " is already Selected.");

                            counter++;
                            if (counter === mapSize) {
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Create Button.");
                                    //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                    commUtil.implicitWait(200000);
                                    //isEditedTest(clickOnSaveButtonStatus);
                                    require('./ViewTestPage.js').validateTestCreate(editTestMap, function(isValidateTest){
                                        assert.ok(isValidateTest, "Not Validated Test.");
                                        logger.info("Test validated Successfully.");
                                        isEditedTest(isValidateTest);
                                    });
                                });
                            }
                        }else{
                            commUtil.clickOnElementByXpath(xpathForPriorityDropDown, function(clickOnPriorityDropDownStatus){
                                assert.ok(clickOnPriorityDropDownStatus, "Not Clicked On Priority Drop Down.");

                                commUtil.clickOnElementByXpath("//a[contains(text(),'"+editTestMap.PRIORITY+"')]", function(clickOnPriorityStatus){
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
                                                require('./ViewTestPage.js').validateTestCreate(editTestMap, function(isValidateTest){
                                                    assert.ok(isValidateTest, "Not Validated Test.");
                                                    logger.info("Test validated Successfully.");
                                                    isEditedTest(isValidateTest);
                                                });
                                            });
                                        }
                                    });
                                });
                            });
                        }

                    });
                }
                if(editTestMap.hasOwnProperty("COMPONENT")){
                    driver.sleep(1000);
                    commUtil.getTextByXpath(xpathForSelectedComponent, function(getCurrentComponent) {
                        logger.info("Current Components are :" + getCurrentComponent);
                        commUtil.sendTextToElement(xpathForComponent, "\uE003", function(clearComponentStatus){
                            assert.ok(clearComponentStatus, "Not Cleared Components.");
                            commUtil.sendTextToElement(xpathForComponent, "\uE003", function(clearComponentStatus) {
                                assert.ok(clearComponentStatus, "Not Cleared Components.");
                                driver.sleep(1000);

                                commUtil.sendTextToElement(xpathForComponent, editTestMap.COMPONENT, function(clickOnComponentDropDownStatus){
                                    assert.ok(clickOnComponentDropDownStatus, "Not Gave Component.");
                                    commUtil.sendTextToElement(xpathForComponent, "\uE004", function(clickOnComponentStatus){
                                        assert.ok(clickOnComponentStatus, "Not Selected Component.");
                                        commUtil.getTextByXpath(xpathForSelectedComponent, function(getCurrentSelectedComponent){
                                            logger.info("Selected Components are :"+getCurrentSelectedComponent);
                                            logger.info("Component Selected Successfully.");
                                            assert.equal(getCurrentSelectedComponent, editTestMap.COMPONENT, "Not Validating Component After Selecting.");
                                            logger.info("Selected Component Validated Successfully After Selected.");

                                            counter++;
                                            if (counter === mapSize) {
                                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                                commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                                    logger.info("Clicked on Create Button.");
                                                    //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                                    commUtil.implicitWait(200000);
                                                    //isEditedTest(clickOnSaveButtonStatus);
                                                    require('./ViewTestPage.js').validateTestCreate(editTestMap, function(isValidateTest){
                                                        assert.ok(isValidateTest, "Not Validated Test.");
                                                        logger.info("Test validated Successfully.");
                                                        isEditedTest(isValidateTest);
                                                    });
                                                });
                                            }
                                        });
                                    });
                                });
                            });
                            //componentField.sendKeys("\uE003");

                        })
                    });
                }
                if(editTestMap.hasOwnProperty("AFFECTEDVERSION")){
                    driver.sleep(1000);
                    commUtil.getTextByXpath(xpathForSelectedAffectedVersion, function(getCurrentComponent) {
                        logger.info("Current Affected Versions are :" + getCurrentComponent);
                        commUtil.sendTextToElement(xpathForAffectedVersion, "\uE003", function (clearComponentStatus) {
                            assert.ok(clearComponentStatus, "Not Cleared Affected Versions.");
                            commUtil.sendTextToElement(xpathForAffectedVersion, "\uE003", function (clearComponentStatus) {
                                assert.ok(clearComponentStatus, "Not Cleared Affected Versions.");
                                driver.sleep(1000);
                                commUtil.sendTextToElement(xpathForAffectedVersion, editTestMap.AFFECTEDVERSION, function(clickOnAffectedVersionDropDownStatus){
                                    assert.ok(clickOnAffectedVersionDropDownStatus, "Not Gave Text To Affected version..");
                                    commUtil.sendTextToElement(xpathForAffectedVersion, "\uE004", function(clickOnAffectedVersionStatus){
                                        assert.ok(clickOnAffectedVersionStatus, "Not Clicked On Affected version Drop Down.");
                                        commUtil.getTextByXpath(xpathForSelectedAffectedVersion, function(getCurrentSelectedVersion){
                                            logger.info("Selected Versions are : "+getCurrentSelectedVersion);
                                            logger.info("Affected Version Selected Successfully.");
                                            assert.equal(getCurrentSelectedVersion, editTestMap.AFFECTEDVERSION, "Not Validating Affected Version After Selecting.");
                                            logger.info("Affected Version Validated Successfully After Selected.");

                                            counter++;
                                            if (counter === mapSize) {
                                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                                commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                                    logger.info("Clicked on Create Button.");
                                                    //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                                    commUtil.implicitWait(200000);

                                                    require('./ViewTestPage.js').validateTestCreate(editTestMap, function(isValidateTest){
                                                        assert.ok(isValidateTest, "Not Validated Test.");
                                                        logger.info("Test validated Successfully.");
                                                        isEditedTest(isValidateTest);
                                                    });
                                                });
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });

                }
                if(editTestMap.hasOwnProperty("FIXVERSION")){
                    driver.sleep(1000);
                    commUtil.getTextByXpath(xpathForSelectedFixVersion, function(getCurrentComponent) {
                        logger.info("Current Fix Versions are :" + getCurrentComponent);
                        commUtil.sendTextToElement(xpathForFixedVersion, "\uE003", function (clearComponentStatus) {
                            assert.ok(clearComponentStatus, "Not Cleared Fix Versions.");
                            commUtil.sendTextToElement(xpathForFixedVersion, "\uE003", function (clearComponentStatus) {
                                assert.ok(clearComponentStatus, "Not Cleared Fix Versions.");

                                commUtil.sendTextToElement(xpathForFixedVersion, editTestMap.FIXVERSION, function(sendTextToFixVersionStatus){
                                    assert.ok(sendTextToFixVersionStatus, "Not Send Text To Fix Version.");
                                    logger.info(editTestMap.FIXVERSION);
                                    commUtil.sendTextToElement(xpathForFixedVersion, "\uE004", function(selectFixVersionStatus){
                                        assert.ok(selectFixVersionStatus, "Not Selected Fix Version.");
                                        commUtil.getTextByXpath(xpathForSelectedFixVersion, function(getCurrentSelectedVersion){
                                            logger.info("Selected Versions are : "+getCurrentSelectedVersion);
                                            logger.info("Fix-Version Selected Successfully.");
                                            assert.equal(getCurrentSelectedVersion, editTestMap.FIXVERSION, "Not Validating Fix Version After Selecting.");
                                            logger.info("Fix Version Validated Successfully After Selected.");

                                            counter++;
                                            if (counter === mapSize) {
                                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                                commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                                    logger.info("Clicked on Create Button.");
                                                    //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                                    commUtil.implicitWait(200000);

                                                    require('./ViewTestPage.js').validateTestCreate(editTestMap, function(isValidateTest){
                                                        assert.ok(isValidateTest, "Not Validated Test.");
                                                        logger.info("Test validated Successfully.");
                                                        isEditedTest(isValidateTest);
                                                    });
                                                });
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
                if(editTestMap.hasOwnProperty("ENVIRONMENT")){
                    driver.sleep(1000);
                    commUtil.sendTextToElement(xpathForEnvironmentTextArea, editTestMap.ENVIRONMENT, function(sendTextToEnvironmentTextAreaStatus){
                        assert.ok(sendTextToEnvironmentTextAreaStatus, "Not Send Text To Environment Text Area.");
                        logger.info(editTestMap.ENVIRONMENT);
                        commUtil.getAttributeValue(xpathForEnvironmentTextArea, "value", function(attributeValue){
                            logger.info("Attribute Value : " + attributeValue);
                            assert.equal(attributeValue, editTestMap.ENVIRONMENT, "Not validated Environment After Given.");
                            logger.info("Test Environment Validated Successfully After Given.");

                            counter++;
                            if (counter === mapSize) {
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Create Button.");
                                    //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                    commUtil.implicitWait(200000);

                                    require('./ViewTestPage.js').validateTestCreate(editTestMap, function(isValidateTest){
                                        assert.ok(isValidateTest, "Not Validated Test.");
                                        logger.info("Test validated Successfully.");
                                        isEditedTest(isValidateTest);
                                    });
                                });
                            }
                        });
                    });
                }
                if(editTestMap.hasOwnProperty("DESCRIPTION")){
                    driver.sleep(1000);
                    commUtil.sendTextToElement(xpathForDescriptionTextArea, editTestMap.DESCRIPTION, function(sendTextToDescTextAreaStatus){
                        assert.ok(sendTextToDescTextAreaStatus, "Not Send Text To Description Text Area.");
                        logger.info(editTestMap.DESCRIPTION);
                        commUtil.getAttributeValue(xpathForDescriptionTextArea, "value", function(attributeValue){
                            logger.info("Attribute Value : " + attributeValue);
                            assert.equal(attributeValue, editTestMap.DESCRIPTION, "Not validated Description After Given.");
                            logger.info("Test Description Validated Successfully After Given.");

                            counter++;
                            if (counter === mapSize) {
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Create Button.");
                                    //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                    commUtil.implicitWait(200000);

                                    require('./ViewTestPage.js').validateTestCreate(editTestMap, function(isValidateTest){
                                        assert.ok(isValidateTest, "Not Validated Test.");
                                        logger.info("Test validated Successfully.");
                                        isEditedTest(isValidateTest);
                                    });
                                });
                            }
                        });
                    });
                }
                if(editTestMap.hasOwnProperty("LABEL")){
                    driver.sleep(1000);
                    commUtil.getTextByXpath(xpathForSelectedLabel, function(getCurrentComponent) {
                        logger.info("Current Fix Versions are :" + getCurrentComponent);
                        commUtil.sendTextToElement(xpathForLabelTextArea, "\uE003", function (clearComponentStatus) {
                            assert.ok(clearComponentStatus, "Not Cleared Fix Versions.");
                            commUtil.sendTextToElement(xpathForLabelTextArea, "\uE003", function (clearComponentStatus) {
                                assert.ok(clearComponentStatus, "Not Cleared Fix Versions.");
                                commUtil.sendTextToElement(xpathForLabelTextArea, editTestMap.LABEL, function(sendTextToLabelStatus){
                                    assert.ok(sendTextToLabelStatus, "Not Send Text To Label.");
                                    logger.info(editTestMap.LABEL);
                                    commUtil.sendTextToElement(xpathForLabelTextArea, "\uE004", function(selectLabelStatus){
                                        assert.ok(selectLabelStatus, "Not Selected Label.");
                                        commUtil.getTextByXpath(xpathForSelectedLabel, function(getCurrentLabel){
                                            logger.info("Selected Label : "+getCurrentLabel);
                                            logger.info("Label Selected Successfully.");
                                            assert.equal(getCurrentLabel, editTestMap.LABEL, "Not Validating Label After Selecting.");
                                            logger.info("Label Validated Successfully After Selected.");

                                            counter++;
                                            if (counter === mapSize) {
                                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                                commUtil.clickOnElementByXpath(xpathForCreateButton, function (clickOnSaveButtonStatus) {
                                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                                    logger.info("Clicked on Create Button.");
                                                    //commUtil.implicitWait(browser.params.testdata.pageLoadTimeout);
                                                    commUtil.implicitWait(200000);

                                                    require('./ViewTestPage.js').validateTestCreate(editTestMap, function(isValidateTest){
                                                        assert.ok(isValidateTest, "Not Validated Test.");
                                                        logger.info("Test validated Successfully.");
                                                        isEditedTest(isValidateTest);
                                                    });
                                                });
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                }

            });
        }catch(e){

        }
    };
   /* this.editTest1 = function(map){
        driver.sleep(2000);
        commUtil.validateTitle("Edit Issue");
        commUtil.isElementDisplayed(headerOfEditTestPage).then(function(result){
            if(result === true){
                commUtil.getTextUsingWebElement(headerOfEditTestPage).then(function(value){
                    expect(value).toContain("Edit Issue");
                });
            }
        });
        //To change summary
        summaryTextbox.clear();
        summaryTextbox.sendKeys(map.CHANGESUMMARYTO);

        //To change priority
        commUtil.getAttributeValueUsingWebElement(priorityField,"value").then(function(priority){
            if(!(priority === map.CHANGEPRIORITYTO)){
                priorityField.clear();
                priorityField.sendKeys(map.CHANGEPRIORITYTO);
            }
        });

        //To change component
        componentField.sendKeys('\uE003');
        componentField.sendKeys('\uE003');
        componentField.sendKeys(map.CHANGECOMPONENTTO);
        componentField.sendKeys('\uE004');
        commUtil.sleep(1000);

        //To change affected version
        affectedVersionField.sendKeys('\uE003');
        affectedVersionField.sendKeys('\uE003');
        affectedVersionField.sendKeys(map.CHANGEAFFECTEDVERSIONTO);
        affectedVersionField.sendKeys('\uE004');
        commUtil.sleep(1000);

        //To change fix version
        commUtil.isElementDisplayed(commUtil.changeToWebElement("/*//*[@id='fixVersions-textarea']")).then(function (result) {
            if(result === true){
                fixVersionField.sendKeys('\uE003');
                fixVersionField.sendKeys('\uE003');
                fixVersionField.sendKeys(map.CHANGEFIXVERSIONTO);
                fixVersionField.sendKeys('\uE004');
                commUtil.sleep(1000);

            }
        });

        //To change environment
        environmentField.clear();
        environmentField.sendKeys(map.CHANGEENVIRONMENTTO);
        commUtil.sleep(1000);

        //To change description
        descriptionField.clear();
        descriptionField.sendKeys(map.CHANGEDESCRIPTIONTO);

        //To change label
        labelField.sendKeys('\uE003');
        labelField.sendKeys('\uE003');
        labelField.sendKeys(map.CHANGELABELTO);
        labelField.sendKeys('\uE004');
        commUtil.sleep(1000);



        updateIssueBtn.click();


    };*/
    validateEditTestPage = function(testForEdit, isValidateEditTestPage) {
        try{
            driver.switchTo().defaultContent();
            driver.wait(function(){
                return driver.executeScript("return document.readyState").then(function(state){
                    logger.info("Browse state : " + state);
                    return state === "complete";
                });
            }, browser.params.testdata.PageLoadTimeOut).then(function(){
                driver.sleep(500);
                commUtil.waitForTitle("Edit Issue", function(waitForTitleStatus){
                    assert.ok(waitForTitleStatus, "Not Validate Edit Test Page Title.");

                    commUtil.waitForPageLoad("/*//*[@id='edit-issue-dialog']",  function(waitForEditTestDialog){
                        assert.ok(waitForEditTestDialog, "NoT Able To Load Edit Test Page.");
                        commUtil.getTextByXpath("/*//*[@id='edit-issue-dialog']//h2", function(editTestHeader){
                            assert.ok(editTestHeader.indexOf("Edit Issue") != -1 , "Edit Test Header Validation Failed.");
                            assert.ok(editTestHeader.indexOf(testForEdit) != -1 , "Edit Test Header Validation Failed.");
                            logger.info("Edit Test Dialog Header Validated Successfully.");
                            isValidateEditTestPage(true);
                        });
                    });
                });
            },function(e) {
                console.error("Browser is not Loaded.");
                isValidateEditTestPage(false);
            });
        }catch(err){
            console.error(err);
            isValidateEditTestPage(false);
        }
    };


};
module.exports= new EditTestPage();
