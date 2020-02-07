const Post = require("../models/PostModel");
const User = require("../models/UserModel");

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
    const results = await Post.findByIdAndUpdate(req.params.id, {$set: body }, {
      returnNewDocument: true
    });

    console.log(results);
    res.status(200).json({
      status: "success",
      data: {
        results
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

const deleteAPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const results = await Post.findByIdAndDelete(postId);

    res.status(200).json({
      status: "success",
      data: {
        results
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

// create a post & check if the author exists in users collection
const newPost = async (req, res) => {
  try {
    const { body } = req;
    const { author } = body;
    const isUserExists = await User.findOne({ username: author });

    if (isUserExists) {
      const results = await Post.create(body);
      res.status(200).json({
        status: "success",
        data: {
          results
        }
      });
    } else {
      throw new Error("User doesn't exist. You need to create account");
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
  getAllPosts,
  getAPost,
  updateAPost,
  deleteAPost,
  newPost
};
