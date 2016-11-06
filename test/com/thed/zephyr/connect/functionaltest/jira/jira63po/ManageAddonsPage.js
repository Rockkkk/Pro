

var commUtil = require('../../utils/commUtil.js');
var ManageAddonsPage = function() {
  
    /******************************************************
     *  CUSTOMIZE TEST EXECUTION STATUS PAGE
     *****************************************************/

    /******************************************************
     *  WEBELEMENTS
     *****************************************************/
    var xpathForIframe = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__zconfig-teststatus_provider']";
    var xpathForTestMenu = "//a[text()='Tests']";
    var xpathForAllLinksInTestMenu = ".//*[@id='com.thed.zephyr.cloud__zfjConnect-topnav-section-content']/descendant::li";
    var xpathForUploadLink = "//*[@id='upm-upload']";
    var xpathForUploadDialogHeader = "//*[@id='upm-upload-dialog']/descendant::h2[contains(@class,'aui-dialog2')]";
    var xpathForSendUrlBox = "//*[@id='upm-upload-url']";
    var xpathForUploadBtn = "//*[@id='upm-upload-dialog']/descendant::button[text()='Upload']";
    var xpathForUploadStatusDialog = "//*[@id='upm-plugin-status-dialog']";
    var xpathForUploadStatusDialogHeader = "//*[@id='upm-plugin-status-dialog']/descendant::*[@class='plugin-name']";
    /******************************************************
     *  PAGE OBJECT METHODS
     *****************************************************/
     this.uploadAddOns = function(url, isUploadStatus){
         try{
             validateManageAddOnsPage(function(validateManageAddons){
                 assert.ok(validateManageAddons, "Manage add-ons Page validation Failed.");
                 logger.info("Manage Add-ons Page Validated Successfully.");

                 commUtil.waitForElement(xpathForUploadLink, browser.params.testdata.implicitWaitTimeMedium, function(waitElementStatus){
                     assert.ok(waitElementStatus, "Waiting For Upload Link Failed.");

                     commUtil.clickOnElementByXpath(xpathForUploadLink, function(clickOnUploadAddOnLink) {
                         assert.ok(clickOnUploadAddOnLink, "Click On Upload Link Failed.");
                         logger.info("Clicked on Upload Link for Uploading addons.");

                         commUtil.waitForElement(xpathForUploadDialogHeader, browser.params.testdata.implicitWaitTimeMedium, function(waitForUploadPopupStatus){
                             assert.ok(waitForUploadPopupStatus, "Waiting For Upload Addons Popup Not Loaded.");

                             commUtil.getTextByXpath(xpathForUploadDialogHeader, function(uploadAddOnsHeaderText){
                                 assert.equal("Upload add-on", uploadAddOnsHeaderText, "Upload popup header Text Not Matching");
                                 logger.info("Upload popup header Text Validated Successfully.");

                                 commUtil.sendTextToElement(xpathForSendUrlBox, url, function(sendUrlToUploadStatus){
                                     assert.ok(sendUrlToUploadStatus, "Failed to send url to Upload Input box For Upload .");

                                     commUtil.clickOnElementByXpath(xpathForUploadBtn, function(clickOnUploadAddOnsStatus){
                                         assert.ok(clickOnUploadAddOnsStatus,"Click on Upload add-ons Button Failed");
                                         logger.info("Clicked On Upload Button Successfully.");

                                         commUtil.waitForElement(xpathForUploadStatusDialog, browser.params.testdata.implicitWaitTimeMedium, function(waitForUploadSuccessfulPopupStatus){
                                             assert.ok(waitForUploadSuccessfulPopupStatus, "Add-ons Successful popup is not Visible after uploading Plugin.");
                                             logger.info("Add-ons Successful popup Visible.");

                                             commUtil.getTextByXpath(xpathForUploadStatusDialogHeader, function(pluginName){
                                                 assert.equal(pluginName, "Zephyr for JIRA Cloud", "Plugin Name not validated in Successful installed popup.");
                                                 logger.info("Plugin Name validated in Successful installed popup.");

                                                 var xpathForPluginVendor = "//*[@id='upm-plugin-status-dialog']/descendant::*[@class='plugin-vendor']";
                                                 var xpathForCloseStatusPopupLink = "//*[@id='upm-plugin-status-dialog']//button[text()='Close']";
                                                 commUtil.getTextByXpath(xpathForPluginVendor, function(pluginVenderName){
                                                     assert.equal(pluginVenderName, "by Zephyr", "Plugin Vendor Name not validated in Successful installed popup.");
                                                     logger.info("Plugin Vendor Name validated in Successful installed popup.");

                                                     commUtil.clickOnElementByXpath(xpathForCloseStatusPopupLink, function(ClickOnPopupCloseLink) {
                                                         assert.ok(ClickOnPopupCloseLink, "Click on Upload add-ons Successful Popup Close Link Failed");
                                                         logger.info("Clicked on Upload addons Successful Popup Close Link");
                                                         driver.sleep(1000);
                                                         validateTestMenu(function(validateTestMenuStatus){
                                                             assert.ok(validateTestMenuStatus, "Validate Test Menu Failed");
                                                             logger.info("Validate Test Menu Successfully.");
                                                             isUploadStatus(validateTestMenuStatus);
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
         }catch(err){
             logger.error(err.message);
             throw err;
         }
    };
    var validateTestMenu = function(isValidateTestMenu) {
        try{
            driver.wait(function(){
                browser.refresh();
                commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                browser.ignoreSynchronization = true;
                return true;
            }, browser.params.testdata.PageLoadTimeOut).then(function(){
                commUtil.isElementVisible( xpathForTestMenu, function(testMenuLinkVisibleStatus) {
                    assert.ok(testMenuLinkVisibleStatus, "Test Menu is not showing.");
                    logger.info("Test Menu is showing Properly..");

                    commUtil.moveToElementByXpath(xpathForTestMenu, function(moveToTestMenuStatus){
                        assert.ok(moveToTestMenuStatus, "Moved to Test Menu Successfully.");

                        commUtil.clickOnElementByXpath(xpathForTestMenu, function (clickOnTestMenuLinkStatus) {
                            assert.ok(clickOnTestMenuLinkStatus, "Test Menu is not Clicked.");
                            logger.info("Clicked on Test Menu Link Successfully.");

                            commUtil.isElementVisible(xpathForAllLinksInTestMenu, function(TestMenuContextVisibleStatus){
                                assert.ok(TestMenuContextVisibleStatus, "Test Menu Drop down links are not available.");
                                logger.info("Test Menu Drop down links are now available.");

                                commUtil.findTextFromBulkText(xpathForAllLinksInTestMenu, "Search Tests", function(findSearchTestsLinkStatus){
                                    assert.ok(findSearchTestsLinkStatus, "Search Tests Link Not Found in Test Menu.");
                                    logger.info("Search Tests Link Found Successfully in Test Menu.");

                                    commUtil.findTextFromBulkText(xpathForAllLinksInTestMenu, "Create a Test", function(findCreateATestsLinkStatus){
                                        assert.ok(findCreateATestsLinkStatus, "Create A Test Link Not Found in Test Menu.");
                                        logger.info("Create A Test Link Found Successfully in Test Menu.");

                                        commUtil.findTextFromBulkText(xpathForAllLinksInTestMenu, "Plan Test Cycle", function(findPlanTestCycleLinkStatus){
                                            assert.ok(findPlanTestCycleLinkStatus, "Plan Test Cycle Link Not Found in Test Menu.");
                                            logger.info("Plan Test Cycle Link Found Successfully in Test Menu.");

                                            commUtil.findTextFromBulkText(xpathForAllLinksInTestMenu, "Execute Tests", function(findExecuteTestsLinkStatus){
                                                assert.ok(findExecuteTestsLinkStatus, "Execute Tests Link Not Found in Test Menu.");
                                                logger.info("Execute Tests Link Found Successfully in Test Menu.");

                                                commUtil.findTextFromBulkText(xpathForAllLinksInTestMenu, "Test Summary", function(findTestSummaryLinkStatus){
                                                    assert.ok(findTestSummaryLinkStatus, "Test Summary Link Not Found in Test Menu.");
                                                    logger.info("Test Summary Link Found Successfully in Test Menu.");

                                                    commUtil.findTextFromBulkText(xpathForAllLinksInTestMenu, "Test Metrics", function(findTestMetricsLinkStatus){
                                                        assert.ok(findTestMetricsLinkStatus, "Test Metrics Link Not Found in Test Menu.");
                                                        logger.info("Test Metrics Link Found Successfully in Test Menu.");

                                                        commUtil.findTextFromBulkText(xpathForAllLinksInTestMenu, "Welcome", function(findWelcomeLinkStatus){
                                                            assert.ok(findWelcomeLinkStatus, "Welcome Link Not Found in Test Menu.");
                                                            logger.info("Welcome Link Found Successfully in Test Menu.");

                                                            commUtil.findTextFromBulkText(xpathForAllLinksInTestMenu, "Zephyr Help", function(findZephyrHelpLinkStatus){
                                                                assert.ok(findZephyrHelpLinkStatus, "Zephyr Help Link Not Found in Test Menu.");
                                                                logger.info("Zephyr Help Link Found Successfully in Test Menu.");

                                                                commUtil.findTextFromBulkText(xpathForAllLinksInTestMenu, "About Zephyr", function(findAboutZephyrLinkStatus){
                                                                    assert.ok(findAboutZephyrLinkStatus, "About Zephyr Link Not Found in Test Menu.");
                                                                    logger.info("About Zephyr Link Found Successfully in Test Menu.");

                                                                    //commUtil.clickOnElementByXpath(xpathForTestMenu, function (clickOnTestMenuCloseLinkStatus) {
                                                                    commUtil.clickOnElementByXpath("//a", function (clickOnTestMenuCloseLinkStatus) {
                                                                        assert.ok(clickOnTestMenuCloseLinkStatus, "Test Menu is not Clicked.");
                                                                        logger.info("Test Menu Drop down Closed Successfully.");
                                                                        isValidateTestMenu(clickOnTestMenuCloseLinkStatus);
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
            }, function(err) {
                logger.error(err.message);
                isValidateTestMenu(false);
            });
        }catch(err){
            throw err;
        }
    };


    /******************************************************
     *  PAGE REUSABLE METHODS
     *****************************************************/

    /*validateManageAddonsPage = function(callback) {
        commUtil.waitForTitle("Manage add-ons", function(waitTitleStatus){
            expect(waitTitleStatus).toBe.true;
            callback(waitTitleStatus);
        });
    };*/
    validateManageAddOnsPage = function(isValidateManageAddOnsPage) {
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                //console.log("Browser state : " + state);
                return state === "complete";
            });
        }, browser.params.testdata.PageLoadTimeOut).then(function(){
            commUtil.waitForTitle("Manage add-ons", function(waitForTitleStatus){
                assert.ok(waitForTitleStatus, "Manage add-ons Page Title Validation Failed.");
                isValidateManageAddOnsPage(waitForTitleStatus);
            },function(e) {
                console.error("Manage add-ons Page not Loaded.");
                isValidateManageAddOnsPage(false);
            });
        });
    };

};
module.exports = new ManageAddonsPage();