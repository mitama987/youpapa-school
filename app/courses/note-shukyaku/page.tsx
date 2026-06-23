import Link from "next/link";
import type { Metadata } from "next";
import { CommentThread } from "@/components/CommentThread";
import { CurriculumList } from "@/components/CurriculumList";
import { LikeButton } from "@/components/LikeButton";
import { CodeBlock } from "@/components/CodeBlock";

const LINE_URL = "https://lin.ee/ob91zIx";
const CMD_ADD = "/plugin marketplace add mitama987/youpapa-school";
const CMD_INSTALL = "/plugin install note-shukyaku@youpapa-tools";

export const metadata: Metadata = {
  title: "note集客 ― Claude Codeで記事自動生成→note投稿｜集客を仕組み化",
  description:
    "noteを集客チャネルに育てる方法と、Claude Codeのスキル（記事自動生成＝BuzzBlog、note自動投稿＝note-edit）の導入手順を公開。API設定・note投稿設定まで、必要な設定をすべて網羅した実践コースです。",
};

export default function NoteShukyakuCourse() {
  return (
    <>
      <section className="detail-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">講座一覧</Link> ＞ 集客 ＞ note集客
          </div>
          <span className="eyebrow">集客 ／ note運用の自動化 ／ 公開中</span>
          <h1>note集客 ― 記事制作から投稿までを仕組み化する</h1>
          <p>
            noteは、検索とフォロワーの両方から継続的に読まれる集客チャネルです。とはいえ手作業で記事を書き続けるのは大変。そこで本コースでは、
            <strong>noteで集客する考え方</strong>と、それを支える
            <strong>2つのスキル（記事を自動生成する BuzzBlog ／ noteへ自動投稿する note-edit）の導入方法</strong>を、必要な設定までまとめて公開します。
          </p>
        </div>
      </section>

      <div className="layout">
        <main className="content" style={{ flex: 1 }}>
          <div className="card">
            <span className="eyebrow">このコースで得られること</span>
            <h2>ゴール</h2>
            <ul>
              <li>noteを「集客チャネル」として位置づけ、何を書くかの軸を持てる</li>
              <li>記事制作→投稿の手作業を、AIと自動化で仕組み化できる</li>
              <li>BuzzBlog（記事＋画像生成）と note-edit（note投稿）を自分の環境で動かせる</li>
              <li>画像生成API・note投稿まわりの設定を、つまずかず通せる</li>
            </ul>

            <h2>カリキュラム</h2>
            <CurriculumList
              items={[
                { href: "/courses/note-shukyaku/method", label: "① note集客の方法 ― なぜnote／何を書く／継続の仕組み", meta: "考え方" },
                { href: "/courses/note-shukyaku/setup", label: "② 導入：全体像と事前準備", meta: "準備" },
                { href: "/courses/note-shukyaku/api", label: "③ API設定 ― 画像生成（gpt-image-2 / Gemini）", meta: "設定" },
                { href: "/courses/note-shukyaku/note", label: "④ note投稿設定 ― note IDとログイン", meta: "設定" },
                { href: "/courses/note-shukyaku/faq", label: "⑤ FAQ・トラブルシュート", meta: "読み物" },
              ]}
            />

            <div className="callout note">
              <div className="label">先に結論</div>
              記事の文章は <strong>Claude が生成</strong>します。OpenAI（GPT）のチャットAPIは使いません。外部APIキーが必要になるのは
              <strong>画像生成だけ</strong>です。詳しくは「③ API設定」で説明します。
            </div>

            <h2>導入はかんたん（Python不要で始められます）</h2>
            <p>
              <strong>VS Code 拡張版</strong>なら <code>/plugins</code> を開いて <code>mitama987/youpapa-school</code> を追加 → <code>note-shukyaku</code> を Install するだけ（黒い画面なし）。
              <strong>ターミナル版（CLI）</strong>は下の2コマンドでもOK。手動コピーの zip もあります。詳しい手順は <Link href="/courses/note-shukyaku/setup">② 導入</Link> へ。
            </p>
            <CodeBlock label="ターミナル版(CLI) ① マーケットプレイスを追加" code={CMD_ADD} />
            <CodeBlock label="ターミナル版(CLI) ② プラグインをインストール" code={CMD_INSTALL} />
            <p className="dl-row">
              <a className="btn btn-ghost btn-sm" href="/skills-guide/note-shukyaku-skills.zip" download>zipでダウンロード</a>
              <Link className="btn btn-primary btn-sm" href="/courses/note-shukyaku/setup">導入手順を見る →</Link>
            </p>

            <p style={{ marginTop: 18 }}>
              <LikeButton targetId="courses:note-shukyaku" />
            </p>
          </div>

          <CommentThread targetId="courses:note-shukyaku" />

          <div className="action-card">
            <h3>まずは方法から</h3>
            <p>
              いきなり設定に入らず、「noteで集客する考え方」から読むと、何のためにスキルを入れるのかが腑に落ちます。
            </p>
            <div className="links">
              <Link className="btn btn-primary" href="/courses/note-shukyaku/method">
                ① note集客の方法へ →
              </Link>
              <a className="btn btn-line" href={LINE_URL}>
                LINEで受け取る（無料）
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
