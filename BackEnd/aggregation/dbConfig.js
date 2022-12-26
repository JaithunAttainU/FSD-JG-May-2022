const mongoose = require('mongoose');

const connectionURL = "mongodb+srv://jaithun:12345@attainu.q1j9u.mongodb.net/?retryWrites=true&w=majority"

async function connectDB() {
  try {
    // 1) connect
    await mongoose.connect(connectionURL, { dbName: "sample_mflix" })
    console.log("DB Connection Successful")
  } catch (error) {
    console.log("Error Connecting to DB")
  }
}

module.exports = connectDB