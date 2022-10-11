const removeItem = require('../services/removeItem')

module.exports=async (req,res)=>{
    let itemId = req.params.itemId
    const remove =await removeItem(itemId)
    console.log(remove)
    res.redirect("/cart/view")
}