const CACHE_NAME = 'shixu-v2026-final'; // 每次更新请改名字

self.addEventListener('install', e => {
  self.skipWaiting(); // 强制跳过等待，立即生效
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll([
      './',
      './index.html',
      './manifest.json',
      'https://cdn.jsdelivr.net/npm/lunar-javascript/lunar.js'
    ]))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});