var commUtil = require('../../utils/commUtil.js');


var TestMetricsPage = function() {
    var xpathForFrame = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__general-test-metrics_provider']";

    /*this.validateTestMetricspage = function() {
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("ready state status : " + state);
                return state === "complete";
            }).then(function(){
                commUtil.validateTitle('Test-metrics');
                return true;
            });

        },100000,"validating TestMetricsPage failed...!");
    };*/
    this.doValidateTestMetricsCharts = function(isValidateCharts){
        try{
            validateTestMetricsPage(function(isValidate){
                assert.ok(isValidate, "Not Validate Test Metrics Page.");
                logger.info("Test Metrics Page Validated Successfully.");
                commUtil.switchToFrameByXpath(xpathForFrame, function(switchToMainFrameValue){
                    assert.ok(switchToMainFrameValue, "Not Switched To Main frame.");
                    logger.info("Switched To Main Frame Successfully.");
                    commUtil.switchToFrameByXpath("//iframe[@id='kibanaIframe']", function(switchToKibanaFrameValue){
                        assert.ok(switchToKibanaFrameValue, "Not Switched To Kibana frame.");
                        logger.info("Switched To Kibana Frame Successfully.");
                        commUtil.searchTextFromElements("//span[contains(@class,'panel-text panel-title')]", "DAILY TEST EXECUTION PROGRESS", function(searchChart1Status){
                            assert.ok(searchChart1Status,"Not Validated Daily test Execution Progress Chart.");
                            commUtil.searchTextFromElements("//span[contains(@class,'panel-text panel-title')]", "TEST EXECUTIONS BY TEST CYCLE", function(searchChart1Status){
                                assert.ok(searchChart1Status,"Not Validated TEST EXECUTIONS BY TEST CYCLE Chart.");
                                commUtil.searchTextFromElements("//span[contains(@class,'panel-text panel-title')]", "TEST EXECUTIONS BY TESTER", function(searchChart1Status){
                                    assert.ok(searchChart1Status,"Not Validated TEST EXECUTIONS BY TESTER Chart.");
                                    commUtil.searchTextFromElements("//span[contains(@class,'panel-text panel-title')]", "EXECUTIONS BY DATE", function(searchChart1Status){
                                        assert.ok(searchChart1Status,"Not Validated EXECUTIONS BY DATE Chart.");
                                        commUtil.searchTextFromElements("//span[contains(@class,'panel-text panel-title')]", "LIST", function(searchChart1Status){
                                            assert.ok(searchChart1Status,"Not Validated LIST Chart.");
                                            isValidateCharts(searchChart1Status);
                                        });
                                    });
                                });
                            });
                        });
                        driver.switchTo().defaultContent();
                    });
                    driver.switchTo().defaultContent();
                });
            });
        }catch(err){

        }
    };
    var getChartOneDetails = function(getChartOneExecCount){
        var totalEx = 0;
        driver.findElements(by.xpath("//*[*[*[span[text()='Daily Test Execution Progress']]]]/following-sibling::*//span[@class='small histogram-legend-item']")).then(function(elements){
            for (var x = 0; x < elements.length; x++) {
                (function(i){
                    elements[i].getText().then(function(text){
                        //logger.info("Text : "+text);
                        var arr = text.split("(");
                        var status = arr[0];
                        var arr1 = arr[1].split(")");
                        var count = arr1[0];
                        totalEx = totalEx +  parseInt(count);
                        //logger.info("Total Executions : "+totalEx);
                    }).then(function(){
                        //logger.info("else part"+elements.length+"::"+i);
                        if(i == (elements.length - 1)){
                            //logger.info("else part1");
                            getChartOneExecCount(totalEx);
                        }
                    });
                })(x);
            }
        });
    };
    var getChartTwoDetails = function(getChartTwoExecCount){
        var totalEx = 0;
        driver.findElements(by.xpath("//*[*[*[span[text()='Test Executions by Test Cycle']]]]/following-sibling::*/div[@class='terms-wrapper']/div[@class='pointer terms-chart']/preceding-sibling::div//span[@class='small ng-scope']/span")).then(function(elements){
            //logger.info("Total Element Count : "+elements.length);
            for (var x = 0; x < elements.length; x++) {
                (function(i){
                    elements[i].getText().then(function(text){
                        //logger.info("Text : "+text);
                        var arr = text.split(" (");
                        var cycleName = arr[0];
                        //logger.info("Arr[0] : "+arr[0]);
                        //logger.info("Arr[1] : "+arr[1]);
                        arr1 = arr[1].split("");
                        var count = arr1[0];
                        //var count = arr1[0];
                        //logger.info(count);
                        totalEx = totalEx +  parseInt(count);
                        //logger.info("Total Executions : "+totalEx);
                    }).then(function(){
                        //logger.info("else part"+elements.length+"::"+i);
                        if(i == (elements.length - 1)){
                            //logger.info("else part1");
                            getChartTwoExecCount(totalEx);
                        }
                    });

                })(x);
            }
        });
    };
    var getChartThreeDetails = function(getChartThreeExecCount){
        var totalEx = 0;
        driver.findElements(by.xpath("//*[*[*[span[text()='Test Executions by Tester']]]]/following-sibling::*/div[@class='terms-wrapper']/div[@class='pointer terms-chart']/preceding-sibling::div//span[@class='small ng-scope']/span")).then(function(elements){
            for (var x = 0; x < elements.length; x++) {
                (function(i){
                    elements[i].getText().then(function(text){
                        //logger.info("Text : "+text);
                        var arr = text.split("(");
                        //logger.info(arr[0]);
                        //logger.info(arr[1]);
                        var count = arr[1].replace(")", "");
                        //var count = arr1[0];
                        //logger.info(count);
                        totalEx = totalEx +  parseInt(count);
                        //var cycleName = arr[0];
                        //var arr1 = arr[1].split(")");
                        // var count = arr1[0];
                        // totalEx = totalEx +  parseInt(count);
                        //logger.info("Total Executions : "+totalEx);
                    }).then(function(){
                        //logger.info("else part"+elements.length+"::"+i);
                        if(i == (elements.length - 1)){
                            //logger.info("else part1");
                            getChartThreeExecCount(totalEx);
                        }
                    });
                })(x);
            }
        });
    };
    var getChartFourDetails = function(getChartFourExecCount){
        var totalEx = 0;
        driver.findElements(by.xpath("//*[*[*[span[text()='Executions by Date']]]]/following-sibling::*//span[@class='small histogram-legend-item']")).then(function(elements){
            for (var x = 0; x < elements.length; x++) {
                (function(i){
                    elements[i].getText().then(function(text){
                        //logger.info("Text : "+text);
                        var arr = text.split("(");
                        //logger.info(arr[0]);
                        //logger.info(arr[1]);
                        var count = arr[1].replace(")", "");
                        //var count = arr1[0];
                        //logger.info(count);
                        totalEx = totalEx +  parseInt(count);
                        /*var cycleName = arr[0];
                         var arr1 = arr[1].split(")");
                         var count = arr1[0];
                         totalEx = totalEx +  parseInt(count);*/
                        //return totalEx;
                    }).then(function(){
                        //logger.info("else part"+elements.length+"::"+i);
                        if(i == (elements.length - 1)){
                            //logger.info("else part1");
                            getChartFourExecCount(totalEx);
                        }
                    });
                })(x);
            }
        });
    };
    var getChartFiveDetails = function(getListExecCount){
        var totalEx = 0;
        driver.findElements(by.xpath("//*[*[*[span[text()='List']]]]/following-sibling::*//div[@class='table-doc-table']/div/div[@class='row-fluid'][1]/div[2]")).then(function(elements){
            for (var x = 0; x < elements.length; x++) {
                (function(i){
                    elements[i].getText().then(function(text){
                        //logger.info("Text : "+text);
                        var arr = text.split("of ");
                        //logger.info(arr[0]+"::"+arr[1]);
                        var arr1 = arr[1].split(" available");
                        //logger.info(arr1[0]+"::"+arr1[1]);
                        var count = arr1[0];
                        //logger.info("count : then : "+count);
                        totalEx = totalEx +  parseInt(count);
                        //logger.info("Total Executions : "+totalEx);
                        //return count;
                    }).then(function(){
                        //logger.info("else part"+elements.length+"::"+i);
                        if(i == (elements.length - 1)){
                            //logger.info("else part1");
                            getListExecCount(totalEx);
                        }
                    });
                })(x);
                /*.then(function(count){
                    logger.info("count : then : "+count);
                    totalEx = totalEx +  parseInt(count);
                    logger.info("Total Executions : "+totalEx);
                    getListExecCount(totalEx);
                });*/
                //driver.findElement(By.xpath())
            }
        });
    };
    this.doValidateCharts = function(totalExecuted, isValidateCharts){
        try{
            validateTestMetricsPage(function(isValidate){
                assert.ok(isValidate, "Not Validate Test Metrics Page.");
                logger.info("Test Metrics Page Validated Successfully.");
                commUtil.switchToFrameByXpath(xpathForFrame, function(switchToMainFrameValue){
                    assert.ok(switchToMainFrameValue, "Not Switched To Main frame.");
                    logger.info("Switched To Main Frame Successfully.");
                    commUtil.switchToFrameByXpath("//iframe[@id='kibanaIframe']", function(switchToKibanaFrameValue){
                        assert.ok(switchToKibanaFrameValue, "Not Switched To Kibana frame.");
                        logger.info("Switched To Kibana Frame Successfully.");
                        commUtil.searchTextFromElements("//span[contains(@class,'panel-text panel-title')]", "DAILY TEST EXECUTION PROGRESS", function(searchChart1Status){
                            assert.ok(searchChart1Status,"Not Validated Daily test Execution Progress Chart.");
                            commUtil.searchTextFromElements("//span[contains(@class,'panel-text panel-title')]", "TEST EXECUTIONS BY TEST CYCLE", function(searchChart1Status){
                                assert.ok(searchChart1Status,"Not Validated TEST EXECUTIONS BY TEST CYCLE Chart.");
                                commUtil.searchTextFromElements("//span[contains(@class,'panel-text panel-title')]", "TEST EXECUTIONS BY TESTER", function(searchChart1Status){
                                    assert.ok(searchChart1Status,"Not Validated TEST EXECUTIONS BY TESTER Chart.");
                                    commUtil.searchTextFromElements("//span[contains(@class,'panel-text panel-title')]", "EXECUTIONS BY DATE", function(searchChart1Status){
                                        assert.ok(searchChart1Status,"Not Validated EXECUTIONS BY DATE Chart.");
                                        commUtil.searchTextFromElements("//span[contains(@class,'panel-text panel-title')]", "LIST", function(searchChart1Status){
                                            assert.ok(searchChart1Status,"Not Validated LIST Chart.");
                                            getChartOneDetails(function(getChartOneCount){
                                                logger.info("Chart One Execution Count : "+ getChartOneCount);
                                                getChartTwoDetails(function(getChartTwoCount){
                                                    logger.info("Chart Two Execution Count : "+ getChartTwoCount);
                                                    getChartThreeDetails(function(getChartThreeCount){
                                                        logger.info("Chart Three Execution Count : "+ getChartThreeCount);
                                                        getChartFourDetails(function(getChartFourCount){
                                                            logger.info("Chart Four Execution Count : "+ getChartFourCount);
                                                            getChartFiveDetails(function(getChartFiveCount){
                                                                logger.info("Chart Five Execution Count : "+ getChartFiveCount);
                                                                assert.ok(getChartFiveCount === getChartTwoCount, "Not Validated Chart Two and Five");
                                                                logger.info("Chart Two and Five Validated Successfully.");
                                                                assert.ok(getChartOneCount === totalExecuted , "Not Validated Chart One.");
                                                                logger.info("Chart One Validated Successfully.");
                                                                assert.ok(getChartThreeCount === totalExecuted , "Not Validated Chart Three.");
                                                                logger.info("Chart Three Validated Successfully.");
                                                                assert.ok(getChartFourCount === totalExecuted , "Not Validated Chart Four.");
                                                                logger.info("Chart Four Validated Successfully.");
                                                                isValidateCharts(searchChart1Status);
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                        driver.switchTo().defaultContent();
                    });
                    driver.switchTo().defaultContent();
                });
            });
        }catch(err){

        }
    };
    validateTestMetricsPage = function(isValidate) {
        try{
            if(browser.params.testdata.environment === "prod"){
                xpathForIframe = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.je__general-test-metrics_provider']";
            }
            driver.switchTo().defaultContent();
            driver.wait(function(){
                return driver.executeScript("return document.readyState").then(function(state){
                    logger.info("ready state status : " + state);
                    return state === "complete";
                });
            }, browser.params.testdata.implicitWaitTimeHigh, "Browser is not loaded properly.").then(function(){
                commUtil.waitForTitle("Test-metrics", function(waitForTitleStatus){
                    assert.ok(waitForTitleStatus, "Not Validate Test Metrics Page Title.");
                    logger.info("Test Metrics Page Validated Successfully.");
                    commUtil.waitForElement(xpathForFrame, browser.params.testdata.implicitWaitTimeMedium, function(waitForFrame){
                        assert.ok(waitForFrame, "Not Found Frame.");
                        isValidate(waitForFrame);
                    });
                });
            });
        }catch(err){
            isValidate(false);
        }
    };
    this.doValidateTestMetricsPage = function(isValidateTestMetricsPage){
        validateTestMetricsPage(function(isValidate){
            assert.ok(isValidate, "Not Validate Test Metrics Page.");
            isValidateTestMetricsPage(isValidate);
        });
    };
};
module.exports = new TestMetricsPage();