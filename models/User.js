const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  Posts: {
    type: Schema.Types.objectId,
    ref: "Post"
  }
});

const User = mongoose.model("User", UserSchema);
