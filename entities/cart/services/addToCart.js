const cartModel = require("../../../database/models/cart")

module.exports = (cartDetail)=>{
    return cartModel.create(cartDetail)
}