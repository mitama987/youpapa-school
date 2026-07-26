"use client";
import { useEffect, useState } from "react";
import { GRAND_TOTAL, grandDone, loadState } from "@/lib/progress";

// ヒーローカードの進捗行（SSRは0%の決定的描画。チェック操作/別タブ更新に追従）
export function HeroProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const reload = () =>
      setPct(Math.round((grandDone(loadState()) / GRAND_TOTAL) * 100));
    reload();
    window.addEventListener("storage", reload);
    window.addEventListener("yps:progress", reload);
    return () => {
      window.removeEventListener("storage", reload);
      window.removeEventListener("yps:progress", reload);
    };
  }, []);

  return (
    <div className="hc-progress">
      <span className="hc-pct" suppressHydrationWarning>
        進捗 {pct}%
      </span>
      <div className="hc-track">
        <div
          className="hc-fill"
          style={{ width: `${pct}%` }}
          suppressHydrationWarning
        />
      </div>
    </div>
  );
}
