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

router.post("/", createAUser);
router.get("/", getAllUsers);
router.get("/:userId", getAUser);
router.put("/:userId", updateAUser);
router.delete("/:userId", deleteAUser);

module.exports = router;
