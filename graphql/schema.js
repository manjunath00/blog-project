const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Post {
      _id : ID!
      title : String!
      body: String!
      date: String!
    }

    type User {
      _id : ID!
      username : String!
      email : String!
      createdAt : String!
    }

    type RootQuery {
      post(id : ID!) : Post!
    }
  `);
