var commUtil = require('../../utils/commUtil.js');

var ZFJHelpPage = function() {

    this.doValidateZfjHelpPage = function(isValidate) {
        try{
            driver.switchTo().defaultContent();
            driver.wait(function(){
                return driver.executeScript("return document.readyState").then(function(state){
                    logger.info("ready state status : " + state);
                    return state === "complete";
                });
            }, browser.params.testdata.implicitWaitTimeHigh, "Browser is not loaded properly.").then(function(){
                commUtil.waitForTitle("Zephyr for JIRA Cloud Documentation Home", function(waitForTitleStatus){
                    assert.ok(waitForTitleStatus, "Not Validate Zephyr Help Page Title.");
                    commUtil.getTextByXpath("//*[@id='title-text']/a", function(getHeader){
                        logger.info(getHeader);
                        assert.equal(getHeader, "Zephyr for JIRA Cloud Documentation Home", "Zephyr Help Page Header validated Successfully.");
                        logger.info("Zephyr Help Page Validated Successfully.");
                        driver.navigate().back();
                        commUtil.implicitWait(browser.params.testdata.PageLoadTimeOut);
                        driver.switchTo().defaultContent();
                        isValidate(true);
                    });
                });
            });
        }catch(err){
            isValidate(false);
        }
    };
};
module.exports = new ZFJHelpPage();