var commUtil = require('../../utils/commUtil.js');
var SearchTestPage = require('./SearchTestPage.js');

var TestSummaryPage = function() {

    /******************************************************
     * 	WEBELEMENTS
     *****************************************************/
    var xpathForIframe = "";
    if(browser.params.testdata.projectCentricView === "enabled"){
        xpathForIframe = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__project-centric-tests-web-panel_provider']";
    }else if(browser.params.testdata.projectCentricView === "disabled"){
        xpathForIframe = "//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__summary-tab_provider']";
    }
    /*var xpathOfTestSummaryTitle = element(by.xpath("/*//*[@id='project-tab']/descendant::h2"));
    var xpathOfTestSummaryTab = element(by.xpath("//li[a[strong[text()='Test Summary']]]"));
    var xpathOfFrame = element(by.xpath("/*//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__summary-tab_provider']"));
    var xpathOfSummaryCharts = element(by.id("secondary"));
    var headingOfTestCreationChart = element(by.xpath("/*//*[@id='secondary']/descendant::h3[1]"));
    var headingOfTestExecutionChart = element(by.xpath("/*//*[@id='secondary']/descendant::h3[2]"));
    var createTestChart = element(by.id("testcases-creation-chart-id"));
    var executionTestChart = element(by.id("execution-creation-chart-id"));
    var testsCreated = element(by.xpath("//div[a[@title='Total Tests']]/span"));
    var testsExecuted = element(by.xpath("//div[a[@title='Total Tests']]/following-sibling::div[1]/span"));
    var testsRemaining = element(by.xpath("//div[a[@title='Total Tests']]/following-sibling::div[2]/span"));
    var totalTestLink = element(by.xpath("//a[@title='Total Tests']"));
    var getTestsCreatedFormChart = element(by.xpath("/*//*[@id='chart-details-id']//strong[1]"));
    var getTestsExecutedFromChart = element(by.xpath("/*//*[@id='execution-details-id']//strong[1]"));
    */
    var xpathForTestSummaryHeader = ".//*[@id='content']//h2";
    var xpathForTestSummaryPCVHeader = "//*[@id='aui-test-summary-tab']/strong";
    //var xpathForIframe = "//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__summary-tab_provider']";

    /******************************************************
     * 	PAGE OBJECT METHODS
     *****************************************************/

    /*this.validateTestSummarypage = function() {
        if(browser.params.testdata.environment === "prod"){
            xpathForIframe = "/*//*[@id='easyXDM_embedded-com.thed.zephyr.je__summary-tab_provider']";
        }
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("ready state status : " + state);
                return state === "complete";
            }).then(function(){
                commUtil.waitForElementByXpath("/*//*[@id='project-tab']/descendant::h2");
                commUtil.getTextUsingWebElement(xpathOfTestSummaryTitle).then(function(heading){
                    assert.equal(heading,"Test Summary","Heading doesn't match");
                });
                commUtil.isElementDisplayed(xpathOfTestSummaryTab).then(function(isDisplayed){
                    assert.ok(isDisplayed);
                });
                driver.sleep(40000);
                commUtil.waitForElementByXpath("/*//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__summary-tab_provider']");
                commUtil.isElementDisplayed(commUtil.changeToWebElement("/*//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__summary-tab_provider']")).then(function(isDisplayed){
                    //assert.ok(isDisplayed);
                    driver.switchTo().frame(commUtil.changeToWebElement("/*//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__summary-tab_provider']")).then(function(){
                        commUtil.isElementDisplayed(xpathOfSummaryCharts).then(function(isChartsDisplayed){
                            //assert.ok(isChartsDisplayed);
                        });
                        commUtil.getTextUsingWebElement(headingOfTestCreationChart).then(function(testCreationHeader){
                            assert.equal(testCreationHeader,"Test Creation: 30 Day Summary","Validating Create Test Header Failed.");
                            if(testCreationHeader === "Test Creation: 30 Day Summary"){
                                logger.info("creation header displayed correctly");
                            }
                        });
                        commUtil.isElementDisplayed(createTestChart).then(function(isCreateTestChartDisplayed){
                            assert.ok(isCreateTestChartDisplayed,"Test Creation Chart is not displayed.");
                            if(isCreateTestChartDisplayed === true){
                                logger.info("creation chart is displayed");
                            }
                        });
                        commUtil.getTextUsingWebElement(headingOfTestExecutionChart).then(function(testExecutionHeader){
                            assert.equal(testExecutionHeader,"Test Execution: 30 Day Summary","Validating Test Execution Header Failed.");
                            if(testExecutionHeader === "Test Execution: 30 Day Summary"){
                                logger.info("execution header displayed correctly");
                            }
                        });
                        commUtil.isElementDisplayed(executionTestChart).then(function(isExecutionTestChartDisplayed){
                            assert.ok(isExecutionTestChartDisplayed,"Test Execution Chart is not displayed.");
                            if(isExecutionTestChartDisplayed === true){
                                logger.info("execution chart is displayed");
                            }
                        });
                    });
                });
                driver.switchTo().defaultContent();
                return true;
            });
        }, 120000, "Validating TestSummaryPage failed.");
    };*/
    this.validateTestSummaryLinks = function (callback) {
        try {
            validateTestSummaryPage(function (validateStatus) {
                assert.ok(validateStatus, "Test Summary Validation Failed.");
                logger.info("Test Summary Validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIframe, function (switchToFrameStatus) {
                    assert.ok(switchToFrameStatus, "Not Switched To Frame.");
                    logger.info("Switched To Frame Successfully in Test Summary Page.");

                    commUtil.waitForElement("//*[@id='secondary']", browser.params.testdata.implicitWaitTimeMedium, function(waitForSummaryCharts){
                        assert.ok(waitForSummaryCharts, "Summary Charts are not visible.");

                        commUtil.getTextByXpath("//div[a[@title='Total Tests']]/span", function(totalTests){
                            logger.info("Total Tests Created : "+totalTests);
                            commUtil.clickOnElementByXpath("//a[@title='Total Tests']", function(clickOnElementStatus){
                                assert.ok(clickOnElementStatus, "Not Clicked On Total Tests.");
                                getTotalTestFromSearchTestPage(function(totalTestsInSearchTestPage){
                                    logger.info("Total Tests in search Test page : " + totalTestsInSearchTestPage);
                                    assert.ok(totalTests == totalTestsInSearchTestPage, "Total Tests Not validated.");

                                    commUtil.getTextByXpath("//div[a[@title='Total Tests']]/following-sibling::div[1]/span", function(totalExecuted){
                                        logger.info("Total Executed Tests : "+totalExecuted);
                                        commUtil.getTextByXpath("//div[a[@title='Total Tests']]/following-sibling::div[2]/span", function(totalRemaining){
                                            logger.info("Total Remaining Tests : "+totalRemaining);

                                            validateVersionsTest(function(isValidateVersions){
                                                assert.ok(isValidateVersions, "Not Validate versions.");
                                                logger.info("All Versions are Validated Successfully.");
                                                validateComponentsTest(function(isValidateComponents){
                                                    assert.ok(isValidateComponents, "Not Validate Components.");
                                                    logger.info("All Components are Validated Successfully.");
                                                    callback(isValidateComponents);
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
            });
        } catch (e) {
            throw e;
        }
    };
    var getTotalTestFromSearchTestPage = function(totalTestsFromSearch){
        SearchTestPage.totalTests(function(totalTests){
            driver.navigate().back().then(function() {
                commUtil.implicitWait(browser.params.testdata.PageLoadTimeOut);
                validateTestSummaryPage(function (validateStatus) {
                    assert.ok(validateStatus, "Test Summary Validation Failed.");
                    logger.info("Test Summary Validated Successfully.");

                    commUtil.switchToFrameByXpath(xpathForIframe, function (switchToFrameStatus) {
                        assert.ok(switchToFrameStatus, "Not Switched To Frame.");
                        logger.info("Switched To Frame Successfully in Test Summary Page.");
                        totalTestsFromSearch(totalTests);
                    });
                });
            });
        });
    };
    var validateVersionsTest = function(isValidate){
       /* element.all(by.xpath("//div[h3[contains(text(),'Tests By Version')]]/following-sibling::div//a")).each(function(element){
            commUtil.getTextByXpath("")
        });*/
        driver.findElements(by.xpath("//div[h3[contains(text(),'Tests By Version')]]/following-sibling::div//a")).then(function (versions) {
            logger.info("Total number of Versions are : "+versions.length);
            for(var i=0; i<versions.length; i++){
                (function(x){
                    commUtil.getTextByXpath("//div[h3[contains(text(),'Tests By Version')]]/following-sibling::div/div["+(x+1)+"]/a", function(getVersionName){
                        logger.info("Version Name : "+getVersionName);
                        commUtil.getTextByXpath("//div[h3[contains(text(),'Tests By Version')]]/following-sibling::div/div["+(x+1)+"]//span", function(getCount){
                            logger.info("Total tests : "+getCount);
                            var testsCount = parseInt(getCount);
                            /*commUtil.clickOnElementByXpath("//a[contains(text(),'" + getVersionName + "')]", function(clickOnVersionStatus){
                                assert.ok(clickOnVersionStatus,"Not clicked On Version.");
                                logger.info("Clicked On Version : "+getVersionName);
                                getTotalTestFromSearchTestPage(function(totalTestsInSearchTestPage) {
                                    logger.info("Total Tests in search Test page : " + totalTestsInSearchTestPage);
                                    assert.ok(getCount == parseInt(totalTestsInSearchTestPage), "Total Tests Not validated.");
                                    logger.info("Total Tests in "+getVersionName+" Validated Successfully.");
                                    if(x === (versions.length -1)){
                                        isValidate(true);
                                    }
                                });
                            });*/
                            if (testsCount > 0) {
                                commUtil.clickOnElementByXpath("//a[contains(text(),'" + getVersionName + "')]", function(clickOnVersionStatus){
                                    assert.ok(clickOnVersionStatus,"Not clicked On Version.");
                                    logger.info("Clicked On Version : "+getVersionName);
                                    getTotalTestFromSearchTestPage(function(totalTestsInSearchTestPage) {
                                        logger.info("Total Tests in search Test page : " + totalTestsInSearchTestPage);
                                        assert.ok(getCount == parseInt(totalTestsInSearchTestPage), "Total Tests Not validated.");
                                        logger.info("Total Tests in "+getVersionName+" Validated Successfully.");
                                        if(x === (versions.length -1)){
                                            isValidate(true);
                                        }
                                    });
                                });
                            }
                            else{
                                logger.info("Total Test under " + getVersionName + " is : 0");
                                if(x === (versions.length -1)){
                                    isValidate(true);
                                }
                            }
                        });
                    });
                })(i);
            }
        });

    };
    var validateComponentsTest = function(isValidate){
        driver.findElements(by.xpath("//div[h3[contains(text(),'Tests By Component')]]/following-sibling::div//a")).then(function (components) {
            logger.info("Total number of Components are : "+components.length);
            for(var i=0; i<components.length; i++){
                (function(x){
                    commUtil.getTextByXpath("//div[h3[contains(text(),'Tests By Component')]]/following-sibling::div/div["+(x+1)+"]/a", function(getComponentName){
                        logger.info("Component Name : "+getComponentName);
                        commUtil.getTextByXpath("//div[h3[contains(text(),'Tests By Component')]]/following-sibling::div/div["+(x+1)+"]//span", function(getCount) {
                            logger.info("Total tests : " + getCount);
                            var testsCount = parseInt(getCount);

                            if (testsCount > 0) {
                                commUtil.clickOnElementByXpath("//a[contains(text(),'" + getComponentName + "')]", function(clickOnComponentStatus){
                                    assert.ok(clickOnComponentStatus,"Not clicked On Version.");
                                    logger.info("Clicked On Version : "+getComponentName);
                                    getTotalTestFromSearchTestPage(function(totalTestsInSearchTestPage) {
                                        logger.info("Total Tests in search Test page : " + totalTestsInSearchTestPage);
                                        assert.ok(getCount == parseInt(totalTestsInSearchTestPage), "Total Tests Not validated.");
                                        logger.info("Total Tests in "+getComponentName+" Validated Successfully.");
                                        if(x === (components.length -1)){
                                            isValidate(true);
                                        }
                                    });
                                });
                            }
                            else{
                                logger.info("Total Test under " + getComponentName + " is : 0");
                                if(x === (components.length -1)){
                                    isValidate(true);
                                }
                            }
                        });
                    });
                })(i);
            }
        });
    };

    this.validateTestSummary111 = function() {
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("ready state status : " + state);
                return state === "complete";
            });
        }, 100000, "Browser is not loaded properly.");
        driver.wait(function () {
                driver.sleep(40000);
                commUtil.waitForElementByXpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__summary-tab_provider']");
                commUtil.isElementDisplayed(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__summary-tab_provider']")).then(function(isDisplayed){
                    expect(isDisplayed).toBe(true);
                    driver.switchTo().frame(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__summary-tab_provider']")).then(function () {
                        commUtil.isElementDisplayed(xpathOfSummaryCharts).then(function (isChartsDisplayed) {
                            expect(isChartsDisplayed).toBe(true);
                        });
                        commUtil.getTextUsingWebElement(headingOfTestCreationChart).then(function (testCreationHeader) {
                            expect(testCreationHeader).toBe("Test Creation: 30 Day Summary");
                        });
                        commUtil.isElementDisplayed(createTestChart).then(function (isCreateTestChartDisplayed) {
                            expect(isCreateTestChartDisplayed).toBe(true);
                        });
                        commUtil.getTextUsingWebElement(headingOfTestExecutionChart).then(function (testExecutionHeader) {
                            expect(testExecutionHeader).toBe("Test Execution: 30 Day Summary");
                        });
                        commUtil.isElementDisplayed(executionTestChart).then(function(isExecutionTestChartDisplayed){
                            expect(isExecutionTestChartDisplayed).toBe(true);
                        });
                        validateTestsCount();
                        commUtil.getTextUsingWebElement(testsCreated).then(function (totalTestValues) {
                            totalTestsCreated = parseInt(totalTestValues);
                            if(totalTestsCreated > 0){
                                totalTestLink.click().then(function(){
                                    SearchTestPage.validateTests(totalTestsCreated,"Total Tests");
                                    driver.sleep(30000);

                                    //Deep Link for Versions.
                                    commUtil.waitForElementByXpath("//div[h3[contains(text(),'Tests By Version')]]/following-sibling::div//a");
                                        driver.findElements(by.xpath("//div[h3[contains(text(),'Tests By Version')]]/following-sibling::div//a")).then(function (versions) {
                                            logger.info("Total number of Versions are : "+versions.length);
                                            for(var i=0; i<versions.length; i++){
                                                (function(x){
                                                   driver.sleep(10000);
                                                    driver.sleep(10000);
                                                    commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//div[h3[contains(text(),'Tests By Version')]]/following-sibling::div/div["+(x+1)+"]/a")).then(function (versionValue){
                                                        commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//div[h3[contains(text(),'Tests By Version')]]/following-sibling::div/div["+(x+1)+"]//span")).then(function (count) {
                                                            var testsCount = parseInt(count);
                                                                if (testsCount > 0) {
                                                                    commUtil.changeToWebElement("//a[contains(text(),'" + versionValue + "')]").click().then(function () {
                                                                        SearchTestPage.validateTests(testsCount, versionValue);
                                                                    });
                                                                }
                                                                else{
                                                                    logger.info("Total Test under " + versionValue + " is : 0");
                                                                }
                                                            });
                                                        });
                                                })(i);
                                            }
                                        });
                                });

                                //Deep Link for Components.
                                commUtil.waitForElementByXpath("//div[h3[contains(text(),'Tests By Component')]]");
                                driver.findElements(by.xpath("//div[h3[contains(text(),'Tests By Component')]]/following-sibling::div//a")).then(function (components) {
                                    logger.info("Total number of Components are : "+components.length);
                                    for(var i=0; i<components.length; i++){
                                        (function(x){
                                            driver.sleep(10000);
                                            driver.sleep(1000);
                                            commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//div[h3[contains(text(),'Tests By Component')]]/following-sibling::div/div["+(x+1)+"]/a")).then(function (componentValue){
                                                commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//div[h3[contains(text(),'Tests By Component')]]/following-sibling::div/div["+(x+1)+"]//span")).then(function (count) {
                                                    var testsCount = parseInt(count);
                                                    if (testsCount > 0) {
                                                        commUtil.changeToWebElement("//a[contains(text(),'" + componentValue + "')]").click().then(function () {
                                                            SearchTestPage.validateTests(testsCount, componentValue);
                                                        });
                                                    }
                                                    else{
                                                        logger.info("Total Test under " + componentValue + " is : 0");
                                                    }
                                                });
                                            });
                                        })(i);
                                    }
                                });

                                //Deep link for Label.
                                commUtil.waitForElementByXpath("//div[h3[contains(text(),'Tests By Label')]]");
                                driver.findElements(by.xpath("//div[h3[contains(text(),'Tests By Label')]]/following-sibling::div//a")).then(function (labels) {
                                    logger.info("Total number of Labels are : "+labels.length);
                                    for(var i=0; i<labels.length; i++){
                                        (function(x){
                                            driver.sleep(10000);
                                            driver.sleep(10000);
                                            commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//div[h3[contains(text(),'Tests By Label')]]/following-sibling::div/div["+(x+1)+"]/a")).then(function (labelValue){
                                                commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//div[h3[contains(text(),'Tests By Label')]]/following-sibling::div/div["+(x+1)+"]//span")).then(function (count) {
                                                    var testsCount = parseInt(count);
                                                    if (testsCount > 0) {
                                                        commUtil.changeToWebElement("//a[contains(text(),'" + labelValue + "')]").click().then(function () {
                                                            SearchTestPage.validateTests(testsCount, labelValue);
                                                        });
                                                    }
                                                    else{
                                                        logger.info("Total Test under " + labelValue + " is : 0");
                                                    }
                                                });
                                            });
                                        })(i);
                                    }
                                });
                            }
                            else{
                                logger.info("Total Tests created is 0");
                            }
                        });
                    });
                });
            driver.switchTo().defaultContent();
            return true;
        },60000,"validating Test Summary Drilldown failed.");
    };

    this.validateTestSummaryChart = function (callback) {
        try{
            validateTestSummaryPage(function(validateStatus){
                assert.ok(validateStatus, "Test Summary Validation Failed.");
                logger.info("Test Summary Validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIframe, function(switchToFrameStatus){
                    assert.ok(switchToFrameStatus, "Not Switched To Frame.");
                    logger.info("Switched To Frame Successfully in Test Summary Page.");

                    validateCreateTestChart(function(validateCreateTestChartStatus){
                        assert.ok(validateCreateTestChartStatus, "Validate CreateTestChart Failed.");

                        validateExecuteTestChart(function(validateExecuteTestChartStatus) {
                            assert.ok(validateExecuteTestChartStatus, "Validate ExecuteTestChart Failed.");
                            callback(validateExecuteTestChartStatus);
                        });
                    });

                    driver.switchTo().defaultContent();
                });
            });
        }catch(e){
            throw e;
        }
        /*commUtil.waitForElementByXpath("/*//*[@id='project-tab']/descendant::h2");
        driver.wait(function () {
            commUtil.isElementDisplayed(commUtil.changeToWebElement("/*//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__summary-tab_provider']")).then(function(isDisplayed){
                expect(isDisplayed).toBe(true);
                driver.switchTo().frame(commUtil.changeToWebElement("/*//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__summary-tab_provider']")).then(function () {
                    validateTestsCount();
                    commUtil.isElementDisplayed(xpathOfSummaryCharts).then(function (isChartsDisplayed) {
                        expect(isChartsDisplayed).toBe(true);
                    });
                    commUtil.getTextUsingWebElement(headingOfTestCreationChart).then(function (testCreationHeader) {
                        expect(testCreationHeader).toBe("Test Creation: 30 Day Summary");
                    });
                    commUtil.isElementDisplayed(createTestChart).then(function (isCreateTestChartDisplayed) {
                        expect(isCreateTestChartDisplayed).toBe(true);
                        validateCreateTestChart();
                    });
                    commUtil.getTextUsingWebElement(headingOfTestExecutionChart).then(function (testExecutionHeader) {
                        expect(testExecutionHeader).toBe("Test Execution: 30 Day Summary");
                    });
                    commUtil.isElementDisplayed(executionTestChart).then(function(isExecutionTestChartDisplayed){
                        expect(isExecutionTestChartDisplayed).toBe(true);
                        validateExecuteTestChart();
                    });
                });

            });
            driver.switchTo().defaultContent();
            return true;
        },60000,"validating Test Summary Charts failed.");*/
    };


    var validateTestsCount = function(){
        commUtil.getTextByXpath("//div[a[@title='Total Tests']]/span", function(totalTests){
            logger.info("Total Tests Created : "+totalTests);
            commUtil.clickOnElementByXpath("//a[@title='Total Tests']", function(clickOnElementStatus){
                assert.ok(clickOnElementStatus, "Not Clicked On Total Tests.");
                SearchTestPage.totalTests(function(totalTestsInSearchTestPage){
                    logger.info("Total Tests in search Test page : " + totalTestsInSearchTestPage);
                    assert.equal(totalTests, totalTestsInSearchTestPage, "Total Tests Not validated.");

                    commUtil.getTextByXpath("//div[a[@title='Total Tests']]/following-sibling::div[1]/span", function(totalExecuted){
                        logger.info("Total Executed Tests : "+totalExecuted);
                        commUtil.getTextByXpath("//div[a[@title='Total Tests']]/following-sibling::div[2]/span", function(totalRemaining){
                            logger.info("Total Remaining Tests : "+totalRemaining);

                        });
                    });
                });
            });

        });
        commUtil.getTextUsingWebElement(testsCreated).then(function(testsCreatedValue){
            totalTestsCerated = parseInt(testsCreatedValue);
            commUtil.getTextUsingWebElement(testsExecuted).then(function(testsExecutedValue){
                logger.info("Total Tests executed: "+testsExecutedValue);
                totalTestExecuted = parseInt(testsExecutedValue);
                commUtil.getTextUsingWebElement(testsRemaining).then(function(testsRemainingValue){
                    logger.info("Total Tests remaining:"+testsRemainingValue);
                    totalTestRemaining = parseInt(testsRemainingValue);
                    totalTests = totalTestRemaining+totalTestExecuted;
                    expect(totalTestsCerated).toBe(totalTests);
                });
            });
        });
    };



    var validateCreateTestChart = function(isValidateCreateTestChart){
        try{
            commUtil.waitForElement("//*[@id='chart-details-id']", browser.params.testdata.implicitWaitTimeMedium, function(waitForTestCreationChart) {
                assert.ok(waitForTestCreationChart, "Not Found Test Creation Chart.");
                commUtil.getTextByXpath("//*[@id='chart-details-id']", function(text){
                    logger.info(":::>>> "+text);
                    var arr = text.split("Tests created: ");
                    logger.info(arr[0]+" :: "+arr[1]);
                    var arr1 = arr[1].split(" ");
                    logger.info(arr1[0]+" :: "+arr1[1]);
                    commUtil.getTextByXpath("//*[text()='Total Tests']/preceding-sibling::span", function(totalTests){
                        assert.equal(totalTests, arr1[0], "Test Creation Chart Validation failed.");
                        logger.info("Test Creation chart Validated Successfully.");
                        isValidateCreateTestChart(true);
                    });
                });
            });

        }catch(e){
            console.error(e);
            isValidateCreateTestChart(false);
        }
       /* commUtil.getTextUsingWebElement(getTestsCreatedFormChart).then(function(createTestsFromChart){
            commUtil.getTextUsingWebElement(testsCreated).then(function(createTests){
                expect(parseInt(createTestsFromChart)).toBeGreaterThan(0);
                expect(createTestsFromChart).toBe(createTests);
            });
            driver.findElements(by.xpath("/*//*[@id='testcases-creation-chart-id']/*//*[@class='x axis']/*//*[@class='tick']/*//*[@y='9']")).then(function(creationDates){
                creationDates[creationDates.length-1].getText().then(function(latestCreationDate){
                    logger.info("Test Creation Graph is dated till: "+latestCreationDate+" ");
                });
            });
            driver.findElements(by.xpath("/*//*[@id='testcases-creation-chart-id']/*//*[@class='y axis']/*//*[@class='tick']/*//*[@x='-3']")).then(function(testCreationRange){
                expect(testCreationRange.length).toBeGreaterThan(1);
                testCreationRange[testCreationRange.length-1].getText().then(function(maxTestCreated){
                    logger.info("Maximum Tests created in a day: "+ maxTestCreated);
                });
            });
        });*/
    };

    /*var validateExecuteTestChart = function(){
        commUtil.getTextUsingWebElement(getTestsExecutedFromChart).then(function(executeTestsFromChart){
            commUtil.getTextUsingWebElement(testsExecuted).then(function (executeTests) {
                expect(parseInt(executeTestsFromChart)).toBeGreaterThan(0);
                expect(executeTestsFromChart).toBe(executeTests);
            });
            driver.findElements(by.xpath("/*//*[@id='execution-creation-chart-id']/*//*[@class='x axis']/*//*[@class='tick']/*//*[@y='9']")).then(function(executionDates){
                executionDates[executionDates.length-1].getText().then(function(latestExecutionDate){
                    logger.info("Test Execution Graph is dated till: "+latestExecutionDate);
                });
                driver.findElements(by.xpath("/*//*[@id='execution-creation-chart-id']/*//*[@class='y axis']/*//*[@class='tick']/*//*[@x='-3']")).then(function(testExecutionRange){
                    expect(testExecutionRange.length).toBeGreaterThan(1);
                    testExecutionRange[testExecutionRange.length-1].getText().then(function(maxTestExecuted){
                        logger.info("Maximum Test Executed in a day: "+maxTestExecuted);
                    });
                });
            });
        });
    };*/
    var validateExecuteTestChart = function(isValidateExecutionChart){
        try{
            commUtil.waitForElement("//*[@id='execution-details-id']", browser.params.testdata.implicitWaitTimeMedium, function(waitForTestCreationChart) {
                assert.ok(waitForTestCreationChart, "Not Found Test Exec Chart.");
                commUtil.getTextByXpath("//*[@id='execution-details-id']", function(text){
                    logger.info(text);
                    var arr = text.split("Tests executed: ");
                    //logger.info(arr[0]+" :: "+arr[1]);
                    var arr1 = arr[1].split(" ");
                    commUtil.getTextByXpath("//*[*[text()='Total Tests']]/following-sibling::div[1]/span", function(totalTests){
                        logger.info("+++"+totalTests+"+++"+arr1[0]+"+++");
                        assert.ok(parseInt(totalTests) <= parseInt(arr1[0]), "Test Execution Chart Validation failed.");

                        logger.info("Test Execution chart Validated Successfully.");
                        isValidateExecutionChart(true);
                    });
                });
            });
        }catch(e){
            console.error(e);
            isValidateExecutionChart(false);
        }
       /* commUtil.getTextUsingWebElement(getTestsExecutedFromChart).then(function(executeTestsFromChart){
            commUtil.getTextUsingWebElement(testsExecuted).then(function (executeTests) {
                expect(parseInt(executeTestsFromChart)).toBeGreaterThan(0);
                expect(executeTestsFromChart).toBe(executeTests);
            });
            driver.findElements(by.xpath("/*//*[@id='execution-creation-chart-id']/*//*[@class='x axis']/*//*[@class='tick']/*//*[@y='9']")).then(function(executionDates){
                executionDates[executionDates.length-1].getText().then(function(latestExecutionDate){
                    logger.info("Test Execution Graph is dated till: "+latestExecutionDate);
                });
                driver.findElements(by.xpath("/*//*[@id='execution-creation-chart-id']/*//*[@class='y axis']/*//*[@class='tick']/*//*[@x='-3']")).then(function(testExecutionRange){
                    expect(testExecutionRange.length).toBeGreaterThan(1);
                    testExecutionRange[testExecutionRange.length-1].getText().then(function(maxTestExecuted){
                        logger.info("Maximum Test Executed in a day: "+maxTestExecuted);
                    });
                });
            });
        });*/
    };
    var getTotalExecutedTestCount = function(isGetTotalExecutedCount){
        try{
            commUtil.waitForElement("//*[@id='execution-details-id']", browser.params.testdata.implicitWaitTimeMedium, function(waitForTestCreationChart) {
                assert.ok(waitForTestCreationChart, "Not Found Test Exec Chart.");
                commUtil.getTextByXpath("//*[@id='execution-details-id']", function(text){
                    logger.info(text);
                    var arr = text.split("Tests executed: ");
                    //logger.info(arr[0]+" :: "+arr[1]);
                    var arr1 = arr[1].split(" ");
                    commUtil.getTextByXpath("//*[*[text()='Total Tests']]/following-sibling::div[1]/span", function(totalTests){
                        logger.info("+++"+totalTests+"+++"+arr1[0]+"+++");
                        var totalExecutedTest = parseInt(arr1[0]);
                        assert.ok(parseInt(totalTests) <= totalExecutedTest, "Test Execution Chart Validation failed.");

                        logger.info("Test Execution chart Validated Successfully.");
                        isGetTotalExecutedCount(totalExecutedTest);
                    });
                });
            });
        }catch(e){
            console.error(e);
            isGetTotalExecutedCount(0);
        }
    };
    this.getTotalTestExecuted = function (callback) {
        try{
            validateTestSummaryPage(function(validateStatus){
                assert.ok(validateStatus, "Test Summary Validation Failed.");
                logger.info("Test Summary Validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIframe, function(switchToFrameStatus){
                    assert.ok(switchToFrameStatus, "Not Switched To Frame.");
                    logger.info("Switched To Frame Successfully in Test Summary Page.");

                    getTotalExecutedTestCount(function(testExecutedCount){
                        logger.info("Total Test executed : "+ testExecutedCount);
                        driver.switchTo().defaultContent();
                        driver.switchTo().defaultContent();
                        callback(testExecutedCount);
                    });
                    driver.switchTo().defaultContent();
                });
            });
        }catch(e){
            throw e;
        }
    };
    var validateTestSummaryPage = function(isValidateTestSummaryPage){
        try{

            /*if(browser.params.testdata.environment === "prod"){
                xpathForIframe = "/*//*[@id='easyXDM_embedded-com.thed.zephyr.je__summary-tab_provider']";
            }*/
            driver.switchTo().defaultContent();
            driver.wait(function(){
                return driver.executeScript("return document.readyState").then(function(state){
                    return state === "complete";
                });
            }, browser.params.testdata.PageLoadTimeOut).then(function(){
                if(browser.params.testdata.projectCentricView === "enabled"){
                    commUtil.waitForElement(xpathForIframe, browser.params.testdata.implicitWaitTimeMedium, function(waitForElementStatus){
                        assert.ok(waitForElementStatus, "Not Loading Test Summary Header");
                        //commUtil.getTextByXpath(xpathForTestSummaryPCVHeader, function(getText){
                            //logger.info('Test Summary Header : : ' + getText);
                            //assert.equal(getText, 'Test Summary', "Test Summary Page title validation failed.");

                            //commUtil.waitForPageLoad(xpathForIframe,  function(waitForFrameStatus){
                                //assert.ok(waitForFrameStatus, "NoT Able To Load Iframe in Test Summary Page.");
                                isValidateTestSummaryPage(waitForElementStatus);
                            //});
                        //});
                    });
                }else if(browser.params.testdata.projectCentricView === "disabled"){
                    commUtil.waitForElement(xpathForTestSummaryHeader, browser.params.testdata.implicitWaitTimeMedium, function(waitForElementStatus){
                        assert.ok(waitForElementStatus, "Not Loading Test Summary Header");
                        commUtil.getTextByXpath(xpathForTestSummaryHeader, function(getText){
                            logger.info('Test Summary Header : : ' + getText);
                            assert.equal(getText, 'Test Summary', "Test Summary Page title validation failed.");

                            commUtil.waitForPageLoad(xpathForIframe,  function(waitForFrameStatus){
                                assert.ok(waitForFrameStatus, "NoT Able To Load Iframe in Test Summary Page.");
                                isValidateTestSummaryPage(waitForFrameStatus);
                            });
                        });
                    });
                }

            });
        }catch(e){
            isValidateTestSummaryPage(false);
        }
    };
    this.doValidateTestSummaryPage = function(isValidateTestSummaryPage){
        try{
            validateTestSummaryPage(function(validateStatus) {
                assert.ok(validateStatus, "Test Summary Validation Failed.");
                logger.info("Test Summary Validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIframe, function (switchToFrameStatus) {
                    assert.ok(switchToFrameStatus, "Not Switched To Frame.");
                    logger.info("Switched To Frame Successfully in Test Summary Page.");

                    commUtil.waitForElement("//*[@id='testcases-creation-chart-id']", browser.params.testdata.implicitWaitTimeMedium, function(waitForTestCreationChart){
                        assert.ok(waitForTestCreationChart, "Not Found Test Creation Chart.");
                        logger.info("Test Creation Chart Found Successfully.");

                        commUtil.waitForElement("//*[@id='execution-creation-chart-id']", browser.params.testdata.implicitWaitTimeMedium, function(waitForTestExecutionChart){
                            assert.ok(waitForTestExecutionChart, "Not Found Test Execution Chart.");
                            logger.info("Test Execution Chart Found Successfully.");
                            driver.switchTo().defaultContent();
                            isValidateTestSummaryPage(waitForTestExecutionChart);
                        });
                    });
                    driver.switchTo().defaultContent();
                });
            });
        }catch(e){
            isValidateTestSummaryPage(false);
        }
    };
};
module.exports = new TestSummaryPage();