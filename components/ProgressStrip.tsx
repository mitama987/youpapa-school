"use client";
import { useEffect, useState } from "react";
import { GRAND_TOTAL, grandDone, loadState, type ProgressState } from "@/lib/progress";

export function ProgressStrip() {
  const [state, setState] = useState<ProgressState>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === "yps:checks") setState(loadState());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const done = mounted ? grandDone(state) : 0;
  const pct = Math.round((done / GRAND_TOTAL) * 100);

  return (
    <div className="progress-strip">
      <div className="inner">
        <span suppressHydrationWarning>
          コース達成 {pct}% ({done}/{GRAND_TOTAL})
        </span>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
