const { gql } = require('apollo-server-express');
const { MutationResponseTypeDef } = require('./types');

const typeDefs = gql`
  type User {
    _id: String
    name: String
    email: String
    avatar: String
    followers: [User!]
    followings: [User!]
    locked: Boolean
    role: String
  }

  type Post {
    _id: String
    title: String
    previewImage: String
    creator: User
    publishTime: Int
    visibility: String
    clapCount: Int
    depth: Int
    claps: [User!]
    responses: [Post!]
  }

  type Paragraph {
    _id: String!
    text: String
    type: String
    markups: [Markup!]
  }

  type Markup {
    start: Number
    end: Number
    href: String
    type: String
  }

  # ROOT TYPE
  type Query {
    user(userId: String!): User
    post(postId: String!): Post
    posts: [Post]
  }

  type Mutation {
    createUser(email: String!, name: String!, password: String!, repeatPassword: String!): MutationResponse
    login(email: String!, password: String!): MutationResponse
    logout: MutationResponse
    createPost(paragraphs: [ParagraphInput!]!): Post,
    clapPost(postId: String!, clapCount: Int!): Post,
  }

  input ParagraphInput {
    text: String!
    type: String = 'p'
    markups: [MarkupInput!] = []
  }

  input MarkupInput {
    start: Number!
    end: Number!
    href: String = ''
    type: String!
  }

  interface IMutationResponse {
    code: String!
    message: String!
  }

  ${MutationResponseTypeDef}
`;

module.exports = typeDefs;
