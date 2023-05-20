const express = require('express');
const homeController = require('../controller/home_controller');
const router = express.Router();

//home
router.get('/',homeController.home);

//admin
router.use('/admin',require('./admin'))

module.exports = router;