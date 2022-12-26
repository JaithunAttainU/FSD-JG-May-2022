const { Router } = require('express')
const { deleteMovieByID, getMovies, getMoviesByID, postMovie, updateMovieById } = require('../controllers/movieController')

const movieRouter = Router()

//Moview routes
movieRouter.get('/', getMovies)
movieRouter.get('/:movieID', getMoviesByID)

//Route level Middleware
movieRouter.post('/', postMovie)
movieRouter.put('/:movieID', updateMovieById)
movieRouter.delete('/:movieID', deleteMovieByID)

module.exports = movieRouter

