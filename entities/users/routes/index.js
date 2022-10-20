const express = require('express')
const loginController = require("../controller/loginController")
const signupController = require("../controller/signupController")
const verificationController = require('../controller/verificationController')

const logoutHandler = require('../controller/logoutHandler')
const { forgotGetHandler, forgotPostHandler } = require('../controller/forgotPassword')
const { getResetPassHandler, postResetPassHandler } = require('../controller/resetPassword')

const router = express.Router()

router.route("/login").get(loginController.getReq)
.post(loginController.postReq)

router.route("/signup").get(signupController.getSignup)
.post(signupController.postSignup)

router.route("/verification/:token").get(verificationController.getReq)
.post(verificationController.postReq)

router.route('/forgotPass').get(forgotGetHandler)
.post(forgotPostHandler)

router.route("/resetPassword/:username/:token").get(getResetPassHandler)
.post(postResetPassHandler)

router.route("/logout").get(logoutHandler)

module.exports = router