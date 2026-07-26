"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";
import {
  GRAND_TOTAL,
  STEPS,
  grandDone,
  loadState,
  nextLesson,
  stepDone,
  type ProgressState,
} from "@/lib/progress";
import {
  IconBook,
  IconBookOpen,
  IconCheck,
  IconMessage,
  IconWrench,
} from "./icons";

const LINE_URL = "https://lin.ee/ob91zIx";

// 学習ロードマップ（handoffの01-04）。STEPS と同順で /lessons/step1..4 に直結する
const ROADMAP = [
  { href: "/lessons/step1", label: "リサーチする", num: "01" },
  { href: "/lessons/step2", label: "商品をつくる", num: "02" },
  { href: "/lessons/step3", label: "販売する", num: "03" },
  { href: "/lessons/step4", label: "集客する", num: "04" },
];

// 「04 集客する」配下に常設するスキルLPサブリンク
const ATTRACT_SUBS = [
  { href: "/courses/note-shukyaku", label: "note自動生成&投稿" },
  { href: "/courses/x-post", label: "Xポスト自動生成" },
];

// note集客コース滞在中に表示するサブページ
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

// サイト共通の左サイドナビ（デザインv2: アイコンナビ＋学習ロードマップ＋進捗＋LINE）。
export function SideNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState<ProgressState>({});
  const [mounted, setMounted] = useState(false);

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

  // ルートlayoutで1回だけマウントされるため、遷移ごとに進捗を再読込。
  // さらに storage（別タブ）と yps:progress（同一タブのチェック操作）で即時反映する
  useEffect(() => {
    const reload = () => setProgress(loadState());
    reload();
    setMounted(true);
    window.addEventListener("storage", reload);
    window.addEventListener("yps:progress", reload);
    return () => {
      window.removeEventListener("storage", reload);
      window.removeEventListener("yps:progress", reload);
    };
  }, [pathname]);

  // SSR/未マウント時は step1 を current とする決定的初期値（新規ユーザーと同一表示）
  const nx = mounted ? nextLesson(progress) : { st: STEPS[0], idx: 0 };
  const currentIdx = nx ? nx.idx : -1; // null = 全完了 → current なし
  const pct = mounted
    ? Math.round((grandDone(progress) / GRAND_TOTAL) * 100)
    : 0;

  const roadmapRows: ReactNode[] = [];
  ROADMAP.forEach((it, i) => {
    const st = STEPS[i];
    const isDone = mounted && stepDone(progress, st) === st.total;
    const isCurrent = !isDone && i === currentIdx;
    if (i > 0) {
      roadmapRows.push(
        <span key={`c${i}`} className="rm-connector" aria-hidden="true" />
      );
    }
    const cls = [
      "roadmap-row",
      pathname === it.href ? "page-active" : "",
      isCurrent ? "current" : "",
      isDone ? "done" : "",
    ]
      .filter(Boolean)
      .join(" ");
    roadmapRows.push(
      <Link key={it.href} href={it.href} className={cls} suppressHydrationWarning>
        <span className="rm-badge" suppressHydrationWarning>
          {isDone ? <IconCheck size={13} /> : it.num}
        </span>
        {it.label}
      </Link>
    );
  });
  ATTRACT_SUBS.forEach((it) => {
    const active = pathname === it.href || pathname.startsWith(`${it.href}/`);
    roadmapRows.push(
      <Link
        key={it.href}
        href={it.href}
        className={active ? "rm-sub page-active" : "rm-sub"}
      >
        {it.label}
      </Link>
    );
  });
  if (inLessons) {
    roadmapRows.push(
      <span key="cp" className="rm-connector" aria-hidden="true" />,
      <Link
        key="/lessons/pitfalls"
        href="/lessons/pitfalls"
        className={
          pathname === "/lessons/pitfalls"
            ? "roadmap-row page-active"
            : "roadmap-row"
        }
      >
        <span className="rm-badge">!</span>
        つまずき対処
      </Link>
    );
  }

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
            <Link
              href="/"
              className={globalActive === "home" ? "active" : undefined}
            >
              <IconBook />
              講座一覧
            </Link>
            <a href="https://sns-tools-market.vercel.app/">
              <IconWrench />
              ツール一覧
            </a>
            <Link
              href="/articles"
              className={globalActive === "articles" ? "active" : undefined}
            >
              <IconBookOpen />
              記事
            </Link>
            <Link
              href="/community"
              className={globalActive === "community" ? "active" : undefined}
            >
              <IconMessage />
              掲示板
            </Link>
          </nav>
          {inNote ? (
            <nav className="side-section" aria-label="note集客コース">
              <div className="side-sec-label">note集客コース</div>
              {NOTE_CHILDREN.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className={
                    pathname === it.href
                      ? "roadmap-row current page-active"
                      : "roadmap-row"
                  }
                >
                  <span className="rm-badge">{it.num}</span>
                  {it.label}
                </Link>
              ))}
            </nav>
          ) : null}
          <nav className="side-section" aria-label="学習ロードマップ">
            <div className="side-sec-label">学習ロードマップ</div>
            {roadmapRows}
          </nav>
          <div className="side-bottom">
            <div className="side-progress">
              <div className="sp-head">
                <span className="sp-label">学習進捗</span>
                <span className="sp-pct" suppressHydrationWarning>
                  {pct}%
                </span>
              </div>
              <div className="sp-track">
                <div
                  className="sp-fill"
                  style={{ width: `${pct}%` }}
                  suppressHydrationWarning
                />
              </div>
            </div>
            <span className="side-cta-hint">特典の受け取り・質問はこちら</span>
            <a className="btn-line-outline" href={LINE_URL}>
              <span className="line-badge">L</span>
              LINEで相談する
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
