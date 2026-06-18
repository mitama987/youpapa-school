import Link from "next/link";
import type { Metadata } from "next";
import { NoteGuideShell } from "@/components/NoteGuideShell";
import { CodeBlock } from "@/components/CodeBlock";
import { Pager } from "@/components/Pager";

export const metadata: Metadata = {
  title: "導入：インストールと最初の設定｜note集客スキル",
  description:
    "PC初心者向け。Claude Codeにプラグインを3コマンドで入れて、note集客スキルを使えるようにする手順。コア（記事生成→note投稿）はPython不要。画像生成だけ任意でPythonを使います。",
};

const CMD_ADD = "/plugin marketplace add mitama987/youpapa-school";
const CMD_INSTALL = "/plugin install note-shukyaku@youpapa-tools";

export default function SetupPage() {
  return (
    <NoteGuideShell>
      <div className="crumbs">
        <Link href="/">講座一覧</Link> ＞ <Link href="/courses/note-shukyaku">note集客</Link> ＞ 導入：インストール
      </div>
      <div className="card">
        <span className="eyebrow">② 導入：インストールと最初の設定</span>
        <h1>スキルを入れて、使えるようにする</h1>
        <p className="lead">
          むずかしい準備は不要です。まずは <strong>Python なし</strong>で「記事を書く → note に投稿する」まで動かします。
          画像の自動生成だけ、あとから<strong>任意</strong>で足せます。
        </p>

        <div className="callout note">
          <div className="label">必要なものは2つ＋α</div>
          <strong>① Claude Code</strong>（このスキルを動かすアプリ）と <strong>② note.com アカウント</strong>。
          記事作成はこの2つで始められます。note への<strong>投稿</strong>には、加えてブラウザを動かす
          <strong> Claude in Chrome</strong>（次の手順で <code>/chrome</code> で接続）が必要です。
        </div>

        <h2>1. Claude Code を用意する</h2>
        <p>
          まだなら <a href="https://claude.com/claude-code" target="_blank" rel="noopener">Claude Code</a> をインストールしてログインします。
          以降のコマンドは、すべて Claude Code の入力欄に貼り付けて使います。
        </p>

        <h2>2. プラグインを入れる（コピペ3手）</h2>
        <p>Claude Code の入力欄に、次を1行ずつ貼って実行します（Git も黒い画面も不要）。</p>
        <CodeBlock label="① マーケットプレイスを追加" code={CMD_ADD} />
        <CodeBlock label="② プラグインをインストール" code={CMD_INSTALL} />
        <p>
          これで3つのスキルが入ります。<code>/</code> を押すと
          <code>/note-shukyaku:buzzblog</code>・<code>/note-shukyaku:note-edit</code>・<code>/note-shukyaku:note-preview</code> が出ます。
        </p>
        <div className="callout warn">
          <div className="label">出てこないとき</div>
          <code>/reload-plugins</code> を実行 → それでも出なければ Claude Code を一度閉じて開き直してください。
          一覧確認は <code>/plugin marketplace list</code>。
        </div>

        <h2>3. ブラウザ操作を繋ぐ（Claude in Chrome）</h2>
        <p>
          note-edit は note.com の編集画面を<strong>実際にブラウザで操作</strong>して投稿します。
          そのため「<strong>Claude in Chrome</strong>」という <strong>Chromeの拡張機能</strong>を、最初に1回だけ入れて Claude Code とつなぎます。
          覚えるコマンドは <code>/chrome</code> ひとつだけ。下の順番どおりにやれば大丈夫です。
        </p>

        <div className="callout warn">
          <div className="label">先に確認：有料プランが必要です</div>
          Claude in Chrome は Claude の<strong>有料プラン（Pro・Max など）</strong>で使えます。
          <strong>無料プランでは使えません</strong>。また Claude Code は <code>2.0.73</code> 以上にしておいてください（古いと <code>/chrome</code> が出ません）。
        </div>

        <ul className="howto">
          <li className="st" style={{ listStyle: "none" }}>
            <span className="no">1</span>
            <h3>Chrome（または Edge）を用意する</h3>
            <p>
              使えるブラウザは <strong>Google Chrome</strong> か <strong>Microsoft Edge</strong> です（Brave・Arc などは非対応）。
              ふだん Chrome を使っていれば、そのままでOKです。
            </p>
          </li>
          <li className="st" style={{ listStyle: "none" }}>
            <span className="no">2</span>
            <h3>拡張機能「Claude」をChromeに追加する</h3>
            <p>
              下のボタンから Chrome ウェブストアを開き、<strong>「Chromeに追加」</strong>を押すだけ。これは最初の1回だけの作業です。
            </p>
            <p>
              <a className="btn btn-ghost btn-sm" href="https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn" target="_blank" rel="noopener">
                Claude in Chrome を追加（Chromeウェブストア）
              </a>
            </p>
          </li>
          <li className="st" style={{ listStyle: "none" }}>
            <span className="no">3</span>
            <h3>Claude Code で <code>/chrome</code> を実行する</h3>
            <p>
              Claude Code の入力欄に <code>/chrome</code> と打って実行すると、さきほど入れた拡張機能とつながります。
              つながっているかの確認や、つなぎ直しも、すべてこの <code>/chrome</code> でできます。
              <strong>「mcp add」のような設定ファイルの追記は一切いりません。</strong>
            </p>
          </li>
          <li className="st" style={{ listStyle: "none" }}>
            <span className="no">4</span>
            <h3>note.com の操作を「許可」する</h3>
            <p>
              拡張機能の設定で、Claude が操作してよいサイトに <strong>note.com</strong> を許可します（サイトごとに1回だけ）。
              許可すると、note の投稿操作が自動でできるようになります。
            </p>
          </li>
        </ul>

        <div className="callout note">
          <div className="label">Playwright や Chrome DevTools MCP は不要です</div>
          note-edit が使うのは <strong>Claude in Chrome</strong>（拡張を入れて <code>/chrome</code> でつなぐ）だけです。
          Playwright や Chrome DevTools MCP は使いません。
          <strong>VSCode拡張版でもターミナル版でも同じ</strong>で、Claude in Chrome がつながっていれば動きます。
        </div>

        <h2>4. note.com にログインしておく（＝アクセス権限）</h2>
        <p>
          note-edit は<strong>パスワードを保存しません</strong>。Claude が操作するブラウザの
          <strong>ログイン状態</strong>を使って投稿します。投稿前に、そのブラウザで
          <a href="https://note.com/login" target="_blank" rel="noopener">note.com</a> にログインしておいてください。
          （ブラウザ操作には前手順の <strong>Claude in Chrome</strong>（<code>/chrome</code>）接続が必要です）
        </p>

        <h2>5. 最初に1回だけ「あなたの情報」を設定</h2>
        <p>あいさつ文・note ID・CTAリンクは、最初に1回だけ自分の値にします。むずかしければ、初回に Claude へ口頭で伝えるだけでOKです。</p>
        <ul>
          <li><strong>かんたん</strong>：「note IDは○○、あいさつ文は『こんにちは！△△です。』で」と Claude に伝える。</li>
          <li><strong>しっかり</strong>：プラグイン同梱の <code>config.example.md</code> を見て値を決めておく。</li>
        </ul>

        <div className="callout ok">
          <div className="label">ここまでで「記事 → 投稿」ができます（Python不要）</div>
          次の流れで使います。
        </div>

        <h2>使い方（基本の流れ）</h2>
        <ul className="howto">
          <li className="st" style={{ listStyle: "none" }}>
            <span className="no">1</span>
            <h3>記事を作る</h3>
            <p><code>/note-shukyaku:buzzblog &lt;メモのパス&gt;</code> → タイトル案から選ぶ → 本文が生成されます。</p>
          </li>
          <li className="st" style={{ listStyle: "none" }}>
            <span className="no">2</span>
            <h3>note に投稿</h3>
            <p><code>/note-shukyaku:note-edit &lt;生成された_generated.md&gt;</code> → 下書き保存まで自動。</p>
          </li>
        </ul>

        <h2>（任意）画像生成・プレビューを使う人だけ</h2>
        <p>
          サムネ・図解の<strong>自動生成</strong>や、投稿前の<strong>ローカルプレビュー</strong>を使う場合だけ、
          Python（uv）と APIキーが要ります。手順は <Link href="/courses/note-shukyaku/api">③ API設定（画像生成）</Link> にまとめました。
          <strong>使わないならスキップでOK</strong>です（画像は Canva 等で手動でも作れます）。
        </p>

        <h2>ダウンロード（プラグインを使わない場合）</h2>
        <p>
          コマンドを使いたくない場合は、zip をダウンロードして展開し、中の <code>skills/</code> にある
          各フォルダ（buzzblog / note-edit / note-preview）を <code>~/.claude/skills/</code> にコピーします。
        </p>
        <p>
          <a className="btn btn-ghost btn-sm" href="/skills-guide/note-shukyaku-skills.zip" download>note-shukyaku-skills.zip をダウンロード</a>
        </p>
      </div>

      <Pager
        prev={{ href: "/courses/note-shukyaku/method", label: "← ① note集客の方法" }}
        next={{ href: "/courses/note-shukyaku/api", label: "③ API設定（任意）→" }}
      />
    </NoteGuideShell>
  );
}
