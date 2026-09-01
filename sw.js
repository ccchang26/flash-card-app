// 每次 GitHub 更新功能時，把這裡的版本號 +1 (例如 v2 -> v3)
const CACHE_NAME = 'flashcard-cache-v2';

// 需要快取的檔案清單
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 安裝時快取新資源，並強制立即生效
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting(); // 跳過等待，立刻啟用新 SW
});

// 啟動時清除舊快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 刪除上一版的舊快取
          }
        })
      );
    }).then(() => self.clients.claim()) // 立刻接管所有開啟中的頁面
  );
});

// 攔截請求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
