# Youパパ school — 副業×AI×自動化 アカデミーサイト

オンライン講座アカデミー型サイト（参照: claude-code-academy 風）。ビルド不要の純静的（HTML/CSS/JS）。GitHub Pages 公開。

- 公開URL: https://mitama987.github.io/youpapa-school/
- ソース記事（非公開・社内）: ClaudeCompany `/.company/marketing/articles/note-fukugyo-ai-getting-started.md`

## 情報設計

| パス | 内容 |
|---|---|
| `index.html` | アカデミートップ（hero／無料LINEバナー／フィルタ／講座カードグリッド） |
| `courses/fukugyo-ai.html` | 講座詳細（カリキュラム・達成率） |
| `lessons/step1〜4.html` `lessons/pitfalls.html` | レッスン（型→実例→チェックリスト、進捗保存） |
| `articles/index.html` `articles/fukugyo-ai-start.html` | 記事一覧・記事本体 |
| `community.html` | 掲示板（GitHub Discussions 誘導＋LINE） |
| `assets/css/site.css` | アカデミーUI（白基調×オレンジ/イエロー） |
| `assets/js/app.js` | カードフィルタ・進捗localStorage・ナビ・モバイル |
| `xtp3/` `xtp4/` | 製品LP（別リポからの静的コピー、非破壊・リンク先） |

ナビ: 講座一覧 ／ 記事 ／ 掲示板。料金表示なし（無料→LINE集客）。

## 公開時の差し込み（プレースホルダ）

- `REPLACE_LINE_URL` … LINE公式アカウント登録URL
- `REPLACE_X_PINNED_URL` … X固定ポストURL
- `class="soon"` のClaude CodeスキルLPリンク … 各スキルLP公開後に `href` 差し替え
- 掲示板は `mitama987/youpapa-school` の GitHub Discussions を使用（要・Discussions有効化）

## ローカル確認

```
python -m http.server 8080
# http://localhost:8080/ を開く
```

## デプロイ

GitHub Pages（`main` / ルート）。`git push` で反映。`.nojekyll` 配置済み。

## バージョン

- ver2.2 / 2026-05-17 / 最初の導線改善：ヒーロー単一CTA化、「受講の進め方（3ステップ）」新設、フラッグシップに「★まずはここから」、進捗連動の data-resume（続きから/次のレッスン自動表示）
- ver2.1 / 2026-05-17 / ダークモード追加（OS追従＋ヘッダートグル、localStorage `yps:theme` 保存、`<head>`先読みJSでFOUC防止）。アカデミー10ページ対象、xtp3/xtp4は非改変
- ver2.0 / 2026-05-17 / アカデミー型へ全面再構築（講座一覧＋記事＋掲示板、白×オレンジ、フィルタ、レッスン化）
- ver1.0 / 2026-05-17 / 初版（4ステップ単一教科書＋XTP3/XTP4取り込み）
