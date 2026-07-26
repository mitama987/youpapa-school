import Link from "next/link";
import type { Metadata } from "next";
import { CommentThread } from "@/components/CommentThread";
import { LikeButton } from "@/components/LikeButton";
import { CodeBlock } from "@/components/CodeBlock";
import { GuideSection } from "@/components/GuideSection";
import { Tabs } from "@/components/Tabs";

const LINE_URL = "https://lin.ee/ob91zIx";
const CMD_ADD = "/plugin marketplace add mitama987/youpapa-school";
const CMD_INSTALL = "/plugin install x-post@youpapa-tools";
const CMD_CLI_WIN = "irm https://claude.ai/install.ps1 | iex";
const CMD_CLI_MAC = "curl -fsSL https://claude.ai/install.sh | bash";
const CMD_MP_UPDATE = "/plugin marketplace update youpapa-tools";
const CONFIG_PATH = "~/.claude/x-post-config.md";

const CONFIG_TEMPLATE = `# x-post 設定ファイル

## 発信の核
家族持ち会社員が、AI自動化で副業を月10万円まで育てるまでの実践記録

## ターゲット読者
20〜40代の会社員。副業に興味はあるが時間が取れず、何から始めるか決めきれていない

## トーン
丁寧・落ち着いた（誇張せず、実測値で語る）

## 含めたいキーワード・商品・サービス
自動化、時短、Claude Code、自作ツール「◯◯」

## 避けたい話題・NGワード
政治・宗教の話題。「誰でも簡単に」「必ず稼げる」などの断定・煽り表現

## CTA（誘導先）
プロフィールのリンクから無料ガイドを配布中

## 参考にしたい言い回し・例文
「結論から言うと〜」で始める／絵文字は控えめ

## 保存フォルダ
（未記入なら ./x-posts/）

## 既定モード
未指定`;

export const metadata: Metadata = {
  title: "Xポスト自動生成スキル ― APIキー不要でツイート案を2モード生成",
  description:
    "X投稿案をClaude Codeで自動生成。深掘り型と量産型の2モード、APIキー・Python不要。実運用ツールXToolsPro3/4の生成プロンプトをスキル化。",
};

