const cookieParser = require('./cookieParser');
const postTrimer = require('./postTrimer');
const exceptionHandler = require('./exceptionHandler');

module.exports = {
  ...exceptionHandler,
  cookieParser,
  postTrimer,
};
