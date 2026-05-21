import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "シクミのプライバシーポリシー。Google Analytics の利用と収集情報、オプトアウトについて。",
};

export default function Privacy() {
  return (
    <div className="comm" style={{ textAlign: "left" }}>
      <span className="eyebrow">PRIVACY</span>
      <h1 style={{ fontSize: "1.6rem", margin: ".2em 0 .4em" }}>プライバシーポリシー</h1>
      <div className="panel" style={{ textAlign: "left" }}>
        <h3>アクセス解析（Google Analytics）</h3>
        <p>
          当サイト「シクミ」では、サイトの利用状況を把握し改善するために Google LLC が提供する Google Analytics 4 を利用しています。Google Analytics は Cookie を使用し、個人を特定しない形でアクセスデータ（ページ閲覧、参照元、デバイス等）を収集します。データは Google のプライバシーポリシーに基づき管理されます。
        </p>
        <h3>収集する情報</h3>
        <p>氏名・メールアドレス等の個人情報をフォームで収集することはありません。Google Analytics が取得する匿名のアクセス情報のみです。</p>
        <h3>無効化（オプトアウト）</h3>
        <p>
          ブラウザの Cookie を無効にするか、Google の「
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener"
          >
            アナリティクス オプトアウト アドオン
          </a>
          」を利用することで、解析を無効化できます。
        </p>
        <h3>外部リンク・LINE</h3>
        <p>当サイトは外部サイト（製品LP・LINE 公式アカウント等）へのリンクを含みます。リンク先での情報の取り扱いは各サービスのポリシーに従います。</p>
        <h3>改定</h3>
        <p>本ポリシーは予告なく改定する場合があります。最終更新：2026-05-21。</p>
      </div>
      <p>
        <Link href="/">← トップへ戻る</Link>
      </p>
    </div>
  );
}
