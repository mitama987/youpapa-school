import Link from "next/link";
import type { Metadata } from "next";
import { CommentThread } from "@/components/CommentThread";

const LINE_URL = "https://lin.ee/ob91zIx";

export const metadata: Metadata = {
  title: "SNS集客講座｜note・ココナラ・X・Threadsの実践",
  description:
    "私がこれまで実際に実践してきたSNS集客の中身を構成した講座。note・ココナラ・X・Threadsを使い分け、同じ核を配信し続ける集客の仕組みを作ります。",
};

export default function SnsCourse() {
  return (
    <>
      <section className="detail-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">講座一覧</Link> ＞ 集客 ＞ SNS集客講座
          </div>
          <span className="eyebrow">集客 ／ SNS実践 ／ 準備中</span>
          <h1>SNS集客講座 ― note・ココナラ・X・Threadsの実践</h1>
          <p>
            広告に頼らず「広める」ための講座です。私がこれまで実際に実践してきた内容を中心に、note・ココナラ・X・Threadsをどう使い分け、同じ核を配信し続けて集客につなげるかを公開します。
          </p>
        </div>
      </section>

      <div className="layout">
        <main className="content" style={{ flex: 1 }}>
          <div className="card">
            <span className="eyebrow">この講座で得られること</span>
            <h2>ゴール</h2>
            <ul>
              <li>各SNS（note・ココナラ・X・Threads）の役割と使い分けが分かる</li>
              <li>1つの「核」から複数SNSへ展開する発信設計を作れる</li>
              <li>続けられる投稿フロー（テンプレ化・再利用）を組める</li>
              <li>SNSから商品・LPへつなぐ導線を設計できる</li>
            </ul>

            <h2>カリキュラム（準備中）</h2>
            <ul className="curriculum">
              <li>
                <span className="n" />
                <span>note：実体験を資産記事にして信頼を集める</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>ココナラ：スキルを出品して最初の実績を作る</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>X：日々の発信で接点と拡散を増やす</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>Threads：相性の良い層へ届ける運用</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>横断：同じ核を配信し続ける仕組み化</span>
                <span className="meta">準備中</span>
              </li>
            </ul>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              ※本講座は準備中です。実践の蓄積を順次教材化していきます。
            </p>
          </div>

          <CommentThread targetId="courses:sns" />

          <div className="action-card">
            <h3>公開のお知らせを受け取る</h3>
            <p>
              SNS集客講座は現在準備中です。LINEに登録しておくと、公開時にいち早くお知らせが届きます。
            </p>
            <div className="links">
              <a className="btn btn-line" href={LINE_URL}>
                LINEで受け取る（無料）
              </a>
              <Link className="btn btn-ghost" href="/lessons/step4">
                先に「STEP4 集客」を読む →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
