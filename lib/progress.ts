/* 旧 assets/js/app.js 互換ロジック。localStorage キー yps:checks を維持。 */

export type Step = {
  key: "s1" | "s2" | "s3" | "s4";
  name: string;
  slug: "step1" | "step2" | "step3" | "step4";
  total: number;
};

export const STEPS: Step[] = [
  { key: "s1", name: "STEP1 リサーチ", slug: "step1", total: 5 },
  { key: "s2", name: "STEP2 商品", slug: "step2", total: 5 },
  { key: "s3", name: "STEP3 販売", slug: "step3", total: 7 },
  { key: "s4", name: "STEP4 集客", slug: "step4", total: 5 },
];

export const GRAND_TOTAL = STEPS.reduce((s, st) => s + st.total, 0);

export const LSKEY = "yps:checks";

export type ProgressState = Record<string, boolean>;

export function loadState(): ProgressState {
  if (typeof window === "undefined") return {};
  try {
    return (JSON.parse(localStorage.getItem(LSKEY) || "{}") as ProgressState) || {};
  } catch {
    return {};
  }
}

export function saveState(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LSKEY, JSON.stringify(state));
  } catch {
    // ignore quota
  }
}

export function stepDone(state: ProgressState, st: Step): number {
  let c = 0;
  for (let i = 1; i <= st.total; i++) {
    if (state[`${st.key}-${i}`]) c++;
  }
  return c;
}

export function grandDone(state: ProgressState): number {
  return STEPS.reduce((s, st) => s + stepDone(state, st), 0);
}

export function nextLesson(state: ProgressState): { st: Step; idx: number } | null {
  for (let i = 0; i < STEPS.length; i++) {
    if (stepDone(state, STEPS[i]) < STEPS[i].total) return { st: STEPS[i], idx: i };
  }
  return null;
}
