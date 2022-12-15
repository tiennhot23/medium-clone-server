const typeDef = `
type MutationResponse implements IMutationResponse {
  code: String!
  message: String!
}
`;

class MutationResponse {
  constructor(message, code) {
    this.code = code || 200;
    this.message = message || 'Success';
  }
}

module.exports = { MutationResponse, typeDef };
