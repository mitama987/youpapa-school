# Handoff: シクミ 講座一覧ページ リデザイン

## Overview
学習プラットフォーム「シクミ」(https://shikumi-lake.vercel.app/) の講座一覧ページのリデザイン。
サイドバー付きダッシュボード型レイアウトで、講座の全体像・学習ロードマップ・進捗を一画面で把握できる構成。

## About the Design Files
このバンドル内のファイルは **HTMLで作成されたデザインリファレンス** です。見た目と挙動を示すプロトタイプであり、そのまま本番コードとして使うものではありません。
タスクは、このデザインを対象コードベースの既存環境（Next.js / React / Vue など。shikumi-lake は Vercel ホスティングのため Next.js の可能性が高い）の既存パターン・ライブラリで **再実装** することです。環境が未定なら最適なフレームワークを選んで実装してください。

- `Shikumi App.dc.html` — メインのデザインファイル。HTML テンプレート（インラインスタイル）+ ロジッククラス（JS）で構成。`<x-dc>` 内のマークアップとスタイル値がデザインの正であり、そのまま読み取れます。
- `tokens.css` — デザイントークン（CSS カスタムプロパティ、light/dark 両テーマ）。実装でもこのまま利用可能。
- `image-slot.js` — プロトタイプ用の画像プレースホルダー。実装では通常の `<img>` に置き換えてください。

## Fidelity
**High-fidelity (hifi)**。色・タイポグラフィ・余白・角丸・シャドウはすべて最終値。ピクセル単位で忠実に再現してください。

## Screens / Views

### 講座一覧（1画面のみ）
2カラムグリッド: `grid-template-columns: 240px 1fr`。全体背景 `--bg-surface`（白）。

#### 左サイドバー（240px, sticky, height:100vh, overflow-y:auto）
- 背景 `--accent-soft`（クリーム）、右ボーダー `1px solid --border-subtle`、padding `20px 16px`
- ロゴ: 28px 角丸8px のオレンジ四角（`--accent` 背景、白文字「シ」）+「シクミ」19px/700
- ナビ項目: ホーム / 講座一覧（アクティブ）/ ツール一覧 / 記事 / 掲示板
  - 各項目: `padding:10px 12px; border-radius:8px; font-size:14px;` + Lucide 18px アイコン、gap 12px
  - アクティブ: 背景 `--bg-surface`（白）+ `--shadow-xs`、文字 `--accent-soft-fg`/600
  - 非アクティブ: 文字 `--fg-2`/500、hover で背景 `--bg-sunken`
- 学習ロードマップ: 見出し「学習ロードマップ」11px/600/letter-spacing 0.08em/`--fg-3`
  - 4項目（01 リサーチする / 02 商品をつくる / 03 販売する / 04 集客する）
  - 番号バッジ 26px 円形。現在ステップ: `--accent` 背景+白文字。未到達: `--bg-sunken` 背景+`--fg-3`
  - 項目間を 2px×14px の縦線（`--border-subtle`）で接続
- 下部（margin-top:auto）: 学習進捗ラベル+「20%」、プログレスバー（6px、pill、トラック `--bg-sunken`、フィル `--accent`）、「LINEで相談する」ボタン（枠線ボタン + 緑 `--success` の L バッジ）

#### メインコンテンツ（max-width:980px、padding:32px 40px 48px、セクション間 gap:40px）
1. **ページヘッダー**: 「講座一覧」26px/700。右側にテーマ切替ボタン（36px、枠線、Lucide moon）とアバター（36px 円形、イニシャル「T」）
2. **ヒーローカード**（基礎講座）: カード `--bg-surface`/border `--border-subtle`/radius 16px/`--shadow-sm`/padding 32px。grid `1fr 300px` gap 32px
   - チップ「まずはここから」: `--accent-soft` 背景、`--accent-soft-fg` 文字、12px/600、pill
   - 見出し「副業×AI×自動化で\n月10万を目指す基礎講座」28px/700/line-height 1.45
   - 説明文 14px/`--fg-2`/line-height 1.7
   - 進捗: 「進捗 20%」+ バー（max-width 220px、フィル `--accent`）
   - 右列: 画像 300×180 radius 12px + CTA「続きから学ぶ ›」（高さ48px、`--accent` 背景、hover `--accent-hover`、白文字 15px/600、radius 8px）
3. **学習の流れ**: 見出し 20px/700。カード内に3ステップの横並びステッパー
   - ステップ円 36px。ステップ1: `--accent` 背景+白。2・3: `--bg-sunken` 背景+ `--border-default` 枠+`--fg-2`
   - 円の間を 2px の水平線（`--border-subtle`、flex:1）で接続
   - ラベル: 基礎を学ぶ / 商品をつくる / 集客・販売する（13px）
   - 下部キャプション 13px/`--fg-3`/中央揃え
4. **すべての講座**: 見出し 20px/700 + フィルターチップ行 + カードグリッド
   - チップ: すべて / 商品づくり / 販売 / 集客。高さ38px、pill、13px/600
     - 選択中: `--accent` 背景+白。非選択: `--bg-surface` 背景+`--border-default` 枠+`--fg-2`
     - クリックでカードを絞り込み
   - 講座カード: 2カラムグリッド gap 16px。カード内は grid `132px 1fr` gap 18px、padding 18px、radius 12px、`--shadow-sm`、hover `--shadow-md`
     - サムネイル 132×100 radius 8px
     - タイトル 15px/600、説明 13px/`--fg-2`、メタ（「全6レッスン ・ 約90分」）12px/`--fg-3`、「詳しく見る →」13px/600
   - 講座データ: Webアプリ作成講座(商品づくり) / LP作成講座(販売) / SNS集客講座(集客) / YouTube作成講座(集客) / note基礎講座(集客) / Xポスト自動生成スキル(集客)
5. **ツール案内バナー**: `--accent-soft` 背景、radius 12px。Lucide wrench 24px + 「必要なツールをお探しですか？」15px/600 + 白背景枠線ボタン「ツール一覧を見る →」(https://sns-tools-market.vercel.app/)
6. **フッター**: 上ボーダー、12px/`--fg-3`。© 表記 + 利用規約 / プライバシーポリシー / お問い合わせ

## Interactions & Behavior
- フィルターチップ: クリックで選択状態が切り替わり、講座カードをカテゴリで絞り込み（「すべて」で全件）
- テーマ切替: ヘッダーの moon ボタンで light/dark をトグル（`data-theme` 属性を `<html>` に付与。tokens.css が両テーマを定義済み）
- カード hover: `--shadow-sm` → `--shadow-md`（transition 140ms）。ボタン hover: 背景を1段階濃く（`--accent` → `--accent-hover`）。サイズ変化は禁止
- ナビ hover: 背景 `--bg-sunken`
- フォーカス: キーボードフォーカスに 3px ブルーリング `--shadow-focus` を常時表示

## State Management
- `theme: 'light' | 'dark'`（デフォルト light。永続化するなら localStorage）
- `filter: string`（デフォルト「すべて」）
- 学習進捗（20%、現在ステップ）は将来的にユーザーデータから取得。現状はハードコードのモック値

## Design Tokens
`tokens.css` が正。主要値:
- アクセント: `--accent` #F0644A (coral-500) / hover #D94E36 / `--accent-soft` #FEF1EE / `--accent-soft-fg` #A03723
- テキスト: `--fg-1` #1A1D23 / `--fg-2` #4A4F5A / `--fg-3` #6E7480
- 背景: `--bg-surface` #FFFFFF / `--bg-sunken` #F1F3F6 / `--bg-app` #F7F8FA
- ボーダー: `--border-subtle` #E5E8EC / `--border-default` #D3D8DE
- ステータス: `--success` #22A06B
- radius: 8px(ボタン・入力) / 12px(カード) / 16px(大カード) / pill
- シャドウ: `--shadow-xs`〜`--shadow-md`（2層・低不透明度の黒。色付きシャドウ禁止）
- フォント: Inter + "Noto Sans JP"（見出しも本文もサンセリフ。見出しは 700）
- モーション: 140ms(hover) / 220ms(entrance)、ease-out。バウンス禁止

※ 正確な hex は tokens.css を参照してください（上記は代表値）。dark テーマの値も tokens.css に定義済み。

## Assets
- アイコン: Lucide (https://lucide.dev)、stroke 2px、currentColor。インライン SVG 推奨
- 画像: すべてプレースホルダー（image-slot）。実装時は実際の講座サムネイル画像に置き換え
- ロゴ: プレースホルダー（オレンジ角丸四角+「シ」）。実ロゴがあれば差し替え

## Files
- `Shikumi App.dc.html` — デザイン本体（マークアップ+ロジック）
- `tokens.css` — デザイントークン（light/dark）
- `image-slot.js` — プロトタイプ用画像プレースホルダー（実装対象外）
