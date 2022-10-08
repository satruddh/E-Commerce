const express = require('express')
const { postHandler} = require('../controllers/addToCartController')
const getCartDetails = require("../controllers/getCartDetails")


const router = express.Router()

router.route("/add").post(postHandler).get(postHandler)
router.route("/view").get(getCartDetails)

module.exports = router