const { buildSchema } = require("graphql");

module.exports = buildSchema(`  
  type Post {
    _id : ID
    title : String!
    body : String!
    createdAt : String!
    updatedAt : String!
    username : User!
  }

  type User {
    _id : ID!
    username : String!
    email : String!
    password : String
  }

  type AuthData {
    _id : ID!
    token: String! 
    username: String!
    email: String!
  }

  input LogInData {
    username : String!
    email : String!
    password : String!
  }
   
  input userInputData {
    email : String!
    username : String!
    password : String!
  }

  input postInputData {
    token: String!
    title: String!
    body: String!
    username: String!
  }

  type RootMutation {
    createUser(userInput: userInputData) : User!
    createAPost(userInput: postInputData) : Post!
  }

  type RootQuery {
    logIn(userInput: LogInData) : AuthData!
    getAllPosts: [Post!]!
    getAPost(id : String!) : Post!
  }

  schema {
    mutation : RootMutation
    query : RootQuery
  }
`);
