/* eslint-disable no-await-in-loop */
const { redis } = require('ioredis');

async function keyScan(pattern, count = 20) {
  const result = [];
  let cursor = 0;
  do {
    // return [string cursor, string[] elements]
    // read redis.md: Data structures notes to understand more about scan
    const [curs, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', count);
    cursor = curs;
    result.push(...keys);
  } while (cursor !== '0');
  return result;
}

module.exports = { keyScan };
