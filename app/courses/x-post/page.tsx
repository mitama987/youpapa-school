import Link from "next/link";
import type { Metadata } from "next";
import { CommentThread } from "@/components/CommentThread";
import { LikeButton } from "@/components/LikeButton";
import { CodeBlock } from "@/components/CodeBlock";
import { GuideSection } from "@/components/GuideSection";

const LINE_URL = "https://lin.ee/ob91zIx";
const CMD_ADD = "/plugin marketplace add mitama987/youpapa-school";
const CMD_INSTALL = "/plugin install x-post@youpapa-tools";
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
    "X（Twitter）の投稿案をClaude Codeで自動生成するスキルの導入手順。AI臭を消す「深掘り型」と10パターンの「量産型」を実行時に選択。外部APIキー不要・Python不要。実運用ツールXToolsPro2/4の生成プロンプトをそのまま切り出しました。",
};

export default function XPostCourse() {
  return (
    <>
      <section className="detail-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">講座一覧</Link> ＞ 開発・自動化 ＞ Xポスト自動生成スキル
          </div>
          <span className="eyebrow">開発・自動化 ／ X運用の自動化 ／ 公開中</span>
          <h1>Xポスト自動生成スキル ― 投稿案を2モードで書き出す</h1>
          <p>
            「毎日投稿したいけど、ネタも時間も続かない」を解決するスキルです。
            実運用中のX自動投稿ツール <strong>XToolsPro2 / XToolsPro4</strong> に組み込んでいた生成プロンプトを、
            そのまま Claude Code のスキルとして切り出しました。
            <strong>外部APIキーもPythonも不要</strong>。インストールしたその場で動きます。
          </p>
        </div>
      </section>

      <div className="layout">
        <main className="content guide" style={{ flex: 1 }}>
          <div className="card">
            <span className="eyebrow">このスキルでできること</span>
            <h2>ゴール</h2>
            <ul>
              <li>テーマを1つ渡すだけで、X投稿案を5〜100件まとめて生成できる</li>
              <li>「本命の1本」と「キューに積むストック」を、モードを切り替えて作り分けられる</li>
              <li>AI特有の平坦な文章（＝AI臭）を消す8つの手法を、生成にも推敲にも使える</li>
              <li>発信の軸を1回設定すれば、2回目以降に聞かれるのはモードごとの数問だけになる</li>
            </ul>

            <div className="callout ok">
              <div className="label">先に結論</div>
              文章は <strong>Claude が直接書きます</strong>。OpenAI や Gemini のAPIキーは
              <strong>一切必要ありません</strong>。Python環境の用意も不要です。
              note集客スキルより導入のハードルは低く、インストール後すぐ使えます。
            </div>

            <h2>2つのモード</h2>
            <p>
              同じ「X投稿の生成」でも、狙いによって書き方はまったく違います。
              このスキルは2本の生成プロンプトを統合せず、<strong>実行時に選べる2モード</strong>として残しています。
            </p>
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
                    <th>由来</th>
                    <td>XToolsPro4 post-generator</td>
                    <td>XToolsPro2 AIモード</td>
                  </tr>
                  <tr>
                    <th>ハッシュタグ</th>
                    <td>付けない</td>
                    <td>2〜3個必須</td>
                  </tr>
                  <tr>
                    <th>文字数</th>
                    <td>全角140字（通常）／280字（Premium）・長文400〜1,200字</td>
                    <td>全角140字（通常）／280字（Premium）</td>
                  </tr>
                  <tr>
                    <th>件数</th>
                    <td>5 / 10 / 20</td>
                    <td>10 / 50 / 100</td>
                  </tr>
                  <tr>
                    <th>各案に付くもの</th>
                    <td>切り口名＋自己評価スコア</td>
                    <td>パターン名（10種）</td>
                  </tr>
                  <tr>
                    <th>設計手法</th>
                    <td>AI臭を消す8手法（A/B/C）</td>
                    <td>10パターン＋成功事例7指針</td>
                  </tr>
                  <tr>
                    <th>想定用途</th>
                    <td>本命ポスト・ブランディング</td>
                    <td>ランダム投稿キューのストック</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>導入はかんたん（Python不要）</h2>
            <p>
              <strong>VS Code 拡張版</strong>なら黒い画面は一切出てきません。
              <strong>ターミナル版（CLI）</strong>は下の2コマンドでOKです。
            </p>

            <GuideSection title="VS Code 拡張版で入れる（推奨）" open>
              <ul className="howto">
                <li className="st">
                  <span className="no">1</span>
                  <h3>
                    <code>/manage</code> を開く
                  </h3>
                  <p>
                    入力欄に <code>/manage</code> と打つと、プラグインの管理画面が開きます。
                  </p>
                </li>
                <li className="st">
                  <span className="no">2</span>
                  <h3>Marketplace を追加</h3>
                  <p>
                    <strong>Marketplaces</strong> タブで <code>mitama987/youpapa-school</code> を{" "}
                    <strong>Add</strong> します。
                  </p>
                </li>
                <li className="st">
                  <span className="no">3</span>
                  <h3>プラグインを Install</h3>
                  <p>
                    <strong>Plugins</strong> タブに切り替えて <code>x-post</code> を{" "}
                    <strong>Install</strong> → <strong>reload</strong>。
                    <code>/x-post</code> がコマンド一覧に出れば成功です。
                  </p>
                </li>
              </ul>
              <div className="callout note">
                <div className="label">よくあるつまずき</div>
                Marketplace を <b>追加しただけでは使えません</b>。
                Plugins タブでの <b>Install</b> と、そのあとの <b>reload</b> まで必要です。
              </div>
              <div className="callout warn">
                <div className="label">Windowsの方へ</div>
                Marketplace の追加には <b>Git for Windows</b> が必要です。
                「git not found」と出たら Git を入れて、<b>エディタごと再起動</b>してください。
              </div>
            </GuideSection>

            <GuideSection title="ターミナル版（CLI）で入れる">
              <CodeBlock label="① マーケットプレイスを追加" code={CMD_ADD} />
              <CodeBlock label="② プラグインをインストール" code={CMD_INSTALL} />
              <p>
                入らない場合は、下の zip をダウンロードして
                <code>~/.claude/skills/</code> に展開しても同じように使えます。
              </p>
            </GuideSection>

            <h2>最初の1回だけ、発信の軸を設定する</h2>
            <p>
              毎回「誰に向けて？」「どんなトーンで？」と聞かれるのは面倒なので、
              発信の軸を <code>{CONFIG_PATH}</code> に1回だけ書いておきます。
              これで2回目以降に聞かれるのは <strong>モードごとの数問だけ</strong>になります（深掘り型＝件数・文字数・設計パターン、量産型＝件数・文字数・目的・感情トーン。量産型は加えて任意の一言ヒアリングが入ります）。
            </p>
            <div className="callout note">
              <div className="label">自分で書かなくてOK</div>
              ファイルが無い状態で <code>/x-post</code> を実行すると、
              Claude が質問しながらこのファイルを作ってくれます。
              中身を先に見ておきたい方だけ、下の雛形をコピーしてください。
            </div>
            <CodeBlock label={`設定ファイルの雛形（${CONFIG_PATH}）`} code={CONFIG_TEMPLATE} />

            <h2>使い方</h2>
            <CodeBlock label="① いちばん基本（対話で聞いてくれます）" code="/x-post 副業の始め方" />
            <CodeBlock label="② 記事やブログを元ネタにする" code="/x-post https://note.com/xxx/n/xxxx 深掘り" />
            <CodeBlock label="③ キューに積む分をまとめて作る" code="/x-post 時間管理 量産 50件" />
            <p>
              引数なしで <code>/x-post</code> だけでも動きます。
              モードが決まっていなければ、最初に「A 深掘り型 / B 量産型」を1問だけ聞かれます。
            </p>

            <GuideSection title="出力サンプルを見る">
              <p>
                <b>モードA（深掘り型）</b>― ハッシュタグなし。切り口名とスコアが付きます。
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
                ファイル末尾に<b>スコア上位3件</b>がまとまるので、「今日はこれを出す」を選ぶだけで済みます。
              </p>
              <p>
                <b>モードB（量産型）</b>― 10パターンを循環させ、全件にハッシュタグ2〜3個が付きます。
                本文は1〜2行ごとに空行が入り、そのまま貼れる形で整形されます。
                ファイル末尾には<b>パターン別の内訳表</b>が付くので、型の偏りが一目で分かります。
              </p>
            </GuideSection>

            <GuideSection title="AI臭を消す8手法とは">
              <p>
                モードAの中核です。「整っているのに刺さらない」文章を、8つの角度から作り替えます。
                生成時はエッセンスを内在化し、生成後の推敲では指示文をそのまま適用できます。
              </p>
              <ul>
                <li><b>❶ 逆方向構成</b>：結論を1行で決め、そこから前提を逆算する</li>
                <li><b>❷ 本音の悩み</b>：建前ではなく、言語化されていない本音に触れる</li>
                <li><b>❸ 対立構造</b>：「常識ではこうだが実際は違う」で主張を立てる</li>
                <li><b>❹ 核フレーズ抽出</b>：10文字以内・煽りなしの一言を1つ作る</li>
                <li><b>❺ 想定反論</b>：鋭い反論を先回りし、認めた上で返す</li>
                <li><b>❻ 抽象度診断</b>：抽象的な箇所を体験・数字・固有名に降ろす</li>
                <li><b>❼ 冒頭3パターン</b>：意外性／痛み／数字のどれで入るかを選ぶ</li>
                <li><b>❽ 読者離脱予測</b>：読むのをやめたくなる箇所を潰す</li>
              </ul>
              <p>
                この3つをまとめた設計パターン（A 構造から組み立てる／B 主張型の記事／C 仕上げで精度を上げる）を、
                生成時に選べます。
              </p>
              <div className="callout note">
                <div className="label">出典</div>
                「AI臭を消す8手法」は marketer_osaru1 氏のフレームワークを整理したものです。
              </div>
            </GuideSection>

            <GuideSection title="よくある質問">
              <p><b>Q. APIキーは本当に要りませんか？</b></p>
              <p>
                A. 要りません。文章は Claude Code の中で Claude 自身が書きます。
                OpenAI・Gemini・Anthropic いずれのAPIキーも設定不要です。
              </p>
              <p><b>Q. XToolsPro に取り込めるCSVは出せますか？</b></p>
              <p>
                A. 出せません。XToolsPro2 / XToolsPro4 のどちらにも「投稿本文のCSV一括インポート」機能が無いためです
                （XToolsPro2 のCSV一括登録はアカウント登録専用です）。
                代わりに、本文だけを区切り線でつないだコピペ用テキストを書き出せます。
              </p>
              <p><b>Q. 数字や実績を勝手に盛られませんか？</b></p>
              <p>
                A. 盛りません。手元にない数字は書かないルールをスキル側に入れています。
                実績が無い場合は、数字を前提としないパターンに自動で振り替えます。
              </p>
              <p><b>Q. そのまま投稿していいですか？</b></p>
              <p>
                A. 生成物は<b>下書き</b>です。投稿前に必ずご自身の目で確認してください。
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

            <p style={{ marginTop: 18 }}>
              <LikeButton targetId="courses:x-post" />
            </p>
          </div>

          <CommentThread targetId="courses:x-post" />

          <div className="action-card">
            <h3>つまずいたら聞いてください</h3>
            <p>
              インストールでエラーが出た、思った投稿にならない ― どんな内容でも大丈夫です。
              LINEから直接ご相談いただけます。
            </p>
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
