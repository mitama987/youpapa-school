"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { STEPS, loadState, stepDone, type ProgressState } from "@/lib/progress";

const LINE_URL = "https://lin.ee/ob91zIx";

const ANCHOR_IDS = ["start", "product", "sales", "attract", "tools"] as const;
type AnchorId = (typeof ANCHOR_IDS)[number];

type NavItem =
  | { kind: "anchor"; id: AnchorId; label: string; num: string }
  | { kind: "course"; href: string; label: string; num?: string; sub?: boolean };

const COURSE_MAP: NavItem[] = [
  { kind: "anchor", id: "start", label: "受講の進め方", num: "◎" },
  { kind: "course", href: "/courses/fukugyo-ai", label: "副業×AI×自動化", num: "★" },
  { kind: "anchor", id: "product", label: "商品 ― つくる", num: "1" },
  { kind: "course", href: "/courses/web-app", label: "Webアプリ作成", sub: true },
  { kind: "anchor", id: "sales", label: "販売 ― 売る", num: "2" },
  { kind: "course", href: "/courses/lp", label: "LP作成", sub: true },
  { kind: "anchor", id: "attract", label: "集客 ― 広める", num: "3" },
  { kind: "course", href: "/courses/sns", label: "SNS集客", sub: true },
  { kind: "course", href: "/courses/youtube", label: "YouTube作成", sub: true },
  { kind: "course", href: "/courses/note-shukyaku", label: "note集客", sub: true },
  { kind: "course", href: "/courses/x-post", label: "Xポスト自動生成", sub: true },
  { kind: "anchor", id: "tools", label: "集客ツール", num: "4" },
];

// 副業×AI×自動化コース滞在中に展開するカリキュラム（旧 LessonToc）
const LESSON_CHILDREN = [
  { href: "/lessons/step1", label: "リサーチ", num: "1", key: "s1" as const },
  { href: "/lessons/step2", label: "商品", num: "2", key: "s2" as const },
  { href: "/lessons/step3", label: "販売", num: "3", key: "s3" as const },
  { href: "/lessons/step4", label: "集客", num: "4", key: "s4" as const },
  { href: "/lessons/pitfalls", label: "つまずき対処", num: "!", key: null },
];

// note集客コース滞在中に展開するサブページ（旧 NoteGuideToc）
const NOTE_CHILDREN = [
  { href: "/courses/note-shukyaku/method", label: "note集客の方法", num: "1" },
  { href: "/courses/note-shukyaku/setup", label: "導入：事前準備", num: "2" },
  { href: "/courses/note-shukyaku/api", label: "API設定", num: "3" },
  { href: "/courses/note-shukyaku/note", label: "note投稿設定", num: "4" },
  { href: "/courses/note-shukyaku/faq", label: "FAQ・トラブル", num: "5" },
];

type NavKey = "home" | "articles" | "community";

function navKeyFor(pathname: string): NavKey | null {
  if (
    pathname === "/" ||
    pathname.startsWith("/courses") ||
    pathname.startsWith("/lessons")
  ) {
    return "home";
  }
  if (pathname.startsWith("/articles")) return "articles";
  if (pathname.startsWith("/community")) return "community";
  return null;
}

