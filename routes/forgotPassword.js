const express = require('express');
const forgotpassController = require('../controller/forgotpass_controller');
const router = express.Router();

//forgot password page
router.get('/',forgotpassController.forgotPasswordPage);


module.exports = router;