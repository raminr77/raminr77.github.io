self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      vibrate: [100, 50, 100],
      badge: '/images/logo-black.png',
      icon: data.icon || 'images/logo-black.png',
      data: {
        primaryKey: '2',
        dateOfArrival: Date.now()
      }
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('https://raminrezaei.se'));
});
