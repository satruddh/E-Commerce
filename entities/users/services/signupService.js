const userModel = require("../../../database/models/user")


module.exports = (username,password,name,userEmail,token)=>{
    
  let user = {
    username : username,
    password : password,
    name : name,
    email : userEmail,
    token : token,
    isVerified : false
  }
  return userModel.create(user)
}