const { Router } = require('express')
const { addProduct, getProducts } = require('../controllers/productController')

const productsRouter = new Router()

productsRouter.post('/', addProduct)
productsRouter.get('/', getProducts)

module.exports = productsRouter