const mongoose = require('mongoose')
const { Schema } = require('mongoose')

//Cloudinary
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 25
  },
  description: {
    type: String,
    maxLength: 1000
  },
  price: {
    type: Number
  },
  addedOn: {
    type: Date,
    default: Date.now()
  },
  imageUrl: {
    type: String
  }
})

const ProductModel = mongoose.model('products', productSchema)
module.exports = ProductModel