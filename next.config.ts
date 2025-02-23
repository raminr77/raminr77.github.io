import type { NextConfig } from 'next';

import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
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
