import { withSentryConfig } from '@sentry/nextjs';
import type { Configuration } from 'webpack';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  reactStrictMode: true,

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['react-icons', 'date-fns', 'clsx'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    }
  },

  // Bundle analyzer in development
  ...(process.env.ANALYZE === 'true' && {
    webpack: async (config: Configuration) => {
      if (process.env.NODE_ENV === 'development') {
        const { BundleAnalyzerPlugin } = await import('webpack-bundle-analyzer');
        config.plugins?.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            openAnalyzer: true
          })
        );
      }
      return config;
    }
  }),
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
      {
        permanent: true,
        source: '/skills',
        destination: '/journey'
      },
      {
        permanent: true,
        source: '/experiences',
        destination: '/journey'
      },
      {
        permanent: true,
        source: '/educations',
        destination: '/journey'
      },
      {
        permanent: true,
        destination: '/',
        source: '/resume.pdf'
      },
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

export default withSentryConfig(nextConfig, {
  org: 'ramin-zone',
  disableLogger: true,
  silent: !process.env.CI,
  project: 'personal-site',
  widenClientFileUpload: true,
  automaticVercelMonitors: true
});

module.exports = nextConfig;
