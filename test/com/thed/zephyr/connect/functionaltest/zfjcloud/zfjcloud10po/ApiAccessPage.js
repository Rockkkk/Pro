var commUtil = require('../../utils/commUtil.js');

var accessKey = "";
var secretKey = "";
var creationDate = "";
var ApiAccessPage = function() {

    /******************************************************
     * 	WEBELEMENTS
     *****************************************************/

    var xpathForApiPageHeader = "//*[@id='api-key-dialog']//h2[contains(@class, 'aui-dialog2')]";
    var xpathForIFrame = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__zephyr-apikey_provider']";
    var xpathForTextWhenKeyNotGenerated = "//*[@id='noapikeys-msg-div']";
    var xpathForApiPageCloseBtn = "//*[@id='api-key-dialog-close-button']";
    var xpathForGenerateBtn = "//*[@id='btn-regenerate-key']";
    var xpathForRegenerateDialog = "//*[@id='api-key-regenrate-dialog']/header";
    var xpathForRegenerateDialogHeader = "//*[@id='api-key-regenrate-dialog']//h2";
    var xpathForRegenerateButton = "//*[@id='api-key-regenrate-dialog-regenerate-button']";

    var xpathForAccessKey = "//*[@id='access-key-reveal-text-content']";
    var xpathForSecretKey = "//*[@id='secret_key_input']";
    var xpathForCreationDate = "//*[@id='creations_date']";

    /******************************************************
     * 	PAGE OBJECT METHODS
     *****************************************************/
    this.generateApiAccessKeys = function(isValidate){
        try{
            driver.switchTo().defaultContent();
            driver.wait(function(){
                return driver.executeScript("return document.readyState").then(function(state){
                    return state === "complete";
                });
            }, browser.params.testdata.implicitWaitTimeHigh, "Browser is not loaded properly.").then(function(){
                driver.switchTo().defaultContent();
                commUtil.waitForElement(xpathForIFrame, browser.params.testdata.implicitWaitTimeMedium, function(waitForAboutZephyrDialog){
                    assert.ok(waitForAboutZephyrDialog, "Not Found Api Access Page Dialog.");
                    logger.info("Api Access Page Popup Validated Successfully.");
                    commUtil.switchToFrameByXpath(xpathForIFrame, function(iframeSwitchStatus){
                        assert.ok(iframeSwitchStatus, "Not Switched to About Zephyr IFrame.");
                        logger.info("Switched Successfully to Api Access Page IFrame Successfully.");

                        commUtil.getTextByXpath(xpathForApiPageHeader, function(getTitle){
                            assert.equal(getTitle, "Zephyr API Key", "Api Access Page Title Validation Failed");
                            logger.info("Api Access Page Validated Successfully.");


                            generateKeys(function(isGenerated){
                                assert.ok(isGenerated, "Not Generated Keys");
                                logger.info("Keys are generated successfully....");
                                driver.sleep(2000);
                                generateKeys(function(isGenerated) {
                                    assert.ok(isGenerated, "Not Generated Keys");
                                    logger.info("Keys are re-generated successfully.");
                                    commUtil.clickOnElementByXpath(xpathForApiPageCloseBtn, function(clickOnCloseLink){
                                        assert.ok(clickOnCloseLink, "Not Clicked On Close Link.");
                                        driver.switchTo().defaultContent();
                                        isValidate(clickOnCloseLink);
                                    });
                                });
                            });
                        });
                        driver.switchTo().defaultContent();
                    });
                });
            });
        }catch(e){
            isValidate(false);
        }
    };
    var generateKeys = function(isGenerated){
        commUtil.isElementVisible(xpathForTextWhenKeyNotGenerated, function(isPresentElement){
            if(isPresentElement){
                commUtil.getTextByXpath(xpathForTextWhenKeyNotGenerated, function(text1) {
                    logger.info(text1);
                    //assert.ok("Key pair is not yet generated. Please create one." == text1 , "Not Validated.");
                    logger.info("First time accessing api keys.");

                    commUtil.clickOnElementByXpath(xpathForGenerateBtn, function(clickOnRegenerateBtnOnApiAccessPageLink){
                        assert.ok(clickOnRegenerateBtnOnApiAccessPageLink, "Not Clicked On Generate Link.");
                        logger.info("Clicked on Generate Btn.");
                        commUtil.waitForElement(xpathForRegenerateDialog, browser.params.testdata.implicitWaitTimeMedium, function(waitForRegenerateConfirmPopup) {
                            assert.ok(waitForRegenerateConfirmPopup, "Not Found Regenerate Confirm Page Dialog.");
                            logger.info(" Regenerate Confirm Page Visible Now.");
                            commUtil.getTextByXpath(xpathForRegenerateDialogHeader, function (regenerateDialogTitle) {
                                assert.equal(regenerateDialogTitle, "Regenerate", "Regenerate popup Title Validation Failed");
                                logger.info("Regenerate popup Validated Successfully.");
                                commUtil.clickOnElementByXpath(xpathForRegenerateButton, function(clickOnRegenerateButton){
                                    assert.ok(clickOnRegenerateButton, "Not Clicked On Regenerate Button.");
                                    logger.info("Clicked On Regenerate Confirm Dialog.");
                                    driver.sleep(1000);

                                    commUtil.getTextByXpath(xpathForAccessKey, function(getAccessKey){
                                        assert.ok(getAccessKey !== null, "Access Key Should not be null.");
                                        accessKey = getAccessKey;
                                        logger.info("AccessKey is : "+accessKey);
                                        commUtil.getAttributeValue(xpathForSecretKey, "value", function(getSecretKey){
                                            assert.ok(getSecretKey !== null, "Secret Key Should not be null.");
                                            secretKey = getSecretKey;
                                            logger.info("SecretKey is : "+secretKey);
                                            commUtil.getTextByXpath(xpathForCreationDate, function(getCreationDate){
                                                assert.ok(getCreationDate !== null, "Creation Date Should not be null.");
                                                creationDate = getCreationDate;
                                                logger.info("Creation Date is : "+creationDate);

                                                isGenerated(true);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }else{
                commUtil.getTextByXpath(xpathForAccessKey, function(getAccessKey){
                    assert.ok(getAccessKey !== null, "Access Key Should not be null.");
                    logger.info("AccessKey is : "+getAccessKey);
                    commUtil.getAttributeValue(xpathForSecretKey, "value", function(getSecretKey){
                        assert.ok(getSecretKey !== null, "Secret Key Should not be null.");
                        logger.info("SecretKey is : "+getSecretKey);
                        commUtil.getTextByXpath(xpathForCreationDate, function(getCreationDate){
                            assert.ok(getCreationDate !== null, "Creation Date Should not be null.");
                            logger.info("AccessKey is : "+getCreationDate);
                            accessKey = getAccessKey;
                            secretKey = getSecretKey;
                            creationDate = getCreationDate;

                            commUtil.clickOnElementByXpath(xpathForGenerateBtn, function(clickOnRegenerateBtnOnApiAccessPageLink){
                                assert.ok(clickOnRegenerateBtnOnApiAccessPageLink, "Not Clicked On Generate Link.");
                                logger.info("Clicked on Generate Btn.");
                                commUtil.waitForElement(xpathForRegenerateDialog, browser.params.testdata.implicitWaitTimeMedium, function(waitForRegenerateConfirmPopup) {
                                    assert.ok(waitForRegenerateConfirmPopup, "Not Found Regenerate Confirm Page Dialog.");
                                    logger.info(" Regenerate Confirm Page Visible Now.");
                                    commUtil.getTextByXpath(xpathForRegenerateDialogHeader, function (regenerateDialogTitle) {
                                        assert.equal(regenerateDialogTitle, "Regenerate", "Regenerate popup Title Validation Failed");
                                        logger.info("Regenerate popup Validated Successfully.");
                                        commUtil.clickOnElementByXpath(xpathForRegenerateButton, function(clickOnRegenerateButton){
                                            assert.ok(clickOnRegenerateButton, "Not Clicked On Regenerate Button.");
                                            logger.info("Clicked On Regenerate Confirm Dialog.");
                                            driver.sleep(1000);

                                            commUtil.getTextByXpath(xpathForAccessKey, function(getAccessKey){
                                                assert.ok(getAccessKey !== null, "Access Key Should not be null.");
                                                logger.info("Access Key is : "+getAccessKey);
                                                assert.ok(getAccessKey === accessKey, "Access Key is not Same");
                                                logger.info("Access Key is same for regeneration.");
                                                commUtil.getAttributeValue(xpathForSecretKey, "value", function(getSecretKey){
                                                    assert.ok(getSecretKey !== null, "Secret Key Should not be null.");
                                                    logger.info("SecretKey is : "+getSecretKey);
                                                    assert.ok(getSecretKey != secretKey, "Access Key is not Same");
                                                    logger.info("Secret Key is Not same.");
                                                    commUtil.getTextByXpath(xpathForCreationDate, function(getCreationDate){
                                                        assert.ok(getCreationDate !== null, "Creation Date Should not be null.");
                                                        logger.info("Creation Date is : "+getCreationDate);
                                                        //assert.ok(getCreationDate != creationDate, "Access Key is not Same");
                                                        logger.info("Creation Date Checked.");
                                                        accessKey = getAccessKey;
                                                        secretKey = getSecretKey;
                                                        creationDate = getCreationDate;
                                                        isGenerated(true);
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
            }
        });
    };
    this.doValidateApiAccessPage = function(isValidate){
        try{
            driver.switchTo().defaultContent();
            driver.wait(function(){
                return driver.executeScript("return document.readyState").then(function(state){
                    return state === "complete";
                });
            }, browser.params.testdata.implicitWaitTimeHigh, "Browser is not loaded properly.").then(function(){
                driver.switchTo().defaultContent();
                commUtil.waitForElement(xpathForIFrame, browser.params.testdata.implicitWaitTimeMedium, function(waitForAboutZephyrDialog){
                    assert.ok(waitForAboutZephyrDialog, "Not Found Api Access Page Dialog.");
                    logger.info("Api Access Page Popup Validated Successfully.");
                    commUtil.switchToFrameByXpath(xpathForIFrame, function(iframeSwitchStatus){
                        assert.ok(iframeSwitchStatus, "Not Switched to About Zephyr IFrame.");
                        logger.info("Switched Successfully to Api Access Page IFrame Successfully.");

                        commUtil.getTextByXpath(xpathForApiPageHeader, function(getTitle){
                            assert.equal(getTitle, "Zephyr API Key", "Api Access Page Title Validation Failed");
                            logger.info("Api Access Page Validated Successfully.");

                            commUtil.clickOnElementByXpath(xpathForApiPageCloseBtn, function(clickOnCloseLink){
                                assert.ok(clickOnCloseLink, "Not Clicked On Close Link.");
                                driver.switchTo().defaultContent();
                                isValidate(clickOnCloseLink);
                            });
                        });
                        driver.switchTo().defaultContent();
                    });
                });
            });
        }catch(e){
            isValidate(false);
        }
    };

};

module.exports = new ApiAccessPage();