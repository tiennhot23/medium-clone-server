const errorStatus = {
  400: 'Bad Request',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};

class AppError extends Error {
  constructor(code, message, localMessage, error) {
    super(message);
    this.code = error || errorStatus[code] || 'Unhandle Error';
    this.satus = code;
    this.localMessage = localMessage;
  }
}

module.exports = AppError;
