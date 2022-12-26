const express = require('express')
const movieRouter = require('./routes/movieRouter')
const connectDB = require('./dbConfig')

const app = express()

//middleware - Parsing request body which is in JSON Format
app.use(express.json())
app.use('/movies', movieRouter)

app.listen(8000, () => {
  console.log("Started Successfully")
  connectDB()
})