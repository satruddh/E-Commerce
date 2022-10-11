const getAllOrders = require("../services/getAllOrders")

module.exports=async (req,res)=>{
    let orders = await getAllOrders(req.session.username)
    console.log("Orders, ",orders)
    res.render("orders",{
        activeUser : req.session.UName,
        definedControl : "Logout",
        cartItems : orders,
        cartTotal : orders.length
    })
}