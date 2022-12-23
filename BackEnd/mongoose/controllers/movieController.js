const MovieModel = require('../models/movieModel')

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
    const movies = await MovieModel.find(conditions)
    res.status(200).send({status: 'success', movies})
  } catch (error) {
    console.log("Error fetching movies from DB")
    res.status(500).send({status: 'error', msg: "Error fetching movies from DB"})
  }
}

const getMoviesByID = async(req, res) => {

  const {movieID} = req.params //{ movieID: '639b4bfaf5b417f9399c0f3e' }

  try {
    const movie = await MovieModel.findById(movieID).populate('reviews', { comment: 1, like: 1, postedOn: 1, _id: 0 })
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
    const data = await MovieModel.create(movieData)
    console.log(data)
    res.status(201).send({status: 'succes', msg: 'Movie Inserted successfully', movie: data})
  } catch (error) {
    console.log("Error inserting movie in DB")
    res.status(500).send({status: 'error', msg: "Error inserting movie in DB", error})
  }
}

const updateMovieById = async (req, res) => {
  const {movieID} = req.params //{ movieID: '639b4bfaf5b417f9399c0f3e' }
  const updatedMovieData = req.body

  try {
    const updatedMovie = await MovieModel.findByIdAndUpdate(movieID, updatedMovieData, {runValidators: true, new: true})
    res.status(201).send({status: 'succes', msg: 'Movie updated successfully', movie: updatedMovie})
  } catch (error) {
    console.log("Error updating movie in DB")
    res.status(500).send({status: 'error', msg: "Error updating movie in DB", error})
  }
}


const deleteMovieByID = async(req, res) => {
  const {movieID} = req.params //{ movieID: '639b4bfaf5b417f9399c0f3e' }
  try {
    await MovieModel.findByIdAndDelete(movieID)
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