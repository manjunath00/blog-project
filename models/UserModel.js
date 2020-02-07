const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  Posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
