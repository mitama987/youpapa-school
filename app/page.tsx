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
              <p>まずは入門の「副業×AI×自動化」から。</p>
            </div>
          </div>

          <div className="grid">
            <Link className="course-card" href="/courses/fukugyo-ai">
              <div className="thumb t1">
                副業×AI×自動化
                <br />
                月10万 4ステップ
              </div>
              <div className="course-body">
                <div className="pills">
                  <span className="pill live">★まずはここから</span>
                  <span className="pill lv">入門→実践</span>
                  <span className="pill cat">副業の始め方</span>
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

            <a
              className="course-card"
              href="https://mitama987.github.io/youpapa-school/xtp3/"
            >
              <div className="thumb t2">XToolsPro3</div>
              <div className="course-body">
                <div className="pills">
                  <span className="pill lv">実践</span>
                  <span className="pill cat">ツール</span>
                  <span className="pill live">LP公開</span>
                </div>
                <h3>XToolsPro3で集客を自動化する</h3>
                <p>API不要・買い切りのX自動投稿ツール。実物のプロダクトLPを「お手本」として確認できます。</p>
                <div className="course-meta">
                  <span>製品LP</span>
                  <span className="go">LPを見る →</span>
                </div>
              </div>
            </a>

            <a
              className="course-card"
              href="https://mitama987.github.io/youpapa-school/xtp3/amazon/"
            >
              <div className="thumb t7">
                XTP3 アドオン
                <br />
                Amazon在庫復活
              </div>
              <div className="course-body">
                <div className="pills">
                  <span className="pill lv">実践</span>
                  <span className="pill cat">ツール</span>
                  <span className="pill live">アドオン / LP公開</span>
                </div>
                <h3>XToolsPro3 アドオン ― Amazon在庫復活</h3>
                <p>
                  Keepa連携でAmazonの在庫復活を全自動検知し、アフィリンク付きでXへ自動投稿。実運用アカウントの投稿例つき。
                </p>
                <div className="course-meta">
                  <span>製品LP（アドオン）</span>
                  <span className="go">LPを見る →</span>
                </div>
              </div>
            </a>

            <a
              className="course-card"
              href="https://mitama987.github.io/youpapa-school/xtp4/"
            >
              <div className="thumb t3">XToolsPro4</div>
              <div className="course-body">
                <div className="pills">
                  <span className="pill lv">実践</span>
                  <span className="pill cat">ツール</span>
                  <span className="pill live">LP公開</span>
                </div>
                <h3>XToolsPro4 ― 中小企業のX運用</h3>
                <p>少人数でX運用を続ける仕組み。法人向けLPの構成も販売の参考になります。</p>
                <div className="course-meta">
                  <span>製品LP</span>
                  <span className="go">LPを見る →</span>
                </div>
              </div>
            </a>

            <span className="course-card">
              <div className="thumb t4">
                Claude Code
                <br />
                記事自動化
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
                Xポスト
                <br />
                自動生成
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

            <span className="course-card">
              <div className="thumb t6">
                YouTube
                <br />
                自動編集
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
        </div>
      </section>
    </>
  );
}
