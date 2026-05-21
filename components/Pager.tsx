import Link from "next/link";

export type PagerLink = { href: string; label: string };

export function Pager({ prev, next }: { prev?: PagerLink; next?: PagerLink }) {
  return (
    <div className="pager">
      {prev ? (
        <Link href={prev.href}>
          <span className="lab">前へ</span>
          {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link className="next" href={next.href}>
          <span className="lab">次へ</span>
          {next.label}
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
