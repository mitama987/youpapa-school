import Link from "next/link";
import type { Metadata } from "next";
import { CommentThread } from "@/components/CommentThread";

const LINE_URL = "https://lin.ee/ob91zIx";

export const metadata: Metadata = {
  title: "YouTube作成講座｜企画から投稿までの型",
  description:
    "これから実際にYouTubeで発信していく過程をそのまま教材化。企画→台本→撮影・編集→サムネ→投稿の型を、実践しながら学べる講座です。",
};

export default function YouTubeCourse() {
  return (
    <>
      <section className="detail-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">講座一覧</Link> ＞ 商品 ＞ YouTube作成講座
          </div>
          <span className="eyebrow">商品 ／ コンテンツ作成 ／ 準備中</span>
          <h1>YouTube作成講座 ― 企画から投稿までの型</h1>
          <p>
            これから私自身が実際にYouTubeで発信していく過程を、そのまま教材化していく講座です。企画→台本→撮影・編集→サムネ→投稿までの型を、リアルな試行錯誤とあわせて公開します。
          </p>
        </div>
      </section>

      <div className="layout">
        <main className="content" style={{ flex: 1 }}>
          <div className="card">
            <span className="eyebrow">この講座で得られること</span>
            <h2>ゴール</h2>
            <ul>
              <li>見られる前提で「誰の何を解決するか」を企画に落とせる</li>
              <li>続けられる台本・撮影・編集の型を持てる</li>
              <li>クリックされるサムネとタイトルの作り方が分かる</li>
              <li>投稿を継続する仕組み（テンプレ化・自動化）を作れる</li>
            </ul>

            <h2>カリキュラム（準備中）</h2>
            <ul className="curriculum">
              <li>
                <span className="n" />
                <span>STEP1 企画：チャンネルの核と勝てるテーマ</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>STEP2 台本：最後まで見られる構成の型</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>STEP3 撮影・編集：最小機材と時短ワークフロー</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>STEP4 サムネ・タイトル：クリックされる作り方</span>
                <span className="meta">準備中</span>
              </li>
              <li>
                <span className="n" />
                <span>STEP5 投稿・継続：仕組みで続ける</span>
                <span className="meta">準備中</span>
              </li>
            </ul>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              ※本講座は準備中です。発信の進行にあわせて順次公開します。
            </p>
          </div>

          <CommentThread targetId="courses:youtube" />

          <div className="action-card">
            <h3>公開のお知らせを受け取る</h3>
            <p>
              YouTube作成講座は現在準備中です。LINEに登録しておくと、公開時にいち早くお知らせが届きます。
            </p>
            <div className="links">
              <a className="btn btn-line" href={LINE_URL}>
                LINEで受け取る（無料）
              </a>
              <Link className="btn btn-ghost" href="/courses/sns">
                集客の全体像（SNS集客講座）→
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
