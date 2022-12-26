const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const movieSchema = new Schema({
  "title": String,
  "year": Number,
  "runtime": Number,
  "released": Date,
  "poster": String,
  "plot": String,
  "fullplot": String,
  "lastupdated": String,
  "type": String,
  "languages": [String],
  "directors": [String],
  "imdb": {
    "rating": Number,
    "votes": Number,
    "id": Number,
  },
  "cast": [String],
  "countries": [String],
  "genres": [String],
  "tomatoes": {
    "viewer": {
      "rating": Number,
      "numReviews": Number
    },
    "lastUpdated": Date
  },
  "num_mflix_comments": Number
})

//Map mongodb collection to the schema above. .model will return a obj using which u can perform all db operations
const MovieModel = mongoose.model('movies', movieSchema)

module.exports = MovieModel