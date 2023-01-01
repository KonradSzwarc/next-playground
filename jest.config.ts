import nextJest from 'next/jest';

const createJestConfig = nextJest();

export default createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
});
