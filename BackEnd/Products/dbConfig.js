const mongoose = require('mongoose')

const connectionURL = "mongodb+srv://jaithun:12345@attainu.q1j9u.mongodb.net/?retryWrites=true&w=majority"

async function connectToDB() {
  try {
    await mongoose.connect(connectionURL, { dbName: 'ECommerce' })
    console.log("Connection to DB Successfull")
  } catch (error) {
    console.log("Error Connecting to DB")
    process.exit()
  }
}

module.exports = connectToDB