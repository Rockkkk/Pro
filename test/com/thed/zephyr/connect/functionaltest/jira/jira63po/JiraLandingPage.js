var commUtil = require('../../utils/commUtil.js');
var loginPage = require('./LoginPage.js');
var AdministratorAccessPage = require('./AdministratorAccessPage.js');

var JiraLandingPage =  function () {  
	/******************************************************
   	 *  JIRA LANDING PAGE
   	 *****************************************************/

  	/******************************************************
   	 *  WEBELEMENTS
   	 *****************************************************/
    var testMenu = element(by.linkText('Tests'));
    var createTest = element(by.linkText('Create a Test'));
    var searchTest = element(by.linkText('Search Tests'));
    var planTestCycle = element(by.linkText('Plan Test Cycle'));
    var searchTestExec = element(by.linkText('Search Test Executions'));
    var manageExecFilter = element(by.linkText('Manage Execution Filters'));
    var executeTest = element(by.linkText('Execute Tests'));
    var testSummary = element(by.xpath('//div/ul/li/a[text()="Test Summary"]'));
    var testMetrics = element(by.linkText('Test Metrics'));
    var zfjWelcome = element(by.linkText('Welcome'));
    var zfjHelp = element(by.linkText('Zephyr Help'));
    var aboutZfj = element(by.linkText('About Zephyr'));

     var profileDrpDwn = element(by.id('header-details-user-fullname'));
     var logoutLnk = element(by.id('log_out'));
     var adminMenu = element(by.xpath("//*[@id='admin_menu']/*[text()='Administration']"));
     var adminPluginMenu = element(by.id('admin_plugins_menu'));
     var zfjGeneralConfigLink = element(by.id('com.thed.zephyr.cloud__zephyr-gen-config'));

     var xpathForTestMenu = "//a[text()='Tests']" ;
     var xpathForSearchTestsMenu = "//a[text()='Search Tests']" ;
     var xpathForPlanTestCycleMenu = "//a[text()='Plan Test Cycle']" ;
     var xpathForSearchTestExecutionMenu = "//a[text()='Search Test Executions']" ;
     var xpathForProfileDrpDwn = "//*[@id='header-details-user-fullname']" ;
     var xpathForLogoutLink = "//*[@id='log_out']" ;
     var xpathForAdminMenu = "//*[@id='admin_menu']/*[text()='Administration']";
     var xpathForAdminPluginMenu = "//*[@id='admin_plugins_menu']";
     var xpathForCustomizedTestStatusLink = "//a[text()='Customize Test Status']";
     var xpathForCustomizedStepStatusLink = "//a[text()='Customize Step Status']";
     var xpathForManageAddOnsLink = "//a[text()='Manage add-ons']";
     var xpathForTestSummaryLink = "//a[text()='Test Summary']";
     var xpathForExecuteTestLink = "//a[text()='Execute Tests']";
     var xpathForTestMetricsLink = "//a[text()='Test Metrics']";
     var xpathForWelcomePageLink = "//a[text()='Welcome']";
     var xpathForZephyrHelpLink = "//a[text()='Zephyr Help']";
     var xpathForAboutZephyrPage = "//a[text()='About Zephyr']";
     var xpathForApiAccessMenu = "//a[text()='API Keys']" ;

    //project Creation elements
    var xpathForProjectLink = "//*[@id='browse_link']";
    var xpathForCreateProjectLink = "//*[@id='project_template_create_link_lnk']";
    var xpathForCreateProjectHeader = "//*[@id='add-project-dialog']//h2[contains(@class, 'add-project-dialog-header')]";
    var xpathForSelectSchema = ".//*[@id='add-project-dialog']//*[@title='JIRA Default Schemes']";
    var xpathForSelectProjectManagementSchema = "//*[@id='add-project-dialog']//*[@title='Project management']";
    var xpathForCreateProjectNextButton = "//*[@id='add-project-dialog']//button[text()='Next']";
    var xpathForProjectNameTextBox = "//*[@id='add-project-dialog']//*[@id='name']";
    var xpathForProjectSubmitBtn = "//*[@id='add-project-dialog']//*[text()='Submit']";

    var xpathForAdminIssueLink = "//*[@id='admin_issues_menu']";
    var xpathForIssueTypeSchemaLink = "//*[@id='issue_type_schemes']";

   	/******************************************************
   	 *  PAGE OBJECT METHODS
   	 *****************************************************/

    this.logout = function(isLogout) {
         try{
             driver.sleep(1000);
             commUtil.hoverElementByXpath(xpathForProfileDrpDwn, function(hoverOnProfileDrpStatus){
                 assert.ok(hoverOnProfileDrpStatus, "Not Found profile drop down link to Hover : " + xpathForProfileDrpDwn);

                 commUtil.doClickByXpath( xpathForProfileDrpDwn, function(clickOnProfileDrpDwnLinkStatus){
                     assert.ok(clickOnProfileDrpDwnLinkStatus, "Not Found Profile drop down link to Click : " + xpathForProfileDrpDwn);
                     logger.info("Clicked on Profile Drop Down Link Successfully.");

                     commUtil.clickOnElementByXpath( xpathForLogoutLink, function(clickOnProfileDrpDwnLinkStatus){
                         assert.ok(clickOnProfileDrpDwnLinkStatus, "Not Clicked on Logout Link.");
                         logger.info("Clicked on Logout Link Successfully.");

                         loginPage.loginAgain(function(loginAgainStatus){
                             assert.ok(loginAgainStatus, "Login Again Failed.");
                             isLogout(loginAgainStatus);
                         });
                     });
                 });
             });
         }catch(e){
            console.error(e);
         }
    };
    this.navigateToCreateTestPage = function(isNavigateCreateTestPage) {
        try{
            commUtil.waitForElement( xpathForTestMenu, browser.params.testdata.implicitWaitTimeMedium, function(testMenuLinkVisibleStatus){
                assert.ok(testMenuLinkVisibleStatus, "Not Visible Test Link.");

                commUtil.doClickByXpath( xpathForTestMenu, function(clickOnTestMenuLinkStatus){
                    assert.ok(clickOnTestMenuLinkStatus, "Not Clicked On Test Drop Down.");
                    logger.info("Clicked on Test Menu Link Successfully.");

                    commUtil.isElementVisible("//a[text()='Create a Test']", function(createTestsMenuLinkVisibleStatus){
                        assert.ok(createTestsMenuLinkVisibleStatus, "Not Visible Test Drop Down.");

                        commUtil.clickOnElementByXpath("//a[text()='Create a Test']", function(clickOnCreateTestLinkStatus){
                            assert.ok(clickOnCreateTestLinkStatus, "Not Visible Test Drop Down.");
                            logger.info("Clicked on Create a Test Link Successfully.");
                            commUtil.implicitWait(browser.params.testdata.implicitWaitTimeHigh);
                            isNavigateCreateTestPage(clickOnCreateTestLinkStatus);
                        });
                    });
                });
            });
        }catch(err){
            isNavigateCreateTestPage(false);
        }
    };
    this.navigateToSearchTestPage = function(isNavigateToSearchTestPage) {
        try{
            driver.getTitle().then(function(title){
                if(title.indexOf("Issue Navigator") != -1){
                    logger.info("Issue Navigator is already selected.");
                    isNavigateToSearchTestPage(true);
                }else{
                    commUtil.isElementVisible( xpathForTestMenu, function(testMenuLinkVisibleStatus){
                        assert.ok(testMenuLinkVisibleStatus, "Not Visible Test Link.");

                        commUtil.doClickByXpath( xpathForTestMenu, function(clickOnTestMenuLinkStatus){
                            assert.ok(clickOnTestMenuLinkStatus, "Not Clicked On Test Drop Down.");
                            logger.info("Clicked on Test Menu Link Successfully.");

                            commUtil.isElementVisible( xpathForSearchTestsMenu, function(searchTestsMenuLinkVisibleStatus){
                                assert.ok(searchTestsMenuLinkVisibleStatus, "Not Visible Search Test Link.");

                                commUtil.clickOnElementByXpath( xpathForSearchTestsMenu, function(clickOnSearchTestMenuLinkStatus){
                                    assert.ok(clickOnSearchTestMenuLinkStatus, "Not Clicked On Search Test From Drop Down.");
                                    logger.info("Clicked on Search Test Menu Link Successfully.");
                                    commUtil.implicitWait(browser.params.testdata.implicitWaitTimeHigh);
                                    isNavigateToSearchTestPage(clickOnSearchTestMenuLinkStatus);
                                });

                            });
                        });

                    });
                }
            });
        }catch(err){
            isNavigateToSearchTestPage(false);
        } 
    };
    this.navigateToPlanTestCyclePage = function(isNavigateToPlanCycle) {
        try{
            commUtil.waitForElement( xpathForTestMenu, browser.params.testdata.implicitWaitTimeMedium, function(testMenuLinkVisibleStatus){
                assert.ok(testMenuLinkVisibleStatus, "Not Found Test Menu.");

                commUtil.doClickByXpath( xpathForTestMenu, function(clickOnTestMenuLinkStatus){
                    assert.ok(clickOnTestMenuLinkStatus, "Not Clicked On Test Menu.");
                    logger.info("Clicked on Test Menu Link Successfully.");

                    commUtil.isElementVisible( xpathForPlanTestCycleMenu, function(planTestCycleMenuLinkVisibleStatus){
                        assert.ok(planTestCycleMenuLinkVisibleStatus, "Not Visible Plan Test Cycle Link.");

                        commUtil.clickOnElementByXpath( xpathForPlanTestCycleMenu, function(clickOnPlanTestCycleMenuLinkStatus){
                            assert.ok(clickOnPlanTestCycleMenuLinkStatus, "Not Clicked Plan Test Cycle Link.");
                            logger.info("Clicked on plan test cycle Menu Link Successfully.");
                            commUtil.implicitWait(browser.params.testdata.implicitWaitTimeHigh);
                            isNavigateToPlanCycle(clickOnPlanTestCycleMenuLinkStatus);
                        });
                    });
                });
            });
        }catch(e){
            isNavigateToPlanCycle(false);
        }
    };
    this.navigateToSearchTestExecutionPage = function(isNavigateToSearchTestExecutionPage) {
        try{
            commUtil.waitForElement( xpathForTestMenu, browser.params.testdata.implicitWaitTimeMedium, function(testMenuLinkVisibleStatus){
                assert.ok(testMenuLinkVisibleStatus, "Not Found Test Menu.");

                commUtil.doClickByXpath( xpathForTestMenu, function(clickOnTestMenuLinkStatus){
                    assert.ok(clickOnTestMenuLinkStatus, "Not Clicked On Test Menu.");
                    logger.info("Clicked on Test Menu Link Successfully.");

                    commUtil.isElementVisible( xpathForSearchTestExecutionMenu, function(searchTestExecutionMenuLinkVisibleStatus){
                        assert.ok(searchTestExecutionMenuLinkVisibleStatus, "Not Visible Search Test Executions Link.");

                        commUtil.clickOnElementByXpath( xpathForSearchTestExecutionMenu, function(clickOnSearchTestExecutionMenuLinkStatus){
                            assert.ok(clickOnSearchTestExecutionMenuLinkStatus, "Not Clicked Search Test Executions Link.");
                            logger.info("Clicked on Search Test Executions Menu Link Successfully.");
                            commUtil.implicitWait(browser.params.testdata.implicitWaitTimeHigh);
                            isNavigateToSearchTestExecutionPage(clickOnSearchTestExecutionMenuLinkStatus);
                        });
                    });
                });
            });
        }catch(e){
            isNavigateToSearchTestExecutionPage(false);
        }
    };
    this.navigateToApiAccessPage = function(isNavigateToApiAccess) {
        try{
            commUtil.waitForElement( xpathForTestMenu, browser.params.testdata.implicitWaitTimeMedium, function(testMenuLinkVisibleStatus){
                assert.ok(testMenuLinkVisibleStatus, "Not Found Test Menu.");

                commUtil.doClickByXpath( xpathForTestMenu, function(clickOnTestMenuLinkStatus){
                    assert.ok(clickOnTestMenuLinkStatus, "Not Clicked On Test Menu.");
                    logger.info("Clicked on Test Menu Link Successfully.");

                    commUtil.isElementVisible( xpathForApiAccessMenu, function(planTestCycleMenuLinkVisibleStatus){
                        assert.ok(planTestCycleMenuLinkVisibleStatus, "Not Visible Plan Test Cycle Link.");

                        commUtil.clickOnElementByXpath( xpathForApiAccessMenu, function(clickOnPlanTestCycleMenuLinkStatus){
                            assert.ok(clickOnPlanTestCycleMenuLinkStatus, "Not Clicked Plan Test Cycle Link.");
                            logger.info("Clicked on Api Access Menu Link Successfully.");
                            commUtil.implicitWait(browser.params.testdata.implicitWaitTimeHigh);
                            isNavigateToApiAccess(clickOnPlanTestCycleMenuLinkStatus);
                        });
                    });
                });
            });
        }catch(e){
            isNavigateToApiAccess(false);
        }
    };
    this.navigateToExecuteTestPage = function(isNavigate) {
        try{
            commUtil.waitForElement( xpathForTestMenu, browser.params.testdata.implicitWaitTimeMedium, function(testMenuLinkVisibleStatus){
                assert.ok(testMenuLinkVisibleStatus, "Not Found Test Menu.");

                commUtil.doClickByXpath( xpathForTestMenu, function(clickOnTestMenuLinkStatus){
                    assert.ok(clickOnTestMenuLinkStatus, "Not Clicked On Test Menu.");
                    logger.info("Clicked on Test Menu Link Successfully.");

                    commUtil.isElementVisible( xpathForExecuteTestLink, function(isVisibleExecuteTestLink){
                        assert.ok(isVisibleExecuteTestLink, "Not Visible Execute Test Link.");

                        commUtil.clickOnElementByXpath( xpathForExecuteTestLink, function(isClickedOnExecuteTestLink){
                            assert.ok(isClickedOnExecuteTestLink, "Not Clicked Execute Test Link.");
                            logger.info("Clicked on plan test cycle Menu Link Successfully.");
                            commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                            isNavigate(isClickedOnExecuteTestLink);
                        });
                    });
                });
            });
        }catch(e){
            isNavigate(false);
        }
    };
    this.navigateToTestSummaryPage = function(isNavigateTestSummaryPage) {
        try{
            commUtil.waitForElement( xpathForTestMenu, browser.params.testdata.implicitWaitTimeMedium, function(testMenuLinkVisibleStatus){
                assert.ok(testMenuLinkVisibleStatus, "Not Found Test Menu.");

                commUtil.doClickByXpath( xpathForTestMenu, function(clickOnTestMenuLinkStatus){
                    assert.ok(clickOnTestMenuLinkStatus, "Not Clicked On Test Menu.");
                    logger.info("Clicked on Test Menu Link Successfully.");

                    commUtil.isElementVisible( xpathForTestSummaryLink, function(planTestSummaryMenuLinkVisibleStatus){
                        assert.ok(planTestSummaryMenuLinkVisibleStatus, "Not Visible Test Summary Link");

                        commUtil.clickOnElementByXpath( xpathForTestSummaryLink, function(clickOnTestSummaryLinkStatus){
                            assert.ok(clickOnTestSummaryLinkStatus, "Not Clicked On Test Summary Link.");
                            logger.info("Clicked on Test Summary Link Successfully.");
                            commUtil.implicitWait(browser.params.testdata.implicitWaitTimeHigh);
                            isNavigateTestSummaryPage(clickOnTestSummaryLinkStatus);
                        });
                    });
                });
            });
        }catch(e){
            isNavigateTestSummaryPage(false);
        }
    };
    this.navigateToTestMetricsPage = function(isNavigateTestMetricsLink) {
        try{
            commUtil.waitForElement(xpathForTestMenu, browser.params.testdata.implicitWaitTimeMedium, function(testMenuLinkVisibleStatus){
                assert.ok(testMenuLinkVisibleStatus, "Not Found Test Menu.");

                commUtil.doClickByXpath( xpathForTestMenu, function(clickOnTestMenuLinkStatus){
                    assert.ok(clickOnTestMenuLinkStatus, "Not Clicked On Test Menu.");
                    logger.info("Clicked on Test Menu Link Successfully.");

                    commUtil.isElementVisible( xpathForTestMetricsLink, function(isVisibleTestMetricsLink){
                        assert.ok(isVisibleTestMetricsLink, "Not Visible Test Metrics Link.");

                        commUtil.clickOnElementByXpath(xpathForTestMetricsLink, function(isClicked){
                            assert.ok(isClicked, "Not Clicked On Test Metrics Link");
                            logger.info("Clicked on Test Metrics Link Successfully.");
                            commUtil.implicitWait(browser.params.testdata.implicitWaitTimeHigh);
                            isNavigateTestMetricsLink(isClicked);
                        });
                    });
                });
            });
        }catch(e){
            isNavigateTestMetricsLink(false);
        }
    };
    this.navigateToWelcomePage = function(isNavigateToWelcomePage) {
        try{
            commUtil.waitForElement( xpathForTestMenu, browser.params.testdata.implicitWaitTimeMedium, function(testMenuLinkVisibleStatus){
                assert.ok(testMenuLinkVisibleStatus, "Not Found Test Menu.");

                commUtil.doClickByXpath( xpathForTestMenu, function(clickOnTestMenuLinkStatus){
                    assert.ok(clickOnTestMenuLinkStatus, "Not Clicked On Test Menu.");
                    logger.info("Clicked on Test Menu Link Successfully.");

                    commUtil.waitForElement( xpathForWelcomePageLink,browser.params.testdata.implicitWaitTimeMedium, function(welcomeLinkVisibleStatus){
                        assert.ok(welcomeLinkVisibleStatus, "Not Visible Welcome Link");

                        commUtil.clickOnElementByXpath( xpathForWelcomePageLink, function(clickOnTestWelcomeLinkStatus){
                            assert.ok(clickOnTestWelcomeLinkStatus, "Not Clicked On Welcome Link.");
                            logger.info("Clicked on Welcome Link Successfully.");
                            commUtil.implicitWait(browser.params.testdata.implicitWaitTimeHigh);
                            isNavigateToWelcomePage(clickOnTestWelcomeLinkStatus);
                        });
                    });
                });
            });
        }catch(e){
            isNavigateToWelcomePage(false);
        }
    };
    this.navigateToZFJHelpPage = function(isNavigateZFJHelp) {
        try{
            commUtil.waitForElement( xpathForTestMenu, browser.params.testdata.implicitWaitTimeMedium, function(testMenuLinkVisibleStatus){
                assert.ok(testMenuLinkVisibleStatus, "Not Found Test Menu.");

                commUtil.doClickByXpath( xpathForTestMenu, function(clickOnTestMenuLinkStatus){
                    assert.ok(clickOnTestMenuLinkStatus, "Not Clicked On Test Menu.");
                    logger.info("Clicked on Test Menu Link Successfully.");

                    commUtil.isElementVisible(xpathForZephyrHelpLink , function(zephyrHelpLinkVisibleStatus){
                        assert.ok(zephyrHelpLinkVisibleStatus, "Not Visible Welcome Link");

                        commUtil.clickOnElementByXpath(xpathForZephyrHelpLink, function(clickOnTestZephyrHelpLinkStatus){
                            assert.ok(clickOnTestZephyrHelpLinkStatus, "Not Clicked On Welcome Link.");
                            logger.info("Clicked on Zephyr Help Link Successfully.");
                            commUtil.implicitWait(browser.params.testdata.implicitWaitTimeHigh);
                            isNavigateZFJHelp(clickOnTestZephyrHelpLinkStatus);
                        });
                    });
                });
            });
        }catch(e){
            isNavigateZFJHelp(false);
        }
    };
    this.navigateToAboutZephyrPage = function(isNavigateToAboutZephyrPage) {
        try{
            commUtil.waitForElement( xpathForTestMenu, browser.params.testdata.implicitWaitTimeMedium, function(testMenuLinkVisibleStatus){
                assert.ok(testMenuLinkVisibleStatus, "Not Found Test Menu.");

                commUtil.doClickByXpath( xpathForTestMenu, function(clickOnTestMenuLinkStatus){
                    assert.ok(clickOnTestMenuLinkStatus, "Not Clicked On Test Menu.");
                    logger.info("Clicked on Test Menu Link Successfully.");

                    commUtil.isElementVisible( xpathForAboutZephyrPage, function(aboutZephyrLinkVisibleStatus){
                        assert.ok(aboutZephyrLinkVisibleStatus, "Not Visible About Zephyr Link");

                        commUtil.clickOnElementByXpath(xpathForAboutZephyrPage, function(clickOnTestAboutZephyrLinkStatus){
                            assert.ok(clickOnTestAboutZephyrLinkStatus, "Not Clicked On About Zephyr Link.");
                            logger.info("Clicked on Zephyr Help Link Successfully.");
                            commUtil.implicitWait(browser.params.testdata.implicitWaitTimeHigh);
                            isNavigateToAboutZephyrPage(clickOnTestAboutZephyrLinkStatus);
                        });
                    });
                });
            });
        }catch(e){
            isNavigateToAboutZephyrPage(false);
        }
    };
    this.navigateFindNewAddOnsPage = function(isNavigateToFindNewAddOnsPage) {
        try{
            driver.sleep(1000);
            commUtil.waitForElement( xpathForAdminMenu, browser.params.testdata.implicitWaitTimeMedium, function(adminMenuLinkVisibleStatus){
                assert.ok(adminMenuLinkVisibleStatus, "Admin Link is not visible.");

                commUtil.hoverElementByXpath(xpathForAdminMenu, function(hoverOnElement){
                    assert.ok(hoverOnElement, "Hover On Admin Menu not successful.");

                    commUtil.doClickByXpath(xpathForAdminMenu, function (clickOnTestAdminLinkStatus) {
                        assert.ok(clickOnTestAdminLinkStatus, "Not Clicked on Admin Menu.");
                        logger.info("Clicked on Administration Menu Link Successfully.");

                        commUtil.isElementVisible( xpathForAdminPluginMenu, function(adminPluginMenuLinkVisibleStatus){
                            assert.ok(adminPluginMenuLinkVisibleStatus, "Add-ons Link is not visible.");

                            commUtil.clickOnElementByXpath( xpathForAdminPluginMenu, function(clickOnAdminPluginMenuLinkStatus){
                                assert.ok(clickOnAdminPluginMenuLinkStatus, "Not Clicked on Add-on slink.");
                                logger.info("Clicked On Admin Plug in Menu Link Successfully.");
                                commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                                isNavigateToFindNewAddOnsPage(clickOnAdminPluginMenuLinkStatus);
                            });
                        });
                    });
                });
            });
        }catch(e){
            throw e;
        }
    };
    this.navigateToProjectPage = function(isNavigateToFindNewAddOnsPage) {
        try{
            driver.sleep(1000);
            commUtil.waitForElement( xpathForAdminMenu, browser.params.testdata.implicitWaitTimeMedium, function(adminMenuLinkVisibleStatus){
                assert.ok(adminMenuLinkVisibleStatus, "Admin Link is not visible.");

                commUtil.hoverElementByXpath(xpathForAdminMenu, function(hoverOnElement){
                    assert.ok(hoverOnElement, "Hover On Admin Menu not successful.");

                    commUtil.doClickByXpath(xpathForAdminMenu, function (clickOnTestAdminLinkStatus) {
                        assert.ok(clickOnTestAdminLinkStatus, "Not Clicked on Admin Menu.");
                        logger.info("Clicked on Administration Menu Link Successfully.");

                        commUtil.isElementVisible( "//*[@id='admin_project_menu']", function(adminPluginMenuLinkVisibleStatus){
                            assert.ok(adminPluginMenuLinkVisibleStatus, "Add-ons Link is not visible.");

                            commUtil.clickOnElementByXpath( "//*[@id='admin_project_menu']", function(clickOnAdminPluginMenuLinkStatus){
                                assert.ok(clickOnAdminPluginMenuLinkStatus, "Not Clicked on Add-on slink.");
                                logger.info("Clicked On Project in Menu Link Successfully.");
                                commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                                isNavigateToFindNewAddOnsPage(clickOnAdminPluginMenuLinkStatus);
                            });
                        });
                    });
                });
            });
        }catch(e){
            throw e;
        }
    };
    this.navigateToCustomizeTestStatusPage = function(isNavigateToCustomizedTestStatusPage){
        try{
            this.navigateFindNewAddOnsPage(function(navigateToFindNewAddonsLinkStatus){
                assert.ok(navigateToFindNewAddonsLinkStatus, "Not Navigated to Find New Add ons Page.");
                logger.info("Navigated Successfully to Find New Add-ons Page.");

                validateFindNewAddOnsPage(function(validateFindNewAddOnsStatus){
                    assert.ok(validateFindNewAddOnsStatus, "Not Validated Find New Add ons Page.");
                    logger.info("Find New Add-ons Page Validated Successfully.");

                    commUtil.clickOnElementByXpath( xpathForCustomizedTestStatusLink, function(clickOnElementStatus){
                        assert.ok(clickOnElementStatus, "Not Clicked on Customized TestStatus Page.");
                        commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                        isNavigateToCustomizedTestStatusPage(clickOnElementStatus);
                    });
                });
            });
        }catch(e){
            throw e;
        }
    };
    this.navigateToCustomizeStepStatusPage = function(isNavigateToCustomizedStepStatusPage){
        try{
            this.navigateFindNewAddOnsPage(function(navigateToFindNewAddonsLinkStatus){
                assert.ok(navigateToFindNewAddonsLinkStatus, "Not Navigated to Find New Add ons Page.");
                logger.info("Navigated Successfully to Find New Add-ons Page.");

                validateFindNewAddOnsPage(function(validateFindNewAddOnsStatus){
                    assert.ok(validateFindNewAddOnsStatus, "Not Validated Find New Add ons Page.");
                    logger.info("Find New Add-ons Page Validated Successfully.");

                    commUtil.clickOnElementByXpath( xpathForCustomizedStepStatusLink, function(clickOnElementStatus){
                        assert.ok(clickOnElementStatus, "Not Clicked on Customized Step Status Page.");
                        commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                        isNavigateToCustomizedStepStatusPage(clickOnElementStatus);
                    });
                });
            });
        }catch(e){
            throw e
        }
    };
    this.navigateToManageAddOnsPage = function(isNavigateToManageAddOnsPage){
        try{
            this.navigateFindNewAddOnsPage(function(navigateToFindNewAddOnsLinkStatus){
                assert.ok(navigateToFindNewAddOnsLinkStatus, "Not Navigated to Find New Add ons Page.");
                logger.info("Navigated Successfully to Find New Add-ons Page.");

                validateFindNewAddOnsPage(function(validateFindNewAddOnsStatus){
                    assert.ok(validateFindNewAddOnsStatus, "Not Validated Find New Add ons Page.");
                    logger.info("Find New Add-ons Page Validated Successfully.");

                    commUtil.clickOnElementByXpath( xpathForManageAddOnsLink, function(clickOnElementStatus){
                        assert.ok(clickOnElementStatus, "Not Clicked on Manage Add ons Page.");
                        commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                        isNavigateToManageAddOnsPage(clickOnElementStatus);
                    });
                });
            });
        }catch(e){
            throw e
        }
    };
    this.navigateToIssueTypeSchemaPage = function(isNavigateToIssueTypeSchema){
        try{
            commUtil.waitForElement( xpathForAdminMenu, browser.params.testdata.implicitWaitTimeMedium, function(adminMenuLinkVisibleStatus){
                assert.ok(adminMenuLinkVisibleStatus, "Admin Link is not visible.");

                commUtil.hoverElementByXpath(xpathForAdminMenu, function(hoverOnElement){
                    assert.ok(hoverOnElement, "Hover On Admin Menu not successful.");

                    commUtil.doClickByXpath(xpathForAdminMenu, function (clickOnTestAdminLinkStatus) {
                        assert.ok(clickOnTestAdminLinkStatus, "Not Clicked on Admin Menu.");
                        logger.info("Clicked on Administration Menu Link Successfully.");

                        commUtil.isElementVisible( xpathForAdminIssueLink, function(adminPluginMenuLinkVisibleStatus){
                            assert.ok(adminPluginMenuLinkVisibleStatus, "Issue Link is not visible.");

                            commUtil.clickOnElementByXpath( xpathForAdminIssueLink, function(clickOnAdminPluginMenuLinkStatus){
                                assert.ok(clickOnAdminPluginMenuLinkStatus, "Not Clicked on Issue Link.");
                                logger.info("Clicked On Issue Link Menu Link Successfully.");
                                commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);

                                validateIssueTypePage(function(isValidateIssueTypePage){
                                    assert.ok(isValidateIssueTypePage, "Not Validated IssueType Page.");
                                    logger.info("IssueType Page Validated Successfully.");

                                    commUtil.clickOnElementByXpath( xpathForIssueTypeSchemaLink, function(clickOnIssueTypeSchemaStatus){
                                        assert.ok(clickOnIssueTypeSchemaStatus, "Not Clicked IssueType Schema Link.");
                                        commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                                        isNavigateToIssueTypeSchema(clickOnIssueTypeSchemaStatus);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }catch(e){
            throw e
        }
    };

   //-------------------------------------------------

    //Added by Karthik.

    this.navigateToGeneralConfigPage = function(){
        commUtil.waitForElementByXpath("//a[text()='Tests']");
        return adminMenu.click().then(function(){
            driver.sleep(1000);
            commUtil.isElementDisplayed(adminPluginMenu).then(function(value){
                if(value === true){
                    return adminPluginMenu.click().then(function(){
                        driver.sleep(2000);
                        commUtil.implecitWait(browser.params.testdata.implicitWaitTimeMedium);
                        //AdministratorAccessPage.authenticatePage('password');
                        return zfjGeneralConfigLink.click();
                    });
                }
            });


        });

    };

    this.selectProject = function(callback){
        try{
            var projectName = browser.params.testdata.project;
            validateJiraLandingPage(function(validateLandingPage) {
                assert.ok(validateLandingPage, "Not Validated Jira Landing Page.");
                logger.info("Jira Landing Page Validated Successfully.");
                commUtil.waitForElement("//*[@id='browse_link']", browser.params.testdata.implicitWaitTimeMedium, function(waitForProjectLink) {
                    assert.ok(waitForProjectLink, "Not found project link.");

                    commUtil.doClickByXpath("//*[@id='browse_link']", function(clickOnProjectLink){
                        assert.ok(clickOnProjectLink, "Not Clicked On Project Drop down.");
                        logger.info("Clicked On Project link to Select Project.");

                        commUtil.waitForElement("//*[@id='project_view_all_link_lnk']", browser.params.testdata.implicitWaitTimeLow, function(waitForAllProjectLink) {
                            assert.ok(waitForAllProjectLink, "All Project link is Not Visible");

                            commUtil.clickOnElementByXpath("//*[@id='project_view_all_link_lnk']", function(clickOnViewAllProjectLink) {
                                assert.ok(clickOnViewAllProjectLink, "Not Clicked On View All Project Link.");
                                logger.info("Clicked On View All Project link to Select Project.");

                                validateBrowseProjectPage(function(validateBrowseProjectStatus){
                                    assert.ok(validateBrowseProjectStatus, "Not Validated Browse Project Page.");
                                    logger.info("Browse Project Page Validated Successfully to Select Project.");

                                    commUtil.clickOnElementByXpath("//*[@id='projects']/descendant::a[text()='"+projectName+"']", function(clickOnProject) {
                                        assert.ok(clickOnProject, "Not Clicked On Project Link.");
                                        logger.info("Clicked On Project link to Select Project.");

                                        validateSelectedProjectPage(function(selectedProjectStatus){
                                            assert.ok(selectedProjectStatus, "Not validated Selected Project Page.");
                                            logger.info(projectName + " : Project Selected Successfully..");
                                            callback(selectedProjectStatus);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
           /* var deferred = Q.defer();
            validate_JiraLandingPage().then(function(validateLandingPage){
                assert.ok(validateLandingPage, "Not Validated Jira Landing Page.");
                logger.info("Jira Landing Page Validated Successfully...........");
                commUtil.click_("./*//*[@id='browse_link']").then(function(clickProjectStatus){
                    assert.ok(clickProjectStatus, "Not found project link.");
                    logger.info("Clicked On Project link.");
                    commUtil.click_("./*//*[@id='project_view_all_link_lnk']").then(function(clickOnAllProjectStatus){
                        assert.ok(clickOnAllProjectStatus, "Not Clicked on All Project Link.");
                        logger.info("Clicked On All Project for select.");
                        commUtil.implecitWait(browser.param.testdata.waitTimeOutMedium);
                        commUtil.click_("./*//*[@id='projects']/descendant::a[text()='IE']").then(function(clickOnProjectStatus){
                            assert.ok(clickOnProjectStatus, "Not Clicked on Project Link.");
                            logger.info("Clicked On Project for select....");
                            commUtil.implecitWait(browser.param.testdata.waitTimeOutMedium);
                            commUtil._Wait_For_Title("IE").then(function(waitForTitleStatus){
                                assert.ok(waitForTitleStatus, "Not Selected Project.");
                                deferred.resolve(waitForTitleStatus);
                            });
                        });
                    });
                });

            });
            return deferred.promise;*/
        }catch(e){
            throw e;
        }
    };

    this.createProject = function(isCreatedProject){
        try{
            var projectName = browser.params.testdata.project;
            validateJiraLandingPage(function(validateLandingPage) {
                assert.ok(validateLandingPage, "Not Validated Jira Landing Page.");
                logger.info("Jira Landing Page Validated Successfully.");
                commUtil.waitForElement(xpathForProjectLink, browser.params.testdata.implicitWaitTimeMedium, function(waitForProjectLink) {
                    assert.ok(waitForProjectLink, "Not found project link.");

                    commUtil.doClickByXpath(xpathForProjectLink, function(clickOnProjectLink){
                        assert.ok(clickOnProjectLink, "Not Clicked On Project Drop down.");
                        logger.info("Clicked On Project link to Select Project.");

                        commUtil.waitForElement(xpathForCreateProjectLink, browser.params.testdata.implicitWaitTimeLow, function(waitForAllProjectLink) {
                            assert.ok(waitForAllProjectLink, "All Project link is Not Visible");

                            commUtil.clickOnElementByXpath(xpathForCreateProjectLink, function(clickOnViewAllProjectLink) {
                                assert.ok(clickOnViewAllProjectLink, "Not Clicked On Create New Project Link.");
                                logger.info("Clicked On  Create New Project link to  Create New Project.");


                                validateCreateProjectPage(function(validateBrowseProjectStatus){
                                    assert.ok(validateBrowseProjectStatus, "Not Validated create Project Page.");
                                    logger.info("Create Project Page Validated Successfully to Select Project.");

                                    if(browser.params.testdata.projectSchema === "Project management"){
                                        commUtil.clickOnElementByXpath(xpathForSelectProjectManagementSchema, function(selectSchemaStatus) {
                                            assert.ok(selectSchemaStatus, "Not Selected Schema.");
                                            logger.info("Selected schema successfully for the project.");

                                            commUtil.clickOnElementByXpath(xpathForCreateProjectNextButton, function(clickedOnNextStatus) {
                                                assert.ok(clickedOnNextStatus, "Not Clicked on Next button.");
                                                logger.info("Clicked on Next Btn after selected Schema.");

                                                commUtil.waitForPageLoad(xpathForProjectNameTextBox, function(waitForProjectNameTextBox) {
                                                    assert.ok(waitForProjectNameTextBox, "Not Visible Project name Text box.");
                                                    logger.info("Create Project popup is now visible, now we can add project name.");

                                                    commUtil.sendTextToElement(xpathForProjectNameTextBox, projectName, function(clickedOnNextStatus) {
                                                        assert.ok(clickedOnNextStatus, "Not Sent valueTo Project box.");
                                                        logger.info("Project Name given Successfully.");
                                                        commUtil.clickOnElementByXpath(xpathForProjectSubmitBtn, function (clickedOnNextStatus) {
                                                            assert.ok(clickedOnNextStatus, "Not Clicked on Submit Btn.");
                                                            logger.info("Clicked on Submit project Btn");

                                                            commUtil.implicitWait(browser.params.testdata.PageLoadTimeOut);
                                                            commUtil.waitForTitle(projectName, function (waitForProjectCreated) {
                                                                assert.ok(waitForProjectCreated, "Not Loaded Project after Creation.");
                                                                logger.info(projectName + " : Project Created Successfully..");
                                                                isCreatedProject(waitForProjectCreated);
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    } else if(browser.params.testdata.projectSchema === "JIRA Default Schemes"){
                                        commUtil.clickOnElementByXpath(xpathForSelectSchema, function(selectSchemaStatus) {
                                            assert.ok(selectSchemaStatus, "Not Selected Schema.");
                                            logger.info("Selected schema successfully for the project.");

                                            commUtil.clickOnElementByXpath(xpathForCreateProjectNextButton, function(clickedOnNextStatus) {
                                                assert.ok(clickedOnNextStatus, "Not Clicked on Next button.");
                                                logger.info("Clicked on Next Btn after selected Schema.");

                                                commUtil.waitForPageLoad(xpathForProjectNameTextBox, function(waitForProjectNameTextBox) {
                                                    assert.ok(waitForProjectNameTextBox, "Not Visible Project name Text box.");
                                                    logger.info("Create Project popup is now visible, now we can add project name.");

                                                    commUtil.sendTextToElement(xpathForProjectNameTextBox, projectName, function(clickedOnNextStatus) {
                                                        assert.ok(clickedOnNextStatus, "Not Sent valueTo Project box.");
                                                        logger.info("Project Name given Successfully.");
                                                        commUtil.clickOnElementByXpath(xpathForProjectSubmitBtn, function (clickedOnNextStatus) {
                                                            assert.ok(clickedOnNextStatus, "Not Clicked on Submit Btn.");
                                                            logger.info("Clicked on Submit project Btn");

                                                            commUtil.implicitWait(browser.params.testdata.PageLoadTimeOut);
                                                            commUtil.waitForTitle(projectName, function (waitForProjectCreated) {
                                                                assert.ok(waitForProjectCreated, "Not Loaded Project after Creation.");
                                                                logger.info(projectName + " : Project Created Successfully..");
                                                                isCreatedProject(waitForProjectCreated);
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    }

                                });
                            });
                        });
                    });
                });
            });
        }catch(e){
            logger.error(e.message);
            throw e;
        }
    };
    var validateCreateProjectPage = function(isvalidateCreateProjectPage) {
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                //logger.info("Browser state : " + state);
                return state === "complete";
            });
        }, browser.params.testdata.PageLoadTimeOut).then(function(){
            commUtil.waitForPageLoad(xpathForCreateProjectHeader, function(waitForHeaderStatus){
                assert.ok(waitForHeaderStatus, "Create Projects Header not validated.");
                isvalidateCreateProjectPage(waitForHeaderStatus);
            },function(e) {
                console.error("Create Projects Page not Loaded.");
                isvalidateCreateProjectPage(false);
            });
        });
    };
   	/******************************************************
   	 *  PAGE REUSABLE METHODS
   	 *****************************************************/


    var validateJiraLandingPage = function(isValidateJiraLandingPage) {
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("Browser state : " + state);
                return state === "complete";
            });
        }, browser.params.testdata.PageLoadTimeOut).then(function(){
            if(browser.params.testdata.environment === "prod"){
                commUtil.waitForTitle("JIRA", function(waitForTitleStatus){
                    assert.ok(waitForTitleStatus, "Jira Landing Page Title Validation Failed.");
                    isValidateJiraLandingPage(waitForTitleStatus);
                });
            }else{
                /*commUtil.waitForTitle("Dashboard", function(waitForTitleStatus){
                    assert.ok(waitForTitleStatus, "Jira Landing Page Title Validation Failed.");
                    isValidateJiraLandingPage(waitForTitleStatus);
                });*/
                commUtil.waitForTitle("", function(waitForTitleStatus){
                    assert.ok(waitForTitleStatus, "Jira Landing Page Title Validation Failed.");
                    isValidateJiraLandingPage(waitForTitleStatus);
                });
            }

        },function(e) {
            console.error("Jira Landing Page not Loaded.");
            isValidateJiraLandingPage(false);
        });
    };
    validateFindNewAddOnsPage = function(isValidateFindNewAddOnsPage) {
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("Browser state : " + state);
                return state === "complete";
            });
        }, browser.params.testdata.PageLoadTimeOut).then(function(){
            commUtil.waitForTitle("Find new add-ons", function(waitForTitleStatus){
                assert.ok(waitForTitleStatus, "Find new add-ons Title Validation Failed.");
                isValidateFindNewAddOnsPage(waitForTitleStatus);
            });
        },function(e) {
            console.error("Find new add-ons Page not Loaded.");
            isValidateFindNewAddOnsPage(false);
        });
    };
    var validateIssueTypePage = function(isValidateIssueTypePage) {
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("Browser state : " + state);
                return state === "complete";
            });
        }, browser.params.testdata.PageLoadTimeOut).then(function(){
            commUtil.waitForTitle("Issue types ", function(waitForTitleStatus){
                assert.ok(waitForTitleStatus, "Issue types Page Title Validation Failed.");
                isValidateIssueTypePage(waitForTitleStatus);
            });
        },function(e) {
            console.error("Issue Type Page not Loaded.");
            isValidateIssueTypePage(false);
        });
    };
    validateBrowseProjectPage = function(isValidateBrowseProjectPage) {
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("Browser state : " + state);
                return state === "complete";
            });
        }, browser.params.testdata.PageLoadTimeOut).then(function(){
            commUtil.waitForTitle("Browse Projects", function(waitForTitleStatus){
                assert.ok(waitForTitleStatus, "Browse Projects Title Validation Failed.");
                isValidateBrowseProjectPage(waitForTitleStatus);
            },function(e) {
                console.error("Browse Projects Page not Loaded.");
                isValidateBrowseProjectPage(false);
            });
        });
    };
    validateSelectedProjectPage = function(isValidateSelectedProject) {
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("Browser state : " + state);
                return state === "complete";
            });
        }, browser.params.testdata.PageLoadTimeOut).then(function(){
            commUtil.waitForTitle(browser.params.testdata.project, function(waitForTitleStatus){
                assert.ok(waitForTitleStatus, "Selected Project Title Validation Failed.");
                isValidateSelectedProject(waitForTitleStatus);
            },function(e) {
                console.error("Selected Projects Page not Loaded.");
                isValidateSelectedProject(false);
            });
        });
    };
    validateAdminProjectPage = function(isValidateBrowseProjectPage) {
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("Browser state : " + state);
                return state === "complete";
            });
        }, browser.params.testdata.PageLoadTimeOut).then(function(){
            commUtil.waitForTitle("Projects", function(waitForTitleStatus){
                assert.ok(waitForTitleStatus, "Admin Projects Title Validation Failed.");
                isValidateBrowseProjectPage(waitForTitleStatus);
            },function(e) {
                console.error("Browse Projects Page not Loaded.");
                isValidateBrowseProjectPage(false);
            });
        });
    };
    validateSelectedVersionPage = function(isValidateSelectedProject) {
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("Browser state : " + state);
                return state === "complete";
            });
        }, browser.params.testdata.PageLoadTimeOut).then(function(){
            commUtil.waitForTitle(browser.params.testdata.project, function(waitForTitleStatus){
                assert.ok(waitForTitleStatus, "Selected Version Page Title Validation Failed.");
                commUtil.waitForElement("//*[@id='project-config-panel-versions']//h2",browser.params.testdata.implicitWaitTimeMedium, function(isWaited){
                    assert.ok(isWaited, "Not Found Version Header.");
                    commUtil.getTextByXpath("//*[@id='project-config-panel-versions']//h2", function(header){
                        assert.equal(header, "Versions", "Not Validated Version Header.");
                        logger.info("Version Header Validated Successfully.");
                        isValidateSelectedProject(true);
                    });
                });

            },function(e) {
                console.error("Selected  Version Page not Loaded.");
                isValidateSelectedProject(false);
            });
        });
    };
    this.createVersion = function(versionName, sizeOfVersion, isCreated){
        validateAdminProjectPage(function(isValidateAdminProjectPage){
            assert.ok(isValidateAdminProjectPage, "Not Validated Admin Project Page.");
            commUtil.clickOnElementByXpath(".//*[@id='project-list']//a[text()='"+browser.params.testdata.project+"']", function(clickOnProjectStatus){
                assert.ok(clickOnProjectStatus, "Not Clicked On Project.");
                validateSelectedProjectPage(function(isValidateSelectedProjectPage) {
                    assert.ok(isValidateSelectedProjectPage, "Not Validated Selected Project Page.");
                    logger.info("Selected Project Page Validated Successfully.");
                    commUtil.clickOnElementByXpath("//*[@id='view_project_versions']", function(clickOnVersionStatus){
                        assert.ok(clickOnVersionStatus, "Not Clicked On Version Link.");
                        validateSelectedVersionPage(function(isValidateSelectedVersionPage){
                            assert.ok(isValidateSelectedVersionPage, "Not Validated Selected Version Page.");
                            logger.info("Selected Version Page Validated Successfully.");

                            for(var i=1; i<=parseInt(sizeOfVersion); i++){
                                (function(x) {
                                    var version = versionName+" "+x+".0";

                                    commUtil.sendTextToElement(".//*[@id='project-config-versions-table']//td[@class='project-config-version-name']/input[@type='text']", version, function(sendVersionStatus){
                                        assert.ok(sendVersionStatus, "Not send Status to text.");
                                        commUtil.clickOnElementByXpath(".//*[@id='project-config-versions-table']//input[@value='Add']", function(clickOnAddBtnStaus){
                                            assert.ok(clickOnAddBtnStaus, "Not clicked On Add Btn");
                                            driver.sleep(2000);
                                            commUtil.waitForElement(".//*[@id='project-config-versions-table']/tbody[@class='ui-sortable']/tr//td[@class='project-config-version-name']",browser.params.testdata.implicitWaitTimeMedium , function(waitForVersion){
                                                assert.ok(waitForVersion);
                                                if(x === parseInt(sizeOfVersion)){
                                                    isCreated(waitForVersion);
                                                }
                                            });
                                        });
                                    });
                                })(i);
                            }

                        });
                    });
                });
            });
        });

    };
    validateSelectedComponentPage = function(isValidateSelectedProject) {
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("Browser state : " + state);
                return state === "complete";
            });
        }, browser.params.testdata.PageLoadTimeOut).then(function(){
            commUtil.waitForTitle(browser.params.testdata.project, function(waitForTitleStatus){
                assert.ok(waitForTitleStatus, "Selected Version Page Title Validation Failed.");
                commUtil.waitForElement("//*[@id='project-config-panel-components']//h2",browser.params.testdata.implicitWaitTimeMedium, function(isWaited){
                    assert.ok(isWaited, "Not Found Component Header.");
                    commUtil.getTextByXpath("//*[@id='project-config-panel-components']//h2", function(header){
                        assert.equal(header, "Components", "Not Validated Component Header.");
                        logger.info("Component Header Validated Successfully.");
                        isValidateSelectedProject(true);
                    });
                });

            },function(e) {
                console.error("Selected  Version Page not Loaded.");
                isValidateSelectedProject(false);
            });
        });
    };
    this.createComponent = function(component, sizeOfComponent, isCreated){
        validateAdminProjectPage(function(isValidateAdminProjectPage){
            assert.ok(isValidateAdminProjectPage, "Not Validated Admin Project Page.");
            commUtil.clickOnElementByXpath(".//*[@id='project-list']//a[text()='"+browser.params.testdata.project+"']", function(clickOnProjectStatus){
                assert.ok(clickOnProjectStatus, "Not Clicked On Project.");
                validateSelectedProjectPage(function(isValidateSelectedProjectPage) {
                    assert.ok(isValidateSelectedProjectPage, "Not Validated Selected Project Page.");
                    logger.info("Selected Project Page Validated Successfully.");
                    commUtil.clickOnElementByXpath("//*[@id='view_project_components']", function(clickOnVersionStatus){
                        assert.ok(clickOnVersionStatus, "Not Clicked On components Link.");
                        validateSelectedComponentPage(function(isValidateSelectedVersionPage){
                            assert.ok(isValidateSelectedVersionPage, "Not Validated Selected components Page.");
                            logger.info("Selected components Page Validated Successfully.");

                            for(var i=1; i<=parseInt(sizeOfComponent); i++){
                                (function(x) {
                                    var componentName = component+""+x;
                                    commUtil.sendTextToElement(".//*[@id='project-config-components-table']//td[@class='project-config-component-name']/input[@name='name']", componentName, function(sendVersionStatus){
                                        assert.ok(sendVersionStatus, "Not send Status to text.");
                                        commUtil.clickOnElementByXpath(".//*[@id='project-config-components-table']//input[@value='Add']", function(clickOnAddBtnStaus){
                                            assert.ok(clickOnAddBtnStaus, "Not clicked On Add Btn");
                                            driver.sleep(2000);
                                            commUtil.waitForElement(".//*[@id='project-config-components-table']/tbody//tr//td[@class='project-config-component-name']",browser.params.testdata.implicitWaitTimeMedium , function(waitForVersion){
                                                assert.ok(waitForVersion);
                                                if(x === parseInt(sizeOfComponent)){
                                                    isCreated(waitForVersion);
                                                }
                                            });
                                        });
                                    });
                                })(i);
                            }
                        });
                    });
                });
            });
        });
    };
    this.addIssueTypeToList = function(){
        this.navigateToIssueTypeSchemaPage(function(navigateStatus){
            assert.ok(navigateStatus, "Not Navigated To Issue Type Schema Page.");
            logger.info("Navigated to Issue Type Schema page Successfully.");

        });
    };
    this.closeAllPopupAndNavigate = function(isCloseAllPopup){
        driver.wait(function(){
            return driver.executeScript("return document.readyState").then(function(state){
                logger.info("Browser state : " + state);
                return state === "complete";
            });
        }, browser.params.testdata.PageLoadTimeOut).then(function(){
            driver.getTitle().then(function (title) {
                logger.info("Title in "+title);
            //commUtil.waitForTitle("Welcome", function(waitForTitleStatus){
                if(title.indexOf("Welcome") != -1){
                    commUtil.clickOnElementByXpath("//*[@id='continueButton']",browser.params.testdata.implicitWaitTimeMedium, function(isClickedOnContinueBtn){
                        assert.ok(isClickedOnContinueBtn, "Not Clicked on Continue Btn Version Header.");
                        commUtil.isElementVisible("//*[@id='baseurl-update']", function(isUpdateBtnVisible) {
                            if(isUpdateBtnVisible) {
                                commUtil.clickOnElementByXpath( "//*[@id='baseurl-update']", function(clickOnBaseUrlStatus){
                                    assert.ok(clickOnBaseUrlStatus, "Not Clicked on Update Link.");
                                    logger.info("Clicked On Issue Link Menu Link Successfully.");
                                    commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                                    isCloseAllPopup(clickOnBaseUrlStatus);
                                });
                            }else{
                                isCloseAllPopup(true);
                            }
                        });
                    });
                }else{
                    commUtil.isElementVisible( "//*[@id='baseurl-update']", function(isUpdateBtnVisible) {
                        logger.info("Update status popup visible status :"+isUpdateBtnVisible);
                        if(isUpdateBtnVisible) {
                            commUtil.clickOnElementByXpath( "//*[@id='baseurl-update']", function(clickOnBaseUrlStatus){
                                assert.ok(clickOnBaseUrlStatus, "Not Clicked on Update Link.");
                                logger.info("Base URL Updated Successfully.");
                                commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                                //isCloseAllPopup(clickOnBaseUrlStatus);
                                commUtil.isElementVisible( ".//*[contains(@id,'inline-dialog')]//a[text()='No thanks']", function(isVisibleNoThanksBtn) {
                                    logger.info("Update status popup visible status :"+isVisibleNoThanksBtn);
                                    if(isVisibleNoThanksBtn) {
                                        commUtil.clickOnElementByXpath( ".//*[contains(@id,'inline-dialog')]//a[text()='No thanks']", function(clickOnNoThanksLinkStatus){
                                            assert.ok(clickOnNoThanksLinkStatus, "Not Clicked On NoThanks Link Status.");
                                            logger.info("clicked On NoThanks Link Successfully.");
                                            commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                                            isCloseAllPopup(clickOnNoThanksLinkStatus);
                                        });
                                    }else{
                                        isCloseAllPopup(true);
                                    }
                                });
                            });
                        }else{
                            commUtil.isElementVisible( ".//*[contains(@id,'inline-dialog')]//a[text()='No thanks']", function(isVisibleNoThanksBtn) {
                                logger.info("Update status popup visible status :"+isVisibleNoThanksBtn);
                                if(isVisibleNoThanksBtn) {
                                    commUtil.clickOnElementByXpath( ".//*[contains(@id,'inline-dialog')]//a[text()='No thanks']", function(clickOnNoThanksLinkStatus){
                                        assert.ok(clickOnNoThanksLinkStatus, "Not Clicked On NoThanks Link Status.");
                                        logger.info("clicked On NoThanks Link Successfully.");
                                        commUtil.implicitWait(browser.params.testdata.implicitWaitTimeMedium);
                                        isCloseAllPopup(clickOnNoThanksLinkStatus);
                                    });
                                }else{
                                    isCloseAllPopup(true);
                                }
                            });
                        }
                    });
                }


            },function(e) {
                    isCloseAllPopup(false);
            });
        });
    };

};
module.exports = new JiraLandingPage();
