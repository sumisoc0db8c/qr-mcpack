# 統合版マイクラ向け QR コード生成
白と黒のコンクリートでQRコードを作成するアドオンジェネレーター  

## 機能

-   QR コード生成
-   mcfunction ファイル生成
-   mcpack 生成

## UI

-   QR コード用文字列入力欄
-   生成ボタン
-   ダウンロードボタン(生成されたらダウンロードできるようにする)

## 機能詳細

### QR コード生成

-   QR コード生成ライブラリを使用
https://github.com/soldair/node-qrcode
-   QR コードの白黒を 0/1 の 2 値で取得

## mcfunction ファイル生成

-   setblock コマンドを使用
-   白色 白いコンクリート
-   黒色 黒いコンクリート
-   相対座標で実行者の南側に生成する

## mcpack 生成

-   アドオンの形式に整形
-   manifest を作成
-   QRコードの画像をiconに設定

## 技術スタック

-   github page に静的サイトとしてデプロイ
-   React + Vite
-   tailwind css
-   vibe coding

## 実行方法  

```sh
npm install
npm run dev
```
