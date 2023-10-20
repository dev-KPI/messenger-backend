const path = require('node:path');

const toRelative = (files) =>
  files.map((file) => path.relative(process.cwd(), file)).join(' ');

  
module.exports = toRelative;