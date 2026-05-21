import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事",
  description: "副業×AI×自動化スクール「シクミ」の記事一覧。",
};

export default function Articles() {
  return (
    <section className="block">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="kicker">ARTICLES</div>
            <h2>記事</h2>
            <p>講座と合わせて読むと理解が深まる実践記事です。</p>
          </div>
        </div>

        <Link className="article-card" href="/articles/fukugyo-ai-start">
          <div className="pills">
            <span className="pill lv">テンプレ公開</span>
            <span className="pill cat">副業の始め方</span>
          </div>
          <h3>【テンプレ公開】副業×AI×自動化で月10万稼ぐ始め方｜3年分の知見を1記事に凝縮</h3>
          <p>
            リサーチ→商品→販売→集客の4ステップを、型と実例で一気に把握。講座を始める前の全体像として最適です。
          </p>
          <span className="course-meta">
            <span>読み物 ／ 約8分</span>
            <span className="go">記事を読む →</span>
          </span>
        </Link>

        <div className="article-card" style={{ opacity: 0.7 }}>
          <div className="pills">
            <span className="pill soon">準備中</span>
          </div>
          <h3>会社員をしながら副業の作業時間を捻出する方法</h3>
          <p>近日公開。LINE登録者には先行で配布予定です。</p>
        </div>
      </div>
    </section>
  );
}
