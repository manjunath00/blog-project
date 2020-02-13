const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const jwt = require("jsonwebtoken");
const { redisClient } = require("../config/database.js");

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

  getAllPosts: async function(args, req) {
    try {
      const allPosts = await Post.find();
      const noOfPosts = await Post.find().countDocuments();
      console.log(allPosts);
      return { allPosts };
    } catch (error) {
      return error;
    }
  },

  getAPost: async function({ id }, req) {
    try {
      const thePost = await Post.findOne({ _id: id });
      return {
        ...thePost._doc,
        _id: thePost._id.toString()
      };
    } catch (error) {
      return error;
    }
  },

  createAPost: async function({ userInput }, req) {
    // console.log("request.headers from graphql : ", req.headers);
    console.log("request.body from graphql : ", req.body, req.isAuth);
    // console.log(req.isAuth);
    // req.isAuth = true;
    if (req.isAuth) {
      try {
        const newPost = new Post({
          title: userInput.title,
          body: userInput.body,
          username: userInput.username
        });

        const createdPost = await newPost.save();

        return {
          ...createdPost._doc,
          _id: createdPost._id.toString(),
          createdAt: createdPost.createdAt.toISOString(),
          updatedAt: createdPost.updatedAt.toISOString()
        };
      } catch (error) {
        return error;
      }
    } else {
      const error = new Error("You need to login to post");
      return error;
    }
  },

  logIn: async function({ userInput }, req) {
    try {
      const user = await User.findOne({ email: userInput.email });
      console.log(user);

      const { email, username } = user;

      if (user.password === userInput.password) {
        const token = jwt.sign({ email, username }, secretKey);

        const isTokenSet = await redisClient.hset(["LoginTokens", username, token])
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
