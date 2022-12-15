const userController = require('./user');
const blogController = require('./blog');

module.exports = {
  ...userController,
  ...blogController,
};
