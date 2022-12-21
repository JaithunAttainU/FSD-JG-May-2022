const express = require('express')
const movieRouter = require('./routes/movieRouter')
const connectDB = require('./dbConfig')
const authRouter = require('./routes/authRouter')
const cookieParser = require('cookie-parser')

const app = express()

//middleware - Parsing request body which is in JSON Format
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/movies', movieRouter)
app.use('/', authRouter)

app.listen(8000, () => {
  console.log("Started Successfully")
  connectDB()
})