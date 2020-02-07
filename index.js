const express = require("express");
const mongoose = require("mongoose");
// custom imports
const app = express();
const DB = "mongodb://localhost:27017/postDatabase";

const Post = require("./models/Post");
const User = require("./models/User");

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(results => {
    // console.log(results);
    console.log("connected to database");
  })
  .catch(err => {
    // console.log(err);
    console.log("connection failed");
  });

const user = new User({
  _id: new mongoose.Types.ObjectId(),
  username: "John cena"
});

user.save(function(err) {
  if (err) {
    return err;
  }

  const post = new Post({
    title: "lorem ipsum",
    body:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula tellus eget diam porttitor lobortis. In sodales libero a est luctus consectetur. Duis lorem est, tempor at ligula sed, scelerisque faucibus eros. Integer convallis, felis sed pretium faucibus, dui felis malesuada quam, a dignissim.",
    author: user._id
  });
  
  post.save(function(err) {
    console.log('executing post function')
    if (err) {
      return err;
    }
  });
});

const PORT = process.env.PORT || 3200;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => console.log(`Up & running at http://localhost:${PORT}`));
