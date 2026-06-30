import Link from "next/link";
import type { Metadata } from "next";
import { NoteGuideShell } from "@/components/NoteGuideShell";
import { CodeBlock } from "@/components/CodeBlock";
import { Pager } from "@/components/Pager";
import { GuideSection } from "@/components/GuideSection";

export const metadata: Metadata = {
  title: "導入：インストールと最初の設定｜note集客スキル",
  description:
    "PC初心者向け。Claude Codeにプラグインを入れて、note集客スキル（記事生成 buzzblog／note投稿 note-edit）を使えるようにする手順。WindowsはGit必須。記事生成はPython不要。note投稿はブラウザ自動操作（Chrome DevTools MCP）が必要（Claude Codeデフォルト非同梱）。",
};

const REPO = "mitama987/youpapa-school";
const CMD_ADD = "/plugin marketplace add mitama987/youpapa-school";
const CMD_INSTALL = "/plugin install note-shukyaku@youpapa-tools";
const LINE_URL = "https://lin.ee/ob91zIx";

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
          むずかしい準備は不要です。まずは <strong>Python なしで「記事を書く → note に投稿する」まで動かせます</strong>。
          画像の自動生成だけ、あとから任意で足せます。
        </p>

        <ul className="req-list">
          <li>
            <b>① Claude Code</b>（このスキルを動かすアプリ）
            <span className="rt need">必須</span>
          </li>
          <li>
            <b>② note.com アカウント</b>（投稿先）
            <span className="rt need">必須</span>
          </li>
          <li>
            <b>＋ Git for Windows</b>（Windowsの方・プラグイン追加に必要）
            <span className="rt need">Win必須</span>
          </li>
          <li>
            <b>＋ ブラウザ自動操作（Chrome DevTools MCP）</b>（note 投稿時のみ・Claude Codeデフォルト非同梱）
            <span className="rt opt">投稿に必要</span>
          </li>
        </ul>

        <GuideSection title="1. Claude Code を用意する" level={2} open={true}>
          <p>
            まだなら <a href="https://claude.com/claude-code" target="_blank" rel="noopener">Claude Code</a> をインストールしてログインします。
            以降のコマンドは、すべて Claude Code の入力欄に貼り付けて使います。
          </p>
        </GuideSection>

        <GuideSection title="2. プラグインを入れる" level={2}>
          <p>
            お使いの Claude Code に合わせて、どちらかの方法で入れます。
            <strong>VS Code 拡張版（画面右側のパネル）なら、黒い画面なしのボタン操作（A）が一番かんたん</strong>です。
          </p>

          <div className="callout warn">
            <div className="label">Windowsの方：先に「Git」を入れてください（重要）</div>
            <p>
              プラグインの追加（Marketplaces の <strong>Add</strong>）は、裏で <code>git</code> を使ってファイルを取得します。
              Git が入っていないと、Add のときに
              {" "}<code>Command &apos;git&apos; not found or is in an unsafe location（current directory）</code>{" "}
              のようなエラーで失敗します。
            </p>
            <ol style={{ margin: "8px 0 0", paddingLeft: "1.3em", listStyle: "decimal" }}>
              <li>
                <a href="https://git-scm.com/download/win" target="_blank" rel="noopener">Git for Windows</a>
                {" "}をダウンロードします（<strong>64-bit / x64版</strong>＝今の普通のPCはこれでOK。「x64」「amd64」は同じ意味です）。
              </li>
              <li>
                インストールは基本そのまま「Next」で進めて大丈夫です。
                途中の <strong>「Adjusting your PATH environment」</strong> 画面だけ、最初から選ばれている
                推奨の <strong>「Git from the command line and also from 3rd-party software」（真ん中）</strong> のままにしてください
                （一番下の「Bash only」を選ぶと認識されません）。
              </li>
              <li>
                <strong>入れ終わったら VS Code（Claude Code）を一度すべて閉じて、開き直してください。</strong>
                再起動しないと Git が認識されず、同じエラーが続きます。
                {" "}不安なときは PC ごと再起動が確実です。
              </li>
            </ol>
          </div>

          <h3 className="sub">A. VS Code 拡張版（推奨・ボタン操作）</h3>
          <ul className="howto">
            <li className="st">
              <span className="no">1</span>
              <h3>入力欄に <code>/manage</code> と打つ</h3>
              <p>
                入力欄に <code>/manage</code> と打つと、候補に <strong>「Manage plugins」</strong>が出ます。
                それを選ぶ（または <code>/manage plugins</code> まで打つ）と、プラグインの管理画面が開きます。
              </p>
              <figure className="shot narrow">
                <img
                  src="/skills-guide/note-shukyaku/step1-manage-plugins.png"
                  alt="入力欄に /manage と打つと候補に Manage plugins が表示される"
                  loading="lazy"
                />
                <figcaption><code>/manage</code> と打つと「Manage plugins」が候補に出ます</figcaption>
              </figure>
              <div className="callout warn">
                <div className="label">コマンドが見つからないとき</div>
                <code>/plugin</code> や <code>/plugins</code> ではなく、<strong><code>/manage</code></strong> です。
                候補が出ないときは Claude Code を一度閉じて開き直してください。
              </div>
            </li>
            <li className="st">
              <span className="no">2</span>
              <h3>「Marketplaces」タブで配布元を追加</h3>
              <p>
                上部の <strong>Marketplaces</strong> タブを開き、入力欄に次のリポジトリ名を貼り付けて、
                右の <strong>Add</strong> ボタンを押します。
              </p>
              <CodeBlock label="Marketplaces タブに貼る" code={REPO} />
              <figure className="shot">
                <img
                  src="/skills-guide/note-shukyaku/step2-add-repo.png"
                  alt="Marketplaces タブの入力欄に mitama987/youpapa-school を入れて Add を押す"
                  loading="lazy"
                />
                <figcaption>入力欄に <code>{REPO}</code> を貼って <strong>Add</strong> を押す</figcaption>
              </figure>
            </li>
            <li className="st">
              <span className="no">3</span>
              <h3><code>youpapa-tools</code> が一覧に出たか確認</h3>
              <p>
                一覧に <strong>youpapa-tools</strong>（<code>GitHub: mitama987/youpapa-school</code>）が出れば、配布元の登録は完了です。
                ただしこれは「お店を登録した」だけ。続けてプラグイン本体を入れます。
              </p>
              <figure className="shot">
                <img
                  src="/skills-guide/note-shukyaku/step3-added.png"
                  alt="Marketplaces 一覧に youpapa-tools（GitHub mitama987/youpapa-school）が追加された状態"
                  loading="lazy"
                />
                <figcaption>一覧に <strong>youpapa-tools</strong> が出れば配布元の登録は完了</figcaption>
              </figure>
            </li>
            <li className="st">
              <span className="no">4</span>
              <h3>「Plugins」タブで <code>note-shukyaku</code> を Install</h3>
              <p>
                上部の <strong>Plugins</strong> タブに切り替え、一覧（または検索）から <code>note-shukyaku</code> を見つけて
                <strong>Install</strong> を押します。スコープは <strong>「自分用（User）」</strong>でOKです。
              </p>
              <div className="callout warn">
                <div className="label">ここが一番のポイント</div>
                <strong>Marketplaces に追加しただけではスキルは使えません。</strong>
                この Plugins タブの <strong>Install</strong> まで必ず行ってください。
              </div>
            </li>
            <li className="st">
              <span className="no">5</span>
              <h3>再読み込みして反映</h3>
              <p>
                「再起動して反映」のバナーが出たら Claude Code を開き直す（または入力欄で <code>/reload-plugins</code> を実行）と、
                <code>/buzzblog</code>・<code>/note-edit</code>・<code>/note-preview</code> が使えるようになります。
              </p>
            </li>
          </ul>

          <h3 className="sub">B. ターミナル版（CLI）の人はこちら</h3>
          <div className="callout note">
            <div className="label">黒い画面（ターミナル）で動かしている人向け</div>
            <p>入力欄に次を1行ずつ貼って実行します（拡張版の「Manage plugins」画面と同じことをコマンドで行います）。</p>
            <CodeBlock label="① マーケットプレイスを追加" code={CMD_ADD} />
            <CodeBlock label="② プラグインをインストール" code={CMD_INSTALL} />
          </div>

          <p>
            どちらの方法でも、入れ終わると <code>/</code> を押すだけで
            <code>/buzzblog</code>・<code>/note-edit</code>・<code>/note-preview</code> が候補に出ます。
          </p>
          <div className="callout warn">
            <div className="label">候補に出てこないとき</div>
            まず Claude Code を一度閉じて開き直す（または <code>/reload-plugins</code>）。
            それでも出ない場合は——拡張版なら <code>/manage</code> →「Manage plugins」の <strong>Plugins</strong> タブで <code>note-shukyaku</code> が <strong>Install 済み</strong>か確認（<strong>Marketplaces への追加だけでは使えません</strong>）、
            ターミナル版なら <code>/plugin</code> で <code>note-shukyaku</code> がインストール済みか確認します。
          </div>
        </GuideSection>

        <GuideSection title="3. 使い方（基本の流れ）" level={2}>
          <p>
            プラグインが入ったら、基本はこの2ステップです。各スキルの詳しい説明はこの下に続きます。
          </p>
          <ul className="howto">
            <li className="st">
              <span className="no">1</span>
              <h3>記事を作る（Buzzblog）</h3>
              <p><code>/buzzblog &lt;Obsidianの記事（メモ）のパス&gt;</code> → タイトル案から選ぶ → 本文（<code>_generated.md</code>）が生成されます。</p>
            </li>
            <li className="st">
              <span className="no">2</span>
              <h3>note に投稿（note-edit）</h3>
              <p><code>/note-edit &lt;生成された_generated.md&gt;</code> → note.com に下書き保存まで自動。</p>
            </li>
          </ul>
          <div className="callout note">
            <div className="label">コマンド名について</div>
            候補には <code>/buzzblog</code>・<code>/note-edit</code>・<code>/note-preview</code> と表示されます
            （環境によっては <code>/note-shukyaku:buzzblog</code> のように名前空間付きで出ることもあります）。
          </div>
        </GuideSection>

        <GuideSection title="4. Buzzblog スキル ― 記事を作る" level={2}>
          <p>
            Obsidian などに書いた<strong>メモ（ネタ）を渡すと、日本語ブログ記事を生成</strong>するスキルです。
            タイトル候補10件から選び、本文まで作って <code>_generated.md</code> として保存します。<strong>Python は不要</strong>です。
          </p>
          <ul className="howto">
            <li className="st">
              <span className="no">1</span>
              <h3>メモのパスを付けて実行</h3>
              <p>
                <strong>引数に、元ネタになる Obsidian の記事（メモ）ファイルのパスが必要</strong>です。
              </p>
              <CodeBlock label="記事を生成する" code="/buzzblog <Obsidianの記事のパス>" />
              <p>例: <code>/buzzblog 02_note/ネタ帳/今日のメモ.md</code></p>
            </li>
            <li className="st">
              <span className="no">2</span>
              <h3>タイトルを選ぶ → 本文生成</h3>
              <p>
                タイトル候補が10件出るので選ぶと、本文が生成され <code>_generated.md</code> が作られます。
                このファイルを次の note-edit で投稿します。
              </p>
            </li>
          </ul>
          <div className="callout note">
            <div className="label">最初に1回だけ「あなたの情報」を設定</div>
            あいさつ文・note ID・CTAリンクは、最初に1回だけ自分の値にします。むずかしければ、初回に Claude へ
            口頭で伝えるだけでOKです（例:「note IDは○○、あいさつ文は『こんにちは！△△です。』で」）。
            しっかり決めたい場合はプラグイン同梱の <code>config.example.md</code> を参照してください。
          </div>
          <div className="callout note">
            <div className="label">画像（サムネ・図解）は任意</div>
            記事の自動画像生成を使う場合だけ、別途 Python（uv）と APIキーが要ります。
            使わなくても記事は作れます。詳しくは下の「（任意）画像生成・プレビュー」へ。
          </div>
          <div className="callout story">
            <div className="label">応用：自分の文体ルールがあれば「第二の脳」として使えます</div>
            <p>
              Buzzblog には「ですます調で統一」などの<strong>標準のライティングルール</strong>が入っています。
              ただし、<strong>あなた自身の文体・口調を学んだライティングルール</strong>
              （プロジェクトの <code>CLAUDE.md</code>・メモ・文体ガイドにまとめたものや、初回に Claude へ口頭で伝えたトーン）があれば、
              <strong>そちらが本スキルの標準ルールより優先</strong>されます。
            </p>
            <p>
              つまり、汎用的な文章ではなく<strong>「あなたが書いたような記事」</strong>を生成できます。
              自分の言い回し・語り口を一度ルール化しておけば、Buzzblog はそれを再現する
              <strong>&ldquo;第二の脳&rdquo;</strong>として運用できます。
            </p>
          </div>
        </GuideSection>

        <GuideSection title="5. note-edit スキル ― note に投稿する" level={2}>
          <p>
            Buzzblog で作った <code>_generated.md</code> を、見出し・引用・箇条書きごと
            <strong>note.com に書式付きで投稿（下書き保存）</strong>するスキルです。
          </p>
          <ul className="howto">
            <li className="st">
              <span className="no">1</span>
              <h3>生成した記事を渡して実行</h3>
              <CodeBlock label="note に投稿する" code="/note-edit <生成された_generated.md>" />
              <p>例: <code>/note-edit 02_note/記事フォルダ/記事_generated.md</code> → note.com の新規エディタに流し込み、下書き保存まで自動。</p>
            </li>
            <li className="st">
              <span className="no">2</span>
              <h3>note.com にログインしておく</h3>
              <p>
                note-edit は<strong>パスワードを保存しません</strong>。ブラウザのログイン状態を使って投稿するので、
                投稿前に <a href="https://note.com/login" target="_blank" rel="noopener">note.com</a> にログインしておいてください。
              </p>
            </li>
          </ul>
          <div className="callout warn">
            <div className="label">note-edit には「ブラウザ自動操作」の準備が必要です（重要）</div>
            <p>
              note-edit はブラウザを自動操作して投稿します。
              <strong>VS Code 拡張版の Claude Code では「Claude in Chrome」が使えない</strong>ため、
              代わりに <strong>Chrome DevTools MCP</strong>（ブラウザ自動操作ツール）を入れると動きます。
              <strong>これは Claude Code に標準では入っていません</strong>（デフォルト非同梱）。
              次の手順で1回だけ入れればOKです。
            </p>
            <ol style={{ margin: "8px 0 0", paddingLeft: "1.3em", listStyle: "decimal" }}>
              <li>
                <strong>PowerShell（パワーシェル）を開く</strong>:
                キーボードの <strong>Windowsキー</strong> を押す → そのまま <strong>「power」</strong> と入力 →
                候補に出る <strong>「Windows PowerShell」</strong> をクリックして開きます（黒い画面が出ます）。
              </li>
              <li>
                開いた画面に、次のコマンドを<strong>そのまま貼り付けて Enter</strong> を押します。
                <CodeBlock
                  label="PowerShell に貼り付けて実行"
                  code="claude mcp add --scope user chrome-devtools npx chrome-devtools-mcp@latest"
                />
                エラーなく終われば導入完了です（<code>--scope user</code> を付けると、どのフォルダで開いても使えるようになります）。
              </li>
              <li>
                <strong>VS Code（Claude Code）を一度すべて閉じて、開き直してください。</strong>
                再起動しないと、入れたツールが読み込まれません。
              </li>
            </ol>
            <p style={{ margin: "8px 0 0", fontSize: "0.9em", opacity: 0.85 }}>
              ※ うまくいかないときは、<strong>Node.js</strong> が入っているか確認してください
              （<a href="https://nodejs.org/ja" target="_blank" rel="noopener">nodejs.org</a> から「LTS」版を入れて、入れたあと PowerShell とVS Codeを開き直す）。
              <code>claude</code> コマンドが見つからない場合は、Claude Code 本体のインストールが未完了です。
            </p>
          </div>
          <div className="callout note">
            <div className="label">文体はそのまま引き継がれます</div>
            note-edit は Buzzblog が生成した <code>_generated.md</code> を<strong>そのまま</strong>書式付きで投稿します。
            あなたのライティングルールで書かれた文章は、投稿時も変わりません。
          </div>
        </GuideSection>

        <div className="callout ok">
          <div className="label">ここまでで「記事 → 投稿」ができます（記事生成は Python 不要）</div>
          Buzzblog で書いて、note-edit で投稿、が基本の流れです。
        </div>

        <GuideSection title="（任意）画像生成・プレビューを使う人だけ" level={2}>
          <p>
            サムネ・図解の自動生成や、投稿前のローカルプレビューを使う場合だけ、
            Python（uv）と APIキーが要ります。手順は <Link href="/courses/note-shukyaku/api">③ API設定（画像生成）</Link> にまとめました。
            <strong>使わないならスキップでOK</strong>です（画像は Canva 等で手動でも作れます）。
          </p>
        </GuideSection>

        <GuideSection title="ダウンロード（プラグインを使わない場合）" level={2}>
          <p>
            コマンドを使いたくない場合は、zip をダウンロードして展開し、中の <code>skills/</code> にある
            各フォルダ（buzzblog / note-edit / note-preview）を <code>~/.claude/skills/</code> にコピーします。
          </p>
          <p>
            <a className="btn btn-ghost btn-sm" href="/skills-guide/note-shukyaku-skills.zip" download>note-shukyaku-skills.zip をダウンロード</a>
          </p>
        </GuideSection>
      </div>

      <div className="action-card">
        <h3>やり方が分からない・詰まったとき</h3>
        <p>
          やり方が分からない、詰まってしまった方がいたら、<strong>LINEで教えてほしいです</strong>。対応します！
          軽い気持ちでメッセージを送ってもらって、まったく問題ございません。
        </p>
        <div className="links">
          <a className="btn btn-line" href={LINE_URL}>LINEで相談する（無料）</a>
        </div>
      </div>

      <Pager
        prev={{ href: "/courses/note-shukyaku/method", label: "← ① note集客の方法" }}
        next={{ href: "/courses/note-shukyaku/api", label: "③ API設定（任意）→" }}
      />
    </NoteGuideShell>
  );
}
