const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

// get all posts
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    console.log(allPosts);
    res.status(200).json({
      status: "success",
      results: allPosts.length,
      data: {
        allPosts
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      err
    });
  }
};

// get a post by id
const getAPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const singlPost = await Post.findById(postId);

    res.status(200).json({
      status: "success",
      data: {
        singlPost
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      err
    });
  }
};

// update a post
const updateAPost = async (req, res) => {
  try {
    const postId = { _id: req.params.id };
    const body = req.body;

    const thePost = await Post.findById(req.params.postId);
    // console.log(thePost);

    if (thePost.username === req.username) {
      const updatedPost = await Post.updateOne(
        postId,
        { $set: { body } },
        {
          upsert: true
        }
      );

      // console.log(updatedPost);

      res.json({
        status: "success",
        data: {
          updatedPost
        }
      });
    } else {
      throw new Error("You cannot access this page");
    }
  } catch (err) {
    // console.log(err);
    res.status(404).json({
      status: "fail",
      message: err.message,
      err
    });
  }
};

const deleteAPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const results = await Post.findByIdAndDelete(postId);

    console.log(results);
    if (results.username === req.username || results.author === req.username) {
      res.status(200).json({
        status: "success",
        data: {
          results
        }
      });
    } else {
      throw new Error("You do not have access to this page");
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      err
    });
  }
};

// create a post & check if the author exists in users collection
const newPost = async (req, res, next) => {
  try {
    const post = {};

    post.username = req.username;
    post.title = req.body.title;
    post.body = req.body.body;

    const user = post.username;

    const isUserExists = await User.findOne({ username: user });

    if (isUserExists) {
      const results = await Post.create(post);
      res.status(200).json({
        status: "success",
        data: {
          results
        }
      });
      next();
    } else {
      throw new Error("User doesn't exist. You need to create account");
    }
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
      error
    });
  }
};

module.exports = {
  getAllPosts,
  getAPost,
  updateAPost,
  deleteAPost,
  newPost
};
