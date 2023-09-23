module.exports = {
  db: {
    url: 'postgresql://marcus:marcus@localhost:5432/example',
  },
  api: {
    path: './api',
    port: 8001,
    transport: 'ws',
  },
  static: {
    port: 8000,
  },
  load: {
    timeout: 5000,
    displayErrors: false,
  },
  logger: { name: 'winston', fsPath: './logs', console: true },
  sandbox: {
    timeout: 5000,
    displayErrors: false,
  },
};
