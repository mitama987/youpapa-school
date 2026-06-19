import { NoteGuideToc } from "./NoteGuideToc";

// note集客コースのサブページ共通シェル（左サイドTOC＋本文）。
// 既存 LessonShell は fukugyo-ai 用の進捗TOCに紐づくため、本コース専用に分離する。
export function NoteGuideShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <NoteGuideToc />
      <main className="content guide" style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
