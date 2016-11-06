var commUtil = require('../../utils/commUtil.js');
var viewTestPage = require('./ViewTestPage.js');
var ExecuteTestPage = function() {

    /******************************************************
     *  EXECUTE TEST PAGE
     *****************************************************/

    /******************************************************
     *  WEBELEMENTS
     *****************************************************/
    var xpathForIframe = "//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__general-search-test-executions_provider']";
    var xpathOfTestCycleTab = element(by.xpath("//li[a[strong[text()='Test Cycles']]]"));
    var xpathOfTestCycleTitle = element(by.xpath("//*[@id='project-tab']/descendant::h2"));
    var xpathForStepTable = "//*[@id='teststepDetails']";
    //CommentField xpaths
    var xpathForCommentField = "//*[text()='Comment: ']/following-sibling::div/*[@id='comment-val']";
    var xpathForCommentTextArea = "//*[text()='Comment: ']/following-sibling::div/*[@id='schedule-comment-area']";
    var xpathForCommentAddBtn = "//*[text()='Comment: ']/following-sibling::div/div/*[@id='schedule-comment-area-update']";
    /******************************************************
     *  PAGE OBJECT METHODS
     *****************************************************/
    this.changeExecutionStatus = function(executeTestMap, isChangeExecutionStatus) {
        try{
            var testLevelCounter = 0;
            var stepLevelCounter = 0;
            var testLevelExecutionSize = 0;
            var stepLevelExecutionSize = 0;
            if(executeTestMap.hasOwnProperty("TESTSTATUS")){
                testLevelExecutionSize++;
            }
            if(executeTestMap.hasOwnProperty("TESTDEFECT")){
                testLevelExecutionSize++;
            }
            if(executeTestMap.hasOwnProperty("TESTCOMMENT")){
                testLevelExecutionSize++;
            }
            if(executeTestMap.hasOwnProperty("ATTACHMENT")){
                testLevelExecutionSize++;
            }
            if(executeTestMap.hasOwnProperty("STEPSTATUS")){
                testLevelExecutionSize++;
            }
            if(executeTestMap.hasOwnProperty("STEPDEFECT")){
                testLevelExecutionSize++;
            }
            if(executeTestMap.hasOwnProperty("STEPCOMMENT")){
                testLevelExecutionSize++;
            }
            if(executeTestMap.hasOwnProperty("RETURNTOTEST")){
                testLevelExecutionSize++;
            }
            validateExecuteTestPage(function(validateTitleStatus){
                assert.ok(validateTitleStatus, "Not validated Execute Test page.");
                logger.info("Execute Test Page Title Validated successfully.");

                commUtil.switchToFrameByXpath(xpathForIframe, function(switchToFrameStatus){
                    assert.ok(switchToFrameStatus, "Not Switched To frame in Execute Test page.");
                    logger.info("Switch to Frame Successfully in execute Test Page.");

                    validateExecuteTestPageHeader(executeTestMap, function(validateExecuteTestPageHeaderStatus){
                        assert.ok(validateExecuteTestPageHeaderStatus, "Not Validated Execute Test Page Header.");
                        logger.info("Execute Test Page Header Validated Successfully.");

                        if(executeTestMap.hasOwnProperty("TESTSTATUS")){
                            changeTestExecStatus(executeTestMap.TESTSTATUS, function(getChangeStatus, getExecByName, getExecOnDate){
                                assert.ok(getChangeStatus, "Not Changed The Test Status.");
                                executeTestMap["EXECUTEDBY"] = getExecByName;
                                executeTestMap["EXECUTEDON"] = getExecOnDate;
                                logger.info("Executed By"+executeTestMap.EXECUTEDBY);
                                logger.info("Executed On"+executeTestMap.EXECUTEDON);
                                logger.info("Status is selected successfully.");

                                testLevelCounter++;
                                if (testLevelCounter === testLevelExecutionSize) {
                                    returnToPlanTestCycle(function(returnStatus){
                                        assert.ok(returnStatus, "Not Clicked On Return To Plan Test Cycle Page.");
                                        isChangeExecutionStatus(returnStatus);
                                    });
                                }

                            });
                        }
                        if(executeTestMap.hasOwnProperty("TESTDEFECT")){
                            if(executeTestMap.TESTDEFECT === "NEW DEFECT"){
                                var createTestMap = {
                                    ISSUETYPE: executeTestMap.TESTDEFECTTYPE,
                                    SUMMARY : executeTestMap.TESTDEFECTSUMMARY
                                    //PRIORITY : "Minor"
                                };
                                addNewDefectToTest(createTestMap, function(addedDefect){
                                    assert.ok(addedDefect != null, "Not Added Test Defect");
                                    logger.info("Defect is added Successfully.");
                                    executeTestMap["TESTDEFECT"] = addedDefect;
                                    validateCurrentDefect(executeTestMap.TESTDEFECT, function (validateCurrDefectStatus) {
                                        assert.ok(validateCurrDefectStatus, "Not Validated Test Defect.");
                                        logger.info("Added Defect Validated Successfully.");

                                        testLevelCounter++;
                                        if (testLevelCounter === testLevelExecutionSize) {
                                            returnToPlanTestCycle(function(returnStatus){
                                                assert.ok(returnStatus, "Not Clicked On Return To Plan Test Cycle Page.");
                                                isChangeExecutionStatus(returnStatus);
                                            });
                                        }
                                    });
                                });
                            }else{
                                addDefectToTest(executeTestMap.TESTDEFECT, function(addDefectStatus){
                                    assert.ok(addDefectStatus, "Not Added Test Defect");
                                    logger.info("Defect is added Successfully.");

                                    validateCurrentDefect(executeTestMap.TESTDEFECT, function (validateCurrDefectStatus) {
                                        assert.ok(validateCurrDefectStatus, "Not Validated Test Defect.");
                                        logger.info("Added Defect Validated Successfully.");

                                        testLevelCounter++;
                                        if (testLevelCounter === testLevelExecutionSize) {
                                            returnToPlanTestCycle(function(returnStatus){
                                                assert.ok(returnStatus, "Not Clicked On Return To Plan Test Cycle Page.");
                                                isChangeExecutionStatus(returnStatus);
                                            });
                                        }
                                    });
                                });
                            }

                        }
                        if(executeTestMap.hasOwnProperty("TESTCOMMENT")){
                            if(executeTestMap.hasOwnProperty("TESTEDITCOMMENT")){
                                editTestComment(executeTestMap.TESTCOMMENT, executeTestMap.TESTEDITCOMMENT, function(isAddedComment){
                                    assert.ok(isAddedComment, "Not Added Comment While Edit.");

                                    testLevelCounter++;
                                    if (testLevelCounter === testLevelExecutionSize) {
                                        returnToPlanTestCycle(function(returnStatus){
                                            assert.ok(returnStatus, "Not Clicked On Return To Plan Test Cycle Page.");
                                            isChangeExecutionStatus(returnStatus);
                                        });
                                    }
                                });
                            }else{
                                addCommentToTest(executeTestMap.TESTCOMMENT, function(isAddedComment){
                                    assert.ok(isAddedComment, "Not Added Comment While Edit.");

                                    testLevelCounter++;
                                    logger.info(testLevelCounter +" :: "+testLevelExecutionSize);
                                    if (testLevelCounter === testLevelExecutionSize) {
                                        returnToPlanTestCycle(function(returnStatus){
                                            assert.ok(returnStatus, "Not Clicked On Return To Plan Test Cycle Page.");
                                            isChangeExecutionStatus(returnStatus);
                                        });
                                    }
                                });
                            }
                        }
                        if(executeTestMap.hasOwnProperty("ATTACHMENT")){
                            addAttachmentsToTest(executeTestMap.ATTACHMENT, function(uploadAttachmentStatus){
                                assert.ok(uploadAttachmentStatus, "Not Uploaded Attachment.");

                                testLevelCounter++;
                                if (testLevelCounter === testLevelExecutionSize) {
                                    returnToPlanTestCycle(function(returnStatus){
                                        assert.ok(returnStatus, "Not Clicked On Return To Plan Test Cycle Page.");
                                        isChangeExecutionStatus(returnStatus);
                                    });
                                }

                            });
                        }
                        if(executeTestMap.hasOwnProperty("STEPSTATUS")){
                            returnSteps(function(totalSteps) {
                                logger.info("Total Steps are : " + totalSteps);
                                assert.ok(totalSteps >= 0, "No Steps are there in this Test To execute Test.");

                                changeStepExecStatus(executeTestMap.STEPNUM, executeTestMap.STEPSTATUS, function(changeStepExecutionStatus){
                                    assert.ok(changeStepExecutionStatus, "Not Changed Step Status.");
                                    logger.info("Status is selected successfully.");

                                    testLevelCounter++;
                                    if (testLevelCounter === testLevelExecutionSize) {
                                        returnToPlanTestCycle(function(returnStatus){
                                            assert.ok(returnStatus, "Not Clicked On Return To Plan Test Cycle Page.");
                                            isChangeExecutionStatus(returnStatus);
                                        });
                                    }

                                });
                            });
                        }
                        if(executeTestMap.hasOwnProperty("STEPDEFECT")){
                            if(executeTestMap.STEPDEFECT === "NEW DEFECT"){
                                addStepNewDefect(executeTestMap, function(isAddedStepDefect){
                                    assert.ok(isAddedStepDefect, "Not Added Step Defect.");
                                    logger.info("Step defect Added Successfully.");

                                    testLevelCounter++;
                                    if (testLevelCounter === testLevelExecutionSize) {
                                        returnToPlanTestCycle(function(returnStatus){
                                            assert.ok(returnStatus, "Not Clicked On Return To Plan Test Cycle Page.");
                                            isChangeExecutionStatus(returnStatus);
                                        });
                                    }
                                });
                            }else{
                                addStepExistingDefect(executeTestMap.STEPNUM, executeTestMap.STEPDEFECT, function(isAddedStepDefect){
                                    assert.ok(isAddedStepDefect, "Not Added Step Defect.");
                                    logger.info("Step defect Added Successfully.");

                                    testLevelCounter++;
                                    if (testLevelCounter === testLevelExecutionSize) {
                                        returnToPlanTestCycle(function(returnStatus){
                                            assert.ok(returnStatus, "Not Clicked On Return To Plan Test Cycle Page.");
                                            isChangeExecutionStatus(returnStatus);
                                        });
                                    }
                                });
                            }
                        }
                        if(executeTestMap.hasOwnProperty("STEPCOMMENT")){
                            if(executeTestMap.hasOwnProperty("STEPEDITCOMMENT")){
                                editStepComment(executeTestMap.STEPNUM, executeTestMap.STEPCOMMENT, executeTestMap.STEPCOMMENT, function(isAddedComment){
                                    assert.ok(isAddedComment, "Not Added Comment While Edit.");

                                    testLevelCounter++;
                                    if (testLevelCounter === testLevelExecutionSize) {
                                        returnToPlanTestCycle(function(returnStatus){
                                            assert.ok(returnStatus, "Not Clicked On Return To Plan Test Cycle Page.");
                                            isChangeExecutionStatus(returnStatus);
                                        });
                                    }
                                });
                            }else{
                                addCommentToStep(executeTestMap.STEPNUM, executeTestMap.STEPCOMMENT, function(isAddedComment){
                                    assert.ok(isAddedComment, "Not Added Comment While Edit.");

                                    testLevelCounter++;
                                    if (testLevelCounter === testLevelExecutionSize) {
                                        returnToPlanTestCycle(function(returnStatus){
                                            assert.ok(returnStatus, "Not Clicked On Return To Plan Test Cycle Page.");
                                            isChangeExecutionStatus(returnStatus);
                                        });
                                    }
                                });
                            }
                        }
                        if(executeTestMap.hasOwnProperty("RETURNTOTEST")){
                            //if(executeTestMap.hasOwnProperty("TESTSTATUS")) {
                            executeTestMap["TESTSTATUS"] = executeTestMap.RETURNTOTEST;
                            changeTestExecStatus(executeTestMap.TESTSTATUS, function (getChangeStatus, getExecByName, getExecOnDate) {
                                assert.ok(getChangeStatus, "Not Changed The Test Status.");
                                executeTestMap["EXECUTEDBY"] = getExecByName;
                                executeTestMap["EXECUTEDON"] = getExecOnDate;
                                logger.info("Executed By" + executeTestMap.EXECUTEDBY);
                                logger.info("Executed On" + executeTestMap.EXECUTEDON);
                                logger.info("Status is selected successfully.");

                                testLevelCounter++;
                                if (testLevelCounter === testLevelExecutionSize) {
                                    returnToTest(function (returnToPlanTestCycleStatus) {
                                        assert.ok(returnToPlanTestCycleStatus, "Not returned To Test.");
                                        logger.info("Returned successfully to Test.");
                                        viewTestPage.validateExecutionsFromViewTestPage(executeTestMap, function (returnToTestStatus) {
                                            assert.ok(returnToTestStatus, "Not Validated View Test page.");
                                            logger.info("Return To test Page Verified Successfully.");
                                            isChangeExecutionStatus(returnToTestStatus);
                                        });
                                    });
                                }

                            });


                        }
                        if(executeTestMap.hasOwnProperty("EXECUTEALLSTEP")){

                            executeAllSteps(executeTestMap.EXECUTEALLSTEP, function(executeAllStepsStatus){
                                assert.ok(executeAllStepsStatus, "Not Executed ALl Steps.");
                                //commUtil.sleep(2000);
                                logger.info("All Steps are executed Successfully.");
                                executeAllStatusConfirmationPopup(executeTestMap.EXECUTEALLSTEP, function(executeConfirmationPopupStatus){
                                    assert.ok(executeConfirmationPopupStatus, "Not Executed Test From Execute All Confirmation Dialog.");
                                    logger.info("Confirmation popup is executed Successfully.");

                                    driver.switchTo().defaultContent();
                                    validateSuccessfulPopupInExecuteTestPage(function(validatePopupStatus){
                                        assert.ok(validatePopupStatus, "Not validated Successful Popup after Execute All Steps.");
                                        executeTestMap["TESTSTATUS"] = executeTestMap.EXECUTEALLSTEP;
                                        commUtil.switchToFrameByXpath(xpathForIframe, function(switchToFrameStatus){
                                            assert.ok(switchToFrameStatus, "Not Switched To frame in Execute Test page.");
                                            logger.info("Switch to Frame Successfully in execute Test Page.");
                                            commUtil.isElementVisible("//*[text()='Execution Status: ']/following-sibling::*/descendant::*[contains(@id, 'current-execution-status-dd-schedule')]", function(isElementVisibleStatus){
                                                assert.ok(isElementVisibleStatus, "Element is Not Visible.");
                                                validateCurrentExecInExecuteTestPage(executeTestMap.TESTSTATUS, function(validateCurrExecStatus){
                                                    assert.ok(validateCurrExecStatus, "Not Validated Test Execution Status.");
                                                    getExecutedByInExecuteTestPage(function(getExecByName){
                                                        getExecutedOnInExecuteTestPage(function(getExecOnDate){

                                                            executeTestMap["EXECUTEDBY"] = getExecByName;
                                                            executeTestMap["EXECUTEDON"] = getExecOnDate;
                                                            logger.info("Executed By"+executeTestMap.EXECUTEDBY);
                                                            logger.info("Executed On"+executeTestMap.EXECUTEDON);
                                                            logger.info("Status is selected successfully.");
                                                            returnToPlanTestCycle(function(returnStatus){
                                                                assert.ok(returnStatus, "Not Clicked On Return To Plan Test Cycle Page.");
                                                                //isChangeExecutionStatus(returnStatus, getExecByName, getExecOnDate );
                                                                isChangeExecutionStatus(returnStatus);
                                                            });
                                                        });
                                                    });
                                                });
                                                //});
                                            });
                                        });
                                    });
                                });
                            });
                        }

                    });
                    driver.switchTo().defaultContent();
                });
            });
        }catch(err){
            isChangeExecutionStatus(false);
        }
    };
    this.executeTestWithExistingDefect = function(changeTestStatus, defectID, callback) {
        try{
            validateExecuteTestPage(function(validateTitleStatus){
                assert.ok(validateTitleStatus).toBe.true;
                logger.info("Execute Test Page Title Validated successfully.");
                commUtil.switchToFrameByxpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__general-search-test-executions_provider']", function(switchToFrameStatus){
                    expect(switchToFrameStatus).toBe.true;
                    logger.info("Switch to Frame Successfully.");
                    commUtil.sleep(5000);
                    changeTestExecStatus(changeTestStatus, function(getChangeStatus, getExecByName, getExecOnDate){
                        expect(getChangeStatus).toBe.true;
                        logger.info("Status is selected successfully.");
                        addDefectToTest(defectID, function(addDefectStatus){
                            expect(addDefectStatus).toBe.true;
                            logger.info("Defect is added Successfully.");

                            validateCurrentDefect(defectID, function (validateCurrDefectStatus) {
                                expect(validateCurrDefectStatus).toBe.true;

                                returnToPlanTestCycle(function(returnStatus){
                                    expect(returnStatus).toBe.true;
                                    callback(returnStatus, getExecByName, getExecOnDate);
                                });
                            });
                        });
                    });
                    driver.switchTo().defaultContent();
                });
            });
        }catch(err){
            console.error("Execute Test Page Title not validated successfully.");
        }
    };

    addDefectToTest = function(defectID, isAddedDefect){
        try{
            var xpathForCurrentDefect = "//*[@id='current-defectpicker-status-dd-schedule']";
            var xpathForInputDefectTextBox = "//*[@id='s2id_addDefects-multi-select']/ul/li/input";
            commUtil.hoverElementByXpath(xpathForCurrentDefect, function(hoverElementStatus){
                assert.ok(hoverElementStatus, "Not Hovered On Current Defect Link.");
                commUtil.clickOnElementByXpath(xpathForCurrentDefect, function(clickOnAddDefectLinkElementStatus) {
                    assert.ok(clickOnAddDefectLinkElementStatus, "Not Hovered On Current Defect Link.");

                    commUtil.waitForPageLoad(xpathForInputDefectTextBox, function(waitForAddDefectTextBox){
                        assert.ok(waitForAddDefectTextBox, "Not Visible For Add Defect Text Box.");
                        commUtil.hoverElementByXpath(xpathForInputDefectTextBox, function(hoverElement) {
                            assert.ok(hoverElement, "Not Hovered On Add Defect text Box.");

                            commUtil.sendTextToElement(xpathForInputDefectTextBox, defectID, function (defectIDSendStatus) {
                                assert.ok(defectIDSendStatus, "Not Send Defect ID To Add Defect Box.");
                                commUtil.waitForElement("//*[@id='select2-drop']/ul", browser.params.testdata.implicitWaitTimeLow, function(searchDefectPickerStatus){
                                    assert.ok(searchDefectPickerStatus, "Not Waited For Defect Picker List.");

                                    searchDefectFromDropDownAndClick("//*[@id='select2-drop']/descendant::div[@class='select2-result-label'][h5[contains(text(),'History Search')]]/following-sibling::ul//div[@class='select2-result-label']", defectID, function (selectDefectStatus) {
                                        assert.ok(selectDefectStatus, "Not Found Defect in Defect Picker.");
                                        logger.info(" Test Defect selected successfully.");
                                        driver.sleep(1000);
                                        driver.findElement(by.xpath(".//*[@id='editable-schedule-defects']//button[@id='execution-defect-area-update']")).click().then(function(){
                                            //commUtil.clickOnElementByXpath("//*[@id='execution-defect-area-update']", function (clickOnUpdateDefectPicker) {
                                            //assert.ok(clickOnUpdateDefectPicker, "Not Clicked On Update Button Of Test Defect Picker.");
                                            logger.info("Defect added successfully.");

                                            validateSuccessfulPopupInExecuteTestPage(function (validatePopupStatus) {
                                                assert.ok(validatePopupStatus, "Not Validated Successful Popup.");
                                                commUtil.switchToFrameByXpath(xpathForIframe, function (switchToFrameStatus) {
                                                    assert.ok(switchToFrameStatus, "Not Switched To Frame After Validating Successful Message.");
                                                    logger.info("Switch to Frame After Validating Successful Message..");
                                                    commUtil.isElementVisible(".//*[@id='current-defectpicker-status-dd-schedule']/a", function (isElementVisibleStatus) {
                                                        assert.ok(isElementVisibleStatus, "Not Visible Current Defect Link After Validating Successful Popup.");
                                                        isAddedDefect(isElementVisibleStatus);
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
            /*commUtil.getTextByXpath("/*//*[@id='current-defectpicker-status-dd-schedule']/a", function(getCurrDefectStatus){
             if(getCurrDefectStatus === defectID){
             assert.equal(getCurrDefectStatus, defectID, "Not Validated Current Defect.");
             isAddedDefect(true);
             }else{

             }
             });*/
        }catch(err){
            console.error(err);
            isAddedDefect(false);
        }
    };
    var addNewDefectToTest = function(createTestMap, isAddedDefect){
        try{
            var xpathForCurrentDefect = "//*[@id='current-defectpicker-status-dd-schedule']";
            var xpathForInputDefectTextBox = "//*[@id='s2id_addDefects-multi-select']/ul/li/input";
            commUtil.hoverElementByXpath(xpathForCurrentDefect, function(hoverElementStatus){
                assert.ok(hoverElementStatus, "Not Hovered On Current Defect Link.");
                commUtil.clickOnElementByXpath(xpathForCurrentDefect, function(clickOnAddDefectLinkElementStatus) {
                    assert.ok(clickOnAddDefectLinkElementStatus, "Not Hovered On Current Defect Link.");

                    commUtil.waitForPageLoad(xpathForInputDefectTextBox, function(waitForAddDefectTextBox){
                        assert.ok(waitForAddDefectTextBox, "Not Visible For Add Defect Text Box.");
                        commUtil.hoverElementByXpath(xpathForInputDefectTextBox, function(hoverElement) {
                            assert.ok(hoverElement, "Not Hovered On Add Defect text Box.");

                            createDefectDirectly(createTestMap, function(isCreatedTest){
                                assert.ok(isCreatedTest, "Not Created Defect.");
                                logger.info("Created Defect for adding :"+createTestMap.TESTNAME);
                                commUtil.switchToFrameByXpath(xpathForIframe, function (switchToFrameStatus) {
                                    assert.ok(switchToFrameStatus, "Not Switched To Frame After Validating Successful Message.");
                                    logger.info("Switch to Frame After Validating Successful Message..");

                                    driver.findElement(by.xpath(".//*[@id='editable-schedule-defects']//button[@id='execution-defect-area-update']")).click().then(function(){
                                        //commUtil.clickOnElementByXpath("//*[@id='execution-defect-area-update']", function (clickOnUpdateDefectPicker) {
                                        //assert.ok(clickOnUpdateDefectPicker, "Not Clicked On Update Button Of Test Defect Picker.");
                                        logger.info("Defect added successfully.");

                                        validateSuccessfulPopupInExecuteTestPage(function (validatePopupStatus) {
                                            assert.ok(validatePopupStatus, "Not Validated Successful Popup.");
                                            commUtil.switchToFrameByXpath(xpathForIframe, function (switchToFrameStatus) {
                                                assert.ok(switchToFrameStatus, "Not Switched To Frame After Validating Successful Message.");
                                                logger.info("Switch to Frame After Validating Successful Message..");
                                                commUtil.isElementVisible(".//*[@id='current-defectpicker-status-dd-schedule']/a", function (isElementVisibleStatus) {
                                                    assert.ok(isElementVisibleStatus, "Not Visible Current Defect Link After Validating Successful Popup.");
                                                    isAddedDefect(createTestMap.TESTNAME);
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
            isAddedDefect(false);
        }
    };
    var createDefectDirectly = function(createTestMap, isCreated){
        try{
            var xpathForCreateBtn = "//*[@id='createIssue']";
            commUtil.waitForElement(xpathForCreateBtn, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateButtonStatus){
                assert.ok(waitForCreateButtonStatus, "Not Visible Create Button.");
                commUtil.clickOnElementByXpath(xpathForCreateBtn, function(clickOnCreateBtnStatus){
                    assert.ok(clickOnCreateBtnStatus, "Not clicked On Create Button.");
                    require('./CreateTestPage.js').createTestDirectly(createTestMap, function(isCreateTest){
                        assert.ok(isCreateTest, "Not Created test.");
                        driver.sleep(1000);
                        isCreated(isCreateTest);
                    });
                });
            });
        }catch(e){

        }
    };
    var createStepDefectDirectly = function(createTestMap, isCreated){
        try{
            var xpathForCreateBtn = "//*[@id='createIssue']";
            commUtil.waitForElement(xpathForCreateBtn, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateButtonStatus){
                assert.ok(waitForCreateButtonStatus, "Not Visible Create Button.");
                commUtil.clickOnElementByXpath(xpathForCreateBtn, function(clickOnCreateBtnStatus){
                    assert.ok(clickOnCreateBtnStatus, "Not clicked On Create Button.");
                    require('./CreateTestPage.js').createTestDirectly(createTestMap, function(isCreateTest){
                        assert.ok(isCreateTest, "Not Created test.");
                        driver.sleep(1000);
                        isCreated(isCreateTest);
                    });
                });
            });
        }catch(e){

        }
    };
    var searchDefectFromDropDownAndClick = function(xpathForElements, searchText, callback){
        var flag = false;
        try{
            //driver.findElements(By.xpath(xpathForElements)).then(function(elements){
            //element.all(by.xpath(xpathForElements)).count().then(function(elementCount){
            //count = elementCount;elements.length == 1
            commUtil.getCount(xpathForElements, function(elementCount){

                logger.info("Element size : : : "+elementCount +(elementCount === 1));
                if(elementCount === 1){
                    driver.findElement(By.xpath(xpathForElements)).getText().then(function(text){
                        logger.info("Element text : : : "+text);
                        logger.info("Element text Status : : : "+(text === searchText));
                        var arr = text.split(" - ");
                        logger.info(arr[0]);
                        if(arr[0] === searchText){
                            flag = true;
                            driver.findElement(By.xpath(xpathForElements)).click().then(function(){
                                callback(flag);
                            });
                        }
                        //callback(text === searchText);
                    }, function(){
                        callback(flag);
                    });
                }else{
                    logger.info("Else part ------- ");
                    element.all(by.xpath(xpathForElements)).each(function(element) {
                        // Will print First, Second, Third.
                        element.getText().then(function(text){
                            logger.info("Text : ::: "+text+"::"+searchText);
                            var arr = text.split(" - ");
                            logger.info(arr[0]);
                            if(arr[0] === searchText){
                                element.click().then(function(){
                                    flag = true;
                                    callback(flag);
                                });
                            }
                        }, function(err) {
                            console.error(err+ " : throwing err count......");
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
                callback(false);
            });

        }catch(err){
            console.error(err);
            callback(false);
        }

    };
    this.changeStepExecutionStatus = function(stepNum, changeStepStatus, callback) {
        try{
            validateExecuteTestPage(function(validateTitleStatus){
                expect(validateTitleStatus).toBe.true;
                logger.info("Execute Test Page Title Validated successfully.");
                commUtil.switchToFrameByxpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__general-search-test-executions_provider']", function(switchToFrameStatus){
                    expect(switchToFrameStatus).toBe.true;
                    logger.info("Switch to Frame Successfully.");
                    changeStepExecStatus(stepNum, changeStepStatus, function(getChangeStatus){
                        expect(getChangeStatus).toBe.true;
                        logger.info("Status is selected successfully.");
                        returnToPlanTestCycle(function(returnStatus){
                            expect(returnStatus).toBe.true;
                            //callback(returnStatus, getExecByName, getExecOnDate );
                            callback(returnStatus);
                        });
                        //callback(true);

                    });
                    driver.switchTo().defaultContent();
                });


            });

        }catch(err){
            console.error("Execute Test Page Title not validated successfully.");
        }
    };
    this.changeStepExecutionStatusWithExistingDefect = function(stepNum, changeStepStatus, defectID, callback) {
        try{
            validateExecuteTestPage(function(validateTitleStatus){
                expect(validateTitleStatus).toBe.true;
                logger.info("Execute Test Page Title Validated successfully.");
                commUtil.switchToFrameByxpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__general-search-test-executions_provider']", function(switchToFrameStatus){
                    expect(switchToFrameStatus).toBe.true;
                    logger.info("Switch to Frame Successfully.");
                    changeStepExecStatus(stepNum, changeStepStatus, function(getChangeStatus){
                        expect(getChangeStatus).toBe.true;
                        logger.info("Status is selected successfully.");
                        commUtil.sleep(3000);
                        addStepExistingDefect(stepNum, defectID, function(addDefectStatus){
                            expect(addDefectStatus).toBe.true;
                            callback(addDefectStatus);
                        });


                    });
                    driver.switchTo().defaultContent();
                });


            });

        }catch(err){
            console.error("Execute Test Page Title not validated successfully.");
        }
    };
    var changeTestExecStatus = function(changeStatus, callback){
        try{
            commUtil.getTextByXpath("//*[text()='Execution Status: ']/following-sibling::*/descendant::*[contains(@id, 'current-execution-status-dd-schedule')]", function(getCurrStatus){
                logger.info("Current Execution status : " + getCurrStatus);
                if(getCurrStatus === changeStatus){
                    validateCurrentExecInExecuteTestPage(changeStatus, function(validateCurrExecStatus){
                        assert.ok(validateCurrExecStatus);
                        getExecutedByInExecuteTestPage(function(getExecByName){
                            getExecutedOnInExecuteTestPage(function(getExecOnDate){
                                callback(validateCurrExecStatus, getExecByName, getExecOnDate);
                            });
                        });
                    });
                }else{
                    commUtil.hoverElementByXpath("//*[text()='Execution Status: ']/following-sibling::*[contains(@id,'execution-field-current-status-schedule')]", function(hoverElementStatus) {
                        assert.ok(hoverElementStatus, "Hover On Current Execution Status Failed.");
                        commUtil.clickOnElementByXpath("//*[text()='Execution Status: ']/following-sibling::*/descendant::*[contains(@id, 'current-execution-status-dd-schedule')]", function(elementClickStatus){
                            assert.ok(elementClickStatus, "Click on Current Execution Status Failed.");
                            commUtil.waitForPageLoad(".//*[contains(@id,'exec_status-schedule')]", function(waitElementStatus){
                                assert.ok(waitElementStatus, "Wait For Execution Status.");
                                commUtil.hoverElementByXpath("//select[contains(@id,'exec_status-schedule')]", function(hoverElementStatus){
                                    assert.ok(hoverElementStatus, "Not hovered on Status.");
                                    driver.sleep(500);
                                    commUtil.selectDropdownByText(driver.findElement(By.xpath("//select[contains(@id,'exec_status-schedule')]")), changeStatus, function(changedStatus){
                                        assert.ok(changedStatus, "Status Not Found");
                                        driver.sleep(500);
                                        commUtil.clickOnElementByXpath("//button[contains(@id,'exec_status_update')]", function(clickStatus){
                                            assert.ok(clickStatus, "Not Clicked On Update Status.");
                                            //logger.info("====================");
                                            //commUtil.implecitWait(10000);
                                            //commUtil.sleep(1000);

                                            driver.switchTo().defaultContent();
                                            validateSuccessfulPopupInExecuteTestPage(function(validatePopupStatus){
                                                assert.ok(validatePopupStatus, "Not validated Successful Popup.");
                                                commUtil.switchToFrameByXpath(xpathForIframe, function(switchToFrameStatus){
                                                    assert.ok(switchToFrameStatus, "Not Switched To Frame In After validating Successful Popup.");
                                                    logger.info("Switch to Frame Successfully.");
                                                    driver.sleep(500);
                                                    validateCurrentExecInExecuteTestPage(changeStatus, function(validateCurrExecStatus){
                                                        assert.ok(validateCurrExecStatus);
                                                        getExecutedByInExecuteTestPage(function(getExecByName){
                                                            getExecutedOnInExecuteTestPage(function(getExecOnDate){
                                                                callback(validateCurrExecStatus, getExecByName, getExecOnDate);
                                                            });
                                                        });
                                                    });
                                                    /*commUtil.isElementVisible("/*//*[text()='Execution Status: ']/following-sibling::*//*descendant::*[contains(@id, 'current-execution-status-dd-schedule')]", function(isElementVisibleStatus){
                                                     assert.ok(isElementVisibleStatus, "Element is Not Visible.");

                                                     });*/
                                                });
                                                //callback(true);
                                            });

                                        });
                                    });
                                });

                                //commUtil.selectDropdownByNumber(driver.findElement(by.xpath("//select[contains(@id,'exec_status-schedule')]")), 2, 10000);
                                //commUtil.selectDropdownByText(driver.findElement(by.xpath("//select[contains(@id,'exec_status-schedule')]")), changeStatus, 10000);


                            });
                        });
                    });
                }
            });


            /*commUtil.getTextByXpath("/*//*[text()='Execution Status: ']/following-sibling::*//*descendant::*[contains(@id, 'current-execution-status-dd-schedule')]", function(currentTestStatus){
             if(currentTestStatus === "UNEXECUTED"){

             } else {
             console.error("Test Status is not Correct.");
             }
             });*/
        }catch(err){
            throw err;
        }
    };
    changeStepExecStatus = function(stepNum, changeStatus, isChangeStepExecutionStatus){
        try{
            //var totalStep = executeTestMap.TOTALSTEP;
            var xpathForCurrentStepExec = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::dd[contains(@id, 'current-execution-status-dd-stepresult')]";
            var xpathForExecSelectStatus = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::*[contains(@id,'exec_status-stepresult')]";
            var xpathForCurrStepStatusUpdateBtn = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::*[contains(@id,'execution_update-schedule')]";
            //var xpathForCurrentStepExec = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::dd[contains(@id, 'current-execution-status-dd-stepresult')]";
            commUtil.getTextByXpath(xpathForCurrentStepExec, function(getCurrStatus){
                if(getCurrStatus === changeStatus){
                    validateCurrentStepExec(stepNum, changeStatus, function(validateCurrExecStatus){
                        assert.ok(validateCurrExecStatus, "Not Validate Current Step Execution status.");
                        isChangeStepExecutionStatus(validateCurrExecStatus);
                    });
                }else{
                    commUtil.moveToElementByXpath(xpathForStepTable, function(moveToStepTableStatus){
                        assert.ok(moveToStepTableStatus, "Not Moved To Step Table.");
                        commUtil.hoverElementByXpath(xpathForCurrentStepExec, function(hoverElementStatus){
                            assert.ok(hoverElementStatus, "Not Hovered On Element.");
                            commUtil.clickOnElementByXpath(xpathForCurrentStepExec, function(elementClickStatus){
                                assert.ok(elementClickStatus, "Not Clicked on Current Step For Change Status.");

                                commUtil.waitForElement(xpathForExecSelectStatus, browser.params.testdata.implicitWaitTimeLow, function(waitElementStatus){
                                    assert.ok(waitElementStatus, "Not Waited For Element.");
                                    driver.sleep(500);
                                    commUtil.selectDropdownByText(driver.findElement(by.xpath(xpathForExecSelectStatus)), changeStatus, function(selectStepDropDownStatus){
                                        assert.ok(selectStepDropDownStatus, "Not able To select Step Drop Down.");
                                        driver.sleep(500);
                                        commUtil.clickOnElementByXpath(xpathForCurrStepStatusUpdateBtn, function(clickOnUpdateBtnStatus){
                                            driver.sleep(100);
                                            assert.ok(clickOnUpdateBtnStatus, "Not Clicked On Update Button.");
                                            logger.info("====================");
                                            //commUtil.implecitWait(10000);
                                            //commUtil.sleep(8000);
                                            //commUtil.isElementVisible(xpathForCurrentStepExec, function(isElementVisibleStatus){
                                            //expect(isElementVisibleStatus).toBe.true;
                                            validateCurrentStepExec(stepNum, changeStatus, function(validateCurrExecStatus){
                                                assert.ok(validateCurrExecStatus, "Not Validate Current Step Execution status.");
                                                isChangeStepExecutionStatus(validateCurrExecStatus);
                                            });

                                            // });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
            });
            //commUtil.moveToElementByXpath("//*[@id='teststepDetails']");

        }catch(err){
            logger.info(err);
            isChangeStepExecutionStatus(false);
        }
    };
    addStepExistingDefect = function(stepNum, defectID, isAddedDefect){
        try{
            var xpathForCurrentStepDefect = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::div[contains(@id,'readonly-defect-values-stepresult')]";
            var xpathForCurrentStepDefects = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::div[contains(@id,'current-defectpicker-status')]/a";
            var xpathForAddDefectTextArea = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::*[contains(@id,'s2id_zephyrJEdefectskey')]/ul/li/input";
            var xpathForAddDefectUpdateBtn = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::button[contains(@id,'step-defect-area-update')]";
            /*commUtil.getTextByXpath(xpathForCurrentStepDefect, function(getCurrDefectStatus){
             if(getCurrDefectStatus === defectID){
             assert.equal(getCurrDefectStatus, defectID, "Not Validated Current Defect.");
             isAddedDefect(true);
             }else{

             }
             });*/
            commUtil.moveToElementByXpath(xpathForStepTable, function(moveToStepTableStatus){
                assert.ok(moveToStepTableStatus, "Not Moved To Step Table.");
                commUtil.hoverElementByXpath(xpathForCurrentStepDefect, function(hoverElementStatus) {
                    assert.ok(hoverElementStatus, "Not Hover On Current Defect");
                    commUtil.clickOnElementByXpath(xpathForCurrentStepDefect, function(elementClickStatus){
                        assert.ok(elementClickStatus, "Not Clicked On Current Defect Link.");
                        commUtil.waitForElement(xpathForAddDefectTextArea, browser.params.testdata.implicitWaitTimeMedium, function(waitElementStatus){
                            assert.ok(waitElementStatus, "Not Waited For Step Defect Picker");

                            commUtil.hoverElementByXpath(xpathForAddDefectTextArea, function(hoverOnDefectPickerStatus){
                                assert.ok(hoverOnDefectPickerStatus, "Not Hover On Defect Picker.");
                                commUtil.sendTextToElement(xpathForAddDefectTextArea, defectID, function(sendDefectAddStepDefect){
                                    assert.ok(sendDefectAddStepDefect, "Not Send Defect To Add Defect Text Box.");
                                    searchDefectFromDropDownAndClick("//*[@id='select2-drop']/descendant::div[@class='select2-result-label'][h5[contains(text(),'History Search')]]/following-sibling::ul//div[@class='select2-result-label']", defectID, function(searchDefectID){
                                        assert.ok(searchDefectID, "Not Search the Defect in Defect Picker List.");
                                        //commUtil.sleep(1000);
                                        logger.info("Defect is added to test but not committed.");
                                        commUtil.clickOnElementByXpath(xpathForAddDefectUpdateBtn, function(clickOnUpdateBtnStatus){
                                            assert.ok(clickOnUpdateBtnStatus, "Not Clicked On Add Step Defect Link.");
                                            logger.info("====================");
                                            //commUtil.implecitWait(10000);
                                            //commUtil.sleep(3000);
                                            commUtil.isElementVisible(xpathForCurrentStepDefects, function(isElementVisibleStatus){
                                                assert.ok(isElementVisibleStatus, "Not Visible Current Defect Link.");

                                                //isAddedDefect(isElementVisibleStatus);
                                                commUtil.getTextByXpath(xpathForCurrentStepDefect, function(getCurrDefectStatus){
                                                    assert.equal(getCurrDefectStatus, defectID, "Not Validated Current Defect.");
                                                    isAddedDefect(true);
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
            logger.info(err);
            isAddedDefect(false);
        }
    };
    var addStepNewDefect = function(executeTestMap, isAddedDefect){
        try{
            var stepNum = executeTestMap.STEPNUM;
            var xpathForCurrentStepDefect = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::div[contains(@id,'readonly-defect-values-stepresult')]";
            var xpathForCurrentStepDefects = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::div[contains(@id,'current-defectpicker-status')]/a";
            var xpathForAddDefectTextArea = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::*[contains(@id,'s2id_zephyrJEdefectskey')]/ul/li/input";
            var xpathForAddDefectUpdateBtn = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::button[contains(@id,'step-defect-area-update')]";
            var xpathForAddNewDefectBtn = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::button[text()='Create New Issue']";
            commUtil.moveToElementByXpath(xpathForStepTable, function(moveToStepTableStatus){
                assert.ok(moveToStepTableStatus, "Not Moved To Step Table.");
                logger.info("Moved to Step Defect Table to add Defect.");
                commUtil.hoverElementByXpath(xpathForCurrentStepDefect, function(hoverElementStatus) {
                    assert.ok(hoverElementStatus, "Not Hover On Current Defect");
                    commUtil.clickOnElementByXpath(xpathForCurrentStepDefect, function(elementClickStatus){
                        assert.ok(elementClickStatus, "Not Clicked On Current Defect Link.");
                        commUtil.waitForElement(xpathForAddDefectTextArea, browser.params.testdata.implicitWaitTimeMedium, function(waitElementStatus){
                            assert.ok(waitElementStatus, "Not Waited For Step Defect Picker");

                            var createTestMap = {
                                ISSUETYPE: executeTestMap.STEPDEFECTTYPE,
                                SUMMARY : executeTestMap.STEPDEFECTSUMMARY
                            };
                            commUtil.waitForElement(xpathForAddNewDefectBtn, browser.params.testdata.implicitWaitTimeMedium, function(waitForCreateButtonStatus){
                                assert.ok(waitForCreateButtonStatus, "Not Visible Create Button.");
                                commUtil.clickOnElementByXpath(xpathForAddNewDefectBtn, function(clickOnCreateBtnStatus){
                                    assert.ok(clickOnCreateBtnStatus, "Not clicked On Create Button.");
                                    require('./CreateTestPage.js').createTestDirectly(createTestMap, function(isCreateTest){
                                        assert.ok(isCreateTest, "Not Created test.");
                                        driver.sleep(1000);
                                        logger.info("Created Defect for adding :"+createTestMap.TESTNAME);
                                        commUtil.switchToFrameByXpath(xpathForIframe, function (switchToFrameStatus) {
                                            assert.ok(switchToFrameStatus, "Not Switched To Frame After Validating Successful Message.");
                                            logger.info("Switch to Frame After Validating Successful Message..");

                                            logger.info("Defect is added to test but not committed.");
                                            commUtil.clickOnElementByXpath(xpathForAddDefectUpdateBtn, function(clickOnUpdateBtnStatus){
                                                assert.ok(clickOnUpdateBtnStatus, "Not Clicked On Add Step Defect Link.");

                                                commUtil.isElementVisible(xpathForCurrentStepDefects, function(isElementVisibleStatus){
                                                    assert.ok(isElementVisibleStatus, "Not Visible Current Defect Link.");

                                                    //isAddedDefect(isElementVisibleStatus);
                                                    commUtil.getTextByXpath(xpathForCurrentStepDefect, function(getCurrDefectStatus){
                                                        assert.equal(getCurrDefectStatus, createTestMap.TESTNAME, "Not Validated Current Defect.");
                                                        isAddedDefect(true);
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
            logger.info(err);
            isAddedDefect(false);
        }
    };
    validateCurrentStepDefect = function(stepNum, defectID, isValidateCurrentStepDefect){
        var xpathForCurrentStepDefect = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::div[contains(@id,'readonly-defect-values-stepresult')]";
        commUtil.getTextByXpath(xpathForCurrentStepDefect, function(getCurrDefectStatus){
            assert.equal(getCurrDefectStatus, defectID, "Not Validated Current Defect.");
            isValidateCurrentStepDefect(true);
        });
    };
    returnToPlanTestCycle = function(callback){
        try{
            commUtil.clickOnElementByXpath("//*[@id='zephyr-je-block-back-to-cycle']", function(clickElementStatus){
                assert.ok(clickElementStatus, "Not Clicked On Return to Plan Test Cycle Successfully.");
                logger.info("clicked On Return to Plan Test Cycle Successfully.");
                callback(clickElementStatus);
            });
        }catch(err){
            console.error(err);
            callback(false);
        }
    };
    returnToTest = function(callback){
        commUtil.clickOnElementByXpath("//*[@id='zephyr-je-block-back-to-test']", function(clickElementStatus){
            assert.ok(clickElementStatus, "Not Clicked On Return To test link.");
            callback(clickElementStatus);

        });
    };
    validateSuccessfulPopupInExecuteTestPage = function(callback){
        try{
            driver.switchTo().defaultContent();
            commUtil.waitForElement("//div[contains(text(),'Successfully Executed Test.')]", browser.params.testdata.implicitWaitTimeMedium, function(waitElementStatus){
                assert.ok(waitElementStatus, "Successful Execute popup Validation Failed.");
                //commUtil.getTextByXpath("//div[contains(text(),'Successfully Executed Test.')]/p[@class='title']", function(successPopupStatus){
                // expect(successPopupStatus).toContain("Success!");
                callback(waitElementStatus);
                //})
            });
        }catch(err){
            callback(false);
        }
    };
    validateCurrentStepExec = function(stepNum, currentStatus, callback){
        var xpathForCurrentStepExec = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::dd[contains(@id, 'current-execution-status-dd-stepresult')]";
        commUtil.getTextByXpath(xpathForCurrentStepExec, function(getCurrStatus){
            expect(getCurrStatus).toEqual(currentStatus);
            callback(true);
        });
    };
    validateCurrentExecInExecuteTestPage = function(currentStatus, callback){
        commUtil.getTextByXpath("//*[text()='Execution Status: ']/following-sibling::*/descendant::*[contains(@id, 'current-execution-status-dd-schedule')]", function(getCurrStatus){
            assert.equal(getCurrStatus, currentStatus, "Not Validated Status");
            callback(true);
        });
    };
    validateCurrentDefect = function(defectID, callback){
        commUtil.getTextByXpath(".//*[@id='current-defectpicker-status-dd-schedule']/a", function(getCurrDefectStatus){
            assert.equal(getCurrDefectStatus, defectID, "Not Validated Current Defect.");
            callback(true);
        });
    };

    getExecutedByInExecuteTestPage = function(callback){
        commUtil.getTextByXpath("//*[text()='Executed By: ']/following-sibling::span[contains(@id, 'executed-by')]", function(getExecByStatus){
            callback(getExecByStatus);
        });
    };
    getExecutedOnInExecuteTestPage = function(callback){
        commUtil.getTextByXpath("//*[text()='Executed By: ']/following-sibling::span[contains(@id, 'executed-on-schedule')]", function(getExecOn){
            callback(getExecOn);
        });
    };
    /*getStatusOptionNum = function(status){
     try{
     var option;
     if(status = "PASS"){
     option = 0;
     }
     }catch(err){

     }
     };*/
    executeAllStatusConfirmationPopup = function(currentStatus, isValidateExecAllStepConfirmationDialog){
        try{
            var xpathForExecutionConfirmationDialog = "//*[@id='execution-confirmation-dialog']";
            var xpathForExecutionConfirmationDialogHeader = "//*[@id='execution-confirmation-dialog']/descendant::h2[contains(@class, 'aui-dialog2')]";
            var xpathForExecutionConfirmationDialogExecuteBtn = "//*[@id='execution-confirmation-dialog']/descendant::button[text()='Execute']";
            commUtil.waitForElement(xpathForExecutionConfirmationDialog, browser.params.testdata.implicitWaitTimeMedium, function(waitElementStatus){
                assert.ok(waitElementStatus, "Not Waited For Execute All Status Confirmation Dialog.");
                logger.info("Execute All Status Confirmation Popup Visible Now.");
                commUtil.getTextByXpath(xpathForExecutionConfirmationDialogHeader, function(getConfirmationPopupHeader){
                    assert.equal(getConfirmationPopupHeader, "Execute Test: Testcase", "Not Validated Execute All Step Confirmation Dialog.");
                    //expect(getConFirmationPopupHeader).toContain("Execute Test: Testcase");
                    logger.info("Execute All Step Status Confirmation Popup Header Validated Successfully.");
                    commUtil.getTextByXpath("//*[@id='execution-confirmation-dialog']/descendant::div[@class='form-body']/font", function(getConfPopupStatus){
                        logger.info("Current Status in Confirmation Popup : "+getConfPopupStatus);
                        assert.equal(getConfPopupStatus, currentStatus, "Not Validated Confirmation Dialog Status");
                        //expect(getConfPopupStatusMsg).toEqual(currentStatus);
                        logger.info("Confirmation popup Current Status is validated successfully.");
                        commUtil.clickOnElementByXpath(xpathForExecutionConfirmationDialogExecuteBtn, function(clickOnExecuteButtonStatus){
                            assert.ok(clickOnExecuteButtonStatus, "Not Clicked On Execute Button On Execute All Step Status Confirmation Dialog.");
                            isValidateExecAllStepConfirmationDialog(clickOnExecuteButtonStatus);
                        });
                    });
                });
            });
        }catch(err){
            console.error(err);
            isValidateExecAllStepConfirmationDialog(false);
        }
    };
    this.executeAllStepsToOne = function(changeStepStatus, callback){
        try{
            validateExecuteTestPage(function(validateTitleStatus){
                expect(validateTitleStatus).toBe.true;
                logger.info("Execute Test Page Title Validated successfully.");
                commUtil.switchToFrameByxpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__general-search-test-executions_provider']", function(switchToFrameStatus){
                    expect(switchToFrameStatus).toBe.true;
                    logger.info("Switch to Frame Successfully.");
                    executeAllSteps(changeStepStatus, function(executeAllStepsStatus){
                        expect(executeAllStepsStatus).toBe.true;
                        commUtil.sleep(2000);
                        logger.info("AllSteps are executed Successfully.");
                        executeAllStatusConfirmationPopup(changeStepStatus, function(executeConfirmationPopupStatus){
                            expect(executeConfirmationPopupStatus).toBe.true;
                            logger.info("Confirmation popup is executed Successfully.");

                            driver.switchTo().defaultContent();
                            validateSuccessfulPopupInExecuteTestPage(function(validatePopupStatus){
                                expect(validatePopupStatus).toBe.true;
                                commUtil.switchToFrameByxpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__general-search-test-executions_provider']", function(switchToFrameStatus){
                                    expect(switchToFrameStatus).toBe.true;
                                    logger.info("Switch to Frame Successfully.");
                                    commUtil.isElementVisible("//*[text()='Execution Status: ']/following-sibling::*/descendant::*[contains(@id, 'current-execution-status-dd-schedule')]", function(isElementVisibleStatus){
                                        expect(isElementVisibleStatus).toBe.true;
                                        validateCurrentExecInExecuteTestPage(changeStepStatus, function(validateCurrExecStatus){
                                            expect(validateCurrExecStatus).toBe.true;
                                            getExecutedByInExecuteTestPage(function(getExecByName){
                                                getExecutedOnInExecuteTestPage(function(getExecOnDate){
                                                    returnToPlanTestCycle(function(returnStatus){
                                                        expect(returnStatus).toBe.true;
                                                        callback(returnStatus, getExecByName, getExecOnDate );
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
            logger.info(err);
        }
    };
    executeAllSteps = function(changeStepStatus, isExecuteAllStep){
        try{
            var flag=false;
            //commUtil.sleep(2000);
            returnSteps(function(totalSteps){
                logger.info("Total Steps are : " + totalSteps);
                assert.ok(totalSteps >= 0, "No Steps are there in this Test To execute Test.");
                for(var i=1; i <= totalSteps; i++){
                    (function(x){
                        changeStepExecStatus(x, changeStepStatus, function(getChangeStatus){
                            assert.ok(getChangeStatus, "Not Changed Step Status.");
                            logger.info("Step "+x+" is executed successfully.");
                            /*returnToPlanTestCycle(function(returnStatus){
                             expect(returnStatus).toBe.true;
                             callback(returnStatus, getExecByName, getExecOnDate );
                             });*/

                            if(x==(totalSteps)){
                                flag = true;
                                isExecuteAllStep(flag);
                            }
                        });
                    })(i);

                }
            });
        }catch(err){
            console.error(err);
            isExecuteAllStep(false);
        }
    };
    returnSteps = function(stepTableSize){
        var steps;
        var xpathForSteps = "//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result')]";
        commUtil.waitForElement(xpathForSteps, browser.params.testdata.implicitWaitTimeMedium, function(waitForStepTableStatus){
            assert.ok(waitForStepTableStatus, "Not Waited For Step Table.");
            element.all(by.xpath(xpathForSteps)).then(function(stepsAll) {
                steps =  stepsAll.length;
                stepTableSize(steps);
            }, function(err){
                stepTableSize(0);
            });
        });
    };
    this.checkReturnToCycle = function(callback){
        try{
            validateExecuteTestPage(function(validateExecuteTestPageStatus){
                assert.ok(validateExecuteTestPageStatus, "Not Validated ExecuteTest Page.");
                logger.info("Execute Test Page Title Validated successfully.");
                commUtil.switchToFrameByXpath(xpathForIframe, function(switchToFrameStatus){
                    assert.ok(switchToFrameStatus, "Not Switched To Frame in Execute Test Page.");
                    logger.info("Switch to Frame Successfully in Execute Test page.");
                    returnToPlanTestCycle(function(returnToPlanTestCycleStatus){
                        expect(returnToPlanTestCycleStatus).toBe.true;
                        logger.info("Returned successfully to plan Test Cycle.");
                        callback(returnToPlanTestCycleStatus);
                    });
                    driver.switchTo().defaultContent();
                });
            });
        }  catch(err) {

        }
    };
    this.checkReturnToTest = function(testName, callback){
        try{
            validateExecuteTestPage(function(validateTitleStatus){
                assert.ok(validateTitleStatus, "Not Validated Execute Test Page.");
                logger.info("Execute Test Page Title Validated successfully.");
                commUtil.switchToFrameByXpath(xpathForIframe, function(switchToFrameStatus){
                    expect(switchToFrameStatus).toBe.true;
                    logger.info("Switch to Frame Successfully.");
                    returnToTest(function(returnToPlanTestCycleStatus){
                        expect(returnToPlanTestCycleStatus).toBe.true;
                        logger.info("Returned successfully to Test.");
                        viewTestPage.validateTestReturnFromExecuteTestPage(testName, function(returnToTestStatus){
                            expect(returnToTestStatus).toBe.true;
                            logger.info("Return To test Page Verified Successfully.");
                            callback(returnToTestStatus);
                        });

                    });
                });
            });

        }  catch(err) {
            console.error(err);
        }
    };
    this.addTestLevelAttachments = function(attachmentFile, callback){
        try{
            validateExecuteTestPage(function(validateTitleStatus){
                assert.ok(validateTitleStatus);
                logger.info("Execute Test Page Title Validated successfully.");
                commUtil.switchToFrameByxpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__general-search-test-executions_provider']", function(switchToFrameStatus){
                    expect(switchToFrameStatus).toBe.true;
                    logger.info("Switch to Frame Successfully.");
                    addAttachmentsToTest(attachmentFile, function(addCommentToTestStatus){
                        expect(addCommentToTestStatus).toBe.true;
                        logger.info("File added successfully and validated successfully.");
                        callback(addCommentToTestStatus);
                    });
                    driver.switchTo().defaultContent();
                });
            });

        }  catch(err) {
            throw err;
        }
    };
    var addAttachmentsToTest = function(attachmentFile, callback){
        try{
            commUtil.clickOnElementByXpath("//*[@id='attachments']/descendant::*[@data-entityname='execution']", function(clickElementStatus){
                assert.ok(clickElementStatus, "Not clicked On Test Level Attachment link.");
                logger.info("Clicked On Test Label Attachment.");
                commUtil.waitForElement("//*[@id='add-attachments-dialog']/descendant::h2[contains(@class,'aui-dialog2')]", browser.params.testdata.implicitWaitTimeMedium, function(waitElementStatus){
                    assert.ok(waitElementStatus, "Not Able to find attachment popup.");
                    commUtil.getTextByXpath("//*[@id='add-attachments-dialog']/descendant::h2[contains(@class,'aui-dialog2')]", function(attachmentTitle){
                        assert.equal(attachmentTitle, "Attach Files", "Attachment Popup Title not Validated.");
                        logger.info("Attachment Popup Title Validated Successfully.");
                        //commUtil.sleep(3000);
                        //driver.findElement(By.xpath(".//*[@id='fileupload']")).click();
                        commUtil.hoverElementByXpath("//*[@id='fileupload']", function(hoverOnAddFileLinkStatus){
                            assert.ok(hoverOnAddFileLinkStatus, "Not hovered On Add Files Link.");
                            var path = require('path');
                            //var fileToUpload = 'E:\\Installation\\ex.png';
                            //var absolutePath = path.resolve(__dirname, attachmentFile);
                            var absolutePath = path.resolve("./test/resources/", attachmentFile);
                            /*file = new File("E:\\Installation\\ex.png");
                             attachButtons.get(0).sendKeys(file.getAbsolutePath());*/
                            logger.info(absolutePath);
                            //commUtil.sendTextToElement()
                            driver.findElement(By.xpath("//*[@id='fileupload']")).sendKeys(absolutePath).then(function(sendToElementStatus){
                                //commUtil.sendTextToWebelement(".//*[@id='fileupload']", "E:/Installation/ex.png", function(sendToElementStatus){
                                //assert.ok(sendToElementStatus, "Not uploaded the file.");
                                logger.info("Attachment is uploaded.");
                                //commUtil.sleep(3000);
                                commUtil.waitForElement("//*[@id='add-attachments-dialog']/descendant::div[@class='files']/ul/li/p[@class='name']", browser.params.testdata.implicitWaitTimeMedium, function(waitForUploadImageStatus){
                                    assert.ok(waitForUploadImageStatus, "Not Found the image after upload.");
                                    commUtil.searchTextFromElements("//*[@id='add-attachments-dialog']/descendant::div[@class='files']/ul/li/p[@class='name']",attachmentFile, function(validateUploadStatus){
                                        assert.ok(validateUploadStatus, "Not Searched file after upload.");
                                        logger.info("Upload File is Validated Successfully.");
                                        commUtil.clickOnElementByXpath("//*[@id='add-attachments-dialog']/descendant::button[text()='Attach']", function(clickOnAttachLinkStatus){
                                            assert.ok(clickOnAttachLinkStatus, "Not Clicked on attach link.");
                                            logger.info("Attachment Popup Closed Successfully.");
                                            commUtil.waitForElement("//*[@id='executionAttachmentsContainer']/descendant::a[@class='attachedFile']", browser.params.testdata.implicitWaitTimeMedium, function(invisibleAttachmentpopupStatus){
                                                assert.ok(invisibleAttachmentpopupStatus, "Not Closed attachment popup.");
                                                commUtil.searchTextFromElements("//*[@id='executionAttachmentsContainer']/descendant::a[@class='attachedFile']", attachmentFile, function(attachmentStatus){
                                                    assert.ok(attachmentStatus, "Not Validated Attachment.");
                                                    logger.info("Attached file Validated Successfully.");
                                                    callback(attachmentStatus);
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
            throw err;
        }
    };
    this.addTestLevelComment = function(commentText, callback){
        try{
            validateExecuteTestPage(function(validateTitleStatus){
                expect(validateTitleStatus).toBe.true;
                logger.info("Execute Test Page Title Validated successfully.");
                commUtil.switchToFrameByxpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__general-search-test-executions_provider']", function(switchToFrameStatus){
                    expect(switchToFrameStatus).toBe.true;
                    logger.info("Switch to Frame Successfully.");
                    addCommentToTest(commentText, function(addCommentToTestStatus){
                        expect(addCommentToTestStatus).toBe.true;
                        logger.info("Comment is added successfully and validated successfully.");
                        callback(addCommentToTestStatus);
                    });

                });
            });

        }  catch(err) {
            console.error(err);
        }
    };
    addCommentToTest = function(commentText, isAddedComment){
        try{
            commUtil.hoverElementByXpath(xpathForCommentField, function(hoverOnCommentElement){
                assert.ok(hoverOnCommentElement, "Not Hovered On Comment Field.");
                commUtil.clickOnElementByXpath(xpathForCommentField, function(clickOnCommentElementStatus){
                    assert.ok(clickOnCommentElementStatus, "Not Clicked On Comment Field.");
                    logger.info("Clicked on Comment Field to add.");
                    commUtil.waitForElement(xpathForCommentTextArea,browser.params.testdata.implicitWaitTimeLow, function(waitingForCommentTextAreaStatus){
                        assert.ok(waitingForCommentTextAreaStatus, "Not Visible Comment Text Area.");
                        commUtil.sendTextToElement(xpathForCommentTextArea, commentText, function(commentSentStatus){
                            assert.ok(commentSentStatus, "Not Able To Send Comment into Comment Text Area.");
                            commUtil.clickOnElementByXpath(xpathForCommentAddBtn, function(stepOutCommentStatus){
                                assert.ok(stepOutCommentStatus, "Not Clicked On Update Button of Comment Field.");
                                logger.info("Comment Added Successfully.");
                                //commUtil.isElementInVisible(xpathForCommentAddBtn, function(waitForUpdateBtnInvisibleStatus){
                                //assert.ok(waitForUpdateBtnInvisibleStatus, "Not Waiting For Update Btn To Invisible.");
                                driver.sleep(1000);
                                commUtil.getTextByXpath(xpathForCommentField, function(getCommentValue){
                                    assert.equal(commentText, getCommentValue, "Not Validated Comment.");
                                    logger.info("Comment is validated successfully.");
                                    isAddedComment(true);
                                });
                                //});
                            });
                        });
                    });
                });
            });
        }catch (err) {
            logger.info(err);
            isAddedComment(false);
        }
    };
    editTestComment = function(oldComment, editCommentText, isEditedComment){
        try{
            commUtil.getTextByXpath(xpathForCommentField, function(getCommentValue){
                assert.equal(oldComment, getCommentValue, "Not Validated Comment.");
                logger.info("Old Comment validated successfully Now We Can edit..");
                addCommentToTest(editCommentText, function(isAddedComment){
                    assert.ok(isAddedComment, "Not Added Comment While Edit.");
                    isEditedComment(isAddedComment);
                });
            });
        }catch (err) {
            console.error(err);
            isEditedComment(false);
        }
    };

    addCommentToStep = function(stepNum, commentText, isAddedComment){
        try{
            commUtil.hoverElementByXpath("//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::*[contains(@id,'current-comment-status')]", function(hoverOnCommentElement){
                assert.ok(hoverOnCommentElement, "Not Hovered On Step Level Comment.");
                commUtil.clickOnElementByXpath("//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::*[contains(@id,'current-comment-status')]/a", function(clickOnCommentElementStatus){
                    assert.ok(clickOnCommentElementStatus, "Not Clicked On Comment Field.");
                    logger.info("Clicked on Step Comment Link to add.")
                    commUtil.waitForElement("//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::textarea[contains(@id,'comment-status-stepresult')]", browser.params.testdata.implicitWaitTimeLow, function(waitingForCommentTextAreaStatus){
                        assert.ok(waitingForCommentTextAreaStatus, "Not Waited For Comment Text Box.");
                        commUtil.sendTextToElement("//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::textarea[contains(@id,'comment-status-stepresult')]", commentText, function(commentSentStatus){
                            assert.ok(commentSentStatus, "Not Able To Send Comment.");
                            commUtil.clickOnElementByXpath("//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::button[@id='comment-edit-field-select-update']", function(stepOutCommentStatus){
                                assert.ok(stepOutCommentStatus, "Not Clicked On Step Add Button.");
                                logger.info("Step Comment Attached Successfully.");
                                //commUtil.isElementInVisible("//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::button[@id='comment-edit-field-select-update']", function(isElementStatus) {
                                //assert.ok(isElementStatus, "Not Wait to commit add button To Invisible.");
                                //logger.info("Waiting for comment commit.");
                                //commUtil.implecitWait(20000);
                                //commUtil.sleep(5000);
                                driver.sleep(1000);
                                commUtil.getTextByXpath("/*//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/td/descendant::*[contains(@id,'current-comment-status-dd-stepresult')]", function (getCommentValue) {
                                    logger.info("Step Comment : "+getCommentValue);
                                    assert.equal(commentText, getCommentValue, "Step Level Comment is not Validated successfully.");
                                    logger.info("Step Level Comment is validated successfully.");
                                    isAddedComment(true);
                                });
                                //});
                            });
                        });
                    });
                });
            });
        }catch (err) {
            console.error(err);
            isAddedComment(false);
        }
    };
    editStepComment = function(stepNum, oldStepComment, editCommentText, isEditedStepComment){
        try{
            commUtil.getTextByXpath("/*//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/td/descendant::*[contains(@id,'current-comment-status-dd-stepresult')]", function (getCommentValue) {
                logger.info("Step Comment : "+getCommentValue);
                assert.equal(editCommentText, getCommentValue, "Step Level Comment is not Validated successfully.");
                logger.info("Step Level Comment validated successfully, Now you can Edit.");
                addCommentToStep(stepNum, editCommentText, function(addCommentStatus){
                    assert.ok(addCommentStatus, "Not Added Comment To The Step.");
                    isEditedStepComment(addCommentStatus);
                });
            });
            /*commUtil.hoverElementUsingXpath("/*//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::*[contains(@id,'current-comment-status')]", function(hoverOnCommentElement){
             expect(hoverOnCommentElement).toBe.true;
             commUtil.clickOnElementByxpath("/*//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::*[contains(@id,'current-comment-status')]/a", function(clickOnCommentElementStatus){
             expect(clickOnCommentElementStatus).toBe.true;
             logger.info("Clicked on Comment Link to add.")
             commUtil.waitForElement("/*//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::textarea[contains(@id,'comment-status-stepresult')]", function(waitingForCommentTextAreaStatus){
             expect(waitingForCommentTextAreaStatus).toBe.true;
             commUtil.sendTextToWebelement("/*//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::textarea[contains(@id,'comment-status-stepresult')]", editCommentText, function(commentSentStatus){
             expect(commentSentStatus).toBe.true;
             commUtil.clickOnElementByxpath("/*//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::button[@id='comment-edit-field-select-update']", function(stepOutCommentStatus){
             expect(stepOutCommentStatus).toBe.true;
             logger.info("Comment Attached Successfully.");
             //commUtil.waitForElementInvisible("/*//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/descendant::button[@id='comment-edit-field-select-update']", 10000, function(isElementStatus) {
             //  assert.equal(isElementStatus, true, "Wait to commit add button.");
             logger.info("Waiting for comment commit.");
             commUtil.implecitWait(20000);
             commUtil.sleep(5000);
             commUtil.getTextByXpath("*//*//**//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/td/descendant::*[contains(@id,'current-comment-status-dd-stepresult')]", function (getCommentValue) {
             logger.info("Step Comment : "+getCommentValue);
             assert.equal(editCommentText, getCommentValue, "Step Level Comment is not Validated successfully.");
             logger.info("Step Level Comment is validated successfully.");
             callback(true);
             });
             // callback(isElementStatus);
             //});
             });
             });
             });
             });
             });*/
        }catch (err) {
            console.error(err);
            isEditedStepComment(false);
        }
    };
    this.addStepComment = function(stepNum, commentText, callback){
        try{
            validateExecuteTestPage(function(validateTitleStatus){
                assert.equal(validateTitleStatus, true, "Execute Test Page Title is not Validated Successfully.");
                logger.info("Execute Test Page Title Validated successfully.");
                commUtil.switchToFrameByxpath("//*[@id='easyXDM_embedded-com.thed.zephyr.cloud__general-search-test-executions_provider']", function(switchToFrameStatus){
                    assert.equal(switchToFrameStatus, true, "Not Switched to Frame Successfully.");
                    logger.info("Switch to Frame Successfully.");

                    addCommentToStep(stepNum, commentText, function(addCommentToTestStatus){
                        expect(addCommentToTestStatus).toBe.true;
                        logger.info("Comment is added successfully and validated successfully.");
                        commUtil.getTextByXpath("/*//*[@id='teststepDetails']/descendant::tr[contains(@id, 'step-row-for-result-id')][td[text()='"+stepNum+"']]/td/descendant::*[contains(@id,'current-comment-status-dd-stepresult')]", function(getCommentValue) {
                            logger.info("Step Comment : "+getCommentValue);
                            assert.equal(commentText, getCommentValue, "Step Level Comment is not Validated successfully.");
                            logger.info("Step Level Comment is validated successfully.");
                            callback(true);
                        });
                        //callback(addCommentToTestStatus);
                    });

                });
                driver.switchTo().defaultContent();
            });

        }  catch(err) {

        }
    };

    /* this.validateExecuteTestpage = function() {
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
     logger.info("Execute Test Cycle Verified Successfully.");
     }
     });
     return true;
     });
     }, 100000, "Validating Execute Test Cycle Failed.");
     };*/
    /******************************************************
     *  PAGE REUSABLE METHODS
     *****************************************************/
    validateExecuteTestPage = function(isValidateExecuteTestPage) {
        if(browser.params.testdata.environment === "prod"){
            xpathForIframe = "//*[@id='easyXDM_embedded-com.thed.zephyr.je__general-search-test-executions_provider']";
        }
        try{
            driver.switchTo().defaultContent();
            driver.wait(function(){
                return driver.executeScript("return document.readyState").then(function(state){
                    logger.info("Browse state : " + state);
                    return state === "complete";
                });
            }, browser.params.testdata.PageLoadTimeOut).then(function(){
                driver.sleep(1000);
                commUtil.waitForTitle("Test Execution", function(waitForTitleStatus){
                    assert.ok(waitForTitleStatus, "Not Validate Execute Test Page Title.");

                    commUtil.waitForPageLoad(xpathForIframe,  function(waitForFrameStatus){
                        assert.ok(waitForFrameStatus, "NoT Able To Load Iframe in Plan test Cycle.");
                        isValidateExecuteTestPage(waitForFrameStatus);
                    });
                });
            },function(e) {
                console.error("Browser is not Loaded.");
                isValidateExecuteTestPage(false);
            });
        }catch(err){
            console.error(err);
            isValidateExecuteTestPage(false);
        }
    };
    var validateExecuteTestPageHeader = function(executeTestMap, isValidatedExecuteTestPageHeader){
        try{
            var xpathForProjectNameInExecuteTestPageHeader = "//*[@id='project-name-val']";
            var xpathForVersionNameInExecuteTestPageHeader = "//*[*[@id='project-name-val']]/following-sibling::li[1]/a";
            var xpathForCycleNameInExecuteTestPageHeader = "//*[*[@id='project-name-val']]/following-sibling::li[2]/a";
            var xpathForTestNameInExecuteTestPageHeader = "//*[*[@id='project-name-val']]/following-sibling::li[3]/a";
            commUtil.getTextByXpath(xpathForProjectNameInExecuteTestPageHeader, function(getProjectName){
                logger.info("Project : "+getProjectName !== undefined);
                assert.ok(getProjectName !== undefined, "Project Name returning null or undefined value.");
                logger.info(" Project name "+browser.params.testdata.project+"::"+(browser.params.testdata.project === getProjectName));
                assert.equal(browser.params.testdata.project , getProjectName, "Project Name is Not Matching In Execute Test Page.");

                commUtil.getTextByXpath(xpathForVersionNameInExecuteTestPageHeader, function(getVersionName){
                    assert.ok(getVersionName !== undefined , "Version Name returning null or undefined value.");
                    assert.equal(executeTestMap.VERSIONNAME , getVersionName, "Version Name is Not Matching In Execute Test Page.");

                    commUtil.getTextByXpath(xpathForCycleNameInExecuteTestPageHeader, function(getCycleName){
                        assert.ok(getCycleName !== undefined , "Cycle Name returning null or undefined value.");
                        assert.equal(executeTestMap.CYCLENAME , getCycleName, "Cycle Name is Not Matching In Execute Test Page.");

                        commUtil.getTextByXpath(xpathForTestNameInExecuteTestPageHeader, function(getTestName){
                            logger.info(getTestName+"::"+executeTestMap.TESTNAME);
                            assert.ok(getTestName !== undefined , "Test Name returning null or undefined value.");
                            assert.equal(executeTestMap.TESTNAME , getTestName, "Test Name is Not Matching In Execute Test Page.");
                            isValidatedExecuteTestPageHeader(true);
                        });
                    });
                });
            });
        }catch(e){
            console.error(e);
            isValidatedExecuteTestPageHeader(false);
        }
    };
};
module.exports = new ExecuteTestPage();