---
description: Obsidian等のメモから日本語ブログ記事（タイトル候補10件＋本文）を生成する。文章はClaudeが生成しPython不要、画像生成は任意。「記事を書いて」「ブログ生成」「buzzblog」と言われたら使う。
---

# BuzzBlog Generator スキル

> **【最初に1回だけ設定】** これは配布用にマスクされたスキルです。本文中の `<あなたのVaultのパス>` `<あなたのnote ID>` `<あなたのあいさつ文…>` `<あなたのCTA記事URL>` などのプレースホルダは、あなた自身の値に置き換えるか、**初回利用時に Claude に口頭で伝えてください**（例:「note IDは○○、あいさつ文は△△で」）。詳しくは同梱の `config.example.md` を参照。


Obsidianノートから日本語ブログ記事を生成するスキル。タイトル候補10件の生成・選択、ブログ記事の全文生成、ファイル保存を行う。

## 使用方法

```
/buzzblog <ファイルパス>
```

- **引数**: Obsidianノートのパス（絶対パス、vault相対パス、obsidian:// URI のいずれか）
- 引数なしの場合はユーザーに確認する

例:
- `/buzzblog 03_メモ/アイディア/サンプルメモ.md`
- `/buzzblog <あなたのVaultのパス>\03_メモ\...`

## 定数

- **Vault Root**: `<あなたのVaultのパス>\`
- **タイトルプロンプト**: `<あなたのVaultのパス>\80_ブログ作成ガイド\プロンプト\記事タイトル生成.md`
- **ブログ生成プロンプト**: `<あなたのVaultのパス>\80_ブログ作成ガイド\プロンプト\ブログ生成.md`
- **サムネイルプロンプト**: `<あなたのVaultのパス>\80_ブログ作成ガイド\プロンプト\サムネイル生成.md`
- **プラグイン設定**: `<あなたのVaultのパス>\.obsidian\plugins\buzzblog-generator\data.json`

---

## ワークフロー

### Step 0: 入力解析とファイル読み込み

1. 引数のファイルパスを解決する:
   - `obsidian://` URI → URLデコードして vault 名と file パスを抽出し、Vault Root と結合
   - 相対パス → Vault Root と結合
   - 絶対パス → そのまま使用
2. Read ツールでソースノートを読み込む
3. フロントマター（`---` で囲まれた部分）があれば分離し、tags を保持する
4. 本文コンテンツを「クリーニング済みテキスト」として保持する:
   - コードブロック（```...```）を除去
   - インラインコード（`）を除去
   - 画像埋め込み（`![[]]` `![]()` ）を除去
   - Obsidianリンク（`[[text|display]]` `[[text]]`）はテキスト部分のみ残す
   - Markdownリンク `[text](url)` はテキスト部分のみ残す
   - 見出し記号（#）を除去
   - 書式文字（`>` `*` `_`）を除去
   - 連続空白を正規化

### Step 1: プロンプトテンプレート読み込み

Read ツールで以下を**並列で**読み込む:
- タイトルプロンプト: `80_ブログ作成ガイド/プロンプト/記事タイトル生成.md`
- ブログ生成プロンプト: `80_ブログ作成ガイド/プロンプト/ブログ生成.md`

これらは**生成ルール**として内在化する（外部APIには送らない）。

### Step 2: タイトル候補10件を生成

タイトルプロンプトのルールに従い、ソースノートの内容に基づいて**10件のタイトル候補**を生成する。

生成時のコンテキスト:
```
現在: {現在の年}年{現在の月}月
ジャンル: （ソースノートの内容から推定、不明なら「未指定」）
トーン/読者層: （ソースノートの内容から推定、不明なら「未指定」）
重視ポイント: SEO重視
```

出力形式:
```
1. タイトル案
2. タイトル案
...
10. タイトル案
```

ルールの要点:
- メインキーワードを本文から2〜3個推定して含める
- タイトルだけで内容のイメージが伝わる
- 10個すべてニュアンスが被らない
- 10個の訴求パターン（網羅性、限定感、権威性、裏技、速報性、お得、誰でもできる、マイナス感情、ターゲット呼びかけ、非常識）を1タイトル2〜3個組み合わせ、全体でバランスよく散らす
- タイトル以外の説明文は書かない

### Step 3: ユーザーにタイトル選択を問う

AskUserQuestion ツールで 10件のタイトル候補を提示し、ユーザーに選択してもらう。
- 選択肢として代表的なタイトル2〜4件 + 「Other」（カスタムタイトル入力）
- ユーザーが選んだタイトルを `selectedTitle` として保持する

### Step 4: ブログ記事全文を生成

ブログ生成プロンプト（`ブログ生成.md`）のルールを**完全に遵守**して記事を生成する。

#### 絶対に守る構造
1. 先頭に `# {selectedTitle}`
2. リード文（導入） — フック + 概要3点 + 読了促し
3. `## 見出し`（複数）と各本文
4. まとめ
5. CTA（読者に取ってほしい行動を促す）

