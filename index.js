const express = require("express");
const mongoose = require("mongoose");
// custom imports
const { DB, options } = require("./config/database.js");

const app = express();

mongoose.connect(DB, options).then(results => {
  console.log("connected to database");
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
