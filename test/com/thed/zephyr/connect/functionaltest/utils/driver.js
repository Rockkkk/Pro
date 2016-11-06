var q = require('q');
var FirefoxProfile = require('firefox-profile');

exports.getFirefoxProfile = function() {
    var deferred = q.defer();
    var firefoxProfile = new FirefoxProfile();
    firefoxProfile.setPreference("browser.download.folderList",2);
    firefoxProfile.setPreference("browser.download.manager.showWhenStarting",false);
    firefoxProfile.setPreference("browser.download.dir","D:\\export\\");
    firefoxProfile.setPreference("browser.helperApps.neverAsk.saveToDisk","image/jpg, text/csv,text/xml,application/xml,application/vnd.ms-excel,application/x-excel,application/x-msexcel,application/excel,application/pdf,application/octet-stream");
    firefoxProfile.encoded(function(encodedProfile) {
        var capabilities = {
            'browserName': 'firefox',
            'firefox_profile' : encodedProfile
        };
        deferred.resolve(capabilities);
    });
    return deferred.promise;
};

