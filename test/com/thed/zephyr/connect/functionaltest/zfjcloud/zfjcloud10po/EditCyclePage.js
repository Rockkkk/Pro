
var commUtil = require('../../utils/commUtil.js');
var EditCyclePage = function() {
  
    /******************************************************
     *  CREATE CYCLE PAGE
     *****************************************************/

    /******************************************************
     *  WEBELEMENTS
     *****************************************************/
    var xpathForEditCycleDialog = "//*[@id='edit-cycle-dialog']";
    var xpathForEditCycleHeader = "//*[@id='edit-cycle-dialog']/descendant::h2[contains(@class, 'aui-dialog2')]";
    var xpathForCycleNameTextBox = "//*[@id='cycle_name']";
    var xpathForCycleDescTextBox = "//*[@id='cycle_description']";
    var xpathForCycleBuildTestBox = "//*[@id='cycle_build']";
    var xpathForCycleEnvironmentTextBox = "//*[@id='cycle_environment']";
    var xpathForCycleStartDateTextBox = "//*[@id='cycle_startDate']";
    var xpathForCycleEndDateTextBox = "//*[@id='cycle_endDate']";
    var xpathForCycleSaveBtn = "//*[@id='edit-cycle-dialog-save-button']";
    /******************************************************
     *  PAGE OBJECT METHODS
     *****************************************************/
    this.editCycle = function(createcyclemap, editCycleMap, isEditedCycle){
        try{
            var counter = 0;
            logger.info(Object.keys(editCycleMap).length);
            var mapSize = Object.keys(editCycleMap).length;
            if(editCycleMap.hasOwnProperty("VERSIONNAME")){
//                mapSize = mapSize - 1;
                mapSize = mapSize;
            }
            //var mapSize = Object.keys(editCycleMap).length - 1;
            validateEditCyclePage(function(validateEditCyclePopupStatus){
                assert.ok(validateEditCyclePopupStatus, "Create Cycle Popup Not Validated.");
                logger.info("Edit Cycle Popup Validated successfully.");

                if(editCycleMap.hasOwnProperty("VERSIONNAME")) {
                    //moveCycleMap["VERSION_NAME"] = moveCycleMap.MOVE_VERSION_NAME;
                    commUtil.getTextByXpath("//*[@id='cycle-version']", function (selectedVersion) {
                        logger.info("Selected version : " + selectedVersion);

                        //assert.equal(selectedVersion, createcyclemap.VERSIONNAME, "Validated Created cycle Version.");
                        commUtil.selectDropdownByText(driver.findElement(By.xpath("//*[@id='cycle-version']")), editCycleMap.VERSIONNAME, function (getSelectStatus) {
                            assert.ok(getSelectStatus, "Version not Selected Successfully.");
                            logger.info("Version Selected Successfully.");
                            counter++;
                            logger.info(counter +" : "+mapSize);
                            if (counter === mapSize) {
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function (clickOnSaveButtonStatus) {
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");

                                    isEditedCycle(clickOnSaveButtonStatus);
                                    /*commUtil.isElementInVisible(xpathForEditCycleDialog, function (isInvisibleCycleDialogStatus) {
                                        assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                        isEditedCycle(isInvisibleCycleDialogStatus);
                                    });*/
                                });
                            }
                        });
                    });
                        /*if (selectedVersion.indexOf(editCycleMap.VERSIONNAME) != -1) {
                            logger.info("Version is already Selected.");
                            counter++;
                            if (counter === mapSize) {
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function (clickOnSaveButtonStatus) {
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");

                                    commUtil.isElementInVisible(xpathForEditCycleDialog, function (isInvisibleCycleDialogStatus) {
                                        assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                        isEditedCycle(isInvisibleCycleDialogStatus);
                                    });
                                });
                            }
                        } else {
                            logger.info("Inside  ======================" + editCycleMap.VERSIONNAME);

                        }
                    });*/
                }

                if(editCycleMap.hasOwnProperty("CYCLENAME")){
                    driver.findElement(by.xpath(xpathForCycleNameTextBox)).getAttribute("value").then(function(cycleName){
                        assert.equal(cycleName, createcyclemap.CYCLENAME, "Cycle name not matching.");
                        logger.info("Old Cycle Name Validated Successfully, Now You can edit.");
                        commUtil.sendTextToElement(xpathForCycleNameTextBox, editCycleMap.CYCLENAME, function(sendCycleNameStatus){
                            assert.ok(sendCycleNameStatus, "Not Able To Send Cycle Name.");
                            driver.sleep(1000);
                            logger.info("New Cycle Name Is Given Successfully.");
                            counter++;
                            logger.info(counter +" : "+mapSize);
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");

                                    isEditedCycle(clickOnSaveButtonStatus);
                                    /*commUtil.isElementInVisible(xpathForEditCycleDialog, function(isInvisibleCycleDialogStatus){
                                        assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                        isEditedCycle(isInvisibleCycleDialogStatus);
                                    });*/
                                });
                            }
                        });
                    });
                    /*driver.findElement(by.xpath("/*//*[@id='cycle_name']")).getAttribute("value").then(function(cycleName){
                        assert.equal(cycleName, createcyclemap.CYCLENAME, "Cycle name not matching.");
                        logger.info("Old Cycle Name Validated Successfully, Now You can edit.");
                        driver.findElement(by.xpath("/*//*[@id='cycle_name']")).clear();
                        driver.findElement(by.xpath("/*//*[@id='cycle_name']")).sendKeys(editCycleMap.CYCLENAME);
                    });*/
                   // expect(driver.findElement(by.xpath("//*[@id='cycle_name']")).getAttribute("value")).toEqual(createcyclemap.CYCLENAME);

                    //driver.sleep(1000);
                }
                if(editCycleMap.hasOwnProperty("DESCRIPTION")){
                    driver.findElement(by.xpath("//*[@id='cycle_description']")).getAttribute("value").then(function(cycleDesc){
                        assert.equal(cycleDesc, createcyclemap.DESCRIPTION, "Cycle Desc not matching.");
                        logger.info("Old Cycle Desc Validated Successfully, Now You can edit.");
                        logger.info("Edit cycle desc : "+editCycleMap.DESCRIPTION);

                        commUtil.sendTextToElement(xpathForCycleDescTextBox, editCycleMap.DESCRIPTION, function(sendCycleDescStatus){
                            assert.ok(sendCycleDescStatus, "Not Able To Send Cycle Description.");
                            driver.sleep(1000);
                            logger.info("Cycle Description Is Given Successfully.");
                            counter++;
                            logger.info(counter +" : "+mapSize);
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");

                                    isEditedCycle(clickOnSaveButtonStatus);
                                    /*commUtil.isElementInVisible(xpathForEditCycleDialog, function(isInvisibleCycleDialogStatus){
                                        assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                        isEditedCycle(isInvisibleCycleDialogStatus);
                                    });*/
                                });
                            }
                        });
                    });
                   /* driver.findElement(by.xpath("/*//*[@id='cycle_description']")).getAttribute("value").then(function(cycleDesc){
                        assert.equal(cycleDesc, createcyclemap.DESCRIPTION, "Cycle Desc not matching.");
                        logger.info("Old Cycle Desc Validated Successfully, Now You can edit.");
                        logger.info("Edit cycle desc : "+editCycleMap.DESCRIPTION);
                        driver.findElement(by.xpath("/*//*[@id='cycle_description']")).clear();
                        driver.findElement(by.xpath("/*//*[@id='cycle_description']")).sendKeys(editCycleMap.DESCRIPTION);
                    });*/
                }
                if(editCycleMap.hasOwnProperty("BUILD")){
                    driver.findElement(by.xpath(xpathForCycleBuildTestBox)).getAttribute("value").then(function(cycleBuildName){
                        assert.equal(cycleBuildName, createcyclemap.BUILD, "Cycle Build name not matching.");
                        logger.info("Old Cycle Build Name Validated Successfully, Now You can edit.");

                        commUtil.sendTextToElement(xpathForCycleBuildTestBox, editCycleMap.BUILD, function(sendCycleBuildStatus){
                            assert.ok(sendCycleBuildStatus, "Not Able To Send Cycle BUILD.");
                            driver.sleep(500);
                            logger.info("Cycle BUILD Name Is Given Successfully.");
                            counter++;
                            logger.info(counter +" : "+mapSize);
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");

                                    isEditedCycle(clickOnSaveButtonStatus);
                                    /*commUtil.isElementInVisible(xpathForEditCycleDialog, function(isInvisibleCycleDialogStatus){
                                        assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                        isEditedCycle(isInvisibleCycleDialogStatus);
                                    });*/
                                });
                            }
                        });
                    });

                    /*driver.findElement(by.xpath("/*//*[@id='cycle_build']")).getAttribute("value").then(function(cycleBuildName){
                        assert.equal(cycleBuildName, createcyclemap.BUILD, "Cycle Build name not matching.");
                        logger.info("Old Cycle Build Name Validated Successfully, Now You can edit.");
                        driver.findElement(by.xpath("/*//*[@id='cycle_build']")).clear();
                        driver.findElement(by.xpath("/*//*[@id='cycle_build']")).sendKeys(editCycleMap.BUILD);
                    });
                    driver.sleep(1000);*/
                }
                if(editCycleMap.hasOwnProperty("ENVIRONMENT")){
                    driver.findElement(by.xpath("//*[@id='cycle_environment']")).getAttribute("value").then(function(cycleEnvironmentName){
                        assert.equal(cycleEnvironmentName, createcyclemap.ENVIRONMENT, "Cycle Environment not matching.");
                        logger.info("Old Cycle Environment Validated Successfully, Now You can edit.");

                        commUtil.sendTextToElement(xpathForCycleEnvironmentTextBox, editCycleMap.ENVIRONMENT, function(sendCycleEnvStatus){
                            assert.ok(sendCycleEnvStatus, "Not Able To Send Cycle ENVIRONMENT.");
                            driver.sleep(1000);
                            logger.info("Cycle ENVIRONMENT Is Given Successfully.");
                            counter++;
                            logger.info(counter +" : "+mapSize);
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");

                                    isEditedCycle(clickOnSaveButtonStatus);
                                    /*commUtil.isElementInVisible(xpathForEditCycleDialog, function(isInvisibleCycleDialogStatus){
                                        assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                        isEditedCycle(isInvisibleCycleDialogStatus);
                                    });*/
                                });
                            }
                        });
                    });
                   /* driver.findElement(by.xpath("/*//*[@id='cycle_environment']")).getAttribute("value").then(function(cycleEnvironmentName){
                        assert.equal(cycleEnvironmentName, createcyclemap.ENVIROMENT, "Cycle Environment not matching.");
                        logger.info("Old Cycle Environment Validated Successfully, Now You can edit.");
                        driver.findElement(by.xpath("/*//*[@id='cycle_environment']")).clear();
                        driver.sleep(1000);
                        driver.findElement(by.xpath("/*//*[@id='cycle_environment']")).sendKeys(editCycleMap.ENVIROMENT);
                    });
                    driver.sleep(1000);*/
                }
                if(editCycleMap.hasOwnProperty("STARTDATE")){
                    driver.findElement(by.xpath("//*[@id='cycle_startDate']")).getAttribute("value").then(function(cycleStartDate){
                        assert.equal(cycleStartDate, createcyclemap.STARTDATE, "Cycle Start Date not matching.");
                        logger.info("Old Cycle Start Date Validated Successfully, Now You can edit.");

                        commUtil.sendTextToElement(xpathForCycleStartDateTextBox, editCycleMap.STARTDATE, function(sendCycleStartDateStatus){
                            assert.ok(sendCycleStartDateStatus, "Not Able To Send Cycle START DATE.");
                            driver.sleep(1000);
                            logger.info("Cycle START DATE Is Given Successfully.");
                            counter++;
                            logger.info(counter +" : "+mapSize);
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");

                                    isEditedCycle(clickOnSaveButtonStatus);
                                    /*commUtil.isElementInVisible(xpathForEditCycleDialog, function(isInvisibleCycleDialogStatus){
                                        assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                        isEditedCycle(isInvisibleCycleDialogStatus);
                                    });*/
                                });
                            }
                        });
                    });
                    /*driver.findElement(by.xpath("/*//*[@id='cycle_startDate']")).getAttribute("value").then(function(cycleStartDate){
                        assert.equal(cycleStartDate, createcyclemap.STARTDATE, "Cycle Start Date not matching.");
                        logger.info("Old Cycle Start Date Validated Successfully, Now You can edit.");
                        driver.findElement(by.xpath("/*//*[@id='cycle_startDate']")).clear();
                        driver.findElement(by.xpath("/*//*[@id='cycle_startDate']")).sendKeys(editCycleMap.STARTDATE);
                    });
                    driver.sleep(1000);*/
                }
                if(editCycleMap.hasOwnProperty("ENDDATE")){
                    driver.findElement(by.xpath("//*[@id='cycle_endDate']")).getAttribute("value").then(function(cycleName){
                        assert.equal(cycleName, createcyclemap.ENDDATE, "Cycle End Date not matching.");
                        logger.info("Old Cycle End Date Validated Successfully, Now You can edit.");

                        commUtil.sendTextToElement(xpathForCycleEndDateTextBox, editCycleMap.ENDDATE, function(sendCycleEndDateStatus){
                            assert.ok(sendCycleEndDateStatus, "Not Able To Send Cycle EndDate.");
                            driver.sleep(1000);
                            logger.info("Cycle End Date Is Given Successfully.");
                            counter++;
                            logger.info(counter +" : "+mapSize);
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");

                                    isEditedCycle(clickOnSaveButtonStatus);
                                    /*commUtil.isElementInVisible(xpathForEditCycleDialog, function(isInvisibleCycleDialogStatus){
                                        assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                        isEditedCycle(isInvisibleCycleDialogStatus);
                                    });*/
                                });
                            }
                        });
                    });
                    /*driver.findElement(by.xpath("/*//*[@id='cycle_endDate']")).getAttribute("value").then(function(cycleName){
                        assert.equal(cycleName, createcyclemap.ENDDATE, "Cycle End Date not matching.");
                        logger.info("Old Cycle End Date Validated Successfully, Now You can edit.");
                        driver.findElement(by.xpath("/*//*[@id='cycle_endDate']")).clear();
                        driver.findElement(by.xpath("/*//*[@id='cycle_endDate']")).sendKeys(editCycleMap.ENDDATE);
                    });
                    driver.sleep(1000);*/
                }
            });

        }catch(err){
            console.error(err);
        }
    };
    this.moveCycle = function(createcyclemap, moveCycleMap, isMovedCycle){
        try{
            var counter = 0;
            //logger.info(Object.keys(moveCycleMap).length);
            //var mapSize = Object.keys(moveCycleMap).length;
            /*if(editCycleMap.hasOwnProperty("VERSIONNAME")){
                mapSize = mapSize - 1;
            }*/
            var mapSize = 0;
            if(createcyclemap.hasOwnProperty("VERSIONNAME")){
                mapSize++;
            }
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
            validateEditCyclePage(function(validateEditCyclePopupStatus){
                assert.ok(validateEditCyclePopupStatus, "Create Cycle Popup Not Validated.");
                logger.info("Edit Cycle Popup Validated successfully.");

                if(moveCycleMap.hasOwnProperty("VERSIONNAME")){
                    //moveCycleMap["VERSION_NAME"] = moveCycleMap.MOVE_VERSION_NAME;
                    commUtil.getTextByXpath("//*[@id='cycle-version']", function(selectedVersion){
                        logger.info("Selected version : "+selectedVersion);
                        /*commUtil.getAttributeValue("//!*[@id='cycle-version']", "value", function(abc){
                            logger.info("get value : "+abc);
                        });*/
                        //assert.equal(selectedVersion, createcyclemap.VERSIONNAME, "Validated Created cycle Version.");
                        if(selectedVersion === moveCycleMap.VERSIONNAME){
                            logger.info("Version is already Selected.");
                            counter++;
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");

                                    isMovedCycle(clickOnSaveButtonStatus);
                                    /*commUtil.isElementInVisible(xpathForEditCycleDialog, function(isInvisibleCycleDialogStatus){
                                        assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                        isMovedCycle(isInvisibleCycleDialogStatus);
                                    });*/
                                });
                            }
                        } else {
                            logger.info("Inside  ======================"+moveCycleMap.VERSIONNAME);
                            commUtil.selectDropdownByText(driver.findElement(By.xpath("//*[@id='cycle-version']")), moveCycleMap.VERSIONNAME, function(getSelectStatus){
                                assert.ok(getSelectStatus, "Version not Selected Successfully.");
                                logger.info("Version Selected Successfully.");
                                counter++;
                                if(counter === mapSize){
                                    assert.ok(counter === mapSize, "Not Created Cycle.");
                                    commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                        assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                        logger.info("Clicked on Save Cycle successfully.");

                                        isMovedCycle(clickOnSaveButtonStatus);
                                        /*commUtil.isElementInVisible(xpathForEditCycleDialog, function(isInvisibleCycleDialogStatus){
                                            assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                            isMovedCycle(isInvisibleCycleDialogStatus);
                                        });*/
                                    });
                                }
                            });
                        }
                    });
                }
                if(moveCycleMap.hasOwnProperty("CYCLENAME")){
                    driver.findElement(by.xpath(xpathForCycleNameTextBox)).getAttribute("value").then(function(cycleName){
                        assert.equal(cycleName, createcyclemap.CYCLENAME, "Cycle name not matching.");
                        logger.info("Old Cycle Name Validated Successfully, Now You can edit.");
                        commUtil.sendTextToElement(xpathForCycleNameTextBox, moveCycleMap.CYCLENAME, function(sendCycleNameStatus){
                            assert.ok(sendCycleNameStatus, "Not Able To Send Cycle Name.");
                            driver.sleep(1000);
                            logger.info("New Cycle Name Is Given Successfully.");
                            counter++;
                            logger.info(counter +" : "+mapSize);
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");

                                    isMovedCycle(clickOnSaveButtonStatus);
                                });
                            }
                        });
                    });
                }
                if(moveCycleMap.hasOwnProperty("DESCRIPTION")){
                    driver.findElement(by.xpath("//*[@id='cycle_description']")).getAttribute("value").then(function(cycleDesc){
                        assert.equal(cycleDesc, createcyclemap.DESCRIPTION, "Cycle Desc not matching.");
                        logger.info("Old Cycle Desc Validated Successfully, Now You can edit.");
                        logger.info("Edit cycle desc : "+moveCycleMap.DESCRIPTION);

                        commUtil.sendTextToElement(xpathForCycleDescTextBox, moveCycleMap.DESCRIPTION, function(sendCycleDescStatus){
                            assert.ok(sendCycleDescStatus, "Not Able To Send Cycle Description.");
                            driver.sleep(1000);
                            logger.info("Cycle Description Is Given Successfully.");
                            counter++;
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");
                                    isMovedCycle(clickOnSaveButtonStatus);
                                    /*commUtil.isElementInVisible(xpathForEditCycleDialog, function(isInvisibleCycleDialogStatus){
                                     assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                     isEditedCycle(isInvisibleCycleDialogStatus);
                                     });*/
                                });
                            }
                        });
                    });
                }
                if(moveCycleMap.hasOwnProperty("BUILD")){
                    driver.findElement(by.xpath(xpathForCycleBuildTestBox)).getAttribute("value").then(function(cycleBuildName){
                        assert.equal(cycleBuildName, createcyclemap.BUILD, "Cycle Build name not matching.");
                        logger.info("Old Cycle Build Name Validated Successfully, Now You can edit.");

                        commUtil.sendTextToElement(xpathForCycleBuildTestBox, moveCycleMap.BUILD, function(sendCycleBuildStatus){
                            assert.ok(sendCycleBuildStatus, "Not Able To Send Cycle BUILD.");
                            driver.sleep(500);
                            logger.info("Cycle BUILD Name Is Given Successfully.");
                            counter++;
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");
                                    isMovedCycle(clickOnSaveButtonStatus);
                                    /*commUtil.isElementInVisible(xpathForEditCycleDialog, function(isInvisibleCycleDialogStatus){
                                     assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                     isEditedCycle(isInvisibleCycleDialogStatus);
                                     });*/
                                });
                            }
                        });
                    });

                    /*driver.findElement(by.xpath("/*//*[@id='cycle_build']")).getAttribute("value").then(function(cycleBuildName){
                     assert.equal(cycleBuildName, createcyclemap.BUILD, "Cycle Build name not matching.");
                     logger.info("Old Cycle Build Name Validated Successfully, Now You can edit.");
                     driver.findElement(by.xpath("/*//*[@id='cycle_build']")).clear();
                     driver.findElement(by.xpath("/*//*[@id='cycle_build']")).sendKeys(editCycleMap.BUILD);
                     });
                     driver.sleep(1000);*/
                }
                if(moveCycleMap.hasOwnProperty("ENVIRONMENT")){
                    driver.findElement(by.xpath("//*[@id='cycle_environment']")).getAttribute("value").then(function(cycleEnvironmentName){
                        assert.equal(cycleEnvironmentName, createcyclemap.ENVIRONMENT, "Cycle Environment not matching.");
                        logger.info("Old Cycle Environment Validated Successfully, Now You can edit.");

                        commUtil.sendTextToElement(xpathForCycleEnvironmentTextBox, moveCycleMap.ENVIRONMENT, function(sendCycleEnvStatus){
                            assert.ok(sendCycleEnvStatus, "Not Able To Send Cycle ENVIRONMENT.");
                            driver.sleep(1000);
                            logger.info("Cycle ENVIRONMENT Is Given Successfully.");
                            counter++;
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");
                                    isMovedCycle(clickOnSaveButtonStatus);
                                    /*commUtil.isElementInVisible(xpathForEditCycleDialog, function(isInvisibleCycleDialogStatus){
                                     assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                     isEditedCycle(isInvisibleCycleDialogStatus);
                                     });*/
                                });
                            }
                        });
                    });
                    /* driver.findElement(by.xpath("/*//*[@id='cycle_environment']")).getAttribute("value").then(function(cycleEnvironmentName){
                     assert.equal(cycleEnvironmentName, createcyclemap.ENVIROMENT, "Cycle Environment not matching.");
                     logger.info("Old Cycle Environment Validated Successfully, Now You can edit.");
                     driver.findElement(by.xpath("/*//*[@id='cycle_environment']")).clear();
                     driver.sleep(1000);
                     driver.findElement(by.xpath("/*//*[@id='cycle_environment']")).sendKeys(editCycleMap.ENVIROMENT);
                     });
                     driver.sleep(1000);*/
                }
                if(moveCycleMap.hasOwnProperty("STARTDATE")){
                    driver.findElement(by.xpath("//*[@id='cycle_startDate']")).getAttribute("value").then(function(cycleStartDate){
                        assert.equal(cycleStartDate, createcyclemap.STARTDATE, "Cycle Start Date not matching.");
                        logger.info("Old Cycle Start Date Validated Successfully, Now You can edit.");

                        commUtil.sendTextToElement(xpathForCycleStartDateTextBox, moveCycleMap.STARTDATE, function(sendCycleStartDateStatus){
                            assert.ok(sendCycleStartDateStatus, "Not Able To Send Cycle START DATE.");
                            driver.sleep(1000);
                            logger.info("Cycle START DATE Is Given Successfully.");
                            counter++;
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");

                                    commUtil.isElementInVisible(xpathForEditCycleDialog, function(isInvisibleCycleDialogStatus){
                                        assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                        isEditedCycle(isInvisibleCycleDialogStatus);
                                    });
                                });
                            }
                        });
                    });
                    /*driver.findElement(by.xpath("/*//*[@id='cycle_startDate']")).getAttribute("value").then(function(cycleStartDate){
                     assert.equal(cycleStartDate, createcyclemap.STARTDATE, "Cycle Start Date not matching.");
                     logger.info("Old Cycle Start Date Validated Successfully, Now You can edit.");
                     driver.findElement(by.xpath("/*//*[@id='cycle_startDate']")).clear();
                     driver.findElement(by.xpath("/*//*[@id='cycle_startDate']")).sendKeys(editCycleMap.STARTDATE);
                     });
                     driver.sleep(1000);*/
                }
                if(moveCycleMap.hasOwnProperty("ENDDATE")){
                    driver.findElement(by.xpath("//*[@id='cycle_endDate']")).getAttribute("value").then(function(cycleName){
                        assert.equal(cycleName, createcyclemap.ENDDATE, "Cycle End Date not matching.");
                        logger.info("Old Cycle End Date Validated Successfully, Now You can edit.");

                        commUtil.sendTextToElement(xpathForCycleEndDateTextBox, moveCycleMap.ENDDATE, function(sendCycleEndDateStatus){
                            assert.ok(sendCycleEndDateStatus, "Not Able To Send Cycle EndDate.");
                            driver.sleep(1000);
                            logger.info("Cycle End Date Is Given Successfully.");
                            counter++;
                            if(counter === mapSize){
                                assert.ok(counter === mapSize, "Not Created Cycle.");
                                commUtil.clickOnElementByXpath(xpathForCycleSaveBtn, function(clickOnSaveButtonStatus){
                                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                                    logger.info("Clicked on Save Cycle successfully.");

                                    commUtil.isElementInVisible(xpathForEditCycleDialog, function(isInvisibleCycleDialogStatus){
                                        assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                        isMovedCycle(isInvisibleCycleDialogStatus);
                                    });
                                });
                            }
                        });
                    });
                    /*driver.findElement(by.xpath("/*//*[@id='cycle_endDate']")).getAttribute("value").then(function(cycleName){
                     assert.equal(cycleName, createcyclemap.ENDDATE, "Cycle End Date not matching.");
                     logger.info("Old Cycle End Date Validated Successfully, Now You can edit.");
                     driver.findElement(by.xpath("/*//*[@id='cycle_endDate']")).clear();
                     driver.findElement(by.xpath("/*//*[@id='cycle_endDate']")).sendKeys(editCycleMap.ENDDATE);
                     });
                     driver.sleep(1000);*/
                }
            });

        }catch(err){
            console.error(err);
            isMovedCycle(false);
        }
    };




    /******************************************************
     *  PAGE REUSABLE METHODS
     *****************************************************/
    validateEditCyclePage = function(isValidateEditCyclePage) {
        try{
            commUtil.waitForElement(xpathForEditCycleDialog, browser.params.testdata.implicitWaitTimeMedium, function(waitForEditCyclePopup){
                assert.ok(waitForEditCyclePopup, "Not Able To Load Edit Cycle popup.");
                commUtil.moveToElementByXpath(xpathForEditCycleDialog, function(moveToCycleDialogStatus){
                    assert.ok(moveToCycleDialogStatus, "Not Able To Move To Edit Cycle popup.");
                    commUtil.getTextByXpath(xpathForEditCycleHeader, function(createCycleHeaderPopup) {
                        assert.ok((createCycleHeaderPopup.indexOf("Edit Cycle") != -1), "Edit Cycle Header Not Matching.");
                        isValidateEditCyclePage(true);
                    });
                });
            });
        }catch(err){
            console.error(err);
            isValidateEditCyclePage(false);
        }
    };
 };
 module.exports = new EditCyclePage();
