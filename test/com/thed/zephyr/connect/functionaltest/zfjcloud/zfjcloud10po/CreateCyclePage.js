
var commUtil = require('../../utils/commUtil.js');
var CreateCyclePage = function() {
  
    /******************************************************
     *  CREATE CYCLE PAGE
     *****************************************************/

    /******************************************************
     *  WEBELEMENTS
     *****************************************************/
    var xpathForCreateCycleDialog = "//*[@id='create-cycle-dialog']";
    var xpathForCreateCycleHeader = "//*[@id='create-cycle-dialog']/descendant::h2[contains(@class, 'aui-dialog2')]";
    var xpathForCycleNameTextBox = "//*[@id='cycle_name']";
    var xpathForCycleDescTextBox = "//*[@id='cycle_description']";
    var xpathForCycleBuildTestBox = "//*[@id='cycle_build']";
    var xpathForCycleEnvironmentTextBox = "//*[@id='cycle_environment']";
    var xpathForCycleStartDateTextBox = "//*[@id='cycle_startDate']";
    var xpathForCycleEndDateTextBox = "//*[@id='cycle_endDate']";
    var xpathForCycleSaveBtn = "//*[@id='create-cycle-dialog']/descendant::button[text()='Save']";
    /******************************************************
     *  PAGE OBJECT METHODS
     *****************************************************/
    this.createCycle = function(createcyclemap, isCreateCycle){
        try{
            var counter = 0;
            logger.info(Object.keys(createcyclemap).length);
            var mapSize = 0;
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
            if(createcyclemap.hasOwnProperty("ENDDATE")){
                mapSize++;
            }
            validateCreateCyclePage(function(validateCreateCyclePopupStatus){
                assert.ok(validateCreateCyclePopupStatus, "Create Cycle Popup Not Validated.");
                logger.info("Create Cycle Popup Validated successfully.");
                if(createcyclemap.hasOwnProperty("CYCLENAME")){
                    commUtil.sendTextToElement(xpathForCycleNameTextBox, createcyclemap.CYCLENAME, function(sendCycleNameStatus){
                        assert.ok(sendCycleNameStatus, "Not Able To Send Cycle Name.");
                        driver.sleep(1000);
                        logger.info("Cycle Name Is Given Successfully.");
                        counter++;
                        logger.info(counter +" : "+mapSize);
                        if(counter === mapSize){
                            assert.ok(counter === mapSize, "Not Created Cycle.");
                            commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                logger.info("Clicked on create Cycle successfully.");

                                isCreateCycle(clickOnSaveButtonStatus);
                                /*commUtil.isElementInVisible(xpathForCreateCycleDialog, function(isInvisibleCycleDialogStatus){
                                    assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                    isCreateCycle(isInvisibleCycleDialogStatus);
                                });*/
                            });
                        }
                    });
                }
                if(createcyclemap.hasOwnProperty("DESCRIPTION")){
                    commUtil.sendTextToElement(xpathForCycleDescTextBox, createcyclemap.DESCRIPTION, function(sendCycleDescStatus){
                        assert.ok(sendCycleDescStatus, "Not Able To Send Cycle Description.");
                        driver.sleep(1000);
                        logger.info("Cycle Description Is Given Successfully.");
                        counter++;
                        logger.info(counter + " : "+mapSize);
                        if(counter === mapSize){
                            assert.ok(counter === mapSize, "Not Created Cycle.");
                            commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                logger.info("Clicked on create Cycle successfully.");

                                isCreateCycle(clickOnSaveButtonStatus);
                                /*commUtil.isElementInVisible(xpathForCreateCycleDialog, function(isInvisibleCycleDialogStatus){
                                    assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                    isCreateCycle(isInvisibleCycleDialogStatus);
                                });*/
                            });
                        }
                    });
                }
                if(createcyclemap.hasOwnProperty("BUILD")){
                    commUtil.sendTextToElement(xpathForCycleBuildTestBox, createcyclemap.BUILD, function(sendCycleBuildStatus){
                        assert.ok(sendCycleBuildStatus, "Not Able To Send Cycle BUILD.");
                        driver.sleep(1000);
                        logger.info("Cycle BUILD Name Is Given Successfully.");
                        counter++;
                        logger.info(counter + " : "+mapSize);
                        if(counter === mapSize){
                            assert.ok(counter === mapSize, "Not Created Cycle.");
                            commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                logger.info("Clicked on create Cycle successfully.");

                                isCreateCycle(clickOnSaveButtonStatus);
                                /*commUtil.isElementInVisible(xpathForCreateCycleDialog, function(isInvisibleCycleDialogStatus){
                                    assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                    isCreateCycle(isInvisibleCycleDialogStatus);
                                });*/
                            });
                        }
                    });
                }
                if(createcyclemap.hasOwnProperty("ENVIRONMENT")){
                    commUtil.sendTextToElement(xpathForCycleEnvironmentTextBox, createcyclemap.ENVIRONMENT, function(sendCycleEnvStatus){
                        assert.ok(sendCycleEnvStatus, "Not Able To Send Cycle ENVIRONMENT.");
                        driver.sleep(1000);
                        logger.info("Cycle ENVIRONMENT Is Given Successfully.");
                        counter++;
                        logger.info(counter + " : "+mapSize);
                        if(counter === mapSize){
                            assert.ok(counter === mapSize, "Not Created Cycle.");
                            commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                logger.info("Clicked on create Cycle successfully.");

                                isCreateCycle(clickOnSaveButtonStatus);
                                /*commUtil.isElementInVisible(xpathForCreateCycleDialog, function(isInvisibleCycleDialogStatus){
                                    assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                    isCreateCycle(isInvisibleCycleDialogStatus);
                                });*/
                            });
                        }
                    });
                }
                if(createcyclemap.hasOwnProperty("STARTDATE")){
                    commUtil.sendTextToElement(xpathForCycleStartDateTextBox, createcyclemap.STARTDATE, function(sendCycleStartDateStatus){
                        assert.ok(sendCycleStartDateStatus, "Not Able To Send Cycle START DATE.");
                        driver.sleep(1000);
                        logger.info("Cycle START DATE Is Given Successfully.");
                        counter++;
                        logger.info(counter + " : "+mapSize);
                        if(counter === mapSize){
                            assert.ok(counter === mapSize, "Not Created Cycle.");
                            commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                logger.info("Clicked on create Cycle successfully.");

                                isCreateCycle(clickOnSaveButtonStatus);
                                /*commUtil.isElementInVisible(xpathForCreateCycleDialog, function(isInvisibleCycleDialogStatus){
                                    assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                    isCreateCycle(isInvisibleCycleDialogStatus);
                                });*/
                            });
                        }
                    });
                }
                if(createcyclemap.hasOwnProperty("ENDDATE")){
                    commUtil.sendTextToElement(xpathForCycleEndDateTextBox, createcyclemap.ENDDATE, function(sendCycleEndDateStatus){
                        assert.ok(sendCycleEndDateStatus, "Not Able To Send Cycle EndDate.");
                        driver.sleep(1000);
                        logger.info("Cycle End Date Is Given Successfully.");
                        counter++;
                        logger.info(counter + " : "+mapSize);
                        if(counter === mapSize){
                            assert.ok(counter === mapSize, "Not Created Cycle.");
                            commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                logger.info("Clicked on create Cycle successfully.");

                                isCreateCycle(clickOnSaveButtonStatus);
                                /*commUtil.isElementInVisible(xpathForCreateCycleDialog, function(isInvisibleCycleDialogStatus){
                                    assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                    isCreateCycle(isInvisibleCycleDialogStatus);
                                });*/
                            });
                        }
                    });
                }
                //commUtil.moveToElementByXpath("//*[@id='create-cycle-dialog']/descendant::button[text()='Save']");


            });

        }catch(err){
            console.error(err);
            isCreateCycle(false);
        }
    };


    
    /******************************************************
     *  PAGE REUSABLE METHODS
     *****************************************************/
    validateCreateCyclePage = function(isValidateCreateCyclePage) {
        try{
            commUtil.waitForElement(xpathForCreateCycleDialog, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateCyclePopup){
                assert.ok(waitForCreateCyclePopup, "Not Able To Load Create Cycle popup.");
                commUtil.moveToElementByXpath(xpathForCreateCycleDialog, function(moveToCycleDialogStatus){
                    assert.ok(moveToCycleDialogStatus, "Not Able To Move To Create Cycle popup.");
                    commUtil.getTextByXpath(xpathForCreateCycleHeader, function(createCycleHeaderPopup) {
                        assert.ok((createCycleHeaderPopup.indexOf("Create New Cycle") != -1), "Create Cycle Header Not Matching.");
                        isValidateCreateCyclePage(true);
                    });
                });
            });
        }catch(err){
          console.error(err);
          isValidateCreateCyclePage(false);
        }
    };
 };
 module.exports = new CreateCyclePage();