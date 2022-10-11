const cartModel = require("../../../database/models/cart")

module.exports = (itemId)=>{
    return cartModel.findByIdAndRemove(itemId)
}