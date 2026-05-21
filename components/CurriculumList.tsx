"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { STEPS, loadState, stepDone, type ProgressState } from "@/lib/progress";

type Item = { href: string; label: string; meta: string; key?: "s1" | "s2" | "s3" | "s4" };

export function CurriculumList({ items }: { items: Item[] }) {
  const [state, setState] = useState<ProgressState>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  return (
    <ul className="curriculum">
      {items.map((it) => {
        const st = STEPS.find((s) => s.key === it.key);
        const isDone = mounted && st ? stepDone(state, st) === st.total : false;
        return (
          <li key={it.href} className={isDone ? "done" : undefined} suppressHydrationWarning>
            <span className="n" />
            <Link href={it.href}>{it.label}</Link>
            <span className="meta">{it.meta}</span>
          </li>
        );
      })}
    </ul>
  );
}
