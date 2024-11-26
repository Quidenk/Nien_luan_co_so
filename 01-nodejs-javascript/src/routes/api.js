const express = require('express');
const { createUser, logIn, getUser, getAccount, updateUser, deleteUser, refreshToken } = require('../controllers/userController')
// const auth = require('../middleware/auth') 
const { auth, authMiddleWare } = require('../middleware/auth')

const routerAPI = express.Router();

// routerAPI.all("*", auth)

//USER
routerAPI.get('/', (req, res) => {
    return res.status(200).json('hello world!')
})
routerAPI.post('/register', createUser)
routerAPI.post('/sign-in', logIn)
routerAPI.get('/user', getUser)
routerAPI.get('/profile-user/:id', getAccount)
routerAPI.put('/update-user/:id', updateUser)
routerAPI.delete('/delete-user/:id', deleteUser)
routerAPI.post('/refresh-token', refreshToken)



//PRODUCT
const { createProduct, getProduct, updataProduct, removeProduct, getOneProduct, getTypeProduct, getSizeProduct } = require('../controllers/productController');
const { createOrder, getAllOrderDetails, getDetailsOrder, cancelOrderDetails, getAllOrder, confirmOrderDetails } = require('../controllers/orderController');

routerAPI.post('/create-product', createProduct)
routerAPI.get('/get-product', getProduct)
routerAPI.get('/get-one-product/:id', getOneProduct)
routerAPI.delete('/remove-product/:id', removeProduct)
routerAPI.put('/updata-product/:id', updataProduct)
routerAPI.get('/get-type', getTypeProduct)

//ORDER
routerAPI.post('/create-order/:id', createOrder)
routerAPI.get('/get-all-order/:id', getAllOrderDetails)
routerAPI.get('/get-details-order/:id', getDetailsOrder)
routerAPI.delete('/cancel-order/:id', cancelOrderDetails)
routerAPI.delete('/confirm-order/:id', confirmOrderDetails)
routerAPI.get('/get-all-order', getAllOrder)


module.exports = routerAPI; //export default