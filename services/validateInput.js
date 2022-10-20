const validator = require("validator")

module.exports = (uname, pwd, cnfrmPwd, userEmail, name)=>{

    if (!uname)
      return "Username can't be empty"
  
    if (!pwd)
      return "Password can't be empty"
  
    if (!cnfrmPwd)
      return "Confirm Password can't be empty"
  
    if (!userEmail)
      return "Email can't be empty"
  
    if (!name)
      return "Name can't be empty"
  
    if (pwd !== cnfrmPwd)
      return "Password and Confirm Password mismatch"
  
    if (pwd.length <= 8)
      return "Password length can't be less than 8"
  
    if (!validator.isEmail(userEmail))
      return "Invalid Email Address"
  
    return ""
  }