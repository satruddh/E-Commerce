const express = require("express")

const app = express()
const session = require("express-session")
const port = 3000

const initMongoose = require("./database/init")
const entities = require("./entities")
const mongoose = require("mongoose")
const prod = new mongoose.Schema({
    url:String,
    title:String,
    asin:String,
    price : String,
    brand : String,
    "product_details" : String,
    breadcrumbs : String,
    images_list : Array,
    features : Array
})

const model = mongoose.model('product',prod)

app.set('view engine', 'ejs')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))
app.use(express.json())

// app.use((req, res, next) => {
//     if (req.url !== '/user/login'
//         && req.url !== '/user/signup') {
//         if (req.session.isAuthenticated) {
//             next()
//         }
//         else {
//             res.redirect("/user/login")
//         }
//         return
//     }
//     next()
// })


// app.get("/", (req, res) => {
//     if(req.session.isAuthenticated){
//     res.render("home",{
//         activeUser : req.session.UName,
//         definedControl : "Logout",
//         allTodosforUser : []
//     })
//     return 
//     }
//     res.redirect("/user/login")
// })

app.get("/logout", (req, res) => {
    console.log("Req for logout made...")
    req.session.isAuthenticated = false
    req.session.UName = ""
    req.session.username = ""
    console.log(req.session)
    res.redirect("/user/login")
})

app.get("/products/:token",async (req,res)=>{
    try {
        let token= req.params.token
        let prods;
        if(token==='all'){
            prods = await model.find({}).limit(5)
            console.log(prods)
            res.send(JSON.stringify(prods))
        }
        else{
            prods = await model.findById(token)
            console.log(prods.features)
            res.render("product",{
                _id : prods._id,
                activeUser : req.session.UName,
                definedControl : "Login",
                product : prods
            })
        }
    }
    catch(err)
    {
        res.send("")
    }
})

initMongoose().then(()=>{
    console.log("db connected")
    entities(app)
    app.listen(port,()=>{
        console.log(`App listening at port ${port}`)
    })
})
.catch((err)=>{
    console.log("error",err)
})