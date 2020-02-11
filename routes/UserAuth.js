const express = require("express");
const router = express.Router();

// custom imports
const {
  userLogin,
  resetPassword,
  userLogout,
  userRegister
} = require("./userAuthFunctions");

const { validateToken } = require("../auth/auth");

router.post("/login", userLogin);
router.post("/register", userRegister);
router.post("/logout", validateToken, userLogout);
router.post("/password", validateToken, resetPassword);

module.exports = router;
