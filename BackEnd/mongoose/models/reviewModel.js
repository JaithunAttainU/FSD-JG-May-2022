const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const reviewSchema = new Schema({
  comment: {
    type: String,
    maxLength: 1000
  },
  like: {
    type: Number,
    default: 0
  },
  postedOn: {
    type: Date,
    default: Date.now()
  },
  movieID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'movies'
  }
})

const ReviewModel = mongoose.model('reviews', reviewSchema)

module.exports = ReviewModel