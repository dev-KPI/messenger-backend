'use strict';

const fsp = require('node:fs/promises');
const path = require('node:path');
const config = require('../config/index.js');
const crud = require('./db/crud.js');
const deepFreeze = require('./utils/freeze.js');
const staticServer = require('./static/server.js');
const server = require(
  `./framework/${config.api.framework}/${config.api.transport}.js`
);
const load = require('./utils/load.js')(config.sandbox);
const logger = require(`./logger/${config.logger.name}.js`);
const startDb = require('./db/start.js');

const start = async () => {
  const console = logger(config.logger);
  console.info(`📝 Logger ${config.logger.name} started`);
  const db = await startDb(config.db);
  console.info('✅ Connected to database');
  //? Db can not be frozen because of Prisma
  const sandbox = { console: deepFreeze(console), db, crud: deepFreeze(crud) };
  const apiPath = path.join(process.cwd(), config.api.path);
  const routing = {};
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.js');
    routing[serviceName] = await load(filePath, sandbox);
  }
  staticServer('./static', config.static.port, console);
  console.info(`📦 Static server on ${config.static.port}`);
  server(routing, config.api.port, console);
  console.info(`🚀 API server no ${config.api.port}`);
};

start();
