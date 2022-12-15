const Logger = require('./utils/Logger');
const AppError = require('./utils/AppError');

global.logger = new Logger();
global.AppError = AppError;
