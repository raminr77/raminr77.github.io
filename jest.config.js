const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  maxWorkers: '50%',
  cacheDirectory: '<rootDir>/.jest-cache',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
};

module.exports = createJestConfig(customJestConfig);
