"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { STEPS, loadState, stepDone, type ProgressState } from "@/lib/progress";

export function Dashboard() {
  const [state, setState] = useState<ProgressState>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  return (
    <div className="dash">
      {STEPS.map((st) => {
        const dn = mounted ? stepDone(state, st) : 0;
        const pct = Math.round((dn / st.total) * 100);
        return (
          <Link
            key={st.key}
            className={`cell${pct === 100 ? " complete" : ""}`}
            href={`/lessons/${st.slug}`}
            suppressHydrationWarning
          >
            <div className="pct" suppressHydrationWarning>{pct}%</div>
            <div className="nm">
              {st.name}
              <br />
              <span suppressHydrationWarning>
                {dn} / {st.total}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
