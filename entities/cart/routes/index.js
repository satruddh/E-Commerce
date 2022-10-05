const express = require('express')
const { postHandler} = require('../controllers/addToCartController')


const router = express.Router()

router.route("/").post(postHandler).get(postHandler)

module.exports = router