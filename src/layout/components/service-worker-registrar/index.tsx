'use client';
import { useEffect } from 'react';

export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('Service Worker registered.'))
        .catch((error) => console.log('Service Worker registration failed.', error));
    }
  }, []);
  return null;
}
