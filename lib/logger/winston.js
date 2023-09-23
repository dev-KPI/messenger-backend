const winston = require('winston');

module.exports = (config) => {
  const transports = [];
  if (config.console) {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      })
    );
  }
  if (config.fsPath) {
    transports.push(
      new winston.transports.File({
        filename: `${config.fsPath}/${config.name}/combined.log`,
      })
    );
  }
  const logger = winston.createLogger({
    format: winston.format.json(),
    level: 'verbose',
    transports,
  });

  return {
    log(...args) {
      logger.verbose(...args);
    },
    info(...args) {
      logger.info(...args);
    },
    warn(...args) {
      logger.warn(...args);
    },
    error(...args) {
      logger.error(...args);
    },
  };
};
