// 快取版本名稱（若有修改前端檔案，可將 v3 改為 v4 強制手機更新）
const CACHE_NAME = 'flashcards-cache-v4';

// 離線需要快取的靜態資源清單
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 1. 安裝事件 (Install)：下載並快取靜態資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] 快取核心檔案中...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // 跳過等待，讓新的 Service Worker 立即生效
  self.skipWaiting();
});

// 2. 啟用事件 (Activate)：清除舊版本的快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] 清除舊版本快取:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // 讓新啟用的 Service Worker 立即接管所有頁面
  self.clients.claim();
});

// 3. 攔截網路請求 (Fetch)：離線優先策略
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // 排除外部翻譯 API（Google 翻譯必須連網，不走快取）
  if (url.includes('translate.googleapis.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 若快取中已有檔案則直接讀取快取；若無則向網路發出請求
      return cachedResponse || fetch(event.request).then((networkResponse) => {
        // 如果是有效回應且是同源請求，動態存入快取
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          event.request.url.startsWith(self.location.origin)
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      // 完全斷網且找不到對應快取時的兜底回應（導回首頁快取）
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
