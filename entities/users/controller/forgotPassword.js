const userQueryService = require("../services/userQueryService")
const sendMail = require("../../../services/mailservice")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const forgotGetHandler = (req,res)=>{
    res.render("forgotPass",{
        submit:false
    })
}

const forgotPostHandler = async (req,res)=>{
    let userId = req.body.userID
    try{
        const user = await userQueryService({
            $or :[
                { "username" : userId},
                { "email" : userId}
            ]
        })

        if(!user)
            throw new Error("No such user found")

        const secret = process.env.JWT_SECRET + user.username
        
        const token = jwt.sign({
            email : user.email,
            username : user.username,
        },secret,{ "expiresIn" : '5m'})

        let subject = "Password Reset Link."
        let HTMLPart =  `
        <html>
        <head>
        <style>
        .container {
            /*display: flex;*/
            height : 300px;
            /*flex-direction: column;*/
            border-radius: 5px;
            text-align:center;
            box-shadow:2px 2px 5px 1px rgb(225, 219, 226);
        }
        
        .container > * {
            margin: 0;
            /*display: flex;*/
            flex-direction: column;
            justify-content : center;
            align-items : center;
        }
        
        h4 {
            font-size: x-large;
            margin-bottom: 0px;
        }
        
        .header {
            align-items: center;
            /*flex: 20%;*/
            width: 100%;
            /*height: 100%;*/
            /*justify-content : center;*/
        }
        
        .body{
            /*flex: 80%;*/
            /*height: 100%;*/
            width: 100%;
            margin : 50px 0 0 0;
            align-items : center;
            justify-content : center;
        }
        
        .userForm {
            /*display: flex;*/
            flex-direction: column;
            align-items: center;
        }
        
        .form-group{
            /*display: flex;*/
            flex-direction: column;
            margin: 5px 0px;
            justify-content: space-evenly;
            width: 80%;
        }
                    
        .btn {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: medium;
            font-weight: 500;
            padding: 5px;
            color: white;
            border: 3px solid #0269c2bf;
            border-radius: 3px;
            background-color: rgb(15,89,223);
        }
        
        .btn:hover{
            cursor: pointer;
        }
                    
        .btn:focus-visible{
            outline: none;
            border: 2px solid black;
        }
        </style>
        </head>
        <body>
        <div class="container" style="flex-direction:column;">
            <div class="header">
                <h4>Dear ${user.name}, Please verify your account to Continue</h4>
            </div>
            <div class="body">
                <div class="userForm">
                    <a href = "${process.env.BASE_URL}/user/resetPassword/${user.username}/${token}" class="form-group">
                        <button class="input-field btn">Click To Reset</button>
                    </a>
                </div>
            </div>
        </div>
        </body>
        </html>`

        let body = {
            TextPart : '',
            HTMLPart : HTMLPart
        }

        let recepient = {
            email : user.email,
            name : user.name
        }
        let ans = await sendMail(recepient,subject,body)

        res.render("forgotPass",{
            submit:true
        })
        
    }
    catch(err)
    {
        res.render("errorPage",{
            errCode : err.statusCode,
            errMessage : err.message,
            errTitle : "Eror Occured"
        })
    }

    
}

module.exports = {forgotGetHandler,forgotPostHandler}