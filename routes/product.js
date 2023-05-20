const express = require('express');
const passport = require('passport');
const productController = require('../controller/product_controller');
const router = express.Router();

//show all products
router.get('/',passport.checkAuthenticationUser,productController.showProduct);

//create product page
router.get('/create',passport.checkAuthenticationUser,productController.createProductPage);

router.post('/create',passport.checkAuthenticationUser,productController.createProduct);

module.exports = router;