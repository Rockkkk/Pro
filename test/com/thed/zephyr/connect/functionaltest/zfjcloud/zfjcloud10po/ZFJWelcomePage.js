var commUtil = require('../../utils/commUtil.js');


var ZFJWelcomePage = function() {

    this.doValidateZfjWelcomePage = function(isValidate) {
        try{
            driver.switchTo().defaultContent();
            driver.wait(function(){
                return driver.executeScript("return document.readyState").then(function(state){
                    logger.info("ready state status : " + state);
                    return state === "complete";
                });
            }, browser.params.testdata.implicitWaitTimeHigh, "Browser is not loaded properly.").then(function(){
                commUtil.waitForTitle("Zephyr for JIRA Cloud", function(waitForTitleStatus){
                    assert.ok(waitForTitleStatus, "Not Validate Welcome Page Title.");

                    commUtil.switchToFrameByXpath("//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__general-zephyr-welcome_provider']", function(switchStatus){
                        assert.ok(switchStatus, "Not Switched To Frame.");
                        commUtil.getTextByXpath("//h1[@class='zephyr-gs-header']", function(getHeader){
                            logger.info(getHeader);
                            assert.ok(getHeader.indexOf("Zephyr for JIRA Cloud") != -1, "Welcome Page Header validated Successfully.");
                            assert.ok(getHeader.indexOf("Zephyr") != -1, "Company Name Validated in Welcome Page.");
                            logger.info("ZFJ Welcome Page Validated Successfully.");
                            driver.switchTo().defaultContent();
                            isValidate(true);
                        });
                        driver.switchTo().defaultContent();
                    });
                });
            });
        }catch(err){
            isValidate(false);
        }
    };
  
};
module.exports = new ZFJWelcomePage();