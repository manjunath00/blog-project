const Post = require("../models/PostModel");

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();

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
      message: err
    });
  }
};

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
      message: err
    });
  }
};

const updateAPost = async (req, res) => {
  try {
    const { postId, body } = req.body;
    const results = await Post.findByIdAndUpdate(postId, body);

    res.status(200).json({
      status: "success",
      data: {
        results
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

const deleteAPost = async (req, res) => {
  try {
    const postId = request.params.postId;
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
      message: err
    });
  }
};

const newPost = async (req, res) => {
  try {
    const { body } = req;
    const results = await Post.create(body);
    res.status(200).json({
      status: "success",
      data: {
        results
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
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
