import Link from "next/link";
import type { Metadata } from "next";
import { NoteGuideShell } from "@/components/NoteGuideShell";
import { CodeBlock } from "@/components/CodeBlock";
import { Pager } from "@/components/Pager";

export const metadata: Metadata = {
  title: "導入：全体像と事前準備｜note集客の自動化スキル",
  description:
    "BuzzBlog と note-edit を動かすための土台づくり。必要なもの早見表、Claude Code / uv / ブラウザ自動化MCP、スキル本体（フォルダ）の配置までを順に整えます。",
};

export default function SetupPage() {
  return (
    <NoteGuideShell>
      <div className="crumbs">
        <Link href="/">講座一覧</Link> ＞ <Link href="/courses/note-shukyaku">note集客</Link> ＞ 導入：事前準備
      </div>
      <div className="card">
        <span className="eyebrow">② 導入：全体像と事前準備</span>
        <h1>スキルを動かす準備をする</h1>
        <p className="lead">
          ここから実際にスキルを導入します。まず全体像と「必要なもの」を確認し、実行環境・ブラウザMCP・スキル本体の配置までを整えます。
        </p>

        <h2>標準ワークフロー</h2>
        <p>2つのスキルは連携して使います。基本はこの流れです。</p>
        <ul>
          <li><code>/buzzblog &lt;メモ&gt;</code> … メモから記事本文＋画像を生成し <code>_generated.md</code> を出力</li>
          <li><code>/note-edit &lt;_generated.md&gt;</code> … その記事をnote.comへ書式付きで投稿（下書き保存）</li>
        </ul>

        <h2>必要なもの早見表</h2>
        <ul className="req-list">
          <li><b>Claude Code</b> ― スキルの実行環境<span className="rt need">必須</span></li>
          <li><b>uv ＋ Python 3.12+</b> ― 画像生成・プレビューの実行<span className="rt need">必須</span></li>
          <li><b>ブラウザ自動化MCP</b>（agent-browser / Chrome MCP）― note-edit の投稿操作<span className="rt need">必須</span></li>
          <li><b>note.com アカウント</b> ― 投稿先（ブラウザでログイン済みに）<span className="rt need">必須</span></li>
          <li><b>OpenAI APIキー</b>（gpt-image-2）― サムネ・図解の生成<span className="rt opt">任意</span></li>
          <li><b>Gemini APIキー</b> ― 挿絵・画像のフォールバック<span className="rt opt">任意</span></li>
        </ul>
        <div className="callout note">
          <div className="label">画像を使わないなら</div>
          画像生成が不要なら API キーの設定は省略できます（テキストだけ生成）。note投稿だけ使いたい場合は note-edit だけでもOKです。
        </div>

        <h2>1. 実行環境を整える</h2>
        <p>プロジェクト一式（スキル定義・<code>note_preview</code>・<code>scripts/blog_assets</code>）を受け取ったら、ルートで依存をインストールします。</p>
        <CodeBlock label="依存インストール" code={"uv sync"} />
        <p>これで <code>openai</code> / <code>pillow</code> / <code>python-dotenv</code> / <code>pyyaml</code> / <code>jinja2</code> が入ります（<code>pyproject.toml</code> 定義済み）。Pythonは必ず <code>uv run</code> 経由で実行します。</p>
        <CodeBlock label="プレビュー動作確認" code={"uv run note-preview --help"} />

        <h2>2. スキル本体（フォルダ）を配置する</h2>
        <p><code>SKILL.md</code> が入ったフォルダごと、次の場所にコピーします。</p>
        <div className="gtable">
          <table>
            <thead>
              <tr><th>スキル</th><th>配置先</th><th>役割</th></tr>
            </thead>
            <tbody>
              <tr><td><code>note-edit/</code></td><td>プロジェクトの <code>.claude/skills/</code></td><td>note.comへの投稿</td></tr>
              <tr><td><code>note-preview/</code></td><td>プロジェクトの <code>.claude/skills/</code></td><td>投稿前のローカルプレビュー</td></tr>
              <tr><td><code>buzzblog/</code></td><td>グローバル <code>~/.claude/skills/buzzblog/</code></td><td>記事＋画像の生成</td></tr>
            </tbody>
          </table>
        </div>
        <p>配置後、Claude Code を再起動すると <code>/buzzblog</code> <code>/note-edit</code> <code>/note-preview</code> が候補に出ます。</p>

        <h2>3. ブラウザ自動化MCP（note-edit に必須）</h2>
        <p>
          note-edit は note.com のエディタをブラウザ操作で動かします。タブ取得・スナップショット・JS実行・クリック/入力を提供する MCP（<strong>agent-browser</strong> もしくは <strong>Chrome MCP</strong>）を Claude Code に接続してください。
        </p>
        <div className="callout warn">
          <div className="label">ログイン＝アクセス権限</div>
          note-edit は<strong>パスワードを保存しません</strong>。代わりにブラウザの note.com ログイン状態を使って投稿します。詳しくは <Link href="/courses/note-shukyaku/note">④ note投稿設定</Link> で説明します。
        </div>

        <div className="callout note">
          <div className="label">次のステップ</div>
          準備ができたら <Link href="/courses/note-shukyaku/api">③ API設定（画像生成）</Link> へ進みます。画像を使わない場合は <Link href="/courses/note-shukyaku/note">④ note投稿設定</Link> へ飛んでも構いません。
        </div>
      </div>

      <Pager
        prev={{ href: "/courses/note-shukyaku/method", label: "← ① note集客の方法" }}
        next={{ href: "/courses/note-shukyaku/api", label: "③ API設定 →" }}
      />
    </NoteGuideShell>
  );
}
