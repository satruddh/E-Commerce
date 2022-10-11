const productModel = require("../../../database/models/products")

module.exports = (limit)=>{
    console.log("Get All Data..",limit)
    return productModel.find({}).limit(limit)
}