#### 主要ルール（ブログ生成プロンプトより）
- 出力は日本語のみ、frontmatterは出力しない
- 元メモの事実関係や主張は変えない
- 3つのNot（読まない・信じない・行動しない）を前提に書く
- PREP法（結論→理由→具体例→結論）を応用
- 代名詞を避ける、数字は半角統一
- 省略できる接続詞は省略、逆説は残す
- 同じ語尾を3回連続で使わない
- 主語と述語を近くに置く
- 修飾語と被修飾語を近づける
- 漢字をひらがなにひらくルールを遵守（形式名詞、補助動詞、複合動詞の後ろ、一般的でない漢字、接続詞）
- 敬語は敬いすぎない、バイト敬語は使わない
- 冗長表現を削除（「することができる」→「できる」等）
- 指示語・順番表現を排除
- 重要ポイントは表現を変えて繰り返す
- `**太字**` の直後に日本語が続く場合はスペースを挿入する

### Step 5: ファイル保存

1. YAML フロントマターを構築:
```yaml
---
title: "{selectedTitle}"
date: {YYYY-MM-DD}
tags:
  - {ソースから継承したtags}
source: "{ソースファイルのvault相対パス}"
model: "claude-code"
provider: "claude-code"
---
```

2. 出力ファイル名を決定:
   - 基本: `{basename}_generated.md`
   - 既存ファイルがある場合: `{basename}_generated_2.md`, `_3.md` ... と連番
   - 保存先: ソースファイルと同じディレクトリ

3. Write ツールでフロントマター + 記事本文を結合して保存

4. 保存完了を報告し、出力ファイルパスを表示

### 画像生成モデル

#### デフォルト: `gpt-image-2`（OpenAI、2026-04-21リリース）

サムネイル・挿絵・図解すべての画像生成で **gpt-image-2 をデフォルトで使う** 。

- **特徴:** CJK文字を99%以上の精度で正確に描画する（DALL-E 3の60% → 99%+ への大幅向上）。日本語ラベル・数字・タイトルがほぼ崩れずに出る
- **エンドポイント:** `https://api.openai.com/v1/images/generations`
- **APIキー:** `data.json` の `openaiApiKey` フィールドから取得
- **モデルID:** `data.json` の `openaiImageModel` から取得（既定値: `gpt-image-2`）
- **16:9アスペクト比:** `size: "1536x1024"` を指定（公式サポートサイズ）
- **レスポンス形式:** `data[0].b64_json` （base64） または `data[0].url`

#### フォールバック: `gemini-3-pro-image-preview`

OpenAI 側で課金エラー（402）、レート制限（429）、サービス停止が出た場合、または **ユーザーが明示的に Gemini を指定した場合のみ** Gemini に切り替える。

- **APIキー:** `data.json` の `apiKey` フィールド
- **エンドポイント:** `https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}`
- **アスペクト比指定:** `generationConfig.imageConfig.aspectRatio: "16:9"`
- **使用禁止:** `gemini-2.5-flash-image` は日本語が文字化けする
- **存在しないモデル:** `gemini-3.1-pro-image-preview` は2026-04-18時点で404。pro品質は `gemini-3-pro-image-preview` を指定

#### 画像種別と使い分け（重要）

| 画像種別 | 用途 | デフォルトモデル |
|---|---|---|
| サムネイル | タイトル・バッジ・実績テキスト多め | **gpt-image-2** （CJK精度が必須） |
| 図解（diagram） | 比較表・フローチャート・カード型情報 | **gpt-image-2** （CJK精度が必須） |
| 挿絵（H2 直下） | テキストなしの抽象イラスト | **gemini-3-pro-image-preview** （色彩・雰囲気が安定） |

**Why:** gpt-image-2 はCJK文字を99%描画できるがテキストなしの抽象イラストでは過度に "AI っぽい" 仕上がりになりがち。Gemini はテキストなしの雰囲気イラストで色彩と構図のまとまりが良いので、挿絵は Gemini を使う。

### Step 6: (オプション) サムネイル生成

