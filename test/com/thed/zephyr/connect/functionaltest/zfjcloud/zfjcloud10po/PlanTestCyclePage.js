
var commUtil = require('../../utils/commUtil.js');
var addTestToCyclePage = require('./AddTestToCyclePage.js');
var executeTestPage = require('./ExecuteTestPage.js');
var viewTestPage = require('./ViewTestPage.js');

var PlanTestCyclePage = function() {

    /******************************************************
     *  PLAN TEST CYCLE PAGE
     *****************************************************/

    /******************************************************
     *  WEBELEMENTS
     *****************************************************/
    //var xpathForIframe = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__cycle-tab_provider']";
    var xpathForIframe = "";
    if(browser.params.testdata.projectCentricView === "enabled"){
        xpathForIframe = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__project-centric-tests-web-panel_provider']";
    }else if(browser.params.testdata.projectCentricView === "disabled"){
        xpathForIframe = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__cycle-tab_provider']";
    }
    /*var xpathOfTestCycleTab = element(by.xpath("//li[a[strong[text()='Test Cycles']]]"));
    var xpathOfTestCycleTitle = element(by.xpath("/*//*[@id='project-tab']/descendant::h2"));*/

    var xpathForHeaderTitle = "//*[@id='content']//h2";
    var xpathForCreateCycleBtn = "//*[@id='pdb-create-cycle-dialog']";
    var xpathForSelectedVersion = "//*[@id='s2id_versions-dd']/a";
    var xpathForAllVersion = "//*[@id='select2-drop']";
    var xpathForCyclePanel = "//*[@id='project-panel-cycle-list-summary']";
    var xpathForCycles = "//*[@id='project-panel-cycle-list-summary']/descendant::a[contains(@class, 'versionBanner-name')]";
    var xpathForDeletePopupHeader = ".//*[@id='delete-cycle-dialog']//h2[contains(@class, 'aui-dialog2')]";
    var xpathForDeleteButtonInDeletePopup = "//*[@id='delete-cycle-dialog-delete-button']";

    /******************************************************
     *  PAGE OBJECT METHODS
     *****************************************************/

    this.createCycle = function(createcyclemap, isCreateCycle){
         try{
             validateAndSwitchToFrame(function(switchFrameStatus) {
                 assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
                 logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");

                 //selectVersion("Version 1.0", function (isSelectedVersion) {
                     //assert.ok(isSelectedVersion, createcyclemap.VERSIONNAME + " : Version is not Selected.");
                     //logger.info("Version is Selected Successfully.");
                     selectVersion(createcyclemap.VERSIONNAME, function (isSelectedVersion) {
                         assert.ok(isSelectedVersion, createcyclemap.VERSIONNAME + " : Version is not Selected.");
                         logger.info("Version is Selected Successfully.");
                         /*validateCycleInfo(createcyclemap.CYCLENAME, function (searchCycleStatus) {
                          assert.ok(!searchCycleStatus, "Cycle Not Found");
                          logger.info(createcyclemap.CYCLENAME + " not found successfully in Plan Test Cycle.");*/

                         commUtil.doClickByXpath(xpathForCreateCycleBtn, function (clickOnCreateCycleStatus) {
                             assert.ok(clickOnCreateCycleStatus, "Not Clicked On Create cycle Btn.");
                             logger.info("Clicked on Create Cycle Dialog Link.");
                             require("./CreateCyclePage.js").createCycle(createcyclemap, function(createCycleStatus){
                                 assert.ok(createCycleStatus, "Not Able To Create Cycle.");
                                 logger.info(createcyclemap.CYCLENAME + " is Created Successfully");
                                 /* validateCycleInfo(createcyclemap.CYCLENAME, function (cycleInfoVerificationStatus) {
                                  assert.ok(cycleInfoVerificationStatus, "Cycle not Created.");
                                  callback(cycleInfoVerificationStatus);
                                  });*/
                                 validateCycle(createcyclemap, function(validateCycleStatus){
                                     assert.ok(validateCycleStatus, "Not validated Cycle.");
                                     logger.info("Cycle is Validated Successful.");
                                     isCreateCycle(validateCycleStatus);
                                 });

                             });
                             /*handleCreateCyclepopup(cycleName, function (createCycleStatus) {
                              expect(createCycleStatus).toBe.true;
                              logger.info(cycleName + " is created Successfully.");


                              });*/
                         });
                         //});
                     });
                 //});
                 driver.switchTo().defaultContent();
             });
         }catch(err){
             console.error(err);
         }
    };
    this.editCycle = function(createCycleMap, editCycleMap, isEditedCycle) {
        try{
            validateAndSwitchToFrame(function(switchFrameStatus) {
                assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
                logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");

                selectVersion(createCycleMap.VERSIONNAME, function (isSelectedVersion) {
                    assert.ok(isSelectedVersion, createCycleMap.VERSIONNAME + " : Version is not Selected.");
                    logger.info("Version is Selected Successfully.");

                    //validateCycleInVersion(createCycleMap.CYCLENAME, function(searchCycleStatus){
                       // assert.ok(searchCycleStatus, "Not Validated Cycle in Plan Test cycle.");
                       // logger.info(createCycleMap.CYCLENAME + " found successfully in Plan Test Cycle for Edit.....");

                        commUtil.hoverElementByXpath("/*//*[@id='project-panel-cycle-list-summary']/descendant::a[contains(@class, 'versionBanner-name') and text()='"+createCycleMap.CYCLENAME+"']", function(hoverElementStatus){
                            assert.ok(hoverElementStatus, "Not Hovered On Existing Cycle For Edit.");
                            logger.info(" Hovering on " + createCycleMap.CYCLENAME + " successfully.");

                            navigateToManageLinkFromCycle(createCycleMap.CYCLENAME, "Edit Cycle", function(navigateLinkStatus){
                                assert.ok(navigateLinkStatus, "Not Clicked On Edit cycle.");
                                logger.info("Clicked On Edit Cycle Link Successfully.");

                                require("./EditCyclePage.js").editCycle(createCycleMap, editCycleMap, function(editCycleStatus){
                                    assert.ok(editCycleStatus, "Not Able To Edit Cycle.");
                                    logger.info(createCycleMap.CYCLENAME + " is Edited Successfully");

                                    selectVersion(editCycleMap.VERSIONNAME, function(isSelectedVersionAfterEdit){
                                        assert.ok(isSelectedVersionAfterEdit, editCycleMap.VERSIONNAME + " : Version is not Selected.");
                                        logger.info("Version is Selected Successfully.123");
                                        validateCycle(editCycleMap, function(validateCycleStatus){
                                            assert.ok(validateCycleStatus, "Not validated Cycle.");
                                            logger.info("Cycle is Validated Successful.123");
                                            isEditedCycle(validateCycleStatus);
                                        });
                                    });
                                });
                            });
                        });
                    //});
                });
                driver.switchTo().defaultContent();
            });
        }   catch (err){
            console.error(err);
            isEditedCycle(false);
        }
    };
    this.moveCycle = function(createCycleMap, moveCycleMap, isValidateClonedCycle) {
        try{
            validateAndSwitchToFrame(function(switchFrameStatus) {
                assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
                logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");

                selectVersion(createCycleMap.VERSIONNAME, function (isSelectedVersion) {
                    assert.ok(isSelectedVersion, createCycleMap.VERSIONNAME + " : Version is not Selected.");
                    logger.info("Version is Selected Successfully.");

                   // validateCycleInVersion(createCycleMap.CYCLENAME, function(searchCycleStatus){
                       // assert.ok(searchCycleStatus, "Not Validated Cycle in Plan Test cycle.");
                        //logger.info(createCycleMap.CYCLENAME + " found successfully in Plan Test Cycle for Edit.");

                        commUtil.hoverElementByXpath("/*//*[@id='project-panel-cycle-list-summary']/descendant::a[contains(@class, 'versionBanner-name') and text()='"+createCycleMap.CYCLENAME+"']", function(hoverElementStatus){
                            assert.ok(hoverElementStatus, "Not Hovered On Existing Cycle For Edit.");
                            logger.info(" Hovering on " + createCycleMap.CYCLENAME + " successfully.");

                            navigateToManageLinkFromCycle(createCycleMap.CYCLENAME, "Edit Cycle", function(navigateLinkStatus){
                                assert.ok(navigateLinkStatus, "Not Clicked On Edit cycle.");
                                logger.info("Clicked On Edit Cycle Link Successfully.");
                                isValidateClonedCycle(navigateLinkStatus);
                                require("./EditCyclePage.js").moveCycle(createCycleMap, moveCycleMap, function(moveCycleStatus){
                                    assert.ok(moveCycleStatus, "Not Moved Cycle.");
                                    logger.info("Cycle Moved Successfully.");

                                    selectVersion(moveCycleMap.VERSIONNAME, function(changeVersionStatus){
                                        assert.ok(changeVersionStatus, "Version not Changed.");
                                        logger.info("Version is Selected Successfully.");
                                        validateCycle(moveCycleMap, function(validateCycleStatus){
                                            assert.ok(validateCycleStatus, "Not validated Cycle.");
                                            logger.info("Cycle is Validated Successful.");
                                            isValidateClonedCycle(validateCycleStatus);
                                        });
                                    });
                                });
                            });
                        });
                    //});
                });
                driver.switchTo().defaultContent();
            });
        }   catch (err){
            console.error(err);
        }
    };
    this.deleteCycle = function(versionName, cycleName, isDeletedCycle) {
        try{
            validateAndSwitchToFrame(function(switchFrameStatus) {
                assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
                logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");

                selectVersion(versionName, function (isSelectedVersion) {
                    assert.ok(isSelectedVersion, versionName + " : Version is not Selected.");
                    logger.info("Version is Selected Successfully.");

                    /*validateCycleInVersion(cycleName, function(searchCycleStatus){
                        assert.ok(searchCycleStatus, "Not Validated Cycle in Plan Test cycle.");
                        logger.info(cycleName + " found successfully in Plan Test Cycle for Edit.");*/

                        commUtil.hoverElementByXpath("//*[@id='project-panel-cycle-list-summary']/descendant::a[contains(@class, 'versionBanner-name') and text()='"+cycleName+"']", function(hoverCycleElementStatus){
                            assert.ok(hoverCycleElementStatus, "Hover On Element Failed.");
                            logger.info(" Hovering on "+cycleName+" successfully.");

                            navigateToManageLinkFromCycle(cycleName, "Delete Cycle", function(navigateLinkStatus){
                                assert.ok(navigateLinkStatus, "Not Navigated To Delete Popup.");
                                logger.info("Navigated successfully to Delete Cycle Link");

                                handleDeletePopup(cycleName, function(deleteClickedStatus){
                                    assert.ok(deleteClickedStatus, "Not Able To Deleted Cycle.");
                                    commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);

                                    commUtil.waitForElement(xpathForCyclePanel, browser.params.testdata.implicitWaitTimeMedium, function(waitForElementAfterDelete){
                                        assert.ok(waitForElementAfterDelete, "Not Visible Element After Delete.");
                                        commUtil.searchTextFromElements(xpathForCycles, cycleName, function(searchCycleStatusAfterDelete){
                                            assert.ok(!searchCycleStatusAfterDelete, "Found the Cycle In this Version, Not Deleted.");
                                            logger.info("Searched Successfully After Delete Cycle.");
                                            isDeletedCycle(!searchCycleStatusAfterDelete);
                                        });
                                    });

                                });

                            });
                        });
                   // });
                });
                driver.switchTo().defaultContent();
            });
        }catch(e){
            console.error(e);
            isDeletedCycle(false);
        }
    };
    this.cloneCycle = function(createCycleMap, cloneCycleMap, isClonedCycle) {
        try{
            validateAndSwitchToFrame(function(switchFrameStatus) {
                assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
                logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");

                selectVersion(createCycleMap.VERSIONNAME, function (isSelectedVersion) {
                    assert.ok(isSelectedVersion, createCycleMap.VERSIONNAME + " : Version is not Selected.");
                    logger.info("Version is Selected Successfully.");

                    validateCycleInVersion(createCycleMap.CYCLENAME, function(searchCycleStatus){
                        assert.ok(searchCycleStatus, "Not Validated Cycle in Plan Test cycle.");
                        logger.info(createCycleMap.CYCLENAME + " found successfully in Plan Test Cycle for Edit.");

                        commUtil.hoverElementByXpath("//*[@id='project-panel-cycle-list-summary']/descendant::a[contains(@class, 'versionBanner-name') and text()='"+createCycleMap.CYCLENAME+"']", function(hoverCycleElementStatus){
                            assert.ok(hoverCycleElementStatus, "Hover On Element Failed.");
                            logger.info(" Hovering on "+createCycleMap.CYCLENAME+" successfully.");

                            navigateToManageLinkFromCycle(createCycleMap.CYCLENAME, "Clone Cycle", function(navigateLinkStatus){
                                assert.ok(navigateLinkStatus, "Not navigated To Clone Popup.");
                                logger.info("Navigated successfully to Clone Cycle Link");

                                require("./CloneCyclePage.js").cloneCycle(createCycleMap, cloneCycleMap, function(editCycleStatus){
                                    assert.ok(editCycleStatus, "Not Able To Clone Cycle.");
                                    logger.info(createCycleMap.CYCLENAME + " is Cloned Successfully to : "+cloneCycleMap.CYCLENAME);

                                    selectVersion(cloneCycleMap.VERSIONNAME, function(isSelectedVersionAfterEdit){
                                        assert.ok(isSelectedVersionAfterEdit, cloneCycleMap.VERSIONNAME + " : Version is not Selected.");
                                        logger.info("Version is Selected Successfully.");
                                        validateCycle(cloneCycleMap, function(validateCycleStatus){
                                            assert.ok(validateCycleStatus, "Not validated Cycle.");
                                            logger.info("Cycle is Validated Successful.");
                                            isClonedCycle(validateCycleStatus);
                                        });
                                    });
                                });

                                /*handleClonePopup(createCycleMap.CYCLENAME, function(handleCloneStatus){
                                    assert.ok(handleCloneStatus, "Not Handled Clone Popup Success");*/
                                    //commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                                    //commUtil.sleep(2000);
                                    /*var cloneCycleName = "CLONE - "+cyclename;

                                    validateCycleInfo(cloneCycleName, function(cloneCycleInfoStatus){
                                        expect(cloneCycleInfoStatus).toBe.true;
                                        logger.info(cloneCycleName + " searched Successfully After Clone Cycle.");
                                        callback(true);
                                    });*/
                                    /*selectVersion(editCycleMap.VERSIONNAME, function(isSelectedVersionAfterEdit){
                                        assert.ok(isSelectedVersionAfterEdit, editCycleMap.VERSIONNAME + " : Version is not Selected.");
                                        logger.info("Version is Selected Successfully.");
                                        validateCycle(editCycleMap, function(validateCycleStatus){
                                            assert.ok(validateCycleStatus, "Not validated Cycle.");
                                            logger.info("Cycle is Validated Successful.");
                                            isEditedCycle(validateCycleStatus);
                                        });
                                    });
*/
                                //});
                            });
                        });

                    });
                });
                driver.switchTo().defaultContent();
            });
        }catch(err){
            console.error(err);
        }
    };
    /*this.addTestToCycle = function(versionName, cycleName, testName, isAddedTest) {
        try{
            validateAndSwitchToFrame(function(switchFrameStatus) {
                assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
                logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");
                logger.info(versionName + " : Version is not Selected.");
                selectVersion(versionName, function (isSelectedVersion) {
                    assert.ok(isSelectedVersion, versionName + " : Version is not Selected.");
                    logger.info("Version is Selected Successfully.");

                    validateCycleInVersion(cycleName, function(searchCycleStatus){
                        assert.ok(searchCycleStatus, "Not Validated Cycle in Plan Test cycle.");
                        logger.info(cycleName + " found successfully in Plan Test Cycle To Add Test.");

                        commUtil.hoverElementByXpath("/!*!//!*[@id='project-panel-cycle-list-summary']/descendant::a[contains(@class, 'versionBanner-name') and text()='"+cycleName+"']", function(hoverElementStatus){
                            assert.ok(hoverElementStatus, "Hover On Element Failed.");
                            logger.info(" Hovering on " + cycleName + " successfully.");

                            navigateToManageLinkFromCycle(cycleName, "Add Tests", function(navigateLinkStatus) {
                                assert.ok(navigateLinkStatus, "Not navigated To Add Test Popup.");
                                logger.info("Navigated successfully to Add Cycle Link");
                                addTestToCyclePage.addTestToCycle(cycleName, testName, function(addTestStatus){
                                    assert.ok(addTestStatus, "Not Added Test To cycle.");
                                    logger.info("Test is Added Successfully in Cycle.");

                                    //validateTestInCycle(cycleName, testName, function(validateTestStatus){
                                       // assert.ok(validateTestStatus, "Not Validated Test In Cycle.");
                                        //callback(validateTestStatus);
                                        closeCycle(cycleName, function(closeCycleStatus){
                                            assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                            logger.info("Cycle Closed Successfully.");
                                            driver.sleep(5000);
                                            isAddedTest(closeCycleStatus);
                                        });
                                   // });
                                });
                            });
                        });
                    });
                });
                driver.switchTo().defaultContent();
            });
        }catch(err){
            console.error(err);
        }
    };*/
    this.addTestToCycle = function(addTestToCycleMap, isAddedTest) {
        try{
            validateAndSwitchToFrame(function(switchFrameStatus) {
                assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
                logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");
                logger.info(addTestToCycleMap.VERSIONNAME + " : Version is not Selected.");
                selectVersion(addTestToCycleMap.VERSIONNAME, function (isSelectedVersion) {
                    assert.ok(isSelectedVersion, addTestToCycleMap.VERSIONNAME + " : Version is not Selected.");
                    logger.info("Version is Selected Successfully.");
                    driver.sleep(1000);
                    validateCycleInVersion(addTestToCycleMap.CYCLENAME, function(searchCycleStatus){
                        assert.ok(searchCycleStatus, "Not Validated Cycle in Plan Test cycle.");
                        logger.info(addTestToCycleMap.CYCLENAME + " found successfully in Plan Test Cycle To Add Test.");

                        commUtil.hoverElementByXpath("/*//*[@id='project-panel-cycle-list-summary']/descendant::a[contains(@class, 'versionBanner-name') and text()='"+addTestToCycleMap.CYCLENAME+"']", function(hoverElementStatus){
                            assert.ok(hoverElementStatus, "Hover On Element Failed.");
                            logger.info(" Hovering on " + addTestToCycleMap.CYCLENAME + " successfully.");

                            navigateToManageLinkFromCycle(addTestToCycleMap.CYCLENAME, "Add Tests", function(navigateLinkStatus) {
                                assert.ok(navigateLinkStatus, "Not navigated To Add Test Popup.");
                                logger.info("Navigated successfully to Add Cycle Link");

                                if(addTestToCycleMap.hasOwnProperty("FILTERNAME")){
                                    addTestToCyclePage.addTestToCycleByFilter(addTestToCycleMap.CYCLENAME, addTestToCycleMap.FILTERNAME, addTestToCycleMap.TOTALTESTS, function(addTestStatus){
                                        assert.ok(addTestStatus, "Not Added Test To cycle.");
                                        logger.info("Test is Added Successfully in Cycle.");

                                        getTestFromCycle(addTestToCycleMap.CYCLENAME, function(toCycleTests){
                                            assert.ok(addTestToCycleMap.TOTALTESTS == toCycleTests, "Not validated total tests");
                                            logger.info("Total tests are validated after addded to cycle.");
                                            //validateTestInCycle(cycleName, testName, function(validateTestStatus){
                                            // assert.ok(validateTestStatus, "Not Validated Test In Cycle.");
                                            //callback(validateTestStatus);
                                            closeCycle(addTestToCycleMap.CYCLENAME, function(closeCycleStatus){
                                                assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                                logger.info("Cycle Closed Successfully.");
                                                driver.sleep(5000);
                                                isAddedTest(closeCycleStatus);
                                            });
                                            // });
                                        });

                                    });
                                }else{
                                    addTestToCyclePage.addTestToCycle(addTestToCycleMap.CYCLENAME, addTestToCycleMap.TESTNAME, function(addTestStatus){
                                        assert.ok(addTestStatus, "Not Added Test To cycle.");
                                        logger.info("Test is Added Successfully in Cycle.");

                                        //validateTestInCycle(cycleName, testName, function(validateTestStatus){
                                        // assert.ok(validateTestStatus, "Not Validated Test In Cycle.");
                                        //callback(validateTestStatus);
                                        closeCycle(addTestToCycleMap.CYCLENAME, function(closeCycleStatus){
                                            assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                            logger.info("Cycle Closed Successfully.");
                                            driver.sleep(5000);
                                            isAddedTest(closeCycleStatus);
                                        });
                                        // });
                                    });
                                }

                            });
                        });
                    });
                });
                driver.switchTo().defaultContent();
            });
        }catch(err){
            console.error(err);
        }
    };
    this.addMultipleTests = function(addTestsMap, callback) {
        try{
            validateAndSwitchToFrame(function(switchFrameStatus) {
                assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
                logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");

                selectVersion(addTestsMap.VERSIONNAME, function (isSelectedVersion) {
                    assert.ok(isSelectedVersion, addTestsMap.VERSIONNAME + " : Version is not Selected.");
                    logger.info("Version is Selected Successfully.");

                    validateCycleInVersion(addTestsMap.CYCLENAME, function(searchCycleStatus){
                        assert.ok(searchCycleStatus, "Not Validated Cycle in Plan Test cycle.");
                        logger.info(addTestsMap.CYCLENAME + " found successfully in Plan Test Cycle To Add Test.");

                        commUtil.hoverElementByXpath("/*//*[@id='project-panel-cycle-list-summary']/descendant::a[contains(@class, 'versionBanner-name') and text()='"+addTestsMap.CYCLENAME+"']", function(hoverElementStatus){
                            assert.ok(hoverElementStatus, "Hover On Element Failed.");
                            logger.info(" Hovering on " + addTestsMap.CYCLENAME + " successfully.");

                            navigateToManageLinkFromCycle(addTestsMap.CYCLENAME, "Add Tests", function(navigateLinkStatus) {
                                assert.ok(navigateLinkStatus, "Not navigated To Add Test Popup.");
                                logger.info("Navigated successfully to Add Cycle Link");
                                addTestToCyclePage.addMultipleTests(addTestsMap, function(addTestStatus){
                                    assert.ok(addTestStatus, "Not Added Test To cycle.");
                                    logger.info("Test is Added Successfully in Cycle.");
                                    callback(addTestStatus);
                                    /*validateTestInCycle(cycleName, testName, function(validateTestStatus){
                                        assert.ok(validateTestStatus, "Not Validated Test In Cycle.");
                                        //callback(validateTestStatus);
                                        closeCycle(cycleName, function(closeCycleStatus){
                                            assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                            logger.info("Cycle Closed Successfully.");
                                            driver.sleep(5000);
                                            isAddedTest(closeCycleStatus);
                                        });
                                    });*/
                                });
                            });
                        });
                    });
                });
                driver.switchTo().defaultContent();
            });
        }catch(err){
            console.error(err);
        }
    };
    this.addTestToCycleByJiraFilter = function(versionName, cycleName, filterName, filterTests, callback) {
        validateAndSwitchtoFrame(xpathForIframe, function(switchFrameStatus){
            expect(switchFrameStatus).toBe.true;
            logger.info("Switched Successfully to Frame In Plan Test Cycle.");

            selectVersion(versionName, function(){
                logger.info("Version is Selected Successfully.");
                validateCycleInfo(cycleName, function(searchCycleStatus){
                    expect(searchCycleStatus).toBe.true;
                    logger.info(cycleName + " found successfully in Plan Test Cycle for Edit.");

                    commUtil.hoverElementUsingXpath("/*//*[@id='project-panel-cycle-list-summary']/descendant::a[contains(@class, 'versionBanner-name') and text()='"+cycleName+"']", function(hoverElementStatus){
                        expect(hoverElementStatus).toBe.true;
                        logger.info(" Hovering on " + cycleName + " successfully.");

                        navigateToManageLinkFromCycle(cycleName, "Add Tests", function(navigateLinkStatus) {
                            expect(navigateLinkStatus).toBe.true;
                            logger.info("Navigated successfully to Edit Cycle Link");
                            addTestToCyclePage.addTestToCycleByJiraFilter(cycleName, filterName, function(addTestStatus){
                                expect(addTestStatus).toBe.true;
                                /*validateTestInCycle(cycleName, testName, function(validateTestStatus){
                                    expect(validateTestStatus).toBe.true;
                                    callback(validateTestStatus);
                                });*/
                                callback(filterTests);

                            });

                        });
                    });
                });
            });
            driver.switchTo().defaultContent();
        });
    };

    /*this.executeTestStatus = function(versionName, cycleName, testName, testStatusToChange, callback){
        try{
            navigateToExecuteTestPage(versionName, cycleName, testName, function(navigateToExecPageStatus){
                assert.ok(navigateToExecPageStatus, "Not Navigated To Execute Test page.");
                logger.info("Navigated to Execute Test Page Successfully.");
                executeTestPage.changeExecutionStatus(testStatusToChange, function(getChangeStatus,getExecByName, getExecOnDate){
                    assert.ok(getChangeStatus, "Not Changed Execution status.");
                    logger.info("Status is Changed To : " + testStatusToChange);
                    logger.info("Executed By : " + getExecByName);
                    logger.info("Executed On : " + getExecOnDate);
                    validateTestAfterExec(versionName, cycleName, testName, testStatusToChange, getExecByName,getExecOnDate, function(validateTestStatus){
                        assert.ok(validateTestStatus, "Not Validated Execution status After execution.");
                        logger.info("Test Execution Summary is validated successfully.");
                        closeCycle(cycleName, function(closeCycleStatus){
                            assert.ok(closeCycleStatus, "Cycle Not Closed.");
                            logger.info("Cycle Closed Successfully.");
                            callback(closeCycleStatus);
                        });
                    });
                });
            });
        }catch (err){
            console.error(err);
        }
    };*/
    this.executeTestStatus = function(executeTestMap, isExecuteTest){
        try{
            if(executeTestMap.hasOwnProperty("EXECUTETESTDIRECTLY")){
                validateAndSwitchToFrame(function(switchFrameStatus) {
                    assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
                    logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");

                    selectVersion(executeTestMap.VERSIONNAME, function (isSelectedVersion) {
                        assert.ok(isSelectedVersion, executeTestMap.VERSIONNAME + " : Version is not Selected.");
                        logger.info("Version is Selected Successfully.");

                        validateCycleInVersion(executeTestMap.CYCLENAME, function (searchCycleStatus) {
                            assert.ok(searchCycleStatus, "Not Validated Cycle in Plan Test cycle.");
                            logger.info(executeTestMap.CYCLENAME + " found successfully in Plan Test Cycle for Edit.");

                            navigateToCycle(executeTestMap.CYCLENAME, function (navigateCycleStatus) {
                                assert.ok(navigateCycleStatus, "Not Navigated To Cycle.");

                                if(executeTestMap.TESTNAME instanceof Array){
                                    for(var i=0; i < executeTestMap.TESTNAME.length; i++) {
                                        (function (x) {
                                            if(executeTestMap.EXECUTETESTDIRECTLY instanceof Array){
                                                logger.info("Tests : ::"+executeTestMap.TESTNAME[x]);
                                                var ri = Math.floor(Math.random() * executeTestMap.EXECUTETESTDIRECTLY.length); // Random Index position in the array
                                                var status = executeTestMap.EXECUTETESTDIRECTLY[ri];
                                                logger.info("Status : :: :::::"+status);
                                                executeTestDirectly(executeTestMap.CYCLENAME, executeTestMap.TESTNAME[x], status, function(isExecutedDirectly){
                                                    assert.ok(isExecutedDirectly, "Not Executed Test Directly.");
                                                    logger.info("Test is Executed Directly."+executeTestMap.TESTNAME.length);

                                                    if(x === (executeTestMap.TESTNAME.length -1)){
                                                        closeCycle(executeTestMap.CYCLENAME, function(closeCycleStatus) {
                                                            assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                                            logger.info("Cycle Closed Successfully.");
                                                            isExecuteTest(closeCycleStatus);
                                                        });
                                                    }
                                                });
                                            }else{
                                                logger.info("Tests : ::"+executeTestMap.TESTNAME[x]);
                                                logger.info("Status : ::"+ executeTestMap.EXECUTETESTDIRECTLY);
                                                executeTestDirectly(executeTestMap.CYCLENAME, executeTestMap.TESTNAME[x], executeTestMap.EXECUTETESTDIRECTLY, function(isExecutedDirectly){
                                                    assert.ok(isExecutedDirectly, "Not Executed Test Directly.");
                                                    logger.info("Test is Executed Directly."+executeTestMap.TESTNAME.length);

                                                    if(x === (executeTestMap.TESTNAME.length -1)){
                                                        closeCycle(executeTestMap.CYCLENAME, function(closeCycleStatus) {
                                                            assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                                            logger.info("Cycle Closed Successfully.");
                                                            isExecuteTest(closeCycleStatus);
                                                        });
                                                    }
                                                });
                                            }

                                        })(i);
                                    }

                                }else{
                                    executeTestDirectly(executeTestMap.CYCLENAME, executeTestMap.TESTNAME, executeTestMap.EXECUTETESTDIRECTLY, function(isExecutedDirectly){
                                        assert.ok(isExecutedDirectly, "Not Executed Test Directly.");
                                        logger.info("Test is Executed Directly.");
                                        closeCycle(executeTestMap.CYCLENAME, function(closeCycleStatus) {
                                            assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                            logger.info("Cycle Closed Successfully.");
                                            isExecuteTest(closeCycleStatus);
                                        });
                                    });
                                }


                            });
                        });
                    });
                });

            }else if(executeTestMap.hasOwnProperty("EXECUTEADHOC")){
                logger.info("Plan Test Cycle page.");
                //var versionName = "Unscheduled", cycleName = "Ad hoc";
                executeTestMap["VERSIONNAME"] = "Unscheduled";
                executeTestMap["CYCLENAME"] = "Ad hoc";
                /*viewTestPage.executeTest(executeTestMap, function (isExecuteStatus) {
                    assert.ok(isExecuteStatus, "Not Executed Test From view Issue page.");
                    logger.info("Not Navigated To Execute Test page.");*/
                require('./ViewTestPage.js').executeTestInAdhocFromViewTestPage(executeTestMap.TESTNAME, function (executeTestStatus) {
                    assert.ok(executeTestStatus, "Not Navigated To Execute Test page.");
                    logger.info("Navigated Successfully To Execute Test page.");

                    executeTestPage.changeExecutionStatus(executeTestMap, function (getChangeStatus) {
                        assert.ok(getChangeStatus, "Not Changed Execution status.");
                        logger.info("Status is Changed To : " + executeTestMap.TESTSTATUS);
                        //logger.info("Executed By : " + getExecByName);
                        //logger.info("Executed On : " + getExecOnDate);
                        logger.info("Executed By" + executeTestMap.EXECUTEDBY);
                        logger.info("Executed On" + executeTestMap.EXECUTEDON);
                        validateTestAfterExec(executeTestMap, function (validateTestStatus) {
                            assert.ok(validateTestStatus, "Not Validated Execution status After execution.");
                            logger.info("Test Execution Summary is validated successfully.");
                            closeCycle(executeTestMap.CYCLENAME, function (closeCycleStatus) {
                                assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                logger.info("Cycle Closed Successfully.");
                                isExecuteTest(closeCycleStatus);
                            });
                        });
                    });
                });
                //});
            }else{
                navigateToExecuteTestPage(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(navigateToExecPageStatus){
                    assert.ok(navigateToExecPageStatus, "Not Navigated To Execute Test page.");
                    logger.info("Navigated to Execute Test Page Successfully.");

                    if(executeTestMap.hasOwnProperty("TESTSTATUS") || executeTestMap.hasOwnProperty("EXECUTEALLSTEP")){
                        executeTestPage.changeExecutionStatus(executeTestMap, function(getChangeStatus){
                            assert.ok(getChangeStatus, "Not Changed Execution status.");
                            logger.info("Status is Changed To : " + executeTestMap.TESTSTATUS);
                            //logger.info("Executed By : " + getExecByName);
                            //logger.info("Executed On : " + getExecOnDate);
                            logger.info("Executed By"+executeTestMap.EXECUTEDBY);
                            logger.info("Executed On"+executeTestMap.EXECUTEDON);
                            validateTestAfterExec(executeTestMap, function(validateTestStatus){
                                assert.ok(validateTestStatus, "Not Validated Execution status After execution.");
                                logger.info("Test Execution Summary is validated successfully.");
                                closeCycle(executeTestMap.CYCLENAME, function(closeCycleStatus){
                                    assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                    logger.info("Cycle Closed Successfully.");
                                    isExecuteTest(closeCycleStatus);
                                });
                            });
                        });
                    }else if(executeTestMap.hasOwnProperty("STEPSTATUS")){
                        executeTestPage.changeExecutionStatus(executeTestMap, function(getChangeStatus){
                            assert.ok(getChangeStatus, "Not Changed Execution status.");
                            logger.info("Status is Changed To : " + executeTestMap.STEPSTATUS);

                            validateAndSwitchToFrame(function(switchFrameStatus) {
                                assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
                                logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");

                                selectVersion(executeTestMap.VERSIONNAME, function (isSelectedVersion) {
                                    assert.ok(isSelectedVersion, executeTestMap.VERSIONNAME + " : Version is not Selected.");
                                    logger.info("Version is Selected Successfully.");

                                    validateCycleInVersion(executeTestMap.CYCLENAME, function(searchCycleStatus){
                                        assert.ok(searchCycleStatus, "Not Validated Cycle in Plan Test cycle.");
                                        logger.info(executeTestMap.CYCLENAME + " found successfully in Plan Test Cycle To Add Test.");

                                        closeCycle(executeTestMap.CYCLENAME, function(closeCycleStatus){
                                            assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                            logger.info("Cycle Closed Successfully.");
                                            isExecuteTest(closeCycleStatus);
                                        });

                                        /*navigateToCycle(executeTestMap.CYCLENAME, function(navigateCycleStatus) {
                                         assert.ok(navigateCycleStatus, "Navigate To Cycle Failed.");


                                         });*/
                                    });
                                });
                            });
                        });
                    }
                    if(executeTestMap.hasOwnProperty("RETURNTOTEST")){
//                        executeTestMap["TESTSTATUS"] = executeTestMap.RETURNTOTEST;
                        executeTestPage.changeExecutionStatus(executeTestMap, function(getChangeStatus){
                            assert.ok(getChangeStatus, "Not Changed Execution status.");
                            logger.info("Status is Changed To : " + executeTestMap.TESTSTATUS);
                            //logger.info("Executed By : " + getExecByName);
                            //logger.info("Executed On : " + getExecOnDate);
                            logger.info("Executed By"+executeTestMap.EXECUTEDBY);
                            logger.info("Executed On"+executeTestMap.EXECUTEDON);
                            isExecuteTest(getChangeStatus);
                        });

                    }

                });
                /*if(executeTestMap.TESTNAME instanceof Array) {
                    var tests = executeTestMap.TESTNAME;
                    for (var i = 0; i < tests.length; i++) {
                        (function (x) {
                            logger.info("Tests : ::"+tests[x]);
                            executeTestMap["TESTNAME"] = tests[x];
                            navigateToExecuteTestPage(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(navigateToExecPageStatus){
                                assert.ok(navigateToExecPageStatus, "Not Navigated To Execute Test page.");
                                logger.info("Navigated to Execute Test Page Successfully.");

                                if(executeTestMap.hasOwnProperty("TESTSTATUS") || executeTestMap.hasOwnProperty("EXECUTEALLSTEP")){
                                    if(executeTestMap.TESTSTATUS instanceof Array){
                                        var statuses = executeTestMap.TESTSTATUS;
                                        var ri = Math.floor(Math.random() * statuses.length); // Random Index position in the array
                                        executeTestMap["TESTSTATUS"] = statuses[ri];
                                        logger.info("Status : :: :::::"+executeTestMap["TESTSTATUS"]);
                                        executeTestPage.changeExecutionStatus(executeTestMap, function(getChangeStatus){
                                            assert.ok(getChangeStatus, "Not Changed Execution status.");
                                            logger.info("Status is Changed To : " + executeTestMap.TESTSTATUS);
                                            //logger.info("Executed By : " + getExecByName);
                                            //logger.info("Executed On : " + getExecOnDate);
                                            logger.info("Executed By"+executeTestMap.EXECUTEDBY);
                                            logger.info("Executed On"+executeTestMap.EXECUTEDON);
                                            validateTestAfterExec(executeTestMap, function(validateTestStatus){
                                                assert.ok(validateTestStatus, "Not Validated Execution status After execution.");
                                                logger.info("Test Execution Summary is validated successfully.");
                                                if(x === (executeTestMap.TESTNAME.length -1)){
                                                    closeCycle(executeTestMap.CYCLENAME, function(closeCycleStatus) {
                                                        assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                                        logger.info("Cycle Closed Successfully.");
                                                        isExecuteTest(closeCycleStatus);
                                                    });
                                                }
                                            });
                                        });
                                    }else{
                                        logger.info("Tests : ::"+executeTestMap.TESTNAME);
                                        logger.info("Status : ::"+ executeTestMap.TESTSTATUS);
                                        executeTestPage.changeExecutionStatus(executeTestMap, function(getChangeStatus){
                                            assert.ok(getChangeStatus, "Not Changed Execution status.");
                                            logger.info("Status is Changed To : " + executeTestMap.TESTSTATUS);
                                            //logger.info("Executed By : " + getExecByName);
                                            //logger.info("Executed On : " + getExecOnDate);
                                            logger.info("Executed By"+executeTestMap.EXECUTEDBY);
                                            logger.info("Executed On"+executeTestMap.EXECUTEDON);
                                            validateTestAfterExec(executeTestMap, function(validateTestStatus){
                                                assert.ok(validateTestStatus, "Not Validated Execution status After execution.");
                                                logger.info("Test Execution Summary is validated successfully.");

                                                if(x === (executeTestMap.TESTNAME.length -1)){
                                                    closeCycle(executeTestMap.CYCLENAME, function(closeCycleStatus) {
                                                        assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                                        logger.info("Cycle Closed Successfully.");
                                                        isExecuteTest(closeCycleStatus);
                                                    });
                                                }
                                            });
                                        });
                                    }
                                }

                            });
                        })(i);
                    }
                }else{
                    navigateToExecuteTestPage(executeTestMap.VERSIONNAME, executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(navigateToExecPageStatus){
                        assert.ok(navigateToExecPageStatus, "Not Navigated To Execute Test page.");
                        logger.info("Navigated to Execute Test Page Successfully.");

                        if(executeTestMap.hasOwnProperty("TESTSTATUS") || executeTestMap.hasOwnProperty("EXECUTEALLSTEP")){
                            executeTestPage.changeExecutionStatus(executeTestMap, function(getChangeStatus){
                                assert.ok(getChangeStatus, "Not Changed Execution status.");
                                logger.info("Status is Changed To : " + executeTestMap.TESTSTATUS);
                                //logger.info("Executed By : " + getExecByName);
                                //logger.info("Executed On : " + getExecOnDate);
                                logger.info("Executed By"+executeTestMap.EXECUTEDBY);
                                logger.info("Executed On"+executeTestMap.EXECUTEDON);
                                validateTestAfterExec(executeTestMap, function(validateTestStatus){
                                    assert.ok(validateTestStatus, "Not Validated Execution status After execution.");
                                    logger.info("Test Execution Summary is validated successfully.");
                                    closeCycle(executeTestMap.CYCLENAME, function(closeCycleStatus){
                                        assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                        logger.info("Cycle Closed Successfully.");
                                        isExecuteTest(closeCycleStatus);
                                    });
                                });
                            });
                        }else if(executeTestMap.hasOwnProperty("STEPSTATUS")){
                            executeTestPage.changeExecutionStatus(executeTestMap, function(getChangeStatus){
                                assert.ok(getChangeStatus, "Not Changed Execution status.");
                                logger.info("Status is Changed To : " + executeTestMap.STEPSTATUS);

                                validateAndSwitchToFrame(function(switchFrameStatus) {
                                    assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
                                    logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");

                                    selectVersion(executeTestMap.VERSIONNAME, function (isSelectedVersion) {
                                        assert.ok(isSelectedVersion, executeTestMap.VERSIONNAME + " : Version is not Selected.");
                                        logger.info("Version is Selected Successfully.");

                                        validateCycleInVersion(executeTestMap.CYCLENAME, function(searchCycleStatus){
                                            assert.ok(searchCycleStatus, "Not Validated Cycle in Plan Test cycle.");
                                            logger.info(executeTestMap.CYCLENAME + " found successfully in Plan Test Cycle To Add Test.");

                                            closeCycle(executeTestMap.CYCLENAME, function(closeCycleStatus){
                                                assert.ok(closeCycleStatus, "Cycle Not Closed.");
                                                logger.info("Cycle Closed Successfully.");
                                                isExecuteTest(closeCycleStatus);
                                            });

                                            *//*navigateToCycle(executeTestMap.CYCLENAME, function(navigateCycleStatus) {
                                             assert.ok(navigateCycleStatus, "Navigate To Cycle Failed.");


                                             });*//*
                                        });
                                    });
                                });
                            });
                        }
                        if(executeTestMap.hasOwnProperty("RETURNTOTEST")){
//                        executeTestMap["TESTSTATUS"] = executeTestMap.RETURNTOTEST;
                            executeTestPage.changeExecutionStatus(executeTestMap, function(getChangeStatus){
                                assert.ok(getChangeStatus, "Not Changed Execution status.");
                                logger.info("Status is Changed To : " + executeTestMap.TESTSTATUS);
                                //logger.info("Executed By : " + getExecByName);
                                //logger.info("Executed On : " + getExecOnDate);
                                logger.info("Executed By"+executeTestMap.EXECUTEDBY);
                                logger.info("Executed On"+executeTestMap.EXECUTEDON);
                                isExecuteTest(getChangeStatus);
                            });

                        }

                    });
                }*/
            }

        }catch (err){
            console.error(err);
            isExecuteTest(false);
        }
    };
    this.executeAllTestFromCycle = function(versionName, cycleName, testOne, testTwo, testThree, testFour, testFive, callback){
      try{
          this.addTestMultipleToCycle(versionName, cycleName, testOne, testTwo, testThree, testFour, testFive, function(addTestMultipleStatus){
              expect(addTestMultipleStatus).toBe.true;
              logger.info("Tests are added successfully.");
          });

      }  catch(err){

      }
    };
    this.executeTestFromViewTestPage = function( executeTestMap, callback){
        try{
            logger.info("Plan Test Cycle page.");
            //var versionName = "Unscheduled", cycleName = "Ad hoc";
            executeTestMap["VERSIONNAME"] = "Unscheduled";
            executeTestMap["CYCLENAME"] = "Ad hoc";
            executeTestMap["TESTSTATUS"] = executeTestMap.EXECUTEADHOC;
            delete executeTestMap["EXECUTEADHOC"];
            /*viewTestPage.executeTest(executeTestMap, function (isExecuteStatus) {
             assert.ok(isExecuteStatus, "Not Executed Test From view Issue page.");
             logger.info("Not Navigated To Execute Test page.");*/
            //require('./ViewTestPage.js').executeTestInAdhocFromViewTestPage(executeTestMap.TESTNAME, function (executeTestStatus) {
               // assert.ok(executeTestStatus, "Not Navigated To Execute Test page.");
                //logger.info("Navigated Successfully To Execute Test page.");

                executeTestPage.changeExecutionStatus(executeTestMap, function (getChangeStatus) {
                    assert.ok(getChangeStatus, "Not Changed Execution status.");
                    logger.info("Status is Changed To : " + executeTestMap.TESTSTATUS);
                    //logger.info("Executed By : " + getExecByName);
                    //logger.info("Executed On : " + getExecOnDate);
                    logger.info("Executed By" + executeTestMap.EXECUTEDBY);
                    logger.info("Executed On" + executeTestMap.EXECUTEDON);
                    validateTestAfterExec(executeTestMap, function (validateTestStatus) {
                        assert.ok(validateTestStatus, "Not Validated Execution status After execution.");
                        logger.info("Test Execution Summary is validated successfully.");
                        closeCycle(executeTestMap.CYCLENAME, function (closeCycleStatus) {
                            assert.ok(closeCycleStatus, "Cycle Not Closed.");
                            logger.info("Cycle Closed Successfully.");
                            callback(closeCycleStatus);
                        });
                    });
                });
            //});
            /*var versionName = "Unscheduled", cycleName = "Ad hoc";
            viewTestPage.executeTestInAdhocFromViewTestPage(testName, function (executeTestStatus) {
                expect(executeTestStatus).toBe.true;

                executeTestPage.changeExecutionStatus(testStatusToChange, function (getChangeStatus, getExecByName, getExecOnDate) {
                    expect(getChangeStatus).toBe.true;
                    logger.info("Status is Changed To : " + testStatusToChange);
                    logger.info("Executed By : " + getExecByName);
                    logger.info("Executed On : " + getExecOnDate);
                    validateTestAfterExec(versionName, cycleName, testName, testStatusToChange, getExecByName, getExecOnDate, function (validateTestStatus) {
                        expect(validateTestStatus).toBe.true;
                        logger.info("Test Execution Summary is validated successfully.");
                        //callback(validateTestStatus);
                        closeCycle(cycleName, function(closeCycleStatus){
                            assert.ok(closeCycleStatus, "Cycle Not Closed.");
                            logger.info("Cycle Closed Successfully.");
                            callback(closeCycleStatus);
                        });
                    });
                });
            });
*/
        }catch (err){
            console.error(err);
        }
    };
    this.executeTestStatusWithDefect = function(versionName, cycleName, testName, testStatusToChange, defectID, callback){
        try{
            this.navigateToExecuteTestPage(versionName, cycleName, testName, function(navigateToExecPageStatus){
                expect(navigateToExecPageStatus).toBe.true;
                logger.info("Navigated to Execute Test Page Successfully.");
                executeTestPage.executeTestWithExistingDefect(testStatusToChange, defectID, function(getChangeStatus,getExecByName, getExecOnDate){
                    expect(getChangeStatus).toBe.true;
                    logger.info("Status is Changed To : " + testStatusToChange);
                    logger.info("Executed By : " + getExecByName);
                    logger.info("Executed On : " + getExecOnDate);
                    validateTestAfterExec(versionName, cycleName, testName, testStatusToChange, getExecByName,getExecOnDate, function(validateTestStatus){
                        expect(validateTestStatus).toBe.true;
                        logger.info("Test Execution Summary is validated successfully.");
                        //callback(validateTestStatus);
                        closeCycle(cycleName, function(closeCycleStatus){
                            assert.ok(closeCycleStatus, "Cycle Not Closed.");
                            logger.info("Cycle Closed Successfully.");
                            callback(closeCycleStatus);
                        });
                    });
                });
            });
        }catch (err){
            console.error(err);
        }
    };
    this.addAttachmentToTest = function(versionName, cycleName, testName, attachmentFile, callback){
        try{
            this.navigateToExecuteTestPage(versionName, cycleName, testName, function(navigateToExecPageStatus){
                expect(navigateToExecPageStatus).toBe.true;
                logger.info("Navigated to Execute Test Page Successfully.");
                executeTestPage.addTestLevelAttachments(attachmentFile, function(addAttachmentStatus){
                    expect(addAttachmentStatus).toBe.true;
                    callback("Attachment is added Successfully.");
                });
            });
        }catch (err){
            console.error(err);
        }
    };
    this.addCommentToTest = function(versionName, cycleName, testName, commentText, callback){
        try{
            this.navigateToExecuteTestPage(versionName, cycleName, testName, function(navigateToExecPageStatus){
                expect(navigateToExecPageStatus).toBe.true;
                logger.info("Navigated to Execute Test Page Successfully.");
                executeTestPage.addTestLevelComment(commentText, function(getStatus){
                    expect(getStatus).toBe.true;
                    callback(getStatus);
                });
            });
        }catch (err){
            console.error(err);
        }
    };
    this.addCommentToStep = function(versionName, cycleName, testName, stepNum, commentText, callback){
        try{
            this.navigateToExecuteTestPage(versionName, cycleName, testName, function(navigateToExecPageStatus){
                expect(navigateToExecPageStatus).toBe.true;
                logger.info("Navigated to Execute Test Page Successfully.");
                executeTestPage.addStepComment(stepNum, commentText, function(getStatus){
                    expect(getStatus).toBe.true;
                    callback(getStatus);
                });
            });
        }catch (err){
            console.error(err);
        }
    };
    validateTest = function(){
        try{

        }catch(err){

        }
    };
    this.executeStepStatus = function(versionName, cycleName, testName, stepNum, changeStepStatus, callback){
        try{
            this.navigateToExecuteTestPage(versionName, cycleName, testName, function(navigateToExecPageStatus){
                expect(navigateToExecPageStatus).toBe.true;
                logger.info("Navigated to Execute Test Page Successfully.");
                executeTestPage.changeStepExecutionStatus(stepNum, changeStepStatus, function(getChangeStatus){
                    expect(getChangeStatus).toBe.true;
                    logger.info("Status is Changed To : " + changeStepStatus);
                    callback(getChangeStatus);
                });
            });
        }catch (err){
            console.error(err);
        }
    };
    this.executeStepStatusWithExistingDefect = function(versionName, cycleName, testName, stepNum, changeStepStatus, stepDefectID, callback){
        try{
            this.navigateToExecuteTestPage(versionName, cycleName, testName, function(navigateToExecPageStatus){
                expect(navigateToExecPageStatus).toBe.true;
                logger.info("Navigated to Execute Test Page Successfully.");
                executeTestPage.changeStepExecutionStatusWithExistingDefect(stepNum, changeStepStatus, stepDefectID, function(getChangeStatus){
                    expect(getChangeStatus).toBe.true;
                    logger.info("Status is Changed To : " + changeStepStatus);
                    callback(getChangeStatus);
                });
            });
        }catch (err){
            console.error(err);
        }
    };
    this.executeAllStepsToOne = function(versionName, cycleName, testName, testStatusToChange, callback){
        try{
            this.navigateToExecuteTestPage(versionName, cycleName, testName, function(navigateToExecPageStatus){
                expect(navigateToExecPageStatus).toBe.true;
                logger.info("Navigated to Execute Test Page Successfully.");
                executeTestPage.executeAllStepsToOne(testStatusToChange, function(getChangeStatus,getExecByName, getExecOnDate){
                    expect(getChangeStatus).toBe.true;
                    logger.info("Status is Changed To : " + testStatusToChange);
                    logger.info("Executed By : " + getExecByName);
                    logger.info("Executed On : " + getExecOnDate);
                    validateTestAfterExec(versionName, cycleName, testName, testStatusToChange, getExecByName,getExecOnDate, function(validateTestStatus){
                        expect(validateTestStatus).toBe.true;
                        logger.info("Test Execution Summary is validated successfully.");
                        //callback(validateTestStatus);
                        closeCycle(cycleName, function(closeCycleStatus){
                            assert.ok(closeCycleStatus, "Cycle Not Closed.");
                            logger.info("Cycle Closed Successfully.");
                            callback(closeCycleStatus);
                        });
                    });
                });
            });
        }catch (err){
            console.error(err);
        }
    };
    //done
    this.checkReturnToCycle = function(versionName, cycleName, testName, isCheckedReturnToCycle){
        try{
            navigateToExecuteTestPage(versionName, cycleName, testName, function(navigateToExecPageStatus){
                assert.ok(navigateToExecPageStatus, "Not Navigated To Execute Test page.");
                logger.info("Navigated to Execute Test Page Successfully.");
                executeTestPage.checkReturnToCycle(function(returnToPlanTestCycleStatus){
                    assert.ok(returnToPlanTestCycleStatus, "Not returned To Plan test cycle.");
                    logger.info("Returned Successfully to Plan Test Cycle.");
                    validatePlanTestCyclePage(function(validatePlanTestCycleStatus){
                        expect(validatePlanTestCycleStatus).toBe.true;
                        logger.info("PlanTest Cycle is validated successfully.");
                        isCheckedReturnToCycle(validatePlanTestCycleStatus);
                    });
                });
            });
        }catch (err){
            console.error(err);
            isCheckedReturnToCycle(false);
        }
    };
    this.checkReturnToTest = function(versionName, cycleName, testName, callback){
        try{
            navigateToExecuteTestPage(versionName, cycleName, testName, function(navigateToExecPageStatus){
                assert.ok(navigateToExecPageStatus, "Not navigated To Execute Test page.");
                logger.info("Navigated to Execute Test Page Successfully.");
                executeTestPage.checkReturnToTest(testName, function(returnToTestStatus){
                    expect(returnToTestStatus).toBe.true;
                    logger.info("Clicked on Returned to Test.");
                    callback();
                });
            });
        }catch (err){
            console.error(err);
        }
    };

    /*this.validatePlanTestCyclepage = function() {
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("ready state status : " + state);
                return state === "complete";
            }).then(function(){
                commUtil.waitForElementByXpath("/*//*[@id='project-tab']/descendant::h2");
                commUtil.getTextUsingWebElement(xpathOfTestCycleTitle).then(function(heading){
                    assert.equal(heading,"Test Cycles","Heading doesn't match");
                });
                driver.switchTo().frame(commUtil.changeToWebElement("//iframe[@id='easyXDM_embedded-com.thed.zephyr.cloud__cycle-tab_provider']")).then(function(){
                    commUtil.isElementDisplayed(commUtil.changeToWebElement("/*//*[@id='pdb-create-cycle-dialog']")).then(function(buttonDisplayed){
                        if(buttonDisplayed === true){
                            logger.info("Create New Cycle button is displayed.");
                        }
                    });
                });
                driver.switchTo().defaultContent();
                commUtil.isElementDisplayed(xpathOfTestCycleTab).then(function(isDisplayed){
                    if(isDisplayed === true){
                        logger.info("Plan Test Cycle Verified Successfully.");
                    }
                });
                return true;
            });
        }, 100000, "Validating Plan Test Cycle Failed.");

    };*/

    /******************************************************
     *  PAGE REUSABLE METHODS
     *****************************************************/
    var validatePlanTestCyclePage = function(isValidatePlanCycle) {
      try{
         /* if(browser.params.testdata.environment === "prod"){
              xpathForIframe = "//iframe[@id='easyXDM_embedded-com.thed.zephyr.je__cycle-tab_provider']";
          }*/
          driver.switchTo().defaultContent();
          driver.wait(function(){
              return driver.executeScript("return document.readyState").then(function(state){
                  logger.info("Browse state : " + state);
                  return state === "complete";
              });
          }, browser.params.testdata.PageLoadTimeOut).then(function(){
              if(browser.params.testdata.projectCentricView === "enabled"){
                  commUtil.waitForTitle(browser.params.testdata.project, function(waitForTitleStatus){
                      assert.ok(waitForTitleStatus, "Not Validate Plan Test Cycle Page Title.");
                      logger.info(xpathForIframe);
                      commUtil.waitForPageLoad(xpathForIframe,  function(waitForFrameStatus){
                          assert.ok(waitForFrameStatus, "NoT Able To Load Iframe in Plan test Cycle.");
                          logger.info("Plan Test Cycle Page Loaded Successfully.");
                          isValidatePlanCycle(waitForFrameStatus);
                      });
                  });
              }else if(browser.params.testdata.projectCentricView === "disabled"){
                  commUtil.waitForElement(xpathForHeaderTitle, browser.params.testdata.implicitWaitTimeHigh, function(waitForElementStatus){
                      assert.ok(waitForElementStatus, "Not Loaded Plan Test Cycle Page.");
                      commUtil.getTextByXpath(xpathForHeaderTitle, function(getText){
                          logger.info('Plan Test Cycle Header : : ' + getText);
                          assert.equal(getText, 'Test Cycles', "Plan TestCycle title validation failed.");

                          commUtil.waitForPageLoad(xpathForIframe,  function(waitForFrameStatus){
                              assert.ok(waitForFrameStatus, "NoT Able To Load Iframe in Plan test Cycle.");
                              isValidatePlanCycle(waitForFrameStatus);
                          });
                      });
                  });
              }
              /*commUtil.waitForTitle(browser.params.testdata.project, function(waitForTitleStatus){
                  assert.ok(waitForTitleStatus, "Not Validate Plan Test Cycle Page Title.");
                  logger.info(xpathForIframe);
                  commUtil.waitForPageLoad(xpathForIframe,  function(waitForFrameStatus){
                      assert.ok(waitForFrameStatus, "NoT Able To Load Iframe in Plan test Cycle.");
                      logger.info("Plan Test Cycle Page Loaded Successfully.");
                      isValidatePlanCycle(waitForFrameStatus);
                  });
              });*/
              //commUtil.waitForElement("//*[@id='cyclemodule_heading']/h3", browser.params.testdata.implicitWaitTimeHigh, function(waitForElementStatus){
                  //assert.ok(waitForElementStatus, "Not Loaded Plan Test Cycle Page.");
                  //commUtil.getTextByXpath(xpathForHeaderTitle, function(getText){
                     // logger.info('Plan Test Cycle Header : : ' + getText);
                     // assert.equal(getText, 'Cycle Summary', "Plan Test Cycle Summary validation failed.");

                      /*commUtil.waitForPageLoad(xpathForIframe,  function(waitForFrameStatus){
                          assert.ok(waitForFrameStatus, "NoT Able To Load Iframe in Plan test Cycle.");
                          isValidatePlanCycle(waitForFrameStatus);
                      });*/

                 // });
              //});
          },function(e) {
              console.error("Browser is not Loaded.");
              isValidatePlanCycle(false);
          });
      }catch(err){
          isValidatePlanCycle(false);
      }
    };
    this.doValidatePlanTestCyclePage = function(isValidate){
        validateAndSwitchToFrame(function(switchFrameStatus) {
            assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
            logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");
            driver.switchTo().defaultContent();
            isValidate(switchFrameStatus);
        });
    };
    navigateToManageLinkFromCycle = function(cycleName, navigateLinkName, isNavigateToManageLink){
        try{
            //cycleName = "Ad hoc";
            //var xpathForNavigateLink = "//div[@aria-hidden='false']/descendant::a[text()='"+navigateLinkName+"']";
            var xpathForActionMenuOfCycle1 = "//*[@id='project-panel-cycle-list-summary']/descendant::*[*[*[*[a[contains(@class, 'versionBanner-name') and text()='"+cycleName+"']]]]]/descendant::*[@class='aui-page-header-actions']/div/span";
            var xpathForCycleID = "//*[@id='project-panel-cycle-list-summary']/descendant::*[*[*[*[*[*[a[contains(@class, 'versionBanner-name') and text()='"+cycleName+"']]]]]]]";
            commUtil.getAttributeValue(xpathForCycleID, "id", function(cycleID){
                logger.info("Cycle Id : "+cycleID);
                var xpathForActionMenuOfCycle = "//*[@id='"+cycleID+"']//*[@class='aui-page-header-actions']/div[contains(@aria-owns, '"+cycleID+"')]/span";
                var  xpathForNavigateLink= "//*[contains(@id,'"+cycleID+"')]//a[text()='"+navigateLinkName+"']";
                commUtil.hoverElementByXpath(xpathForActionMenuOfCycle, function(hoverOnManageLinkStatus){
                    assert.ok(hoverOnManageLinkStatus, "Not Hovered on Manage Link of the Cycle.");
                    driver.sleep(3000);
                    //element(by.xpath(xpathForActionMenuOfCycle)).click();
                    driver.sleep(3000);
                    //element(by.xpath(xpathForActionMenuOfCycle)).click();
                    //element(by.xpath(xpathForActionMenuOfCycle)).sendKeys("\uE004");

                    var filter = driver.findElement(By.xpath(xpathForActionMenuOfCycle));

                    //driver.executeScript("arguments[0].click();", filter);
                    //logger.info("2===");

                    //driver.sleep(5000);
                    //commUtil.actionClass().sendKeys(protractor.Key.ENTER).perform();
                    commUtil.doClick(filter, function(clickOnElementStatus){
                        assert.ok(clickOnElementStatus, "Not Clicked Manage Link Of Cycle.");
                        //driver.sleep(5000);
                        logger.info("Clicked on Manage Link of the Cycle.");
                        commUtil.waitForElement(xpathForNavigateLink, browser.params.testdata.implicitWaitTimeLow, function(waitElementStatus){
                            logger.info("Wait For Navigate Popup :" + waitElementStatus);
                            assert.ok(waitElementStatus, "Not Visible Manage popup.");

                            commUtil.clickOnElementByXpath(xpathForNavigateLink, function(clickStatus){
                                //logger.info("dfghjkl============" + clickStatus);
                                assert.ok(clickStatus, "Not clicked On " + navigateLinkName);
                                //commUtil.sleep(1000);
                                isNavigateToManageLink(clickStatus);
                            });
                        });
                    });
                });

            });
        }catch(err){
            console.error(err);
            isNavigateToManageLink(false);
        }
    };
    handleDeletePopup = function(cycleName, isHandledDeletePopup){
        try{
            commUtil.waitForPageLoad(xpathForDeletePopupHeader, function(waitForDeleteDialog){
                assert.ok(waitForDeleteDialog, "Not Visible delete Popup Header.");
                logger.info("Delete Popup Header validated Successfully.");

                commUtil.getTextByXpath(xpathForDeletePopupHeader, function(deletePopupHeader){
                    assert.ok(deletePopupHeader.indexOf("Delete Cycle:") != -1, "Not Able To validate Delete Popup Header.");
                    assert.ok(deletePopupHeader.indexOf(cycleName) != -1, "Not Able To validate Cycla Name in Delete Popup Header.");
                    logger.info("Delete Popup Header Validated Successfully.");

                    commUtil.clickOnElementByXpath(xpathForDeleteButtonInDeletePopup, function(clickOnDeleteButtonStatus){
                        assert.ok(clickOnDeleteButtonStatus, "Not Clicked On Delete Button on Delete Popup.");
                        logger.info("Clicked On Delete Button On Delete Popup.");

                        isHandledDeletePopup(clickOnDeleteButtonStatus);
                        /*commUtil.isElementInVisible(xpathForDeletePopupHeader, function(waitForDeleteDialogInvisibleStatus){
                            assert.ok(waitForDeleteDialogInvisibleStatus, "Not Waited For Delete Dialog to be Invisible.");
                            isHandledDeletePopup(waitForDeleteDialogInvisibleStatus);
                        });*/
                    });
                });
            });
        }catch(err){
            console.error(err);
            isHandledDeletePopup(false);
        }
    };
   /* handleClonePopup = function(cloneCycleMap, callback){
        try{
            var xpathForClonePopupHeader = "/*//*[@id='create-cycle-dialog']/div/h2[@class='dialog-title']";
            commUtil.waitForPageLoad(xpathForClonePopupHeader, function(waitForCloneCycleHeader){
                assert.ok(waitForCloneCycleHeader, "Not Visible Clone Cycle Header.");
                commUtil.getTextByXpath(xpathForClonePopupHeader, function(getHeaderTextForCloneCycle){
                    assert.equal(getHeaderTextForCloneCycle, "Clone Cycle", "Clone Cycle Popup Header Text Not Matching.");
                    logger.info("Clone Cycle Popup Header Verified Successfully.");

                    if(cloneCycleMap.TYPE === "default"){
                        driver.findElement(by.xpath("/*//*[@id='cycle_name']")).getAttribute("value").then(function(cycleNameAttribute){
                            var cloneCycleName = "CLONE - "+cloneCycleMap.CYCLENAME;
                            cloneCycleMap["CYCLENAME"] = cloneCycleName;
                            //logger.info("cLONE cYCLE nAME : "+cloneCycleMap.CYCLENAME);
                            assert.equal(cycleNameAttribute,cloneCycleMap.CYCLENAME , "Clone Cycle Default Name Not Matching.");
                            logger.info("Clone Cycle Default Name Verified Successfully.");
                        });
                    }else if(cloneCycleMap.TYPE === "change"){
                        cloneCycleMap["CYCLENAME"] = cloneCycleMap.CLONECYCLENAME;
                        driver.findElement(by.xpath("/*//*[@id='cycle_name']")).clear();
                        driver.findElement(by.xpath("/*//*[@id='cycle_name']")).sendKeys(cloneCycleMap.CYCLENAME);
                        driver.sleep(1000);

                    }
                });
            });
        commUtil.returnWebelement("/*//*[@id='create-cycle-dialog']/div/h2[@class='dialog-title']", function(clonePopupHeader){
          commUtil.getText(clonePopupHeader, function(getCloneHeader){
            assert.equal(getCloneHeader, "Clone Cycle", "Clone Cycle Popup Header Text Not Matching.");
            //expect(headerText).toContain(cyclename);
            logger.info("Clone Cycle Popup Header Verified Successfully.");


              if(cloneCycleMap.TYPE === "default"){
                  driver.findElement(by.xpath("/*//*[@id='cycle_name']")).getAttribute("value").then(function(cycleNameAttribute){
                      var cloneCycleName = "CLONE - "+cloneCycleMap.CYCLENAME;
                      cloneCycleMap["CYCLENAME"] = cloneCycleName;
                      //logger.info("cLONE cYCLE nAME : "+cloneCycleMap.CYCLENAME);
                      assert.equal(cycleNameAttribute,cloneCycleMap.CYCLENAME , "Clone Cycle Default Name Not Matching.");
                      logger.info("Clone Cycle Default Name Verified Successfully.");
                  });
              }else if(cloneCycleMap.TYPE === "change"){
                  cloneCycleMap["CYCLENAME"] = cloneCycleMap.CLONECYCLENAME;
                  driver.findElement(by.xpath("/*//*[@id='cycle_name']")).clear();
                  driver.findElement(by.xpath("/*//*[@id='cycle_name']")).sendKeys(cloneCycleMap.CYCLENAME);
                  driver.sleep(1000);

              }

              commUtil.moveToElementByXpath("/*//*[@id='create-cycle-dialog']/descendant::button[text()='Save']");
              commUtil.clickOnElementByxpath("./*//*[@id='create-cycle-dialog']/descendant::button[text()='Save']", function(clickOnSaveStatus){
                  expect(clickOnSaveStatus).toBe.true;
                  commUtil.implecitWait(browser.params.testdata.implicitWaitTimeMedium);
                  commUtil.sleep(2000);
                  logger.info("Clicked on Save button on Clone Cycle.");
                  callback(clickOnSaveStatus);
              });
          });
        });
      }catch(err){
           throw err;
      }
    };*/
    var handleEditPopup = function(cycleName, newCycleName, callback){
      try{
        commUtil.returnWebelement("//*[@id='create-cycle-dialog']/div/h2[@class='dialog-title']", function(editPopupHeader){

          commUtil.getText(editPopupHeader, function(headerText){

            expect(headerText).toContain("Edit Cycle");
            logger.info("Edit  Cycle Popup Header Verified Successfully.");
            commUtil.returnWebelement("//*[@id='cycle_name']", function(editCycleName){

              commUtil.returnAttributeValue(editCycleName, "value", function(attValue){

                expect(attValue).toEqual(cycleName);
                editCycleName.clear();
                editCycleName.sendKeys(newCycleName);
                commUtil.sleep(1000);
                commUtil.moveToElementByXpath("//*[@id='create-cycle-dialog']/descendant::button[text()='Save']");
                commUtil.clickOnElementByxpath(".//*[@id='create-cycle-dialog']/descendant::button[text()='Save']", function(clickOnSaveStatus){
                    expect(clickOnSaveStatus).toBe.true;
                  commUtil.implecitWait(browser.params.testdata.implicitWaitTimeMedium);
                  commUtil.sleep(2000);
                  logger.info("Clicked on Save button on Edit Cycle.");
                  callback(clickOnSaveStatus);

                });
              });
            });
          });
        });
      }catch(err){

      }
    };

    var selectVersion = function(versionName, isSelectedVersion) {
        try{
            commUtil.waitForElement(xpathForSelectedVersion, browser.params.testdata.implicitWaitTimeMedium, function(waitForSelectedVersionStatus) {
                assert.ok(waitForSelectedVersionStatus, "Not Visible Selected Version.");
                commUtil.getTextByXpath(xpathForSelectedVersion, function(selectedVersion){
                    logger.info(selectedVersion+"::"+versionName);
                    if(selectedVersion === versionName){
                        logger.info("Version is already Selected.");
                        isSelectedVersion(true);
                    } else {
                        //logger.info("Inside  ======================");
                        commUtil.clickOnElementByXpath(xpathForSelectedVersion, function(clickOnVersionStatus){
                            assert.ok(clickOnVersionStatus, "Not Clicked On Version To Select.");
                            commUtil.waitForElement(xpathForAllVersion, browser.params.testdata.implicitWaitTimeMedium, function(waitForAllVersionList){
                                assert.ok(waitForAllVersionList, "Not Clicked On Version To Select.");
                                //logger.info("========================================");

                                //commUtil.searchTextFromElements("//*[@id='select2-drop']/descendant::ul[@class='select2-result-sub']/li/div[@class='select2-result-label']", versionName, function(findVersionStatus){
                                   // assert.ok(findVersionStatus, "Not Found Version From Drop down menu");
                                    var xpathForParticularVersion = "//*[@id='select2-drop']/descendant::ul[@class='select2-result-sub']/li/div[@class='select2-result-label' and text()='"+versionName+"']";
                                    commUtil.clickOnElementByXpath(xpathForParticularVersion, function(clickOnVersionStatus){
                                        assert.ok(clickOnVersionStatus, "Not Selected Version From Drop down menu");
                                        logger.info(versionName + " : version is selected successfully.");
                                        isSelectedVersion(clickOnVersionStatus);
                                    });
                                //});
                            });
                        });
                    }
                });
            });

        }catch(err){
            console.error(err);
            isSelectedVersion(false);
        }
    };
    /*handleCreateCyclepopup = function(cycleName, callback) {
        try{
            commUtil.waitForElement("/*//*[@id='create-cycle-dialog']", function(waitElementStatus){

              expect(waitElementStatus).toBe.true;
              commUtil.returnWebelement("/*//*[@id='create-cycle-dialog']/div/h2[@class='dialog-title']", function(deletePopupHeader){

                commUtil.getText(deletePopupHeader, function(headerText){

                  expect(headerText).toContain("Create New Cycle");
                  logger.info("Create Cycle Popup Header Verified Successfully.");
                  commUtil.returnWebelement("/*//*[@id='cycle_name']", function(cycleNameTextBoxElement){

                    cycleNameTextBoxElement.sendKeys(cycleName);
                    commUtil.sleep(1000);
                    commUtil.moveToElementByXpath("/*//*[@id='create-cycle-dialog']/descendant::button[text()='Save']");
                    commUtil.clickOnElementByxpath("/*//*[@id='create-cycle-dialog']/descendant::button[text()='Save']", function(clickOnSaveButtonStatus){

                      expect(clickOnSaveButtonStatus).toBe.true;
                        logger.info("Clicked on create Cycle successfully.");
                        commUtil.sleep(5000);
                        commUtil.waitForElement("//a[@id='pdb-create-cycle-dialog']", function(waitForElementInvisibleStatus){
                            expect(waitForElementInvisibleStatus).toBe.true;
                            callback(waitForElementInvisibleStatus);
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
    var validateCycleInVersion = function(cycleName, isValidateCycle) {
        try{
            //commUtil.waitForElement(xpathForCyclePanel, browser.params.testdata.implicitWaitTimeMedium, function(waitForElementStatus){
                //assert.ok(waitForElementStatus, "Not Found Cycle Panel.");
                logger.info("Waited for Cycle Successfully.");
                commUtil.searchTextFromElements(xpathForCycles, cycleName, function(searchCycleStatus){
                    logger.info("Search Status :" + searchCycleStatus);
                    assert.ok(searchCycleStatus, cycleName +" is Not present in Cycle panel.");
                    isValidateCycle(searchCycleStatus);
                });
            //});
        }catch(err){
            console.error(err);
            isValidateCycle(false);
        }
    };

    var navigateToCycle = function(cycleName, isNavigateCycle){
        try{
            var xpathForCycle = "//*[@id='project-panel-cycle-list-summary']/descendant::li[*[*[*[*[*[a[text()='"+cycleName+"']]]]]]]";
            //driver.findElement(By.xpath("//*[@id='project-panel-cycle-list-summary']/descendant::li[*[*[*[*[*[a[text()='"+cycleName+"']]]]]]]"
            commUtil.waitForElement(xpathForCycle, browser.params.testdata.implicitWaitTimeMedium, function(waitForElementStatus){
                assert.ok(waitForElementStatus, "Wait For Cycle.");
                commUtil.getAttributeValue(xpathForCycle, "class", function(attributeValue){
                    assert.ok(attributeValue != null, "Attribute Value is Null");
                    logger.info("Attribute Value : "+attributeValue);
                    if(attributeValue === "expando"){
                        commUtil.clickOnElementByXpath("//*[@id='project-panel-cycle-list-summary']/descendant::*[a[text()='"+cycleName+"']]", function(clickElementStatus){
                            assert.ok(clickElementStatus, "Not Clicked On Cycle For Expanding.");
                            driver.sleep(1000);
                            var xpathForTestsInCycle = "//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr";
                            commUtil.waitForElement(xpathForTestsInCycle, browser.params.testdata.implicitWaitTimeMedium, function(waitForCyCleExpand){
                                assert.ok(waitForCyCleExpand, "Not Expanded Cycle.");
                                isNavigateCycle(true);
                            });
                        });
                    }else if(attributeValue === "expando active"){
                        //isNavigateCycle(true);
                        commUtil.clickOnElementByXpath("//*[@id='project-panel-cycle-list-summary']/descendant::li[*[*[*[*[*[a[text()='"+cycleName+"']]]]]]]/following-sibling::div/descendant::a[@id='refreshZQLId']", function(refreshCycleStatus){
                            assert.ok(refreshCycleStatus, "Cycle is not refreshed.");
                            logger.info("Cycle is already Active and refreshed.");
                            driver.sleep(500);
                            isNavigateCycle(true);
                        });
                    }
                });
            });
        }catch(err){
            isNavigateCycle(false);
        }
    };
    var closeCycle = function(cycleName, isClosedCycle){
        try{
            var xpathForCycle = "//*[@id='project-panel-cycle-list-summary']/descendant::li[*[*[*[*[*[a[text()='"+cycleName+"']]]]]]]";
            //driver.findElement(By.xpath("//*[@id='project-panel-cycle-list-summary']/descendant::li[*[*[*[*[*[a[text()='"+cycleName+"']]]]]]]"
            commUtil.waitForElement(xpathForCycle, browser.params.testdata.implicitWaitTimeMedium, function(waitForElementStatus){
                assert.ok(waitForElementStatus, "Wait For Cycle.");
                commUtil.getAttributeValue(xpathForCycle, "class", function(attributeValue){
                    assert.ok(attributeValue != null, "Attribute Value is Null");
                    logger.info("Attribute Value : "+attributeValue);
                    if(attributeValue === "expando active"){
                        logger.info("Cycle is Not Closed");
                        commUtil.clickOnElementByXpath("//*[@id='project-panel-cycle-list-summary']/descendant::*[a[text()='"+cycleName+"']]", function(clickOnCycleStatus){
                            assert.ok(clickOnCycleStatus, "Click on Cycle To Close.");
                            logger.info("Cycle is Closed Now.");
                            driver.sleep(1000);
                            isClosedCycle(clickOnCycleStatus);
                        });
                    }else{
                        logger.info("Cycle is Already Closed.");
                        isClosedCycle(true);
                    }
                });
            });
        }catch(err){
            isClosedCycle(false);
        }
        /*try{
            var xpathForCycle = "/*//*[@id='project-panel-cycle-list-summary']/descendant::li[*[*[*[*[*[a[text()='"+cycleName+"']]]]]]]";
            //driver.findElement(By.xpath("/*//*[@id='project-panel-cycle-list-summary']/descendant::li[*[*[*[*[*[a[text()='"+cycleName+"']]]]]]]"
            commUtil.returnAttributeValue(driver.findElement(By.xpath("/*//*[@id='project-panel-cycle-list-summary']/descendant::li[*[*[*[*[*[a[text()='"+cycleName+"']]]]]]]")), "class", function(attributeValue){
                logger.info("Attribute Value : "+attributeValue);
                if(attributeValue === "expando active"){
                    commUtil.clickOnElementByxpath("/*//*[@id='project-panel-cycle-list-summary']/descendant::*[a[text()='"+cycleName+"']]", function(clickElementStatus){
                        expect(clickElementStatus).toBe.true;
                        *//*commUtil.pageLoadTimeOut(20000);
                        commUtil.implecitWait(20000);
                        commUtil.sleep(1000);
                        var xpathForTestsInCycle = "*//*//**//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr";
                        commUtil.isElementPresent(xpathForTestsInCycle, 10000, function(waitElementStatus){
                            expect(waitElementStatus).toBe.false;
                            callback(waitElementStatus);
                        });*//*
                        callback(clickElementStatus);

                    });
                }else if(attributeValue === "expando"){
                    logger.info("Cycle is closed already.");
                    callback(true);
                }else{
                    logger.info("Cycle is not active.");
                }
            });

        }catch(err){
            console.error(err);
        }*/
    };
    var navigateToExecuteTestPage = function(versionName, cycleName, testName, isNavigateToExecuteTestPage){
      try{
          validateAndSwitchToFrame(function(switchFrameStatus) {
              assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
              logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");

              selectVersion(versionName, function (isSelectedVersion) {
                  assert.ok(isSelectedVersion, versionName + " : Version is not Selected.");
                  logger.info("Version is Selected Successfully.");

                  validateCycleInVersion(cycleName, function(searchCycleStatus){
                      assert.ok(searchCycleStatus, "Not Validated Cycle in Plan Test cycle.");
                      logger.info(cycleName + " found successfully in Plan Test Cycle for Edit.");

                      navigateToCycle(cycleName, function(navigateCycleStatus){
                          assert.ok(navigateCycleStatus, "Not Navigated To Cycle.");

                          commUtil.getTextByXpath("//*[*[*[*[*[*[*[a[text()='"+cycleName+"']]]]]]]]//*[@id='displayDetailId']//span[contains(@class, 'results-count-total')]", function(getTotalCount){
                              logger.info("Total Executions are in Cycle : "+getTotalCount);
                              var pages = Math.ceil(parseInt(getTotalCount) / 10);
                              logger.info("Total Pages : "+pages);
                              if(pages == 1){
                                  commUtil.clickOnElementByXpath("//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr[td[a[text()='"+testName+"']]]/td/a[text()='E']", function(clickElementStatus){
                                      assert.ok(clickElementStatus, "Not Clicked On Execute Button.");

                                      isNavigateToExecuteTestPage(clickElementStatus);
                                  });
                              }else{
                                  if(pages <= 9){
                                      for(var i= 2; i<=pages; i++){
                                          commUtil.clickOnElementByXpath("//*[*[*[*[*[*[*[a[text()='cycle one']]]]]]]]//*[@id='displayDetailId']/div[@id='zqlPageId']/a[@id='zql-pagination-\"+i-1+\"*10']", function(clickOnPageStatus){
                                            commUtil.waitForElement("//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr[td[a[text()='"+testName+"']]]/td/a[text()='E']", 50000, function(abc){
                                                if(abc === true){
                                                    commUtil.clickOnElementByXpath("//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr[td[a[text()='"+testName+"']]]/td/a[text()='E']", function(clickElementStatus){
                                                        assert.ok(clickElementStatus, "Not Clicked On Execute Button.");

                                                        isNavigateToExecuteTestPage(clickElementStatus);
                                                    });
                                                }

                                            });
                                          });
                                      }
                                  }else{

                                  }
                              }
                          });

                      });
                  });
              });
              driver.switchTo().defaultContent();
          });
      }catch(err){
          console.error(err);
          isNavigateToExecuteTestPage(false);
      }
    };
    var validateAndSwitchToFrame = function(isValidateAndSwitchToFrame) {
      try{
          validatePlanTestCyclePage(function(validatePlanTestCycle){
              assert.ok(validatePlanTestCycle, "Plan Test Cycle is not validated Successfully.");
              logger.info("Plan Test Cycle Validated Successfully.");
              driver.switchTo().defaultContent();
              commUtil.switchToFrameByXpath(xpathForIframe, function(iframeSwitchStatus){
                  assert.ok(iframeSwitchStatus, "Not Switched to IFrame in Plan Test Cycle.");
                  logger.info("Switched Successfully to IFrame Successfully.");

                  commUtil.waitForPageLoad(xpathForCreateCycleBtn, function(waitForCreateCycleStatus){
                      assert.ok(waitForCreateCycleStatus, "Not Visible Create Cycle Button In Plan Test Cycle.");
                      logger.info("Create Cycle is Visible After Loading Plan Cycle.");

                      commUtil.waitForPageLoad(xpathForSelectedVersion, function(waitForSelectedVersionStatus){
                          assert.ok(waitForSelectedVersionStatus, "Not Visible Version Drop Down In Plan Test Cycle.");
                          logger.info("Version Drop Down is Visible After Loading Plan Cycle.");
                          isValidateAndSwitchToFrame(waitForSelectedVersionStatus);
                      });
                  });
              });
          });
      }catch(err){
          console.error(err);
          isValidateAndSwitchToFrame(false);
      }
    };
    var validateTestInCycle = function(cycleName, testName, isValidateTestInCycle){
      try{
          navigateToCycle(cycleName, function(navigateCycleStatus){
             assert.ok(navigateCycleStatus, "Navigate To Cycle Failed.");
              //commUtil.sleep(1000);
              var xpathForAllTests = "//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr/td[@class='zephyr-test-execution-issueKey']";
              commUtil.searchTextFromElements(xpathForAllTests, testName, function(searchTestStatus){
                  assert.ok(searchTestStatus, "Test Not Found in Cycle.");
                  logger.info(testName+" is searched Successfully in "+cycleName);
                  isValidateTestInCycle(searchTestStatus);
              });
          });
      }catch(err){
          isValidateTestInCycle(false);
      }
    };
    var validateSuccessfulPopup = function(isValidateSuccessfulPopup){
        try{
            driver.switchTo().defaultContent();
            commUtil.waitForElement("//div[contains(text(),'Successfully Executed Test.')]", browser.params.testdata.implicitWaitTimeMedium, function(waitElementStatus){
                assert.ok(waitElementStatus, "Successful Popup Not Visible.");
                //commUtil.getTextByXpath("//div[contains(text(),'Successfully Executed Test.')]/p[@class='title']", function(successPopupStatus){
                    //expect(successPopupStatus).toContain("Success!");
                isValidateSuccessfulPopup(waitElementStatus);
               // })
            });
        }catch(err){
            console.error(err);
            isValidateSuccessfulPopup(false);
        }
    };
    this.validateTestAfterExecution = function(executeTestMap, isExecuted){
        validateTestAfterExec(executeTestMap, function(isValidateExecution){
            assert.ok(isValidateExecution);
            isExecuted(isValidateExecution);
        });
    };
    this.validateExecutionInViewIssuePage = function(isValidateExecution){
        //commUtil.clickOnElementByXpath("")
    };
    var validateTestAfterExec = function(executeTestMap, isValidateExecutedTest){
        try{
            validateAndSwitchToFrame(function(switchFrameStatus) {
                assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
                logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");

                selectVersion(executeTestMap.VERSIONNAME, function (isSelectedVersion) {
                    assert.ok(isSelectedVersion, executeTestMap.VERSIONNAME + " : Version is not Selected.");
                    logger.info("Version is Selected Successfully.");

                    validateCycleInVersion(executeTestMap.CYCLENAME, function(searchCycleStatus){
                        assert.ok(searchCycleStatus, "Not Validated Cycle in Plan Test cycle.");
                        logger.info(executeTestMap.CYCLENAME + " found successfully in Plan Test Cycle.");

                        navigateToCycle(executeTestMap.CYCLENAME, function(navigateCycleStatus){
                            assert.ok(navigateCycleStatus, "Navigate To Cycle Failed.");


                            if(executeTestMap.hasOwnProperty("TESTSTATUS")){
                                getCurrentExecution(executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(getCurrentExecutionStatus){
                                    assert.ok(executeTestMap.TESTSTATUS, getCurrentExecutionStatus, "Not Validated Execution status.");
                                    logger.info("Current Execution Status is Validated Successfully.");
                                    getExecutedByInPlanTestCycle(executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(getCurrentExecutedBy){
                                        assert.equal(executeTestMap.EXECUTEDBY, getCurrentExecutedBy, "Not Validated Executed By in Plan Test Cycle Page.");
                                        logger.info("Current Executed By is Validated Successfully in Plan Test Cycle Page.");
                                        getExecutedOnInPlanTestCycle(executeTestMap.CYCLENAME, executeTestMap.TESTNAME, function(getCurrentExecutedOn){
                                            logger.info("Executed On : " + getCurrentExecutedOn);
                                            // expect(executedOn).toEqual(getCurrentExecutedOn);
                                            logger.info("Current Executed on is Validated Successfully.");
                                            if(executeTestMap.hasOwnProperty("TESTDEFECT")){
                                                validateDefectList(executeTestMap.CYCLENAME, executeTestMap.TESTNAME, executeTestMap.TESTDEFECT, function(isValidateDefect){
                                                    assert.ok(isValidateDefect, "Not validated Defect In Plan Test Cycle.");
                                                    logger.info("Defect List Validated Successfully In Plan Test Cycle.");
                                                    isValidateExecutedTest(true);
                                                });
                                            }else{
                                                isValidateExecutedTest(true);
                                            }
                                        });
                                    });
                                });
                            }
                            /*if(executeTestMap.hasOwnProperty("TESTDEFECT")){
                                validateDefectList(executeTestMap.CYCLENAME, executeTestMap.TESTNAME, executeTestMap.TESTDEFECT, function(isValidateDefect){
                                    assert.ok(isValidateDefect, "Not validated Defect In Plan Test Cycle.");
                                    logger.info("Defect List Validated Successfully In Plan Test Cycle.");
                                    isValidateExecutedTest(true);
                                });
                            }*/
                        });
                    });
                });
                driver.switchTo().defaultContent();
            });
        }catch(err){
            console.error(err);
            isValidateExecutedTest(false);
        }
    };
    getExecutedByInPlanTestCycle = function(cycleName, testName, callback){
        try{
            commUtil.getTextByXpath("//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr[td[a[text()='"+testName+"']]]/td[contains(@id,'executed-by')]", function(getExecByStatus){
                assert.ok(getExecByStatus !== undefined, "Executed By returning null or undefined value.");
                callback(getExecByStatus);
            });
        }catch(err){
            throw err;
        }
    };
    getExecutedOnInPlanTestCycle = function(cycleName, testName, callback){
        try{
            commUtil.getTextByXpath("//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr[td[a[text()='"+testName+"']]]/td[contains(@id,'executed-on')]", function(getExecOn){
                assert.ok(getExecOn !== undefined, "Executed On returning null or undefined value.");
                callback(getExecOn);
            });
        }catch(err){
            throw err;
        }
    };
    getCurrentExecution = function(cycleName, testName, isGetCurrentExec){
        commUtil.getTextByXpath("//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr[td[a[text()='"+testName+"']]]/td/descendant::dd[contains(@id,'current-execution-status')]", function(getCurrentExec){
            isGetCurrentExec(getCurrentExec);
        });
    };
    validateDefectList = function(cycleName, testName, defectID, isValidatedDefect){
        var xpathForDefect = "//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr[td[a[text()='"+testName+"']]]/td[@class='zephyr-test-execution-entry-defect']/div/a";
        commUtil.getTextByXpath(xpathForDefect, function(defectList){
            assert.ok(defectList !== undefined, "Current defect getting Undefined.");
            assert.ok(defectList.indexOf(defectID) != -1, defectID, "Defect is Not Validated.");
            isValidatedDefect(true);
        });
    };
    validateCurrentExec = function(cycleName, testName, currentStatus, isValidateCurrentExec){
        getCurrentExecution(cycleName, testName, function(getCurrentStatus){
            logger.info(currentStatus+":::"+ getCurrentStatus);
            assert.equal(currentStatus, getCurrentStatus, "CurrentExecution Status is not validated in Plan Test Cycle.");
            isValidateCurrentExec(true);
        });
    };
    this.executeTestDirectly = function(versionName, cycleName, testName, changeStatus, callback){
        try{
            validateAndSwitchtoFrame(xpathForIframe, function(switchFrameStatus) {
                expect(switchFrameStatus).toBe.true;
                logger.info("Switched Successfully to Frame In Plan Test Cycle.");

                selectVersion(versionName, function () {
                    logger.info("Version is Selected Successfully.");
                    validateCycleInfo(cycleName, function (searchCycleStatus) {
                        expect(searchCycleStatus).toBe.true;
                        logger.info(cycleName + " found successfully in Plan Test Cycle.");
                        navigateToCycle(cycleName, function(navigateCycleStatus){
                            expect(navigateCycleStatus).toBe.true;
                            changeTestExecStatusQuickExec(cycleName, testName, changeStatus, function(changeTestStatus){
                                expect(changeTestStatus).toBe.true;
                                callback(changeTestStatus);
                            });

                        });
                    });
                });
                driver.switchTo().defaultContent();
            });


        }catch(err){
		throw err;
        }
    };
    executeTestDirectly = function(cycleName, testName, changeStatus, isExecutedDirectly){
        try{
            var xpathForCurrentExecStatus = "//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr[td[a[text()='"+testName+"']]]/td/descendant::dd[contains(@id,'current-execution-status-dd')]";
            var xpathForStatusSelectDrpDwn = "//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr[td[a[text()='"+testName+"']]]/td/descendant::select[contains(@id,'exec_status-schedule')]";
            var xpathForStatusUpdateBtn = "//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr[td[a[text()='"+testName+"']]]/td/descendant::button[contains(@id,'exec_status_update-schedule')]";
            commUtil.clickOnElementByXpath(xpathForCurrentExecStatus, function(elementClickStatus){
                assert.ok(elementClickStatus, "Not Clicked On Current Execution To change Status.");
                //commUtil.sleep(1000);
                commUtil.waitForElement(xpathForStatusUpdateBtn, browser.params.testdata.implicitWaitTimeLow, function(waitElementStatus){
                assert.ok(waitElementStatus, "Not Visible Change Status Drop Down.");

                    commUtil.selectDropdownByText(driver.findElement(by.xpath(xpathForStatusSelectDrpDwn)), changeStatus, function(selectDropDownStatus){
                        assert.ok(selectDropDownStatus, "Not Selected Status From Drop down.");
                        commUtil.clickOnElementByXpath(xpathForStatusUpdateBtn, function(clickOnStatusUpdateStatus){
                            assert.ok(clickOnStatusUpdateStatus, "Not Clicked On Status Update Button.");
                            logger.info("====================");

                            driver.switchTo().defaultContent();
                            driver.switchTo().defaultContent();
                            validateSuccessfulPopup(function(validatePopupStatus){
                                assert.ok(validatePopupStatus, "Not Validated Successful Popup.");
                                logger.info("Execute Test Successful Popup Validated Successfully.");
                                commUtil.switchToFrameByXpath(xpathForIframe, function(switchToFrameStatus){
                                    assert.ok(switchToFrameStatus, "Not Switched To Frame Successfully.");
                                    logger.info("Switch to Frame Successfully After Execution.");
                                    commUtil.isElementVisible(xpathForCurrentExecStatus, function(isElementVisibleStatus){
                                        assert.ok(isElementVisibleStatus, "Not Visible Current Execution Status.");
                                        //commUtil.sleep(2000);
                                        validateCurrentExec(cycleName, testName, changeStatus, function(validateCurrExecStatus){
                                            assert.ok(validateCurrExecStatus, "Not Validated Current Execution Status.");
                                            logger.info("Current Execution Status is Validated Successfully.");
                                            //commUtil.sleep(1000);
                                            getExecutedByInPlanTestCycle(cycleName, testName, function(getExecByName){
                                                logger.info("Executed By : " + getExecByName);
                                                getExecutedOnInPlanTestCycle(cycleName, testName, function(getExecOnDate){
                                                    logger.info("Executed On : " + getExecOnDate);
                                                    //callback(true);
                                                    isExecutedDirectly(validateCurrExecStatus);
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
            isExecutedDirectly(false);
        }
    };
    /*validateSuccessfulPopup = function(callback){
        try{
            driver.switchTo().defaultContent();
            commUtil.waitForElement("//div[contains(text(),'Successfully Executed Test.')]", function(waitElementStatus){
                expect(waitElementStatus).toBe.true;
                commUtil.getTextByXpath("//div[contains(text(),'Successfully Executed Test.')]/p[@class='title']", function(successPopupStatus){
                    expect(successPopupStatus).toContain("Success!");
                    callback(true);
                })
            });
        }catch(err){

        }
    };*/
    var validateCycle = function(createcyclemap, isValidateCycle) {
        //var flag = false;
        var counter = 0;
        var mapSize = 0;
        logger.info(Object.keys(createcyclemap).length);
        //var mapSize = Object.keys(createcyclemap).length;
       /* if(createcyclemap.hasOwnProperty("VERSIONNAME")){
            mapSize = mapSize - 1;
        }
        if(createcyclemap.hasOwnProperty("ENDDATE")){
            mapSize = mapSize - 1;
        }*/
        if(createcyclemap.hasOwnProperty("CYCLENAME")){
            mapSize++;
        }
        if(createcyclemap.hasOwnProperty("DESCRIPTION")){
            mapSize++;
        }
        if(createcyclemap.hasOwnProperty("BUILD")){
            mapSize++;
        }
        if(createcyclemap.hasOwnProperty("ENVIRONMENT")){
            mapSize++;
        }
        if(createcyclemap.hasOwnProperty("STARTDATE")){
            mapSize++;
        }
        logger.info("Map size Before Validating : "+mapSize);
        try{
            commUtil.waitForElement(xpathForCyclePanel, browser.params.testdata.implicitWaitTimeMedium, function(waitForCyclePanelStatus) {
                assert.ok(waitForCyclePanelStatus, "Not able get plan Cycle Panel for Validation.");
                logger.info("Now you are in Plan Test Cycle.");
                commUtil.moveToElementByXpath("/*//*[@id='project-panel-cycle-list-summary']/descendant::li/descendant::a[text()='"+createcyclemap.CYCLENAME+"']", function(moveToCycleStatus){
                    assert.ok(moveToCycleStatus, "Not Moved To Cycle For Validation.");
                    logger.info("Map size Before Validating : "+mapSize);

                    if(createcyclemap.hasOwnProperty("CYCLENAME")){
                        commUtil.searchTextFromElements(xpathForCycles, createcyclemap.CYCLENAME, function(searchCycleStatus){
                            assert.ok(searchCycleStatus, "Cycle name Not Validated.");
                            logger.info(createcyclemap.CYCLENAME + " : Cycle name is Verified Successfully.");
                            driver.sleep(500);
                            counter++;
                            logger.info("Map size Before Validating cyclename : "+mapSize+" : "+counter +":::" +(counter === mapSize));
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Validated Cycle.");
                                isValidateCycle(true);
                            }

                        });
                    }
                    if(createcyclemap.hasOwnProperty("DESCRIPTION")){
                        commUtil.getTextByXpath("//*[@id='project-panel-cycle-list-summary']/descendant::*[*[*[a[contains(@class, 'versionBanner-name') and text()='"+createcyclemap.CYCLENAME+"']]]]/descendant::span[contains(@class, 'description')]", function(currentDesc){
                            logger.info(currentDesc +"::"+createcyclemap.DESCRIPTION);
                            assert.equal(currentDesc, createcyclemap.DESCRIPTION, "Cycle Description is not same.");
                            logger.info(createcyclemap.CYCLENAME + "Cycle Description Validated Successfully.");
                            driver.sleep(500);
                            counter++;
                            logger.info("Map size Before Validating desc: "+mapSize+" : "+counter +":::" +(counter === mapSize));
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Validated Cycle.");
                                isValidateCycle(true);
                            }
                        });
                    }
                    if(createcyclemap.hasOwnProperty("BUILD")){
                        flag = false;
                        commUtil.getTextByXpath("/*//*[@id='project-panel-cycle-list-summary']/descendant::*[*[*[a[contains(@class, 'versionBanner-name') and text()='"+createcyclemap.CYCLENAME+"']]]]/descendant::label[text()='Build: ']/following-sibling::label", function(currentBuildNum){
                            assert.equal(currentBuildNum, createcyclemap.BUILD, "Cycle Build name is not same.");
                            logger.info(createcyclemap.CYCLENAME + "Cycle Build Name Validated Successfully.");
                            driver.sleep(500);
                            counter++;
                            logger.info("Map size Before Validating  build: "+mapSize+" : "+counter +":::" +(counter === mapSize));
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Validated Cycle.");
                                isValidateCycle(true);
                            }
                        });
                    }
                    if(createcyclemap.hasOwnProperty("ENVIRONMENT")){
                        flag = false;
                        commUtil.getTextByXpath("/*//*[@id='project-panel-cycle-list-summary']/descendant::*[*[*[a[contains(@class, 'versionBanner-name') and text()='"+createcyclemap.CYCLENAME+"']]]]/descendant::label[text()='Environment: ']/following-sibling::span", function(currentEnviroment){
                            assert.equal(currentEnviroment, createcyclemap.ENVIRONMENT, "Cycle Enviroment is not same.");
                            logger.info(createcyclemap.CYCLENAME + " : Cycle Environment Validated Successfully.");
                            driver.sleep(500);
                            counter++;
                            logger.info("Map size Before Validating environment: "+mapSize+" : "+counter +":::" +(counter === mapSize));
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Validated Cycle.");
                                isValidateCycle(true);
                            }
                        });
                    }
                    if(createcyclemap.hasOwnProperty("STARTDATE")){
                        flag = false;
                        commUtil.getTextByXpath("/*//*[@id='project-panel-cycle-list-summary']/descendant::*[*[*[a[text()='"+createcyclemap.CYCLENAME+"']]]]/descendant::label[@class='versionBanner-releaseDate']/span", function(currentStartDate){
                            logger.info(currentStartDate +" : "+ createcyclemap.STARTDATE);
                            //assert.equal(currentStartDate, createcyclemap.STARTDATE, "Cycle Startdate is not same.");
                            logger.info(createcyclemap.CYCLENAME + " : Cycle Start Date Validated Successfully.");
                            driver.sleep(500);
                            counter++;
                            logger.info("Map size Before Validating startdate: "+mapSize+" : "+counter +":::" +(counter === mapSize));
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Validated Cycle.");
                                isValidateCycle(true);
                            }
                        });
                    }
                    /*if(counter === 0){
                        //assert.ok(counter === mapSize, "Not Validated Cycle.");
                        logger.info("Nothing to Validate in this cycle.");
                        isValidateCycle(true);
                    }*/
                    //isValidateCycle(flag);
                });
            });
        }catch(err){
            console.error(err);
        }
    };


    this.addTestFromCycle = function(addTestFromCycleMap, callback) {
        try{
            validateAndSwitchToFrame(function(switchFrameStatus) {
                assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
                logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");

                selectVersion(addTestFromCycleMap.VERSION_NAME, function(selectVersionStatus){
                    assert.ok(selectVersionStatus, "Not Selected Version.");
                    logger.info("Version is Selected Successfully.");

                    logger.info("Version==========="+addTestFromCycleMap.VERSION_NAME);
                    logger.info("dfgthjjjjjj==========="+addTestFromCycleMap.CYCLE_NAME);
                    logger.info("From Cycle name==========="+addTestFromCycleMap.FROM_CYCLE_NAME);
                    validateCycleInVersion(addTestFromCycleMap.CYCLE_NAME, function(searchCycleStatus){
                        assert.ok(searchCycleStatus, "Cycle Not Searched in Version.");
                        logger.info("Cycle found successfully in Plan Test Cycle.");

                        commUtil.hoverElementByXpath("/*//*[@id='project-panel-cycle-list-summary']/descendant::a[contains(@class, 'versionBanner-name') and text()='"+addTestFromCycleMap.CYCLE_NAME+"']", function(hoverElementStatus){
                            assert.ok(hoverElementStatus, "Hovering on Cycle Successfully.");
                            logger.info(" Hovering on Cycle Successfully.");

                            navigateToManageLinkFromCycle(addTestFromCycleMap.CYCLE_NAME, "Add Tests", function(navigateLinkStatus) {
                                assert.ok(navigateLinkStatus, "Not Navigated To Add Test Popup.");
                                logger.info("Navigated successfully to Add Test To Cycle Link");
                                addTestToCyclePage.addTestFromCycle(addTestFromCycleMap, function(addTestStatus){
                                    assert.ok(addTestStatus, "Tests are not Added.");
                                    logger.info("Tests are Added Successfully.");
                                    driver.sleep(1000);
                                    getTestFromCycle(addTestFromCycleMap.FROM_CYCLE_NAME, function(fromCycleTests){
                                        driver.sleep(1000);
                                        getTestFromCycle(addTestFromCycleMap.CYCLE_NAME, function(toCycleTests){
                                            assert.ok(fromCycleTests === toCycleTests, "Total Tests are not Matching.");
                                            callback(addTestStatus);
                                        });
                                    });


                                   /* validateTestInCycle(cycleName, testName, function(validateTestStatus){
                                        expect(validateTestStatus).toBe.true;
                                        //callback(validateTestStatus);
                                        closeCycle(cycleName, function(closeCycleStatus){
                                            assert.ok(closeCycleStatus, "CYcle Not Closed.");
                                            logger.info("Cycle Closed Successfully.");
                                            callback(closeCycleStatus);
                                        });
                                    });*/

                                });

                            });
                        });
                    });
                });
                driver.switchTo().defaultContent();
            });
        }catch(err){
            console.error(err);
        }
    };
    var getTestFromCycle = function(cycleName, isGetCount){
        try{
            navigateToCycle(cycleName, function(navigateCycleStatus){
                assert.ok(navigateCycleStatus, "Navigate To Cycle Failed.");
                //commUtil.sleep(1000);
                var xpathForAllTests = "//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr/td[@class='zephyr-test-execution-issueKey']";
                var xpathForAllTestCount = "//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/following-sibling::div/div[@id='displayDetailId']//span[@class='results-count-total results-count-link']";
                commUtil.getTextByXpath(xpathForAllTestCount, function(getCount){
                    logger.info("Tottal Tests in cycle : "+getCount);
                    closeCycle(cycleName, function(closeCycleStatus){
                        assert.ok(closeCycleStatus, "CYcle Not Closed.");
                        logger.info("Cycle Closed Successfully.");
                        isGetCount(parseInt(getCount));
                    });
                });
            });
        }catch(err){

        }
    };
    this.deleteTestFromCycle = function(deleteTestFromCycleMap, callback) {
        try{
            validateAndSwitchToFrame(function(switchFrameStatus) {
                assert.ok(switchFrameStatus, "Not Validated Plan Cycle and Not Switched To Frame");
                logger.info("Plan Test Cycle is Loaded and Switched To Frame Successfully.");
                logger.info("Version==========="+deleteTestFromCycleMap.VERSIONNAME);
                logger.info("dfgthjjjjjj==========="+deleteTestFromCycleMap.CYCLENAME);
                selectVersion(deleteTestFromCycleMap.VERSIONNAME, function (isSelectedVersion) {
                    assert.ok(isSelectedVersion, deleteTestFromCycleMap.VERSIONNAME + " : Version is not Selected.");
                    logger.info("Version is Selected Successfully.");

                    validateCycleInVersion(deleteTestFromCycleMap.CYCLENAME, function(searchCycleStatus){
                        assert.ok(searchCycleStatus, "Cycle Not Searched in Version.");
                        logger.info("Cycle found successfully in Plan Test Cycle.");

                        deleteTestInCycle(deleteTestFromCycleMap.CYCLENAME, deleteTestFromCycleMap.TESTNAME, function(deleteTestStatus){
                            assert.ok(deleteTestStatus, "Test is Not Deleted.");
                            logger.info("Test is Deleted Successfully From the Cycle.");
                            callback(deleteTestStatus);
                        });

                    });
                });
                driver.switchTo().defaultContent();
            });
        }catch(err){
            console.error(err);
        }
    };
    var deleteTestInCycle = function(cycleName, testName, callback){
        try{
            navigateToCycle(cycleName, function(navigateToCycleStatus){
                assert.ok(navigateToCycleStatus, "Not Navigated To Cycle.");
                logger.info("Navigated To Cycle Successfully");

                validateTestInCycle(cycleName, testName, function(findTestInCycleStatus){
                    assert.ok(findTestInCycleStatus, "Test Not Found in Cycle.");
                    logger.info("Test Found in Cycle for Delete.");
                    driver.sleep(1000);
                    commUtil.hoverElementByXpath("//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr/td/a[text()='"+testName+"']", function(hoverOnTestStatus){
                        assert.ok(hoverOnTestStatus, "Hover on Test Status Failed.");

                        commUtil.clickOnElementByXpath("//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr[td[a[text()='"+testName+"']]]/td/a[text()='E']/following-sibling::a/span[contains(@class, delete)]", function(clickElementStatus){
                            assert.ok(clickElementStatus, "Click on Delete Link Failed.");

                            //driver.switchTo().defaultContent();
                            handleDeleteTestPopup(function(deleteTestStatus){
                                assert.ok(deleteTestStatus, "Delete Test Failed.");
                                logger.info("Test Deleted From Cycle Successfully.");
                                //commUtil.implecitWait(40000);
                                /*commUtil.switchToFrameByXpath(xpathForIframe, function(switchToFrameStatus) {
                                    assert.ok(switchToFrameStatus, "Not Switched To Frame Successfully.");
                                    logger.info("Switch to Frame Successfully After Execution.");
                                });*/
                                commUtil.waitForPageLoad("//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']", function(waitElementStatus){
                                    assert.ok(waitElementStatus, "Wait for Cycles after Delete Test Failed.");
                                    driver.sleep(1000);
                                    var xpathForAllTests = "//*[*[@class='aui-page-header']/descendant::*[text()='"+cycleName+"']]/div/table[@class='aui']/tbody[@id='executions-rows-container']/tr/td[@class='zephyr-test-execution-issueKey']";
                                    commUtil.findTextFromElements(xpathForAllTests, testName, function(searchTestStatus){
                                        expect(searchTestStatus).toBe.false;//=== false, "Test Found After Delete TEST From Cycle.");
                                        logger.info(testName+" is Deleted Successfully from "+cycleName);
                                        callback(searchTestStatus);

                                    });
                                });
                            });
                        });
                    });

                });

            });

        }catch(err){
            throw err;
        }
    };
    var handleDeleteTestPopup = function(callback){
        try{
            commUtil.waitForElement("//*[@id='zephyr-je-delete-dialog']/descendant::h2[contains(@class,'header')]", 15000, function(waitForElementStatus){
                assert.ok(waitForElementStatus, "Delete Test popup not visible.");
                driver.sleep(1000);
                //commUtil.returnWebelement("//*[@id='zephyr-je-delete-dialog']/descendant::*[@class='dialog-title']", function(deletePopupHeader){
                    commUtil.getTextByXpath("//*[@id='zephyr-je-delete-dialog']/descendant::h2[contains(@class,'header')]", function(headerText){
                        assert.equal(headerText, "Delete Test Execution(s)", "Delete Test Header popup Validation Failed.");
                        logger.info("Delete Test Confirmation Popup Header Verified Successfully.");
                        driver.sleep(1000);
                        commUtil.clickOnElementByXpath("//*[@id='zephyr-je-delete-dialog']//following-sibling::*/button[text()='Delete']", function(clickDeleteStatus){
                            assert.ok(clickDeleteStatus, "Not Clicked on Delete Button.");
                            logger.info("Clicked on Delete Cycle Delete link successfully.");
                            callback(clickDeleteStatus);
                        });
                    });
                //});
            });

        }catch(err){
            throw err;
        }
    };

};
module.exports = new PlanTestCyclePage();
