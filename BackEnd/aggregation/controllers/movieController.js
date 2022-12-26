const MovieModel = require('../models/movieModel')

const getMovies = async (req, res) => {
  try {
    // const movies = await MovieModel.find()
    const { year, title } = req.query

    //Grouping
    // [{ year: 2010, movieCount: 7 }, { year: 1913, movieCount: 11 }, { year: 2000, movieCount: 4 }]

    const movies = await MovieModel.aggregate([{
      $group: {
        _id: "$year",
        movieCount: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        movieCount: 1
      }
    }])

    // const movies = await MovieModel.aggregate([
    //   {
    //     $project: {
    //       year: 1,
    //       "tomatoes.viewer": 1,
    //       title: 1,
    //       "imdb.rating": 1,
    //       cast: 1
    //     }
    //   },
    //   {
    //     $match: {
    //       year: Number(year),
    //       "imdb.rating": {
    //         $gt: 8.0
    //       }
    //     }
    //   },
    //   {
    //     $sort: {
    //       title: 1
    //     }
    //   },
    //   {
    //     $limit: 2
    //   },
    //   {
    //     $lookup: {
    //       from: 'comments',
    //       localField: "_id",
    //       foreignField: "movie_id",
    //       as: "movie_comments"
    //     }
    //   },
    //   {
    //     $unwind: "$cast"
    //   }
    // ])
    res.status(200).send({ status: 'success', movies })
  } catch (error) {
    console.log("Error fetching movies from DB")
    res.status(500).send({ status: 'error', msg: "Error fetching movies from DB" })
  }
}

const getMoviesByID = async (req, res) => {

  const { movieID } = req.params //{ movieID: '639b4bfaf5b417f9399c0f3e' }

  try {
    const movie = await MovieModel.findById(movieID)
    if (movie) {
      res.status(200).send({ status: 'success', movie })
    } else {
      res.status(404).send({ status: 'error', msg: "Movie Not found" })
    }
  } catch (error) {
    console.log("Error fetching movie from DB")
    res.status(500).send({ status: 'error', msg: "Error fetching movie from DB" })
  }
}

const postMovie = async (req, res) => {

  const movieData = req.body

  //Validations
  try {
    const data = await MovieModel.create(movieData)
    res.status(201).send({ status: 'succes', msg: 'Movie Inserted successfully', movie: data })
  } catch (error) {
    console.log("Error inserting movie in DB")
    res.status(500).send({ status: 'error', msg: "Error inserting movie in DB", error })
  }
}

const updateMovieById = async (req, res) => {
  const { movieID } = req.params //{ movieID: '639b4bfaf5b417f9399c0f3e' }
  const updatedMovieData = req.body

  try {
    const updatedMovie = await MovieModel.findByIdAndUpdate(movieID, updatedMovieData, { runValidators: true, new: true })
    res.status(201).send({ status: 'succes', msg: 'Movie updated successfully', movie: updatedMovie })
  } catch (error) {
    console.log("Error updating movie in DB")
    res.status(500).send({ status: 'error', msg: "Error updating movie in DB", error })
  }
}


const deleteMovieByID = async (req, res) => {
  const { movieID } = req.params //{ movieID: '639b4bfaf5b417f9399c0f3e' }
  try {
    await MovieModel.findByIdAndDelete(movieID)
    res.status(201).send({ status: 'succes', msg: 'Movie deleted successfully' })
  } catch (error) {
    console.log("Error deleting movie in DB")
    res.status(500).send({ status: 'error', msg: "Error deleting movie in D" })
  }
}

module.exports = {
  getMovies,
  getMoviesByID,
  postMovie,
  updateMovieById,
  deleteMovieByID
}