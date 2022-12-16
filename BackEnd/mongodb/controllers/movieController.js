const connectDB = require('../dbConfig.js')
const {ObjectId} = require("mongodb")
//db.users
let movieCollection;

async function getMovieCollection() {
  movieCollection = await connectDB("movies")
}

getMovieCollection()

const getMovies = async (req, res) => {

  const {language, name} = req.query //{language: 'hindi', name: ''}

  const conditions = {}

  //Support searching through lang only if the user has given else return do not apply lang condition
  if(language) {
    conditions.language = language
  }

  if(name) {
    conditions.name = name
  }
  try {
    const movies = await movieCollection.find(conditions).toArray()
    res.status(200).send({status: 'success', movies})
  } catch (error) {
    console.log("Error fetching movies from DB")
    res.status(500).send({status: 'error', msg: "Error fetching movies from DB"})
  }
}

const getMoviesByID = async(req, res) => {

  const {movieID} = req.params //{ movieID: '639b4bfaf5b417f9399c0f3e' }

  try {
    const movie = await movieCollection.findOne({_id: new ObjectId(movieID)})
    if(movie) {
      res.status(200).send({status: 'success', movie})
    } else {
      res.status(404).send({status: 'error', msg: "Movie Not found"})
    }
  } catch (error) {
    console.log("Error fetching movie from DB")
    res.status(500).send({status: 'error', msg: "Error fetching movie from DB"})
  }
}

const postMovie = async (req, res) => {

  const movieData = req.body

  //Validations
  try {
    const data = await movieCollection.insertOne(movieData)
    console.log(data)
    res.status(201).send({status: 'succes', msg: 'Movie Inserted successfully', movie: data})
  } catch (error) {
    console.log("Error inserting movie in DB")
    res.status(500).send({status: 'error', msg: "Error inserting movie in D"})
  }
}

const updateMovieById = async (req, res) => {
  const {movieID} = req.params //{ movieID: '639b4bfaf5b417f9399c0f3e' }
  const updatedMovieData = req.body

  try {
    await movieCollection.updateOne({_id: new ObjectId(movieID)}, {$set: updatedMovieData})
    res.status(201).send({status: 'succes', msg: 'Movie updated successfully'})
  } catch (error) {
    console.log("Error updating movie in DB")
    res.status(500).send({status: 'error', msg: "Error updating movie in D"})
  }
}


const deleteMovieByID = async(req, res) => {
  const {movieID} = req.params //{ movieID: '639b4bfaf5b417f9399c0f3e' }
  try {
    await movieCollection.deleteOne({_id: new ObjectId(movieID)})
    res.status(201).send({status: 'succes', msg: 'Movie deleted successfully'})
  } catch (error) {
    console.log("Error deleting movie in DB")
    res.status(500).send({status: 'error', msg: "Error deleting movie in D"})
  }
}

module.exports = {
  getMovies,
  getMoviesByID,
  postMovie,
  updateMovieById,
  deleteMovieByID
}