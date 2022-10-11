const express= require('express')
const orderItemController = require('../controllers/orderItemController')
const orderPlacedController = require("../controllers/orderPlacedController")
const checkoutAll = require("../controllers/checkoutAll")
const viewOrders = require('../controllers/viewOrders')
const router = express.Router()

router.route("/").get(viewOrders)
router.route("/all").post(checkoutAll)
router.route("/item/:itemId").get(orderItemController)
router.route("/success").get(orderPlacedController)

module.exports = router