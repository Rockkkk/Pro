

var commUtil = require('./commUtil.js');
var ManageExecutionFilterPage = function() {
  

  this.validateManageExecutionFilterpage = function() {
    driver.sleep(2000);
    driver.wait(function(){
      //expect(driver.getTitle()).toContain('You have already been logged out');
      expect(driver.getTitle()).toContain('Manage Execution Filters');
      console.log('Manage Execution Filter Page validated successfully.');
      return true;
    }, 10000, 'Not validated Manage execution Filter Page');
  };
  
};
module.exports = new ManageExecutionFilterPage();