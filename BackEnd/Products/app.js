const express = require('express')
const connectToDB = require('./dbConfig')
const productRouter = require('./routes/productRouter')
const app = express()

//JSON data & Form Data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//{index:false}
app.use(express.static('public'))

app.use('/products', productRouter)
app.listen(8000, () => {
  console.log("Server Started Successfully")
  connectToDB()
})