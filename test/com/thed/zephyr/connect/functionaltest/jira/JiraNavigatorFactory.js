
var params = browser.params;


var JiraNavigatorFactory = function() {

   /******************************************************
   *  JIRA NAVIGATOR FACTORY
   *****************************************************/

   
    this.getInstance = function(){

        var version = params.testdata.jiraVersion;

        var jiraInstance = require('./JiraNavigator' + version + 'Impl.js');

        return jiraInstance;

    };

};

module.exports = new JiraNavigatorFactory();