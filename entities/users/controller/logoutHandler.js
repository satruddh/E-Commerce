module.exports = (req,res)=>{
    console.log("req.session ",req.session)
    req.session.isAuthenticated = false
    req.session.UName = null
    req.session.username = null
    if(!req.session.redirectTo)
        req.session.redirectTo = "/"
    console.log(req.session.redirectTo)
    res.redirect(req.session.redirectTo)    
}