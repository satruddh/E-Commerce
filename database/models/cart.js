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
    }
})

const cartModel = mongoose.model('cartDetail',cartSchema)

module.exports = cartModel