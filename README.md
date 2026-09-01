# 🗂️ Language Flashcard (單字卡)

一個基於純前端技術打造的輕量、極簡且直覺的語言學習單字卡 Web App。支援 PWA、自動即時翻譯、手勢滑動刷卡與星號重點標記，資料完全儲存於本地端，無需登入即可使用。

---

## ✨ 核心特色

- 🤖 **自動翻譯**：串接 MyMemory API，輸入原文即可自動帶入繁體中文翻譯，亦可自由覆寫與補充筆記。
- 🙈 **遮蔽式背誦體驗**：預設模糊翻譯內容，點擊即可翻開對案，強化主動回想（Active Recall）效果。
- ⭐ **星號收藏**：支援單字標記收藏，並提供「僅看收藏」過濾模式，方便集中複習生詞。
- 📚 **多清單分類管理**：可自訂多個單字庫（如：第一課、托福核心單字、日常口語），並支援隨時改名與刪除。
- 🔀 **多樣化排序**：支援最新順序、最舊順序、A-Z 字典序以及 🎲 隨機洗牌背誦模式。

---

## 🛠️ 技術架構

- **Core**：純原生 HTML5、CSS3、JavaScript (Vanilla JS)
- **Data Persistence**：Browser `localStorage`
- **Translation API**：MyMemory Translated API
- **App Platform**：Web App Manifest & Service Worker (PWA)

---

## 📁 專案檔案結構

```text
├── index.html          # 主頁面結構、樣式與前端互動邏輯
├── manifest.json       # PWA 設定檔（定義圖示、名稱與啟動模式）
├── sw.js               # Service Worker 快取與離線設定
├── icon.png            # App 圖示 (建議 512x512)
└── README.md           # 專案說明文件
