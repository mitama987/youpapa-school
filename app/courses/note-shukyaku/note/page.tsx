import Link from "next/link";
import type { Metadata } from "next";
import { NoteGuideShell } from "@/components/NoteGuideShell";
import { CodeBlock } from "@/components/CodeBlock";
import { Pager } from "@/components/Pager";

export const metadata: Metadata = {
  title: "note投稿設定｜note IDの差し替えとログイン（アクセス権限）",
  description:
    "note.com投稿のための設定。自分のnote ID（アカウント）への差し替え箇所と、パスワードを保存しないログインセッション方式、投稿フロー、サムネの手動アップロードまでを解説します。",
};

export default function NoteSetupPage() {
  return (
    <NoteGuideShell>
      <div className="crumbs">
        <Link href="/">講座一覧</Link> ＞ <Link href="/courses/note-shukyaku">note集客</Link> ＞ note投稿設定
      </div>
      <div className="card">
        <span className="eyebrow">④ note投稿設定</span>
        <h1>note.comへ投稿する設定</h1>
        <p className="lead">
          設定は2つ。<strong>(a) 自分のnote ID（アカウント）への差し替え</strong>と、
          <strong>(b) パスワード／アクセス権限の扱い</strong>です。後者は仕組みが少し独特なので丁寧に説明します。
        </p>

        <h2>(a) ノートのID（アカウント）の差し替え</h2>
        <p>
          配布版のスキルは、あいさつ文・note ID・CTAリンクが <code>&lt;あなたの…&gt;</code> の<strong>プレースホルダ</strong>になっています。これを自分の値にします（そのままだと投稿時にプレースホルダのまま入ってしまいます）。
        </p>
        <div className="gtable">
          <table>
            <thead>
              <tr><th>プレースホルダ</th><th>意味</th><th>あなたの値の例</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><code>&lt;あなたのあいさつ文…&gt;</code></td>
                <td>記事の冒頭に自動で入る自己紹介</td>
                <td>こんにちは！副業ブロガーのタローです。</td>
              </tr>
              <tr>
                <td><code>&lt;あなたのnote ID&gt;</code></td>
                <td>note.com のアカウントID（URLの note.com/●●●）</td>
                <td><code>taro-blog</code></td>
              </tr>
              <tr>
                <td><code>&lt;あなたのCTA記事URL&gt;</code></td>
                <td>記事末尾などで誘導したい自分のnote記事URL</td>
                <td><code>https://note.com/taro-blog/n/xxxx</code></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="callout note">
          <div className="label">設定の仕方（どちらでもOK）</div>
          <strong>かんたん</strong>：初回に Claude へ口頭で伝える（例:「note IDは taro-blog、あいさつ文は『こんにちは！タローです。』で」）。
          <strong>しっかり</strong>：プラグイン同梱の <code>config.example.md</code> を見て値を決め、各スキルのプレースホルダを置き換える。
        </div>

        <h2>(b) パスワード／アクセス権限の正体</h2>
        <div className="callout warn">
          <div className="label">パスワードはどこにも保存しません</div>
          note-edit は note.com の<strong>ID・パスワードを設定ファイルに保存しません</strong>。代わりに、<strong>あなたがブラウザで note.com にログインした状態（セッション）をそのまま借りて</strong>投稿します。つまり「アクセス権限」＝「投稿前にブラウザで note.com にログインしておくこと」です。
        </div>
        <p>ID・パスワードを使う場所は <strong>note.comの公式ログイン画面だけ</strong>。スキルや設定ファイルにパスワードを書く必要はありません（書いてもいけません）。</p>
        <ul>
          <li>事前準備で接続した <strong>Claude in Chrome</strong>（<code>/chrome</code> で接続）が操作するブラウザを開く</li>
          <li>そのブラウザで <a href="https://note.com/login" target="_blank" rel="noopener">note.com</a> に自分のID・パスワードでログイン（ここが唯一パスワードを入れる場所）</li>
          <li>ログアウトしないでおけば、以降 note-edit はそのセッションで投稿できる</li>
        </ul>
        <div className="callout warn">
          <div className="label">未ログインだと失敗します</div>
          ログインしていない状態で <code>/note-edit</code> を実行すると「エディタが見つかりません」になります。実行前に必ずログイン済みか確認してください。
        </div>

        <h2>投稿の流れ</h2>
        <p>準備ができたら、生成済みのMarkdownを渡すだけです。</p>
        <CodeBlock label="投稿コマンド" code={"/note-edit <記事MDファイルのパス>"} />
        <ul>
          <li>フロントマター（title・tags）と本文を解析</li>
          <li><code>note.com/notes/new</code> を開き、タイトルと本文を書式付きで流し込み</li>
          <li>見出し・箇条書き（中黒＋引用ブロック）・コードブロック・冒頭あいさつ文を自動適用</li>
          <li>下書きとして<strong>一時保存</strong>。公開は指示したときだけ（投稿ボタンの前に必ず確認します）</li>
        </ul>
        <div className="callout note">
          <div className="label">先にプレビューも可能</div>
          仕上がりを確認したいときは <code>uv run note-preview &quot;&lt;MDパス&gt;&quot;</code> で note.com風のHTMLをローカル表示できます。
        </div>

        <h2>サムネイルは手動アップロード</h2>
        <p>
          アイキャッチ画像は<strong>ブラウザのセキュリティ制限で自動アップロードできません</strong>。note-edit が画像のフルパスを案内するので、手動でアップロードします（推奨サイズ 1280×670）。
        </p>
        <ul>
          <li>エディタ上部の「画像を追加」→「画像をアップロード」→ 案内されたファイルを選択</li>
          <li>旧サムネがある場合は先に削除してから差し替え</li>
        </ul>

        <h2>注意点</h2>
        <ul>
          <li><code>editor.note.com</code> へ直接アクセスすると Access Denied。必ず <code>note.com/notes/new</code> 経由で開きます（スキルはこの経路で動作）。</li>
          <li>note.comはテーブル記法に未対応のため、表は箇条書きへ自動変換されます。</li>
        </ul>

        <div className="callout note">
          <div className="label">次のステップ</div>
          うまくいかないときは <Link href="/courses/note-shukyaku/faq">⑤ FAQ・トラブルシュート</Link> を確認してください。
        </div>
      </div>

      <Pager
        prev={{ href: "/courses/note-shukyaku/api", label: "← ③ API設定" }}
        next={{ href: "/courses/note-shukyaku/faq", label: "⑤ FAQ →" }}
      />
    </NoteGuideShell>
  );
}
