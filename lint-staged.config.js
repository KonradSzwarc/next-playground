module.exports = {
  '*': 'prettier --write --ignore-unknown',
  '*.{ts,tsx,js}': 'eslint --fix',
  '*.{ts,tsx,json}': 'jest --findRelatedTests --passWithNoTests',
  '*.{ts,tsx}': () => 'tsc --noEmit',
};
