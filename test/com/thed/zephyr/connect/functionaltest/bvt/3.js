/**
 * Created by zephyr on 23/12/2015.
 */
var commUtil = require('../utils/commUtil.js');

var zfjcloudNavigator = require('../zfjcloud/ZFJCloudNavigatorFactory.js').getInstance();
var jiraNavigator = require('../jira/JiraNavigatorFactory.js').getInstance();
XLSX = require('xlsx');

var params = browser.params;
var isSuccess;
var logout;
var testOneMap = "";
var executeMap1 = "";
var executeMap2 = "";
var cycleOpMap1 = "";
var addDefectMap = "";
var commentTestMap = "";
beforeEach(function () {
    browser.ignoreSynchronization = true;
});

describe('ZFJ Cloud Testing For Jira Admin', function() {

    it("Delete Test Successfully.", function () {
        //var XLS = require('xlsjs');
        console.log("66");
       /* var workbook = new Excel.Workbook();
        workbook.xlsx.readFile('D:\\export\\Your Company JIRA.xls')
            .then(function() {
                // use workbook
            });
*/
        console.log("66");
        if(typeof require !== 'undefined') XLS = require('xlsjs');
        var workbook = XLS.readFile('D:\\export\\Your Company JIRA.xls');
        console.log(workbook);
        var workbook = XLSX.readFile('D:\\export\\Your Company JIRA.xls');
        //var sheet_name_list = workbook.SheetNames;

        var sheet_name_list = workbook.SheetNames;
        console.log(sheet_name_list);

        sheet_name_list.forEach(function(sheetName) {

            var worksheet = workbook.Sheets[sheetName];
            console.log(worksheet);
        });
    });
});
