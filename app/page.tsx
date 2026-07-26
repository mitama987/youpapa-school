import Link from "next/link";
import { CourseCatalog } from "@/components/CourseCatalog";
import { HeroProgress } from "@/components/HeroProgress";
import { ResumeCTA } from "@/components/ResumeCTA";
import { IconWrench } from "@/components/icons";
import { HERO_COURSE } from "@/lib/courses";

export default function Home() {
  return (
    <div className="home-wrap">
      <div className="page-head">
        <h1>講座一覧</h1>
      </div>

      {/* ヒーローカード（基礎講座） */}
      <section className="hero-card">
        <div className="hc-main">
          <span className="hc-chip">まずはここから</span>
          <h2 className="hc-title">
            <Link href={HERO_COURSE.href}>
              {HERO_COURSE.titleLines[0]}
              <br />
              {HERO_COURSE.titleLines[1]}
            </Link>
          </h2>
          <p className="hc-desc">{HERO_COURSE.desc}</p>
          <HeroProgress />
        </div>
        <div className="hc-side">
          <Link className="hc-media" href={HERO_COURSE.href}>
            <img
              src={HERO_COURSE.thumb}
              alt="副業×AI×自動化で月10万を目指す基礎講座"
            />
          </Link>
          <ResumeCTA className="hero-cta" hideHint />
        </div>
      </section>

      {/* 学習の流れ */}
      <section className="home-section">
        <h2>学習の流れ</h2>
        <div className="flow-card">
          <div className="flow-steps">
            <div className="flow-step is-active">
              <span className="flow-dot">01</span>
              <span className="flow-label">リサーチする</span>
            </div>
            <span className="flow-connector" aria-hidden="true" />
            <div className="flow-step">
              <span className="flow-dot">02</span>
              <span className="flow-label">商品をつくる</span>
            </div>
            <span className="flow-connector" aria-hidden="true" />
            <div className="flow-step">
              <span className="flow-dot">03</span>
              <span className="flow-label">販売する</span>
            </div>
            <span className="flow-connector" aria-hidden="true" />
            <div className="flow-step">
              <span className="flow-dot">04</span>
              <span className="flow-label">集客する</span>
            </div>
          </div>
          <p className="flow-caption">
            基礎から実践まで、4つのステップで着実にスキルを身につけます。
          </p>
        </div>
      </section>

      {/* すべての講座（フィルターチップ＋2列グリッド） */}
      <CourseCatalog />

      {/* ツール誘導バナー */}
      <section className="tool-banner">
        <IconWrench size={24} className="tb-icon" />
        <span className="tb-text">必要なツールをお探しですか？</span>
        <a className="tb-btn" href="https://sns-tools-market.vercel.app/">
          ツール一覧を見る →
        </a>
      </section>
    </div>
  );
}
