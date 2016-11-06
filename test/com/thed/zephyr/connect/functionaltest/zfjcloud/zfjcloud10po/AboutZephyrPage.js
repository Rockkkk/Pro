var commUtil = require('../../utils/commUtil.js');


var AboutZephyrPage = function() {

    /******************************************************
     * 	WEBELEMENTS
     *****************************************************/
    var closeTab = element(by.id("about-dialog"));
    var zfjVersion = element(by.id("zfjVersion"));
    var jiraVersion = element(by.xpath("//*[@id='create-about-dialog']//ul[2]"));
    var frame = element(by.xpath("//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__zephyr-about_provider']"));
    var xpathForIframe = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__zephyr-about_provider']";
    var xpathForDialogHeader = "//*[@id='about-dialog']/descendant::h2[contains(@class, 'aui-dialog2')]";

    /******************************************************
     * 	PAGE OBJECT METHODS
     *****************************************************/

    this.validateAboutZephyrPage = function(isValidate){
        try{
            if(browser.params.testdata.environment === "prod"){
                xpathForIframe = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.je__zephyr-about_provider']";
            }
            driver.switchTo().defaultContent();
            driver.wait(function(){
                return driver.executeScript("return document.readyState").then(function(state){
                    return state === "complete";
                });
            }, browser.params.testdata.implicitWaitTimeHigh, "Browser is not loaded properly.").then(function(){
                driver.switchTo().defaultContent();
                commUtil.waitForElement(xpathForIframe, browser.params.testdata.implicitWaitTimeMedium, function(waitForAboutZephyrDialog){
                    assert.ok(waitForAboutZephyrDialog, "Not Found About Zephyr Dialog.");
                    logger.info("About zephyr Dialog Validated Successfully.");
                    commUtil.switchToFrameByXpath(xpathForIframe, function(iframeSwitchStatus){
                        assert.ok(iframeSwitchStatus, "Not Switched to About Zephyr IFrame.");
                        logger.info("Switched Successfully to About Zephyr IFrame Successfully.");

                        commUtil.getTextByXpath(xpathForDialogHeader, function(getTitle){
                            assert.equal(getTitle, "About Zephyr", "About Zephyr Page Title Validation Failed");
                            commUtil.getTextByXpath("//*[@id='create-about-dialog']/h2", function(headerText){
                                assert.ok(headerText.indexOf("Zephyr for JIRA Cloud") != -1, "Not Validated ZFJ Cloud Header.");
                                logger.info("ZFJ Cloud Header Validated Successfully.");
                                commUtil.getTextByXpath("//*[@id='zfjVersion']", function(zfjVersion){
                                    logger.info("ZFJ Cloud Build Name : " + zfjVersion);
                                    commUtil.getTextByXpath("//*[@id='create-about-dialog']//ul[2]", function(jiraVersion){
                                        logger.info("Jira Version Installed : " + jiraVersion);

                                        commUtil.clickOnElementByXpath("//*[@id='about-dialog']//button[@id='about-dialog-close-button']", function(clickOnCloseLink){
                                            assert.ok(clickOnCloseLink, "Not Clicked On Close Link.");
                                            driver.switchTo().defaultContent();
                                            isValidate(clickOnCloseLink);
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
            isValidate(false);
        }
    };
};

module.exports = new AboutZephyrPage();