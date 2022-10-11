const express = require('express')
const { postHandler} = require('../controllers/addToCartController')
const getCartDetails = require("../controllers/getCartDetails")
const removeItemController = require("../controllers/removeItemController")


const router = express.Router()

router.route("/add").post(postHandler).get(postHandler)
router.route("/view").get(getCartDetails)
router.route("/remove/:itemId").get(removeItemController)

module.exports = router