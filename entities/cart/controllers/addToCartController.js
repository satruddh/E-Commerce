const addToCart = require("../services/addToCart")
const postHandler = async (req,res)=>{

    let qty =req.body.quantity
    let prod = req.body.product
    let price = req.body.basePrice
    let img = req.body.productImage
    let title = req.body.productTitle
    let brand = req.body.productBrand
    let user = null
    if(req.session.isAuthenticated)
    {

        if(!qty || !prod ||!price)
        {
            console.log(true)
            qty = req.session.body.qty
            prod = req.session.body.prod
            price = req.session.body.price
            img = req.session.body.productImage
            title = req.session.body.productTitle
            brand = req.session.body.productBrand
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
            quantity : qty,
            product_img : img,
            product_title : title,
            product_brand : brand
        }
        let cart = await addToCart(cartDetail)
        console.log("Requested Product : ",prod," Qty : ",qty," for User :",user)
        console.log(cart)
        console.log(req.session)
        res.redirect("/cart/view")
    }
    else
    {
        
        req.session.returnTo = "/cart/add"
        req.session.body = {qty : qty , prod : prod, price : price, productImage : img, productTitle : title, productBrand : brand}
        res.redirect("/user/login")
    }
}

module.exports = {postHandler}