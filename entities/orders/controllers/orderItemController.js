const placeOrder = require('../services/addOrder')

module.exports=async (req,res)=>{
    const id = req.params.itemId
    const order={
        username : req.session.username,
        itemId : id
    }
    const r = await placeOrder(id)
    console.log("RR ",r)
    // console.log("REMOVE", await removeItem(id))
    req.session.success=true
    res.redirect("/orders/success")
}