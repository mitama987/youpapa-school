# 設定の例（あなたの値に置き換えてください）

スキル本文のプレースホルダを、自分の値にします。**初回に Claude へ口頭で伝えるだけでもOK**です。

## 1. note 投稿まわり（note-edit / note-preview）

| プレースホルダ | 意味 | 例 |
|---|---|---|
| `<あなたのnote ID>` | note.com のアカウントID（URLの `note.com/●●●`） | `taro-blog` |
| `<あなたのあいさつ文…>` | 記事冒頭に自動挿入する自己紹介 | `こんにちは！副業ブロガーのタローです。` |
| `<あなたのCTA記事URL>` | 記事末尾などで誘導したい自分のnote記事URL | `https://note.com/taro-blog/n/xxxxxxxx` |

### note-preview（任意・Python）の環境変数
プレビュー時のあいさつ文・CTAは環境変数でも上書きできます。

PowerShell の例：
```
$env:NOTE_GREETING = "こんにちは！副業ブロガーのタローです。"
$env:NOTE_CTA_URL  = "https://note.com/taro-blog/n/xxxxxxxx"
```

## 2. 記事生成まわり（buzzblog）

| プレースホルダ | 意味 | 例 |
|---|---|---|
| `<あなたのVaultのパス>` | メモ（Obsidian等）の保存フォルダ | `C:\Users\taro\Documents\blog` |
| `<プロジェクトのパス>` | スクリプトを置く作業フォルダ | `C:\Users\taro\note-tools` |

`<あなたのVaultのパス>\80_ブログ作成ガイド\プロンプト\` に、同梱の汎用プロンプト雛形
（`skills/buzzblog/prompts/` の3ファイル）を置くと、buzzblog がそれを使います。

## 3. 画像生成の APIキー（任意・Python）

`.env`（プロジェクト直下）か `data.json` に置きます。**実キーは絶対に公開リポジトリに入れないこと。**

`.env` の例：
```
OPENAI_API_KEY=sk-あなたのキー
OPENAI_IMAGE_MODEL=gpt-image-2
GEMINI_API_KEY=AIzaあなたのキー
```

`data.json` の例（buzzblog-generator プラグイン設定）：
```json
{
  "openaiApiKey": "sk-あなたのキー",
  "openaiImageModel": "gpt-image-2",
  "apiKey": "AIzaあなたのキー"
}
```
> `openaiApiKey` = OpenAIキー、`apiKey` = **Geminiキー**（名前が紛らわしいので注意）。
> 「画像サムネ用API」と「GPTのAPIキー」は同じ OpenAIキー1本です（記事の文章は Claude が生成するので GPTチャットAPIは不要）。