ユーザーに「サムネイルも生成しますか？」と確認し、希望がある場合のみ実行。

1. プラグイン設定 `data.json` から OpenAI APIキー（`openaiApiKey`）とモデル（`openaiImageModel`、既定 `gpt-image-2`）を取得
2. サムネイルプロンプト `サムネイル生成.md` を読み込む
3. レイアウトパターンを選択（A: 王道スタック / B: 左右分割 / C: 下段リストパネル / D: ダイナミック）
4. Python スクリプトで gpt-image-2 を呼び出す（APIキーは data.json から読み込み、スクリプト本体に埋め込まない）:
```bash
python -c "
import json, urllib.request, base64, sys
DATA_JSON = r'<あなたのVaultのパス>\.obsidian\plugins\buzzblog-generator\data.json'
with open(DATA_JSON, encoding='utf-8') as f:
    cfg = json.load(f)
API_KEY = cfg['openaiApiKey']
MODEL = cfg.get('openaiImageModel', 'gpt-image-2')
prompt = '''...(composed prompt)...'''
data = json.dumps({
    'model': MODEL,
    'prompt': prompt,
    'size': '1536x1024',
    'n': 1
}).encode()
req = urllib.request.Request(
    'https://api.openai.com/v1/images/generations',
    data=data,
    headers={'Authorization': f'Bearer {API_KEY}', 'Content-Type': 'application/json'},
    method='POST'
)
resp = json.loads(urllib.request.urlopen(req, timeout=300).read())
item = resp['data'][0]
if 'b64_json' in item:
    img = base64.b64decode(item['b64_json'])
else:
    img = urllib.request.urlopen(item['url'], timeout=60).read()
with open(sys.argv[1], 'wb') as f:
    f.write(img)
" "OUTPUT_PATH"
```
5. 画像を `images/{basename}/{basename}_thumbnail.png` に保存
6. 生成記事の先頭に画像埋め込みを挿入: `![[images/{basename}/{basename}_thumbnail.png]]`

### Step 7: 挿絵生成

画像ファイルがまだない場合、**`gemini-3-pro-image-preview`** で自動生成する（テキストなしの抽象イラスト用途では Gemini の方が色彩・構図が安定する）。

**重要: 挿絵はH2（`##`）見出しの直下のみに配置する。H3（`###`）の下には挿入しない。**

1. 記事内の `##` 見出しを抽出する（`## まとめ` は除外、`###` は対象外）
2. プラグイン設定 `data.json` から Gemini APIキー（`apiKey`）を取得
3. 各見出しのセクション内容に基づいて、抽象的なイラスト画像のプロンプトを構成する:
   - テキストなし（no text, no words, no letters, no numbers）
   - 見出しの内容を象徴する抽象的なシーン
   - 記事全体のテーマカラーと統一感のある配色（黒/濃紺ベース、ゴールド/アンバーアクセント）
   - スタイル: Abstract, cinematic, professional blog illustration
   - アスペクト比: 16:9
4. 全見出しぶんの画像生成を **`ThreadPoolExecutor` で並列実行** し、1スクリプトで一括処理する。各リクエストは以下の構造:
```bash
python -c "
import json, urllib.request, base64
from concurrent.futures import ThreadPoolExecutor, as_completed

DATA_JSON = r'<あなたのVaultのパス>\.obsidian\plugins\buzzblog-generator\data.json'
with open(DATA_JSON, encoding='utf-8') as f:
    cfg = json.load(f)
API_KEY = cfg['apiKey']
MODEL = 'gemini-3-pro-image-preview'
ENDPOINT = f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}'

def gen(prompt, output_path):
    payload = json.dumps({
        'contents': [{'role': 'user', 'parts': [{'text': prompt}]}],
        'generationConfig': {'responseModalities': ['IMAGE'], 'imageConfig': {'aspectRatio': '16:9'}}
    }).encode()
    req = urllib.request.Request(ENDPOINT, data=payload,
        headers={'Content-Type': 'application/json'}, method='POST')
    resp = json.loads(urllib.request.urlopen(req, timeout=180).read())
    for part in resp['candidates'][0]['content']['parts']:
        if 'inlineData' in part:
            with open(output_path, 'wb') as f:
                f.write(base64.b64decode(part['inlineData']['data']))
            return

TASKS = [(prompt_for_h2_1, 'images/.../basename_heading_1.png'), ...]
with ThreadPoolExecutor(max_workers=4) as ex:
    futs = [ex.submit(gen, p, path) for p, path in TASKS]
    for fut in as_completed(futs):
        fut.result()
"
```
5. 画像を `images/{basename}/{basename}_heading_{n}.png` に保存（n = 1, 2, 3... 見出し順）
6. 各 `## 見出し` の直下（見出し行の次の行）に画像埋め込みを挿入:
   `![[images/{basename}/{basename}_heading_{n}.png]]`

