const express = require('express');
const homeController = require('../controller/home_controller');
const passport = require('passport');
const router = express.Router();

//home
router.get('/',passport.checkAuthenticationUser,homeController.home);

//signin page
router.get('/signin',homeController.signIn);

//signin page
router.get('/signup',homeController.signUp);

//signout
router.get('/signout',homeController.signOut);

//admin
router.use('/admin',require('./admin'))

module.exports = router;