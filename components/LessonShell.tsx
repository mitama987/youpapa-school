import { ProgressStrip } from "./ProgressStrip";

// レッスン共通シェル。カリキュラムのナビはサイト共通の SideNav が担う。
export function LessonShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressStrip />
      <div className="layout">
        <main className="content">{children}</main>
      </div>
    </>
  );
}
