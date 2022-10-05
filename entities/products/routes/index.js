const express=require("express")
const getProductById = require("../controller/getProductById")
const productController = require("../controller/productController")


const router = express.Router()

router.route("/products/:id").get(getProductById)
router.route("/").get(productController)

module.exports = router