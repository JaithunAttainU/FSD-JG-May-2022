const { Router } = require('express')
const { deleteMovieByID, getMovies, getMoviesByID, postMovie, updateMovieById } = require('../controllers/movieController')
const { addReview, getAllReviews, deleteReview } = require('../controllers/reviewController')

const movieRouter = Router()

//Moview routes
movieRouter.get('/', getMovies)
movieRouter.get('/:movieID', getMoviesByID)

//Route level Middleware
movieRouter.post('/', postMovie)
movieRouter.put('/:movieID', updateMovieById)
movieRouter.delete('/:movieID', deleteMovieByID)

//Add a Review
movieRouter.post('/:movieID/reviews', addReview)
movieRouter.get('/:movieID/reviews', getAllReviews)
movieRouter.delete('/:movieID/reviews/:reviewID', deleteReview)

//To increase/decrease the like count of a review
// movieRouter.put('/:movieID/reviews/:reviewID/like', increaseLike)

module.exports = movieRouter

