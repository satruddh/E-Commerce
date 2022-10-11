const getCartItems = require("../services/getCartItems")

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
    console.log("aaxas",cartItems.length)
    res.render("cart",{
        activeUser : req.session.UName,
        definedControl : "Logout",
        cartItems : cartItems,
        cartTotal : total
    })
}
