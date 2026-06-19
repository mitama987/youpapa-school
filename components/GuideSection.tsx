import type { ReactNode } from "react";

// note集客ガイドの折りたたみ（アコーディオン）セクション。
// ネイティブ <details>/<summary> を使うのでクライアントJSは不要（SSR・キーボード操作・a11y対応）。
// level=2 で見出しを <h2>（手順ページ）、level=3 で <h3>（FAQの各質問）として描画する。
export function GuideSection({
  title,
  children,
  level = 2,
  open = false,
}: {
  title: ReactNode;
  children: ReactNode;
  level?: 2 | 3;
  open?: boolean;
}) {
  const Heading = (level === 3 ? "h3" : "h2") as "h2" | "h3";
  return (
    <details className="acc" open={open}>
      <summary>
        <Heading className="acc-title">{title}</Heading>
        <span className="acc-toggle" aria-hidden="true" />
      </summary>
      <div className="acc-body">{children}</div>
    </details>
  );
}
