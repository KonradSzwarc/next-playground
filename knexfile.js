require('dotenv-expand').expand(require('dotenv').config());

require('ts-node').register({
  transpileOnly: true,
  compilerOptions: { module: 'CommonJS', target: 'ES6' },
});

module.exports = require('./src/server/db/config').default;
