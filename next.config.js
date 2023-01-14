require('ts-node').register({
  transpileOnly: true,
  compilerOptions: { module: 'CommonJS', target: 'ES2021' },
});

module.exports = require('./next.config.ts').default;
