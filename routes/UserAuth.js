const express = require("express");
const router = express.Router();

// custom imports
const {
  userLogin,
  resetPassword,
  userRegister
} = require("./userAuthFunctions");
router.post("/login", userLogin);
router.post("/register", userRegister);
router.post("/password", resetPassword);

module.exports = router;
