var commUtil = require('../../utils/commUtil.js');


var SearchTestExecutionPage = function() {

    var loginUser = "";
  
    var xpathForIFrame = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__general-executions-enav_provider']";
    var xpathForDockFilter = "//*[@id='contentRelatedId']//div[@class='filter-actions']/a[contains(@class,'ui-dock')]";
    var xpathForDockFilters = "//*[@id='zfj-sidebar-menu-column']/*[@id='zfj-sidebar-menu']";
    var xpathForExecutedBy = "//*[@id='execution-table']/tbody/tr//td[contains(@id,'executed-by-schedule')]";
    var xpathForCurrentStatus = "//*[@id='execution-table']/tbody/tr//td[9]//dd[contains(@id,'current-execution-status-dd-schedule')]";
    this.DockFilterPanel = function(isDockFilter){
        try{
            validateSearchTestExecutionsPage(function(isValidateSearchTestExecPage){
                assert.ok(isValidateSearchTestExecPage, "Not validated Search test Execution page.");
                logger.info("Search Test Execution page Validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIFrame, function(isSwitched){
                    assert.ok(isSwitched, "NoT Able To Switch IFrame in Search test Executions Page.");

                    commUtil.getAttributeValue("//*[@id='zfj-sidebar-menu-column']", "style", function(getAttributeValue){
                        logger.info("Attribute Value : "+getAttributeValue);
                        //assert.ok(("display: none;".indexOf(getAttributeValue) != -1));
                        if(getAttributeValue.indexOf("display: none;") != -1){
                            logger.info("Filter Panel is already UnDocked.");
                            isDockFilter(true);
                        }else{
                            commUtil.hoverElementByXpath(xpathForDockFilters, function(hoverOnFiltersStatus) {
                                assert.ok(hoverOnFiltersStatus, "Not Hovered On Filters.");
                                logger.info("Hovered On Filters Successfully.");
                                commUtil.clickOnElementByXpath("//*[@id='navigator-sidebar']//*[@class='filter-actions']/a[contains(@class,'ui-dock')]", function(clickOnUnDockFilterStatus){
                                    assert.ok(clickOnUnDockFilterStatus, "Not clicked On UnDock Filter Link.");
                                    logger.info("Clicked On UnDock Filter Link Successfully.");
                                    driver.sleep(1000);
                                    commUtil.getAttributeValue("//*[@id='zfj-sidebar-menu-column']", "style", function(getAttributeValue){
                                        logger.info("Attribute Value : "+getAttributeValue);
                                        assert.ok((getAttributeValue.indexOf("display: none;") != -1));
                                        logger.info("Filter Panel UnDocked Successfully.");
                                        isDockFilter(true);
                                    });
                                });
                            });
                        }
                    });
                    driver.switchTo().defaultContent();
                });

               /* commUtil.hoverElementByXpath(xpathForDockFilters, function(hoverOnFiltersStatus){
                    assert.ok(hoverOnFiltersStatus, "Not Hovered On Filters.");
                    logger.info("Hovered On Filters Successfully.");
                    commUtil.clickOnElementByXpath("./*//*[@id='zfj-sidebar-menu-column']*//*[@id='zfj-sidebar-menu']//a[@class='toggle-filter-panel']", function(clickOnDockLinkStatus){
                        assert.ok(clickOnDockLinkStatus, "Not Clicked On Dock Link of Filter.");
                        logger.info("Clicked On Dock Link of Filter Successfully.");
                        driver.sleep(1000);
                        commUtil.getAttributeValue("/*//*[@id='zfj-sidebar-menu-column']", "style", function(getAttributeValue){
                            logger.info("Attribute Value : "+getAttributeValue);
                            assert.ok(("display: none;".indexOf(getAttributeValue) != -1));
                            logger.info("Filter Panel Dock Successfully.");
                            isDockFilter(true);
                        });
                    });
                });*/
                driver.switchTo().defaultContent();
            });
        }catch(err){

        }
    };
    this.UnDockFilterPanel = function(isUnDockFilter){
        try{
            validateSearchTestExecutionsPage(function(isValidateSearchTestExecPage){
                assert.ok(isValidateSearchTestExecPage, "Not validated Search test Execution page.");
                logger.info("Search Test Execution page Validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIFrame, function(isSwitched){
                    assert.ok(isSwitched, "NoT Able To Switch IFrame in Search test Executions Page.");

                    commUtil.getAttributeValue("//*[@id='navigator-sidebar']", "style", function(getAttributeValue){
                        logger.info("Attribute Value : "+getAttributeValue);
                        //assert.ok(("display: none;".indexOf(getAttributeValue) != -1));
                        if(getAttributeValue.indexOf("display: none;") != -1){
                            logger.info("Filter Panel is already docked.");
                            isUnDockFilter(true);
                        }else{
                            commUtil.clickOnElementByXpath(".//*[@id='navigator-sidebar']//*[@class='filter-actions']/a[contains(@class,'ui-undock')]", function(clickOnUnDockFilterStatus){
                                assert.ok(clickOnUnDockFilterStatus, "Not clicked On UnDock Filter Link.");
                                logger.info("Clicked On UnDock Filter Link Successfully.");
                                driver.sleep(1000);
                                commUtil.getAttributeValue("//*[@id='navigator-sidebar']", "style", function(getAttributeValue){
                                    logger.info("Attribute Value : "+getAttributeValue);
                                    assert.ok((getAttributeValue.indexOf("display: none;") != -1));
                                    logger.info("Filter Panel UnDocked Successfully.");
                                    isUnDockFilter(true);
                                });
                            });
                        }
                    });
                    driver.switchTo().defaultContent();
                });
            });
        }catch(err){

        }
    };
    this.selectProjectVersionAndCycle = function(projectName, versionName, cycleName, isSelected){
        try{
            validateSearchTestExecutionsPage(function(isValidateSearchTestExecPage) {
                assert.ok(isValidateSearchTestExecPage, "Not validated Search test Execution page.");
                logger.info("Search Test Execution page Validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIFrame, function (isSwitched) {
                    assert.ok(isSwitched, "NoT Able To Switch IFrame in Search test Executions Page.");
                    logger.info("Switched To IFrame Successfully.");
                    selectProject(projectName, function(selectProjectStatus){
                        assert.ok(selectProjectStatus, "Not Selected Project.");
                        logger.info(projectName+" selected Successfully.");
                        selectVersion(versionName, function(selectVersionStatus){
                            assert.ok(selectVersionStatus, "Not Selected Version.");
                            logger.info(versionName+" selected Successfully.");
                            selectCycle(cycleName, function(selectCycleStatus){
                                assert.ok(selectCycleStatus, "Not Selected Project.");
                                logger.info(cycleName+" selected Successfully.");
                                getExecCount(function(getExecutions){
                                    logger.info("Total Executions : "+getExecutions);
                                    isSelected(selectCycleStatus);
                                });
                            });
                        });
                    });
                    driver.switchTo().defaultContent();
                });
            });
        }catch(err){

        }
    };
    this.searchComponentInSimpleFilter = function(isSearched){
        try{
            validateSearchTestExecutionsPage(function(isValidateSearchTestExecPage) {
                assert.ok(isValidateSearchTestExecPage, "Not validated Search test Execution page.");
                logger.info("Search Test Execution page Validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIFrame, function (isSwitched) {
                    assert.ok(isSwitched, "NoT Able To Switch IFrame in Search test Executions Page.");
                    logger.info("Switched To IFrame Successfully.");

                    searchExecFilterByComponent(function(selectComponentFilterStatus){
                        assert.ok(selectComponentFilterStatus, "Not Searched Components.");
                        logger.info("Components Searched Successfully.");
                        isSearched(selectComponentFilterStatus);
                    });
                    driver.switchTo().defaultContent();
                });
            });
        }catch(err){

        }
    };
    this.executeTestDirectlyInExecutionNavigator = function(projectName, versionName, cycleName, testName, testStatus, isExecuted){
      try{
          validateSearchTestExecutionsPage(function(isValidateSearchTestExecPage) {
              assert.ok(isValidateSearchTestExecPage, "Not validated Search test Execution page.");
              logger.info("Search Test Execution page Validated Successfully.");

              commUtil.switchToFrameByXpath(xpathForIFrame, function (isSwitched) {
                  assert.ok(isSwitched, "NoT Able To Switch IFrame in Search test Executions Page.");
                  logger.info("Switched To IFrame Successfully.");
                  selectProject(projectName, function(selectProjectStatus){
                      assert.ok(selectProjectStatus, "Not Selected Project.");
                      logger.info(projectName+" selected Successfully.");
                      selectVersion(versionName, function(selectVersionStatus){
                          assert.ok(selectVersionStatus, "Not Selected Version.");
                          logger.info(versionName+" selected Successfully.");
                          selectCycle(cycleName, function(selectCycleStatus){
                              assert.ok(selectCycleStatus, "Not Selected Project.");
                              logger.info(cycleName+" selected Successfully.");
                              getExecCount(function(getExecutions){
                                  logger.info("Total Executions : "+getExecutions);

                                  changeTestExecStatusInExecutionNavigator(testName, testStatus, function (changeExecStatus) {
                                      assert.ok(changeExecStatus, "Not Refreshed Execution Table.");
                                      logger.info("Test is Executed Successfully.");

                                      validateSuccessfulPopupInExecutionNavigator(function(validateSuccessfulPopup){
                                          assert.ok(validateSuccessfulPopup, "Not Refreshed Execution Table.");
                                          logger.info("Successful Popup Validated Successfully.");
                                          validateCurrentExecInExecutionNavigator(testName, testStatus, function(validateCurrentStatus){
                                              assert.ok(validateCurrentStatus, "Not Refreshed Execution Table.");
                                              logger.info("Execution Status is Validated Successfully.");
                                              isExecuted(validateCurrentStatus);
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
      }  catch(err){

      }
    };
    var changeTestExecStatusInExecutionNavigator = function (testName, changeStatus, isChangeStatus) {
        try {
            var xpathForCurrentExecStatus = "//table[@id='execution-table']//tr[td/a[text()='"+testName+"']]//dd[contains(@id, 'current-execution-status-dd-schedule')]";
            var xpathForStatusSelectDrpDwn = "//table[@id='execution-table']//tr[td/a[text()='"+testName+"']]//select[contains(@id, 'exec_status-schedule')]";
            var xpathForStatusUpdateBtn = "//table[@id='execution-table']//tr[td/a[text()='"+testName+"']]//button[contains(@id, 'exec_status_update-schedule')]";
            //commUtil.moveToElementByXpath("//*[@id='ztestSchedulesTable']/thead/tr/th[text()='Version']", function(moveToElementStatus){
                //assert.ok(moveToElementStatus, "Not Moved To Element.");
                commUtil.hoverElementByXpath(xpathForCurrentExecStatus, function(hoverOnSelectDrpDwnStatus) {
                    assert.ok(hoverOnSelectDrpDwnStatus, "Not Hovered On Current Execution Status.");
                    commUtil.clickOnElementByXpath(xpathForCurrentExecStatus, function (elementClickStatus) {
                        assert.ok(elementClickStatus, "Not Clicked On Current Execution Status for Change Status.");
                        //commUtil.sleep(2000);
                        //commUtil.waitForElement(xpathForStatusSelectDrpDwn, function(waitElementStatus){
                        //expect(waitElementStatus).toBe.true;
                        logger.info("Clicked On Current Execution Status and waited for select drop down.");
                        //logger.info("======="+driver.isElementPresent(By.xpath(xpathForStatusSelectDrpDwn)));
                        //logger.info(driver.findElement(By.xpath(xpathForStatusSelectDrpDwn)).isDisplayed());
//                    /commUtil.selectDropdownByText(element(By.xpath(xpathForStatusSelectDrpDwn)), changeStatus, function(flag){
                        logger.info("================================== select drop down"+changeStatus);
                        commUtil.hoverElementByXpath(xpathForStatusSelectDrpDwn, function (hoverOnSelectDrpDwnStatus) {
                            assert.ok(hoverOnSelectDrpDwnStatus, "Not hover On Select drop Down.");
                            logger.info("================================== select drop down"+changeStatus);

                            commUtil.selectDropdownByText(driver.findElement(By.xpath(xpathForStatusSelectDrpDwn)), changeStatus, function (isSelectedDropDown) {
                                // commUtil.selectOption(driver.findElement(By.xpath(xpathForStatusSelectDrpDwn)), changeStatus, function (flag) {
                                assert.ok(isSelectedDropDown, "Not Selected Status Drop Down.");
                                //commUtil.sleep(1000);
                                logger.info("====================");
                                commUtil.clickOnElementByXpath(xpathForStatusUpdateBtn, function (clickOnUpdateBtnStatus) {
                                    assert.ok(clickOnUpdateBtnStatus, "Not Clicked On Status Update Button.");
                                    logger.info("====================");
                                    isChangeStatus(clickOnUpdateBtnStatus);
                                    /*commUtil.isElementInVisible(xpathForCurrentExecStatus, function(isVisibleStatusUpdateBtn){
                                     assert.ok(isVisibleStatusUpdateBtn, "Status is Not Committed till now.");
                                     isChangeStatus(clickOnUpdateBtnStatus);
                                     });*/
                                });
                            });
                        });
                        //});
                    });
                });
            //});
        } catch (err) {
            console.error(err);
        }
    };
    var validateSuccessfulPopupInExecutionNavigator = function (isValidateSuccessfulPopup) {
        try {
            driver.switchTo().defaultContent();
            commUtil.waitForElement("//div[contains(text(),'Successfully Executed Test.')]", browser.params.testdata.implicitWaitTimeMedium, function (waitElementStatus) {
                assert.ok(waitElementStatus, "Successful Message popup Not Visible.");
                commUtil.switchToFrameByXpath(xpathForIFrame, function (frameSwitchStatus) {
                    assert.ok(frameSwitchStatus, "Not Switched To Frame.");
                    logger.info("Switched Successfully to IFrame Successfully After Validating Successful Popup.");
                    isValidateSuccessfulPopup(frameSwitchStatus);
                });
            });
        } catch (err) {
            console.error(err);
            isValidateSuccessfulPopup(false);
        }
    };

    getExecutedByInExecutionNavigator = function (testName, callback) {
        commUtil.getTextByXpath("//table[@id='execution-table']//tr[td/a[text()='"+testName+"']]//td[10]", function (getExecByStatus) {
            callback(getExecByStatus);
        });
    };
    getExecutedOnInExecutionNavigator = function (testName, callback) {
        commUtil.getTextByXpath("//table[@id='execution-table']//tr[td/a[text()='"+testName+"']]//td[10]", function (getExecOn) {
            callback(getExecOn);
        });
    };
    var getCurrentExecutionInExecutionNavigator = function (testName, callback) {
        var xpathForCurrentExecStatus = "//table[@id='execution-table']//tr[td/a[text()='"+testName+"']]//dd[contains(@id, 'current-execution-status-dd-schedule')]";
        commUtil.getTextByXpath(xpathForCurrentExecStatus, function (getCurrentExec) {
            callback(getCurrentExec);
        });
    };
    var validateCurrentExecInExecutionNavigator = function (testName, currentStatus, callback) {
        getCurrentExecutionInExecutionNavigator(testName, function (getCurrentStatus) {
            logger.info(currentStatus + ":::" + getCurrentStatus);
            assert.equal(currentStatus, getCurrentStatus, "CurrentExecution Status is not validated in Plan Test Cycle.");
            logger.info("Executed Status Validated Successfully.");
            getExecutedByInExecutionNavigator(testName, function(getExecutor){
                assert.ok(getExecutor === loginUser, "Not Validated Executor of the Test.");
                logger.info("Executor Of The Test Validated Successfully.");
                getExecutedOnInExecutionNavigator(testName, function(getExecutedOn){
                    logger.info("Test Executed On : "+getExecutedOn);
                    callback(true);
                });
            });
        });
    };
    this.runPreDefinedFilters1 = function(){
        try{
            validateSearchTestExecutionsPage(function(isValidateSearchTestExecPage) {
                assert.ok(isValidateSearchTestExecPage, "Not validated Search test Execution page.");
                logger.info("Search Test Execution page Validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIFrame, function (isSwitched) {
                    assert.ok(isSwitched, "NoT Able To Switch IFrame in Search test Executions Page.");
                    logger.info("Switched To IFrame Successfully.");

                });
            });
        }catch(err){

        }
    };
    this.runPreDefinedFilters = function(filterName, isRanPreDefinedFilters){
        try{
            validateSearchTestExecutionsPage(function(isValidateSearchTestExecPage) {
                assert.ok(isValidateSearchTestExecPage, "Not validated Search test Execution page.");
                logger.info("Search Test Execution page Validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIFrame, function (isSwitched) {
                    assert.ok(isSwitched, "NoT Able To Switch IFrame in Search test Executions Page.");
                    logger.info("Switched To IFrame Successfully.");
                    runAnyPreDefinedFilters(filterName, function(isExecuted){
                        assert.ok(isExecuted, "Not executed Pre-Defined Filters.");
                        isRanPreDefinedFilters(true);
                    });

                    /*commUtil.getCount("/*//*[@id='predefinedFilters']/li/a", function(getFilterCount){
                        assert.ok(getFilterCount == 5, "Not Matched Filter Count.");
                        logger.info("Filter Count Matched Successfully.");
                        commUtil.searchTextFromElements("/*//*[@id='predefinedFilters']/li/a", "My Executed Tests", function(searchFilterOneStatus){
                            assert.ok(searchFilterOneStatus, "Not Matched My Executed Tests Filter.");
                            logger.info("My Executed Tests Filter Found Successfully.");
                            commUtil.searchTextFromElements("/*//*[@id='predefinedFilters']/li/a", "My Failed Executions", function(searchFilterOneStatus){
                                assert.ok(searchFilterOneStatus, "Not Matched My Failed Executions Filter.");
                                logger.info("My Failed Executions Filter Found Successfully.");
                                commUtil.searchTextFromElements("/*//*[@id='predefinedFilters']/li/a", "All Unexecuted Tests", function(searchFilterOneStatus){
                                    assert.ok(searchFilterOneStatus, "Not Matched All Unexecuted Tests Filter.");
                                    logger.info("All Unexecuted Tests Filter Found Successfully.");
                                    commUtil.searchTextFromElements("/*//*[@id='predefinedFilters']/li/a", "All Executed Tests", function(searchFilterOneStatus){
                                        assert.ok(searchFilterOneStatus, "Not Matched All Executed Tests Filter.");
                                        logger.info("All Executed Tests Filter Found Successfully.");
                                        commUtil.searchTextFromElements("/*//*[@id='predefinedFilters']/li/a", "All Failed Executions", function(searchFilterOneStatus){
                                            assert.ok(searchFilterOneStatus, "Not Matched All Failed Executions Filter.");
                                            logger.info("All Failed Executions Filter Found Successfully.");

                                        });
                                    });
                                });
                            });
                        });*/
                    //});
                    driver.switchTo().defaultContent();
                });
            });

        }catch(err){

        }
    };
    var runAnyPreDefinedFilters = function(filterName, isExecuted){
        var xpathForPreDefinedFilter = "//*[@id='predefinedFilters']/li/a[text()='"+filterName+"']";
        commUtil.isAttribtuePresent();
        commUtil.getAttributeValue("//*[@id='navigator-sidebar']", "style", function(getAttributeValue){
            logger.info("Attribute Value : "+getAttributeValue);
            driver.sleep(1000);
            if ("display: none;" != getAttributeValue){
                commUtil.getCount("//*[@id='predefinedFilters']/li/a", function(getFilterCount) {
                    assert.ok(getFilterCount == 5, "Not Matched Filter Count.");
                    logger.info("Filter Count Matched Successfully.");
                    commUtil.searchTextFromElements("//*[@id='predefinedFilters']/li/a", filterName, function (searchFilterStatus) {
                        assert.ok(searchFilterStatus, "Not Found the Filter.");
                        logger.info(filterName+" Filter Found Successfully.");

                        commUtil.clickOnElementByXpath(xpathForPreDefinedFilter, function(clickedOnPreDefinedFilterStatus){
                            assert.ok(clickedOnPreDefinedFilterStatus, "Not clicked On "+filterName+" Link.");
                            logger.info("Clicked On "+filterName+" Link Successfully.");
                            driver.sleep(1000);
                            validatePreDefinedFilters(filterName, function(isValidated){
                                assert.ok(isValidated, "Not Validated Predefined Filters.");
                                isExecuted(true);
                            });
                        });
                    });
                });
            }else{
                assert.ok(getAttributeValue.indexOf("display: none;") != -1, "Panel is Still Open.");
                logger.info("Filter Panel is already UnDocked.");
                commUtil.hoverElementByXpath(xpathForDockFilters, function(hoverOnFiltersStatus) {
                    assert.ok(hoverOnFiltersStatus, "Not Hovered On Filters.");
                    logger.info("Hovered On Filters Successfully.");
                    commUtil.getCount("//*[@id='predefinedFilters']/li/a", function(getFilterCount) {
                        assert.ok(getFilterCount == 5, "Not Matched Filter Count.");
                        logger.info("Filter Count Matched Successfully.");
                        commUtil.searchTextFromElements("//*[@id='predefinedFilters']/li/a", filterName, function (searchFilterStatus) {
                            assert.ok(searchFilterStatus, "Not Found the Filter.");
                            logger.info(filterName + " Filter Found Successfully.");
                            commUtil.clickOnElementByXpath(xpathForPreDefinedFilter, function(clickedOnPreDefinedFilterStatus){
                                assert.ok(clickedOnPreDefinedFilterStatus, "Not clicked On "+filterName+" Link.");
                                logger.info("Clicked On "+filterName+" Link Successfully.");
                                driver.sleep(1000);
                                validatePreDefinedFilters(filterName, function(isValidated){
                                    assert.ok(isValidated, "Not Validated Predefined Filters.");
                                    isExecuted(true);
                                });
                            });
                        });
                    });

                });
            }
        });
    };
    var validatePreDefinedFilters = function(filterName, isValidated){
        driver.sleep(1000);
        /*commUtil.getAttributeValue("/*//*[@id='header-details-user-fullname']", "data-username", function(getUsername){
            logger.info("User Logged in : "+ getUsername);

        });*/
        commUtil.waitForElement("//*[@id='displayDetailId']/div/span[contains(@class, 'results-count-total')]", browser.params.testdata.implicitWaitTimeMedium, function(waitForResultStatus){
            if(waitForResultStatus){
                commUtil.getTextByXpath("//*[@id='displayDetailId']/div/span[contains(@class, 'results-count-total')]", function(getExecutions){
                    logger.info("Total Executions  : "+getExecutions);
                    if(filterName === "My Executed Tests"){
                        searchTextFromElements("//*[@id='execution-table']/tbody/tr//td[10]", loginUser, function(searchStatus){
                            assert.ok(searchStatus, "Not Validated username from the search.");
                            logger.info("My Executed Test Searched Result Validated Successfully.");
                            isValidated(searchStatus);
                        })
                    }else if(filterName === "My Executed Tests"){

                    }else if(filterName === "My Failed Executions"){

                    }else if(filterName === "My Executed Tests"){

                    }else if(filterName === "My Executed Tests"){

                    }
                })
            }else{

            }
        });


    };
    var searchTextFromElements = function(xpathForElements, searchText, callback){
        var flag = false;
        try{
            driver.findElements(By.xpath(xpathForElements)).then(function(elements){
            //element.all(by.xpath(xpathForElements)).count().then(function(elementCount){
            //count = elementCount;elements.length == 1
            //this.getCount(xpathForElements, function(elementCount){
                elementCount = elements.length;

                logger.info("Element size : : : "+elementCount +(elementCount === 1));
                if(elementCount === 1){
                    driver.findElement(By.xpath(xpathForElements)).getText().then(function(text){
                        //logger.info("Element text : : : "+text);
                        //logger.info("Element text Status : : : "+(text === searchText));
                        callback(text === searchText);
                    });
                }else{
                    //logger.info("Else part ------- ");
                    element.all(by.xpath(xpathForElements)).each(function(element) {
                        // Will print First, Second, Third.
                        driver.sleep(500);
                        element.getText().then(function(text){
                            //logger.info("Text : ::: "+text+"::"+searchText);
                            if(text === searchText){
                                flag = true;
                            }else{
                                flag = false;
                            }
                        }, function(err) {
                            console.error(err+ " : throwing err count.");
                            callback(flag);
                        });
                    }).then(function(){
                        logger.info(";;;;;;;;;"+flag);
                        callback(flag);
                    });
                }
            }, function(err) {
                console.error(err);
                console.error(xpathForElements + " : is not present in this page to search.");
                callback(null);
            });

        }catch(err){
            console.error(err);
            callback(null);
        }

    };
    var getCurrentProject = function(getCurrentProject){
        commUtil.getTextByXpath("//*[@id='project-criteria-wrap']", function(currentProject){
            logger.info(currentProject);
            var arr = currentProject.split("Project:");
            logger.info(arr[0]);
            getCurrentProject(arr[0]);
        });
    };
    var getCurrentVersion = function(getCurrentVersion){
        commUtil.getTextByXpath("fixVersion-criteria-wrap", function(currentVersion){
            logger.info(currentVersion);
            var arr = currentVersion.split("Fix Version:");
            logger.info(arr[0]);
            getCurrentVersion(arr[0]);
        });
    };
    var getCurrentCycle = function(getCurrentCycle){
        commUtil.getTextByXpath("//*[@id='cycle-criteria-wrap']", function(currentCycles){
            logger.info(currentCycles);
            var arr = currentCycles.split("Cycle Name:");
            logger.info(arr[0]);
            getCurrentCycle(arr[0]);
        });
    };
    var getCurrentStatus = function(getCurrentStatus){
        commUtil.getTextByXpath("//*[@id='executionStatus-criteria-wrap']", function(currentStatus){
            logger.info(currentStatus);
            var arr = currentStatus.split(", ");
            //logger.info(arr[0]);
            getCurrentStatus(arr);
        });
    };
    var getCurrentExecutor = function(getCurrentExecutor){
        commUtil.getTextByXpath("//*[@id='executionStatus-criteria-wrap']", function(currentExecutor){
            logger.info(currentExecutor);
            //var arr = currentStatus.split(", ");
            //logger.info(arr[0]);
            getCurrentExecutor(currentExecutor);
        });
    };
    var searchExecFilterByComponent = function(isSearched){
        try{
            var xpathForMoreBtnInSimpleSearch = "//*[@id='search-field-container']//button[@title='Add more fields to search with']";
            commUtil.waitForElement(xpathForMoreBtnInSimpleSearch, browser.params.testdata.implicitWaitTimeLow, function(waitForMoreBtnStatus){
                assert.ok(waitForMoreBtnStatus, "Not Found More Link in Search Test Execution Simple Search.");
                commUtil.clickOnElementByXpath(xpathForMoreBtnInSimpleSearch, function(clickOnMoreLinkStatus){
                    assert.ok(clickOnMoreLinkStatus, "Not Clicked on More Link in Search Test Execution Simple Search.");
                    logger.info("Clicked On More Link Of Simple Search.");
                    commUtil.waitForElement("//*[@id='more-sparkler-input']", browser.params.testdata.implicitWaitTimeLow, function(waitForSearchBtninMoreLinkStatus) {
                        assert.ok(waitForSearchBtninMoreLinkStatus, "Not Found search Button in More Link in Search Test Execution Simple Search.");
                        logger.info("Not Found Search Button After Clicking on More link.");
                        commUtil.sendTextToElement("//*[@id='more-sparkler-input']", "Component", function(sendTextToSearchLink){
                            assert.ok(sendTextToSearchLink, "Not Send Text To search box.");
                            commUtil.waitForElement("//*[@id='column-suggestions-all']//ul[@id='column-items-unselected']//label", browser.params.testdata.implicitWaitTimeLow, function(waitForSearchResult) {
                                assert.ok(waitForSearchResult, "Not Found any search result after searching.");
                                logger.info("Found Result After Searching.");
                                commUtil.searchTextFromElements("//*[@id='column-suggestions-all']//ul[@id='column-items-unselected']//label", "Component", function(searchComponentsStatus){
                                    assert.ok(searchComponentsStatus, "Not Searched Component.");
                                    logger.info("Component Searched Successfully.");
                                    isSearched(searchComponentsStatus);
                                });
                            });
                        });
                    });
                });
            });
        }  catch(err){

        }
    };
    this.bulkChangeStatus = function(bulkChangeMap, isChangedBulk){
      try{
          validateSearchTestExecutionsPage(function(isValidateSearchTestExecPage) {
              assert.ok(isValidateSearchTestExecPage, "Not validated Search test Execution page.");
              logger.info("Search Test Execution page Validated Successfully.");

              commUtil.switchToFrameByXpath(xpathForIFrame, function (isSwitched) {
                  assert.ok(isSwitched, "NoT Able To Switch IFrame in Search test Executions Page.");
                  logger.info("Switched To IFrame Successfully.");
                  selectProject(bulkChangeMap.PROJECTNAME, function(selectProjectStatus){
                      assert.ok(selectProjectStatus, "Not Selected Project.");
                      logger.info(bulkChangeMap.PROJECTNAME+" selected Successfully.");
                      selectVersion(bulkChangeMap.VERSIONNAME, function(selectVersionStatus){
                          assert.ok(selectVersionStatus, "Not Selected Version.");
                          logger.info(bulkChangeMap.VERSIONNAME+" selected Successfully.");
                          selectCycle(bulkChangeMap.CYCLENAME, function(selectCycleStatus){
                              assert.ok(selectCycleStatus, "Not Selected Project.");
                              logger.info(bulkChangeMap.CYCLENAME+" selected Successfully.");
                              getExecCount(function(getExecutions){
                                  logger.info("Total Executions : "+getExecutions);

                                  selectExecutions("", "all", function(isSelectedExec){
                                      assert.ok(isSelectedExec, "Not Selected Executions.");
                                      navigateToToolsOptions("Status", function(isNavigate){
                                          assert.ok(isNavigate, "Not Navigated to Bulk Options.");
                                          bulkChangeStatus(bulkChangeMap, function(isChangedStatus){
                                              assert.ok(isChangedStatus);
                                              logger.info("Bulk Status Changed Successfully.");
                                              handleSuccessfulBulkExecutionPopup(function(waitForAddTestStatus){
                                                  assert.ok(waitForAddTestStatus, "Not Validated Successful popup.");
                                                  logger.info("Successful popup Validated Successfully");
                                                  driver.sleep(1000);
                                                  searchTextFromElements(xpathForCurrentStatus, bulkChangeMap.TESTSTATUS, function(searchStatus){
                                                      assert.ok(searchStatus, "Not Validated Test Status from the search.");
                                                      logger.info("Test Searched Result Validated Successfully.");
                                                      driver.sleep(500);
                                                      searchTextFromElements(xpathForExecutedBy, loginUser, function(searchStatusForUser){
                                                          assert.ok(searchStatusForUser, "Not Validated username from the search.");
                                                          logger.info("Searched Result Validated Successfully.");
                                                          isChangedBulk(searchStatusForUser);
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
          });
      }catch(err){

      }
    };
    var handleSuccessfulBulkExecutionPopup = function(isHandledSuccessfulPopup){
        try{
            var xpathForSuccessfulPopupForBulkExecution = "//*[@id='enav-bulk-status-change-success']/descendant::h2[contains(@class, 'aui-dialog2')]";
            var xpathForCloseLink = "//*[@id='zephyr-je-dialog-close']";
            commUtil.waitForElement(xpathForSuccessfulPopupForBulkExecution, browser.params.testdata.implicitWaitTimeMedium, function(waitForElement){
                assert.ok(waitForElement, "Add Test Successful Popup not present.");
                commUtil.getTextByXpath(xpathForSuccessfulPopupForBulkExecution, function(headerText) {
                    assert.equal(headerText, "Bulk Change Status", "Add Test Header Not Validated.");
                    logger.info("Bulk Successful popup Header Validated Successfully.");
                    commUtil.clickOnElementByXpath(xpathForCloseLink, function(clickOnCloseLinkStatus){
                        assert.ok(clickOnCloseLinkStatus, "Not Closed Successful popup");
                        isHandledSuccessfulPopup(clickOnCloseLinkStatus);
                    });
                });
            });
        }catch(err){
            isHandledSuccessfulPopup(false);
        }
    };
    var bulkChangeStatus = function(bulkChangeMap, isChanged){
        try{
            var counter = 0;
            var temp = 0;
            if(bulkChangeMap.hasOwnProperty("TESTSTATUS")){
                temp++;
            }
            if(bulkChangeMap.hasOwnProperty("STEPSTATUS")){
                temp++;
            }
            commUtil.waitForElement("//*[@id='enav-bulk-status-change']//h2[contains(@class, 'aui-dialog2')]", browser.params.testdata.implicitWaitTimeLow, function(waitForBulkPopupHeader){
                assert.ok(waitForBulkPopupHeader, "Not Visible Bulk popup.");
                logger.info("Bulk status Popup is Visible now.");
                commUtil.getTextByXpath("//*[@id='enav-bulk-status-change']//h2[contains(@class, 'aui-dialog2')]", function(getHeader){
                    assert.ok( "Bulk Change Status" === getHeader, "Header Not Validated.");
                    logger.info("Header Validated Successfully.");
                    //logger.info(testStatus+":"+stepStatus);
                    if(bulkChangeMap.hasOwnProperty("TESTSTATUS")){
                        commUtil.selectDropdownByText(driver.findElement(By.xpath("//*[@id='exec-status-bulk-change']")), bulkChangeMap.TESTSTATUS, function(isSelected){
                            assert.ok(isSelected, "Not Selected Status.");
                            logger.info("Test Status Selected Successfully.");
                            counter++;
                            if(counter === temp){
                                //assert.ok(counter === temp, "N Cycle.");
                                commUtil.clickOnElementByXpath("//*[@id='zephyr-je-dialog-save']", function(clickOnSaveButtonStatus){
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save successfully.");

                                    isChanged(clickOnSaveButtonStatus);
                                });
                            }
                        });
                    }
                    if(bulkChangeMap.hasOwnProperty("STEPSTATUS")){
                        commUtil.clickOnElementByXpath("//*[@id='exec-status-step-bulk-change']", function(clickOnStepCheckBoxStatus){
                            assert.ok(clickOnStepCheckBoxStatus, "Not Clicked On Step Check Box Status.");
                            logger.info("Clicked on Step Select Check box.");
                            commUtil.waitForElement("//*[@id='exec-step-status-bulk-change']", browser.params.testdata.implicitWaitTimeLow, function(waitForStepDropDownStatus) {
                                assert.ok(waitForStepDropDownStatus, "Not Visible StepStatus Drop Down.");
                                logger.info("Step Change Status Drop Down is Visible now.");
                                commUtil.selectDropdownByText(driver.findElement(By.xpath("//*[@id='exec-step-status-bulk-change']")), bulkChangeMap.STEPSTATUS, function(isSelected){
                                    assert.ok(isSelected, "Not Selected Status.");
                                    logger.info("Test Status Selected Successfully.");

                                    counter++;
                                    if(counter === temp){
                                        //assert.ok(counter === temp, "N Cycle.");
                                        commUtil.clickOnElementByXpath("//*[@id='zephyr-je-dialog-save']", function(clickOnSaveButtonStatus){
                                            assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                            logger.info("Clicked on Save successfully.");

                                            isChanged(clickOnSaveButtonStatus);
                                        });
                                    }
                                });
                            });
                        });
                    }

                });

            });
        }catch(err){

        }
    };
    this.bulkDeleteExecutions = function(bulkChangeMap, isDeletedExecutions){
        try{
            validateSearchTestExecutionsPage(function(isValidateSearchTestExecPage) {
                assert.ok(isValidateSearchTestExecPage, "Not validated Search test Execution page.");
                logger.info("Search Test Execution page Validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIFrame, function (isSwitched) {
                    assert.ok(isSwitched, "NoT Able To Switch IFrame in Search test Executions Page.");
                    logger.info("Switched To IFrame Successfully.");
                    selectProject(bulkChangeMap.PROJECTNAME, function(selectProjectStatus){
                        assert.ok(selectProjectStatus, "Not Selected Project.");
                        logger.info(bulkChangeMap.PROJECTNAME+" selected Successfully.");
                        selectVersion(bulkChangeMap.VERSIONNAME, function(selectVersionStatus){
                            assert.ok(selectVersionStatus, "Not Selected Version.");
                            logger.info(bulkChangeMap.VERSIONNAME+" selected Successfully.");
                            selectCycle(bulkChangeMap.CYCLENAME, function(selectCycleStatus){
                                assert.ok(selectCycleStatus, "Not Selected Project.");
                                logger.info(bulkChangeMap.CYCLENAME+" selected Successfully.");
                                getExecCount(function(getExecutions){
                                    logger.info("Total Executions : "+getExecutions);
                                    bulkChangeMap["EXECUTIONCOUNT"] = getExecutions;

                                    selectAllExecutions(bulkChangeMap, function(isSelectedExec){
                                        assert.ok(isSelectedExec, "Not Selected Executions.");
                                        navigateToToolsOptions("Delete", function(isNavigate) {
                                            assert.ok(isNavigate, "Not Navigated to Bulk Options.");
                                            handleDeletePopup(function(isHandledDeletePopup){
                                                assert.ok(isHandledDeletePopup, "Not Handled Delete Popup.");
                                                logger.info("Execution are Deleted Successfully.");
                                                handleSuccessfulDeleteExecutionPopup(bulkChangeMap.EXECUTIONCOUNT, function(isValidateDeletedExecutions){
                                                    assert.ok(isValidateDeletedExecutions, "Not Validated Deleted Executions in Successful popup.");
                                                    logger.info("Deleted Executions are Validated Successfully in Successful popup.");
                                                    getExecCount(function(getExecutionsAfterDelete) {
                                                        logger.info("Total Executions After Delete : " + getExecutionsAfterDelete);
                                                        /*if(all){
                                                         assert.ok(getExecutionsAfterDelete == 0, "Not Validated Executions After delete");
                                                         }else{
                                                         assert.ok(getExecutionsAfterDelete == 0, "Not Validated Executions After delete");
                                                         }*/
                                                        assert.ok(getExecutionsAfterDelete == (getExecutions - bulkChangeMap.EXECUTIONCOUNT), "Not Validated Executions After delete");
                                                        logger.info("Executions are Validated After Delete Execution.");
                                                        isDeletedExecutions(isValidateDeletedExecutions);
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

        }
    };
    this.bulkCopyExecutions = function(bulkCopyMap, isDeletedExecutions){
        try{
            validateSearchTestExecutionsPage(function(isValidateSearchTestExecPage) {
                assert.ok(isValidateSearchTestExecPage, "Not validated Search test Execution page.");
                logger.info("Search Test Execution page Validated Successfully.");

                commUtil.switchToFrameByXpath(xpathForIFrame, function (isSwitched) {
                    assert.ok(isSwitched, "NoT Able To Switch IFrame in Search test Executions Page.");
                    logger.info("Switched To IFrame Successfully.");
                    selectProject(bulkCopyMap.PROJECTNAME, function(selectProjectStatus){
                        assert.ok(selectProjectStatus, "Not Selected Project.");
                        logger.info(bulkCopyMap.PROJECTNAME+" selected Successfully.");
                        selectVersion(bulkCopyMap.VERSIONNAME, function(selectVersionStatus){
                            assert.ok(selectVersionStatus, "Not Selected Version.");
                            logger.info(bulkCopyMap.VERSIONNAME+" selected Successfully.");
                            selectCycle(bulkCopyMap.CYCLENAME, function(selectCycleStatus){
                                assert.ok(selectCycleStatus, "Not Selected Project.");
                                logger.info(bulkCopyMap.CYCLENAME+" selected Successfully.");
                                getExecCount(function(getExecutions){
                                    logger.info("Total Executions : "+getExecutions);
                                    bulkCopyMap["EXECUTIONCOUNT"] = getExecutions;

                                    selectAllExecutions(bulkCopyMap, function(isSelectedExec){
                                        assert.ok(isSelectedExec, "Not Selected Executions.");
                                        navigateToToolsOptions("Copy to Cycle", function(isNavigate) {
                                            assert.ok(isNavigate, "Not Navigated to Bulk Options.");
                                            handleDeletePopup(function(isHandledDeletePopup){
                                                assert.ok(isHandledDeletePopup, "Not Handled Delete Popup.");
                                                logger.info("Execution are Deleted Successfully.");
                                                handleSuccessfulDeleteExecutionPopup(bulkCopyMap.EXECUTIONCOUNT, function(isValidateDeletedExecutions){
                                                    assert.ok(isValidateDeletedExecutions, "Not Validated Deleted Executions in Successful popup.");
                                                    logger.info("Deleted Executions are Validated Successfully in Successful popup.");
                                                    getExecCount(function(getExecutionsAfterDelete) {
                                                        logger.info("Total Executions After Delete : " + getExecutionsAfterDelete);
                                                        /*if(all){
                                                         assert.ok(getExecutionsAfterDelete == 0, "Not Validated Executions After delete");
                                                         }else{
                                                         assert.ok(getExecutionsAfterDelete == 0, "Not Validated Executions After delete");
                                                         }*/
                                                        assert.ok(getExecutionsAfterDelete == (getExecutions - bulkChangeMap.EXECUTIONCOUNT), "Not Validated Executions After delete");
                                                        logger.info("Executions are Validated After Delete Execution.");
                                                        isDeletedExecutions(isValidateDeletedExecutions);
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

        }
    };
    var handleDeletePopup = function(isHandledDeletePopup){
        try{
            var xpathForDeletePopup = "//*[@id='enav-bulk-delete-executions']//h2[contains(@class,'aui-dialog2')]";
            commUtil.waitForElement("//*[@id='enav-bulk-delete-executions']", browser.params.testdata.implicitWaitTimeMedium, function(waitForElement){
                assert.ok(waitForElement, "Delete Popup Successful Popup not present.");
                logger.info("Delete Popup is Visible Now.");
                commUtil.getTextByXpath(xpathForDeletePopup, function(headerText) {
                    assert.equal(headerText, "Delete Test Execution(s)", "Bulk Delete Popup Header Not Validated.");
                    logger.info("Bulk Delete popup Header Validated Successfully.");
                    commUtil.clickOnElementByXpath("//*[@id='zephyr-je-dialog-save']", function(clickOnDeleteLinkStatus){
                        assert.ok(clickOnDeleteLinkStatus, "Not Clicked On Delete Link of Delete popup");
                        isHandledDeletePopup(clickOnDeleteLinkStatus);
                    });
                });
            });
        }catch(err){
            isHandledDeletePopup(false);
        }
    };
    var handleBulkCopyPopup = function(bulkCopyMap, isHandledBulkCopyPopup){
        try{
            var xpathForDeletePopup = "//*[@id='enav-bulk-copy-cycle']//h2[contains(@class,'aui-dialog2')]";
            commUtil.waitForElement("//*[@id='enav-bulk-copy-executions']", browser.params.testdata.implicitWaitTimeMedium, function(waitForElement){
                assert.ok(waitForElement, "Bulk Copy Popup Successful Popup is not present.");
                logger.info("Bulk Copy Popup is Visible Now.");
                commUtil.getTextByXpath(xpathForDeletePopup, function(headerText) {
                    assert.equal(headerText, "Delete Test Execution(s)", "Bulk Delete Popup Header Not Validated.");
                    logger.info("Bulk Delete popup Header Validated Successfully.");

                    commUtil.selectDropdownByText(driver.findElement(By.xpath("//*[@id='exec-project-id']")), bulkCopyMap.PROJECTNAME, function(selectProjectStatus){
                        assert.ok(selectProjectStatus, "Not Selected Project in Bulk CopyPopup.");
                        logger.info("Selected Project Successfully.");
                        commUtil.selectDropdownByText(driver.findElement(By.xpath("//*[@id='exec-project-id']")), bulkCopyMap.VERSIONNAME, function(selectProjectStatus){
                            assert.ok(selectProjectStatus, "Not Selected Project in Bulk CopyPopup.");
                            logger.info("Selected Project Successfully.");
                            if(true){
                                commUtil.selectDropdownByText(driver.findElement(By.xpath("//*[@id='exec-project-id']")), bulkCopyMap.PROJECTNAME, function(selectProjectStatus){
                                    assert.ok(selectProjectStatus, "Not Selected Project in Bulk CopyPopup.");
                                    logger.info("Selected Project Successfully.");
                                });
                            }else{
                                commUtil.selectDropdownByText(driver.findElement(By.xpath("//*[@id='exec-project-id']")), bulkCopyMap.PROJECTNAME, function(selectProjectStatus){
                                    assert.ok(selectProjectStatus, "Not Selected Project in Bulk CopyPopup.");
                                    logger.info("Selected Project Successfully.");
                                });
                            }
                        });
                    });
                    commUtil.clickOnElementByXpath("//*[@id='zephyr-je-dialog-save']", function(clickOnDeleteLinkStatus){
                        assert.ok(clickOnDeleteLinkStatus, "Not Clicked On Delete Link of Delete popup");
                        isHandledDeletePopup(clickOnDeleteLinkStatus);
                    });
                });
            });
        }catch(err){
            isHandledDeletePopup(false);
        }
    };
    var selectProjectInBulkOperation = function(){
        try{
            commUtil.selectDropdownByText(driver.findElement(By.xpath("//*[@id='exec-project-id']")),5000 , function(selectProject){

            });
        }catch(err){

        }
    };
    var handleSuccessfulDeleteExecutionPopup = function(deleteExecutionCount, isHandledSuccessfulPopup){
        try{
            var xpathForSuccessfulPopupForDeleteExecution = "//*[@id='enav-bulk-delete-execution-success']//h2[contains(@class, 'aui-dialog2')]";
            var xpathForGetSuccessfulExecutionCount = "//*[@id='enav-bulk-delete-execution-success']//a[@id='inlineDialogSuccessIds']";
            var xpathForCloseLink = "//*[@id='zephyr-je-dialog-close']";
            commUtil.waitForElement(xpathForSuccessfulPopupForDeleteExecution, browser.params.testdata.implicitWaitTimeMedium, function(waitForElement){
                assert.ok(waitForElement, "Not Visible Delete Successful Popup.");
                commUtil.getTextByXpath(xpathForSuccessfulPopupForDeleteExecution, function(headerText) {
                    assert.equal(headerText, "Bulk Delete Execution Status", "Bulk Delete Execution Popup Header Not Validated.");
                    logger.info("Bulk Delete Execution Popup Header Validated Successfully.");
                    commUtil.getTextByXpath(xpathForGetSuccessfulExecutionCount, function(executionCount){
                        assert.ok(executionCount == deleteExecutionCount, "Not Validated Execution Count in Successful Execution Popup.");
                        logger.info("Delete Execution Count Validated Successfully in Successful Delete popup.");
                        commUtil.clickOnElementByXpath(xpathForCloseLink, function(clickOnCloseLinkStatus){
                            assert.ok(clickOnCloseLinkStatus, "Not Closed Delete Successful popup");
                            isHandledSuccessfulPopup(clickOnCloseLinkStatus);
                        });
                    });
                });
            });
        }catch(err){
            isHandledSuccessfulPopup(false);
        }
    };
    var selectExecutions = function(execToSelect, type, isSelected){
        try{
            var xpathForExecutionCheckbox = "//*[@id='execution-table']/tbody/tr[td[a[text()='"+execToSelect+"']]]//input[contains(@id, 'executionCheck')]";
            if("single" === type){
                commUtil.clickOnElementByXpath(xpathForExecutionCheckbox, function(clickOnExecStatus){
                    assert.ok(clickOnExecStatus, "Not Clicked on check box of the execution.");
                    logger.info("Execution is Selected Successfully.");
                    isSelected(clickOnExecStatus);
                })
            }else if("multiple" === type){
                commUtil.clickOnElementByXpath(xpathForExecutionCheckbox, function(clickOnExecStatus){
                    assert.ok(clickOnExecStatus, "Not Clicked on check box of the execution.");
                    logger.info("Execution is Selected Successfully.");
                    isSelected(clickOnExecStatus);
                })
            }else if("all" === type){
                commUtil.clickOnElementByXpath("//*[@id='execution-table']//input[@id='selectAllID']", function(clickOnExecStatus){
                    assert.ok(clickOnExecStatus, "Not Clicked on check box of the execution.");
                    logger.info("All Executions are Selected Successfully.");
                    driver.sleep(1000);
                    commUtil.getAttributeValue("//*[@id='execution-table']//input[@id='selectAllID']", "checked", function(enabledStatus){
                        logger.info(enabledStatus === true, "Not Selected All Executions.");
                        isSelected(clickOnExecStatus);
                    });

                })
            }else{
                logger.info("Not Given proper type");
            }
        }catch(err){

        }
    };
    var selectAllExecutions = function(map, isSelected){
        try{
            if(map.hasOwnProperty("DELETEEXEC")){
                if(map.DELETEEXEC instanceof Array){
                    var totalExecutions = map.DELETEEXEC.length;
                    for(var i=0; i < totalExecutions; i++) {
                        (function (x) {
                            var xpathForExecutionCheckbox = "//*[@id='execution-table']/tbody/tr[td[a[text()='"+x+"']]]//input[contains(@id, 'executionCheck')]";
                            logger.info(xpathForExecutionCheckbox);
                            commUtil.clickOnElementByXpath(xpathForExecutionCheckbox, function(clickOnExecStatus){
                                assert.ok(clickOnExecStatus, "Not Clicked on check box of the execution.");
                                if(x === (totalExecutions -1)){
                                    map["EXECUTIONCOUNT"] = totalExecutions;
                                    logger.info("Executions are Selected Successfully.");
                                    isSelected(clickOnExecStatus);
                                }
                            })
                        })(i);
                    }
                }else{
                    if(map.DELETEEXEC === "all" || map.DELETEEXEC === ""){
                        commUtil.clickOnElementByXpath("//*[@id='execution-table']//input[@id='selectAllID']", function(clickOnExecStatus){
                            assert.ok(clickOnExecStatus, "Not Clicked on check box of the execution.");
                            logger.info("All Executions are Selected Successfully.");
                            driver.sleep(1000);
                            commUtil.getAttributeValue("//*[@id='execution-table']//input[@id='selectAllID']", "checked", function(enabledStatus){
                                logger.info(enabledStatus === true, "Not Selected All Executions.");
                                isSelected(clickOnExecStatus);
                            });
                        })
                    }else{
                        map["EXECUTIONCOUNT"] = 1;
                        var xpathForExecutionCheckbox = "//*[@id='execution-table']/tbody/tr[td[a[text()='"+map.DELETEEXEC+"']]]//input[contains(@id, 'executionCheck')]";
                        commUtil.clickOnElementByXpath(xpathForExecutionCheckbox, function(clickOnExecStatus){
                            assert.ok(clickOnExecStatus, "Not Clicked on check box of the execution.");
                            logger.info("Execution is Selected Successfully.");
                            isSelected(clickOnExecStatus);
                        })
                    }
                }
            }
            if(map.hasOwnProperty("BULKCOPY")){
                if(map.BULKCOPY instanceof Array){
                    var totalExecutions = map.BULKCOPY.length;
                    for(var i=0; i < totalExecutions; i++) {
                        (function (x) {
                            var xpathForExecutionCheckbox = "//*[@id='execution-table']/tbody/tr[td[a[text()='"+x+"']]]//input[contains(@id, 'executionCheck')]";
                            logger.info(xpathForExecutionCheckbox);
                            commUtil.clickOnElementByXpath(xpathForExecutionCheckbox, function(clickOnExecStatus){
                                assert.ok(clickOnExecStatus, "Not Clicked on check box of the execution.");
                                if(x === (totalExecutions -1)){
                                    map["EXECUTIONCOUNT"] = totalExecutions;
                                    logger.info("Executions are Selected Successfully.");
                                    isSelected(clickOnExecStatus);
                                }
                            })
                        })(i);
                    }
                }else{
                    if(map.BULKCOPY === "all" || map.BULKCOPY === ""){
                        commUtil.clickOnElementByXpath("//*[@id='execution-table']//input[@id='selectAllID']", function(clickOnExecStatus){
                            assert.ok(clickOnExecStatus, "Not Clicked on check box of the execution.");
                            logger.info("All Executions are Selected Successfully.");
                            driver.sleep(1000);
                            commUtil.getAttributeValue("//*[@id='execution-table']//input[@id='selectAllID']", "checked", function(enabledStatus){
                                logger.info(enabledStatus === true, "Not Selected All Executions.");
                                isSelected(clickOnExecStatus);
                            });
                        })
                    }else{
                        map["EXECUTIONCOUNT"] = 1;
                        var xpathForExecutionCheckbox = "//*[@id='execution-table']/tbody/tr[td[a[text()='"+map.BULKCOPY+"']]]//input[contains(@id, 'executionCheck')]";
                        commUtil.clickOnElementByXpath(xpathForExecutionCheckbox, function(clickOnExecStatus){
                            assert.ok(clickOnExecStatus, "Not Clicked on check box of the execution.");
                            logger.info("Execution is Selected Successfully.");
                            isSelected(clickOnExecStatus);
                        })
                    }
                }
            }

        }catch(err){

        }
    };

    var navigateToToolsOptions = function(options, isSelected){
        try{
            var bulkDeleteOption = "//*[@id='enav-bulkdelete-id']";
            commUtil.waitForElement("//*[@id='enav-bulk-tools-link']", browser.params.testdata.implicitWaitTimeLow , function(waitForToolsOptions){
                assert.ok(waitForToolsOptions, "Tools Link is Not Visible.");
                commUtil.clickOnElementByXpath("//*[@id='enav-bulk-tools-link']", function(clickOnExecStatus){
                    assert.ok(clickOnExecStatus, "Not Clicked on Tools Link.");
                    logger.info("Clicked On Tools Link Successfully.");
                    commUtil.waitForElement("//*[@id='enav-bulk-tools-list']", browser.params.testdata.implicitWaitTimeLow, function(waitForBulkOptions){
                        assert.ok(waitForBulkOptions, "Bulk Options are not visible.");
                        logger.info("bulk Options are enabled.");
                        if("Status" === options){
                            commUtil.clickOnElementByXpath("//*[@id='enav-bulkstatuschange-id']", function(clickOnExecStatus){
                                assert.ok(clickOnExecStatus, "Not Clicked on Bulk Change Status Link.");
                                logger.info("Bulk Change Status Link Successfully.");
                                isSelected(clickOnExecStatus);
                            })
                        }else if("Delete" === options){
                            commUtil.clickOnElementByXpath(bulkDeleteOption, function(clickOnExecStatus){
                                assert.ok(clickOnExecStatus, "Not Clicked on check box of the execution.");
                                logger.info("Execution are Selected Successfully.");
                                isSelected(clickOnExecStatus);
                            })
                        }
                    });
                })
            });
        }catch(err){

        }
    };

    var getExecCount = function(getExec){
        var totalExecutions = 0;
        try{
            commUtil.waitForElement("//*[@id='displayDetailId']/div/span[contains(@class, 'results-count-total')]", browser.params.testdata.implicitWaitTimeLow, function(waitForResultStatus) {
                if (waitForResultStatus) {
                    commUtil.getTextByXpath("//*[@id='displayDetailId']/div/span[contains(@class, 'results-count-total')]", function (getExecutions) {
                        //logger.info("Total Executions  : " + getExecutions);
                        totalExecutions = parseInt(getExecutions);
                        getExec(totalExecutions);
                    })
                } else {
                    getExec(totalExecutions);
                }
            });
        }catch(err){
            getExec(totalExecutions);
        }
    };



    var selectProject = function(projectName, isSelectedProject){
        try{
            //var xpathForProjectLink = "//*[@id='inline-dialog-project']//h5[text()='Project']/following-sibling::div//label[@title='"+projectName+"']/input";
            var xpathForProjectLink = "//*[@id='inline-dialog-project']//h5[text()='Project']/following-sibling::div//input[@name='"+projectName+"']";
            commUtil.waitForElement("//*[@id='project-criteria-wrap']", browser.params.testdata.implicitWaitTimeMedium , function(waitForElement){
                assert.ok(waitForElement, "Not Found Project Link Element.");
                logger.info("1.");
                commUtil.clickOnElementByXpath("//*[@id='project-criteria-wrap']", function(clickOnProjectLinkStatus){
                    assert.ok(clickOnProjectLinkStatus, "Not Clicked on Project  Link Element.");
                    logger.info("2.");
                    commUtil.waitForElement("//*[@id='inline-dialog-project']//h5[text()='Project']", browser.params.testdata.implicitWaitTimeMedium, function(waitForElement1){
                        assert.ok(waitForElement1, "Not Found Project Drop Down to Select project..");
                        logger.info("3."+xpathForProjectLink);
                        driver.sleep(500);
                        commUtil.clickOnElementByXpath(xpathForProjectLink, function(clickOnProjectStatus){
                            assert.ok(clickOnProjectStatus, "Not Select on Project.");
                            driver.sleep(1000);
                            commUtil.clickOnElementByXpath("//*[@id='project-criteria-wrap']", function(clickOnProjectCloseLinkStatus){
                                assert.ok(clickOnProjectCloseLinkStatus, "Not Closed the Project.");
                                driver.sleep(1000);
                                logger.info("Project Selected Successfully.");
                                isSelectedProject(clickOnProjectCloseLinkStatus);
                            });
                        });
                    })
                });
            })
        }catch(err){

        }
    };
    var selectVersion = function(versionName, isSelectedVersion){
        try{
            //var xpathForProjectLink = "//*[@id='inline-dialog-project']//h5[text()='Project']/following-sibling::div//label[@title='"+projectName+"']/input";
            var xpathForVersionLink = "//*[@id='fixVersion-sparkler-suggestions']/h5[text()='Fix Version']/following-sibling::div//input[@name='"+versionName+"']";
            commUtil.waitForElement("//*[@id='fixVersion-criteria-wrap']", browser.params.testdata.implicitWaitTimeMedium , function(waitForElement){
                assert.ok(waitForElement, "Not Found Element.");
                //logger.info("1.");
                commUtil.clickOnElementByXpath("//*[@id='fixVersion-criteria-wrap']", function(clickOnProjectLinkStatus){
                    assert.ok(clickOnProjectLinkStatus, "Not Clicked on Project Element.");
                    //logger.info("2.");
                    commUtil.waitForElement("//*[@id='fixVersion-sparkler-suggestions']/h5[text()='Fix Version']", browser.params.testdata.implicitWaitTimeMedium, function(waitForElement1){
                        assert.ok(waitForElement1, "Not Found Element.");
                        //logger.info("3.");
                        driver.sleep(500);
                        commUtil.clickOnElementByXpath(xpathForVersionLink, function(clickOnProjectStatus){
                            assert.ok(clickOnProjectStatus, "Not Select on Project.");
                            driver.sleep(1000);
                            commUtil.clickOnElementByXpath("//*[@id='fixVersion-criteria-wrap']", function(clickOnVersionCloseStatus){
                                assert.ok(clickOnVersionCloseStatus, "Not Closed Version DropDown.");
                                driver.sleep(500);
                                logger.info("Version Selected Successfully.");
                                isSelectedVersion(clickOnVersionCloseStatus);
                            });
                        });
                    })
                });
            })
        }catch(err){

        }
    };
    var selectCycle = function(cycleName, isSelectedCycle){
        try{
            //var xpathForProjectLink = "//*[@id='inline-dialog-project']//h5[text()='Project']/following-sibling::div//label[@title='"+projectName+"']/input";
            var xpathForCycleLink = "//*[@id='cycleName-sparkler-suggestions']/h5[text()='Cycle Name']/following-sibling::div//input[@name='"+cycleName+"']";
            commUtil.waitForElement("//*[@id='cycleName-criteria-wrap']", browser.params.testdata.implicitWaitTimeMedium , function(waitForElement){
                assert.ok(waitForElement, "Not Found Element.");
                //logger.info("1.");
                commUtil.clickOnElementByXpath("//*[@id='cycleName-criteria-wrap']", function(clickOnProjectLinkStatus){
                    assert.ok(clickOnProjectLinkStatus, "Not Clicked on Project Element.");
                    //logger.info("2.");
                    commUtil.waitForElement("//*[@id='cycleName-sparkler-suggestions']/h5[text()='Cycle Name']", browser.params.testdata.implicitWaitTimeMedium, function(waitForElement1){
                        assert.ok(waitForElement1, "Not Found Element.");
                        //logger.info("3.");
                        driver.sleep(500);
                        commUtil.clickOnElementByXpath(xpathForCycleLink, function(clickOnProjectStatus){
                            assert.ok(clickOnProjectStatus, "Not Select on Project.");
                            driver.sleep(1000);
                            commUtil.clickOnElementByXpath("//*[@id='cycleName-criteria-wrap']", function(clickOnCycleCloseStatus){
                                assert.ok(clickOnCycleCloseStatus, "Not Closed Cycle Drop Down.");
                                driver.sleep(1000);
                                logger.info("Cycle Selected Successfully.");
                                isSelectedCycle(clickOnCycleCloseStatus);
                            });
                        });
                    })
                });
            })
        }catch(err){

        }
    };

    var validateSearchTestExecutionsPage = function(isValidateSearchTestExecutionsPage) {
        try{
            driver.switchTo().defaultContent();
            driver.wait(function(){
                return driver.executeScript("return document.readyState").then(function(state){
                    logger.info("Browse state : " + state);
                    return state === "complete";
                });
            }, browser.params.testdata.PageLoadTimeOut).then(function(){
                driver.sleep(1000);
                commUtil.waitForTitle("Search Test Executions", function(waitForTitleStatus){
                    assert.ok(waitForTitleStatus, "Not Validate Search Test Executions Page Title.");

                    commUtil.waitForPageLoad(xpathForIFrame,  function(waitForFrameStatus){
                        assert.ok(waitForFrameStatus, "NoT Able To Load IFrame in Search test Executions Page.");
                        commUtil.getAttributeValue("/*//*[@id='header-details-user-fullname']", "data-username", function(getUsername){
                            logger.info("User Logged in : "+ getUsername);
                            loginUser = getUsername;
                            isValidateSearchTestExecutionsPage(waitForFrameStatus);
                        });

                    });
                });
            },function(e) {
                console.error("Browser is not Loaded.");
                isValidateSearchTestExecutionsPage(false);
            });
        }catch(err){
            console.error(err);
            isValidateSearchTestExecutionsPage(false);
        }
    };
  
};
module.exports = new SearchTestExecutionPage();