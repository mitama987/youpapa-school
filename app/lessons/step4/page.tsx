import Link from "next/link";
import type { Metadata } from "next";
import { CommentThread } from "@/components/CommentThread";
import { LessonShell } from "@/components/LessonShell";
import { LessonChecklist } from "@/components/LessonChecklist";
import { LikeButton } from "@/components/LikeButton";
import { Pager } from "@/components/Pager";

export const metadata: Metadata = {
  title: "STEP4 集客｜note・YouTube・Xで同じ核を配信し続ける",
  description: "ワンソース・マルチユース集客の型と5項目チェックリスト。X固定ポスト→note柱記事→商品LPの一本道。",
};

export default function Step4() {
  return (
    <LessonShell>
      <div className="crumbs">
        <Link href="/">講座一覧</Link> ＞ <Link href="/courses/fukugyo-ai">副業×AI×自動化</Link> ＞ STEP4
      </div>
      <div className="card">
        <span className="eyebrow">STEP4 / 4</span>
        <h1>集客：note・YouTube・Xで同じ核を配信し続ける</h1>
        <p className="lead">
          商品とLPができたら、最後はそこへ人を流しつづける仕組みです。場当たりでやると毎回ゼロから集客し、消耗して続きません。
        </p>

        <h2>型：1つの核を、媒体ごとに最適化して配る</h2>
        <p>
          発信は毎回ちがうことを言う必要はありません。あなたの方法論という<strong>1つの核</strong>を、媒体ごとに形を変えて配りつづける（ワンソース・マルチユース）のが正解です。媒体には役割があります。
        </p>
        <ul>
          <li>
            <strong>X</strong>：毎日の発信とフォロー外への発掘エンジン。固定ポストで全体像へ送る
          </li>
          <li>
            <strong>note</strong>：深く語る柱記事と有料商品の受け皿
          </li>
          <li>
            <strong>YouTube</strong>：手順を見せて信頼と検索資産を積む
          </li>
        </ul>

        <h3>2026年の新Xアルゴリズム前提</h3>
        <div className="callout note">
          <div className="label">中身をAIが読む時代</div>
          <ul style={{ margin: ".3em 0 0" }}>
            <li>小手先のテクニックより、テーマの一貫性と中身の質が効く</li>
            <li>リプライと引用が、フォロー外へ飛ぶ最大の起点になる</li>
            <li>興味なし・ブロック・ミュート・通報のネガティブ反応は一発で失速する</li>
          </ul>
        </div>
        <p>
          導線は1本道にします：<strong>X固定ポスト（全体像）→ note柱記事（深掘り）→ 商品・LP（解決策）</strong>。
        </p>

        <div className="callout story">
          <div className="label">私の実例</div>
          Xのプロフィールに「副業×AI×自動化で月10万稼ぐ方法を毎日発信中。始め方は固定ポストから」と書き、固定ポストに0→10万の全手順を置いています。毎日の発信で興味を持った人が固定ポストで全体像をつかみ、柱記事で深掘りし、商品へたどり着く。累計売上200万円は、才能ではなく、同じ核を毎日配りつづけた仕組みの結果です。
        </div>

        <h2>チェックリスト</h2>
        <LessonChecklist
          items={[
            { id: "s4-1", text: "発信の核（あなたの方法論）を1つに言語化したか" },
            { id: "s4-2", text: "X：固定ポストに全体像をまとめ、毎日発信する運用にしたか" },
            { id: "s4-3", text: "note：深掘りの柱記事を1本用意したか" },
            { id: "s4-4", text: "YouTube：手順を見せる動画の枠を決めたか" },
            { id: "s4-5", text: "導線を「X固定ポスト→note→商品LP」の一本道にしたか" },
          ]}
        />
        <p style={{ marginTop: 18 }}>
          <LikeButton targetId="lessons:step4" />
        </p>
      </div>

      <CommentThread targetId="lessons:step4" />

      <div className="action-card">
        <h3>次のアクション：配信を自動化して続ける仕組みにする</h3>
        <p>
          「1人で全部まわすのは無理」を解くのが自動化です。私が実際に使っている配信自動化スキルを準備中です。公開したらここから受け取れます。
        </p>
        <div className="links">
          <span className="btn btn-primary soon">記事を自動生成→note投稿スキルLP</span>
          <span className="btn btn-primary soon">Xポスト自動生成スキルLP</span>
          <span className="btn btn-primary soon">YouTube自動編集・投稿スキルLP</span>
        </div>
      </div>

      <Pager
        prev={{ href: "/lessons/step3", label: "← STEP3 販売" }}
        next={{ href: "/lessons/pitfalls", label: "つまずき対処 →" }}
      />
    </LessonShell>
  );
}
