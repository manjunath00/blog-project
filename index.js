const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()
// custom imports
const { DB, options, redisClient } = require("./config/database.js");

const app = express();
mongoose.connect(DB, options).then(results => {
  console.log("connected to database");
});

redisClient.on("error", function(error) {
  if (error) {
    console.error(error);
  } else {
    console.log("Redis connected");
  }
});

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// posts routes
app.use("/api/posts", require("./routes/Posts"));

// users routes
app.use("/api/users", require("./routes/Users"));

// user authentication
app.use("/api/account", require("./routes/UserAuth"));

const PORT = process.env.PORT || 3200;

app.get("/", (req, res) => {
  res.send("Blog");
});

app.listen(PORT, () => console.log(`Up & running at http://localhost:${PORT}`));
