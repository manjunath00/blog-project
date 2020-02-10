const express = require("express");
const router = express.Router();

// custom imports
const { userLogin, resetPassword} = require('./userAuthFunctions');
router.post('/login', userLogin);
router.post('/password', resetPassword)

module.exports = router;