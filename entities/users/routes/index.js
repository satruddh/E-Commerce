const express = require('express')
const loginController = require("../controller/loginController")
const signupController = require("../controller/signupController")
const verificationController = require('../controller/verificationController')
const forgotPasswordController = require("../controller/forgotPassword")
const logoutHandler = require('../controller/logoutHandler')


const router = express.Router()

router.route("/login").get(loginController.getReq)
.post(loginController.postReq)

router.route("/signup").get(signupController.getSignup)
.post(signupController.postSignup)

router.route("/verification/:token").get(verificationController.getReq)
.post(verificationController.postReq)

router.route('/forgotPass').get(forgotPasswordController)

router.route("/logout").get(logoutHandler)

module.exports = router