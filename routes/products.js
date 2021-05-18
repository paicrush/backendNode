const express = require('express');

const { check } = require('express-validator')
const router = express.Router();

const productsController = require('../controllers/products');
const ordersController = require('../controllers/orders');
// /admin/add-product => GET
router.get('/product/:productName', productsController.getSearchOneProduct);
router.get('/product', productsController.getSearchProduct);
router.post('/product', productsController.postAddProduct);

router.put('/product/:id', productsController.postUpdateProduct);

router.delete('/product/:id', productsController.getDeleteProduct);

router.get('/update/:product_id', productsController.getUpdateProduct);

router.get('/orders', ordersController.getSearchProduct);
router.delete('/orders/:id', ordersController.getDeleteProduct);
router.post('/orders', ordersController.postAddProduct);
exports.routes = router;