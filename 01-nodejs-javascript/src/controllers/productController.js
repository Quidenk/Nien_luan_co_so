const { createProductService, getProductService, updataProductService, removeProductService, getOneProductService, getTypeProductService } = require("../services/productService")


const createProduct = async (req, res) => {
    const {name, image, type, price, discount, countInStock, rating, description} = req.body
    const newProduct = await createProductService(name, image, type, price, discount, countInStock, rating, description)
    // console.log(newProduct)
    return res.status(200).json(newProduct)
}

const getProduct = async (req, res) => {
    const { limit, page, sort, filter }= req.query
    const listProduct = await getProductService( Number(limit), Number(page) || 0, sort, filter)
    return res.status(200).json(listProduct)
}

const getOneProduct = async (req, res) => {
    const productId = req.params.id
    const Product = await getOneProductService(productId)
    return res.status(200).json(Product)
}

const removeProduct = async (req, res) => {
    const productId = req.params.id
    await removeProductService(productId)
    const listProduct = await getProductService()
    return res.status(200).json(listProduct)
}

const updataProduct = async (req, res) => {
    const productId = req.params.id
    const data = req.body
    const updataProduct = await updataProductService(productId, data)
    return res.status(200).json(updataProduct)
}

const getTypeProduct = async (req, res) => {
    const listTypeProduct = await getTypeProductService()
    return res.status(200).json(listTypeProduct)
}

module.exports = {
    createProduct,
    getProduct,
    getOneProduct,
    removeProduct,
    updataProduct,
    getTypeProduct
}