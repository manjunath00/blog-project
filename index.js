const express = require("express");

const app = express();

const PORT = process.env.PORT || 3200;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => console.log(`Up & running at http://localhost:${PORT}`));
