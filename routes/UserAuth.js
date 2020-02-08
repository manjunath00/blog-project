const express = require("express");
const router = express.Router();

// custom imports
const { userLogin} = require('./userAuthFunctions');
router.post('/login', userLogin);

module.exports = router;