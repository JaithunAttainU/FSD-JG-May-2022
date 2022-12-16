const { MongoClient } = require('mongodb');


const connectionURL = "mongodb+srv://jaithun:12345@attainu.q1j9u.mongodb.net/?retryWrites=true&w=majority"
const dbName = "BookMyShow"


async function connectDB(collectionName) {

  const client = new MongoClient(connectionURL)

  try {
     // 1) connect
    await client.connect()

    //2) DB Name
    const db = client.db(dbName)

    //3) Collection Name
    const collection = db.collection(collectionName)

    console.log("DB Connection Successful")
    return collection
  } catch (error) {
    console.log("Error Connecting to DB")
  }
}

module.exports = connectDB