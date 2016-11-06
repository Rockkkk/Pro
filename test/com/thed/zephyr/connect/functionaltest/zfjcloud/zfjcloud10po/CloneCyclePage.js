
var commUtil = require('../../utils/commUtil.js');
var CloneCyclePage = function() {
  
    /******************************************************
     *  CREATE CYCLE PAGE
     *****************************************************/

    /******************************************************
     *  WEBELEMENTS
     *****************************************************/
    var xpathForEditCycleDialog = "//*[@id='create-cycle-dialog']";
    var xpathForEditCycleHeader = "//*[@id='create-cycle-dialog']/descendant::h2[contains(@class, 'aui-dialog2')]";
    var xpathForCycleNameTextBox = "//*[@id='cycle_name']";
    var xpathForCycleDescTextBox = "//*[@id='cycle_description']";
    var xpathForCycleBuildTestBox = "//*[@id='cycle_build']";
    var xpathForCycleEnvironmentTextBox = "//*[@id='cycle_environment']";
    var xpathForCycleStartDateTextBox = "//*[@id='cycle_startDate']";
    var xpathForCycleEndDateTextBox = "//*[@id='cycle_endDate']";
    var xpathForCycleSaveBtn = "//*[@id='create-cycle-dialog-save-button']";
    /******************************************************
     *  PAGE OBJECT METHODS
     *****************************************************/
    this.cloneCycle = function(createcyclemap, cloneCycleMap, isEditedCycle){
        try{
            var counter = 0;
            logger.info(Object.keys(cloneCycleMap).length);
            //var mapSize = Object.keys(cloneCycleMap).length;
            var mapSize = 0;
            if(cloneCycleMap.hasOwnProperty("VERSIONNAME")){
                mapSize++;
            }
            if(cloneCycleMap.hasOwnProperty("CYCLENAME")){
                mapSize++;
            }
            if(cloneCycleMap.hasOwnProperty("DESCRIPTION")){
                mapSize++;
            }
            if(cloneCycleMap.hasOwnProperty("BUILD")){
                mapSize++;
            }
            if(cloneCycleMap.hasOwnProperty("ENVIRONMENT")){
                mapSize++;
            }
            if(cloneCycleMap.hasOwnProperty("STARTDATE")){
                mapSize++;
            }
            if(cloneCycleMap.hasOwnProperty("ENDDATE")){
                mapSize++;
            }
            //var mapSize = Object.keys(editCycleMap).length - 1;
            validateCloneCyclePage(function(validateEditCyclePopupStatus){
                assert.ok(validateEditCyclePopupStatus, "Create Cycle Popup Not Validated.");
                logger.info("Clone Cycle Popup Validated successfully.");

                if(cloneCycleMap.hasOwnProperty("VERSIONNAME")) {
                    //moveCycleMap["VERSION_NAME"] = moveCycleMap.MOVE_VERSION_NAME;
                    commUtil.getTextByXpath("//*[@id='cycle-version']", function (selectedVersion) {
                        logger.info("Selected version : " + selectedVersion);

                        //assert.equal(selectedVersion, createcyclemap.VERSIONNAME, "Validated Created cycle Version.");
                        commUtil.selectDropdownByText(driver.findElement(By.xpath("//*[@id='cycle-version']")), cloneCycleMap.VERSIONNAME, function (getSelectStatus) {
                            assert.ok(getSelectStatus, "Version not Selected Successfully.");
                            logger.info("Version Selected Successfully.");
                            counter++;
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

                if(cloneCycleMap.hasOwnProperty("CYCLENAME")){
                        //var cloneCycleName = "CLONE - "+cloneCycleMap.CYCLENAME;
                        if(cloneCycleMap.CYCLENAME === createcyclemap.CYCLENAME){
                            driver.findElement(by.xpath("//*[@id='cycle_name']")).getAttribute("value").then(function(cycleNameAttribute){
                                var cloneCycleName = "CLONE - "+cloneCycleMap.CYCLENAME;
                                cloneCycleMap["CYCLENAME"] = cloneCycleName;
                                logger.info("cLONE cYCLE nAME : "+cloneCycleMap.CYCLENAME);
                                assert.equal(cycleNameAttribute,cloneCycleMap.CYCLENAME , "Clone Cycle Default Name Not Matching.");
                                logger.info("Clone Cycle Default Name Verified Successfully.");

                                counter++;
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
                        }else{
                           // cloneCycleMap["CYCLENAME"] = cloneCycleMap.CLONECYCLENAME;
                            logger.info(cloneCycleMap.CYCLENAME+"===============================");
                            commUtil.sendTextToElement(xpathForCycleNameTextBox, cloneCycleMap.CYCLENAME, function(sendCycleNameStatus) {
                                assert.ok(sendCycleNameStatus, "Not Able To Send Cycle Name.");
                                driver.sleep(1000);
                                logger.info("New Clone Cycle Name Is Given Successfully.");

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

                        }
                    }
                if(cloneCycleMap.hasOwnProperty("DESCRIPTION")){
                    driver.findElement(by.xpath("//*[@id='cycle_description']")).getAttribute("value").then(function(cycleDesc){
                        assert.equal(cycleDesc, createcyclemap.DESCRIPTION, "Cycle Desc not matching.");
                        logger.info("Old Cycle Desc Validated Successfully, Now You can edit.");
                        logger.info("Edit cycle desc : "+cloneCycleMap.DESCRIPTION);

                        commUtil.sendTextToElement(xpathForCycleDescTextBox, cloneCycleMap.DESCRIPTION, function(sendCycleDescStatus){
                            assert.ok(sendCycleDescStatus, "Not Able To Send Cycle Description.");
                            driver.sleep(1000);
                            logger.info("Cycle Description Is Given Successfully.");
                            counter++;
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
                }
                if(cloneCycleMap.hasOwnProperty("BUILD")){
                    driver.findElement(by.xpath(xpathForCycleBuildTestBox)).getAttribute("value").then(function(cycleBuildName){
                        assert.equal(cycleBuildName, createcyclemap.BUILD, "Cycle Build name not matching.");
                        logger.info("Old Cycle Build Name Validated Successfully, Now You can edit.");

                        commUtil.sendTextToElement(xpathForCycleBuildTestBox, cloneCycleMap.BUILD, function(sendCycleBuildStatus){
                            assert.ok(sendCycleBuildStatus, "Not Able To Send Cycle BUILD.");
                            driver.sleep(500);
                            logger.info("Cycle BUILD Name Is Given Successfully.");
                            counter++;
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
                if(cloneCycleMap.hasOwnProperty("ENVIRONMENT")){
                    driver.findElement(by.xpath("//*[@id='cycle_environment']")).getAttribute("value").then(function(cycleEnvironmentName){
                        assert.equal(cycleEnvironmentName, createcyclemap.ENVIRONMENT, "Cycle Environment not matching.");
                        logger.info("Old Cycle Environment Validated Successfully, Now You can edit.");

                        commUtil.sendTextToElement(xpathForCycleEnvironmentTextBox, cloneCycleMap.ENVIRONMENT, function(sendCycleEnvStatus){
                            assert.ok(sendCycleEnvStatus, "Not Able To Send Cycle ENVIRONMENT.");
                            driver.sleep(1000);
                            logger.info("Cycle ENVIRONMENT Is Given Successfully.");
                            counter++;
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
                if(cloneCycleMap.hasOwnProperty("STARTDATE")){
                    driver.findElement(by.xpath("//*[@id='cycle_startDate']")).getAttribute("value").then(function(cycleStartDate){
                        assert.equal(cycleStartDate, createcyclemap.STARTDATE, "Cycle Start Date not matching.");
                        logger.info("Old Cycle Start Date Validated Successfully, Now You can edit.");

                        commUtil.sendTextToElement(xpathForCycleStartDateTextBox, cloneCycleMap.STARTDATE, function(sendCycleStartDateStatus){
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
                if(cloneCycleMap.hasOwnProperty("ENDDATE")){
                    driver.findElement(by.xpath("//*[@id='cycle_endDate']")).getAttribute("value").then(function(cycleName){
                        assert.equal(cycleName, createcyclemap.ENDDATE, "Cycle End Date not matching.");
                        logger.info("Old Cycle End Date Validated Successfully, Now You can edit.");

                        commUtil.sendTextToElement(xpathForCycleEndDateTextBox, cloneCycleMap.ENDDATE, function(sendCycleEndDateStatus){
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
                                        isEditedCycle(isInvisibleCycleDialogStatus);
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
        }
    };
    this.moveCycle = function(createcyclemap, moveCycleMap, isMovedCycle){
        try{
            var counter = 0;
            logger.info(Object.keys(moveCycleMap).length);
            var mapSize = Object.keys(moveCycleMap).length;
            /*if(editCycleMap.hasOwnProperty("VERSIONNAME")){
                mapSize = mapSize - 1;
            }*/
            if(moveCycleMap.hasOwnProperty("CYCLENAME")){
                mapSize = mapSize - 1;
            }
            //var mapSize = Object.keys(editCycleMap).length - 1;
            validateEditCyclePage(function(validateEditCyclePopupStatus){
                assert.ok(validateEditCyclePopupStatus, "Create Cycle Popup Not Validated.");
                logger.info("Edit Cycle Popup Validated successfully.");

                if(moveCycleMap.hasOwnProperty("VERSIONNAME")){
                    //moveCycleMap["VERSION_NAME"] = moveCycleMap.MOVE_VERSION_NAME;
                    commUtil.getTextByXpath("//*[@id='cycle-version']", function(selectedVersion){
                        logger.info("Selected version : "+selectedVersion);
                        commUtil.getAttributeValue("//*[@id='cycle-version']", "value", function(abc){
                            logger.info("get value : "+abc);
                        });
                        //assert.equal(selectedVersion, createcyclemap.VERSIONNAME, "Validated Created cycle Version.");
                        if(selectedVersion === moveCycleMap.VERSIONNAME){
                            logger.info("Version is already Selected.");
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

                                        commUtil.isElementInVisible(xpathForEditCycleDialog, function(isInvisibleCycleDialogStatus){
                                            assert.ok(isInvisibleCycleDialogStatus, "Cycle Create DiaLog is Not closed.");
                                            isMovedCycle(isInvisibleCycleDialogStatus);
                                        });
                                    });
                                }
                            });
                            /*commUtil.clickOnElementByXpath(xpathForSelectedVersion, function(clickOnVersionStatus){
                                assert.ok(clickOnVersionStatus, "Not Clicked On Version To Select.");
                                commUtil.waitForElement(xpathForAllVersion, browser.params.testdata.implicitWaitTimeMedium, function(waitForAllVersionList){
                                    assert.ok(waitForAllVersionList, "Not Clicked On Version To Select.");

                                    commUtil.searchTextFromElements("/*//*[@id='select2-drop']/descendant::ul[@class='select2-result-sub']/li/div[@class='select2-result-label']", versionName, function(findVersionStatus){
                                        assert.ok(findVersionStatus, "Not Found Version From Drop down menu");
                                        var xpathForParticularVersion = "/*//*[@id='select2-drop']/descendant::ul[@class='select2-result-sub']/li/div[@class='select2-result-label' and text()='"+versionName+"']";
                                        commUtil.clickOnElementByXpath(xpathForParticularVersion, function(clickOnVersionStatus){
                                            assert.ok(clickOnVersionStatus, "Not Selected Version From Drop down menu");
                                            logger.info(versionName + " : version is selected successfully.");
                                            isSelectedVersion(clickOnVersionStatus);
                                        });
                                    });
                                });*/
                            //});
                        }
                    });

                   /* driver.findElement(by.xpath(xpathForCycleNameTextBox)).getAttribute("value").then(function(cycleName){
                        assert.equal(cycleName, createcyclemap.CYCLENAME, "Cycle name not matching.");
                        logger.info("Old Cycle Name Validated Successfully, Now You can edit.");
                        commUtil.sendTextToElement(xpathForCycleNameTextBox, editCycleMap.CYCLENAME, function(sendCycleNameStatus){
                            assert.ok(sendCycleNameStatus, "Not Able To Send Cycle Name.");
                            driver.sleep(1000);
                            logger.info("New Cycle Name Is Given Successfully.");
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
                    });*/
                }
            });

        }catch(err){
            console.error(err);
            isMovedCycle(false);
        }
        /*try{
            validateEditCyclePage(function(validateEditCyclePopupStatus){
                assert.ok(validateEditCyclePopupStatus, "Create Cycle Popup Not Validated.");
                logger.info("Edit Cycle Popup Validated successfully.");

                if(moveCycleMap.hasOwnProperty("MOVE_VERSION_NAME")){
                    *//*if(editCycleMap.hasOwnProperty("MOVE_VERSION_NAME")){
                        editCycleMap["VERSIONNAME"] = editCycleMap.MOVE_VERSION_NAME;
                    }*//*
                    // logger.info("currentSelectedVersion : "+currentSelectedVersion);
                    moveCycleMap["VERSION_NAME"] = moveCycleMap.MOVE_VERSION_NAME;
                    commUtil.returnWebelement("/*//*[@id='cycle-version']", function(element){

                        commUtil.getText(element, function(selectedVersion){
                            logger.info("currentSelectedVersion : "+selectedVersion);
                            if(selectedVersion === moveCycleMap.MOVE_VERSION_NAME){
                                logger.info("Version is already Selected.");
                                callback(true);

                            } else {
                                commUtil.selectDropdownByText(element, moveCycleMap.MOVE_VERSION_NAME, function(getSelectStatus){
                                    assert.ok(getSelectStatus, "Version not Selected Successfully.");
                                    logger.info("Version Selected Successfully.");
                                });
                                *//*element.click().then(function(versionClickStatus){
                                 expect(versionClickStatus).toBe.true;
                                 commUtil.sleep(2000);
                                 commUtil.waitForElement("*//**//*//**//**//**//*[@id='select2-drop']", function(waitElementStatus){
                                 expect(waitElementStatus).toBe.true;
                                 logger.info("Version select Drop down is visible Now.");
                                 commUtil.sleep(1000);


                                 });

                                 });*//*
                            }
                        });
                    });
                    driver.sleep(1000);
                }
                if(moveCycleMap.hasOwnProperty("MOVE_CYCLE_NAME")){
                    driver.findElement(by.xpath("/*//*[@id='cycle_name']")).getAttribute("value").then(function(cycleName){
                        assert.equal(cycleName, moveCycleMap.CYCLENAME, "Cycle name not matching.");
                        logger.info("Old Cycle Name Validated Successfully, Now You can edit.");
                        moveCycleMap["CYCLENAME"] = moveCycleMap.MOVE_CYCLE_NAME;
                        driver.findElement(by.xpath("/*//*[@id='cycle_name']")).clear();
                        driver.findElement(by.xpath("/*//*[@id='cycle_name']")).sendKeys(moveCycleMap.CYCLENAME);
                    });
                    // expect(driver.findElement(by.xpath("/*//*[@id='cycle_name']")).getAttribute("value")).toEqual(createcyclemap.CYCLENAME);

                    driver.sleep(1000);
                }
                *//*if(editCycleMap.hasOwnProperty("DESCRIPTION")){
                    driver.findElement(by.xpath("/*//*[@id='cycle_description']")).getAttribute("value").then(function(cycleDesc){
                        assert.equal(cycleDesc, createcyclemap.DESCRIPTION, "Cycle Desc not matching.");
                        logger.info("Old Cycle Desc Validated Successfully, Now You can edit.");
                        logger.info("  edit cycle desc : "+moveCycleMap.DESCRIPTION);
                        driver.findElement(by.xpath("/*//*[@id='cycle_description']")).clear();
                        driver.findElement(by.xpath("/*//*[@id='cycle_description']")).sendKeys(moveCycleMap.DESCRIPTION);
                    });
                    driver.sleep(1000);
                }
                if(editCycleMap.hasOwnProperty("BUILD")){
                    driver.findElement(by.xpath("/*//*[@id='cycle_build']")).getAttribute("value").then(function(cycleBuildName){
                        assert.equal(cycleBuildName, createcyclemap.BUILD, "Cycle Build name not matching.");
                        logger.info("Old Cycle Build Name Validated Successfully, Now You can edit.");
                        driver.findElement(by.xpath("/*//*[@id='cycle_build']")).clear();
                        driver.findElement(by.xpath("/*//*[@id='cycle_build']")).sendKeys(moveCycleMap.BUILD);
                    });
                    driver.sleep(1000);
                }
                if(editCycleMap.hasOwnProperty("ENVIROMENT")){
                    driver.findElement(by.xpath("/*//*[@id='cycle_environment']")).getAttribute("value").then(function(cycleEnvironmentName){
                        assert.equal(cycleEnvironmentName, createcyclemap.ENVIROMENT, "Cycle Environment not matching.");
                        logger.info("Old Cycle Environment Validated Successfully, Now You can edit.");
                        driver.findElement(by.xpath("/*//*[@id='cycle_environment']")).clear();
                        driver.sleep(1000);
                        driver.findElement(by.xpath("/*//*[@id='cycle_environment']")).sendKeys(moveCycleMap.ENVIROMENT);
                    });
                    driver.sleep(1000);
                }
                if(editCycleMap.hasOwnProperty("STARTDATE")){
                    driver.findElement(by.xpath("/*//*[@id='cycle_startDate']")).getAttribute("value").then(function(cycleStartDate){
                        assert.equal(cycleStartDate, createcyclemap.STARTDATE, "Cycle Start Date not matching.");
                        logger.info("Old Cycle Start Date Validated Successfully, Now You can edit.");
                        driver.findElement(by.xpath("/*//*[@id='cycle_startDate']")).clear();
                        driver.findElement(by.xpath("/*//*[@id='cycle_startDate']")).sendKeys(moveCycleMap.STARTDATE);
                    });
                    driver.sleep(1000);
                }
                if(editCycleMap.hasOwnProperty("ENDDATE")){
                    driver.findElement(by.xpath("/*//*[@id='cycle_endDate']")).getAttribute("value").then(function(cycleName){
                        assert.equal(cycleName, createcyclemap.ENDDATE, "Cycle End Date not matching.");
                        logger.info("Old Cycle End Date Validated Successfully, Now You can edit.");
                        driver.findElement(by.xpath("/*//*[@id='cycle_endDate']")).clear();
                        driver.findElement(by.xpath("/*//*[@id='cycle_endDate']")).sendKeys(moveCycleMap.ENDDATE);
                    });
                    driver.sleep(1000);
                }*//*
                commUtil.moveToElementByXpath("/*//*[@id='create-cycle-dialog']/descendant::button[text()='Save']");
                commUtil.clickOnElementByxpath("/*//*[@id='create-cycle-dialog']/descendant::button[text()='Save']", function(clickOnSaveButtonStatus){
                    assert.ok(clickOnSaveButtonStatus, "Save button Not Clicked.");
                    logger.info("Clicked on Save Link of Cycle successfully.");
                    //commUtil.sleep(5000);
                    callback(clickOnSaveButtonStatus);
                    *//* commUtil.waitForElementToBeInvisible("//a[@id='pdb-create-cycle-dialog']", function(waitForElementInvisibleStatus){
                     assert.ok(waitForElementInvisibleStatus, "Create Cycle Popup is Still visible.");
                     callback(waitForElementInvisibleStatus);
                     });*//*
                });
            });

        }catch(err){
            console.error(err);
        }*/
    };




    /******************************************************
     *  PAGE REUSABLE METHODS
     *****************************************************/
    var validateCloneCyclePage = function(isValidateEditCyclePage) {
        try{
            commUtil.waitForElement(xpathForEditCycleDialog, browser.params.testdata.implicitWaitTimeMedium, function(waitForEditCyclePopup){
                assert.ok(waitForEditCyclePopup, "Not Able To Load Edit Cycle popup.");
                commUtil.moveToElementByXpath(xpathForEditCycleDialog, function(moveToCycleDialogStatus){
                    assert.ok(moveToCycleDialogStatus, "Not Able To Move To Edit Cycle popup.");
                    commUtil.getTextByXpath(xpathForEditCycleHeader, function(createCycleHeaderPopup) {
                        assert.ok((createCycleHeaderPopup.indexOf("Clone Cycle") != -1), "Edit Cycle Header Not Matching.");
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
 module.exports = new CloneCyclePage();
