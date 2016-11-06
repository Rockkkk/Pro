
var commUtil = require('../../utils/commUtil.js');
var AddTestToCyclePage = function() {
  
    /******************************************************
     *  ADD TEST TO CYCLE PAGE
     *****************************************************/
    var xpathForAddTestTestBox = "//*[@id='s2id_autogen2']";
    var xpathForAddBtnInAddTestToCyclePage = "//*[@id='add-tests-dialog']/descendant::button[text()='Add']";
    /******************************************************
     *  WEBELEMENTS
     *****************************************************/
    /******************************************************
     *  PAGE OBJECT METHODS
     *****************************************************/
    /*this.addTestToCycle = function(cycleName, testName, callback){
    	validateAddTestToCycle(cycleName, function(validatePageStatus){
    		expect(validatePageStatus).toBe.true;
    		logger.info("Add Test To Cycle Page Validated successfully.");
    		commUtil.returnWebelement("//*[@id='s2id_autogen2']", function(element){
    			element.sendKeys(testName);
    			//commUtil.sleep(2000);
                commUtil.waitForElement(".//*[@id='select2-drop']/descendant::div[@class='select2-result-label']", function(waitForElementStatus){
                    expect(waitForElementStatus).toBe.true;
                    commUtil.searchElementsContainAndClick(".//*[@id='select2-drop']/descendant::div[@class='select2-result-label']", testName, function(elementStatus){
                        expect(elementStatus).toBe.true;
                        commUtil.clickOnElementByxpath(".//*[@id='add-tests-dialog']/descendant::button[text()='Add']", function(clickElementStatus){
                            expect(clickElementStatus).toBe.true;
                            commUtil.sleep(3000);
                            handleSuccessfullAddTestPopup(function(waitForAddTestStatus){
                                expect(waitForAddTestStatus).toBe.true;
                                callback(waitForAddTestStatus);
                            });
                        });
                    });
                });

    		});

    	});
    };*/
    this.addTestToCycle = function(cycleName, testName, isAddTestToCycle){
        try{
            validateAddTestToCyclePage(cycleName, function(validateAddTestToCyclePageStatus){
                assert.ok(validateAddTestToCyclePageStatus, "Not Validated Add Test To Cycle Page.");
                logger.info("Add Test to cycle Page Validated Successfully.");

                commUtil.sendTextToElement(xpathForAddTestTestBox, testName, function(sendTextToElement){
                    assert.ok(sendTextToElement, "Not Able To Send Text To Text Box.");

                    commUtil.waitForElement(".//*[@id='select2-drop']/descendant::div[@class='select2-result-label']", browser.params.testdata.implicitWaitTimeMedium, function(waitForElementStatus){
                        assert.ok(waitForElementStatus, "Not Waited For Add Test Drop Down To select.");
                        searchDefectFromDropDownAndClick("//*[@id='select2-drop']/descendant::div[@class='select2-result-label'][h5[contains(text(),'History Search')]]/following-sibling::ul//div[@class='select2-result-label']", testName, function(elementStatus){
                            assert.ok(elementStatus, "Not Searched Elements From Add Test Drop Down.");
                            commUtil.clickOnElementByXpath(xpathForAddBtnInAddTestToCyclePage, function(clickElementStatus){
                                assert.ok(clickElementStatus, "Not Clicked On Add Button.");
                                //commUtil.sleep(3000);
                                handleSuccessfulAddTestPopup(function(waitForAddTestStatus){
                                    assert.ok(waitForAddTestStatus, "");
                                    isAddTestToCycle(waitForAddTestStatus);
                                });
                            });
                        });
                    });
                });
            });
        }catch(e){
            isAddTestToCycle(false);
        }
        /*validateAddTestToCycle(cycleName, function(validatePageStatus){
            expect(validatePageStatus).toBe.true;
            logger.info("Add Test To Cycle Page Validated successfully.");
            commUtil.returnWebelement("/*//*[@id='s2id_autogen2']", function(element){
                element.sendKeys(testName);
                //commUtil.sleep(2000);
                commUtil.waitForElement("./*//*[@id='select2-drop']/descendant::div[@class='select2-result-label']", function(waitForElementStatus){
                    expect(waitForElementStatus).toBe.true;
                    commUtil.searchElementsContainAndClick("./*//*[@id='select2-drop']/descendant::div[@class='select2-result-label']", testName, function(elementStatus){
                        expect(elementStatus).toBe.true;
                        commUtil.clickOnElementByxpath("./*//*[@id='add-tests-dialog']/descendant::button[text()='Add']", function(clickElementStatus){
                            expect(clickElementStatus).toBe.true;
                            commUtil.sleep(3000);
                            handleSuccessfullAddTestPopup(function(waitForAddTestStatus){
                                expect(waitForAddTestStatus).toBe.true;
                                callback(waitForAddTestStatus);
                            });
                        });
                    });
                });
            });
        });*/
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
    this.addTestFromCycle = function(addTestFromCycleMap, callback){
        validateAddTestToCyclePage(addTestFromCycleMap.CYCLE_NAME, function(validatePageStatus){
            assert.ok(validatePageStatus, "Not Validated Add Test To Cycle Page.");
            logger.info("Add Test To Cycle Page Validated successfully.");
            logger.info(addTestFromCycleMap.VERSION_NAME);
            selectFromAnotherCycle(function(selectLinkStatus){
                assert.ok(selectLinkStatus, "Not Selected From Another Cycle Link");
                selectVersionInAddTestToCyclePopup(addTestFromCycleMap, function(selectVersionStatus){
                    assert.ok(selectVersionStatus, "Version Not Selected.");
                    selectCycleInAddTestToCyclePopup(addTestFromCycleMap, function(selectCycleStatus){
                        assert.ok(selectCycleStatus, "Cycle Not Selected.");
                        commUtil.clickOnElementByXpath(".//*[@id='add-tests-dialog']/descendant::button[text()='Add']", function(clickElementStatus){
                            assert.ok(clickElementStatus, "Not Clicked on Add button.");
                            logger.info("Clicked Successfully on Add Button.");
                            //commUtil.sleep(3000);
                            handleSuccessfulAddTestPopup(function(waitForAddTestStatus){
                                assert.ok(waitForAddTestStatus, "Not Validated Successful popup.");
                                logger.info("Successful popup Validated Successfully");
                                callback(waitForAddTestStatus);
                            });
                        });
                        /*selectPriorityInAddTestToCyclePopup(addTestFromCycleMap, function(selectPriorityStatus){
                            assert.ok(selectPriorityStatus, "Priority Not Selected.");
                            selectComponentInAddTestToCyclePopup(addTestFromCycleMap, function(selectComponentStatus){
                                assert.ok(selectComponentStatus, "Component Not Selected.");
                                selectLabelInAddTestToCyclePopup(addTestFromCycleMap, function(selectComponentStatus){
                                    assert.ok(selectComponentStatus, "Label Not Selected.");
                                    selectLinkStatusInAddTestToCyclePopup(addTestFromCycleMap, function(selectLinkedDefectStatus) {
                                        assert.ok(selectLinkedDefectStatus, "Linked Defect Status Not Selected.");


                                    });
                                });
                            });
                        });*/
                    });
                });
            });
        });
    };
    this.addMultipleTests = function(addTestFromCycleMap, isAddTestToCycle){
        try{
            validateAddTestToCyclePage(addTestFromCycleMap.CYCLENAME, function(validateAddTestToCyclePageStatus){
                assert.ok(validateAddTestToCyclePageStatus, "Not Validated Add Test To Cycle Page.");
                logger.info("Add Test to cycle Page Validated Successfully.");
                if(addTestFromCycleMap.TESTNAME instanceof Array){
                    for(var i=0; i < addTestFromCycleMap.TESTNAME.length; i++){
                        (function(x){
                            logger.info(addTestFromCycleMap.TESTNAME[x]);
                            commUtil.sendTextToElement(xpathForAddTestTestBox, addTestFromCycleMap.TESTNAME[x], function(sendTextToElement){
                                assert.ok(sendTextToElement, "Not Able To Send Text To Text Box.");

                                commUtil.waitForElement(".//*[@id='select2-drop']/descendant::div[@class='select2-result-label']", browser.params.testdata.implicitWaitTimeMedium, function(waitForElementStatus){
                                    assert.ok(waitForElementStatus, "Not Waited For Add Test Drop Down To select.");
                                    searchDefectFromDropDownAndClick("//*[@id='select2-drop']/descendant::div[@class='select2-result-label'][h5[contains(text(),'History Search')]]/following-sibling::ul//div[@class='select2-result-label']", addTestFromCycleMap.TESTNAME[x], function(elementStatus) {
                                        assert.ok(elementStatus, "Not Searched Elements From Add Test Drop Down.");
                                        if(x === (addTestFromCycleMap.TESTNAME.length -1)){
                                            commUtil.clickOnElementByXpath(xpathForAddBtnInAddTestToCyclePage, function(clickElementStatus){
                                                assert.ok(clickElementStatus, "Not Clicked On Add Button.");
                                                //commUtil.sleep(3000);
                                                handleSuccessfulAddTestPopup(function(waitForAddTestStatus){
                                                    assert.ok(waitForAddTestStatus, "");
                                                    isAddTestToCycle(waitForAddTestStatus);
                                                });
                                            });
                                        }
                                    });
                                });
                            });
                        })(i);
                    }
                }else{
                    commUtil.sendTextToElement(xpathForAddTestTestBox, addTestFromCycleMap.TESTNAME, function(sendTextToElement){
                        assert.ok(sendTextToElement, "Not Able To Send Text To Text Box.");

                        commUtil.waitForElement(".//*[@id='select2-drop']/descendant::div[@class='select2-result-label']", browser.params.testdata.implicitWaitTimeMedium, function(waitForElementStatus){
                            assert.ok(waitForElementStatus, "Not Waited For Add Test Drop Down To select.");
                            searchDefectFromDropDownAndClick("//*[@id='select2-drop']/descendant::div[@class='select2-result-label'][h5[contains(text(),'History Search')]]/following-sibling::ul//div[@class='select2-result-label']", addTestFromCycleMap.TESTNAME, function(elementStatus){
                                assert.ok(elementStatus, "Not Searched Elements From Add Test Drop Down.");
                                commUtil.clickOnElementByXpath(xpathForAddBtnInAddTestToCyclePage, function(clickElementStatus){
                                    assert.ok(clickElementStatus, "Not Clicked On Add Button.");
                                    //commUtil.sleep(3000);
                                    handleSuccessfulAddTestPopup(function(waitForAddTestStatus){
                                        assert.ok(waitForAddTestStatus, "");
                                        isAddTestToCycle(waitForAddTestStatus);
                                    });
                                });
                            });
                        });
                    });
                }
            });
        } catch(e){

        }
    };
    this.addTestMultipleToCycle = function(cycleName, testOne, testTwo, testThree, testFour, testFive, callback){
        validateAddTestToCycle(cycleName, function(validatePageStatus){
            expect(validatePageStatus).toBe.true;
            logger.info("Add Test To Cycle Page Validated successfully.");
            elementStatus(testOne, function(sendTestOneStatus){
                expect(sendTestOneStatus).toBe.true;
                logger.info(testOne + " is added successfully.");
                elementStatus(testTwo, function(sendTestTwoStatus){
                    expect(sendTestTwoStatus).toBe.true;
                    logger.info(testTwo + " is added successfully.");
                    elementStatus(testThree, function(sendTestThreeStatus){
                        expect(sendTestThreeStatus).toBe.true;
                        logger.info(testThree + " is added successfully.");
                        elementStatus(testFour, function(sendTestFourStatus){
                            expect(sendTestFourStatus).toBe.true;
                            logger.info(testFour + " is added successfully.");
                            elementStatus(testFive, function(sendTestFiveStatus){
                                expect(sendTestFiveStatus).toBe.true;
                                logger.info(testFive + " is added successfully.");
                                commUtil.clickOnElementByxpath(".//*[@id='add-tests-dialog']/descendant::button[text()='Add']", function(clickElementStatus){
                                    expect(clickElementStatus).toBe.true;
                                    commUtil.sleep(3000);
                                    handleSuccessfulAddTestPopup(function(waitForAddTestStatus){
                                        expect(waitForAddTestStatus).toBe.true;
                                        callback(waitForAddTestStatus);
                                    });

                                });
                            });
                        });
                    });
                });
            });

        });
    };
    var handleSuccessfulAddTestPopup = function(isHandledSuccessfulPopup){
        try{
            var xpathForSuccessfulPopupForAddTestToCycle = "//*[@id='warning-message-dialog']/descendant::h2[contains(@class, 'aui-dialog2')]";
            var xpathForCloseLink = "//*[@id='warning-message-dialog']/descendant::button[@id='warning-message-dialog-cancel-button']";
            commUtil.waitForElement(xpathForSuccessfulPopupForAddTestToCycle, browser.params.testdata.implicitWaitTimeMedium, function(waitForElement){
                assert.ok(waitForElement, "Add Test Successful Popup not present.");
                commUtil.getTextByXpath("//*[@id='warning-message-dialog']/descendant::h2[contains(@class, 'aui-dialog2')]", function(headerText) {
                    assert.equal(headerText, "\"Add Tests\" Status:", "Add Test Header Not Validated.");
                    logger.info("Add Test Status Header Validated Successfully.");
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
   /* handleSuccessfulAddTestPopup = function(callback){
        try{
            commUtil.waitForElement("./*//*[@id='warning-message-dialog']/div/h2[@class='dialog-title']", function(waitForElement){
                assert.ok(waitForElement, "Add Test Successful Popup not present.");
                commUtil.getTextByXpath("./*//*[@id='warning-message-dialog']/div/h2[@class='dialog-title']", function(headerText) {
                    assert.equal(headerText, "\"Add Tests\" Status:", "Add Test Header Not Validated.");
                    logger.info("Add Test Status Header Validated Successfully.");
                    commUtil.clickOnElementByxpath("./*//*[@id='warning-message-dialog']/descendant::a[text()='Close']", function(clickOnCloseLinkStatus){
                        assert.ok(clickOnCloseLinkStatus, "Not Closed Successful popup");
                        callback(clickOnCloseLinkStatus);
                    });
                });
            });
        }catch(err){
            throw err;
        }
    };*/
    sendMultipeTest = function(testName, callback){
        commUtil.returnWebelement("//*[@id='s2id_autogen2']", function(element){
            element.sendKeys(testName);
            //commUtil.sleep(2000);
            commUtil.waitForElement(".//*[@id='select2-drop']/descendant::div[@class='select2-result-label']", function(waitForElementStatus){
                expect(waitForElementStatus).toBe.true;
                commUtil.searchElementsContainAndClick(".//*[@id='select2-drop']/descendant::div[@class='select2-result-label']", testName, function(elementStatus){
                    expect(elementStatus).toBe.true;
                    callback(elementStatus);
                });
            });

        });
    };
    this.addTestToCycleByFilter = function(cycleName, filterName, totalTest,  isAddTestToCycle){
        var xpathForTestsCount = "//*[@id='savedSearch-count']";
        var xpathForAddBtn = "//*[@id='add-tests-dialog']/descendant::*[text()='Add']";
        validateAddTestToCyclePage(cycleName, function(validatePageStatus){
            assert.ok(validatePageStatus, "Not Validated Add Test To Cycle Page.");
            logger.info("Add Test To Cycle Page Validated successfully.");

            logger.info("Add Test To Cycle Page Validated successfully.");
            commUtil.clickOnElementByXpath("//*[text()='Via Search Filter']", function(clickOnSaveFilterStatus){
                assert.ok(clickOnSaveFilterStatus, "Not clicked on save as jira filter.");
                driver.sleep(1000);
                commUtil.waitForElement("//*[@for='addTestsSavedSearch']",15000, function(waitElementStatus){
                    assert.ok(waitElementStatus, "Not visible addTestsSavedSearch.");

                    commUtil.clickOnElementByXpath("//*[@id='s2id_addTestsSavedSearch-multi-select']/a", function(clickOnAddTestDrpDownMenuStatus){
                        assert.ok(clickOnAddTestDrpDownMenuStatus, "Not visible addTestsSavedSearch.");
                        commUtil.sendTextToElement("//*[@id='select2-drop']/div/input", filterName,function(sendFilterTextStatus) {
                            assert.ok(sendFilterTextStatus, "Not sent filter.");
                            searchDefectFromDropDownAndClick("//*[@id='select2-drop']//ul//li/div", filterName, function(elementStatus){
                                assert.ok(elementStatus, "Not Searched Elements From Add Test Drop Down.");
                           // commUtil.sendTextToElement("//*[@id='select2-drop']//ul//li/div", "\uE004", function(selectFilterStatus) {
                                //assert.ok(selectFilterStatus, "Not Selected filter.");
                                driver.sleep(500);
                                commUtil.waitForElement(xpathForTestsCount, 10000, function(waitForTotalTests){
                                    commUtil.getTextByXpath(xpathForTestsCount, function(totalTests){
                                        assert.ok(totalTests ==totalTest, "Total tests not matching." );
                                        logger.info("Total tests matching.");
                                        commUtil.clickOnElementByXpath(xpathForAddBtn, function(clickOnAddStatus){
                                            assert.ok(clickOnAddStatus);
                                            logger.info("clicked on Add btn.");
                                            handleSuccessfulAddTestPopup(function(waitForAddTestStatus){
                                                assert.ok(waitForAddTestStatus, "");
                                                isAddTestToCycle(waitForAddTestStatus);
                                            });
                                        });
                                    })
                                });
                            });
                        });
                    });

                });
            });
        });
    };

    
    /******************************************************
     *  PAGE REUSABLE METHODS
     *****************************************************/
    validateAddTestToCyclePage = function(cycleName, isValidateAddTestToCyclePage) {
      try{
          var xpathForAddTestDialog = "//*[@id='add-tests-dialog']";
          var xpathForAddTestToCycleHeader = "//*[@id='add-tests-dialog']/descendant::h2[contains(@class, 'aui-dialog2')]";
          commUtil.waitForElement(xpathForAddTestDialog, browser.params.testdata.implicitWaitTimeMedium, function(waitForEditCyclePopup){
              assert.ok(waitForEditCyclePopup, "Not Able To Load Add Test To Cycle popup.");
              commUtil.moveToElementByXpath(xpathForAddTestDialog, function(moveToCycleDialogStatus){
                  assert.ok(moveToCycleDialogStatus, "Not Able To Move To Edit Cycle popup.");
                  commUtil.getTextByXpath(xpathForAddTestToCycleHeader, function(createCycleHeaderPopup) {
                      //logger.info("[][][]"+createCycleHeaderPopup+"::"+cycleName+"@@"+(createCycleHeaderPopup.indexOf(cycleName) != -1));
                      assert.ok((createCycleHeaderPopup.indexOf("Add Tests to Cycle:") != -1), "Add test To Cycle Header Not Matching.");
                      assert.ok((createCycleHeaderPopup.indexOf(cycleName) != -1), "Cycle name Not Validated in Add test To Cycle Header.");
                      isValidateAddTestToCyclePage(true);
                  });
              });
          });
      }catch(err){
        console.error("Add Test To Cycle Title not validated successfully.");
      }
    };
    var selectFromAnotherCycle = function(callback){
        try{
            commUtil.getAttributeValue("//*[button[text()='From Another Cycle']]", "class", function(getAttributeValue){
                logger.info(getAttributeValue);
                if(getAttributeValue === "page-menu-item"){
                    commUtil.clickOnElementByXpath("//button[text()='From Another Cycle']", function(clickOnAnotherCycleLink){
                        assert.ok(clickOnAnotherCycleLink, "Not clicked on Another link.");
                        driver.sleep(500);
                        callback(clickOnAnotherCycleLink);
                        /*commUtil.getAttributeValue("/*//*[button[text()='From Another Cycle']]", "class", function(getAttributeValue){
                            assert.equal(getAttributeValue, "page-menu-item selected", "From Another Cycle Not Activated.");
                            logger.info("From Another Cycle is Now Activated.");
                            callback(true);
                        });*/
                    });
                    //driver.findElement(By.xpath("//button[text()='From Another Cycle']")).click();
                    //driver.sleep(2000);
                    //commUtil.wait_Element("//*[@id='s2id_addTestsVersion']");

                }else{
                    logger.info("From Another Cycle is Already  Now Activated.");
                    callback(true);
                }
            });
        }catch(err){
            throw err;
        }
    };
    var selectVersionInAddTestToCyclePopup = function(addTestFromCycleMap, callback){
        try{
            commUtil.getTextByXpath("//*[@id='s2id_addTestsVersion']/descendant::span[@class='select2-chosen']", function(selectedVersion){
                logger.info(addTestFromCycleMap.VERSION_NAME);
                if(selectedVersion === addTestFromCycleMap.VERSION_NAME){
                    logger.info("Version is already Selected.");
                    callback(true);
                } else {
                    driver.findElement(By.xpath("//*[@id='s2id_addTestsVersion']/descendant::span[@class='select2-chosen']")).click();
                    driver.sleep(500);
                    commUtil.waitForElement("//*[@id='select2-drop']", browser.params.testdata.implicitWaitTimeMedium, function(waitElementStatus){
                         assert.ok(waitElementStatus, "Select Drop down Not Activated To Select.");
                         logger.info("Version select Drop down is visible Now.");
                         driver.sleep(500);
                        logger.info(addTestFromCycleMap.VERSION_NAME);
                         commUtil.searchTextFromElements("//*[@id='select2-drop']/descendant::ul[@class='select2-result-sub']/li/div[@class='select2-result-label']", addTestFromCycleMap.VERSION_NAME, function(findVersionStatus){
                             assert.ok(findVersionStatus, "Not Found Version From Drop down menu");
                             driver.findElement(By.xpath("//*[@id='select2-drop']/descendant::ul[@class='select2-result-sub']/li/div[@class='select2-result-label' and text()='"+addTestFromCycleMap.VERSION_NAME+"']")).click();
                             logger.info(addTestFromCycleMap.VERSION_NAME + " : version is selected successfully.");
                             callback(findVersionStatus);
                         });
                    });
                }
            });
        }catch(err){
            throw err;
        }
    };
    var selectCycleInAddTestToCyclePopup = function(addTestFromCycleMap, callback){
        try{
            driver.sleep(1000);
            logger.info("BHYHYHHYHH"+addTestFromCycleMap.FROM_CYCLE_NAME);
            commUtil.selectDropdownByText(driver.findElement(By.xpath("//*[@id='addTestsCycle']")), addTestFromCycleMap.FROM_CYCLE_NAME, function(getSelectStatus){
                logger.info(getSelectStatus);
                assert.ok(getSelectStatus, "Cycle not Selected Successfully.");
                logger.info("Cycle Selected Successfully.");
                callback(getSelectStatus);
            });
            /*if(addTestFromCycleMap.FROM_CYCLE_NAME === "Ad hoc"){
                logger.info("Cycle is Already Selected.");
                callback(true);
            }else{
                commUtil.selectDropdownByText(driver.findElement(By.xpath("/*//*[@id='addTestsCycle']")), addTestFromCycleMap.FROM_CYCLE_NAME, function(getSelectStatus){
                    assert.ok(getSelectStatus, "Cycle not Selected Successfully.");
                    logger.info("Cycle Selected Successfully.");
                    callback(getSelectStatus);
                });
            }*/
        }catch(err){
            throw err;
        }
    };
    var selectPriorityInAddTestToCyclePopup = function(addTestFromCycleMap, callback){
        try{
            if(addTestFromCycleMap.hasOwnProperty("PRIORITY")){
                driver.findElement(By.xpath("//*[@id='s2id_addTestsPriority']/descendant::input[@id='s2id_autogen4']")).clear();
                driver.findElement(By.xpath("//*[@id='s2id_addTestsPriority']/descendant::input[@id='s2id_autogen4']")).sendKeys(addTestFromCycleMap.PRIORITY);
                commUtil.findElementAndClick("//*[@id='select2-drop']/descendant::div[text()='Priority']/following-sibling::ul/descendant::span[@class='select2-match']", addTestFromCycleMap.PRIORITY , function(findPriorityStatus){
                    assert.ok(findPriorityStatus, "Not Selected Priority.");
                    callback(findPriorityStatus);
                });
            }else{
                logger.info("Priority is not there, Not Required to Select Priority");
                callback(true);
            }
        }catch(err){
            throw err;
        }
    };
    selectComponentInAddTestToCyclePopup = function(addTestFromCycleMap, callback){
        try{
            if(addTestFromCycleMap.hasOwnProperty("COMPONENT")){
                driver.findElement(By.xpath("//*[@id='s2id_addTestsComponent']/descendant::input")).clear();
                driver.findElement(By.xpath("//*[@id='s2id_addTestsComponent']/descendant::input")).sendKeys(addTestFromCycleMap.COMPONENT);
                commUtil.findElementAndClick("//*[@id='select2-drop']/descendant::div[text()='Component']/following-sibling::ul/descendant::span[@class='select2-match']", addTestFromCycleMap.COMPONENT , function(findComponentStatus){
                    assert.ok(findComponentStatus, "Not Selected Component.");
                    logger.info("COMPONENT is Selected Successfully.");
                    callback(findComponentStatus);
                });
            }else{
                logger.info("COMPONENT is not there, Not Required to Select COMPONENT");
                callback(true);
            }
        }catch(err){
            throw err;
        }
    };
    selectLabelInAddTestToCyclePopup = function(addTestFromCycleMap, callback){
        try{
            if(addTestFromCycleMap.hasOwnProperty("LABEL")){
                driver.findElement(By.xpath("//*[@id='s2id_addTestsLabels']/descendant::input")).clear();
                driver.findElement(By.xpath("//*[@id='s2id_addTestsLabels']/descendant::input")).sendKeys(addTestFromCycleMap.LABEL);
                commUtil.findElementAndClick("//*[@id='select2-drop']/descendant::div[text()='Label']/following-sibling::ul/descendant::span[@class='select2-match']", addTestFromCycleMap.LABEL , function(findLabelStatus){
                    assert.ok(findLabelStatus, "Not Selected Label.");
                    logger.info("Label is Selected Successfully.");
                    callback(findLabelStatus);
                });
            }else{
                logger.info("Label is not there, Not Required to Select Label");
                callback(true);
            }
        }catch(err){
            throw err;
        }
    };
    selectLinkStatusInAddTestToCyclePopup = function(addTestFromCycleMap, callback){
        try{
            if(addTestFromCycleMap.hasOwnProperty("LINK_STATUS")){
                commUtil.returnAttributeValue(driver.findElement(By.xpath("//*[@id='addTestDefects']")), "checked", function(getCheckBoxSelectedStatus){
                    if(getCheckBoxSelectedStatus === "true"){
                        logger.info("Linked Defect Status Check Box is already Selected");
                        commUtil.wait_Element("//*[@id='s2id_addTestsComponent']/descendant::input");
                        driver.findElement(By.xpath("//*[@id='s2id_addTestsComponent']/descendant::input")).clear();
                        driver.findElement(By.xpath("//*[@id='s2id_addTestsComponent']/descendant::input")).sendKeys(addTestFromCycleMap.LINK_STATUS);
                        commUtil.findElementAndClick("//*[@id='select2-drop']/descendant::div[text()='Component']/following-sibling::ul/descendant::span[@class='select2-match']", addTestFromCycleMap.LINK_STATUS , function(findLinkStatusStatus){
                            assert.ok(findLinkStatusStatus, "Not Selected Link Status.");
                            callback(findLinkStatusStatus);
                        });
                    }else{
                        driver.findElement(By.xpath("//*[@id='addTestDefects']")).click();
                        commUtil.wait_Element("//*[@id='s2id_addTestsComponent']/descendant::input");
                        driver.findElement(By.xpath("//*[@id='s2id_addTestsComponent']/descendant::input")).clear();
                        driver.findElement(By.xpath("//*[@id='s2id_addTestsComponent']/descendant::input")).sendKeys(addTestFromCycleMap.LINK_STATUS);
                        commUtil.findElementAndClick("//*[@id='select2-drop']/descendant::div[text()='Component']/following-sibling::ul/descendant::span[@class='select2-match']", addTestFromCycleMap.LINK_STATUS , function(findLinkStatusStatus){
                            assert.ok(findLinkStatusStatus, "Not Selected Link Status.");
                            callback(findLinkStatusStatus);
                        });
                    }
                });

            }else{
                logger.info("Link Status is not there, Not Required to Select Link Status");
                callback(true);
            }
        }catch(err){
            throw err;
        }
    };

 };
 module.exports = new AddTestToCyclePage();
