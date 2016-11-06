

var commUtil = require('../../utils/commUtil.js');
var CustomizeStepStatusPage = function() {
  
    /******************************************************
     *  PLAN TEST CYCLE PAGE
     *****************************************************/

    /******************************************************
     *  WEBELEMENTS
     *****************************************************/
    var xpathForIframe = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__zconfig-stepstatus_provider']";
    var xpathFortitle = "//h3[@class='formtitle']";
    var xpathForAllStatus = "//table[@id='execution-table']/tbody/tr/td[1]";
//    var xpathForEditPopupTitle = "//*[@id='edit-dialog']/div/h2[@class='dialog-title']";
    // Changed because of Dialog to Dialog2
    var xpathForEditPopupTitle = "//*[@id='edit-dialog']/descendant::h2[contains(@class, 'aui-dialog2')]";
    var xpathForEditStatusTextBox = "//*[@id='editExecutionStatus']";
    var xpathForEditStatusSaveBtn = "//*[@id='edit-dialog']/descendant::button[@id='edit-dialog-update-button']";
    var xpathForAddNewStatusHeader = "//div[@class='statusTitle']/h3";
    var xpathForAddNewStatusTextBox = "//*[@id='executionStatus']";
    var xpathForAddNewStatusDescTextBox = "//*[@id='executionDescription']";
    var xpathForAddNewStatusColor = "//*[@id='colorInput']";
    var xpathForAddNewStatusSaveBtn = "//*[@id='add_submit']";
    /******************************************************
     *  PAGE OBJECT METHODS
     *****************************************************/
     this.updateStepExecStatus = function(oldStepExecStatus, newStepExecStatus, isUpdateStepStatus){
    	try{
            validateCustomizeStepStatusPage(function(validatePageStatus){
                assert.ok(validatePageStatus, "Not Validated Customized Step Status Page.");
                logger.info("Customize Step Status Page validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIframe, function(switchToIFrameStatus){
                    assert.ok(switchToIFrameStatus, "Not Switched to Frame.");
                    logger.info("IFrame Found and Switched Successfully in Customize Step Status Page.");

                    commUtil.getTextByXpath(xpathFortitle, function(getTitle){
                        assert.equal(getTitle, "View Step Execution Statuses", "Customize Step Status Page Header Test Validation Failed.");
                        logger.info("Customize Step Status Page Header Test Validated Successfully.");

                        var xpathForStepStatusEdit = "//table[@id='execution-table']/tbody/tr[td[text()='"+oldStepExecStatus+"']]/td/a[@class='edit']";
                        commUtil.clickOnElementByXpath(xpathForStepStatusEdit, function(clickOnEditLinkStatus){
                            assert.ok(clickOnEditLinkStatus, "Not Clicked On Edit Link Of The Status.");
                            logger.info("Clicked Successfully in Edit Link of " + oldStepExecStatus);

                            editStepStatus(newStepExecStatus, function(editStatus){
                                assert.ok(editStatus, "Not Edited Step Status Successfully.");
                                logger.info("Step Status is edited Successfully.");

                                commUtil.searchTextFromElements(xpathForAllStatus, newStepExecStatus, function(findStatusAfterEdit){
                                    logger.info("Status ==== " +findStatusAfterEdit);
                                    assert.ok(findStatusAfterEdit, "Status is Not Validated After Modify.");
                                    logger.info(newStepExecStatus + " : Step Status is updated successfully.");
                                    isUpdateStepStatus(findStatusAfterEdit);
                                });
                            });
                        });
                    });
                    driver.switchTo().defaultContent();
                });
            });
        }catch(err){
            throw err;
        }
	};

  
    this.addNewStepStatus = function(newStepExecStatus, stepStatusSummary, stepStatusColor, isAddedStepStatus){
    	try{
            validateCustomizeStepStatusPage(function(validatePageStatus) {
                assert.ok(validatePageStatus, "Not Validated Customized Step Status Page.");
                logger.info("Customize Step Status Page validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIframe, function (switchToIFrameStatus) {
                    assert.ok(switchToIFrameStatus, "Not Switched to Frame.");
                    logger.info("IFrame Found and Switched Successfully in Customize Step Status Page.");

                    commUtil.getTextByXpath(xpathFortitle, function(getTitle){
                        assert.equal(getTitle, "View Step Execution Statuses", "Customize Step Status Page Header Test Validation Failed.");
                        logger.info("Customize Step Status Page Header Test Validated Successfully.");

                        commUtil.getCount(xpathForAllStatus, function(beforeAddStatusCount){
                            logger.info("Count Before : " + beforeAddStatusCount);

                            addNewStepStatus(newStepExecStatus, stepStatusSummary, stepStatusColor, function(addStepStatus){
                                assert.ok(addStepStatus, "Not Able To Add a New Step Status.");
                                logger.info("New Step Execution Status is added successfully.");

                                commUtil.searchTextFromElements(xpathForAllStatus, newStepExecStatus, function(findStatusAfterAdd){
                                    assert.ok(findStatusAfterAdd, "Status is Not Validated After Added.");
                                    logger.info(newStepExecStatus + " : Test Status is added successfully.");
                                    isAddedStepStatus(findStatusAfterAdd);
                                });
                                /*waitForStatusToIncrease(beforeAddStatusCount, function(waitForSavingStatus){
                                 assert.ok(waitForSavingStatus, "Status Not Increased after adding a new status.");

                                 });*/
                            });
                        });
                    });
                    driver.switchTo().defaultContent();
                });
            });
        }catch(err){
            throw err;
        }
    };

    /******************************************************
     *  PAGE REUSABLE METHODS
     *****************************************************/
    var validateCustomizeStepStatusPage = function(isValidateCustomizedStepStatusPage) {
        if(browser.params.testdata.environment === "prod"){
            xpathForIframe = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.je__zconfig-stepstatus_provider']";
        }
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                //logger.info("Browser state : " + state);
                return state === "complete";
            });
        }, browser.params.testdata.PageLoadTimeOut).then(function(){
            commUtil.waitForTitle("Configure Step Status", function(waitForTitleStatus){
                assert.ok(waitForTitleStatus, "Configure Step Status Page Title Validation Failed.");

                commUtil.waitForPageLoad( xpathForIframe, function(waitForIFrame){
                    assert.ok(waitForIFrame, "IFrame is Not Loaded in Configure Step Status Page.");
                    isValidateCustomizedStepStatusPage(waitForIFrame);
                });
            });
        },function(e) {
            console.error("Configure Step Status Page not Loaded.");
            isValidateCustomizedStepStatusPage(false);
        });
    };

    var editStepStatus = function(newStepExecStatus, isEditedStep){
        try{
            commUtil.getTextByXpath(xpathForEditPopupTitle, function(editPopupHeaderText){
                assert.equal(editPopupHeaderText,"Edit Execution Status", "Edit Popup Header not Validated.");
                logger.info("Edit Status Popup Validated Successfully.");

                commUtil.moveToElementByXpath(xpathForEditPopupTitle, function(moveToPopupTitle){
                    assert.ok(moveToPopupTitle, "Not Moved To Edit Step Status Popup.");

                    commUtil.sendTextToElement(xpathForEditStatusTextBox, newStepExecStatus, function(sendTextStatus){
                        assert.ok(sendTextStatus, "Not Able to Send Text To Edit Status Popup.");

                        commUtil.clickOnElementByXpath(xpathForEditStatusSaveBtn, function(clickOnElementStatus){
                            assert.ok(clickOnElementStatus, "Not Saved Edited Status.");
                            logger.info("Test Status Edited Successfully.");

                            commUtil.isElementInVisible(xpathForEditStatusSaveBtn, function(waitForSaveBtnToInvisible){
                                assert.ok(waitForSaveBtnToInvisible, "Edit Status Popup is still visible.");

                                commUtil.moveToElementByXpath(xpathFortitle, function (moveToPopupTitle) {
                                    assert.ok(moveToPopupTitle, "Not Moved To Add New Step Status Popup.");

                                    isEditedStep(waitForSaveBtnToInvisible);
                                });
                            });
                        });
                    });
                });
            });
        }catch(e) {
            throw e;
        }
    };
    addNewStepStatus = function(newStepStatus, stepStatusDesc, stepStatusColor, isAddedNewStepStatus){
        try{
            commUtil.getTextByXpath(xpathForAddNewStatusHeader, function(addNewStatusPopupHeaderText) {
                assert.equal(addNewStatusPopupHeaderText, "Add a New Step Execution Status", "Add a New Step Execution Status Popup Header Validation Failed.");
                logger.info("Add New Test Status Page Validated Successfully.");

                commUtil.moveToElementByXpath(xpathForAddNewStatusHeader, function (moveToAddPopupTitle) {
                    assert.ok(moveToAddPopupTitle, "Not Moved To Add New Step Status Popup.");

                    commUtil.sendTextToElement(xpathForAddNewStatusTextBox, newStepStatus, function (sendTextToNewStatusTextBox) {
                        assert.ok(sendTextToNewStatusTextBox, "Not Able To Send Text to New Step Status Text Box.");
                        logger.info("New Step Status is given Successfully.");

                        commUtil.sendTextToElement(xpathForAddNewStatusDescTextBox, stepStatusDesc, function (sendTextToNewStatusDescTextBox) {
                            assert.ok(sendTextToNewStatusDescTextBox, "Not Able To Send Text to New Step Status Desc to Text Box.");
                            logger.info("New Step Status Description is given Successfully.");

                            commUtil.sendTextToElement(xpathForAddNewStatusColor, stepStatusColor, function (sendTextToNewStatusColorTextBox) {
                                assert.ok(sendTextToNewStatusColorTextBox, "Not Able To Send Text to New Step Status Color to Text Box.");
                                logger.info("New Step Status Color is given Successfully.");

                                commUtil.clickOnElementByXpath(xpathForAddNewStatusSaveBtn, function (clickOnSaveBtnStatus) {
                                    assert.ok(clickOnSaveBtnStatus, "Not Clicked On Save Button on Add New Step Status popup");
                                    logger.info("Clicked on add New Step Status button Successfully.");

                                    commUtil.moveToElementByXpath(xpathFortitle, function (moveToPopupTitle) {
                                        assert.ok(moveToPopupTitle, "Not Moved To Add New Step Status Popup.");
                                        driver.sleep(2000);
                                        isAddedNewStepStatus(clickOnSaveBtnStatus);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }catch(e){
            throw e;
        }
    };
};
module.exports = new CustomizeStepStatusPage();