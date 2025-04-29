import { withContentlayer } from 'next-contentlayer';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
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

module.exports = withContentlayer(nextConfig);
