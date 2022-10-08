const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    username : {
        type:String,
        required : true,
        unique : true,
    },
    orders : {
        type : Array,
        required : true
    }
})

const orderModel = mongoose.model('orders',orderSchema)

module.exports = orderModel 