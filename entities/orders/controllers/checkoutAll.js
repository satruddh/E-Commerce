const addOrder = require("../services/addOrder")

module.exports = async (req,res)=>{
    let objects = JSON.parse(req.body.cartData)
    for(let i=0;i<objects.length;++i)
    {
        await addOrder(objects[i]._id)
        // await removeItem(objects[i]._id)
    }
    req.session.success = true
    res.redirect("/")
}