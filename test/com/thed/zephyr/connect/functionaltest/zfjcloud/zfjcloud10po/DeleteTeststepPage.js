var commUtil = require('../../utils/commUtil.js');

var DeleteTeststepPage = function(){

    this.deleteTeststep = function(divId){
        driver.sleep(1000);
        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//*[@id='"+divId+"']//h2")).then(function(headerValue){
            expect(headerValue).toContain("Delete Test Step");
            driver.executeScript("arguments[0].scrollIntoView();",commUtil.changeToWebElement("//*[@id='"+divId+"']//div[@class='dialog-page-body']"));
        });
        commUtil.changeToWebElement("//*[@id='"+divId+"']//button[text()='Delete']").click();


    };




};

module.exports= new DeleteTeststepPage();
