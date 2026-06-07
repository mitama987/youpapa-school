// 講座カードのサムネを gpt-image-2 で生成して public/thumbs/ に保存する。
//
// 使い方:
//   $env:OPENAI_API_KEY="sk-..."   # PowerShell (または .env.local に追記)
//   node scripts/gen-thumbnails.mjs            # 全部生成
//   node scripts/gen-thumbnails.mjs web-app sns  # 指定slugだけ生成
//
// 出力: public/thumbs/<slug>.webp （16:9 近似 1536x1024、object-fit:cover で表示）

import { writeFile, mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "thumbs");
const MODEL = "gpt-image-2"; // グローバル設定（サムネ=gpt-image-2）に準拠
const SIZE = "1536x1024"; // landscape（16:9 に近い）

// .env.local から OPENAI_API_KEY を拾えるようにする（未設定なら環境変数を使用）
async function resolveApiKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  const envPath = path.join(ROOT, ".env.local");
  if (existsSync(envPath)) {
    const txt = await readFile(envPath, "utf8");
    const m = txt.match(/^OPENAI_API_KEY=(.+)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  return null;
}

// コンセプト（=各カード）ごとの生成プロンプト。
// 共通トーン: オレンジ基調・フラット&モダン・テキストなし・教育/副業のイメージ。
const STYLE =
  "Flat modern vector illustration, warm orange and cream color palette (#f97316 accent), " +
  "clean minimal, soft gradients, no text, no words, no letters, centered composition, " +
  "friendly and professional, suitable as a course thumbnail, 16:9 wide.";

const CONCEPTS = {
  "fukugyo-ai":
    "A person at a laptop with AI gears and automation arrows forming a 4-step flow, symbolizing earning side income with AI and automation. " +
    STYLE,
  "web-app":
    "Building a web application: browser window, UI blocks, code brackets and an AI spark assembling an app quickly. " +
    STYLE,
  youtube:
    "Creating a YouTube video: play button, video camera, thumbnail frame and a rising view-count chart. " +
    STYLE,
  lp:
    "A high-converting landing page on a screen: headline block, hero, call-to-action button and an upward conversion arrow. " +
    STYLE,
  sns:
    "Social media marketing across multiple platforms: speech bubbles, heart and share icons, a content hub broadcasting to several feeds. " +
    STYLE,
  "youtube-edit":
    "Automated video editing: timeline with clips, scissors, sparkle of automation and an auto-generated thumbnail. " +
    STYLE,
  "claude-note":
    "Automated article writing to a blog/note platform: document with auto-generated text, an AI spark and a publish arrow. " +
    STYLE,
  "x-post":
    "Auto-generating short social posts: a feed of post cards being produced from one core idea by an AI engine. " +
    STYLE,
};

async function genOne(apiKey, slug, prompt) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      size: SIZE,
      output_format: "webp",
      n: 1,
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`[${slug}] ${res.status} ${t}`);
  }
  const json = await res.json();
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error(`[${slug}] no image data in response`);
  const buf = Buffer.from(b64, "base64");
  const outPath = path.join(OUT_DIR, `${slug}.webp`);
  await writeFile(outPath, buf);
  console.log(`  ✓ ${slug}.webp  (${(buf.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  const apiKey = await resolveApiKey();
  if (!apiKey) {
    console.error(
      "ERROR: OPENAI_API_KEY が見つかりません。環境変数か .env.local に設定してください。",
    );
    process.exit(1);
  }
  await mkdir(OUT_DIR, { recursive: true });

  const args = process.argv.slice(2);
  const slugs = args.length ? args : Object.keys(CONCEPTS);
  console.log(`Generating ${slugs.length} thumbnail(s) with ${MODEL} → ${OUT_DIR}`);

  for (const slug of slugs) {
    const prompt = CONCEPTS[slug];
    if (!prompt) {
      console.warn(`  ! unknown slug: ${slug} (skip)`);
      continue;
    }
    try {
      await genOne(apiKey, slug, prompt);
    } catch (e) {
      console.error(`  ✗ ${e.message}`);
    }
  }
  console.log("done.");
}

main();
