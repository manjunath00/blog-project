const User = require("../models/UserModel");

// create a user
const createAUser = async (req, res) => {
  try {
    const newUser = req.body;
    const results = await User.create(newUser);
    res.status(201).json({
      status: "success",
      data: {
        results
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        message: error.message,
        error
      }
    });
  }
};

// update the user

const updateAUser = async (req, res) => {
  try {
    const id = { _id: req.params.userId };
    const updatedUser = req.body;
    const user = await User.findByOneAndUpdate(
      id,
      { $set: updatedUser },
      { new: true }
    );
    console.log(user);
    res.status(200).json({
      status: "success",
      data: {
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        message: error.message,
        error
      }
    });
  }
};

// get all users

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({
      status: "success",
      results: allUsers.length,
      data: {
        allUsers
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",

      data: {
        message: error.message,
        error
      }
    });
  }
};

// get a single user by id

const getAUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Insert a valid id",
      data: {
        message: error.message,
        error
      }
    });
  }
};

// delete a user

const deleteAUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const result = await User.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      data: {
        result
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        error
      }
    });
  }
};

module.exports = {
  createAUser,
  updateAUser,
  getAllUsers,
  getAUser,
  deleteAUser
};
