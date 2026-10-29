# 星夜謎旅｜FF14 一周年猜謎祭

完整靜態網站，包含開信動畫、活動頁面與全部圖片。無須 npm、建置工具、後端或 API 金鑰。

## 上傳 GitHub 並開啟 GitHub Pages

1. 解壓縮檔案。
2. 建立 GitHub 儲存庫，將本資料夾內的所有檔案與 assets、docs 資料夾上傳至儲存庫根目錄。請讓 index.html 直接出現在儲存庫第一層；不要只上傳 ZIP，也不要把整個資料夾再包一層。
3. 儲存庫進入 Settings → Pages。
4. 在 Build and deployment 下，Source 選擇 Deploy from a branch。
5. Branch 選擇 main，資料夾選擇 / (root)，按 Save。若你使用其他分支，選擇實際上傳檔案的分支。
6. 等部署完成，使用 Pages 頁面顯示的網站網址開啟。

官方說明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

網站全部使用相對路徑，可放在 https://你的帳號.github.io/儲存庫名稱/。
.nojekyll 是空白設定檔，請一併保留。

## 本機預覽

解壓縮後直接以瀏覽器開啟 index.html 即可。

## 檔案結構

- index.html：主頁、活動內容、試玩謎題互動。
- invitation.js：開信動畫、邀請函內容、重播與略過操作。
- invitation.css：信封與動畫基礎樣式。
- polish.css：完整視覺與手機版樣式。
- assets/：全部活動圖片、透明背景封蠟與多尺寸分頁圖示。
- docs/圖片製作提示詞.md：ImageGen 圖片製作紀錄。
- favicon.ico：瀏覽器分頁圖示（16、32、48 像素）。
- .nojekyll：GitHub Pages 靜態站點設定。

## 目前活動資訊

- 名稱：星夜謎旅・一周年猜謎祭
- 主辦：貓咪咖啡館、晨曦茶會、T Grove、莫古力樂園
- 時間：11 月 27 日 晚上 9:30
- 伺服器：伊弗利特
- 集合：中薩納蘭 X：24.6 Y：17.2
- 路線：中薩納蘭 → 黑衣林中央林區 → 中拉諾西亞
- 參加：自由參加
- 規則：每個公會各準備 20 題，共 80 題，分簡單與困難兩種難度；每題最先答對者獲勝。
- 獎品：兩種難度的獎品內容不同，詳細內容敬請期待。

## 後續修改

主頁文案修改 index.html；開場邀請函文案修改 invitation.js。若更動活動時間，請同步修改這兩個檔案。

圖片如更名，請同步修改 HTML、CSS 或 JavaScript 中的相對路徑。

此為 FF14 玩家活動網站。圖片為 ImageGen 製作的原創幻想插畫。

