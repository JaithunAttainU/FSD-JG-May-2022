const express = require('express')
const connectToDB = require('./dbConfig')
const productRouter = require('./routes/productRouter')
const dotenv = require('dotenv')
//Read all env variables from .env file and attach it to ur process.env obj
dotenv.config()

const fileUpload = require('express-fileupload')
const app = express()

//JSON data & Form Data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())
//{index:false}
app.use(express.static('public'))

app.use('/products', productRouter)
app.listen(8000, () => {
  console.log("Server Started Successfully")
  connectToDB()
})