const mongoose  = require('mongoose')
const {Schema} = require('mongoose')

const movieSchema = new Schema({
  movieName: {
    type: String,
    unique: true,
    minLength: 1,
    maxLength: 25,
    // validate: {
    //   validator: function(value) {
    //     return true
    //     else return false
    //   },
    //   message: function() {
    //     return 'Either give Name or MovieName'
    //   }
    // }
  },
  name: {
    type: String,
    unique: true,
    minLength: 1,
    maxLength: 25
  },
  language: [{
    type: String,
    enum: ["Hindi", "English", "Kannada"],
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  releaseDate: {
    type: Date,
    default: Date.now()
  },
  cast: [String],
  is3d: Boolean
})

//Map mongodb collection to the schema above. .model will return a obj using which u can perform all db operations
const MovieModel = mongoose.model('movies', movieSchema)

module.exports = MovieModel