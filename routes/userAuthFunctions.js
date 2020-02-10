const jwt = require("jsonwebtoken");
const doenv = require("dotenv").config();

const User = require("../models/UserModel");
const { redisClient } = require("../config/database");
const tokenExpiresIn = process.env.TOKEN_EXPIRES;

const secretKey = process.env.SECRET_KEY;

// USER signin

const userLogin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    // check if the details exists or not undefined
    if (username && password && email) {
      // check if the user exists by emil
      const userData = await User.findOne({ email });

      // check for password & username are matching
      if (username === userData.username && password === userData.password) {
        const token = jwt.sign({ userData }, secretKey, {
          algorithm: "HS256",
          expiresIn: tokenExpiresIn
        });

        // set data to redis
        // client.setex(username, 120, token);
        redisClient.hset(["LoginTokens", username, token], function(err, res) {
          if (err) {
            console.error(err);
          } else {
            console.log("Result is :", res);
          }
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

  try {
    const body = req.body;
    const email = req.email;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const userInfo = await User.findOne({ email });
    if (userInfo) {
      if (newPassword === confirmPassword) {
        const updatePwdOp = await User.findOneAndUpdate(
          { email },
          { $set: { password: newPassword } },
          { new: true }
        );
        console.log(updatePwdOp);
        res.send({
          status: "success",
          data: updatePwdOp
        });
      }
    } else {
      throw new Error("The user not found");
    }
  } catch (error) {
    res.json({
      status: "success",
      error
    });
  }
};

// user logout
const userLogout = async (req, res) => {
  try {
    console.log('username is ', req.username)
    let result = await redisClient.HDEL([
      "LoginTokens",
      req.body.username
    ]);   
    let isDeleted = await redisClient.HDEL([
      "LoginTokens",
      req.body.username
    ]); 
    console.log(result, "\n", isDeleted);

    if (result) {
      res.json({
        status: "success",
        isDeleted,
        result
      });
    }
  } catch (error) {}
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
  verifyToken,
  userLogout
};
