/* eslint-disable class-methods-use-this */
const fs = require('fs');
const logger = require('npmlog');

const logDir = 'logs';

const Colors = {
  info: '\x1b[36m',
  error: '\x1b[31m',
  warn: '\x1b[33m',
  verbose: '\x1b[43m',
  debug: '\x1b[43m',
};

class Logger {
  constructor() {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
  }

  log(level, message, error) {
    logger.log(
      level,
      (new Date()).toISOString(),
      `${Colors[level]}${message}\x1b[0m`,
      error ? `${Colors[level]} - meta: ${error}\x1b[0m` : '',
    );
  }

  info(message, error) {
    this.log('info', message, error);
  }

  debug(message, error) {
    this.log('debug', message, error);
  }

  warn(message, error) {
    this.log('warn', message, error);
  }

  error(message, error) {
    this.log('error', message, error);
  }
}

module.exports = Logger;
