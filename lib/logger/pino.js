const pino = require('pino');

module.exports = (config) => {
  const targets = [];
  if (config.console) {
    targets.push({
      level: 'trace',
      target: 'pino-pretty',
    });
  }
  if (config.fsPath) {
    targets.push({
      level: 'trace',
      target: 'pino/file',
      options: {
        destination: `${config.fsPath}/${config.name}/combined.log`,
      },
    });
  }
  const transport = pino.transport({
    targets,
  });
  const logger = pino(transport);

  return {
    log(...args) {
      // TODO: issue https://github.com/pinojs/pino-pretty/issues/455
      logger.info(...args);
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
