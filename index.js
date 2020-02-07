const express = require("express");
const mongoose = require("mongoose");
// custom imports
const { DB, options } = require("./config/database");
const app = express();

mongoose.connect(DB, options).then(results => {
  // console.log(results);
  console.log("connected to database");
});

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// posts routes
app.use("/api/posts", require("./routes/Posts"));

// users routes
app.use("/api/users", require("./routes/Users"));

const PORT = process.env.PORT || 3200;

app.get("/", (req, res) => {
  res.send("Blog");
});

app.listen(PORT, () => console.log(`Up & running at http://localhost:${PORT}`));
