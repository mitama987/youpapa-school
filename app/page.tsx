import Link from "next/link";
import { ResumeCTA } from "@/components/ResumeCTA";

const LINE_URL = "https://lin.ee/ob91zIx";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow">動画ではなく「手を動かす」実践アカデミー</span>
          <h1>
            副業×<span className="hl">AI</span>×自動化で<span className="hl">月10万</span>
            <br className="br-pc" />
            ゼロから学べる無料スクール
          </h1>
          <p>
            累計売上200万・個人開発7年の知見を4ステップに凝縮。登録不要・全レッスン無料。チェックを埋めながら進めれば、迷いません。
          </p>
          <div className="cta">
            <ResumeCTA />
            <Link className="btn btn-ghost" href="/courses/fukugyo-ai">
              講座の全体像を見る
            </Link>
          </div>
        </div>
      </section>

      <div className="promo">
        <div className="wrap">
          <span className="tag">全コンテンツ無料</span>
          <p>
            講座・記事はすべて無料。さらに「作業時間の作り方」と自動化スキルは LINE で配布しています。
          </p>
          <a className="btn btn-line" href={LINE_URL}>
            LINEで受け取る（無料）
          </a>
        </div>
      </div>

      <section className="block">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="kicker">START HERE</div>
              <h2>受講の進め方（3ステップ）</h2>
              <p>むずかしい準備は不要。次の3つだけ意識すれば迷いません。</p>
            </div>
          </div>
          <div className="howto">
            <div className="st">
              <span className="no">1</span>
              <h3>まず「副業×AI×自動化」講座を開く</h3>
              <p>下の講座一覧の先頭、または上の「STEP1から無料で始める」から。最初の講座はこれ1本でOKです。</p>
            </div>
            <div className="st">
              <span className="no">2</span>
              <h3>STEP1→4を順にチェックを埋める</h3>
              <p>各レッスンのチェックリストを上から埋めるだけ。進捗は自動保存され、次にやることが常に表示されます。</p>
            </div>
            <div className="st">
              <span className="no">3</span>
              <h3>つまずいたら掲示板かLINEへ</h3>
              <p>手が止まったら補講「つまずき対処」を読み、それでも不明なら掲示板・LINEで質問できます。</p>
            </div>
          </div>
          <p style={{ margin: "8px 0 0" }}>
            <ResumeCTA />
          </p>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="kicker">COURSES</div>
              <h2>講座一覧</h2>
              <p>
                稼ぐ流れは「商品 → 販売 → 集客」。まずは全体像をつかむ入門講座から始め、各分野を深掘りできます。
              </p>
            </div>
          </div>

          {/* ★まずはここから（フィーチャー講座） */}
          <div className="grid">
            <Link className="course-card" href="/courses/fukugyo-ai">
              <div className="thumb t1">
                <img
                  src="/thumbs/fukugyo-ai.webp"
                  alt="副業×AI×自動化 月10万 4ステップ"
                  loading="lazy"
                />
              </div>
              <div className="course-body">
                <div className="pills">
                  <span className="pill live">★まずはここから</span>
                  <span className="pill lv">入門→実践</span>
                  <span className="pill cat">全体像</span>
                </div>
                <h3>副業×AI×自動化で月10万 ― 4ステップ実践</h3>
                <p>
                  リサーチ→商品→販売→集客。3年分の遠回りを削ったテンプレートを、チェックリスト付きで実践します。最初の1本はこれだけでOK。
                </p>
                <div className="course-meta">
                  <span>全5レッスン・無料</span>
                  <span className="go">受講する →</span>
                </div>
              </div>
            </Link>
          </div>

          {/* 商品 */}
          <div className="cat-head">
            <div className="kicker">PRODUCT</div>
            <h3>商品 ― つくる</h3>
            <p>解決したい不満を、AIと自動化で最小工数の商品に。</p>
          </div>
          <div className="grid">
            <Link className="course-card" href="/courses/web-app">
              <div className="thumb t5">
                <img
                  src="/thumbs/web-app.webp"
                  alt="Webアプリ作成講座"
                  loading="lazy"
                />
              </div>
              <div className="course-body">
                <div className="pills">
                  <span className="pill lv">入門→実践</span>
                  <span className="pill cat">開発・自動化</span>
                  <span className="pill soon">準備中</span>
                </div>
                <h3>Webアプリ作成講座</h3>
                <p>環境構築不要のWebアプリを、Claude CodeなどのAIで最小工数から作る型を実践します。</p>
                <div className="course-meta">
                  <span>簡易ガイド公開中</span>
                  <span className="go">見てみる →</span>
                </div>
              </div>
            </Link>

            <Link className="course-card" href="/courses/youtube">
              <div className="thumb t3">
                <img
                  src="/thumbs/youtube.webp"
                  alt="YouTube作成講座"
                  loading="lazy"
                />
              </div>
              <div className="course-body">
                <div className="pills">
                  <span className="pill lv">入門→実践</span>
                  <span className="pill cat">コンテンツ作成</span>
                  <span className="pill soon">準備中</span>
                </div>
                <h3>YouTube作成講座</h3>
                <p>これから実際に発信していく過程を教材化。企画→台本→編集→サムネ→投稿の型を学べます。</p>
                <div className="course-meta">
                  <span>簡易ガイド公開中</span>
                  <span className="go">見てみる →</span>
                </div>
              </div>
            </Link>

            <span className="course-card">
              <div className="thumb t6">
                <img
                  src="/thumbs/youtube-edit.webp"
                  alt="YouTube自動編集・サムネ・投稿"
                  loading="lazy"
                />
              </div>
              <div className="course-body">
                <div className="pills">
                  <span className="pill lv">応用</span>
                  <span className="pill cat">開発・自動化</span>
                  <span className="pill soon">準備中</span>
                </div>
                <h3>YouTube自動編集・サムネ・投稿</h3>
                <p>動画編集からサムネ生成・投稿まで自動化するスキル。近日公開予定。</p>
                <div className="course-meta">
                  <span>Coming soon</span>
                  <span className="go">準備中</span>
                </div>
              </div>
            </span>
          </div>

          {/* 販売 */}
          <div className="cat-head">
            <div className="kicker">SALES</div>
            <h3>販売 ― 売る</h3>
            <p>良い商品を「伝わる形」にして売る。</p>
          </div>
          <div className="grid">
            <Link className="course-card" href="/courses/lp">
              <div className="thumb t2">
                <img src="/thumbs/lp.webp" alt="LP作成講座" loading="lazy" />
              </div>
              <div className="course-body">
                <div className="pills">
                  <span className="pill lv">入門→実践</span>
                  <span className="pill cat">セールス</span>
                  <span className="pill soon">準備中</span>
                </div>
                <h3>LP作成講座</h3>
                <p>価値が伝わるLPの構成・コピー・価格設計の型を、実物の製品LPを教材に学びます。</p>
                <div className="course-meta">
                  <span>簡易ガイド公開中</span>
                  <span className="go">見てみる →</span>
                </div>
              </div>
            </Link>
          </div>

          {/* 集客 */}
          <div className="cat-head">
            <div className="kicker">ATTRACT</div>
            <h3>集客 ― 広める</h3>
            <p>広告に頼らず、同じ核を配信し続けて広める。</p>
          </div>
          <div className="grid">
            <Link className="course-card" href="/courses/sns">
              <div className="thumb t7">
                <img
                  src="/thumbs/sns.webp"
                  alt="SNS集客講座 note・ココナラ・X・Threads"
                  loading="lazy"
                />
              </div>
              <div className="course-body">
                <div className="pills">
                  <span className="pill lv">実践</span>
                  <span className="pill cat">SNS実践</span>
                  <span className="pill soon">準備中</span>
                </div>
                <h3>SNS集客講座（note・ココナラ・X・Threads）</h3>
                <p>これまで実際に実践してきた内容を中心に、各SNSの使い分けと発信の仕組み化を公開します。</p>
                <div className="course-meta">
                  <span>簡易ガイド公開中</span>
                  <span className="go">見てみる →</span>
                </div>
              </div>
            </Link>

            <span className="course-card">
              <div className="thumb t4">
                <img
                  src="/thumbs/claude-note.webp"
                  alt="Claude Codeで記事自動生成→note投稿"
                  loading="lazy"
                />
              </div>
              <div className="course-body">
                <div className="pills">
                  <span className="pill lv">応用</span>
                  <span className="pill cat">開発・自動化</span>
                  <span className="pill soon">準備中</span>
                </div>
                <h3>Claude Codeで記事自動生成→note投稿</h3>
                <p>記事を自動生成し、そのままnoteへ投稿するスキル。近日公開予定です。</p>
                <div className="course-meta">
                  <span>Coming soon</span>
                  <span className="go">準備中</span>
                </div>
              </div>
            </span>

            <span className="course-card">
              <div className="thumb t5">
                <img
                  src="/thumbs/x-post.webp"
                  alt="Xポスト自動生成スキル"
                  loading="lazy"
                />
              </div>
              <div className="course-body">
                <div className="pills">
                  <span className="pill lv">応用</span>
                  <span className="pill cat">開発・自動化</span>
                  <span className="pill soon">準備中</span>
                </div>
                <h3>Xポスト自動生成スキル</h3>
                <p>発信の核から日々のポストを自動生成。継続を仕組みに変えます。近日公開予定。</p>
                <div className="course-meta">
                  <span>Coming soon</span>
                  <span className="go">準備中</span>
                </div>
              </div>
            </span>
          </div>

          {/* ツール誘導（販売ツールは講座一覧に置かず、マーケットへ） */}
          <div className="tool-cta">
            <div>
              <h3>集客ツールをお探しですか？</h3>
              <p>
                XToolsPro3 / Amazon在庫復活アドオン / XToolsPro4 などの集客ツールは、ツール一覧（マーケット）にまとめています。
              </p>
            </div>
            <a
              className="btn btn-primary"
              href="https://sns-tools-market.vercel.app/"
            >
              ツール一覧を見る →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
