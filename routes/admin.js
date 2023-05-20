const express = require('express');
const adminController = require('../controller/admin_controller');
const authController = require('../controller/auth_controller');
const passport = require('passport');
const router = express.Router();

// create 
router.post('/create',adminController.createAdmin);

// create-session
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/signin'}),authController.createSession);

//forgot 
module.exports = router;