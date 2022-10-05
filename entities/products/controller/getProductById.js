const findById = require("../services/findById")


module.exports = async (req,res)=>{
    try {
        let token= req.params.id
        let prods = await findById(token)

        if(prods)
        {
            if(req.session.isAuthenticated)
            {
                res.render("product",{
                    _id : prods._id,
                    activeUser : req.session.username,
                    definedControl : "Logout",
                    product : prods
                })
            }
            else
            {
                res.render("product",{
                    _id : prods._id,
                    activeUser : "",
                    definedControl : "Login",
                    product : prods
                })
            }
            
        }
        res.end()

    }
    catch(err)
    {
        res.status(500)
        console.log(err.message)
        res.send("")
    }
}