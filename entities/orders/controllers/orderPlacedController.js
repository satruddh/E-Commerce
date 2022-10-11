module.exports = (req,res)=>{
    if(req.session.success)
        res.render("errorPage",{
            errCode : "",
            errTitle : "Success",
            errMessage : "Voila!!"
        })
    else
    {
        res.redirect("/")
    }
}