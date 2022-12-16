const { gql } = require('apollo-server-express');
const { typeDef: MutationResponseTypeDef } = require('./types/MutationResponse');

const typeDefs = gql`
  type User {
    _id: String!
    name: String
    email: String
    avatar: String
    followers: [User!]
    followings: [User!]
    locked: Boolean
    role: String
  }

  type Blog {
    _id: String!
    title: String
    author: User
    rawText: String
    clapCount: Int
    claps: [User!]
    comments: [Comment!]
  }

  type Comment {
    _id: String!
    owner: String,
    content: String
    clapCount: Int
    replies: [Comment!]
  }

  # ROOT TYPE
  type Query {
    user(email: String!): User
    blog(blogId: String!): Blog
  }

  type Mutation {
    createUser(email: String!, name: String!, password: String!, repeatPassword: String!): MutationResponse
    login(email: String!, password: String!): MutationResponse
    createBlog(title: String!, rawText: String!): MutationResponse,
    clapBlog(blogId: String!, clapCount: Int!): Blog
  }

  interface IMutationResponse {
    code: String!
    message: String!
  }

  ${MutationResponseTypeDef}
`;

module.exports = typeDefs;
