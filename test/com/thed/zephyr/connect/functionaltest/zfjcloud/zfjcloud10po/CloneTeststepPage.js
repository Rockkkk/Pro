var commUtil = require('../../utils/commUtil.js');

var CloneTeststepPage = function(){

    /******************************************************
     * 	WEBELEMENTS
     *****************************************************/

    var insertAt = element(by.id("clone-insert-at"));
    var insertAfter = element(by.id("//*[@id='clone-append-below']"));
    var insertBefore = element(by.id("clone-append-above"));


    /******************************************************
     * 	PAGE OBJECT METHODS
     *****************************************************/

    this.cloneTeststepByEnteringValidNumber = function(divId,cloneStepAt){
        driver.sleep(500);
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='"+divId+"']//h2")).then(function(headerValue){
            expect(headerValue).toContain("Clone Test Step");
            driver.executeScript("arguments[0].scrollIntoView();",commUtil.changeToWebElement("//*[@id='"+divId+"']//div[@class='dialog-page-body']"));
            insertAt.sendKeys(cloneStepAt);
            commUtil.changeToWebElement("//*[@id='"+divId+"']//button[text()='Clone']").click();
        });
    };

    this.cloneTeststepInsertAfterStep = function(divId){
        driver.sleep(500);
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='"+divId+"']//h2")).then(function(headerValue){
            assert.(headerValue).toContain("Clone Test Step");
            driver.executeScript("arguments[0].scrollIntoView();",commUtil.changeToWebElement("//*[@id='"+divId+"']//div[@class='dialog-page-body']"));
            if(!(insertAfter.isSelected)){
                insertAfter.click();
            }
            commUtil.changeToWebElement("//*[@id='"+divId+"']//button[text()='Clone']").click();
        });

    };

};

module.exports= new CloneTeststepPage();


















