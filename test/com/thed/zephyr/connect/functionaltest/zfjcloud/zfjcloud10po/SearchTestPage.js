var commUtil = require('../../utils/commUtil.js');
var ViewTestPage = require('./ViewTestPage.js');

var SearchTestPage = function() {
  
  /******************************************************
   *  SEARCH TEST PAGE
   *****************************************************/

  /******************************************************
   *  WEBELEMENTS
   *****************************************************/
   var xpathOfFirstTestId = element(by.xpath("//table[@id='issuetable']/tbody//tr[1]/td[2]//a"));
   var xpathOfFirstTestAssignee = element(by.xpath("//table[@id='issuetable']/tbody//tr[1]/td[4]//a"));
   var xpathOfFirstTestReporter = element(by.xpath("//table[@id='issuetable']/tbody//tr[1]/td[5]//a"));
   var xpathOfFirstTestPriority = element(by.xpath("//table[@id='issuetable']/tbody//tr[1]/td[6]/img"));
   var xpathOfFirstTestCreatedDate = element(by.xpath("//table[@id='issuetable']/tbody//tr[1]/td[9]/span"));
   var xpathOfFirstTestUpdatedDate = element(by.xpath("//table[@id='issuetable']/tbody//tr[1]/td[10]/span"));
   var quickSearchInput = element(by.id("quickSearchInput"));
   var advanceSearchTab = element(by.id("advanced-search"));
  var exportButton = element(by.xpath("//*[@class='aui-dd-parent'][1]/a/span"));
  var exportAllExcel = element(by.id("allExcelFields"));

    var xpathForAllIssueCount = "//*[@id='content']/descendant::span[@class='results-count-total results-count-link'][1]";
    var xpathForFirstTest = "//table[@id='issuetable']/tbody/tr[1]/td[@class='issuekey']/a";
    var xpathForDeleteTestLink = "//a[text()='Delete']";
    var xpathForRefreshIssueList = "(//*[text()='Refresh results'])[1]";

    var xpathForDeletePopupHeader = "//*[@id='delete-issue-dialog']/descendant::h2";
    var xpathForDeleteBtnInDeletePopup = "//*[@id='delete-issue-submit']";


  
   
  /******************************************************
     *  PAGE OBJECT METHODS
     *****************************************************/

     this.deleteTest = function(isDeleteTest){
        try{
            validateSearchTestPage(function(validateTitleStatus){
                assert.ok(validateTitleStatus, "Not Validated Search Test page.");
                logger.info("Search Test Page Status Validated Successfully.");

                changeView("list view", function(changeViewStatus){
                    assert.ok(changeViewStatus, "View Not Changed in Search Test Page.");
                    logger.info("View is changed successfully.");

                    commUtil.getTextByXpath(xpathForAllIssueCount, function(totalTestBefore){
                        logger.info("Total Tests Before : " + totalTestBefore);

                        commUtil.getTextByXpath(xpathForFirstTest, function(firstTest){
                            logger.info("First Test Id : " + firstTest);

                            commUtil.hoverElementByXpath(xpathForFirstTest, function(hoverTestStatus){
                                assert.ok(hoverTestStatus, "Not Hover on Test To Delete.");

                                var hoverManageLink = "//td[a[text()='"+firstTest+"']]/following-sibling::td//a[contains(@id,'actions')]";
                                commUtil.clickOnElementByXpath(hoverManageLink, function(clickOnManageLinkStatus){
                                    assert.ok(clickOnManageLinkStatus, "Not Clicked On Manage Link of the Test.");

                                    commUtil.clickOnElementByXpath(xpathForDeleteTestLink, function(clickOnDeleteLinkStatus){
                                        assert.ok(clickOnDeleteLinkStatus, "Not Clicked On Delete Link.");
                                        logger.info("Clicked On Delete Link Successfully.");

                                        commUtil.waitForElement(xpathForDeletePopupHeader, browser.params.testdata.implicitWaitTimeMedium, function(waitForDeletePopup){
                                            assert.ok(waitForDeletePopup, "Delete Popup is Not Visible.");

                                            commUtil.getTextByXpath(xpathForDeletePopupHeader, function(getAttributeValue){
                                                logger.info("Delete Issue Header : " + getAttributeValue);
                                                assert.ok(getAttributeValue.indexOf("Delete Issue") != -1, "Delete Test Header Validated Successfully.");
                                                assert.ok(getAttributeValue.indexOf(firstTest) != -1, firstTest + " is not Validated In Delete Test Popup.");
                                                logger.info("Delete Test Popup Validated Successfully.");

                                                commUtil.clickOnElementByXpath(xpathForDeleteBtnInDeletePopup, function(clickOnDeleteLinkConfStatus){
                                                    assert.ok(clickOnDeleteLinkConfStatus, "Not Clicked On Delete Button on Delete popup.");
                                                    logger.info("Clicked On Delete Link On Confirmation popup Successfully.");
                                                    driver.sleep(1000);
                                                    browser.refresh();
                                                    commUtil.implicitWait(browser.params.testdata.PageLoadTimeOut);
                                                    commUtil.clickOnElementByXpath(xpathForRefreshIssueList, function(refreshTableStatus){
                                                        assert.ok(refreshTableStatus, "Issue Table is not Refreshed.");
                                                        logger.info("Issue Table Refreshed Successfully.");

                                                        driver.sleep(1000);
                                                        commUtil.getTextByXpath(xpathForAllIssueCount, function(totalTestAfter){
                                                            logger.info("Total Test Before Delete : "+totalTestBefore);
                                                            logger.info("Total Test After Delete : "+totalTestAfter);
                                                            assert.equal((parseInt(totalTestBefore) - 1), parseInt(totalTestAfter));
                                                            logger.info("Test Deleted Successfully.");
                                                            isDeleteTest(true);
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
                });
            });
        }catch(err){
            console.error(err);
        }
    };
    this.getFirstTest = function(isGetFirstTest){
        try {
            validateSearchTestPage(function (validateTitleStatus) {
                assert.ok(validateTitleStatus, "Not Validated Search Test page.");
                logger.info("Search Test Page Status Validated Successfully.");

                changeView("list view", function (changeViewStatus) {
                    assert.ok(changeViewStatus, "View Not Changed in Search Test Page.");
                    logger.info("View is changed successfully.");
                    driver.sleep(500);

                    commUtil.getTextByXpath("//table[@id='issuetable']/tbody/tr[1]/td[@class='issuekey']/a", function(testID){
                        logger.info("hhhhhhh"+testID);
                        isGetFirstTest(testID);
                    });
                });
            });
        }catch(e){
        }
    };
    this.saveAsFilter = function(filterName, callback){
        try{
            validateSearchTestPage(function(validateTitleStatus){
                assert.ok(validateTitleStatus, "Not validated search test page.");
                logger.info("Search Test Page Status Validated Successfully.");

                changeView("list view", function(changeViewStatus){
                    assert.ok(changeViewStatus, "Not changed view.");
                    logger.info("View is changed successfully.");

                    commUtil.getTextByXpath("//*[@id='content']/descendant::span[@class='results-count-total results-count-link'][1]", function(totalTest){
                        logger.info("Total Tests : " + totalTest);
                        commUtil.clickOnElementByXpath("//*[@id='search-header-view']/descendant::*[text()='Save as']", function(clickOnSaveAsLink){
                            assert.ok(clickOnSaveAsLink, "Not clicked on Save as Link.");
                            commUtil.waitForElement(".//*[@id='save-filter-dialog']", 15000, function(waitForSaveAsDialogStatus){
                                assert.ok(waitForSaveAsDialogStatus, "Not Showing save filter.");
                                commUtil.sendTextToElement(".//*[@id='save-filter-dialog']/descendant::*[@id='filterName']", filterName, function(sendTextStatus){
                                    assert.ok(sendTextStatus, "Not send text successfully.");
                                    commUtil.clickOnElementByXpath(".//*[@id='save-filter-dialog']/descendant::*[@class='aui-button submit']", function(clickOnSubmitStatus){
                                        assert.ok(clickOnSubmitStatus, "Not clicked on Submit button.");
                                        driver.sleep(1000);
                                        //commUtil.waitForElementInvisible(".//*[@id='save-filter-dialog']/descendant::*[@class='aui-button submit']", function(waitForInvisibleLinkStatus){
                                            //expect(waitForInvisibleLinkStatus).toBe.true;
                                            logger.info("Filter Saved Successfully.");
                                            commUtil.waitForElement("//*[*[text()='Favorite Filters']]//*[@class='filter-link']", 15000, function(waitElementStatus){
                                                assert.ok(waitElementStatus, "Not waited for Filters.");
                                                commUtil.findTextFromBulkText("//*[*[text()='Favorite Filters']]/descendant::a[@class='filter-link']", filterName, function(searchFilterStatus){
                                                    assert.ok(searchFilterStatus);
                                                    callback(totalTest);
                                                });
                                            });

                                        //});
                                    });
                                });
                            });
                        });
                    });

                });
            });

        }catch(err){
            console.error(err);
        }
    };
    this.exportTests = function(isDeleteTest){
        try{
            validateSearchTestPage(function(validateTitleStatus){
                assert.ok(validateTitleStatus, "Not Validated Search Test page.");
                logger.info("Search Test Page Status Validated Successfully.");

                changeView("list view", function(changeViewStatus){
                    assert.ok(changeViewStatus, "View Not Changed in Search Test Page.");
                    logger.info("View is changed successfully.");

                    commUtil.getTextByXpath(xpathForAllIssueCount, function(totalTestBefore){
                        logger.info("Total Tests Before : " + totalTestBefore);

                        commUtil.clickOnElementByXpath("//*[text()='Export']", function(clickOnDeleteLinkStatus){
                            assert.ok(clickOnDeleteLinkStatus, "Not Clicked On Delete Link.");
                            logger.info("Clicked On Export Link Successfully.");

                            commUtil.clickOnElementByXpath("//*[@id='allExcelFields']", function(clickOnDeleteLinkStatus){
                                assert.ok(clickOnDeleteLinkStatus, "Not Clicked On Delete Link.");
                                logger.info("Clicked On Export Link Successfully.");
                                var fileSize = commUtil.fileSize("D:\\export\\Your Company JIRA.xls");
                                logger.info("File Size : "+fileSize);
                                assert.ok(fileSize > 0, "File Size is Zero.");
                                logger.info("File Downloaded Successfully.");

                                XLSX = require('xlsx');
                                var workbook = XLSX.readFile('D:\\export\\Your Company JIRA.xls');
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
                                isDeleteTest(true);
                            });
                        });
                    });
                });
            });
        }catch(err){
            console.error(err);
        }
    };
    /*this.navigateToFirstTest = function(callback){
        try{
            validateSearchTestPage(function(validateTitleStatus){
                expect(validateTitleStatus).toBe.true;
                logger.info("Search Test Page Status Validated Successfully.");

                changeView("list view", function(changeViewStatus){
                    expect(changeViewStatus).toBe.true;
                    logger.info("View is changed successfully.");

                    commUtil.getTextByXpath("/*//*[@id='content']/descendant::span[@class='results-count-total results-count-link'][1]", function(totalTestBefore){
                        commUtil.getTextByXpath("//table[@id='issuetable']/tbody/tr[1]/td[@class='issuekey']/a", function(firstTest){
                            commUtil.hoverElementUsingXpath("//table[@id='issuetable']/tbody/tr[1]/td[@class='issuekey']/a", function(hovorTeststatus){
                                expect(hovorTeststatus).toBe.true;
                                var xpathForTest = "/*//*[@id='issuetable']/descendant::td/a[text()='"+firstTest+"']";
                                commUtil.clickOnElementByxpath(xpathForFirst, function(clickOnManageLinkStatus){
                                    expect(clickOnManageLinkStatus).toBe.true;
                                    logger.info("Clicked on First Link.");
                                    callback(clickOnManageLinkStatus);
                                });
                            });
                        });
                    });

                });
            });

        }catch(err){
            console.error(err);
        }
    };*/
    this.navigateToFirstTest = function(){
        changeView("list view",function(changeViewStatus){
            assert.ok(changeViewStatus);
        });
        commUtil.clickOnElement("//table[@id='issuetable']/tbody//tr[1]/td[2]/a");
    };

    this.validateTests = function(count,label){
        commUtil.waitForElementByXpath("(//span[@class='results-count-total results-count-link'])[1]");
            commUtil.getTextUsingWebElement(commUtil.changeToWebElement("(//span[@class='results-count-total results-count-link'])[1]")).then(function(totalTestCreated){
                totalTests = parseInt(totalTestCreated);
                expect(totalTests).toBe(count);
                driver.navigate().back().then(function(){
                    commUtil.waitForElementByXpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__summary-tab_provider']");
                    driver.switchTo().frame(commUtil.changeToWebElement("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__summary-tab_provider']")).then(function(){
                        if(label === 'Total Tests'){
                            logger.info("Total Tests Created : " +count);
                        }
                        else{
                            logger.info("Total Tests Created under "+label+" : " +count);
                        }
                    });
                });
            });

    };
    this.searchTestBySummary = function(createTestMap, isSearchedTest){
        try{
            validateSearchTestPage(function(validateTitleStatus) {
                assert.ok(validateTitleStatus, "Not Validated Search Test page.");
                logger.info("Search Test Page Status Validated Successfully.");

                changeView("list view", function (changeViewStatus) {
                    assert.ok(changeViewStatus, "View Not Changed in Search Test Page.");
                    logger.info("View is changed successfully.");

                    commUtil.getTextByXpath(xpathForAllIssueCount, function (totalTestBefore) {
                        logger.info("Total Tests Before Search : " + totalTestBefore);

                        commUtil.sendTextToElement("//*[@id='searcher-query']", createTestMap.SUMMARY , function(sendTestStatus) {
                            assert.ok(sendTestStatus, "Not Given Test To Quick search Input");
                            commUtil.sendTextToElement("//*[@id='quickSearchInput']", "\uE004", function (enterStatus) {
                                assert.ok(enterStatus, "Not searched Test.");
                                driver.sleep(3000);
                                browser.refresh();
                                commUtil.implicitWait(browser.params.testdata.PageLoadTimeOut);
                                commUtil.clickOnElementByXpath(xpathForRefreshIssueList, function(refreshTableStatus) {
                                    assert.ok(refreshTableStatus, "Issue Table is not Refreshed.");
                                    logger.info("Issue Table Refreshed Successfully.");

                                    driver.sleep(1000);
                                    commUtil.getTextByXpath(xpathForAllIssueCount, function (totalTestAfter) {
                                        logger.info("Total Test Before Delete : " + totalTestBefore);
                                        logger.info("Total Test After Delete : " + totalTestAfter);
                                        commUtil.searchTextFromElements("//table[@id='issuetable']/tbody/tr/td[@class='issuekey']/a",createTestMap.TESTNAME, function(searchStatus){
                                            assert.ok(searchStatus, "Not Searched the Test.");
                                            logger.info("Test Searched Successfully.");
                                            var xpathForTest = "//*[@id='issuetable']/descendant::td/a[text()='"+createTestMap.TESTNAME+"']";
                                            commUtil.clickOnElementByXpath(xpathForTest, function(clickOnTestLinkStatus){
                                                assert.ok(clickOnTestLinkStatus, "Not Clicked On Test.");
                                                logger.info("Clicked on On Test Link.");
                                                commUtil.implicitWait(200000);
                                                isSearchedTest(searchStatus);
                                            });
                                        } );
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }catch(e){
            logger.info("aser : "+e);
            isSearchedTest(false);
        }
    };

    /*this.searchAndValidateTestBySummary = function(){
        var testDetails = {};
        driver.wait(function(){
            changeView('list view',function(changeViewStatus){
                expect(changeViewStatus).toBe.true;
            });

            commUtil.waitForElementByXpath("//table[@id='issuetable']/tbody//tr[1]/td[3]//a");
            commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//table[@id='issuetable']/tbody//tr[1]/td[3]//a")).then(function(summaryValue){
                testDetails.summaryText = summaryValue;
            });
            commUtil.getTextUsingWebElement(xpathOfFirstTestId).then(function(testIdValue){
                testDetails.testIdText = testIdValue;
            });
            commUtil.getTextUsingWebElement(xpathOfFirstTestAssignee).then(function(assigneeValue){
                testDetails.assigneeText = assigneeValue;
            });
            commUtil.getTextUsingWebElement(xpathOfFirstTestReporter).then(function(reporterValue){
                testDetails.reporterText = reporterValue;
            });
            commUtil.getAttributeValueUsingWebElement(xpathOfFirstTestPriority,"alt").then(function(priorityValue){
                testDetails.priorityText = priorityValue;
            });
            commUtil.getAttributeValueUsingWebElement(xpathOfFirstTestCreatedDate,"title").then(function (createdDateValue) {
                testDetails.createdDateText = createdDateValue;
            });
            commUtil.getAttributeValueUsingWebElement(xpathOfFirstTestUpdatedDate,"title").then(function(updatedDateValue){
                testDetails.updatedDateText = updatedDateValue;
                quickSearchInput.clear();
                quickSearchInput.sendKeys(testDetails.summaryText);
                quickSearchInput.sendKeys("\uE007");
                driver.sleep(3000);
            });
            commUtil.clickOnElement("//table[@id='issuetable']/tbody//tr[1]/td[2]/a");
            ViewTestPage.validateQuickSearch(testDetails);        
            return true;
        },30000);
    };*/

    this.navigateToTest = function(testName, isNavigateToTest){
        try{
            validateSearchTestPage(function(validateTitleStatus){
                assert.ok(validateTitleStatus, "Not Validated Search Test Page.");
                logger.info("Search Test Page Status Validated Successfully.");

                changeView("list view", function(changeViewStatus){
                    assert.ok(changeViewStatus, "Not Changed View.");
                    logger.info("View is changed successfully.");
                    //commUtil.sleep(3000);
                    var xpathForTest = "//*[@id='issuetable']/descendant::td/a[text()='"+testName+"']";
                    logger.info(xpathForTest);
                    commUtil.clickOnElementByXpath(xpathForRefreshIssueList, function(refreshTableStatus) {
                        assert.ok(refreshTableStatus, "Issue Table is not Refreshed.");
                        logger.info("Issue Table Refreshed Successfully.");
                        driver.sleep(2000);
                        commUtil.clickOnElementByXpath(xpathForTest, function(clickOnTestLinkStatus){
                            assert.ok(clickOnTestLinkStatus, "Not Clicked On Test.");
                            logger.info("Clicked on On Test Link.");
                            isNavigateToTest(clickOnTestLinkStatus);
                        });
                    });
                });
            });
        }catch(err){
            console.error(err);
            isNavigateToTest(false);
        }
    };
    /*this.searchAndValidateTestById = function(){
        var testDetailsValues = {};
        driver.wait(function(){
            changeView('list view');
            commUtil.waitForElementByXpath("//table[@id='issuetable']/tbody//tr[1]/td[3]//a");
            commUtil.getTextUsingWebElement(commUtil.changeToWebElement("//table[@id='issuetable']/tbody//tr[1]/td[3]//a")).then(function(summaryValue){
                testDetailsValues.summaryText = summaryValue;
            });
            commUtil.getTextUsingWebElement(xpathOfFirstTestId).then(function(testIdValue){
                testDetailsValues.testIdText = testIdValue;
            });
            commUtil.getTextUsingWebElement(xpathOfFirstTestAssignee).then(function(assigneeValue){
                testDetailsValues.assigneeText = assigneeValue;
            });
            commUtil.getTextUsingWebElement(xpathOfFirstTestReporter).then(function(reporterValue){
                testDetailsValues.reporterText = reporterValue;
            });
            commUtil.getAttributeValueUsingWebElement(xpathOfFirstTestPriority,"alt").then(function(priorityValue){
                testDetailsValues.priorityText = priorityValue;
            });
            commUtil.getAttributeValueUsingWebElement(xpathOfFirstTestCreatedDate,"title").then(function (createdDateValue) {
                testDetailsValues.createdDateText = createdDateValue;
            });
            commUtil.getAttributeValueUsingWebElement(xpathOfFirstTestUpdatedDate,"title").then(function(updatedDateValue){
                testDetailsValues.updatedDateText = updatedDateValue;
                quickSearchInput.clear();
                quickSearchInput.sendKeys(testDetailsValues.testIdText);
                quickSearchInput.sendKeys("\uE007");
                driver.sleep(3000);
            });
            ViewTestPage.validateQuickSearch(testDetailsValues);
            return true;
        },30000);


    };*/



    this.exportTests1 = function(){
        driver.wait(function(){
            driver.sleep(1000);
            navigateToFirsttest();
            commUtil.navigatBack();
            driver.sleep(5000);
            exportButton.click().then(function(){
                commUtil.isElementDisplayed(exportAllExcel).then(function(displayed){
                    logger.info(displayed);
                    if(displayed === true){
                        exportAllExcel.click();
                        driver.sleep(20000);
                        commUtil.actionClass().sendKeys('\uE00C').perform();
                    }
                    else{
                        logger.info("Export All Fields option Doesn't exists");
                    }
                });

            });


           return true;
        },30000,"Exporting Test from SearchTest failed.");

    };

      

/******************************************************
 *  PAGE REUSABLE METHODS
 *****************************************************/
    validateSearchTestPage = function(isValidateSearchTestPage) {
        driver.switchTo().defaultContent();
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("Browse state : " + state);
                return state === "complete";
            });
        }, browser.params.testdata.PageLoadTimeOut).then(function(){
            /*commUtil.waitForTitle("Issue Navigator", function(waitForTitleStatus){
                assert.ok(waitForTitleStatus, "Not Validate Search Test Page Title.");
                isValidateSearchTestPage(waitForTitleStatus);
            });*/
            commUtil.waitForPageLoad("//*[@id='layout-switcher-button']", function(waitForTitleStatus){
                assert.ok(waitForTitleStatus, "Not Validate Search Test Page Title.");
                isValidateSearchTestPage(waitForTitleStatus);
            });
            //isValidateSearchTestPage(true);
        },function(e) {
            console.error("Browser is not Loaded.");
            isValidateSearchTestPage(false);
        });
    };
    this.doValidateSearchTestPage = function(isValidateSearchTestPage){
        validateSearchTestPage(function(validateTitleStatus) {
            assert.ok(validateTitleStatus, "Not Validated Search Test page.");
            logger.info("Search Test Page Status Validated Successfully.");

            changeView("list view", function (changeViewStatus) {
                assert.ok(changeViewStatus, "View Not Changed in Search Test Page.");
                logger.info("View is changed successfully.");

                isValidateSearchTestPage(changeViewStatus);
            });
        });
    };
    var changeView = function(changeView, isChangedView) {
        try{
            commUtil.clickOnElementByXpath( "//*[@id='layout-switcher-button']", function(clickOnChangeViewSwitchLinkStatus){
                assert.ok(clickOnChangeViewSwitchLinkStatus, "Not Clicked On Change View Link");
                logger.info("Clicked on Change View Switch link.");

                if(changeView === "list view"){
                    commUtil.clickOnElementByXpath( "//a[@data-layout-key='list-view']", function(clickOnListViewLinkStatus){
                        assert.ok(clickOnListViewLinkStatus, "Not Clicked On List View");
                        logger.info("Clicked successfully on List View Link.");
                        isChangedView(clickOnListViewLinkStatus);
                    });
                } else if (changeView === "split view") {
                    commUtil.clickOnElementByXpath( "//a[@data-layout-key='split-view']", function(clickOnDetailViewLinkStatus){
                        assert.ok(clickOnDetailViewLinkStatus, "Not Clicked On Split View.");
                        logger.info("Clicked successfully on Detail View Link.");
                        isChangedView(clickOnDetailViewLinkStatus);
                    });
                }

            });
        }catch(e){
            isChangedView(false);
        }
    };
    /*this.validateSearchTestpage = function() {
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("ready state status : " + state);
                return state === "complete";
            }).then(function(){
                commUtil.validateTitle('Issue Navigator');
                return true;
            });
        }, 100000, "Validating Search Test Page Failed.");
    };

    navigateToFirsttest = function(){
        changeView("list view",function(changeViewStatus){
            expect(changeViewStatus).toBe.true;
        });
        commUtil.clickOnElement("//table[@id='issuetable']/tbody//tr[1]/td[2]/a");
    };*/
    this.totalTests = function(totalTestCount){
       try{
        validateSearchTestPage(function(validateTitleStatus){
            assert.ok(validateTitleStatus, "Not Validated Search Test Page.");
            logger.info("Search Test Page Status Validated Successfully.");

            changeView("list view", function(changeViewStatus){
                assert.ok(changeViewStatus, "Not Changed the View.");
                logger.info("View is changed successfully.");

                commUtil.getTextByXpath(xpathForAllIssueCount, function(totalTests){
                    totalTestCount(totalTests);
                });

                /*commUtil.waitForElement("/[@id='content']//div[@class='empty-results']", browser.params.testdata.implicitWaitTimeLow, function(waitForEmptyResult){
                    if(waitForEmptyResult){
                        totalTestCount(0);
                    }else{
                        commUtil.getTextByXpath(xpathForAllIssueCount, function(totalTests){
                            totalTestCount(totalTests);
                        });
                    }
                });*/
            });
        });

        }catch(err){
               totalTestCount(0);
        }
    };
    this.getTest = function(isGetTest){
        validateSearchTestPage(function(validateTitleStatus){
            assert.ok(validateTitleStatus, "Not Validated Search Test Page.");
            logger.info("Search Test Page Status Validated Successfully.");

            changeView("list view", function(changeViewStatus){
                assert.ok(changeViewStatus, "Not Changed the View.");
                logger.info("View is changed successfully.");

                commUtil.getTextByXpath(xpathForAllIssueCount, function(totalTests){
                    if(parseInt(totalTests) > 0){
                        if(list.length === 0){
                            commUtil.getTextByXpath("//*[@id='issuetable']/tbody/tr[1]/td[2]", function(firstTest){
                                list.push(firstTest);
                                logger.info("Added To List : " + firstTest);
                                isGetTest(true);
                            });
                        }else{
                            element.all(By.xpath("//*[@id='issuetable']/tbody/tr/td[2]")).each(function(element){
                                element.getText().then(function(text) {
                                    logger.info("Text : "+text);
                                    for(var i in list)
                                    {
                                        logger.info(":::"+list[i]);
                                        if(list[i] !== text){
                                            list.push(text);
                                            logger.info("Added To List : " + text);
                                            isGetTest(true);
                                        }
                                    }
                                })
                            });
                        }
                    }
                });

            });
        });
    };
    this.getTests = function(tests, isGetTests){
        try{
            var issues = [];
            validateSearchTestPage(function(validateTitleStatus){
                assert.ok(validateTitleStatus, "Not Validated Search Test Page.");
                logger.info("Search Test Page Status Validated Successfully.");

                changeView("list view", function(changeViewStatus){
                    assert.ok(changeViewStatus, "Not Changed the View.");
                    logger.info("View is changed successfully.");

                    commUtil.getTextByXpath(xpathForAllIssueCount, function(totalTests){
                        if(parseInt(tests) < parseInt(totalTests)){
                            for(var i=1; i <= parseInt(tests); i++){
                                (function(x){
                                    commUtil.getTextByXpath("//*[@id='issuetable']/tbody/tr["+x+"]/td[@class='issuekey']", function(getIssueKey){
                                        assert.ok(getIssueKey != null, "Issue Key is null.");
                                        issues.push(getIssueKey);
                                        logger.info("Issues added : "+getIssueKey);
                                        logger.info(parseInt(tests)+":"+x);
                                        if(x === parseInt(tests)){
                                            isGetTests(issues);
                                        }
                                    });
                                })(i);
                            }
                        }else{
                            var createTestMap = {
                                ISSUETYPE: "Test",
                                SUMMARY : "Test one."
                            };
                            ViewTestPage.createTestDirectly(createTestMap, function(isCreateTest){
                                assert.ok(isCreateTest, "Not Created test.");
                                //isCreated(isCreateTest);
                            });
                        }
                    });

                });
            });
        }catch(err){

        }
    };
};
module.exports = new SearchTestPage();
