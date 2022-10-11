const cartModel = require("../../../database/models/cart")

module.exports = async (orderId)=>{
    return cartModel.findByIdAndUpdate(orderId,{$set : {"ordered":true, "orderDate": Date.now()}})
}