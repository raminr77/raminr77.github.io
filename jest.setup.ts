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

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      media: query,
      onchange: null,
      matches: false,
      addListener: jest.fn(),
      dispatchEvent: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }))
  });
}
