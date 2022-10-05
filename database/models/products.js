const mongoose = require("mongoose")

const prod = new mongoose.Schema({
    url:String,
    title:String,
    asin:String,
    price : Number,
    brand : String,
    "product_details" : String,
    breadcrumbs : String,
    images_list : Array,
    features : Array
})

const productModel = mongoose.model('product',prod)

module.exports = productModel