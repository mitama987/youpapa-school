import Link from "next/link";
import type { Metadata } from "next";
import { NoteGuideShell } from "@/components/NoteGuideShell";
import { Pager } from "@/components/Pager";

export const metadata: Metadata = {
  title: "note集客の方法｜なぜnote・何を書く・継続の仕組み",
  description:
    "noteを集客チャネルに育てる考え方。検索とフォローの両輪、読者の悩み起点のテーマ選び、CTA設計、そして手作業を仕組み化して続ける方法までを整理します。",
};

export default function MethodPage() {
  return (
    <NoteGuideShell>
      <div className="crumbs">
        <Link href="/">講座一覧</Link> ＞ <Link href="/courses/note-shukyaku">note集客</Link> ＞ note集客の方法
      </div>
      <div className="card">
        <span className="eyebrow">① note集客の方法</span>
        <h1>noteで集客する ― 考え方の全体像</h1>
        <p className="lead">
          ツールの設定に入る前に、「なぜnoteなのか」「何を書くのか」「どう続けるのか」を押さえます。ここが定まると、後半のスキル導入が"何のための作業か"として腑に落ちます。
        </p>

        <h2>なぜnoteで集客するのか</h2>
        <p>
          noteには2つの流入があります。1つは <strong>検索（記事が資産として残り、後からも読まれる）</strong>、もう1つは <strong>note内のフォロー・おすすめ（プラットフォーム側の回遊）</strong>です。広告に頼らず、書いた記事が積み上がるほど集客の土台が厚くなります。
        </p>
        <p>
          さらにnoteは、記事の末尾やマガジンから <strong>自分の商品・LP・LINEなどへ自然に誘導</strong>できます。読者の悩みに答える記事から、その解決策（商品やツール）へつなぐ。これがnote集客の基本線です。
        </p>

        <h2>何を書くか ― 読者の「悩み」起点で選ぶ</h2>
        <p>
          ネタはゼロから捻り出しません。<strong>すでにある悩み・つまずき・よくある質問</strong>を起点にします。自分の商品やジャンルに関する「できない」「分かりにくい」を1記事1テーマで解いていくと、検索にも強く、商品への導線も自然になります。
        </p>
        <ul className="tag-list">
          <li>商品・サービスに寄せられる質問やつまずき</li>
          <li>ジャンル名で検索したときに出てくる悩み</li>
          <li>自分が過去につまずいて解決したこと</li>
          <li>競合の低評価・「ここが惜しい」の声</li>
        </ul>

        <div className="callout story">
          <div className="label">考え方の例</div>
          自分のツールを使ってもらうために、まず「その分野の悩みに答える記事」をnoteに置きます。記事を読んだ人が、最後に紹介した解決策（ツールやLP）へ進む——記事は売り込みではなく、悩みの解決そのもの。だから読まれ、信頼が残ります。
        </div>

        <h2>続けるには「仕組み化」する</h2>
        <p>
          note集客の最大の壁は <strong>継続</strong>です。1記事を手で書き、画像を作り、note editorに整形して貼り付け、サムネを用意して…を毎回やると、たいてい止まります。
        </p>
        <p>
          そこで本コースでは、この制作〜投稿を <strong>AIと自動化で仕組み化</strong>します。具体的には次の2つのスキルを使います。
        </p>
        <div className="gtable">
          <table>
            <thead>
              <tr><th>スキル</th><th>役割</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>BuzzBlog</strong></td><td>メモから記事本文を生成し、サムネ・図解・挿絵まで作る</td></tr>
              <tr><td><strong>note-edit</strong></td><td>生成した記事を、見出し・引用・箇条書きごとnote.comへ書式付きで投稿（下書き保存）</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          記事の文章は <strong>Claude が生成</strong>するので、文章用に別のAI課金は不要です。外部APIキーが要るのは画像生成だけ。次の「導入」から、実際に自分の環境で動かす準備をしていきます。
        </p>

        <div className="callout note">
          <div className="label">次のステップ</div>
          考え方がつかめたら、<Link href="/courses/note-shukyaku/setup">② 導入：全体像と事前準備</Link> へ。必要なものを整え、スキルを配置します。
        </div>
      </div>

      <Pager
        prev={{ href: "/courses/note-shukyaku", label: "← コーストップ" }}
        next={{ href: "/courses/note-shukyaku/setup", label: "② 導入：事前準備 →" }}
      />
    </NoteGuideShell>
  );
}
