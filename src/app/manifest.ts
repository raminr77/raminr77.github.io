import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    dir: 'ltr',
    scope: '/',
    lang: 'en-US',
    start_url: '/',
    name: 'Ramin Rezaei',
    short_name: 'Ramin Rezaei',
    display: 'fullscreen',
    theme_color: '#000000',
    orientation: 'portrait',
    background_color: '#ffffff',
    description: 'Ramin Rezaei Personal Page.',
    display_override: ['fullscreen', 'minimal-ui'],
    protocol_handlers: [
      {
        protocol: 'web+open',
        url: '/presentation?id=%s'
      }
    ],
    screenshots: [
      {
        type: 'image/png',
        sizes: '540x720',
        form_factor: 'narrow',
        src: 'images/screenshot-01.png'
      },
      {
        type: 'image/png',
        sizes: '720x540',
        form_factor: 'wide',
        src: 'images/screenshot-02.png'
      }
    ],
    icons: [
      {
        src: 'images/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: 'images/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: 'images/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: 'images/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: 'images/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png'
      },
      {
        src: 'images/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'images/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
        src: 'images/icons/maskable-icon-180.png'
      }
    ]
  };
}
