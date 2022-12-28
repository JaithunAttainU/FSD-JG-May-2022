const ProductModel = require("../models/ProductModel")
const Base64 = require('js-base64')
const addProduct = async (req, res) => {
  const productData = req.body

  if (req.files && Object.keys(req.files).length > 0) {
    const fileData = req.files.image
    console.log(fileData)

    const base64EncodedData = Base64.encode(fileData.data)
    console.log(base64EncodedData.substring(0, 25))
  }
  try {
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