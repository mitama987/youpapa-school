import Link from "next/link";
import type { Metadata } from "next";
import { NoteGuideShell } from "@/components/NoteGuideShell";
import { CodeBlock } from "@/components/CodeBlock";
import { Pager } from "@/components/Pager";

export const metadata: Metadata = {
  title: "API設定（画像生成）｜gpt-image-2 / Gemini のキー設定",
  description:
    "BuzzBlogの画像生成に使うAPIキーの設定。OpenAI(gpt-image-2)とGemini、GPTキー=OpenAIキーの誤解防止、data.json と .env の2方式、モデルの使い分けをプレースホルダ付きで解説します。",
};

const DATA_JSON = `{
  "openaiApiKey": "sk-REPLACE_ME",
  "openaiImageModel": "gpt-image-2",
  "apiKey": "AIza-REPLACE_ME"
}`;

const ENV_EXAMPLE = `OPENAI_API_KEY=sk-REPLACE_ME
OPENAI_IMAGE_MODEL=gpt-image-2
GEMINI_API_KEY=AIza-REPLACE_ME`;

const CHECK_CMD = `uv run python -c "import os; print('OpenAI:', 'OK' if os.environ.get('OPENAI_API_KEY') else 'なし'); print('Gemini:', 'OK' if os.environ.get('GEMINI_API_KEY') else 'なし')"`;

