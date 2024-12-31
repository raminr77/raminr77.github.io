import type { NextConfig } from 'next';

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
      }
    ];
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api']
  }
};

export default nextConfig;
