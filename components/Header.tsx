"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

type NavKey = "home" | "articles" | "community";

function navKeyFor(pathname: string): NavKey | null {
  if (pathname === "/" || pathname.startsWith("/courses") || pathname.startsWith("/lessons")) {
    return "home";
  }
  if (pathname.startsWith("/articles")) return "articles";
  if (pathname.startsWith("/community")) return "community";
  return null;
}

export function Header() {
  const pathname = usePathname();
  const active = navKeyFor(pathname);
  const [navOpen, setNavOpen] = useState(false);

  const linkCls = (key: NavKey) => (active === key ? "active" : undefined);

  return (
    <header className="site-header">
      <div className="bar">
        <button
          type="button"
          className="menu-toggle"
          aria-label="メニュー"
          onClick={() => setNavOpen((v) => !v)}
        >
          ☰
        </button>
        <Link className="brand" href="/">
          <span className="mark" />
          シクミ
        </Link>
        <nav className={navOpen ? "nav open" : "nav"}>
          <Link className={linkCls("home")} href="/">
            講座一覧
          </Link>
          <Link className={linkCls("articles")} href="/articles">
            記事
          </Link>
          <Link className={linkCls("community")} href="/community">
            掲示板
          </Link>
        </nav>
        <div className="header-cta">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
