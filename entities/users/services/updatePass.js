const userModel = require("../../../database/models/user")

module.exports = (username,newPass)=>{
    return userModel.updateOne({"username" : username},{$set :{"password" : newPass}})
}