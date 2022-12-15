const _ = require('lodash');

function postTrimmer(req, res, next) {
  if (req.method === 'POST') {
    req.body = _.reduce(req.body, (result, value, key) => {
      if (_.isString(value)) result[key] = value.trim();
      return result;
    }, {});
  }
  next();
}
module.exports = postTrimmer;
