"use client";
import Link from "next/link";
import { useState } from "react";
import { COURSES, COURSE_CATS, type Course } from "@/lib/courses";

const FILTERS = ["すべて", ...COURSE_CATS] as const;
type Filter = (typeof FILTERS)[number];

function CourseCard({ course }: { course: Course }) {
  const body = (
    <>
      <img
        className="cc-thumb"
        src={course.thumb}
        alt={course.title}
        loading="lazy"
      />
      <span className="cc-body">
        <span className="cc-title">{course.title}</span>
        <span className="cc-desc">{course.desc}</span>
        <span className="cc-meta">
          <span
            className={
              course.status === "live" ? "cc-pill live" : "cc-pill soon"
            }
          >
            {course.status === "live" ? "公開中" : "準備中"}
          </span>
          {course.meta}
        </span>
        <span className="cc-more">
          {course.href
            ? course.status === "live"
              ? "詳しく見る →"
              : "見てみる →"
            : "準備中"}
        </span>
      </span>
    </>
  );
  if (!course.href) {
    return (
      <div className="course-item is-disabled" aria-disabled="true">
        {body}
      </div>
    );
  }
  return (
    <Link className="course-item" href={course.href}>
      {body}
    </Link>
  );
}

// 「すべての講座」: フィルターチップ＋2列カードグリッド。
// clientコンポーネントだが初期表示（すべて）はSSRされ全カードがHTMLに含まれる
export function CourseCatalog() {
  const [filter, setFilter] = useState<Filter>("すべて");
  const shown =
    filter === "すべて" ? COURSES : COURSES.filter((c) => c.cat === filter);

  return (
    <section className="home-section">
      <h2>すべての講座</h2>
      <div className="chips" role="group" aria-label="カテゴリで絞り込み">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={f === filter ? "chip active" : "chip"}
            aria-pressed={f === filter}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="course-grid">
        {shown.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </section>
  );
}
