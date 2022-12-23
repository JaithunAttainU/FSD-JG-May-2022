const MovieModel = require("../models/movieModel")
const ReviewModel = require("../models/reviewModel")

const getAllReviews = async (req, res) => {
  // const { movieID } = req.params

  // try {
  //   const movie = await MovieModel.findById(movieID, { reviews: 1, _id: 0 }).populate('reviews', { comment: 1, like: 1, postedOn: 1, _id: 0 })
  //   if (movie) {
  //     res.status(200).send({ status: 'success', movie })
  //   } else {
  //     res.status(404).send({ status: 'error', msg: "Movie Not found" })
  //   }
  // } catch (error) {
  //   res.status(500).send({ status: 'error', msg: "Error fetching movie reviews from DB" })
  // }

  const { movieID } = req.params

  try {
    const reviews = await ReviewModel.find({ movieID })
    res.status(200).send({ status: 'success', reviews })
  } catch (error) {
    res.status(500).send({ status: 'error', msg: "Error fetching movie reviews from DB" })
  }
}

const addReview = async (req, res) => {
  const { movieID } = req.params

  const { comment } = req.body
  try {
    //1)Add the review in Review Collection
    const addedReview = await ReviewModel.create({ comment, movieID })

    //2) Get the _id of review and insert it inside Movie Document
    const movieUpdatedDoc = await MovieModel.findByIdAndUpdate(movieID, {
      $push: {
        reviews: addedReview._id
      }
    })

    res.send({ status: 'success', review: addedReview })

  } catch (error) {
    res.status(500).send({ status: 'error', msg: 'Adding Review was failed' })
  }
}

const deleteReview = (req, res) => {

}

module.exports = {
  getAllReviews,
  addReview,
  deleteReview
}