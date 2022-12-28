const ProductModel = require("../models/ProductModel")
const Base64 = require('js-base64')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

const addProduct = async (req, res) => {
  const productData = req.body
  try {
    if (req.files && Object.keys(req.files).length > 0) {
      const fileData = req.files.image

      //converting binary data to Base64 String
      const base64EncodedData = Base64.encode(fileData.data)

      // //upload to cloudinary
      const response = await cloudinary.uploader.upload(`data:${fileData.mimetype};base64,${base64EncodedData}`)
      productData.imageUrl = response.secure_url
    }
    const newProductData = await ProductModel.create(productData)
    res.send({ status: 'success', product: newProductData })
  } catch (error) {
    res.send({ status: 'error', msg: error })
  }
}

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find()
    res.send({ status: 'success', products })
  } catch (error) {
    res.send({ status: 'error', msg: error })
  }
}

module.exports = {
  addProduct,
  getProducts
}