var commUtil = require('../../utils/commUtil.js');

var administratorAccessPage = function() {
    
    var password = element(by.id('login-form-authenticatePassword'));
    var loginBtn = element(by.id('login-form-submit'));


    this.validateAdministratorAccessPage = function() {
      commUtil.validateTitle("Administrator Access");        
  };

  this.authenticatePage = function(password) {
    this.validateAdministratorAccessPage();
    driver.sleep(1000);
    this.password.sendKeys(password);
    this.loginBtn.click();
    commUtil.implecitWait(10000);
  };
};
module.exports = new administratorAccessPage();