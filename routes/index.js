var express = require('express');
var router = express.Router();
const userController = require("../controller/userController")
const adminController=require("../controller/adminController");
const cmsController = require('../controller/cmsController');
const contactUsControler = require('../controller/contactUsControler');
const notificationController = require('../controller/notificationController');


////////////////////////ADMIN/////////////////////////
router.get("/dashboard", adminController.dashboard)
router.get("/loginPage", adminController.loginPage)
router.post("/login", adminController.login)
router.get("/adminProfilePage", adminController.adminProfilePage)
router.get("/getAdminProfile/:id", adminController.getAdminProfile)
router.get("/editProfilePage", adminController.editProfilePage)
router.post("/updateAdminProfile", adminController.updateAdminProfile)
router.get("/changePasswordPage", adminController.changePasswordPage)
router.post("/changePassword", adminController.changePassword)
router.get("/logout", adminController.logout)


//////////////////////////////USER////////////////////////
router.post("/signup",userController.signup)
router.get("/getUserPage", userController.getUserPage)
router.get("/userViewPage/:id", userController.userViewPage)
router.post("/userStatus/:id", userController.userStatus)


////////////////////////CMS////////////////////////
router.post("/createCms", cmsController.createCms)
router.get("/termConditionPage", cmsController.termConditionPage)
router.post("/updateTermCms", cmsController.updateTermCms)
router.get("/privacyPolicyPage", cmsController.privacyPolicyPage)
router.post("/updatePrivacyCms", cmsController.updatePrivacyCms)
router.get("/aboutUsPage", cmsController.aboutUsPage)
router.post("/updateAboutCms", cmsController.updateAboutCms)

//////////////////////////CONTACT US/////////////////////////
router.post("/createContactUs",contactUsControler.createContactUs)
router.get("/contactUsPage",contactUsControler.contactUsPage)
router.get("/contactUsView/:id", contactUsControler.contactUsView)


///////////////////////NOTIFICATION/////////////////////
router.post("/createNotification",notificationController.createNotification)
router.get("/notificationPage",notificationController.notificationPage)
router.get("/notificationView/:id", notificationController.notificationView)

module.exports = router;
