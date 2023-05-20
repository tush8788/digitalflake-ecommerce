const express = require('express');
const adminController = require('../controller/admin_controller');
const router = express.Router();
// create 
router.post('/create',adminController.createAdmin);
// create-session
router.post('/create-session',adminController.createSession);

module.exports = router;