const express = require('express');
const passport = require('passport');
const productController = require('../controller/product_controller');
const router = express.Router();

router.get('/',passport.checkAuthenticationUser,productController.showProduct);

module.exports = router;