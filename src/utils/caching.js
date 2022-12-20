const { default: Redis } = require('ioredis');
const _ = require('lodash');

const redis = new Redis();

const userCacheFields = ['_id', 'email', 'name', 'avatar', 'locked', 'role'];
const blogCacheFields = ['_id', 'title', 'author'];
const typeCache = {
  user: userCacheFields,
  blog: blogCacheFields,
};

async function callType(type, command, ...params) {
  const result = await redis.call(command, ...params.map(val => (
    _.isObject(val) && typeCache[type]
      ? JSON.stringify(_.pick(val, typeCache[type]))
      : val || ''
  )));
  return result;
}

async function call(command, ...params) {
  const result = await redis.call(command, ...params);
  return result;
}

module.exports = { callType, call };
