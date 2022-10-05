const productModel = require("../../../database/models/products")

module.exports = ()=>{
    console.log("Get All Data..")
    return productModel.find({}).limit(5)
}