const typeDef = `
type LoginMutationResponse implements IMutationResponse {
  code: String!
  message: String!
  refreshToken: String!
  refreshTokenTTL: Int!
}
`;

class LoginMutationResponse {
  constructor(message, refreshToken, refreshTokenTTL, code) {
    this.code = code || 200;
    this.message = message || 'Success';
    this.refreshToken = refreshToken || '';
    this.refreshTokenTTL = refreshTokenTTL || 0;
  }
}

module.exports = { LoginMutationResponse, typeDef };
