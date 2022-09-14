 const userQueryService = require("../services/userQueryService")
const verificationService = require("../services/verificationService")

 module.exports.getReq = async (req,res)=>{
    const id = req.params.token
    console.log("Hello form verification",id)
    const user = await userQueryService({token : id})
    res.render("userVerification",{token : id,emailId : user.email})
 }

 module.exports.postReq = async (req,res)=>{
   console.log("req : ",req.userToken,"\t",req.params.token) 
   const user = await verificationService(req.params.token)

   console.log("user",user)

   if(user.isVerified)
   {
      req.session.isAuthenticated = true
      req.session.username = user.username
      req.session.UName = user.name
      res.redirect("/")
      return
   }

   res.send("Successfully Verified. <a href='/user/login'>Login</a> to your account to continue")
 }