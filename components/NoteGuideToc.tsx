"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINE_URL = "https://lin.ee/ob91zIx";

const ITEMS = [
  { href: "/courses/note-shukyaku", label: "コーストップ", num: "◎" },
  { href: "/courses/note-shukyaku/method", label: "note集客の方法", num: "1" },
  { href: "/courses/note-shukyaku/setup", label: "導入：事前準備", num: "2" },
  { href: "/courses/note-shukyaku/api", label: "API設定", num: "3" },
  { href: "/courses/note-shukyaku/note", label: "note投稿設定", num: "4" },
  { href: "/courses/note-shukyaku/faq", label: "FAQ・トラブル", num: "5" },
];

export function NoteGuideToc() {
  const pathname = usePathname();
  return (
    <aside className="toc" aria-label="note集客コースの目次">
      <h2>note集客コース</h2>
      <nav>
        {ITEMS.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={pathname === it.href ? "active" : undefined}
          >
            <span className="num">{it.num}</span>
            {it.label}
          </Link>
        ))}
      </nav>
      <div className="side-cta">
        <a className="btn btn-line" href={LINE_URL} style={{ width: "100%" }}>
          LINEで受け取る（無料）
        </a>
      </div>
    </aside>
  );
}
