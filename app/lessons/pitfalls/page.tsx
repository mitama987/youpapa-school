import Link from "next/link";
import type { Metadata } from "next";
import { LessonShell } from "@/components/LessonShell";
import { LikeButton } from "@/components/LikeButton";
import { Pager } from "@/components/Pager";

const LINE_URL = "https://lin.ee/ob91zIx";

export const metadata: Metadata = {
  title: "補講｜つまずきやすいポイントと対処",
  description: "4ステップ実践で必ず出てくる詰まりどころと、先回りの対処テンプレート。",
};

export default function Pitfalls() {
  return (
    <LessonShell>
      <div className="crumbs">
        <Link href="/">講座一覧</Link> ＞ <Link href="/courses/fukugyo-ai">副業×AI×自動化</Link> ＞ 補講
      </div>
      <div className="card">
        <span className="eyebrow">補講</span>
        <h1>つまずきやすいポイントと対処</h1>
        <p className="lead">
          4ステップを実行すると、必ず出てくる詰まりどころがあります。先回りで対処をテンプレ化しました。
        </p>
        <ul>
          <li>
            <strong>リサーチで完璧を求めて動けない</strong> → 不満が3つ見えたら70点で進む
          </li>
          <li>
            <strong>作る途中で別アイデアに目移りする</strong> → 1商品が形になるまで他はメモして封印
          </li>
          <li>
            <strong>売れない</strong> → 商品より先に「LP（伝えかた）」と「ターゲット（相手）」を疑う
          </li>
          <li>
            <strong>発信が続かない</strong> → 核を1つに絞り、媒体を機械的に回す（毎回考えない）
          </li>
          <li>
            <strong>結果が遅くて不安</strong> → 私も1万→3万→5万→10万に2年。複利は後半で効く
          </li>
        </ul>

        <h2>まとめ：才能ではなく「順番」と「仕組み」</h2>
        <p>
          特別な才能はありませんでした。人脈もありません。あったのは「会社を辞めたい」という気持ちと、夜10時から続けた小さな積み重ねだけです。副業で人生の選択肢を増やすのに必要なのは、ひらめきではなく順番と仕組みです。仕組みは、だれでも作れます。
        </p>
        <p style={{ marginTop: 18 }}>
          <LikeButton targetId="lessons:pitfalls" />
        </p>
      </div>

      <div className="action-card">
        <h3>もっと深く、もっとラクに</h3>
        <p>
          会社員をやりながらの時間の作り方、そして記事・X・YouTubeを自動化して続ける仕組みは、LINEで配布・解説しています。今日、STEP1のリサーチを5分だけやってみてください。
        </p>
        <div className="links">
          <a className="btn btn-line" href={LINE_URL}>
            LINEで受け取る（無料）
          </a>
          <Link className="btn btn-ghost" href="/lessons/step1">
            STEP1へ戻る
          </Link>
        </div>
      </div>

      <Pager
        prev={{ href: "/lessons/step4", label: "← STEP4 集客" }}
        next={{ href: "/", label: "トップへ →" }}
      />
    </LessonShell>
  );
}
