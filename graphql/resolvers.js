const User = require("../models/UserModel");
const Post = require("../models/PostModel");

module.exports = {
  post: async function({ id }, req) {
    try {
      const post = await Post.findById(id);
      if (!post) {
        throw new Error("No post found");
      }
      return post
    }catch(error) {
        return error
    }
  }
};
