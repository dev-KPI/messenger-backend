'use strict'

const fsp = require('node:fs').promises
const path = require('node:path')
const config = require('./config.js')
const server = require(`./transport/${config.api.transport}.js`)
const staticServer = require('./static.js')
const db = require('./db.js')(config.db)
const hash = require('./hash.js')
const logger = require(`./logger/${config.logger.name}.js`)
const console = logger(config.logger)

const injection = {
  console: Object.freeze(console),
  db: Object.freeze(db),
  common: Object.freeze({ hash }),
}
const apiPath = path.join(process.cwd(), './api')
const routing = {}

;(async () => {
  const files = await fsp.readdir(apiPath)
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue
    const filePath = path.join(apiPath, fileName)
    const serviceName = path.basename(fileName, '.js')
    routing[serviceName] = require(filePath)(injection)
  }
  staticServer('./static', config.static.port, console)
  server(routing, config.api.port, console)
})()
