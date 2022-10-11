const cartModel = require("../../../database/models/cart")
module.exports= (user)=>{
    return cartModel.find({"username" : user,"ordered" : true})
}