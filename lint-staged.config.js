module.exports = {
  '*': 'prettier --write --ignore-unknown',
  '*.{ts,tsx,js}': 'eslint --fix',
  '*.{ts,tsx,json}': 'jest --findRelatedTests',
  '*.{ts,tsx}': () => 'tsc --noEmit',
};
