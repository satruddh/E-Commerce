const userRoute = require("./users/routes")
const homeRoute = require("./home/routes")
module.exports = (app)=>{
  app.use("/user",userRoute)
  app.use("/",homeRoute)
}