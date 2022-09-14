const productModel = require("../../../database/models/products")

module.exports = (filter)=>{
    return productModel.find(filter)
}