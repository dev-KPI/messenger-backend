const path = require('node:path');

const relative = (files) =>
  files.map((file) => path.relative(process.cwd(), file)).join(' ');

module.exports = {
  '*': 'prettier --check --ignore-unknown',
  '*.js': 'eslint --cache',
  '*.{js,ts}': () => 'npm run typescript:check',
  '*': (files) =>
    `cspell --show-suggestions --quiet --gitignore ${relative(files)}`,
};
