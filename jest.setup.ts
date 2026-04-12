import '@testing-library/jest-dom';

// Define browser APIs not implemented in jsdom

Object.defineProperty(global.navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
    readText: jest.fn().mockResolvedValue('')
  },
  configurable: true,
  writable: true
});
