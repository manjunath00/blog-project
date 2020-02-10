const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY || "RmOeBolEiltZELionJuMEntErdanImEg";

// get all posts
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    console.log(allPosts);
    res.status(200).json({
      status: "success",
      results: allPosts.length,
      data: {
        allPosts
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      err
    });
  }
};

// get a post by id
const getAPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const singlPost = await Post.findById(postId);

    res.status(200).json({
      status: "success",
      data: {
        singlPost
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      err
    });
  }
};

// update a post
const updateAPost = async (req, res) => {
  try {
    const postId = { _id: req.params.id };
    const body = req.body;
    console.log(body["author"]);
    // if author is updated check if it is in users collection
    if (body["author"]) {
      const isUserExists = await User.findOne({ username: body["author"] });
      if (isUserExists) {
        const results = await Post.update(
          req.params.id,
          { $set: body },
          {
            returnNewDocument: true
          }
        );

        // console.log(results);
        res.status(200).json({
          status: "success",
          data: {
            results
          }
        });
      } else {
        // throws error if it is not in the users collection
        throw new Error("You need to add the user before adding the post");
      }
    } else {
      const results = await Post.update(
        req.params.id,
        { $set: body },
        {
          returnNewDocument: true
        }
      );
      res.status(200).json({
        status: "success",
        data: {
          results
        }
      });

      // console.log(results);
    }
  } catch (err) {
    // console.log(err);
    res.status(404).json({
      status: "fail",
      message: err.message,
      err
    });
  }
};

const deleteAPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const results = await Post.findByIdAndDelete(postId);

    res.status(200).json({
      status: "success",
      data: {
        results
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      err
    });
  }
};

// create a post & check if the author exists in users collection
const newPost = async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => { 
    if(err) {
      // console.log(err)
      res.sendStatus(403);
    } else {
      // console.log(req)
      try {
        const { body } = req;
        const { username } = authData.userData;
        body.author = username;
        const isUserExists = await User.findOne({ username });
        // console.log(authData, "\n", username, isUserExists);
        
        if (isUserExists) {
          const results = await Post.create(body);
          res.status(200).json({
            status: "success",
            data: {
              results
            }
          });
        } else {
          throw new Error("User doesn't exist. You need to create account");
        }
      } catch (error) {
          res.status(404).json({
            status: "fail",
            message: error.message,
            error
            });
        }
  }
})
}

module.exports = {
  getAllPosts,
  getAPost,
  updateAPost,
  deleteAPost,
  newPost
};
