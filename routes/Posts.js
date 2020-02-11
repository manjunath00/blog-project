const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getAPost,
  updateAPost,
  deleteAPost,
  newPost
} = require("./PostFunctions");

const { validateToken } = require("../auth/auth");
// router.use(validateToken)

router.get("/", getAllPosts);
router.post("/", validateToken, newPost);
router.get("/:postId", getAPost);
router.put("/:postId", validateToken, updateAPost);
router.delete("/:postId", validateToken, deleteAPost);

module.exports = router;