// サイト共通の左サイドナビ（旧 Header / HomeToc / LessonToc / NoteGuideToc を統合）。
// スクロールスパイはトップページのみ。現在地の講座配下では子項目をアコーディオン展開する。
export function SideNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<AnchorId | null>(null);
  const [progress, setProgress] = useState<ProgressState>({});
  const [mounted, setMounted] = useState(false);

  const isHome = pathname === "/";
  const inLessons =
    pathname === "/courses/fukugyo-ai" || pathname.startsWith("/lessons");
  const inNote = pathname.startsWith("/courses/note-shukyaku");
  const globalActive = navKeyFor(pathname);

  // ページ遷移でモバイルドロワーを閉じる
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ドロワー展開中は背面スクロールをロック。Escで閉じる
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // SideNavはルートlayoutで1回だけマウントされるため、遷移ごとに進捗を再読込する
  useEffect(() => {
    setProgress(loadState());
    setMounted(true);
  }, [pathname]);

  // スクロールスパイ（トップページのみ）。IOをトリガーに現在地を決定的に再計算する
  useEffect(() => {
    if (pathname !== "/") {
      setActiveAnchor(null);
      return;
    }
    const recompute = () => {
      const line = window.innerHeight * 0.35;
      let current: AnchorId = ANCHOR_IDS[0];
      for (const id of ANCHOR_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = ANCHOR_IDS[ANCHOR_IDS.length - 1];
      }
      setActiveAnchor(current);
    };

    const observer = new IntersectionObserver(recompute, {
      rootMargin: "0px 0px -65% 0px",
      threshold: [0, 0.5, 1],
    });
    ANCHOR_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const footer = document.querySelector(".site-footer");
    if (footer) observer.observe(footer);

    recompute();
    return () => observer.disconnect();
  }, [pathname]);

  const lessonRows = LESSON_CHILDREN.map((it) => {
    const st = it.key ? STEPS.find((s) => s.key === it.key) : null;
    const isDone = mounted && st ? stepDone(progress, st) === st.total : false;
    const cls = [
      "toc-child",
      pathname === it.href ? "active" : "",
      isDone ? "done" : "",
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <Link key={it.href} href={it.href} className={cls} suppressHydrationWarning>
        <span className="num">{it.num}</span>
        {it.label}
      </Link>
    );
  });

  const noteRows = NOTE_CHILDREN.map((it) => (
    <Link
      key={it.href}
      href={it.href}
      className={pathname === it.href ? "toc-child active" : "toc-child"}
    >
      <span className="num">{it.num}</span>
      {it.label}
    </Link>
  ));

  const courseMapRows = COURSE_MAP.map((it) => {
    if (it.kind === "anchor") {
      return isHome ? (
        <a
          key={it.id}
          href={`#${it.id}`}
          className={activeAnchor === it.id ? "active" : undefined}
          onClick={() => setOpen(false)}
        >
          <span className="num">{it.num}</span>
          {it.label}
        </a>
      ) : (
        <Link key={it.id} href={`/#${it.id}`}>
          <span className="num">{it.num}</span>
          {it.label}
        </Link>
      );
    }
    return (
      <Fragment key={it.href}>
        <Link
          href={it.href}
          className={
            [it.sub ? "toc-sub" : "", pathname === it.href ? "active" : ""]
              .filter(Boolean)
              .join(" ") || undefined
          }
        >
          {it.num ? <span className="num">{it.num}</span> : null}
          {it.label}
        </Link>
        {it.href === "/courses/fukugyo-ai" && inLessons ? lessonRows : null}
        {it.href === "/courses/note-shukyaku" && inNote ? noteRows : null}
      </Fragment>
    );
  });

  return (
    <>
      <div className="mobile-bar">
        <button
          type="button"
          className="menu-toggle"
          aria-label="メニュー"
          aria-expanded={open}
          aria-controls="side-nav"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
        <Link className="brand" href="/">
          <span className="mark" />
          シクミ
        </Link>
        <ThemeToggle />
      </div>
      <div
        className={open ? "nav-scrim open" : "nav-scrim"}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="side-nav"
        className={open ? "side-nav open" : "side-nav"}
        aria-label="サイトメニュー"
      >
        <div className="inner">
          <div className="side-brand">
            <Link className="brand" href="/">
              <span className="mark" />
              シクミ
            </Link>
            <ThemeToggle />
          </div>
          <nav className="global-nav" aria-label="サイト全体">
            <Link href="/" className={globalActive === "home" ? "active" : undefined}>
              講座一覧
            </Link>
            <a href="https://sns-tools-market.vercel.app/">ツール一覧</a>
            <Link
              href="/articles"
              className={globalActive === "articles" ? "active" : undefined}
            >
              記事
            </Link>
            <Link
              href="/community"
              className={globalActive === "community" ? "active" : undefined}
            >
              掲示板
            </Link>
          </nav>
          <nav className="course-nav" aria-label="講座メニュー">
            <div className="toc-sep">コースマップ</div>
            {courseMapRows}
          </nav>
          <div className="side-cta">
            <a className="btn btn-line" href={LINE_URL}>
              LINEで受け取る（無料）
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
