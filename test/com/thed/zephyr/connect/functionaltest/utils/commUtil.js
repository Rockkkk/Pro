var webdriver = require('selenium-webdriver');
var fs = require("fs");
var commUtil =  function () {

    /******************************************************
     *  COMMON UTIL METHODS
     *****************************************************/

	var params = browser.params;
    this.navigateTo = function(url, callback) {
        driver.manage().window().maximize();
        driver.get(url, params.testdata.waitTimeOutMedium).then(function(getStatus){
            callback(getStatus);
        });
    };
    this.log = function(message) {
        driver.wait(function(){
            logger.info(message);
            return true;
        });
    };
/*    this.waitForElement = function(element, callback) {
        driver.wait(function(){
            element.then(function(elementEx){
                expect(elementEx.isDisplayed).toBe.true;
                callback(true);
            });
            return true;
        });
    };*/
 /*   this.waitForElement_ = function(xpathForElement, time, callback) {
        var flag = false;
      *//*  for(var i=0; i < 5 ; i++){
            driver.isElementPresent(By.xpath(xpathForElement)).then(function(el){
                flag = (el === true);
                return flag;
            });
        }*//*
        driver.wait(function(){
            return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(el){
                flag = (el === true);
                return flag;
            });
        },time).
            then(function(){
                driver.sleep(1000);
                callback(flag);
            });
    };
    this.waitForElement = function(xpathForElement, callback) {
       try{
           var flag = false;
        driver.wait(function(){
            return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(el){
                flag = (el === true);
                return flag;
            });
        },params.testdata.waitTimeOutMedium, "Page is not Loaded.").
            then(function(){
                driver.sleep(1000);
                callback(flag);
            });
       }catch(e){
            callback(flag);
       }
        
    };
    this.waitForElement1 = function(xpathForElement, time, callback) {
        var wait_time = time;
        var flag = false;
        try{
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(isPresent){
                    flag = (isPresent === true);
                    return flag;
                });
            },wait_time).then(function(){
                            driver.sleep(500);
                            callback(flag);
                        }, function(err) {
                            logger.info("Inside catch and error");
                            console.error(err);
                            callback(flag);
                        });
        }catch(err){
            logger.info("Inside catch");
            callback(flag);
        }
    };
    this.wait_Page_Load = function(xpathForElement, time, callback) {
        var wait_time = time;
        var flag = false;
        try{
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(el){
                    flag = (el === true);
                    return flag;
                });
            },wait_time).then(function(){
                driver.sleep(500);
                callback(flag);
            }, function(err) {
                logger.info("Inside catch and error");
                callback(flag);
            });
        }catch(err){
            logger.info("Inside catch");
            callback(flag);
        }
    };
    this.waitForElementAfterPageLoad = function(xpathForElement, callback) {
        var flag = false;
        driver.wait(function(){
            return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(el){
                flag = (el === true);
                return flag;
            });
        },params.testdata.waitTimeOutMedium, "Page is not Loaded.").
            then(function(){
                driver.sleep(1000);
                callback(flag);
            });
    };
    this.isElementVisible = function(xpathForElement, callback) {
        var flag = false;
        driver.wait(function(){
            return driver.isElementPresent(By.xpath(xpathForElement)).then(function(el){
                flag = (el === true);
                return flag;
            });
        },params.testdata.waitTimeOutMedium).
            then(function(){
                driver.sleep(1000);
                callback(flag);
            });
    };
   *//* this._Wait_Element = function(xpathForElement) {
        var deferred =Q.defer();
        var flag = false;
        driver.wait(function(){
            return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(elementStatus){
                flag = elementStatus;
                return flag;
            });
        },params.testdata.waitTimeOutLow, "Wait For Element Status Failed.").
            then(function(){
                if(flag){
                    deferred.resolve(flag);
                }else{
                    deferred.resolve(flag);
                }
        });
        return deferred.promise;
    };
    this._Wait_Element_PageLoad = function(xpathForElement) {
        var deferred = Q.defer();
        var flag = false;
        driver.wait(function(){
            return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(elementStatus){
                flag = elementStatus;
                return flag;
            });
        },params.testdata.waitTimeOutHigh, "Wait For Element Status Failed.").
            then(function(){
                if(flag){
                    deferred.resolve(flag);
                }else{
                    deferred.resolve(flag);
                }
            });
        return deferred.promise;
    };
    this._Wait_For_Title = function(title) {
        var deferred = Q.defer();
        var flag = false;
        driver.wait(function(){
            return driver.getTitle().then(function(getTitle){
                flag = (getTitle.indexOf(title) != -1);
                return flag;
            });
        },params.testdata.waitTimeOutMedium, "Wait For Title Failed.").
            then(function(){
                if(flag){
                    deferred.resolve(flag);
                }else{
                    deferred.resolve(flag);
                }
            });
        return deferred.promise;
    };
    this.click_ = function(elementXpath){
        var deferred = Q.defer();
        this._Wait_Element(elementXpath).then(function(status){
            if(status){
                    driver.findElement(By.xpath(elementXpath)).click().then(function(){
                        deferred.resolve(status);
                    });
            }else{
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    };*//*
    this.validateTitle = function(titleToValidate){
        try{
            driver.getTitle().then(function(title){
                expect(title).toContain(titleToValidate);
                logger.info("Page with title "+titleToValidate+" Validated successfully..!");
            });
        }
        catch(error){
            console.error(error);
        }

    };
    this.waitForTitle = function(title, callback) {
        driver.wait(function(){
            return    driver.getTitle().then(function(getTitle){
                //logger.info(getTitle+": : "+title);
                return (getTitle.indexOf(title) != -1);
            });
        },params.testdata.waitTimeOutHigh, "Wait For Title Failed.").
        then(function(waitForTitleStatus){
                driver.sleep(1000);
            callback(waitForTitleStatus);
        });
    };
    this.refresh = function() {
        driver.wait(function(){
            driver.navigate().refresh();
            return true;
        });
    };
   
    this.sleep = function(sleepTimeout) {
        driver.sleep(sleepTimeout);
        this.log('Waited for : '+sleepTimeout+' sec.');
    };
    this.implecitWait = function(implecitWaitTimeOut) {
        return driver.manage().timeouts().implicitlyWait(implecitWaitTimeOut);
    };
    this.pageLoadTimeOut = function(pageLoadTimeout){
        driver.manage().timeouts().pageLoadTimeout(pageLoadTimeout);
    };
    this.navigatBack = function() {
        this.sleep(1000);
        driver.wait(function(){
            driver.navigate().back();
            logger.info('Navigated back the Browser successfully.');
            return true;
        },params.testdata.waitTimeOutMedium, "Navigate back method Failed.");
        this.implecitWait(30000);
    };
    this.validatePageUsingCurUrl = function(url){
		var currenturl=driver.getCurrentUrl();
		expect(currenturl).toContain(url);
        this.log('Page validated successfully - '+url);
    };
    this.returnAttributeValue = function(element, attributeName, callback) {
        element.getAttribute(attributeName).then(function(attributeValue){
            callback(attributeValue);
        });
    };
    this.isElementPresent = function(elementxpath, time, callback) {
        try{
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(elementxpath)).then(function(element){
                    return element === true;
                });
            },time).then(function(abc){
                        callback(abc);
                    });
        }catch(err){
            callback(err);
        }
    };
    this.waitForElementInvisible = function(elementxpath, time, callback) {
        try{
            var flag = false;
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(el){
                    flag = (el === false);
                    return flag;
                });
            },40000, "Page is not Loaded.").
                then(function(){
                    driver.sleep(1000);
                    callback(flag);
                });
        }catch(err){
            throw err;
        }
    };
    this.waitForElementToBeInvisible = function(elementxpath, time, callback) {
        try{
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(elementxpath)).then(function(element){
                    return element === false;
                });
            },15000).then(function(flag){
                callback(flag);
            });
        }catch(err){
            callback(false);
        }
    };
    this.clickElement = function(element) {
        
            expect(element.isVisible()).toBe.true;
            logger.info("Element is displayed.");
            element.click();
         
    };
    this.isElementEnabled = function(element) {
        
            expect(element.isEnabled()).toBe.true;
            logger.info("Element is Enabled.");
        
    };
    this.returnBackFromFrame = function() {
        driver.wait(function(){
            driver.switchTo().defaultContent();
            logger.info("Returned back successfully From Frame.");
            return true;
        }, params.testdata.waitTimeOutMedium);
    };
    this.switchToFrame = function(webelement) {
        return driver.wait(function(){
            return driver.switchTo().frame(webelement);
        }, params.testdata.waitTimeOutMedium);
    };

    this.switchToFrameByxpath = function(xpathForFrame, callback) {
       driver.wait(function(){
            return    driver.isElementPresent(by.xpath(xpathForFrame)).then(function(element){
                      return element === true;
            });
        }, params.testdata.waitTimeOutMedium).then(function(elementStatus){
           driver.sleep(1000);
           if(elementStatus){
               driver.switchTo().frame(driver.findElement(By.xpath(xpathForFrame)));
               callback(elementStatus);
           }else{
               callback(elementStatus);
           }
        });


        *//*waitForElement(xpathForFrame, function(waitElementStatus){
            expect(waitElementStatus).toBe.true;
            driver.switchTo().frame(driver.findElement(By.xpath(xpathForFrame)));
            logger.info("Switched Successfully to the Frame.");
            callback(true)
        });
        *//*
    };
    this.quit = function() {
        driver.quit();
    };
    this.click = function(element, callback) {
        element.click().then(function(){ 
           // element.click();          
            callback(true);
         });        
    };
    this.getText = function(element, callback) {
            element.getText().then (function(text){             
            callback(text);
         });        

    };
    this.getTextByXpath = function(xpathForElement, callback) {
        driver.wait(function(){
            return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(element){
                return element === true;
            });
        },params.testdata.waitTimeOutMedium, "Get Text method Failed.")

            .then(function(){
                driver.sleep(2000);
                driver.findElement(By.xpath(xpathForElement)).getText().then(function(getText){
                    callback(getText);
                });
            });

    };
    this.returnWebelement = function(xpath, callback) {
        driver.findElement(by.xpath(xpath)).then(function(element){
            callback(element);
        });
    };
    this.sendTextToWebelement = function(xpathOfElement, textToSend, callback) {
        driver.wait(function(){
            return    driver.isElementPresent(By.xpath(xpathOfElement)).then(function(element){
                      return element === true;
            });
        }, params.testdata.waitTimeOutMedium).then(function(){
            driver.sleep(1000);
            driver.findElement(By.xpath(xpathOfElement)).then(function(element){
                element.clear();
                element.sendKeys(textToSend);
                callback(true);
            });
            
        });

        
    };
    this.clickOnElementByxpath = function(xpathForElement, callback){
        var flag = false;
        driver.wait(function(){
            return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(el){
                flag = (el === true);
                return flag;
            });
        },params.testdata.waitTimeOutLow, "Page is not Loaded.").
            then(function(){
                if(flag){
                    driver.sleep(1000);
                    driver.findElement(By.xpath(xpathForElement)).click().then(function(){
                        callback(flag);
                    });
                }else{
                    callback(false);
                }
            });
    };
    this.selectDropdownbyNum = function ( element, optionNum ) {
      if (optionNum){
        var options = driver.findElements(by.tagName('option'))
          .then(function(options){
            options[optionNum].click();
          });
      }
    };
    this.selectDropdownByTexts = function(element, texts, callback) {
        element.click().then(function(clickElementStatus){
            expect(clickElementStatus).toBe.true;
            element.findElements(by.xpath("option")).then(function(options){
                var flag = false;
                for(var i=0; i< options.length; i++){
                    (function(x){
                        options[x].getText().then(function(getText){
                            logger.info(getText +" : "+ texts);
                            if(texts === getText){
                                flag = true;
                                options[x].click().then(function(clickStatus){
                                    expect(clickStatus).toBe.true;
                                    driver.sleep(1000);
                                    callback(clickStatus);
                                });
                            }
                        });
                    })(i);
                }
            });

        });


        *//*element.findElements(by.tagName('option'))
            .then(function(options) {


                var flag = false;
                for(var i=0; i< options.length; i++){
                    (function(i){
                        options[i].getText().then(function(getText){
                            logger.info(getText +" : "+ index);
                            if(index === getText){
                                flag = true;
                            }
                        });
                    })(x);

                }
                options[index].click();
            });
        if (typeof milliseconds !== 'undefined') {
            browser.sleep(milliseconds);
        }*//*
    };
    this.selectDropdownByText = function(element, item, callback) {
        var desiredOption;
        element.findElements(by.tagName('option'))
            .then(function findMatchingOption(options) {
                options.some(function (option) {
                    option.getText().then(function doesOptionMatch(text) {
                        if (text.indexOf(item) != -1) {
                            desiredOption = option;
                            return true;
                        }
                    });
                });
            })
            .then(function clickOption() {
                //logger.info(desiredOption);
                if (desiredOption) {
                    logger.info("Searched Element From Drop Down.");
                    desiredOption.click().then(function(clickStatus){
                        callback(true);
                    });

                }else{
                    callback(false);
                }

            });
        *//*if (typeof milliseconds != 'undefined') {
            browser.sleep(milliseconds);
        }*//*
    };
    this.searchElementsAndClick = function(xpathForElements, searchText, callback){
        driver.findElements(By.xpath(xpathForElements)).then(function(elements){                    
            var flag = false;
            for (var i = 0 ; i < elements.length; i++){
                                                
                currentElement = element.all(by.xpath(xpathForElements)).get(i);
                                            
                currentElement.getText().then(function(getText){

                    if(!flag){
                        if(searchText === getText){
                            flag = true;
                            currentElement.click().then(function(){
                                logger.info(searchText+" searched and Clicked Successfully.");
                                callback(flag);
                            });
                        }
                    }
                });
            }
        });

    };
    this.searchElementsContainAndClick = function(xpathForElements, searchText, callback){
        driver.findElements(By.xpath(xpathForElements)).then(function(elements){                    
            var flag = false;
            for (var i = 0 ; i < elements.length; i++){

                (function(x){

                    currentElement = element.all(by.xpath(xpathForElements)).get(x);
                   // var currentElement = driver.findElements(By.xpath(xpathForElements)).get(x);
                    currentElement.getText().then(function(getText){

                        if(!flag){
                            if(getText === searchText){
                                flag = true;
                                currentElement.click().then(function(){
                                    logger.info(searchText + " searched and Clicked Successfully.");
                                    callback(flag);
                                });
                            }
                        }
                    });

                })(i);

            }
        });

    };
    this.findElementAndClick = function(xpathForElement, searchText, callback){
        try{
            element.all(by.xpath(xpathForElement)).filter(function(elem, index) {
                return elem.getText().then(function(text) {
                    return text === searchText;
                 });
            }).then(function(filteredElements) {
                filteredElements[0].click();
                callback(true);
            });
        }catch(err){
            console.error(err);
        }
    };
    this.findTextFromElements = function(xpathForElement, searchText, callback){
        try{
            element.all(by.xpath(xpathForElement)).filter(function(elem, index) {
                return elem.getText().then(function(text) {
                    return text === searchText;
                });
            }).then(function(filteredElements) {
                logger.info("Find Element : " + filteredElements);
                callback(true);
            });
        }catch(err){
            console.error(err);
        }
    };
    this.findTextFromBulkText = function(xpathForElement, searchText, callback){
        try{
            element.all(by.xpath(xpathForElement)).filter(function(elem, index) {
                return elem.getText().then(function(text) {
                    return text.indexOf(searchText) != -1;
                });
            }).then(function(filteredElements) {
                logger.info("Find Element : " + filteredElements);
                callback(true);
            });
        }catch(err){
            console.error(err);
        }
    };
    this.searchTextFromElements = function(xpathForElements, searchText, callback){
        var flag = false;
        try{
            driver.findElements(By.xpath(xpathForElements)).then(function(elements){                    
                
                for (var i = 0 ; i < elements.length; i++){
                    (function(x){

                        var currentElement = element.all(by.xpath(xpathForElements)).get(x);

                        currentElement.getText().then(function(getText){

                            if(!flag){
                                if(searchText === getText ){
                                    flag = true;
                                    callback(flag);
                                }
                            }
                        });

                    })(i);                                
                    
                }
            });

        }catch(err){
            console.error(err);
            //callback(flag);
        }
        
    };
    this.hoverElement = function(elementToMove, callback){
        driver.wait(function(){
            browser.actions().mouseMove(elementToMove).perform();
            callback(true);
            return true;
        });
    };
    this.hoverElementUsingXpath = function(xpathOfElement, callback){
        driver.wait(function(){
            return    driver.isElementPresent(By.xpath(xpathOfElement)).then(function(element){
                return element === true;
            });
        },params.testdata.waitTimeOutMedium).
        then(function(elementStatus){
                //driver.sleep(2000);
            expect(elementStatus).toBe.true;
            browser.actions().mouseMove(driver.findElement(By.xpath(xpathOfElement))).perform();
            callback(elementStatus);
        });

    };
    this.moveToElementByXpath = function(xpathForMove){
        driver.wait(function(){
            logger.info("Wait for element to appear");
            //expect(driver.isElementPresent(by.xpath(xpathForElement))).toBe.true;
            return    driver.isElementPresent(by.xpath(xpathForMove)).then(function(el){
                return el === true && driver.findElement(By.xpath(xpathForMove)).isEnabled() && driver.findElement(By.xpath(xpathForMove)).isDisplayed();;
            });
        },params.testdata.waitTimeOutMedium, "Wait For Element Status Failed.")
            .then(function(abc){
                var filter = driver.findElement(By.xpath(xpathForMove));
                var scrollIntoView = function () {
                    arguments[0].scrollIntoView();
                };
                driver.executeScript(scrollIntoView, filter);              
            });

    };
    this.changeToWebElement = function(xpath){
        try{
            return driver.findElement(by.xpath(xpath));
        }
        catch (error){
            console.error(error);
            return null;
        }

    };
    this.switchToDefaultWindow = function() {
        return driver.wait(function(){
            return driver.switchTo().defaultContent();
        }, 20000);
    };

    this.actionClass = function(){
        return new webdriver.ActionSequence(driver);
    };
    this.isElementDisplayed = function(webElement){
        try{
            return webElement.isDisplayed();
        }
        catch (error){
            console.error(error);
            return null;
        }

    };
    this.getTextUsingWebElement = function(webElement){
        try{
            return webElement.getText();
        }
        catch (error){
            console.error(error);
            return null;
        }

    };
    this.getAttributeValueUsingWebElement = function(webElement,attribute){
        try{
            return webElement.getAttribute(attribute);
        }
        catch (error){
            console.error(error);
            return null;
        }

    };
    this.isElementPresentWithOutCallback = function(element){
        try{
            driver.isElementPresent(element).then(function(result){
                return result;
            });
        }
        catch(error){
            console.error("element not found...");
        }

    };
    this.waitForElementByXpath = function(xpathForElement) {
        driver.wait(function(){
            return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(element){
                return element === true;
            });
        },params.testdata.waitTimeOutMedium);
    };
    this.clickOnElement = function(xpath){
        driver.wait(function(){
            return driver.isElementPresent(by.xpath(xpath)).then(function(element){
                return element;
            });
        },params.testdata.waitTimeOutMedium).
            then(function(result){
                if(result === true){
                    return driver.findElement(by.xpath(xpath)).then(function(element){
                        return element.click();
                    });
                }
                else{
                    logger.info("Element unable to click.");
                }
            });

    };

    this.selectOption =  function(selector, item, callback) {
        var selectList, desiredOption;
        selectList = driver.findElement(by.xpath(selector));

        selectList.findElements(By.tagName('option'))
            .then(function findMatchingOption(options) {
                options.some(function (option) {
                    option.getText().then(function doesOptionMatch(text) {
                        if (item === text) {
                            desiredOption = option;
                            return true;
                        }
                    });
                });
            })
            .then(function clickOption() {
                if (desiredOption) {
                    desiredOption.click().then(function(clickStatus){
                        callback(clickStatus);
                    });
                }
            });
    };
    this.scrollToTop = function(callback){
        try{
            driver.executeScript('window.scrollTo(0,0);').then(function (scrollStatus) {
                expect(scrollStatus).toBe.true;
                callback(scrollStatus);
            })
        }catch (err){
            throw  err;
        }
    };
    this.wait_Element = function(xpathForElement) {
        driver.wait(function(){
            return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(element){
                return element === true;
            });
        },params.testdata.waitTimeOutMedium, "Wait For Element Status Failed.")
            .then(function(elementStatus){
                return elementStatus;
            });
    };
    this.return_Element = function(xpathForElement) {
        driver.wait(function(){
            return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(el){
                return el === true;
            });
        },params.testdata.waitTimeOutMedium, "Wait For Element Status Failed.").
            then(function(elementStatus){
                if(elementStatus){
                    return driver.findElement(by.xpath(xpathForElement)).then(function(element){
                        return element;
                    });
                }else{
                    return null;
                }
            });
    };*/
    //===================================================================================================
    this.waitForElement = function(xpathForElement, time, waitForElementStatus) {
        var wait_time = time;
        var flag = false;
        try{
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(isPresent){
                    flag = (isPresent === true);
                    return flag;
                });
            },wait_time).then(function(){
                driver.sleep(500);
                waitForElementStatus(flag);
            }, function(err) {
                console.error(xpathForElement + " : is not present in this page.");
                waitForElementStatus(flag);
            });
        }catch(err){
            waitForElementStatus(flag);
        }
    };
    this.waitForPageLoad = function(xpathForElement, waitForPageLoadStatus) {
        var wait_time = browser.params.testdata.implicitWaitTimeMedium;
        var flag = false;
        try{
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(isPresent){
                    flag = (isPresent === true);
                    return flag;
                });
            },wait_time).then(function(){
                driver.sleep(300);
                waitForPageLoadStatus(flag);
            }, function(err) {
                console.error(xpathForElement + " : is not present in this page.");
                waitForPageLoadStatus(flag);
            });
        }catch(err){
            waitForPageLoadStatus(flag);
        }
    };
    this.isElementVisible = function(xpathForElement, isVisible) {
        var wait_time = browser.params.testdata.implicitWaitTimeLow;
        var flag = false;
        try{
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(isPresent){
                    flag = (isPresent === true);
                    return flag;
                });
            },wait_time).then(function(){
                driver.sleep(500);
                isVisible(flag);
            }, function(err) {
                console.error(xpathForElement + " : is not present in this page.");
                isVisible(flag);
            });
        }catch(err){
            //logger.info("Inside catch");
            isVisible(flag);
        }
    };
    /*this.isElementInVisible = function(xpathForElement, isInVisible) {
        var wait_time = browser.params.testdata.implicitWaitTimeLow;
        var flag = false;
        try{
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(isPresent){
                    flag = (isPresent === false);
                    return flag;
                });
            },wait_time).then(function(){
                driver.sleep(500);
                isInVisible(flag);
            }, function(err) {
                console.error(xpathForElement + " : is still present in this page.");
                isInVisible(flag);
            });
        }catch(err){
            logger.info("Inside catch");
            isInVisible(flag);
        }
    };*/
    this.isElementInVisible = function(xpathForElement, isInVisible) {
        var wait_time = browser.params.testdata.implicitWaitTimeLow;
        var flag = false;
        try{
            driver.wait(function(){
                return driver.isElementPresent(by.xpath(xpathForElement)).then(function(isPresent){
                    flag = (isPresent == false);
                   // logger.info(flag+"   =="+isPresent);
                    driver.sleep(500);
                    return flag;
                });
            },wait_time).then(function(abc){
                driver.sleep(500);
                //logger.info("<>>>>>>>><<< "+abc);
                isInVisible(abc);
            }, function(err) {
                console.error(xpathForElement + " : is still present in this page.");
                isInVisible(flag);
            });
        }catch(err){
            //logger.info("Inside catch");
            isInVisible(flag);
        }
    };
    this.waitForTitle = function(title, waitForTitleStatus) {
        var wait_time = browser.params.testdata.PageLoadTimeOut;
        var flag = false;
        try{
            driver.wait(function(){
                return    driver.getTitle().then(function(getTitle){
                    //logger.info("title : "+getTitle);
                    flag = (getTitle.indexOf(title) != -1);
                    return flag;
                });
            },wait_time).then(function(){
                driver.sleep(500);
                waitForTitleStatus(flag);
            }, function(err) {
                console.error(title + " : is not available in this page.");
                waitForTitleStatus(flag);
            });
        }catch(err) {
            //logger.info("Inside catch");
            waitForTitleStatus(flag);
        }
    };
    this.sendTextToElement = function(xpathOfElement, textToSend, sendTextToElementStatus) {
        var wait_time = 10000;
        var flag = false;
        try{
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(xpathOfElement)).then(function(elementStatus){
                    flag = (elementStatus === true);
                    return flag;
                });
            },wait_time).then(function(){
                driver.sleep(500);
                driver.findElement(By.xpath(xpathOfElement)).then(function(element){
                    element.clear();
                    element.sendKeys(textToSend).then(function(){
                        sendTextToElementStatus(flag);
                    });
                });
            }, function(err) {
                console.error(xpathOfElement + " : is not present in this page to send Text.");
                sendTextToElementStatus(flag);
            });
        }catch(err) {
            sendTextToElementStatus(flag);
        }
    };
    this.clickOnElementByXpath = function(xpathForElement, clickOnElementStatus){
        var wait_time = 10000;
        var flag = false;
        try{
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(isPresent){
                    flag = (isPresent === true);
                    return flag;
                });
            },wait_time).then(function(){
                if(flag){
                    driver.sleep(100);
                    driver.findElement(By.xpath(xpathForElement)).click().then(function(){
                        clickOnElementStatus(flag);
                    });
                }else{
                    clickOnElementStatus(false);
                }
            }, function(err) {
                console.error(xpathForElement + " : is not present in this page to Click.");
                clickOnElementStatus(false);
             });
        }catch(err) {
            clickOnElementStatus(false);
        }
    };
    this.hoverElementByXpath = function(xpathForElement, hoverElementStatus){
        var wait_time = 10000;
        var flag = false;
        try{
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(isPresent){
                    flag = (isPresent === true);
                    return flag;
                });
            },wait_time).then(function(){
                driver.sleep(500);
                browser.actions().mouseMove(driver.findElement(By.xpath(xpathForElement))).perform();
                hoverElementStatus(flag);
            }, function(err) {
                console.error(xpathForElement + " : is not present in this page to hover.");
                hoverElementStatus(flag);
            });
        }catch(err) {
            hoverElementStatus(flag);
        }
    };
    this.implicitWait = function(implicitWaitTime) {
        return driver.manage().timeouts().implicitlyWait(implicitWaitTime);
    };
    this.getTextByXpath = function(xpathForElement, getText) {
        var wait_time = 15000;
        var flag = null;
        try{
            driver.wait(function(){
                return    driver.isElementPresent(By.xpath(xpathForElement)).then(function(isPresent){
                    flag = (isPresent === true);
                    return flag;
                });
            },wait_time).then(function(){
                driver.sleep(500);
                //logger.info("1245");
                driver.findElement(By.xpath(xpathForElement)).getText().then(function(text){
                    flag = text;
                    getText(flag);
                });
            }, function(err) {
                console.error(xpathForElement + " : is not present in this page to get the text.");
                getText(flag);
            });
        }catch(err) {
            getText(flag);
        }
    };
    this.moveToElementByXpath = function(xpathForElement, moveToElementStatus){
        var wait_time = 15000;
        var flag = false;
        try{
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(isPresent){
                    flag = (isPresent === true);
                    return flag;
                });
            },wait_time).then(function(){
                driver.sleep(300);
                var filter = driver.findElement(By.xpath(xpathForElement));
                var scrollIntoView = function () {
                    arguments[0].scrollIntoView();
                };
                driver.executeScript(scrollIntoView, filter).then(function(retValue) {
                    logger.info("Move : "+retValue);
                    flag = true;
                    moveToElementStatus(true);
                });
            }, function(err) {
                console.error(xpathForElement + " : is not present in this page to move.");
                moveToElementStatus(false);
            });
        }catch(err) {
            moveToElementStatus(false);
        }
    };
    this.doClick = function(element, callback){
        driver.executeScript("arguments[0].click();", element).then(function(clickStatus){
            //logger.info("Element is Clicked Successfully : " + clickStatus);
            callback(true);
        }, function(err){
            console.error(err.message);
        });
    };
    this.doClickByXpath = function(xpathForElement, callback){
        driver.findElement(By.xpath(xpathForElement)).then(function(element){
            driver.executeScript("arguments[0].click();", element).then(function(clickStatus){
                //logger.info("Element is Clicked Successfully : " + clickStatus);
                callback(true);
            }, function(err){
                console.error(err.message);
            });
        });
    };
    this.findTextFromBulkText = function(xpathForElement, searchText, findTextStatus){
        var flag = false;
        try{
            element.all(by.xpath(xpathForElement)).filter(function(elem, index) {
                return elem.getText().then(function(text) {
                    //logger.info(text + searchText + (text.indexOf(searchText) != -1));
                    //logger.info("Index : "+index);
                    return (text == searchText);
                });
            }, function(err) {
                console.error(searchText + " is not found in the group text.");
                return false;
            }).then(function(abc) {
                //logger.info("-----------------"+abc);
                findTextStatus(abc);
            }, function(err) {
                console.error(searchText + " is not present in the group text.");
                findTextStatus(false);
            });
        }catch(err){
            findTextStatus(false);
        }
    };
    this.findTextFromElements = function(xpathForElement, searchText, findTextStatus){
        var flag = false;
        try{
            element.all(by.xpath(xpathForElement)).filter(function(elem, index) {
                return elem.getText().then(function(text) {
                    logger.info(text + searchText  +(text == searchText));
                    return (text == searchText);
                });
            }).then(function(temp) {
                logger.info("==============="+temp);
                findTextStatus(temp);
            }, function(err) {
                console.error(err.message);
                logger.info("error");
                findTextStatus(flag);
            });
        }catch(err){
            console.error(err.message);
            findTextStatus(flag);
        }
    };
    this.switchToFrameByXpath = function(xpath, isSwitch) {
        var wait_time = 10000;
        var flag = false;
        var xpathForFrame = "";
        try{
            if(browser.params.testdata.environment === "prod"){
                xpathForFrame = xpath.replace("cloud", "je");
                logger.info("Xpath For Switch in Prod : "+xpathForFrame);
            }else{
                xpathForFrame = xpath;
                logger.info("Xpath For Switch : "+xpathForFrame);
            }
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(xpathForFrame)).then(function(isPresent){
                    flag = (isPresent === true);
                    return flag;
                });
            },wait_time).then(function(){
                driver.sleep(500);
                logger.info("Frame Found For Switch.");
                driver.switchTo().frame(driver.findElement(By.xpath(xpathForFrame))).then(function(switchStatus){
                    logger.info(" Switch Status : "+switchStatus);
                    flag = true;
                    isSwitch(flag);
                });
            }, function(err) {
                console.error(xpathForFrame + " : is not present in this page to Switch.");
                isSwitch(flag);
            });
        }catch(err) {
            isSwitch(flag);
        }
    };
    this.getCount = function(xpathFoeElement, getElementCount){
        var count = 0;
        var flag = false;
        var wait_time = 10000;
        try{
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(xpathFoeElement)).then(function(isPresent){
                    flag = (isPresent === true);
                    return flag;
                });
            },wait_time).then(function(){
                driver.sleep(500);
                element.all(by.xpath(xpathFoeElement)).count().then(function(elementCount){
                    count = elementCount;
                    logger.info("==================");
                    logger.info(typeof count);
                    getElementCount(count);
                }, function(err) {
                    console.error(err+ " : throwing err count.");
                    getElementCount(count);
                });
            }, function(err) {
                console.error(err+ " : throwing err count.");
                console.error(xpathFoeElement + " : is not present in this page to get the count.");
                getElementCount(count);
            });
        }catch(err) {
            getElementCount(count);
        }
    };
    this.searchTextFromElements = function(xpathForElements, searchText, callback){
        var flag = false;
        try{
            this.getCount(xpathForElements, function(elementCount){

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
                        element.getText().then(function(text){
                            //logger.info("Text : ::: "+text+"::"+searchText);
                            if(text === searchText){
                                flag = true;
                                return true;
                            }
                        }, function(err) {
                            console.error(err+ " : throwing err count.");
                            callback(flag);
                        });
                    }).then(function(){
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
    this.searchTextFromElementsAndClick = function(xpathForElements, searchText, callback){
        var flag = false;
        try{
            this.getCount(xpathForElements, function(elementCount){

                logger.info("Element size : : : "+elementCount +(elementCount === 1));
                if(elementCount === 1){
                    driver.findElement(By.xpath(xpathForElements)).getText().then(function(text){
                        /*logger.info("Element text : : : "+text);
                        logger.info("Element text Status : : : "+(text === searchText));*/
                        if(text === searchText) {
                            flag = true;
                            driver.findElement(By.xpath(xpathForElements)).click().then(function () {
                                callback(flag);
                            });
                        }
                    }, function(){
                        callback(flag);
                    });
                }else{
                    logger.info("Else part ------- ");
                    element.all(by.xpath(xpathForElements)).each(function(element) {
                        // Will print First, Second, Third.
                        element.getText().then(function(text){
                            logger.info("Text : ::: "+text+"::"+searchText);
                            if(text === searchText){
                                element.click().then(function(){
                                    flag = true;
                                    callback(flag);
                                });
                            }
                        }, function(err) {
                            console.error(err+ " : throwing err count.");
                            callback(flag);
                        });
                    }).then(function(){
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
    this.getAttributeValue = function(xpathForElement, attributeName, getAttribute) {
        var wait_time = 10000;
        var flag = false;
        try{
            driver.wait(function(){
                return    driver.isElementPresent(by.xpath(xpathForElement)).then(function(isPresent){
                    flag = (isPresent === true);
                    return flag;
                });
            },wait_time).then(function(){
                driver.sleep(500);
                driver.findElement(By.xpath(xpathForElement)).getAttribute(attributeName).then(function(attributeValue){
                    //logger.info(attributeValue);
                    getAttribute(attributeValue);
                }, function(err) {
                    console.error(xpathForElement + " : is not present in this page to get the Attribute.");
                    getAttribute(null);
                });
            }, function(err) {
                console.error(xpathForElement + " : is not present in this page to get the Attribute.");
                getAttribute(null);
            });
        }catch(err) {
            getAttribute(null);
        }
    };
    this.selectDropdownByTexts = function(element, texts, callback) {
        element.click().then(function (clickElementStatus) {
            expect(clickElementStatus).toBe.true;
            element.findElements(by.xpath("option")).then(function (options) {
                var flag = false;
                for (var i = 0; i < options.length; i++) {
                    (function (x) {
                        options[x].getText().then(function (getText) {
                            logger.info(getText + " : " + texts);
                            if (texts === getText) {
                                flag = true;
                                options[x].click().then(function (clickStatus) {
                                    //assert.ok(clickStatus).toBe.true;
                                    driver.sleep(1000);
                                    callback(true);
                                });
                            }
                        });
                    })(i);
                }
            });

        });
    };
    this.selectDropdownByText = function(element, item, callback) {
        var desiredOption;
        try{
            element.findElements(by.tagName('option'))
                .then(function findMatchingOption(options) {
                    options.some(function (option) {
                        option.getText().then(function doesOptionMatch(text) {
                            //logger.info(text+"::"+item);
                            if (text.indexOf(item) != -1) {
                                desiredOption = option;
                                return true;
                            }
                        });
                    });
                }).then(function clickOption() {
                    if (desiredOption) {
                        desiredOption.click().then(function(){
                            callback(true);
                        });
                    }
                }, function(e){
                    callback(false);
                });
            var milliseconds = 500;
            if (typeof milliseconds != 'undefined') {
                browser.sleep(milliseconds);
            }
        }catch(err){

        }
    };
    this.actionClass = function(){
        return new webdriver.ActionSequence(driver);
    };
    this.isAttribtuePresent =  function(element, attribute) {
        var result = false;
        try {
            element.getAttribute(function(attribute){
                if (value != null){
                    result = true;
                }
            });
            var value = element.getAttribute(attribute);

        } catch (err) {}

        return result;
    };
    this.titleContains = function(){

    };
    this.fileSize = function(filename) {
        var stats = fs.statSync(filename)
        var fileSizeInBytes = stats["size"]
        return fileSizeInBytes;
    };
    this.returnWebelement = function(xpath, callback) {
        driver.findElement(by.xpath(xpath)).then(function(element){
            callback(element);
        });
    };
};

module.exports = new commUtil();