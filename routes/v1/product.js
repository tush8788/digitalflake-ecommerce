const express = require('express');
const productController = require('../../controller/v1/product_controller');
const passport = require('passport');
const router = express.Router();

router.get('/',passport.authenticate(
    'jwt',
    {session:false}
),productController.viewProduct);

module.exports = router;