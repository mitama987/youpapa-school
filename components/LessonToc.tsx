"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { STEPS, loadState, stepDone, type ProgressState } from "@/lib/progress";

const ITEMS = [
  { href: "/courses/fukugyo-ai", label: "講座トップ", num: "◎", key: null as null | "s1" | "s2" | "s3" | "s4" },
  { href: "/lessons/step1", label: "リサーチ", num: "1", key: "s1" as const },
  { href: "/lessons/step2", label: "商品", num: "2", key: "s2" as const },
  { href: "/lessons/step3", label: "販売", num: "3", key: "s3" as const },
  { href: "/lessons/step4", label: "集客", num: "4", key: "s4" as const },
  { href: "/lessons/pitfalls", label: "つまずき対処", num: "!", key: null },
];

export function LessonToc() {
  const pathname = usePathname();
  const [state, setState] = useState<ProgressState>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  return (
    <aside className="toc" aria-label="カリキュラム">
      <h2>カリキュラム</h2>
      <nav>
        {ITEMS.map((it) => {
          const isActive = pathname === it.href;
          const st = it.key ? STEPS.find((s) => s.key === it.key) : null;
          const isDone = mounted && st ? stepDone(state, st) === st.total : false;
          const cls = [isActive ? "active" : "", isDone ? "done" : ""]
            .filter(Boolean)
            .join(" ");
          return (
            <Link key={it.href} href={it.href} className={cls || undefined} suppressHydrationWarning>
              <span className="num">{it.num}</span>
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="side-cta">
        <a className="btn btn-line" href="https://lin.ee/ob91zIx" style={{ width: "100%" }}>
          LINEで受け取る（無料）
        </a>
      </div>
    </aside>
  );
}
