const express = require('express');
const router = express.Router();

//admin
router.use('/admin',require('./admin'));

module.exports = router;