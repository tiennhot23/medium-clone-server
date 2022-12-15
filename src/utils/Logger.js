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

  log(level, message, ...args) {
    const extras = args.map(v => JSON.stringify(v));
    logger.log(
      level,
      (new Date()).toISOString(),
      args.length === 0
        ? `${Colors[level]}${message}\x1b[0m`
        : `${Colors[level]}${message} - meta: ${JSON.stringify(extras)}\x1b[0m`,
      // extras,
    );
  }

  info(message, ...args) {
    this.log('info', message, ...args);
  }

  debug(message, ...args) {
    this.log('debug', message, ...args);
  }

  warn(message, ...args) {
    this.log('warn', message, ...args);
  }

  error(message, ...args) {
    this.log('error', message, ...args);
  }
}

module.exports = Logger;
