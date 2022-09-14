const userModel = require("../../../database/models/user")

module.exports = async (token)=>{
    const user = await userModel.findOne({token : token})

    console.log(user)
    
    if(user.isVerified)
    {
        console.log("user is verified!")
        return user;
    }

    return userModel.updateOne({token : token},{isVerified : true})
}