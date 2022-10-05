const addToCart = require("../services/addToCart")
const postHandler = async (req,res)=>{

    let qty =req.body.quantity
    let prod = req.body.product
    let price = req.body.basePrice
    let user = null
    if(req.session.isAuthenticated)
    {

        if(!qty || !prod ||!price)
        {
            console.log(true)
            qty = req.session.body.qty
            prod = req.session.body.prod
            price = req.session.body.price
        }

        user = {
            Name : req.session.UName,
            username : req.session.username
        }
        req.session.returnTo = null
        let cartDetail = {
            username : user.username,
            product_id : prod,
            base_price : price,
            quantity : qty
        }
        let cart = await addToCart(cartDetail)
        console.log("Requested Product : ",prod," Qty : ",qty," for User :",user)
        console.log(cart)
        console.log(req.session)
        res.redirect("/user/cart")
    }
    else
    {
        
        req.session.returnTo = "/addToCart"
        req.session.body = {qty : qty , prod : prod, price : price}
        res.redirect("/user/login")
    }
}

module.exports = {postHandler}