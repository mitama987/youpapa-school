// トップページ講座カタログ（実コンテンツの単一情報源。表示はCourseCatalog/ヒーローカード）

export type CourseCat = "商品づくり" | "販売" | "集客";

export type Course = {
  id: string;
  title: string;
  desc: string;
  meta: string;
  cat: CourseCat;
  href: string | null; // null = ページ未作成（クリック不可カード）
  thumb: string;
  status: "live" | "soon";
};

export const COURSE_CATS: CourseCat[] = ["商品づくり", "販売", "集客"];

export const COURSES: Course[] = [
  {
    id: "web-app",
    title: "Webアプリ作成講座",
    desc: "環境構築不要のWebアプリを、Claude CodeなどのAIで最小工数から作る型を実践します。",
    meta: "簡易ガイド公開中",
    cat: "商品づくり",
    href: "/courses/web-app",
    thumb: "/thumbs/web-app.webp",
    status: "soon",
  },
  {
    id: "lp",
    title: "LP作成講座",
    desc: "価値が伝わるLPの構成・コピー・価格設計の型を、実物の製品LPを教材に学びます。",
    meta: "簡易ガイド公開中",
    cat: "販売",
    href: "/courses/lp",
    thumb: "/thumbs/lp.webp",
    status: "soon",
  },
  {
    id: "sns",
    title: "SNS集客講座（note・ココナラ・X・Threads）",
    desc: "これまで実際に実践してきた内容を中心に、各SNSの使い分けと発信の仕組み化を公開します。",
    meta: "簡易ガイド公開中",
    cat: "集客",
    href: "/courses/sns",
    thumb: "/thumbs/sns.webp",
    status: "soon",
  },
  {
    id: "youtube",
    title: "YouTube作成講座",
    desc: "これから実際に発信していく過程を教材化。企画→台本→編集→サムネ→投稿の型で、YouTubeを集客チャネルに育てます。",
    meta: "簡易ガイド公開中",
    cat: "集客",
    href: "/courses/youtube",
    thumb: "/thumbs/youtube.webp",
    status: "soon",
  },
  {
    id: "youtube-edit",
    title: "YouTube自動編集・サムネ・投稿",
    desc: "動画編集からサムネ生成・投稿まで自動化するスキル。YouTube集客の継続を仕組み化します。近日公開予定。",
    meta: "Coming soon",
    cat: "集客",
    href: null,
    thumb: "/thumbs/youtube-edit.webp",
    status: "soon",
  },
  {
    id: "note-shukyaku",
    title: "note集客 ― Claude Codeで記事自動生成→note投稿",
    desc: "記事を自動生成し、そのままnoteへ投稿するスキル。noteで集客する考え方と、API・note投稿の設定までを公開しています。",
    meta: "全5レッスン・無料",
    cat: "集客",
    href: "/courses/note-shukyaku",
    thumb: "/thumbs/claude-note.webp",
    status: "live",
  },
  {
    id: "x-post",
    title: "Xポスト自動生成スキル",
    desc: "発信の核から日々のポストを自動生成。AI臭を消す「深掘り型」と10パターンの「量産型」を選べます。APIキー不要。",
    meta: "導入ガイド・無料",
    cat: "集客",
    href: "/courses/x-post",
    thumb: "/thumbs/x-post.webp",
    status: "live",
  },
];

// ヒーローカード（基礎講座 = fukugyo-ai）
export const HERO_COURSE = {
  href: "/courses/fukugyo-ai",
  titleLines: ["副業×AI×自動化で", "月10万を目指す基礎講座"] as const,
  desc: "リサーチ→商品→販売→集客。3年分の遠回りを削ったテンプレートを、チェックリスト付きで実践します。全5レッスン・無料・登録不要。",
  thumb: "/thumbs/fukugyo-ai.webp",
};
