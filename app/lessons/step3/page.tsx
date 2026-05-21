import Link from "next/link";
import type { Metadata } from "next";
import { LessonShell } from "@/components/LessonShell";
import { LessonChecklist } from "@/components/LessonChecklist";
import { LikeButton } from "@/components/LikeButton";
import { Pager } from "@/components/Pager";

export const metadata: Metadata = {
  title: "STEP3 販売｜価値が伝わるLPを作る7つの構成",
  description: "機能ではなく「あなたの悩みがこう消える」を売る、ヘッドラインからFAQまで7構成のLP型と7項目チェックリスト。",
};

export default function Step3() {
  return (
    <LessonShell>
      <div className="crumbs">
        <Link href="/">講座一覧</Link> ＞ <Link href="/courses/fukugyo-ai">副業×AI×自動化</Link> ＞ STEP3
      </div>
      <div className="card">
        <span className="eyebrow">STEP3 / 4</span>
        <h1>販売：価値が伝わるLPを作る7つの構成</h1>
        <p className="lead">
          良い商品でも、価値が伝わらないと売れません。私が3ヶ月売上ゼロだったのは、商品が悪かっただけでなく、販売ページが存在しなかったからです。
        </p>

        <h2>型：機能ではなく「あなたの悩みがこう消える」を売る</h2>
        <p>
          買う人が知りたいのは機能ではありません。「使うと自分のどの悩みが、どう消えるのか」だけです。下の7構成を上から順に書けば、伝わるLPの形になります。チェックリストとして使ってください。
        </p>

        <h2>LP構成テンプレート（チェックリスト）</h2>
        <LessonChecklist
          items={[
            { id: "s3-1", text: "ヘッドライン：誰の・どの悩みが・どうなるかを一文で言い切る" },
            { id: "s3-2", text: "共感：読者が抱えている悩みを、本人より正確に言語化する" },
            { id: "s3-3", text: "ベネフィット：機能ではなく「使った後の変化」を見せる" },
            { id: "s3-4", text: "証拠：実績・レビュー・before/afterで「本当に変わる」と示す" },
            { id: "s3-5", text: "オファー：価格・特典・保証を明確にして不安を取り除く" },
            { id: "s3-6", text: "行動の明示：次にやることを1つだけ、迷わず示す" },
            { id: "s3-7", text: "よくある質問：購入をためらわせる疑問を、買う前に先回りで潰す" },
          ]}
        />

        <h3>価格設計も販売の一部</h3>
        <div className="callout warn">
          <div className="label">痛い目で学んだこと</div>
          「無料」「初月無料」はノイズを呼びます。検討の浅い層を大量に集め、質問やクレーム対応で時間を溶かすからです。私は初月無料をやめ、7日間返金保証へ切り替えました。安さで釣るより、信頼を担保する設計で不安を消すほうが結果的に強いです。
        </div>
        <div className="callout story">
          <div className="label">私の実例</div>
          3ヶ月売上ゼロの本当の原因は、DM一発で「便利ですよ」と押し付け、価値を順序立てて伝える場所を持っていなかったこと。販売ページを整え「誰の・どの悩みが・どう消えるか」を順番に並べただけで、同じ商品の反応がまるで変わりました。売れないとき疑うのは、商品より先に「伝えかた」と「相手」です。
        </div>
        <p style={{ marginTop: 18 }}>
          <LikeButton targetId="lessons:step3" />
        </p>
      </div>

      <div className="action-card">
        <h3>次のアクション：実物のLPをお手本にする</h3>
        <p>
          私が実際に運用しているプロダクトのLPです。上の7構成がどう実装されているか、生きた見本として分解してみてください。
        </p>
        <div className="links">
          <a
            className="btn btn-primary"
            href="https://mitama987.github.io/youpapa-school/xtp3/"
          >
            XTP3 LP を見る（買い切り型ツール）
          </a>
          <a
            className="btn btn-ghost"
            href="https://mitama987.github.io/youpapa-school/xtp4/"
          >
            XTP4 LP を見る（中小企業向け）
          </a>
        </div>
      </div>

      <Pager
        prev={{ href: "/lessons/step2", label: "← STEP2 商品" }}
        next={{ href: "/lessons/step4", label: "STEP4 集客 →" }}
      />
    </LessonShell>
  );
}
