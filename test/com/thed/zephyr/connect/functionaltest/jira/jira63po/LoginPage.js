var commUtil = require('../../utils/commUtil.js');
var LoginPage = function() {

  /******************************************************
   *  JIRA LOGIN PAGE
   *****************************************************/

  /******************************************************
   *  WEBELEMENTS
   *****************************************************/
   var xpathForUsername = "//*[@id='login-form-username']" ;
   var xpathForPassword = "//*[@id='login-form-password']" ;
   var xpathForLoginBtn = "//*[@id='login-form-submit']" ;
   var xpathForLoginAgainLink = "//a[text()='Log in again.']" ;

    var xpathForUsernameInProd = "//*[@id='username']" ;
    var xpathForPasswordInProd = "//*[@id='password']" ;
    var xpathForLoginBtnInProd = "//*[@id='login']" ;
    var xpathForLoginAgainLinkInProd = "//a[text()='Log in again.']" ;

  /*var username = element(by.id('login-form-username'));
  var password = element(by.id('login-form-password'));
  var loginBtn = element(by.id('login-form-submit'));
  var loginAgainLnk = element(by.xpath("//a[text()='Log in again.']"));*/

  /******************************************************
   *  PAGE OBJECT METHODS
   *****************************************************/
  this.login = function(username, password, isLogin) {
      try{
          validateLoginPage(function(validateLoginPageStatus){
              assert.ok(validateLoginPageStatus, "Login Page not Validated Successfully.");
              logger.info("Login Page Validated Successfully.");

              if(browser.params.testdata.environment === "prod" || browser.params.testdata.environment === "preprod"){
                  commUtil.sendTextToElement( xpathForUsernameInProd, username, function( sendTextToUsernameFieldStatus ) {
                      assert.ok(sendTextToUsernameFieldStatus, "Username Field Not Found : " + xpathForUsername);
                      logger.info("Username is given successfully to Username Field.");

                      commUtil.sendTextToElement( xpathForPasswordInProd, password, function( sendTextToPasswordFieldStatus ) {
                          assert.ok(sendTextToPasswordFieldStatus, "Password Field Not Found : " + xpathForPassword);
                          logger.info("Password is given successfully to Password Field.");

                          commUtil.clickOnElementByXpath( xpathForLoginBtnInProd, function(clickOnLoginBtnStatus){
                              assert.ok(clickOnLoginBtnStatus, "Login Button Not Found : " + xpathForLoginBtn);
                              logger.info("Clicked on Login Button successfully.");
                              isLogin(clickOnLoginBtnStatus);
                          });
                      });
                  });
              }else{
                  commUtil.sendTextToElement( xpathForUsername, username, function( sendTextToUsernameFieldStatus ) {
                      assert.ok(sendTextToUsernameFieldStatus, "Username Field Not Found : " + xpathForUsername);
                      logger.info("Username is given successfully to Username Field.");

                      commUtil.sendTextToElement( xpathForPassword, password, function( sendTextToPasswordFieldStatus ) {
                          assert.ok(sendTextToPasswordFieldStatus, "Password Field Not Found : " + xpathForPassword);
                          logger.info("Password is given successfully to Password Field.");

                          commUtil.clickOnElementByXpath( xpathForLoginBtn, function(clickOnLoginBtnStatus){
                              assert.ok(clickOnLoginBtnStatus, "Login Button Not Found : " + xpathForLoginBtn);
                              logger.info("Clicked on Login Button successfully.");
                              isLogin(clickOnLoginBtnStatus);
                          });
                      });
                  });
              }
          });
      }catch(e){
          console.error(e.message);
      }
  };

  this.loginAgain = function(isLoginAgain) {
      try{
          validateLoginAgainPage(function(validateLoginAgainPageStatus){
              assert.ok(validateLoginAgainPageStatus, "Login Again Page not Validated.");
              logger.info("Login Again Page Validated Successfully.");

              commUtil.clickOnElementByXpath(xpathForLoginAgainLink, function(clickOnLoginAgainLinkStatus){
                  assert.ok(clickOnLoginAgainLinkStatus, "Not Found Login Again Link : " + xpathForLoginAgainLink);
                  logger.info("Clicked on Login Again Link successfully.");

                  validateLoginPage(function(validateLoginPageStatus){
                      assert.ok(validateLoginPageStatus, "Login Again Page Validation Failed.");
                      logger.info("Login Page Validated Successfully.");
                      isLoginAgain(validateLoginPageStatus);
                  });
              });
          });
      }catch(e){
          console.error(e.message);
      }
  };
  
  /******************************************************
   *  PAGE REUSABLE METHODS
   *****************************************************/
   
   var validateLoginPage = function(isValidateLoginPage) {
       driver.wait(function(){
           return driver.executeScript("return document.readyState").then(function(state){
               //logger.info("Browser state : " + state);
               return state === "complete";
           });
       }, browser.params.testdata.PageLoadTimeOut).then(function(){
           if(browser.params.testdata.environment === "prod" || browser.params.testdata.environment === "preprod"){
               commUtil.waitForTitle("Atlassian Cloud", function(waitForTitleStatus){
                   assert.ok(waitForTitleStatus, "Prod Login Page Title Validation Failed.");
                   isValidateLoginPage(waitForTitleStatus);
               });
           }else{
               commUtil.waitForTitle("Log in", function(waitForTitleStatus){
                   assert.ok(waitForTitleStatus, "Login Page Title Validation Failed.");
                   isValidateLoginPage(waitForTitleStatus);
               });
           }

       },function(e) {
           console.error("Browser is not Loaded.");
           isValidateLoginPage(false);
       });
   };

   validateLoginAgainPage = function(isValidateLoginAgainPage) {
       driver.wait(function(){
           return driver.executeScript("return document.readyState").then(function(state){
               //logger.info("Browse state : " + state);
               return state === "complete";
           });
       }, browser.params.testdata.PageLoadTimeOut).then(function(){
           commUtil.waitForTitle("Logout", function(waitForTitleStatus){
               assert.ok(waitForTitleStatus, "Login Again Page Not Validated");
               isValidateLoginAgainPage(waitForTitleStatus);
           });
       },function(e) {
           console.error("Browser is not Loaded.");
           isValidateLoginAgainPage(false);
       });
   };
};
module.exports = new LoginPage();