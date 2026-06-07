import Link from "next/link";
import type { Metadata } from "next";
import { CommentThread } from "@/components/CommentThread";

const LINE_URL = "https://lin.ee/ob91zIx";

export const metadata: Metadata = {
  title: "LP作成講座｜価値が伝わって売れるLPの型",
  description:
    "作った商品を「売る」ための講座。価値が伝わるLP（ランディングページ）の構成・コピー・価格設計の型を、実物のプロダクトLPを教材に実践します。",
};

export default function LpCourse() {
  return (
    <>
      <section className="detail-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">講座一覧</Link> ＞ 販売 ＞ LP作成講座
          </div>
          <span className="eyebrow">販売 ／ セールス ／ 準備中</span>
          <h1>LP作成講座 ― 価値が伝わって売れるLPの型</h1>
          <p>
            良い商品でも「伝わらなければ売れません」。この講座では、価値が伝わるLP（ランディングページ）の構成・コピー・価格設計の型を、実際に公開している製品LPを教材にして学びます。
          </p>
        </div>
      </section>

      <div className="layout">
        <main className="content" style={{ flex: 1 }}>
          <div className="card">
            <span className="eyebrow">この講座で得られること</span>
            <h2>ゴール</h2>
            <ul>
              <li>読み手の不満と理想から逆算したLPの骨子を作れる</li>
              <li>刺さるヘッドコピーとベネフィットの書き方が分かる</li>
              <li>納得感のある価格設計とオファーを組める</li>
              <li>離脱を防ぐ導線とCTAの置き方が分かる</li>
            </ul>

            <h2>カリキュラム（準備中）</h2>
            <ul className="curriculum">
              <li>
                <span className="n" />
                <span>STEP1 設計：誰の不満を、どんな未来に変えるか</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>STEP2 コピー：ヘッドラインとベネフィット</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>STEP3 構成：上から読ませるLPの型</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>STEP4 価格・オファー：納得して買える設計</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>STEP5 CTA・改善：離脱を防ぎ成約率を上げる</span>
                <span className="meta">準備中</span>
              </li>
            </ul>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              ※本講座は準備中です。まずは「STEP3 販売」で土台を掴めます。
            </p>
          </div>

          <CommentThread targetId="courses:lp" />

          <div className="action-card">
            <h3>公開のお知らせを受け取る</h3>
            <p>
              LP作成講座は現在準備中です。LINEに登録しておくと、公開時にいち早くお知らせが届きます。
            </p>
            <div className="links">
              <a className="btn btn-line" href={LINE_URL}>
                LINEで受け取る（無料）
              </a>
              <Link className="btn btn-ghost" href="/lessons/step3">
                先に「STEP3 販売」を読む →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
