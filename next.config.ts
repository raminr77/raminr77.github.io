import type { Configuration, WebpackPluginInstance } from 'webpack';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const config: NextConfig = {
  // reactCompiler: true,
  // cacheComponents: true,

  trailingSlash: true,
  reactStrictMode: true,

  // Performance
  compress: true,
  generateEtags: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },

  experimental: {
    optimizePackageImports: [
      'require-in-the-middle',
      'import-in-the-middle',
      'date-fns',
      'clsx'
    ]
  },

  webpack(config: Configuration, { dev }) {
    config.module = config.module || { rules: [] };
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true
          }
        }
      ]
    });

    if (process.env.NEXT_PUBLIC_ANALYZE_MODE === 'true' && dev) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      const analyzer = new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        openAnalyzer: true
      }) as unknown as WebpackPluginInstance;

      config.plugins = config.plugins || [];
      config.plugins.push(analyzer);
    }

    return config;
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          }
        ]
      }
    ];
  },

  async redirects() {
    return [
      { permanent: true, source: '/skills', destination: '/journey' },
      { permanent: true, source: '/experiences', destination: '/journey' },
      { permanent: true, source: '/educations', destination: '/journey' },
      { permanent: true, source: '/resume.pdf', destination: '/' },
      {
        permanent: true,
        source: '/random-sex-position',
        destination: 'https://ramiiin.ir/random-sex-position/'
      },
      {
        permanent: true,
        source: '/csv-row-printer',
        destination: 'https://ramiiin.ir/csv-row-printer/'
      }
    ];
  },

  sassOptions: {
    silenceDeprecations: ['legacy-js-api']
  }
};

export default withSentryConfig(config, {
  org: 'ramin-zone',
  disableLogger: true,
  silent: !process.env.CI,
  project: 'personal-site',
  widenClientFileUpload: true,
  automaticVercelMonitors: true
});