export default function ApiSetupPage() {
  return (
    <NoteGuideShell>
      <div className="crumbs">
        <Link href="/">講座一覧</Link> ＞ <Link href="/courses/note-shukyaku">note集客</Link> ＞ API設定
      </div>
      <div className="card">
        <span className="eyebrow">③ API設定（画像生成）</span>
        <h1>画像生成APIのキーを設定する</h1>
        <p className="lead">
          つまずきやすいのは「画像サムネイル用API」と「GPTのAPIキー」の関係です。最初にそこを整理します。
        </p>

        <h2>使うキーは最大2つ</h2>
        <div className="callout note">
          <div className="label">「GPTのAPIキー」＝「画像用API」＝ OpenAIキー（同じ1つ）</div>
          記事の文章は <strong>Claude が生成</strong>します。OpenAIのGPT（チャットAPI）は使いません。OpenAIキーが要るのは
          <strong>画像（サムネ・図解）の生成だけ</strong>。つまり「サムネ用API」と「GPTキー」は別物ではなく、<strong>同じ OpenAIキー1本</strong>です。
        </div>
        <div className="gtable">
          <table>
            <thead>
              <tr><th>キー</th><th>サービス</th><th>用途</th><th>必須度</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>OpenAI APIキー</strong></td><td>OpenAI（<code>gpt-image-2</code>）</td><td>サムネ・図解の生成</td><td>画像を使うなら必須</td></tr>
              <tr><td><strong>Gemini APIキー</strong></td><td>Google（<code>gemini-3-pro-image-preview</code>）</td><td>挿絵・画像のフォールバック</td><td>任意</td></tr>
            </tbody>
          </table>
        </div>

        <h2>APIキーの取得</h2>
        <ul>
          <li><strong>OpenAI</strong>：<a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener">platform.openai.com</a> で発行（画像APIは課金設定が必要）。モデルは <code>gpt-image-2</code>。</li>
          <li><strong>Google Gemini</strong>：<a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Google AI Studio</a> で発行（無料枠あり）。モデルは <code>gemini-3-pro-image-preview</code>。</li>
        </ul>
        <div className="callout warn">
          <div className="label">キーは絶対に公開しない</div>
          発行したキーは <code>.env</code> か <code>data.json</code> にだけ書き、公開リポジトリにコミットしないでください（<code>.env</code>・<code>data.json</code> は <code>.gitignore</code> 済み）。漏れたら各サービスで即無効化（ローテーション）します。
        </div>

        <h2>モデルの使い分け</h2>
        <div className="gtable">
          <table>
            <thead>
              <tr><th>画像の種類</th><th>用途</th><th>モデル</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>サムネイル</strong></td><td>タイトル・バッジなど文字多め</td><td><code>gpt-image-2</code>（日本語が崩れにくい）</td></tr>
              <tr><td><strong>図解</strong></td><td>比較表・フローチャート</td><td><code>gpt-image-2</code></td></tr>
              <tr><td><strong>挿絵（H2直下）</strong></td><td>文字なしの抽象イラスト</td><td><code>gemini-3-pro-image-preview</code></td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>OpenAI側で課金エラー（402）やレート制限（429）が出ると、画像生成は自動でGeminiにフォールバックします。</li>
          <li>サムネは <code>1536x1024</code> で生成 → 中央を 1.91:1 にクロップ → <code>1280×670</code>（note推奨）へ縮小します。</li>
          <li><code>gemini-2.5-flash-image</code> は日本語が化けるため使いません。</li>
        </ul>

        <h2>キーの入れ方（2方式）</h2>
        <p>スクリプトは「環境変数 → <code>data.json</code>」の順に探します。どちらか一方でOK。両方ある場合は環境変数（<code>.env</code>）が優先されます。</p>

        <h3>方式A：data.json（Obsidianプラグイン設定）</h3>
        <div className="cmd">
          <code>&lt;Vault Root&gt;\.obsidian\plugins\buzzblog-generator\data.json</code>
        </div>
        <CodeBlock label="data.json（プレースホルダ）" code={DATA_JSON} />
        <div className="callout warn">
          <div className="label">フィールド名の注意</div>
          <code>openaiApiKey</code> = OpenAIキー、<code>apiKey</code> = <strong>Geminiキー</strong>（名前が紛らわしいので取り違え注意）。<code>openaiImageModel</code> は <code>gpt-image-2</code> のまま変えないでください。
        </div>

        <h3>方式B：.env（プロジェクトルート）</h3>
        <CodeBlock label=".env（プレースホルダ）" code={ENV_EXAMPLE} />

        <h2>テンプレートのダウンロード</h2>
        <p>値を自分のキーに置き換えて使ってください（<strong>実キーは記載していません</strong>）。</p>
        <div className="dl-row">
          <a className="btn btn-ghost btn-sm" href="/skills-guide/templates/data.json.example" download>data.json.example</a>
          <a className="btn btn-ghost btn-sm" href="/skills-guide/templates/env.example.txt" download>env.example.txt（.env として保存）</a>
        </div>
        <p>記事生成のプロンプト雛形（任意・<code>&lt;Vault Root&gt;\80_ブログ作成ガイド\プロンプト\</code> に配置）も用意しています。</p>
        <div className="dl-row">
          <a className="btn btn-ghost btn-sm" href="/skills-guide/templates/prompt-記事タイトル生成.md" download>プロンプト：記事タイトル生成</a>
          <a className="btn btn-ghost btn-sm" href="/skills-guide/templates/prompt-ブログ生成.md" download>プロンプト：ブログ生成</a>
          <a className="btn btn-ghost btn-sm" href="/skills-guide/templates/prompt-サムネイル生成.md" download>プロンプト：サムネイル生成</a>
        </div>

        <h2>設定の確認</h2>
        <p>キーが読み込めるかだけを安全に確認します（キー本体は表示しません）。</p>
        <CodeBlock label="キー読み込みチェック" code={CHECK_CMD} />

        <div className="callout note">
          <div className="label">次のステップ</div>
          画像生成の準備ができたら <Link href="/courses/note-shukyaku/note">④ note投稿設定</Link> へ進みます。
        </div>
      </div>

      <Pager
        prev={{ href: "/courses/note-shukyaku/setup", label: "← ② 事前準備" }}
        next={{ href: "/courses/note-shukyaku/note", label: "④ note投稿設定 →" }}
      />
    </NoteGuideShell>
  );
}
