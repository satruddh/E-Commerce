const express=require("express")
const getProductById = require("../controller/getProductById")
const getHandler= require("../controller/productController")

const router = express.Router()

router.route("/products/:id").get(getProductById)
router.route("/").get(getHandler)

module.exports = router