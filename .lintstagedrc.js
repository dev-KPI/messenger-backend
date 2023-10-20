const toRelative = require('./src/utils/relativePath.js');

module.exports = {
  '*': 'prettier --check --ignore-unknown',
  '*.js': 'eslint --cache',
  '*.{js,ts}': () => 'npm run typescript:check',
  '*': (files) =>
    `cspell --show-suggestions --quiet --gitignore ${toRelative(files)}`,
};