const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    product_id : {
        type : String,
        required : true,
    },
    base_price : {
        type : Number,
        required : true,
    },
    quantity : {
        type : Number,
        required : true,
        default:1,
        min:[1,"Can't be less than 1"],
    },
    product_img : {
        type : String,
        required : true,
    },
    product_title : {
        type : String,
        required : true,
    },
    product_brand : {
        type : String,
        required : true,
    },
    ordered : {
        type : Boolean,
        default : false,
    },
    orderDate : Date
})

const cartModel = mongoose.model('cartDetail',cartSchema)

module.exports = cartModel