const express = require("express");
const router = express.Router();

//
const {
  createAUser,
  updateAUser,
  getAllUsers,
  getAUser,
  deleteAUser
} = require("./UserFuntions");

const { validateToken } = require("../auth/auth");

router.post("/", createAUser);
router.get("/", getAllUsers);
router.get("/:userId", getAUser);
router.put("/:userId", validateToken, updateAUser);
router.delete("/:userId", validateToken, deleteAUser);

module.exports = router;
