const express = require("express")

const app = express()
const session = require("express-session")
const port = 3000

const initMongoose = require("./database/init")
const productModel = require("./database/models/products")
const entities = require("./entities")

app.set('view engine', 'ejs')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.use((req,res,next)=>{
    console.log("Method : ",req.method," URL : ",req.url)
    next()
})

app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))
app.use(express.json())

initMongoose().then(()=>{
    console.log("db connected")
    entities(app)
    app.listen(port,()=>{
        console.log(`App listening at port ${port}`)
    })
})
.catch((err)=>{
    console.log("error ",err)
    console.log(err.message)
})