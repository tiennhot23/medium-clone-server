const queries = require('./blogQuery');
const commands = require('./blogCommand');

module.exports = {
  ...queries,
  ...commands,
};