export default function XPostCourse() {
  return (
    <>
      <section className="detail-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">講座一覧</Link> ＞ 開発・自動化 ＞ Xポスト自動生成スキル
          </div>
          <div className="pills">
            <span className="pill cat">開発・自動化</span>
            <span className="pill cat">X運用の自動化</span>
            <span className="pill live">公開中</span>
          </div>
          <h1>Xポスト自動生成スキル ― 投稿案を2モードで一括生成</h1>
          <p>
            実運用ツール <strong>XToolsPro3 / XToolsPro4</strong> の生成プロンプトをそのままスキル化。
            <strong>APIキー・Python不要</strong>。
          </p>
        </div>
      </section>

      <div className="layout">
        <main className="content guide xpost">
          <div className="card">
            <span className="eyebrow">このスキルでできること</span>
            <h2>ゴール</h2>
            <ul>
              <li>テーマ1つで投稿案を5〜100件生成</li>
              <li>本命1本とストックをモードで作り分け</li>
              <li>AI臭を消す8手法を生成・推敲に活用</li>
              <li>発信の軸の設定は初回のみ</li>
            </ul>
            <div className="callout ok">
              <div className="label">先に結論</div>
              文章は <strong>Claude が直接執筆</strong>。OpenAI・Gemini の APIキーも Python 環境も
              <strong>不要</strong>。インストール後すぐ使えます。
            </div>
          </div>

          <div className="card">
            <h2>2つのモード</h2>
            <p>狙いに合わせて、実行時に2つの生成モードを選択。</p>
            <div className="gtable">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>モードA 深掘り型</th>
                    <th>モードB 量産型</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>ハッシュタグ</th>
                    <td>なし</td>
                    <td>2〜3個必須</td>
                  </tr>
                  <tr>
                    <th>文字数</th>
                    <td>140／280字・長文400〜1,200字</td>
                    <td>140／280字</td>
                  </tr>
                  <tr>
                    <th>件数</th>
                    <td>5・10・20件</td>
                    <td>10・50・100件</td>
                  </tr>
                  <tr>
                    <th>各案の付属</th>
                    <td>切り口名＋スコア</td>
                    <td>パターン名（10種）</td>
                  </tr>
                  <tr>
                    <th>用途</th>
                    <td>本命ポスト・ブランディング</td>
                    <td>投稿キューのストック</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2>導入</h2>
            <div className="callout warn">
              <div className="label">Windows は先に Git</div>
              <p>
                <a href="https://git-scm.com/download/win" target="_blank" rel="noopener">
                  Git for Windows
                </a>{" "}
                をダウンロードしてインストールします（<strong>64-bit / x64版</strong>
                ＝今の普通のPCはこれでOK。「x64」「amd64」は同じ意味です）。
              </p>
              <details className="mini-acc">
                <summary>詳細はこちら（インストール時の注意）</summary>
                <ul>
                  <li>インストールは基本そのまま「Next」で進めてOK</li>
                  <li>
                    途中の<strong>「Adjusting your PATH environment」</strong>
                    画面だけ、最初から選ばれている推奨の
                    「Git from the command line and also from 3rd-party software」（真ん中）のまま
                    （一番下の「Bash only」を選ぶと認識されません）
                  </li>
                  <li>
                    導入後は VS Code／ターミナルを<strong>再起動</strong>（Mac は多くの場合不要）
                  </li>
                </ul>
              </details>
            </div>
            <div className="callout note">
              <div className="label">前提：Claude の有料プラン</div>
              Claude Code の利用には <strong>Pro / Max プラン</strong>（または API 課金）が必要。無料プランでは使えません。
            </div>
            <Tabs
              tabs={[
                {
                  label: "VS Code 拡張版（推奨）",
                  content: (
                    <>
                      <ol className="steps">
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">1</span>
                            <h3 className="step-title">VS Code を入れる</h3>
                          </div>
                          <div className="step-body">
                            <p>
                              <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">
                                code.visualstudio.com
                              </a>{" "}
                              からダウンロードしてインストール（導入済みなら次へ）。
                            </p>
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">2</span>
                            <h3 className="step-title">拡張機能「Claude Code」をインストール</h3>
                          </div>
                          <div className="step-body">
                            <p>
                              左端の拡張機能アイコン（<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>）→
                              「<strong>Claude Code</strong>」を検索 → <strong>Anthropic</strong> 製
                              （<code>anthropic.claude-code</code>）を <strong>Install</strong>。
                            </p>
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">3</span>
                            <h3 className="step-title">Claude Code を開いてログイン</h3>
                          </div>
                          <div className="step-body">
                            <p>
                              <kbd>Ctrl</kbd>+<kbd>Esc</kbd>（Mac: <kbd>⌘</kbd>+<kbd>Esc</kbd>）または右上の
                              Claude アイコンでパネルを開く。初回はブラウザが開くので、Claude
                              アカウントでログインして許可。
                            </p>
                            <p className="fine">
                              投稿案の保存先にしたいフォルダを「フォルダーを開く」で開いておくとスムーズ。
                            </p>
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">4</span>
                            <h3 className="step-title">
                              <code>/manage</code> を開く
                            </h3>
                          </div>
                          <div className="step-body">
                            <p>
                              Claude Code の入力欄に <code>/manage</code> と入力し、プラグイン管理画面を表示。
                            </p>
                            <figure className="shot narrow">
                              <img
                                src="/skills-guide/note-shukyaku/step1-manage-plugins.png"
                                alt="入力欄に /manage と打つと候補に Manage plugins が表示される"
                                loading="lazy"
                              />
                              <figcaption>
                                <code>/manage</code> と打つと「Manage plugins」が候補に出ます
                              </figcaption>
                            </figure>
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">5</span>
                            <h3 className="step-title">Marketplace を追加</h3>
                          </div>
                          <div className="step-body">
                            <p>
                              <strong>Marketplaces</strong> タブで <code>mitama987/youpapa-school</code> を{" "}
                              <strong>Add</strong>。
                            </p>
                            <figure className="shot">
                              <img
                                src="/skills-guide/note-shukyaku/step2-add-repo.png"
                                alt="Marketplaces タブの入力欄に mitama987/youpapa-school を入れて Add を押す"
                                loading="lazy"
                              />
                              <figcaption>
                                入力欄に <code>mitama987/youpapa-school</code> を貼って <strong>Add</strong> を押す
                              </figcaption>
                            </figure>
                            <figure className="shot">
                              <img
                                src="/skills-guide/note-shukyaku/step3-added.png"
                                alt="Marketplaces 一覧に youpapa-tools が追加された状態"
                                loading="lazy"
                              />
                              <figcaption>
                                一覧に <strong>youpapa-tools</strong> が出れば配布元の登録は完了
                              </figcaption>
                            </figure>
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">6</span>
                            <h3 className="step-title">x-post を Install</h3>
                          </div>
                          <div className="step-body">
                            <p>
                              <strong>Plugins</strong> タブで <code>x-post</code> を <strong>Install</strong> →{" "}
                              <strong>reload</strong>。<code>/x-post</code> が候補に出れば完了。
                            </p>
                          </div>
                        </li>
                      </ol>
                      <div className="callout note">
                        <div className="label">よくあるつまずき</div>
                        Add だけでは未完了。<strong>Install → reload</strong> まで実行。
                      </div>
                    </>
                  ),
                },
                {
                  label: "デスクトップアプリ版",
                  content: (
                    <>
                      <ol className="steps">
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">1</span>
                            <h3 className="step-title">アプリをインストール</h3>
                          </div>
                          <div className="step-body">
                            <p>
                              <a href="https://claude.ai/download" target="_blank" rel="noopener">
                                claude.ai/download
                              </a>{" "}
                              から Claude デスクトップアプリ（Windows／Mac）を入手してインストール →
                              Claude アカウントでログイン。
                            </p>
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">2</span>
                            <h3 className="step-title">「Code」タブを開く</h3>
                          </div>
                          <div className="step-body">
                            <p>
                              アプリ上部の <strong>Code</strong> をクリック。ここが Claude Code の画面。
                            </p>
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">3</span>
                            <h3 className="step-title">フォルダを選択して開始</h3>
                          </div>
                          <div className="step-body">
                            <p>
                              <strong>Local</strong> → <strong>Select folder</strong>{" "}
                              で投稿案を保存したいフォルダ（例: デスクトップに作った{" "}
                              <code>x-posts</code>）を指定してセッション開始。
                            </p>
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">4</span>
                            <h3 className="step-title">スキルを導入</h3>
                          </div>
                          <div className="step-body">
                            <p>入力欄に以下を順に貼って実行（ターミナル版と同じコマンド）。</p>
                            <CodeBlock tone="dark" label="① 入力欄に貼って実行" code={CMD_ADD} />
                            <CodeBlock tone="dark" label="② 続けて貼って実行" code={CMD_INSTALL} />
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">5</span>
                            <h3 className="step-title">確認</h3>
                          </div>
                          <div className="step-body">
                            <p>
                              入力欄に <code>/x-post</code> と打って候補に出れば完了。
                            </p>
                          </div>
                        </li>
                      </ol>
                      <div className="callout note">
                        <div className="label">CLI のインストールは不要</div>
                        アプリ単体で完結し、Git が無くても動作。設定・プラグインは VS Code 版／ターミナル版と共有されます。
                      </div>
                    </>
                  ),
                },
                {
                  label: "ターミナル版（CLI）",
                  content: (
                    <>
                      <ol className="steps">
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">1</span>
                            <h3 className="step-title">ターミナルを開く</h3>
                          </div>
                          <div className="step-body">
                            <p>
                              Windows: <kbd>Win</kbd> →「powershell」と検索 →{" "}
                              <strong>Windows PowerShell</strong> ／ Mac: <kbd>⌘</kbd>+<kbd>Space</kbd>{" "}
                              →「ターミナル」。
                            </p>
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">2</span>
                            <h3 className="step-title">Claude Code をインストール</h3>
                          </div>
                          <div className="step-body">
                            <p>
                              OSに合った1行を貼って <kbd>Enter</kbd>。自動で入ります。
                            </p>
                            <CodeBlock tone="dark" label="Windows（PowerShell に貼る）" code={CMD_CLI_WIN} />
                            <CodeBlock tone="dark" label="Mac（ターミナルに貼る）" code={CMD_CLI_MAC} />
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">3</span>
                            <h3 className="step-title">入ったか確認</h3>
                          </div>
                          <div className="step-body">
                            <p>
                              ターミナルを<strong>いったん閉じて開き直し</strong>、
                              <code>claude --version</code> を実行。バージョン番号が出ればOK。
                            </p>
                            <p className="fine">
                              「claude が見つからない」と出る場合も、まずはターミナルの開き直しで解決することが大半。
                            </p>
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">4</span>
                            <h3 className="step-title">起動してログイン</h3>
                          </div>
                          <div className="step-body">
                            <p>
                              <code>claude</code> と入力して起動。初回はブラウザが開くので、Claude
                              アカウントでログインして許可。
                            </p>
                            <p className="fine">
                              投稿案の保存先を分けたい場合は、先に <code>cd</code>{" "}
                              で作業フォルダへ移動してから起動。
                            </p>
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">5</span>
                            <h3 className="step-title">Marketplace を追加</h3>
                          </div>
                          <div className="step-body">
                            <CodeBlock tone="dark" label="① Claude Code の入力欄に貼って実行" code={CMD_ADD} />
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">6</span>
                            <h3 className="step-title">x-post を Install</h3>
                          </div>
                          <div className="step-body">
                            <p>add だけでは使えず、install まで必須。</p>
                            <CodeBlock tone="dark" label="② 続けて貼って実行" code={CMD_INSTALL} />
                          </div>
                        </li>
                        <li className="step">
                          <div className="step-head">
                            <span className="step-no">7</span>
                            <h3 className="step-title">再読み込み</h3>
                          </div>
                          <div className="step-body">
                            <p>
                              <code>/reload-plugins</code> を実行。<code>/x-post</code> が候補に出れば完了。
                            </p>
                          </div>
                        </li>
                      </ol>
                      <div className="callout note">
                        <div className="label">貼る場所に注意</div>
                        手順2はターミナル（PowerShell）に、手順5〜7は<strong>起動後の Claude Code の入力欄</strong>に貼ります。
                      </div>
                      <p className="fine">
                        コマンドを使わない場合 ― 下の zip を展開し、<code>x-post</code> フォルダを{" "}
                        <code>~/.claude/skills/</code> に配置でも可。
                      </p>
                    </>
                  ),
                },
              ]}
            />
            <div className="callout note">
              <div className="label">
                「Plugin &quot;x-post&quot; not found」と出る場合
              </div>
              <p>
                以前に配布元（youpapa-tools）を登録したことがあると、手元の情報が古いまま
                になっていることがあります。以下で更新してから install をやり直してください。
              </p>
              <CodeBlock tone="dark" label="配布元を最新に更新" code={CMD_MP_UPDATE} />
            </div>
          </div>

          <div className="card">
            <h2>発信の軸の設定（初回のみ）</h2>
            <p>
              発信の軸を <code>{CONFIG_PATH}</code> に1回だけ設定。以降の質問はモード別の数問のみ。
            </p>
            <div className="callout note">
              <div className="label">自分で書かなくてOK</div>
              ファイルが無ければ <code>/x-post</code> 実行時に Claude が質問しながら自動作成。
            </div>
            <GuideSection title="設定ファイルの雛形を見る" level={3}>
              <CodeBlock label={`設定ファイルの雛形（${CONFIG_PATH}）`} code={CONFIG_TEMPLATE} />
            </GuideSection>
          </div>

          <div className="card">
            <h2>使い方</h2>
            <p>入力欄に1行入れるだけ。</p>
            <CodeBlock label="① 基本形" code="/x-post 副業の始め方" />
            <CodeBlock label="② 記事を元ネタに" code="/x-post https://note.com/xxx/n/xxxx 深掘り" />
            <CodeBlock label="③ 量産してキューへ" code="/x-post 時間管理 量産 50件" />
            <p className="fine">
              引数なしの <code>/x-post</code> でも起動。モード未指定なら最初に A／B を1問。
            </p>
          </div>

          <div className="card">
            <GuideSection title="出力サンプルを見る">
              <p>
                <b>モードA</b> ― ハッシュタグなし、切り口名とスコア付き。
              </p>
              <div className="gtable">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>切り口</th>
                      <th>score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>逆算で語る</td>
                      <td>0.82</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>常識への反証</td>
                      <td>0.88</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>数字フック</td>
                      <td>0.79</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                末尾に<b>スコア上位3件</b>を集約。<b>モードB</b>は10パターン循環＋タグ2〜3個、末尾に内訳表。
              </p>
            </GuideSection>

            <GuideSection title="AI臭を消す8手法とは">
              <p>モードAの中核。平坦な文章を8つの角度から改稿。</p>
              <ul>
                <li>
                  <b>❶ 逆方向構成</b>：結論から前提を逆算
                </li>
                <li>
                  <b>❷ 本音の悩み</b>：建前でなく本音に言及
                </li>
                <li>
                  <b>❸ 対立構造</b>：「常識と違う」で主張
                </li>
                <li>
                  <b>❹ 核フレーズ抽出</b>：10字以内の一言
                </li>
                <li>
                  <b>❺ 想定反論</b>：先回りして認めて返す
                </li>
                <li>
                  <b>❻ 抽象度診断</b>：体験・数字・固有名へ
                </li>
                <li>
                  <b>❼ 冒頭3パターン</b>：意外性・痛み・数字
                </li>
                <li>
                  <b>❽ 読者離脱予測</b>：離脱点を事前に排除
                </li>
              </ul>
              <p className="fine">生成時は設計パターンA〜Cとして選択可能。</p>
              <div className="callout note">
                <div className="label">出典</div>
                marketer_osaru1 氏のフレームワークを整理。
              </div>
            </GuideSection>

            <GuideSection title="よくある質問">
              <p>
                <b>Q. APIキーは必要？</b>
              </p>
              <p>A. 不要。文章は Claude Code 内で Claude が直接執筆。APIキーの設定は一切なし。</p>
              <p>
                <b>Q. XToolsProに一括で取り込める？</b>
              </p>
              <p>
                A. 可能。「XTP3の予約用に」「XTP4用に」と言えば取り込み形式で出力
                （XTP3予約投稿＝投稿日時＋本文のタブ区切り／XTP4・ランダム投稿＝空行区切りテキスト）。
                各ツールの貼り付けインポートにそのまま流し込めます。
              </p>
              <p>
                <b>Q. 数字や実績を盛られない？</b>
              </p>
              <p>A. 手元にない数字は書かないルールを内蔵。実績が無ければ数字前提のパターンを回避。</p>
              <p>
                <b>Q. そのまま投稿していい？</b>
              </p>
              <p>
                A. 生成物は<b>下書き</b>。投稿前に必ず自分の目で確認。
              </p>
            </GuideSection>

            <p className="dl-row">
              <a className="btn btn-ghost btn-sm" href="/skills-guide/x-post-skills.zip" download>
                zipでダウンロード
              </a>
              <Link className="btn btn-primary btn-sm" href="/courses/note-shukyaku">
                note集客スキルも見る →
              </Link>
            </p>

            <p className="like-row">
              <LikeButton targetId="courses:x-post" />
            </p>
          </div>

          <CommentThread targetId="courses:x-post" />

          <div className="action-card">
            <h3>つまずいたら LINE で相談</h3>
            <p>導入エラーも生成結果の悩みも、LINE で無料相談。</p>
            <div className="links">
              <a className="btn btn-line" href={LINE_URL}>
                LINEで相談する（無料）
              </a>
              <Link className="btn btn-primary" href="/">
                講座一覧へ戻る
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
