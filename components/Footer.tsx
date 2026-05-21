import Link from "next/link";

const LINE_URL = "https://lin.ee/ob91zIx";
// 公開時に差し込む X 固定ポスト URL（CLAUDE.md 由来のプレースホルダ）
const X_PINNED_URL = "REPLACE_X_PINNED_URL";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="inner">
        <h3>シクミ</h3>
        <p>
          副業×AI×自動化で月10万。リサーチ→商品→販売→集客を、手を動かして学ぶ無料アカデミーです。
        </p>
        <div className="cta-row">
          <a className="btn btn-line" href={LINE_URL}>
            LINEで受け取る（無料）
          </a>
          <a className="btn btn-ghost" href={X_PINNED_URL}>
            X固定ポストを見る
          </a>
        </div>
        <div className="foot-links">
          <Link href="/">講座一覧</Link>
          <Link href="/articles">記事</Link>
          <Link href="/community">掲示板</Link>
          <a href="https://mitama987.github.io/youpapa-school/xtp3/">XTP3 LP</a>
          <a href="https://mitama987.github.io/youpapa-school/xtp3/amazon/">XTP3アドオン</a>
          <a href="https://mitama987.github.io/youpapa-school/xtp4/">XTP4 LP</a>
          <Link href="/privacy">プライバシー</Link>
        </div>
        <small>© 2026 シクミ.</small>
      </div>
    </footer>
  );
}
