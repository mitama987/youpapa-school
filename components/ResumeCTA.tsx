"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loadState, nextLesson, grandDone, type ProgressState } from "@/lib/progress";

export function ResumeCTA() {
  const [state, setState] = useState<ProgressState>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Link className="btn btn-primary" href="/lessons/step1">
        STEP1から無料で始める →
      </Link>
    );
  }

  const any = grandDone(state) > 0;
  const nx = nextLesson(state);

  let href = "/lessons/step1";
  let label = "STEP1から無料で始める →";
  let hint = "";

  if (!nx) {
    href = "/lessons/pitfalls";
    label = "全レッスン完了 — 補講と見直しへ →";
    hint = "前回の進捗から再開できます（この端末に保存）";
  } else if (any && nx.idx > 0) {
    href = `/lessons/${nx.st.slug}`;
    label = `続きから：${nx.st.name} →`;
    hint = "前回の進捗から再開できます（この端末に保存）";
  } else {
    href = `/lessons/${nx.st.slug}`;
    label = nx.idx === 0 ? "STEP1から無料で始める →" : `${nx.st.name} から始める →`;
  }

  return (
    <>
      <Link className="btn btn-primary" href={href}>
        {label}
      </Link>
      {hint && <span className="resume-hint">{hint}</span>}
    </>
  );
}
