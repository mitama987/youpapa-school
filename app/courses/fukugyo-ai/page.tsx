import Link from "next/link";
import type { Metadata } from "next";
import { CommentThread } from "@/components/CommentThread";
import { CurriculumList } from "@/components/CurriculumList";
import { Dashboard } from "@/components/Dashboard";
import { LikeButton } from "@/components/LikeButton";
import { ResumeCTA } from "@/components/ResumeCTA";

const LINE_URL = "https://lin.ee/ob91zIx";

export const metadata: Metadata = {
  title: "副業×AI×自動化で月10万｜4ステップ実践講座【無料】",
  description:
    "フラッグシップ無料講座。リサーチ→商品→販売→集客の4ステップ＋補講を、型・実例・チェックリストで実践。3年分の知見を凝縮した副業×AI×自動化の始め方。",
};

export default function Course() {
  return (
    <>
      <section className="detail-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">講座一覧</Link> ＞ 副業×AI×自動化で月10万
          </div>
          <span className="eyebrow">入門→実践 ／ 副業の始め方 ／ 全5レッスン・無料</span>
          <h1>副業×AI×自動化で月10万 ― 4ステップ実践</h1>
          <p>
            「作ってから売る」と挫折します。リサーチ→商品→販売→集客の順番で、3年分の遠回りを削ったテンプレートを実践する講座です。各レッスンのチェックリストは自動保存され、下の達成率に反映されます。
          </p>
          <p style={{ marginTop: 18 }}>
            <ResumeCTA />
          </p>
        </div>
      </section>

      <div className="layout">
        <main className="content" style={{ flex: 1 }}>
          <div className="card">
            <span className="eyebrow">この講座で得られること</span>
            <h2>ゴール</h2>
            <ul>
              <li>需要が証明された市場の「不満」から商品の種を見つけられる</li>
              <li>AIと自動化でMVPを最小工数で形にできる</li>
              <li>価値が伝わるLPの型と価格設計が分かる</li>
              <li>note・YouTube・Xで同じ核を配信し続ける集客の仕組みを作れる</li>
            </ul>

            <h2>カリキュラム</h2>
            <CurriculumList
              items={[
                { href: "/lessons/step1", label: "STEP1 リサーチ：売れている商品の「不満」を見つける", meta: "5項目", key: "s1" },
                { href: "/lessons/step2", label: "STEP2 商品：AIと自動化で最小で作る", meta: "5項目", key: "s2" },
                { href: "/lessons/step3", label: "STEP3 販売：価値が伝わるLPを作る", meta: "7項目", key: "s3" },
                { href: "/lessons/step4", label: "STEP4 集客：同じ核を配信し続ける", meta: "5項目", key: "s4" },
                { href: "/lessons/pitfalls", label: "補講：つまずき対処とまとめ", meta: "読み物" },
              ]}
            />

            <h2>あなたの達成率</h2>
            <Dashboard />
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              ※チェックはこの端末のブラウザに自動保存されます。
            </p>
            <p style={{ marginTop: 18 }}>
              <LikeButton targetId="courses:fukugyo-ai" />
            </p>
          </div>

          <CommentThread targetId="courses:fukugyo-ai" />

          <div className="action-card">
            <h3>まず5分だけ</h3>
            <p>
              完璧を目指さず、STEP1のリサーチを5分やってみてください。手を動かすと景色が変わります。
            </p>
            <div className="links">
              <Link className="btn btn-primary" href="/lessons/step1">
                STEP1 リサーチへ →
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
