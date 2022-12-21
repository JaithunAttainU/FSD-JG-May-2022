const { Router } = require('express')
const { deleteMovieByID, getMovies, getMoviesByID, postMovie, updateMovieById } = require('../controllers/movieController')
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware')

const movieRouter = Router()

movieRouter.use(verifyToken)

//Moview routes
movieRouter.get('/', getMovies)
movieRouter.get('/:movieID', getMoviesByID)

movieRouter.use(isAdmin)

//Route level Middleware
movieRouter.post('/', postMovie)
movieRouter.put('/:movieID', updateMovieById)
movieRouter.delete('/:movieID', deleteMovieByID)

module.exports = movieRouter

