const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const { redisClient } = require("../config/database.js");

const validateToken = async (req, res, next) => {
  try {
    let token = req.body.query.split("token: ")[1];
    token = token.split(", ")[0];
    console.log("Your dear token is :", token);
    result = jwt.verify(token, secretKey);
    console.log("result is :", result);
    req.decoded = result;
    req.username = result.userData.username;
    // console.log(req.username)
    const isTokenExists = await redisClient.hget("LoginTokens", req.username);
    console.log(isTokenExists)
    console.log("Your redis token is : ",isTokenExists)
    if ((isTokenExists === token) || (req.body.query.includes('logIn'))) {
      req.username = result.userData.username;
      req.email = result.userData.email;
      req.isAuth = true;
      next();
    } else {
      throw new Error({ message: "User already logged out " });
      next();
    }
  } catch (error) {
    console.log(error)
    req.isAuth = false;
    return next();
  }
};

// delete the token

module.exports = {
  validateToken
};
