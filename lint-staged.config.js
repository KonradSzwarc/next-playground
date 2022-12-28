module.exports = {
  '*': 'prettier --write --ignore-unknown',
  '*.{ts,tsx,js}': 'eslint --fix',
  '*.{ts,tsx}': () => 'tsc --noEmit',
};
