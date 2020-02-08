const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const app = express();

// TODO
// USER signin

// user sign in

// all fields are required

// password should match

const userLogin = async (req, res) => {
  try {
    const body = req.body;
    const { username, password, email } = body;
    // check if the details exists or not undefined
    if (username && password && email) {
      // check if the user exists by emil
      const userData = await User.findOne({ email });

      // check for password & username are matching
      if (username === userData.username && password === userData.password) {
        jwt.sign({ userData }, "secretKey", (err, token) => {
          res.status(200).json({
            status: "success",
            message: "Login successfull",
            token,
            data: userData
          });
        });
      } else {
        throw new Error("Either username or password was incorrect");
      }
    } else {
      throw new Error("Please enter correct details");
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
      error
    });
  }
};

module.exports = {
  userLogin
};
