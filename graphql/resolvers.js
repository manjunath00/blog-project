const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const expiresIn = process.env.EXPIRES_IN;

module.exports = {
  createUser: async function({ userInput }, req) {
    try {
      const isExistingUser = await User.findOne({ email: userInput.email });
      if (isExistingUser) {
        throw new Error("User already exists");
      }

      const user = new User({
        username: userInput.username,
        email: userInput.email,
        password: userInput.password
      });

      const createdUser = await user.save();
      return {
        ...createdUser._doc,
        _id: createdUser._id.toString()
      };
    } catch (error) {
      return error;
    }
  },

  logIn: async function({ userInput }, req) {
    try {
      const user = await User.findOne({ email: userInput.email });
      console.log(user);

      const { email, username } = user;

      if (user.password === userInput.password) {
        const token = jwt.sign({ email, username }, secretKey, { expiresIn });

        console.log(token);
        return {
          _id: user._id.toString(),
          token,
          username,
          email
        };
      }
    } catch (error) {
      return error;
    }
  }
};
