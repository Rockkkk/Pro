/**
 * Created by zephyr on 02/01/2016.
 */

var ExcelUtil = function() {



    this.writeStatus = function(id, Status) {
        //if((typeof require !== 'undefined') XLS = require('xlsjs'));
        //XLS = require('xlsjs');
        XLSX = require('xlsx');
        var workbook = XLSX.readFile('test.xlsx');
        //var sheet_name_list = workbook.SheetNames;

        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function(sheetName) {

            var worksheet = workbook.Sheets[sheetName];


            for (cellName in worksheet) {
                //console.log("Cell Name =>  "+cellName);
                //console.log("Cell Name [0]=>  "+cellName[0]);
                if(cellName[0] === '!') continue;
                //console.log(sheetName + "!" + cellName + "=" + JSON.stringify(worksheet[cellName].v));
                if(JSON.stringify(worksheet[cellName].v) == id){
                    //    worksheet['C1'] = undefined;

                    worksheet['C'+cellName[1]] = {v: Status, t: 's'};
                    //console.log(" :: "+JSON.stringify(worksheet[cellName].v));
                }
            }
            worksheet['!ref'] = "A1:C100";
            //worksheet['!ref'] = "C1:C10";
            XLSX.writeFile(workbook, 'test.xlsx');
        });
    };
};

module.exports = new ExcelUtil();