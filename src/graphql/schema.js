const { gql } = require('apollo-server-express');
const { typeDef: MutationResponseTypeDef } = require('./types/MutationResponse');

const typeDefs = gql`
  type User {
    name: String
    email: String
    locked: Boolean
    role: String
  }

  # ROOT TYPE
  type Query {
    user(email: String!): User,
  }

  type Mutation {
    createUser(email: String!, name: String!, password: String!, repeatPassword: String!): MutationResponse
    login(email: String!, password: String!): MutationResponse
  }

  interface IMutationResponse {
    code: String!
    message: String!
  }

  ${MutationResponseTypeDef}
`;

module.exports = typeDefs;
