"use client";
import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "./icons";

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

    // 複数マウント（モバイルバー＋サイドナビ）間で状態を同期する
    const mo = new MutationObserver(() => {
      const t =
        (document.documentElement.getAttribute("data-theme") as
          | "light"
          | "dark"
          | null) ?? "light";
      setTheme(t);
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      mq.removeEventListener("change", onMq);
      mo.disconnect();
    };
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
      <span suppressHydrationWarning>
        {mounted && theme === "dark" ? <IconSun size={16} /> : <IconMoon size={16} />}
      </span>
    </button>
  );
}
