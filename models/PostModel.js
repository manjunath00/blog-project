const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true
      // unique: true
    },
    body: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timeStamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

// relationships
// a post can have many comments
// a post can have only one author
