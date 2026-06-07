import Link from "next/link";
import type { Metadata } from "next";
import { CommentThread } from "@/components/CommentThread";

const LINE_URL = "https://lin.ee/ob91zIx";

export const metadata: Metadata = {
  title: "Webアプリ作成講座｜AIで最小工数のWebアプリを作る",
  description:
    "環境構築不要で誰でも使えるWebアプリを、Claude CodeなどのAIで最小工数から形にする講座。企画→設計→実装→デプロイ→改善の型を実践します。",
};

export default function WebAppCourse() {
  return (
    <>
      <section className="detail-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">講座一覧</Link> ＞ 商品 ＞ Webアプリ作成講座
          </div>
          <span className="eyebrow">商品 ／ 開発・自動化 ／ 準備中</span>
          <h1>Webアプリ作成講座 ― AIで最小工数のWebアプリを作る</h1>
          <p>
            「商品」を最短で形にする講座です。環境構築が要らず誰でもすぐ使えるWebアプリを、Claude CodeなどのAIを使って最小工数で作ります。完璧を目指さず、まず70点のMVPを出して声を聞きながら磨くループを身につけます。
          </p>
        </div>
      </section>

      <div className="layout">
        <main className="content" style={{ flex: 1 }}>
          <div className="card">
            <span className="eyebrow">この講座で得られること</span>
            <h2>ゴール</h2>
            <ul>
              <li>解決したい不満を1つに絞り、Webアプリの企画に落とせる</li>
              <li>AI（Claude Code等）でコーディングを加速し、最小工数でMVPを作れる</li>
              <li>環境構築不要で配布できる形までデプロイできる</li>
              <li>使った人の声で改善し続ける仕組みを作れる</li>
            </ul>

            <h2>カリキュラム（準備中）</h2>
            <ul className="curriculum">
              <li>
                <span className="n" />
                <span>STEP1 企画：不満を1つに絞って要件にする</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>STEP2 画面設計：最小構成のUIを決める</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>STEP3 実装：AIでコーディングを加速する</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>STEP4 デプロイ：誰でも使える形で公開する</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>STEP5 改善：声を集めて磨き続ける</span>
                <span className="meta">準備中</span>
              </li>
            </ul>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              ※本講座は準備中です。公開され次第、このページで受講できます。
            </p>
          </div>

          <CommentThread targetId="courses:web-app" />

          <div className="action-card">
            <h3>公開のお知らせを受け取る</h3>
            <p>
              Webアプリ作成講座は現在準備中です。LINEに登録しておくと、公開時にいち早くお知らせが届きます。
            </p>
            <div className="links">
              <a className="btn btn-line" href={LINE_URL}>
                LINEで受け取る（無料）
              </a>
              <Link className="btn btn-ghost" href="/lessons/step2">
                先に「STEP2 商品」を読む →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
