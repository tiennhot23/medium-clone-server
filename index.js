/* eslint-disable no-console */
const mongoose = require('mongoose');
const app = require('./src/app');
const config = require('./src/configs');

const server = app.listen(config.port, () => {
  logger.info(`Listening on port ${config.port}`);
});

const handleUnexpectedException = err => {
  console.log(err);
  logger.error(`UNEXPECT EXCEPTION::${err.message}`);
  process.exit(1);
};

// handle un-catched exceptions
process.on('uncaughtException', handleUnexpectedException);
process.on('unhandledRejection', handleUnexpectedException);

// handle on shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing http server.');
  server.close(() => {
    logger.info('Http server closed.');
    mongoose.connection.close(false, () => {
      logger.info('MongoDb connection closed.');
    });
  });
});
