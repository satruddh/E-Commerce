const Mailjet = require("node-mailjet")
const dotenv = require("dotenv")

dotenv.config()

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_PRIVATE_KEY,
    process.env.MAILJET_API_PUBLIC_KEY,
);

module.exports = (recepient,subject,body)=>{
    const request = 
    mailjet
    .post("send",{ version : 'v3.1'})
    .request({
        Messages: [
          {
            From: {
              Email: "satruddhprataprao@gmail.com",
              Name: "Satruddh"
            },
            To: [
              {
                Email: recepient.email,
                Name: recepient.name
              }
            ],
            Subject: subject,
            TextPart: body.TextPart,
            HTMLPart: body.HTMLPart
          }
        ]
      })

      return request
}