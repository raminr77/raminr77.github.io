/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    '@fullhuman/postcss-purgecss': {
      content: ['./src/**/*.{js,jsx,ts,tsx}'],
      safelist: ['body', 'html', /^animate__/]
    }
  }
};

export default config;
