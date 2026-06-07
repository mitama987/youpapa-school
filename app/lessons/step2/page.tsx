import Link from "next/link";
import type { Metadata } from "next";
import { CommentThread } from "@/components/CommentThread";
import { LessonShell } from "@/components/LessonShell";
import { LessonChecklist } from "@/components/LessonChecklist";
import { LikeButton } from "@/components/LikeButton";
import { Pager } from "@/components/Pager";

export const metadata: Metadata = {
  title: "STEP2 商品｜AIと自動化で最小で作る",
  description: "STEP1で見つけた不満を1つに絞り、AIと自動化で最小限のMVPを作る型と5項目チェックリスト。",
};

export default function Step2() {
  return (
    <LessonShell>
      <div className="crumbs">
        <Link href="/">講座一覧</Link> ＞ <Link href="/courses/fukugyo-ai">副業×AI×自動化</Link> ＞ STEP2
      </div>
      <div className="card">
        <span className="eyebrow">STEP2 / 4</span>
        <h1>商品：AIと自動化で不満を解消するアプリを最小で作る</h1>
        <p className="lead">
          需要と不満が見えたら、ようやく作り始めます。失敗パターンは「全部入りの完璧な商品を狙い、永遠に完成しない」ことです。
        </p>

        <h2>型：解決する不満を1つに絞り、最小で出す</h2>
        <p>
          STEP1で見つけた不満を、欲張らず1つだけ選びます。一番刺さる1つを最小限の機能で消す。これがMVP（実用最小限の製品）の考えかたです。70点で出して、使った人の声で80点、90点へ上げます。完璧主義は副業の最大の敵です。
        </p>

        <h3>AIと自動化でレバレッジをかける</h3>
        <ul>
          <li>開発をAIで加速する（Claude Codeのような開発支援AIで、個人でも開発速度が何倍にもなります）</li>
          <li>中身を自動化で価値にする（手作業で30分かかることをワンクリックに変える）</li>
          <li>自分の作業も自動化する（リサーチ・テスト・サポート定型文をテンプレ化する）</li>
        </ul>
        <h3>作る形は不満に合わせて選ぶ</h3>
        <ul className="tag-list">
          <li>配布が簡単なデスクトップアプリ</li>
          <li>環境構築が要らないWebアプリ</li>
          <li>最小コストのスプレッドシート＋スクリプト</li>
        </ul>

        <div className="callout story">
          <div className="label">私の実例</div>
          出発点は夜10時からのPython独学、スキルゼロです。最初のツールは押し売りで売上ゼロ。転機は「自分が作りたい機能」ではなく「相手が困っている1点」から作り直したこと。重要なのは、完成させてから売るのではなく、最小で出して声を聞いて直すループに乗ること。AIで開発が速くなった今、3年かけたループは数ヶ月へ圧縮できます。
        </div>

        <h2>チェックリスト</h2>
        <LessonChecklist
          items={[
            { id: "s2-1", text: "解決する不満を1つに絞れているか（盛り込みすぎていないか）" },
            { id: "s2-2", text: "その不満が「最小構成」でも消えるか" },
            { id: "s2-3", text: "開発・運用にAIや自動化を組み込めているか" },
            { id: "s2-4", text: "初心者でも詰まらない導線になっているか（「難しい」を自分で再現していないか）" },
            { id: "s2-5", text: "出した後に改善できる構造になっているか" },
          ]}
        />
        <p style={{ marginTop: 18 }}>
          <LikeButton targetId="lessons:step2" />
        </p>
      </div>

      <CommentThread targetId="lessons:step2" />

      <div className="action-card">
        <h3>次のアクション：商品づくりを深掘りする</h3>
        <p>
          このSTEPの「商品」を実際に形にする専門講座を用意しています。まずは環境構築不要で作れる「Webアプリ作成講座」から、AIで最小工数の商品づくりを学べます。
        </p>
        <div className="links">
          <Link className="btn btn-primary" href="/courses/web-app">
            Webアプリ作成講座へ →
          </Link>
          <a
            className="btn btn-ghost"
            href="https://mitama987.github.io/youpapa-school/xtp3/"
          >
            実物のプロダクト例（XTP3）
          </a>
        </div>
      </div>

      <Pager
        prev={{ href: "/lessons/step1", label: "← STEP1 リサーチ" }}
        next={{ href: "/lessons/step3", label: "STEP3 販売 →" }}
      />
    </LessonShell>
  );
}
