const userLogin = require("../services/loginService")
const bcrypt= require("bcrypt")

module.exports.postReq= (req,res)=>{
  let username = req.body.username.trim()
  let password = req.body.password.trim()

  if(username==="" || password==="")
  {
    res.render("login",{err : "Empty input not allowed"})
    return
  }

  userLogin(username).then(async (user)=>{
    console.log('user==',user)
    if(user)
    {

      let matched= await bcrypt.compare(password,user.password)

      if(matched){

        if(!user.isVerified)
        {
          res.redirect(`/user/verification/${user.token}`)
          return
        }

        req.session.isAuthenticated = true
        req.session.username = username
        req.session.UName = user.name
        res.redirect("/")
        return
      }
      res.render("login",{err : "Wrong password"})
      return
    }

    res.render("login",{err : "User Not Found"})
  })
}

module.exports.getReq = (req,res)=>{
  if(req.session.isAuthenticated)
  {
    console.log("Req session ",req.session)
    res.redirect("/")
  }
  else
  {
    res.render("login",{err : ""})
  }
}