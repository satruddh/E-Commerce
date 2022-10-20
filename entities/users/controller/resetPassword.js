const jwt = require("jsonwebtoken")
const dotenv= require("dotenv")
const userQueryService = require("../services/userQueryService")
const bcrypt=require("bcrypt")
const updatePass = require("../services/updatePass")
dotenv.config()

const getResetPassHandler = async (req,res)=>{
    let username = req.params.username
    let token = req.params.token

    try{
        let user = await userQueryService({"username" : username})
        if(!user)
        {
            throw new Error("No User found")
        }

        let secret = process.env.JWT_SECRET + username
        let payload = jwt.verify(token,secret)

        res.render("resetPass",{
            username : username,
            token : token,
            err : ""
        })


    }
    catch(err)
    {
        console.log(err.message)
        res.render("errorPage",{
            errCode : 500,
            errMessage : err.message,
            errTitle : "Eror Occured"
        })

    }
}

const postResetPassHandler = async (req,res)=>{
    let username = req.params.username
    let pass = req.body.newpass
    let cpass = req.body.cnewpass

    if(pass!==cpass)
    {
        res.render("resetPass",{
            username : username,
            token : token,
            err : "Passwords do not match."
        })
        return
    }
    else if(pass.length<8)
    {
        res.render("resetPass",{
            username : username,
            token : token,
            err : "Passwords length should be greater than or equal to 8"
        })
        return
    }

    try {

        pass = await bcrypt.hash(pass,Number(process.env.SALT_ROUND))
    
        let upd = await updatePass(username,pass)

        if(upd.modifiedCount===0)
            throw new Error("failed to update")
        res.send("Success!! Go to <a href='/user/login'>Login</a>.")
    }
    catch{
        res.render("errorPage",{
            errCode : 500,
            errMessage : err.message,
            errTitle : "Eror Occured"
        })

        res.end()
    }

}

module.exports = { getResetPassHandler,postResetPassHandler}