const userModel = require("../../../database/models/user")

module.exports = async (filter)=>{
    return userModel.findOne(filter)
}