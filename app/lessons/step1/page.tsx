import Link from "next/link";
import type { Metadata } from "next";
import { LessonShell } from "@/components/LessonShell";
import { LessonChecklist } from "@/components/LessonChecklist";
import { Pager } from "@/components/Pager";

export const metadata: Metadata = {
  title: "STEP1 リサーチ｜売れる商品の不満を見つける",
  description:
    "副業の最初の一歩。ゼロから需要を作らず、すでに売れている商品の不満を拾うリサーチの型・探す場所・5項目チェックリスト。無料講座シクミ STEP1。",
};

export default function Step1() {
  return (
    <LessonShell>
      <div className="crumbs">
        <Link href="/">講座一覧</Link> ＞ <Link href="/courses/fukugyo-ai">副業×AI×自動化</Link> ＞ STEP1
      </div>
      <div className="card">
        <span className="eyebrow">STEP1 / 4</span>
        <h1>リサーチ：売れている商品の「不満」を見つける</h1>
        <p className="lead">
          最初のSTEPで9割が決まります。逆に言えば、ここさえ型どおりやれば、あとは流れに乗るだけです。
        </p>

        <h2>型：ゼロから需要を作らない。証明済みの市場で「不満」を拾う</h2>
        <p>
          リサーチの目的は、斬新なアイデアを思いつくことではありません。
          <strong>すでにお金が動いている市場を見つけ、その商品の不満を集めること</strong>です。発明ではなく、すでにある不満を拾うだけ。だからだれにでもできます。
        </p>
        <p>
          売れている商品があるという事実は、お金を払う人が確実にいるという証拠です。需要をゼロから生み出すのではなく、「あるのに満たされていない不満」を埋めます。宝の地図になるのは「低評価」と「できない」という言葉です。
        </p>

        <h3>不満を探す場所</h3>
        <ul className="tag-list">
          <li>ココナラ・Brain・note の人気商品の低評価</li>
          <li>App Store / Google Play の星1〜3レビュー</li>
          <li>Amazon 関連書籍の「分かりにくい」の声</li>
          <li>X でジャンル名を検索した愚痴・要望</li>
          <li>Udemy・既存サービスの「これができない」質問</li>
        </ul>

        <div className="callout story">
          <div className="label">私の実例</div>
          X運用の自動化に取り組んだとき、自動投稿ツールはすでに存在していました。ユーザーの声を拾うと不満が並びます——「価格が高い」「設定が難しい」「サポートがほぼない」。この3つが、そのまま商品の設計図になりました。さらにココナラで「面倒な作業を自動化します」と出品すると初月で3件。月1万円ですが、需要の実証になりました。
        </div>
        <div className="callout warn">
          <div className="label">やってはいけない</div>
          競合ゼロの市場へ「ブルーオーシャンだ」と飛び込むこと。競合がいないのは、たいてい「お金にならない」という先人の答えです。
        </div>

        <h2>チェックリスト</h2>
        <LessonChecklist
          items={[
            { id: "s1-1", text: "そのジャンルで実際に売上が立っている商品が3つ以上あるか" },
            { id: "s1-2", text: "その商品群に共通する不満（高い・難しい・サポートがない 等）が見えるか" },
            { id: "s1-3", text: "その不満を抱えた人を、どこに行けば見つけられるか言えるか" },
            { id: "s1-4", text: "自分がその不満を解決する手段（技術・自動化）を持っているか" },
            { id: "s1-5", text: "「誰の」「どの困りごとを」解決するか、1文で言い切れるか" },
          ]}
        />
        <p>5つ埋まればSTEP1は合格です。完璧でなくてかまいません。</p>
      </div>

      <Pager
        prev={{ href: "/courses/fukugyo-ai", label: "← 講座トップ" }}
        next={{ href: "/lessons/step2", label: "STEP2 商品 →" }}
      />
    </LessonShell>
  );
}
