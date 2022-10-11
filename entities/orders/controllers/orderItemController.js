const placeOrder = require('../services/addOrder')

module.exports=async (req,res)=>{
    const id = req.params.itemId
    const order={
        username : req.session.username,
        itemId : id
    }
    const r = await placeOrder(id)
    console.log("RR ",r)
    req.session.success=true
    res.redirect("/")
}