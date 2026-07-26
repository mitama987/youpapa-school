import Link from "next/link";

// X プロフィール（固定ポストが先頭表示される）
const X_PINNED_URL = "https://x.com/Tanaka439712";

// スリム1行フッター（デザインv2）。LINE導線はサイドバーが担う
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="inner">
        <span>© 2026 シクミ. All rights reserved.</span>
        <div className="foot-links">
          <Link href="/articles">記事</Link>
          <Link href="/community">掲示板</Link>
          <a href={X_PINNED_URL}>X（Youパパ）</a>
          <Link href="/privacy">プライバシーポリシー</Link>
        </div>
      </div>
    </footer>
  );
}
