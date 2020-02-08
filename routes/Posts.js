const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getAPost,
  updateAPost,
  deleteAPost,
  newPost
} = require("./PostFunctions");

router.get("/", getAllPosts).post("/", newPost);
router.get("/:postId", getAPost);
router.put("/:postId", updateAPost);
router.delete("/:postId", deleteAPost);

module.exports = router;
