# note集客スキル（note-shukyaku プラグイン）

Claude Code で「メモ → 記事 → note投稿」を半自動化するスキル一式です。配布用に個人情報はマスク済み。

| スキル | できること | Python |
|---|---|---|
| `/note-shukyaku:buzzblog` | メモから記事タイトル・本文を生成（画像生成は任意） | **不要**（文章のみ。画像は任意でPython） |
| `/note-shukyaku:note-edit` | 生成した記事を note.com に書式付きで投稿（下書き保存） | **不要**（ブラウザ操作） |
| `/note-shukyaku:note-preview` | 投稿前に note 風HTMLでローカル確認 | 必要（任意） |

> **コアの「記事を書く → note に投稿する」だけなら Python は要りません。** Python（uv）が要るのは「画像の自動生成」と「ローカルプレビュー」だけです。まずは Python なしで始められます。

---

## インストール

お使いの Claude Code に合わせて、どちらかの方法で入れます。

### A. VS Code 拡張版（推奨・黒い画面なし）

画面右側の Claude Code パネルで操作する人はこちら。

1. 入力欄に **`/plugins`（複数形）** と打つ → 「Manage plugins」管理画面が開きます。
   - ※ 単数の `/plugin` は拡張版では使えず、`/plugin isn't available in this environment.` と出ます。かならず複数形の `/plugins` を打ってください。
2. **Marketplaces** タブで `mitama987/youpapa-school` を追加。
3. **Plugins** タブに切り替え → 一覧の `note-shukyaku` の **Install** を押す（スコープは「Install for you＝自分用」でOK）。
4. 「再起動して反映」のバナーが出たら Claude Code を再起動。

### B. ターミナル版（CLI）

黒い画面（ターミナル）で動かしている人はこちら。次の2コマンドを順に貼り付けます。

```
/plugin marketplace add mitama987/youpapa-school
```
```
/plugin install note-shukyaku@youpapa-tools
```

---

どちらの方法でも、3つのスキルが入ります。`/` を押すと `/note-shukyaku:buzzblog` などが候補に出ます。
（反映されない場合は Claude Code を一度閉じて開き直してください）

### うまくいかないとき
- **拡張版**：`/plugins` の **Marketplaces** タブに `youpapa-school` が追加されているか確認 → 追加済みなら Claude Code を再起動。
- **CLI版**：`/plugin marketplace list` で `youpapa-tools` が入っているか確認。
- ブランチ指定が要る場合：`mitama987/youpapa-school@main`（CLI版は `/plugin marketplace add mitama987/youpapa-school@main`）

---

## 最初に1回だけ設定

スキル本文には `<あなたのnote ID>` `<あなたのあいさつ文…>` `<あなたのCTA記事URL>` `<あなたのVaultのパス>` などのプレースホルダが入っています。次のどちらかで自分の値にします。

- **かんたん**：初回に Claude へ口頭で伝える（例：「note IDは○○、あいさつ文は『こんにちは！△△です。』で」）。
- **しっかり**：同梱の [`config.example.md`](config.example.md) を見て、自分の値をメモ／設定しておく。

---

## 使い方（基本の流れ）

1. **記事を作る**：`/note-shukyaku:buzzblog <メモのパス>` → タイトル案から選ぶ → 本文生成
2. **note にログイン**：ブラウザ（Claude が操作するもの）で note.com にログインしておく
3. **投稿する**：`/note-shukyaku:note-edit <生成された_generated.md>` → 下書き保存

> note-edit はパスワードを保存しません。ブラウザのログイン状態を使うので、**投稿前に note.com へログイン**しておいてください。

---

## 任意：画像の自動生成 / プレビュー（Python を使う）

画像（サムネ・図解）の自動生成や、ローカルプレビューを使う場合だけ、Python 環境（uv）と APIキーが必要です。手順は配布元の導入ガイドを参照：
**https://shikumi-lake.vercel.app/courses/note-shukyaku**

ざっくり：
1. uv を入れる（Windows: PowerShell で `irm https://astral.sh/uv/install.ps1 | iex`）
2. OpenAI（gpt-image-2）/ Gemini のАPIキーを `.env` か `data.json` に設定（[`config.example.md`](config.example.md)）
3. プレビュー：`uv run python -m note_preview <記事.md>`（note-preview スキル内 `note_preview/` を使用）
4. サムネ生成：`uv run python skills/note-preview/scripts/gen_thumbnail.py "プロンプト" 出力.png`

---

## 手動インストール（プラグインを使わない場合）

zip をダウンロードして展開し、`skills/` の中の各フォルダ（`buzzblog` `note-edit` `note-preview`）を
`~/.claude/skills/`（Windows は `C:\Users\<ユーザー名>\.claude\skills\`）に**フォルダごとコピー**してください。
その場合の呼び出しは `/buzzblog` `/note-edit` `/note-preview`（名前空間なし）になります。

---

## 必要なもの まとめ
- **コア（文章→投稿）**：Claude Code＋ブラウザ自動化MCP（agent-browser / Chrome MCP）＋ note.com アカウント
- **画像生成（任意）**：uv（Python）＋ OpenAI APIキー（＋必要なら Gemini）
- **プレビュー（任意）**：uv（Python）
