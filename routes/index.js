const express = require('express');
const homeController = require('../controller/home_controller');
const router = express.Router();

//home
router.get('/',homeController.home);

//signin page
router.get('/signin',homeController.signIn);

//signin page
router.get('/signup',homeController.signUp);

//admin
router.use('/admin',require('./admin'))

module.exports = router;