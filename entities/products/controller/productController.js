const listProductsService = require("../services/listProductsService")


module.exports  = async (req,res)=>{
    try {
        const allProd = await listProductsService({})
        // console.log(allProd)
        if(req.session.isAuthenticated)
        {
            res.render("home",{
                _id : allProd._id,
                activeUser : req.session.UName,
                definedControl : "Logout",
                prods : allProd
            })
        }
        else
        {
            res.render("home",{
                _id : allProd._id,
                activeUser : "",
                definedControl : "Login",
                prods : allProd
            })
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500)
        res.send("Internal Error")
        
    }
    
}