"use client";
import { useState } from "react";

// note集客ガイドのコード/設定ブロック。ラベル＋ワンクリックコピー（Clipboard API + フォールバック）。
export function CodeBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);

  function flash() {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
        flash();
        return;
      }
    } catch {
      // フォールバックへ
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      flash();
    } catch {
      // 失敗時は何もしない
    }
  }

  return (
    <div className="code-block">
      <div className="code-bar">
        <span className="lbl">{label}</span>
        <button
          type="button"
          className={copied ? "copy-btn copied" : "copy-btn"}
          onClick={copy}
          aria-label={`${label}をコピー`}
        >
          {copied ? "コピーしました" : "コピー"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
