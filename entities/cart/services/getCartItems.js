const cartModel = require("../../../database/models/cart")

module.exports = (username)=>{
    return cartModel.find({username : username})
}