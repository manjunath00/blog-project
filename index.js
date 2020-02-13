const express = require("express");
const mongoose = require("mongoose");
const result = require("dotenv").config();
// graphql
const graphqlHTTP = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const { validateToken } = require("./auth/auth");

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

// validate token
app.use(validateToken);

// graphql route
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
  })
);

// posts routes
// app.use("/api/posts", require("./routes/Posts"));

// users routes
// app.use("/api/users", require("./routes/Users"));

// user authentication
// app.use("/api/account", require("./routes/UserAuth"));

// configure port number
const PORT = process.env.PORT || 3200;

app.get("/", (req, res) => {
  res.send("Blog");
});

app.listen(PORT, () => console.log(`Up & running at http://localhost:${PORT}`));
