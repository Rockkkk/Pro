var commUtil = require('../../utils/commUtil.js');

var CloneTestPage = function(){

    /******************************************************
     * 	WEBELEMENTS
     *****************************************************/

    var cloneTestHeader = element(by.xpath("//*[@id='clone-issue-dialog']//h2"));
    var enterSummary = element(by.id("summary"));
    //var createCloneButton = element(by.id("//*[@id='assign-issue-submit']));

    var xpathForCloneTestHeader = "//*[@id='clone-issue-dialog']//h2";
    var xpathForCloneTestLink = "//*[@id='assign-issue-submit']";

    /******************************************************
     * 	PAGE OBJECT METHODS
     *****************************************************/

    this.cloneTest = function(createTestMap, clonedTestStatus){
        try{
            commUtil.waitForElement(xpathForCloneTestHeader, browser.params.testdata.implicitWaitTimeMedium, function(waitForCloneTestHeader){
                assert.ok(waitForCloneTestHeader, "Not wited For clone Test Dialog.");
                commUtil.getTextByXpath("//*[@id='clone-issue-dialog']//h2", function(getTitle){
                    logger.info(getTitle);
                    assert.ok(getTitle.indexOf("Clone") != -1, "Not Validated Clone Test Dialog.");
                    //assert.ok(getTitle.indexOf(cloneTestMap.TESTNAME) != -1, "Not Validated Clone Test Dialog.");

                    if(createTestMap.SUMMARY === createTestMap.CLONESUMMARY){
                        var cloneSummary = "CLONE - "+createTestMap.SUMMARY;
                        createTestMap["CLONESUMMARY"] = createTestMap.SUMMARY;
                        createTestMap["SUMMARY"] = cloneSummary;
                        logger.info("Clone Summary 1 : "+createTestMap.SUMMARY);
                        logger.info("Clone Summary 2 : "+createTestMap.CLONESUMMARY);
                        commUtil.getAttributeValue("//*[@id='summary']", "value", function(getValue){
                            assert.equal(getValue, createTestMap.SUMMARY, "Not Validated Clone Summary.");

                            commUtil.clickOnElementByXpath(xpathForCloneTestLink, function(clickOnCloneStatus){
                                assert.ok(clickOnCloneStatus, "Not Clicked On Clone test");
                                commUtil.implicitWait(200000);
                                clonedTestStatus(clickOnCloneStatus);
                            });

                        });

                    }else{
                        var temp = createTestMap.SUMMARY;
                        createTestMap["SUMMARY"] = createTestMap.CLONESUMMARY;
                        createTestMap["CLONESUMMARY"] = temp;
                        logger.info("Clone Summary "+createTestMap.SUMMARY);
                        logger.info("Clone Summary "+createTestMap.CLONESUMMARY);
                        commUtil.sendTextToElement("//*[@id='summary']", createTestMap.SUMMARY, function(sendValueStatus){
                            assert.ok(sendValueStatus, "Not Validated Clone Summary.");
                            commUtil.clickOnElementByXpath(xpathForCloneTestLink, function(clickOnCloneStatus){
                                assert.ok(clickOnCloneStatus, "Not Clicked On Clone test");
                                commUtil.implicitWait(200000);
                                clonedTestStatus(clickOnCloneStatus);
                            });
                        });
                    }
                });

            });
        }catch(e){
            isClonedTest(false);
        }
        /*commUtil.waitForElementByXpath("/*//*[@id='clone-issue-dialog']//h2");
        commUtil.isElementDisplayed(cloneTestHeader).then(function(headerDisplayed){
            expect(headerDisplayed).toBe(true);
            if(headerDisplayed === true){
                enterSummary.clear();
                enterSummary.sendKeys(testSummary).then(function(){
                    createCloneButton.click();
                    driver.sleep(1000);
                });
            }
        });
*/
    };

};

module.exports= new CloneTestPage();
