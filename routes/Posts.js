const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


const {
  getAllPosts,
  getAPost,
  updateAPost,
  deleteAPost,
  newPost
} = require("./PostFunctions");

const { verifyToken } = require("./userAuthFunctions")
router.get("/", getAllPosts)
router.post("/", verifyToken, newPost);
router.get("/:postId", getAPost);
router.put("/:postId", updateAPost);
router.delete("/:postId", deleteAPost);

module.exports = router;
