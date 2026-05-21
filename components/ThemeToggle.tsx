"use client";
import { useEffect, useState } from "react";

const THKEY = "yps:theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as
        | "light"
        | "dark"
        | null) ?? "light";
    setTheme(current);
    setMounted(true);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onMq = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(THKEY)) return;
      const next = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THKEY, next);
    } catch {
      // ignore
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={mounted && theme === "dark" ? "ライトモードに切替" : "ダークモードに切替"}
      aria-pressed={mounted && theme === "dark"}
      title={mounted && theme === "dark" ? "ライトモードに切替" : "ダークモードに切替"}
      onClick={toggle}
      suppressHydrationWarning
    >
      <span suppressHydrationWarning>{mounted ? (theme === "dark" ? "☀️" : "🌙") : "🌙"}</span>
    </button>
  );
}
