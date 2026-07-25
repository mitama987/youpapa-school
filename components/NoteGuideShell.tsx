// note集客コースのサブページ共通シェル。コース内ナビはサイト共通の SideNav が担う。
export function NoteGuideShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <main className="content guide">{children}</main>
    </div>
  );
}
