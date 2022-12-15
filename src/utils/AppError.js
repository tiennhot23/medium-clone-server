const { GraphQLError } = require('graphql');

const errorStatus = {
  400: 'Bad Request',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};

// class AppError extends Error {
//   constructor(code, message, localMessage, error) {
//     super(message);
//     this.code = error || errorStatus[code] || 'Unhandle Error';
//     this.satus = code;
//     this.localMessage = localMessage;
//   }
// }

class AppError extends GraphQLError {
  constructor(code, message, localMessage, error) {
    super(message, {
      extensions: {
        code: error || errorStatus[code] || 'Unhandle Error',
        status: code,
        localMessage,
      },
    });
  }
}

module.exports = AppError;
