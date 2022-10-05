const Mailjet = require('node-mailjet');
const dotenv = require('dotenv')
dotenv.config()
const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_PRIVATE_KEY,
  process.env.MAILJET_API_PUBLIC_KEY,
);
const userSignup = require("../services/signupService")
const bcrypt = require("bcrypt")
const validator = require("validator")
const saltRound = 10

function validateInput(uname, pwd, cnfrmPwd, userEmail, name) {

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

module.exports.getSignup = (req, res) => {
  res.render("signup", { err: "" })
}

module.exports.postSignup = async (req, res) => {
  let uname = req.body.username.trim()
  let pwd = req.body.password.trim()
  let userEmail = req.body.userEmail.trim()
  let cnfrmPwd = req.body.confirmPassword.trim()
  let name = req.body.userName.trim()

  let err = validateInput(uname, pwd, cnfrmPwd, userEmail, name)

  if (err) {
    res.render("signup", { err: err })
    return
  }

  userEmail = validator.normalizeEmail(userEmail)
  pwd = await bcrypt.hash(pwd,saltRound)

  const token = Buffer.from(uname).toString('base64')

  console.log("Here..... I am")
  userSignup(uname, pwd, name, userEmail, token).then((obj) => {
    console.log("Success")
    console.log(obj)
    console.log("id : ", obj._id)
    console.log('token ', token)

    const request = mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: "satruddhprataprao@gmail.com",
              Name: "Satruddh"
            },
            To: [
              {
                Email: `${userEmail}`,
                Name: `${name}`
              }
            ],
            Subject: "Please verify your account.",
            TextPart: ``,
            HTMLPart: `
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
                    <h4>Dear ${name}, Please verify your account to Continue</h4>
                </div>
                <div class="body">
                    <form class="userForm" action="http://localhost:3000/user/verification/${token}" method="post">
                        <div class="form-group">
                            <input class="input-field" type="hidden" name="userToken" id="userToken" value="${token}">
                        </div>
                        <div class="form-group">
                            <input class="btn" type="submit" value="Click to verify">
                        </div>
                    </form>
                </div>
            </div>
            </body>
            </html>`
          }
        ]
      })

    request
      .then((result) => {
        console.log(result.body)
      })
      .catch((err) => {
        console.log(err.statusCode)
      })
    res.redirect("/user/login")
    // res.redirect(`/user/verification/${token}`)
  })
    .catch((err) => {
      console.log(err)
    })
}