### Step 8: (オプション) 図解（diagram）生成

ユーザーから「分かりづらい所に図解を入れて」「表を図解にして」など、**説明的・教育的な図解** の依頼があった場合に実行する。挿絵（抽象イラスト）とは別物で、テキスト・数字・矢印・カードレイアウトを含む infographic。

1. 記事内で図解化すべきセクションを特定（比較表・フローチャート・概念図など）
2. プラグイン設定 `data.json` から OpenAI APIキーを取得（**gpt-image-2 必須**：日本語ラベル精度が出る）
3. プロンプトに以下を必ず含める:
   - `Render Japanese text accurately and clearly readable` (CJK精度を強調)
   - 含めない単語の明示禁止リスト（古い情報を排除する場合）
   - 具体的な配置指示（左カード / 中央 VS バッジ / 右カード など）
   - 数字・ラベル・矢印・装飾アイコン（⚠✓）の指定
4. Step 6 と同じ Python スクリプトで生成（並列可）
5. 画像を `images/{basename}/{basename}_diagram_{n}.png` に保存（n = 1, 2, 3... 出現順）
6. 該当箇所の表・テキストを画像埋め込みで置き換える: `![[images/{basename}/{basename}_diagram_{n}.png]]`

---

## 本文表現のガイドライン

### 文体: ですます調で統一

記事本文は **ですます調** を基本とする。「〜である」「〜だ」「〜と言う」等の常体（だ・である調）を混ぜない。

| NG (常体) | OK (ですます調) |
|---|---|
| 結論から言う。〜だ。 | 結論からお伝えします。〜です。 |
| 〜に跳ね上がる。 | 〜に跳ね上がります。 |
| 〜を作ってきた。 | 〜を作ってきました。 |
| 〜してほしい。 | 〜してください / 〜をご覧ください。 |

**Why:** 読者との距離感を一定に保ち、説明調の親しみやすさを担保するため。note記事の読者層（個人開発者・副業層）にはですます調の方が届きやすい。

**例外:** 箇条書き項目や図表の見出しなど短文は体言止め可。

### 冒頭まとめ文のNGフレーズ

記事冒頭の悩みパート直後に置く「まとめ文」では、以下のフレーズを **使用しない**：

| NG表現 | 理由 |
|---|---|
| `1つでも当てはまるなら、この記事はあなたのために書いた。` | 押しつけがましく昭和のセールスコピー感が強い。「あなた」への直接的な呼びかけが距離感として近すぎる |
| `〜は必読です。` / `絶対に〜すべき。` | 読者への命令調 |
| `これを知らないと損する。` | 煽り調 |

### 推奨する代替表現（ですます調）

読者判断を尊重したニュートラルな表現に置き換える：

- **推奨:** `1つでも当てはまるなら、この記事は最後まで読む価値があります。`
- **推奨:** `1つでも当てはまるなら、このまま読み進めてみてください。`
- **推奨:** `1つでも当てはまるなら、この記事がきっと役に立つはずです。`

**方針:** 焦点を「あなた(読者)」ではなく「記事の価値」側に寄せ、読者が自分で判断する形にする。命令・断定・煽りではなく、提案・示唆のトーンを使う。

---

## note-edit との連携

生成された `_generated.md` ファイルは `/note-edit` スキルでそのまま note.com に投稿可能。

ワークフロー: `/buzzblog` → `/note-edit {generated_file_path}`

---

## Version History

- ver 0.3 / 2026-05-03 / 挿絵（H2 直下）のみ Gemini に戻す。テキストなしの抽象イラストは Gemini の方が色彩・構図のまとまりが良いため。サムネ・図解は gpt-image-2 維持
- ver 0.2 / 2026-05-03 / 画像生成モデルを `gemini-3-pro-image-preview` から **`gpt-image-2`** （OpenAI、CJK文字99%以上の精度）に切替。サムネイル・挿絵・図解の3種別すべて gpt-image-2 をデフォルトにし、Gemini はフォールバックに降格。Step 8（図解生成）を新設。APIキーは `data.json` の `openaiApiKey` フィールドから読み込む方式に統一
- ver 0.1 / 2025-12-12 / 初版。BuzzBlog Generator のワークフロー定義
