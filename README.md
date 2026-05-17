# youpapa-school — 副業×AI×自動化 教科書サイト

「副業×AI×自動化で月10万」を、**リサーチ→商品→販売→集客**の4ステップで実践する教科書サイト。
ビルド不要の純静的サイト（HTML/CSS/JS）。GitHub Pages で公開。

- 公開URL: https://mitama987.github.io/youpapa-school/
- ソース記事（非公開・社内）: ClaudeCompany `/.company/marketing/articles/note-fukugyo-ai-getting-started.md`

## 構成

| パス | 内容 |
|---|---|
| `index.html` | 表紙・全体像・使い方・進捗ダッシュボード |
| `step1.html`〜`step4.html` | 各STEP（型→実例→チェックリスト） |
| `pitfalls.html` | つまずき対処・まとめ |
| `assets/css/site.css` | 共通スタイル（濃紺×ゴールド） |
| `assets/js/app.js` | サイドバー・進捗（localStorage） |
| `xtp3/` | XToolsPro3 LP（`83_xtp3-lp` ルート版を静的コピー、絶対URLは本サイト用に書換） |
| `xtp4/` | XToolsPro4 LP（`84_xtp4-lp` を静的コピー、`/sign-up`→フォームURLへ是正） |

`xtp3/` `xtp4/` は別リポ（`83_xtp3-lp` / `84_xtp4-lp`）からの**静的コピー**。元リポは保守を続け、本サイトには反映時に再コピーする。

## 公開時の差し込み（プレースホルダ）

- `REPLACE_LINE_URL` … LINE公式アカウント登録URL
- `REPLACE_X_PINNED_URL` … X固定ポストURL
- `class="soon"` のClaude CodeスキルLPリンク … 各スキルLP公開後に `href` を差し替え

## ローカル確認

```
python -m http.server 8080
# http://localhost:8080/ を開く
```

## デプロイ

GitHub Pages（`main` / ルート）。`git push` で反映。`.nojekyll` 配置済み（静的そのまま配信）。

## バージョン

- ver1.0 / 2026-05-17 / 初版。教科書4ページ＋つまずき＋XTP3/XTP4 LP取り込み
