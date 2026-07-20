# x-post — Xポスト自動生成スキル

X（Twitter）の投稿案を、**2つのモードから選んで**自動生成する Claude Code スキルです。

実運用中の X 自動投稿ツール **XToolsPro2** と **XToolsPro4** に組み込まれていた生成プロンプトを、
そのままスキルとして切り出しました。

## 特徴

- **外部APIキー不要**。OpenAI も Gemini も使いません。文章は Claude が直接書きます
- **Python不要**。インストールしてすぐ使えます
- **2モード**を実行時に選択できます

| | モードA 深掘り型 | モードB 量産型 |
|---|---|---|
| 由来 | XToolsPro4 post-generator | XToolsPro2 AIモード |
| ハッシュタグ | 付けない | 2〜3個必須 |
| 件数 | 5 / 10 / 20 | 10 / 50 / 100 |
| 設計手法 | AI臭を消す8手法（A/B/C） | 10パターン＋成功事例7指針 |
| 想定用途 | 本命ポスト・ブランディング | ランダム投稿キューのストック |

## インストール

**VS Code 拡張版（推奨・黒い画面なし）**

`/manage` → Marketplaces で `mitama987/youpapa-school` を Add → Plugins タブで `x-post` を Install → reload

**ターミナル版（CLI）**

```
/plugin marketplace add mitama987/youpapa-school
/plugin install x-post@youpapa-tools
```

## 使い方

```
/x-post 副業の始め方
/x-post https://note.com/xxx/n/xxxx 深掘り
/x-post 時間管理 量産 50件
```

引数なしでも動きます（対話で聞きます）。

## 初回設定（1回だけ）

`~/.claude/x-post-config.md` に発信の核・ターゲット・トーン・NG・CTA を書いておくと、
毎回のヒアリングが「件数・文字数・パターン」だけになります。

ファイルが無ければ初回実行時に Claude が対話しながら作ります。
雛形は同梱の [`config.example.md`](./config.example.md) を参照してください。

## 同梱物

```
plugins/x-post/
├── .claude-plugin/plugin.json
├── config.example.md
├── README.md
└── skills/x-post/
    ├── SKILL.md
    └── prompts/
        ├── prompt-深掘り型.md
        ├── prompt-量産型.md
        ├── prompt-AI臭を消す8手法.md
        └── prompt-10パターン.md
```

## 注意

- 生成物は**下書き**です。投稿前に必ずご自身で確認してください
- 数字や実績は創作しません。手元にない数字は書かれません
- XToolsPro には「投稿本文のCSV一括インポート」機能が無いため、CSV出力には対応していません

## ライセンス・出典

「AI臭を消す8手法」は marketer_osaru1 氏のフレームワークを整理したものです。

---

詳しい導入手順: https://shikumi-lake.vercel.app/courses/x-post
