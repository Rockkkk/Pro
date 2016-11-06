var commUtil = require('../../utils/commUtil.js');

var ZfjGeneralConfigPage = function() {

    var frameId = element(by.xpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__zconfig-general_provider']"));
    var issueLinkChckbox = element(by.id("zephyr-issuelink-check"));
    var remoteIssueLinkChckbox = element(by.id("zephyr-ril-check"));
    var workflowChckbox = element(by.id("zephyr-show-workflow"));

    this.checkIssueLink = function() {
        driver.wait(function () {
            commUtil.validateTitle("Zephyr General Configuration");
            commUtil.waitForElementByXpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__zconfig-general_provider']");
            driver.switchTo().frame(frameId).then(function () {
                issueLinkChckbox.isSelected().then(function (value) {
                    if (value === true) {
                        logger.info("Issue link for issue test checked");
                    }
                    else {
                        logger.info("Issue link for issue test unchecked");
                    }
                });
            });
            driver.switchTo().defaultContent();
            return true;
        }, 30000, "checking Issue Link status failed.");
    };

    this.changeIssueLinkStatus = function(){
        driver.wait(function(){
            commUtil.validateTitle("Zephyr General Configuration");
            commUtil.waitForElementByXpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__zconfig-general_provider']");
            driver.switchTo().frame(frameId).then(function(){
                issueLinkChckbox.isSelected().then(function(value){
                    if(value === true){
                        issueLinkChckbox.click().then(function(){
                            logger.info("Issue link for issue test unchecked now");
                        });
                    }
                    else{
                        issueLinkChckbox.click().then(function(){
                            logger.info("Issue link for issue test checked now");
                        });
                    }
                });
            });
            driver.switchTo().defaultContent();
            return true;
        },30000,"changing Issue Link status failed.");
    };

    this.checkRemoteIssueLinkStatus = function(){
        driver.wait(function () {
            commUtil.validateTitle("Zephyr General Configuration");
            commUtil.waitForElementByXpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__zconfig-general_provider']");
            driver.switchTo().frame(frameId).then(function () {
                remoteIssueLinkChckbox.isSelected().then(function (value) {
                    if (value === true) {
                        logger.info("Remote Issue link for issue test checked");
                    }
                    else {
                        logger.info("Remote Issue link for issue test unchecked");
                    }
                });
            });
            driver.switchTo().defaultContent();
            return true;
        }, 30000, "checking Remote Issue Link status failed.");

    };

    this.changeRemoteIssueLinkStatus = function(){
        driver.wait(function(){
            commUtil.validateTitle("Zephyr General Configuration");
            commUtil.waitForElementByXpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__zconfig-general_provider']");
            driver.switchTo().frame(frameId).then(function(){
                remoteIssueLinkChckbox.isSelected().then(function(value){
                    if(value === true){
                        remoteIssueLinkChckbox.click().then(function(){
                            logger.info("Remote Issue link for issue test unchecked now");
                        });
                    }
                    else{
                        remoteIssueLinkChckbox.click().then(function(){
                            logger.info("Remote Issue link for issue test checked now");
                        });
                    }
                });
            });
            driver.switchTo().defaultContent();
            return true;
        },30000,"changing Remote Issue Link status failed.");
    };

    this.checkWorkFlowToolbar = function(){
        driver.wait(function () {
            commUtil.validateTitle("Zephyr General Configuration");
            commUtil.waitForElementByXpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__zconfig-general_provider']");
            driver.switchTo().frame(frameId).then(function () {
                workflowChckbox.isSelected().then(function (value) {
                    if (value === true) {
                        logger.info("workflow toolbar is checked");
                    }
                    else {
                        logger.info("work flow toolbar is unchecked");
                    }
                });
            });
            driver.switchTo().defaultContent();
            return true;
        }, 30000, "checking workflow toolbar failed.");

    };

    this.changeWorkflowToolbar = function(){
        driver.wait(function(){
            commUtil.validateTitle("Zephyr General Configuration");
            commUtil.waitForElementByXpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__zconfig-general_provider']");
            driver.switchTo().frame(frameId).then(function(){
                workflowChckbox.isSelected().then(function(value){
                    if(value === true){
                        workflowChckbox.click().then(function(){
                            logger.info("workflow toolbar is unchecked now");
                        });
                    }
                    else{
                        workflowChckbox.click().then(function(){
                            logger.info("workflow toolbar is checked now");
                        });
                    }
                });
            });
            driver.switchTo().defaultContent();
            return true;
        },30000,"changing workflow toolbar status failed.");

    };







};

module.exports = new ZfjGeneralConfigPage();