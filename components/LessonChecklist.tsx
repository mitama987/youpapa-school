"use client";
import { useEffect, useState } from "react";
import { loadState, saveState, type ProgressState } from "@/lib/progress";

export type LessonItem = {
  id: string; // e.g. "s1-1"
  text: string;
};

export function LessonChecklist({ items }: { items: LessonItem[] }) {
  const [state, setState] = useState<ProgressState>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  const toggle = (id: string) => {
    setState((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      saveState(next);
      return next;
    });
  };

  const doneCount = items.filter((i) => state[i.id]).length;

  return (
    <>
      <p>
        <span className="progress-pill">
          <span className="dot" />
          <span suppressHydrationWarning>
            このレッスンの進捗 {mounted ? doneCount : 0} / {items.length}
          </span>
        </span>
      </p>
      <ul className="checklist">
        {items.map((it) => (
          <li key={it.id}>
            <label>
              <input
                type="checkbox"
                checked={mounted ? !!state[it.id] : false}
                onChange={() => toggle(it.id)}
                suppressHydrationWarning
              />
              <span className="ci-text">{it.text}</span>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
