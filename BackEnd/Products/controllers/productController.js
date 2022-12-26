const ProductModel = require("../models/ProductModel")

const addProduct = async (req, res) => {
  const productData = req.body

  console.log(productData)
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