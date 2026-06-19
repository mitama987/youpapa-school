import Link from "next/link";
import type { Metadata } from "next";
import { NoteGuideShell } from "@/components/NoteGuideShell";
import { Pager } from "@/components/Pager";
import { GuideSection } from "@/components/GuideSection";

export const metadata: Metadata = {
  title: "FAQ・トラブルシュート｜note集客スキルのよくあるエラー",
  description:
    "BuzzBlog / note-edit のよくあるエラーと対処。エディタが見つからない・APIキー未設定・402/429・日本語化け・サムネ比率・未ログインなどを解決します。",
};

export default function FaqPage() {
  return (
    <NoteGuideShell>
      <div className="crumbs">
        <Link href="/">講座一覧</Link> ＞ <Link href="/courses/note-shukyaku">note集客</Link> ＞ FAQ・トラブル
      </div>
      <div className="card">
        <span className="eyebrow">⑤ FAQ・トラブルシュート</span>
        <h1>よくあるエラーと対処</h1>
        <p className="lead">多くは「未ログイン」か「キー未設定」が原因です。まずそこを確認してください。</p>

        <h2>note-edit（投稿）</h2>
        <GuideSection title="「エディタが見つかりません」と出る" level={3}>
          <p>
            ほぼ note.com に<strong>未ログイン</strong>です。Claude in Chrome が操作するブラウザで note.com にログイン済みか確認してください（<Link href="/courses/note-shukyaku/note">④ note投稿設定</Link>）。ログイン済みでも出る場合は、ページ読み込みの完了前に操作した可能性があるので、少し待って再実行します。
          </p>
        </GuideSection>
        <GuideSection title="note.comを開くと Access Denied になる" level={3}>
          <p>
            <code>editor.note.com</code> へ直接アクセスすると拒否されます。必ず <code>note.com/notes/new</code> 経由で開いてください（スキルはこの経路で動作します）。
          </p>
        </GuideSection>
        <GuideSection title="他人の名前・リンクで投稿されてしまう" level={3}>
          <p>
            あいさつ文・CTAリンクの差し替え漏れです。<Link href="/courses/note-shukyaku/note">④ note投稿設定</Link> の表に従い、<code>youpapa</code> を自分の情報へ変更してください。
          </p>
        </GuideSection>
        <GuideSection title="表（テーブル）が消える・崩れる" level={3}>
          <p>note.comはテーブル記法に対応していないため、表は箇条書きへ自動変換される仕様です。崩れではありません。</p>
        </GuideSection>

        <h2>画像生成（BuzzBlog）</h2>
        <GuideSection title="APIキーが見つからない／未設定エラー" level={3}>
          <p>
            <code>.env</code> または <code>data.json</code> にキーが入っているか確認します。スクリプトは「環境変数 → <code>data.json</code>」の順に探します。<Link href="/courses/note-shukyaku/api">③ API設定</Link> の確認コマンドで読み込み状況を確かめてください。
          </p>
        </GuideSection>
        <GuideSection title="402（課金）や 429（レート制限）が出る" level={3}>
          <p>
            OpenAIの支払い設定切れ、またはレート上限です。支払い方法を確認するか、しばらく待って再試行します。402/429のとき画像生成は <code>gemini-3-pro-image-preview</code> に自動フォールバックするので、Geminiキーも入れておくと安心です。
          </p>
        </GuideSection>
        <GuideSection title="画像の日本語が文字化けする" level={3}>
          <p>
            日本語を含むサムネ・図解は <code>gpt-image-2</code> を使ってください（日本語精度が高い）。<code>gemini-2.5-flash-image</code> は化けるため使用禁止です。文字なしの抽象イラスト（挿絵）は <code>gemini-3-pro-image-preview</code> でOKです。
          </p>
        </GuideSection>
        <GuideSection title="サムネの比率がおかしい・縦に間延びする" level={3}>
          <p>
            note推奨は <strong>1280×670（≒1.91:1）</strong>です。<code>1536x1024</code> で生成 → 中央を 1.91:1 にクロップ → 1280×670 へ縮小、の手順になっているか確認してください。
          </p>
        </GuideSection>
        <GuideSection title="サムネが自動でアップロードされない" level={3}>
          <p>
            仕様です。ブラウザのセキュリティ制限でファイル選択ダイアログは自動化できません。案内されたフルパスを「画像を追加 → 画像をアップロード」から手動で選択してください。
          </p>
        </GuideSection>

        <h2>環境・スキル</h2>
        <GuideSection title="note-preview が動かない" level={3}>
          <p>
            依存が未インストールです。プロジェクトルートで <code>uv sync</code> を実行してください（<code>pyyaml</code> / <code>jinja2</code> が入ります）。Pythonは必ず <code>uv run</code> 経由で実行します。
          </p>
        </GuideSection>
        <GuideSection title={<>スキルが <code>/</code> 候補に出てこない</>} level={3}>
          <p>
            スキルフォルダ（<code>SKILL.md</code>）の配置先を確認してください。note-edit / note-preview はプロジェクトの <code>.claude/skills/</code>、buzzblog は <code>~/.claude/skills/buzzblog/</code> です。配置後は Claude Code を再起動します。
          </p>
        </GuideSection>
        <GuideSection title="ブラウザ操作が反応しない" level={3}>
          <p>
            <strong>Claude in Chrome</strong>（<code>/chrome</code> で接続）が Claude Code に繋がっているか、対象タブが note.com を開いているかを確認してください。
          </p>
        </GuideSection>
        <GuideSection title="Playwright や Chrome DevTools MCP は必要？" level={3}>
          <p>
            <strong>不要</strong>です。note-edit が使うのは <strong>Claude in Chrome</strong>（Claude Code で <code>/chrome</code> を実行して接続）だけで、Playwright や Chrome DevTools MCP では動きません。
            <strong>VSCode拡張でもターミナルでも</strong>、Claude in Chrome が1つ繋がっていれば使えます。接続手順は <Link href="/courses/note-shukyaku/setup">② 導入</Link> の「ブラウザ操作を繋ぐ」を参照してください。
          </p>
        </GuideSection>

        <div className="callout note">
          <div className="label">それでも解決しないとき</div>
          各スキルの <code>SKILL.md</code> に詳細なエラー対処（note-edit のパターン集・禁止事項など）が載っています。note側のUI変更でセレクタがずれた場合も、そちらの「エラー対処」節を参照してください。
        </div>
      </div>

      <Pager
        prev={{ href: "/courses/note-shukyaku/note", label: "← ④ note投稿設定" }}
        next={{ href: "/courses/note-shukyaku", label: "コーストップへ戻る →" }}
      />
    </NoteGuideShell>
  );
}
