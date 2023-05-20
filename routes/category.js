const express = require('express');
const categoryController = require('../controller/category_controller');
const passport = require('passport');
const router = express.Router(); 

router.get('/',passport.checkAuthenticationUser,categoryController.showCategoryList);

//create category page
router.get('/create',passport.checkAuthenticationUser,categoryController.createCategoryPage);

module.exports = router;