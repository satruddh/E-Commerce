const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
})

const productModel = mongoose.model('allProduct',productSchema)

module.exports = productModel