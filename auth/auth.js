const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY
const { redisClient } = require("../config/database.js");

const validateToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let result;

  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];

    try {
      result = jwt.verify(token, secretKey); 
      // console.log(result);
      req.decoded = result;
      req.username = result.userData.username;
      // console.log(req.username)
      const isLoggedOut = await redisClient.hget("LoginTokens", req.username);
      // console.log(isLoggedOut)

      if (isLoggedOut) {
        req.username = result.userData.username;
        req.email = result.userData.email;
        next();
      } else {
        throw new Error({ message: "User already logged out " });
      }
    } catch (error) {
      res.json({
        status: "fail",
        message: error.message,
        error
      });
    }
  } else {
    // no token
    result = {
      error: "Authentication error. Token required",
      status: 401
    };

    res.status(401).send(result);
  }
};

// delete the token

module.exports = {
  validateToken
};
