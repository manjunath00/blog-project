const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.objectId,
    ref: "User",
    // type: String, 
  },
  date: {
    type: Date,
    default: Date.now
    // required: true
  }
  // views: {
  //   type: Number
  // },
  // comments: [
  //   {
  //     body: {
  //       type: String,
  //       required: true
  //     },
  //     date: {
  //       type: Date,
  //       default: Date.now()
  //     },
  //     user: {
  //       type: Schema.Types.objectId,
  //       ref: "User"
  //       // type: String,
  //       // required: true
  //     }
  //   }
  // ]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

// relationships
// a post can have many comments
// a post can have only one author
