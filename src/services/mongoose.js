const mongoose = require('mongoose');

const config = require('../configs');

module.exports = () => {
  mongoose.set('strictQuery', false);
  mongoose.set('debug', (collection, method, query, doc) => {
    logger.info(`MONGODB::${collection}.${method} - query:${JSON.stringify(query)} - doc:${JSON.stringify(doc)}`);
  });
  mongoose.connect(config.mongodb.connectionString, config.mongodb.mongoDbOptions)
    .then(() => { logger.info('MongoDb connected.'); })
    .catch(error => { logger.error('MongoDb connection failed.', error); });
};
