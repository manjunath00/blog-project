const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const redis = require("redis");
const REDIS_PORT = process.env.REDIS_PORT || 6379;

// creates redis client
const client = redis.createClient(REDIS_PORT);
const secretKey = process.env.SECRET_KEY || "RmOeBolEiltZELionJuMEntErdanImEg";

console.log("secret key is", secretKey);

// TODO
// USER signin

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
        const token = jwt.sign({ userData }, secretKey, {
          algorithm: "HS256",
          expiresIn: "2m"
        });

        console.log("token", token);
        res.cookie("token", token, { maxAge: 1200 });
        res.status(200).json({
          status: "success",
          message: "Login successfull",
          token,
          data: userData
        });
        res.end();
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

const resetPassword = async (req, res) => {
  // console.log(req);

  // login & get token
  // update the password the only
  // 1. verify the token
  // 2. get both the password first password & confirm password
  // 3. update the password in the database
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const body = req.body;
        const { oldPassword, newPassword, confirmPassword } = body;
        res.json({
          status: "success",
          authData
        });
      } catch (error) {}
    }
  });
};

// user logout
const userLogout = async (req, res) => {
  
};

// user register
const userRegister = async (req, res) => {
  let errorsArr = ["errors"];
  try {
    const { body } = req;
    const { username, email, password, confirmPassword } = body;
    if (password !== confirmPassword) {
      errorsArr.push({ msg: "Passwords donot match" });
    }

    if (password.length < 8) {
      errorsArr.push({ msg: "Password must be greater than 8 characters" });
    }

    if (!username || !password || !confirmPassword || !email) {
      errorsArr.push({ msg: "Please enter all the details" });
    }

    if (errorsArr.length > 1) {
      throw { message: { errorsArr } };
    } else {
      // const { username, password, email } = body;
      const newUser = {
        username,
        email,
        password
      };
      const results = await User.create(newUser);
      res.status(201).json({
        status: "success"
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        message: error.message 
      }
    });
  }
};

function verifyToken(req, res, next) {
  // get authorization header value
  const bearerHeader = req.headers["authorization"];

  // check if the token is present
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    req.token = bearer[1];
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = {
  userLogin,
  resetPassword,
  userRegister,
  verifyToken
};
