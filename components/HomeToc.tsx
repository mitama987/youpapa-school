"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const LINE_URL = "https://lin.ee/ob91zIx";

const ANCHOR_IDS = ["start", "product", "sales", "attract", "tools"] as const;

type TocItem =
  | { kind: "anchor"; id: (typeof ANCHOR_IDS)[number]; label: string; num: string }
  | { kind: "course"; href: string; label: string; num?: string; sub?: boolean }
  | { kind: "sep"; label: string };

const ITEMS: TocItem[] = [
  { kind: "anchor", id: "start", label: "受講の進め方", num: "◎" },
  { kind: "sep", label: "講座一覧" },
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

// トップページの左メニュー。IntersectionObserver はトリガーとして使い、
// 現在地はコールバック内で決定的に再計算する（上スクロールでも正しく戻すため）。
export function HomeToc() {
  const [active, setActive] = useState<string>("start");

  useEffect(() => {
    const recompute = () => {
      const line = window.innerHeight * 0.35;
      let current: string = ANCHOR_IDS[0];
      for (const id of ANCHOR_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // 最下部では #tools が35%ラインを越えられないため強制的に点灯
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = ANCHOR_IDS[ANCHOR_IDS.length - 1];
      }
      setActive(current);
    };

    const observer = new IntersectionObserver(recompute, {
      rootMargin: "0px 0px -65% 0px",
      threshold: [0, 0.5, 1],
    });
    ANCHOR_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    // ページ最下部の検知用センチネル
    const footer = document.querySelector(".site-footer");
    if (footer) observer.observe(footer);

    recompute();
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="toc" aria-label="トップページの目次">
      <h2>メニュー</h2>
      <nav>
        {ITEMS.map((it) =>
          it.kind === "sep" ? (
            <div key={it.label} className="toc-sep">
              {it.label}
            </div>
          ) : it.kind === "anchor" ? (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={active === it.id ? "active" : undefined}
            >
              <span className="num">{it.num}</span>
              {it.label}
            </a>
          ) : (
            <Link
              key={it.href}
              href={it.href}
              className={it.sub ? "toc-sub" : undefined}
            >
              {it.num ? <span className="num">{it.num}</span> : null}
              {it.label}
            </Link>
          )
        )}
      </nav>
      <div className="side-cta">
        <a className="btn btn-line" href={LINE_URL} style={{ width: "100%" }}>
          LINEで受け取る（無料）
        </a>
      </div>
    </aside>
  );
}
