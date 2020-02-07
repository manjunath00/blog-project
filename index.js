const express = require("express");
const mongoose = require("mongoose");

const app = express();

const DB = "mongodb://localhost:27017/postDatabase";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(results => {
    console.log("connection was successfull");
    console.log("connection was successfull");
  })
  .catch(err => {
    console.log(err);
    console.log("connection failed");
  });

const PORT = process.env.PORT || 3200;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => console.log(`Up & running at http://localhost:${PORT}`));
