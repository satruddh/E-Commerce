const userRoute = require("./users/routes")
const productRoute = require("./products/routes")
const cartRoute = require("./cart/routes")
module.exports = (app)=>{
  app.use("/user",userRoute)
  app.use("/",productRoute)
  app.use("/cart",cartRoute)
}