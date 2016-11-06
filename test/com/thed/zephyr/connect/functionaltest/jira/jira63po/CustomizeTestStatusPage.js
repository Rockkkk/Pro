

var commUtil = require('../../utils/commUtil.js');
var CustomizeTestStatusPage = function() {
  
    /******************************************************
     *  CUSTOMIZE TEST EXECUTION STATUS PAGE
     *****************************************************/

    /******************************************************
     *  WEBELEMENTS
     *****************************************************/
    var xpathForIframe = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__zconfig-teststatus_provider']";
    var xpathFortitle = "//h3[@class='formtitle']";
    var xpathForAllStatus = "//table[@id='execution-table']/tbody/tr/td[1]";
    //var xpathForEditPopupTitle = "//*[@id='edit-dialog']/div/h2[@class='dialog-title']";
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
     this.updateTestExecStatus = function(oldExecStatus, newExecStatus, isUpdateTestStatus){
         logger.info("Test Status Page");
         try{
             validateCustomizeTestStatusPage(function(validatePageStatus){
                 assert.ok(validatePageStatus, "Not Validated Customized Test Status Page.");
                 logger.info("Customize Test Status Page validated Successfully.");

                 commUtil.switchToFrameByXpath(xpathForIframe, function(switchToIFrameStatus){
                     assert.ok(switchToIFrameStatus, "Not Switched to Frame.");
                     logger.info("IFrame Found and Switched Successfully in Customize Test Status Page.");

                     commUtil.getTextByXpath(xpathFortitle, function(getTitle) {
                         assert.equal(getTitle, "View Test Execution Statuses", "Customize Test Status Page Header Test Validation Failed.");
                         logger.info("Customize Test Status Page Header Test Validated Successfully.");

                         var xpathForStatusEdit = "//table[@id='execution-table']/tbody/tr[td[text()='"+oldExecStatus+"']]/td/a[@class='edit']";
                         commUtil.clickOnElementByXpath(xpathForStatusEdit, function(clickOnEditLinkStatus){
                             assert.ok(clickOnEditLinkStatus, "Not Clicked On Edit Link Of The Status.");
                             logger.info("Clicked Successfully in Edit Link of " + oldExecStatus);

                             editTestStatus(newExecStatus, function(editStatus){
                                 assert.ok(editStatus, "Not Edited Status Successfully.");
                                 logger.info("Status is edited Successfully.");

                                 commUtil.searchTextFromElements(xpathForAllStatus, newExecStatus, function(findStatusAfterEdit){
                                     logger.info("Status ==== " +findStatusAfterEdit);
                                     assert.ok(findStatusAfterEdit, "Status is Not Validated After Modify.");
                                     logger.info(newExecStatus + " : Test Status is updated successfully.");
                                     isUpdateTestStatus(findStatusAfterEdit);
                                 });
                             });
                         });
                     });
                     driver.switchTo().defaultContent();
                 });
             });
         }catch(e){
             throw e;
         }
     };

    this.addNewStatus = function(newExecStatus, statusDesc, statusColor, isAddedTestStatus){
        try{
            validateCustomizeTestStatusPage(function(validatePageStatus) {
                assert.ok(validatePageStatus, "Not Validated Customized Test Status Page.");
                logger.info("Customize Test Status Page validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIframe, function (switchToIFrameStatus) {
                    assert.ok(switchToIFrameStatus, "Not Switched to Frame.");
                    logger.info("IFrame Found and Switched Successfully in Customize Test Status Page.");

                    commUtil.getTextByXpath(xpathFortitle, function(getTitle) {
                        assert.equal(getTitle, "View Test Execution Statuses", "Customize Test Status Page Header Test Validation Failed.");
                        logger.info("Customize Test Status Page Header Test Validated Successfully.");

                        commUtil.getCount(xpathForAllStatus, function(beforeAddStatusCount){
                            logger.info("Count Before : " + beforeAddStatusCount);

                            addNewStatus(newExecStatus, statusDesc, statusColor, function(addNewStatus){
                                assert.ok(addNewStatus, "Not Able To Add a New Status.");
                                logger.info("New Test Execution Status is added successfully.");

                                commUtil.searchTextFromElements(xpathForAllStatus, newExecStatus, function(findStatusAfterAdd){
                                    assert.ok(findStatusAfterAdd, "Status is Not Validated After Added.");
                                    logger.info(newExecStatus + " : Test Status is added successfully.");
                                    isAddedTestStatus(findStatusAfterAdd);
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
        }catch(e){
            throw e;
        }
    };

    /******************************************************
     *  PAGE REUSABLE METHODS
     *****************************************************/
    var validateCustomizeTestStatusPage = function(isValidateCustomizedTestStatusPage) {
        if(browser.params.testdata.environment === "prod"){
            xpathForIframe = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.je__zconfig-teststatus_provider']";
        }
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                //logger.info("Browser state : " + state);
                return state === "complete";
            });
        }, browser.params.testdata.PageLoadTimeOut).then(function(){
            commUtil.waitForTitle("Configure Test Status", function(waitForTitleStatus){
                assert.ok(waitForTitleStatus, "Configure Test Status Page Title Validation Failed.");

                commUtil.waitForPageLoad( xpathForIframe, function(waitForIFrame){
                    assert.ok(waitForIFrame, "IFrame is Not Loaded in Configure Test Status Page.");
                    isValidateCustomizedTestStatusPage(waitForIFrame);
                });
            });
        },function(e) {
            console.error("Configure Test Status Page not Loaded.");
            isValidateCustomizedTestStatusPage(false);
        });
    };
    var waitForStatusToIncrease = function(statusCountBefore, isStatusIncrease) {
        var flag = false;
        driver.wait(function(){
            commUtil.getCount(xpathForAllStatus, function(afterSavingStatus){
                logger.info((statusCountBefore+1)+" : "+afterSavingStatus);
                logger.info((parseInt(statusCountBefore) + 1)+" : "+parseInt(afterSavingStatus));
                flag =  (statusCountBefore < afterSavingStatus);
                logger.info(flag);
                return (statusCountBefore+1 === afterSavingStatus);
            });
        }, browser.params.testdata.implicitWaitTimeMedium).then(function(){
            isStatusIncrease(true);
        },function(e) {
            console.error("Not Increased the Test Status Size.");
            isStatusIncrease(flag);
        });
    };
    var editTestStatus = function(newExecStatus, isEditedTestStatus){
        try{
            commUtil.getTextByXpath(xpathForEditPopupTitle, function(editPopupHeaderText){
                assert.equal(editPopupHeaderText,"Edit Execution Status", "Edit Popup Header not Validated.");
                logger.info("Edit Status Popup Validated Successfully.");

                commUtil.moveToElementByXpath(xpathForEditPopupTitle, function(moveToPopupTitle){
                    assert.ok(moveToPopupTitle, "Not Moved To Edit Status Popup.");

                    commUtil.sendTextToElement(xpathForEditStatusTextBox, newExecStatus, function(sendTextStatus){
                        assert.ok(sendTextStatus, "Not Able to Send Text To Edit Status Popup.");

                        commUtil.clickOnElementByXpath(xpathForEditStatusSaveBtn, function(clickOnElementStatus){
                            assert.ok(clickOnElementStatus, "Not Saved Edited Status.");
                            logger.info("Test Status Edited Successfully.");

                            commUtil.isElementInVisible(xpathForEditStatusSaveBtn, function(waitForSaveBtnToInvisible){
                                assert.ok(waitForSaveBtnToInvisible, "Edit Status Popup is still visible.");

                                commUtil.moveToElementByXpath(xpathFortitle, function (moveToPopupTitle) {
                                    assert.ok(moveToPopupTitle, "Not Moved To Add New Test Status Popup.");

                                    isEditedTestStatus(waitForSaveBtnToInvisible);
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
    var addNewStatus = function(newStatus, statusDesc, statusColor, isAddedNewStatus){
        try{
            commUtil.getTextByXpath(xpathForAddNewStatusHeader, function(addNewStatusPopupHeaderText) {
                assert.equal(addNewStatusPopupHeaderText, "Add a New Test Execution Status", "Add a New Test Execution Status Popup Header Validation Failed.");
                logger.info("Add New Test Status Page Validated Successfully.");

                commUtil.moveToElementByXpath(xpathForAddNewStatusHeader, function (moveToPopupTitle) {
                    assert.ok(moveToPopupTitle, "Not Moved To Add New Status Popup.");

                    commUtil.sendTextToElement(xpathForAddNewStatusTextBox, newStatus, function (sendTextToNewStatusTextBox) {
                        assert.ok(sendTextToNewStatusTextBox, "Not Able To Send Text to New Test Status Text Box.");
                        logger.info("New Status is given Successfully.");

                        commUtil.sendTextToElement(xpathForAddNewStatusDescTextBox, statusDesc, function (sendTextToNewStatusDescTextBox) {
                            assert.ok(sendTextToNewStatusDescTextBox, "Not Able To Send Text to New Test Status Desc to Text Box.");
                            logger.info("New Status Description is given Successfully.");

                            commUtil.sendTextToElement(xpathForAddNewStatusColor, statusColor, function (sendTextToNewStatusColorTextBox) {
                                assert.ok(sendTextToNewStatusColorTextBox, "Not Able To Send Text to New Test Status Color to Text Box.");
                                logger.info("New Status Color is given Successfully.");

                                commUtil.clickOnElementByXpath(xpathForAddNewStatusSaveBtn, function (clickOnSaveBtnStatus) {
                                    assert.ok(clickOnSaveBtnStatus, "Not Clicked On Save Button on Add New Status popup");
                                    logger.info("Clicked on add New Status button Successfully.");

                                    commUtil.moveToElementByXpath(xpathFortitle, function (moveToPopupTitle) {
                                        assert.ok(moveToPopupTitle, "Not Moved To Add New Test Status Popup.");
                                        driver.sleep(2000);
                                        isAddedNewStatus(clickOnSaveBtnStatus);
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
module.exports = new CustomizeTestStatusPage();