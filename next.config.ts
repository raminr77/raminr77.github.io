import { withSentryConfig } from '@sentry/nextjs';
import type { Configuration } from 'webpack';
import type { NextConfig } from 'next';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const config: NextConfig = {
  reactStrictMode: true,

  // Performance
  compress: true,
  generateEtags: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    // SVGs in this project are imported as React components via @svgr/webpack;
    // no SVGs flow through next/image, so the SVG bypass is locked off.
    dangerouslyAllowSVG: false
  },

  experimental: {
    optimizePackageImports: [
      'require-in-the-middle',
      'import-in-the-middle',
      'date-fns',
      'clsx',
      'motion',
      'react-toastify',
      'react-hook-form',
      '@next/third-parties'
    ]
  },

  turbopack: {
    root: __dirname
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
            icon: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false
                    }
                  }
                }
              ]
            }
          }
        }
      ]
    });

    return config;
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
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

export default withSentryConfig(withBundleAnalyzer(config), {
  org: 'ramin-zone',
  silent: !process.env.CI,
  project: 'personal-site',
  widenClientFileUpload: true,
  webpack: {
    automaticVercelMonitors: true,
    treeshake: { removeDebugLogging: true }
  }
});
