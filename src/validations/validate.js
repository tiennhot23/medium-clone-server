const _ = require('lodash');

function validate(...validations) {
  const results = _.filter(validations, result => result.error);
  return results.length === 0 ? {} : results[0];
}

module.exports = validate;
