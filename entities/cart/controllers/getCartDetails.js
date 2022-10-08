const cartModel = require("../../../database/models/cart")
const getCartItems = require("../services/getCartItems")
const productModel = require("../../../database/models/products")

module.exports =async (req,res)=>{
    if(!req.session.username)
    {
        req.session.returnTo = "/cart/view"
        res.redirect("/user/login")
        return
    }

    let cartItems = await getCartItems(req.session.username)
    let total=0
    cartItems.forEach(elem =>{
        total+=Number(elem.base_price)*Number(elem.quantity)
    })
    res.render("cart",{
        activeUser : req.session.UName,
        definedControl : "Logout",
        cartItems : cartItems,
        cartTotal : total
    })
}
