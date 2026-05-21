import { LessonToc } from "./LessonToc";
import { ProgressStrip } from "./ProgressStrip";

export function LessonShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressStrip />
      <div className="layout">
        <LessonToc />
        <main className="content">{children}</main>
      </div>
    </>
  );
}
