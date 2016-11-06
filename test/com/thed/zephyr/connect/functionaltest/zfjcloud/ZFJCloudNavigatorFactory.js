
var params = browser.params;


var ZFJCloudNavigatorFactory = function() {

   /******************************************************
   *  JIRA NAVIGATOR FACTORY
   *****************************************************/

   
    this.getInstance = function(){

        var version = params.testdata.zfjcloudVersion;

        var zfjcloudInstance = require('./zfjcloudNavigator' + version + 'Impl.js');

        return zfjcloudInstance;

    };

};

module.exports = new ZFJCloudNavigatorFactory();