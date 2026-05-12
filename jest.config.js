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
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/index.ts',
    '!src/app/**/{layout,page,not-found,error,global-error,manifest,sitemap,robots,opengraph-image,instrumentation-client,fonts}.{ts,tsx}',
    '!src/app/**/route.ts',
    '!src/data/**',
    '!src/shared/components/**/index.ts'
  ],
  coverageReporters: ['text', 'text-summary', 'json-summary', 'lcov', 'html'],
  // Baseline thresholds set to the current numbers minus a small buffer. They act as a
  // ratchet — coverage may grow but not regress. Bump them up when new tests are added.
  coverageThreshold: {
    global: {
      statements: 27,
      functions: 20,
      branches: 30,
      lines: 27
    }
  }
};

module.exports = createJestConfig(customJestConfig);
