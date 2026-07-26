import Link from "next/link";
import type { Metadata } from "next";
import { CommentThread } from "@/components/CommentThread";
import { LikeButton } from "@/components/LikeButton";

const LINE_URL = "https://lin.ee/ob91zIx";

export const metadata: Metadata = {
  title: "【テンプレ公開】副業×AI×自動化で月10万稼ぐ始め方",
  description: "3年分の遠回りを削ったテンプレート。リサーチ→商品→販売→集客の順番で副業を月10万まで持っていく型を1記事に凝縮。",
};

export default function ArticleStart() {
  return (
    <article className="article-body">
      <div className="crumbs">
        <Link href="/">講座一覧</Link> ＞ <Link href="/articles">記事</Link> ＞ テンプレ公開
      </div>
      <span className="eyebrow">テンプレ公開</span>
      <h1>【テンプレ公開】副業×AI×自動化で月10万稼ぐ始め方</h1>

      <p>こんな悩みはありませんか。</p>
      <ul>
        <li>副業を始めたいのに、なにから手をつければいいのか分からないまま数ヶ月</li>
        <li>AIや自動化が稼げると聞いても、具体的な手順はだれも教えてくれない</li>
        <li>教材を買っても出てくるのはマインド論ばかりで、結局1円も増えない</li>
      </ul>
      <p>1つでも当てはまるなら、この記事は最後まで読む価値があります。</p>
      <p>この記事を書いている私は──</p>
      <ul>
        <li>SNS自動化ツールを個人開発しながら副業7年</li>
        <li>累計売上200万円超・受けた開発300件以上</li>
        <li>0円→月10万円到達まで約3年。そのほとんどが「順番を間違えた遠回り」</li>
      </ul>
      <p>
        この記事は、その3年分の遠回りをまるごと削った<strong>テンプレート</strong>
        です。型のとおりになぞるだけで、ショートカットで通れます。
      </p>

      <h2>なぜ「リサーチ→商品→販売→集客」の順番なのか</h2>
      <p>副業で挫折する人のほとんどは、いきなり「商品を作る」ところから始めます。私も同じでした。</p>
      <ul>
        <li>半年かけてツールを開発、「便利だから売れる」と確信</li>
        <li>結果は3ヶ月で売上ゼロ</li>
      </ul>
      <blockquote>
        「自分が作りたいもの」ではなく「相手が困っていること」を解決しないと、1円にもなりません。
      </blockquote>
      <p>だから先に需要を確かめてから作ります。</p>
      <ul>
        <li>リサーチで需要を確認</li>
        <li>商品で差別化</li>
        <li>販売で価値を伝える</li>
        <li>集客で人を流しつづける</li>
      </ul>
      <p>順番を守るだけで勝率はまるで変わります。</p>

      <h2>STEP1 リサーチ：売れている商品の「不満」を見つける</h2>
      <ul>
        <li>すでにお金が動いている市場を見つけ、商品への不満を集める（発明ではなく、ある不満を拾うだけ）</li>
        <li>宝の地図は「低評価」と「できない」という言葉</li>
        <li>見にいく場所：ココナラ・Brain・note・App Store・Amazonレビュー・Xの愚痴</li>
        <li>実例：既存ツールの「高い・難しい・サポートがない」がそのまま商品の設計図に。ココナラ出品の初月3件が需要の実証</li>
      </ul>

      <h2>STEP2 商品：AIと自動化で最小で作る</h2>
      <ul>
        <li>不満を1つに絞り、最小限の機能で消すMVPで出す</li>
        <li>AIで開発を加速し、中身も自分の作業も自動化</li>
        <li>70点で出して、声を聞いて80点・90点へ（完璧主義は副業の最大の敵）</li>
      </ul>

      <h2>STEP3 販売：価値が伝わるLPを用意する</h2>
      <ul>
        <li>機能ではなく「あなたの悩みがこう消える」を売る</li>
        <li>構成の型：ヘッドライン→共感→ベネフィット→証拠→オファー→行動→FAQ</li>
        <li>価格は安さで釣らず、返金保証など信頼の設計で不安を消す</li>
        <li>「無料」は検討の浅い層を集めて時間を溶かすので注意</li>
      </ul>

      <h2>STEP4 集客：同じ核を配信し続ける</h2>
      <ul>
        <li>1つの核を媒体ごとに最適化して配る（ワンソース・マルチユース）</li>
        <li>X＝発掘エンジン＋固定ポスト／note＝深掘りと受け皿／YouTube＝信頼と検索資産</li>
        <li>導線は「X固定ポスト→note柱記事→商品LP」の一本道</li>
        <li>2026年のXはAIが中身を読む。テーマの一貫性と質、リプ・引用が効く</li>
      </ul>

      <h2>つまずき対処とまとめ</h2>
      <ul>
        <li>完璧主義 → 70点で進む</li>
        <li>目移り → 1商品まで封印</li>
        <li>売れない → 商品より先にLPと相手を疑う</li>
        <li>続かない → 核を1つに絞る（複利は後半で効く）</li>
      </ul>
      <p>必要なのは、ひらめきではなく順番と仕組み。仕組みは、だれでも作れます。</p>

      <p style={{ marginTop: 24, marginBottom: 24 }}>
        <LikeButton targetId="articles:fukugyo-ai-start" />
      </p>

      <CommentThread targetId="articles:fukugyo-ai-start" />

      <div className="action-card">
        <h3>手を動かして実践する</h3>
        <p>
          この記事の4ステップは、チェックリスト付きの講座で1つずつ実践できます。さらに「作業時間の作り方」と自動化スキルはLINEで配布しています。
        </p>
        <div className="links">
          <Link className="btn btn-primary" href="/courses/fukugyo-ai">
            講座で実践する →
          </Link>
          <a className="btn btn-line" href={LINE_URL}>
            LINEで受け取る（無料）
          </a>
        </div>
      </div>
    </article>
  );
}
