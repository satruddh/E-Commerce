const listProductsService = require("../services/listProductsService")


module.exports  = async (req,res)=>{
    req.session.success=false
    let page = req.query.page
    if(!page)
        page = 1
    let limit = 5 * page

    console.log("limit",limit)
    try {
        const allProd = await listProductsService(limit)
        page=Number(page)+1
        // console.log(allProd)
        if(req.session.isAuthenticated)
        {
            res.render("home",{
                activeUser : req.session.UName,
                definedControl : "Logout",
                prods : allProd,
                page: page 
            })
        }
        else
        {
            res.render("home",{
                activeUser : "",
                definedControl : "Login",
                prods : allProd,
                page:page
            })
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500)
        res.send("Internal Error")
        
    }
    
}