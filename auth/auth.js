const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY || "RmOeBolEiltZELionJuMEntErdanImEg";

const validateToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let result;

  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];

    try {
      result = jwt.verify(token, secretKey);

      // send it to req
      console.log(result);
      req.decoded = result;
      req.username = result.userData.username;
      console.log(req);
      next();
    } catch (error) {
      throw new Error(error);
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

module.exports = {
  validateToken
};
