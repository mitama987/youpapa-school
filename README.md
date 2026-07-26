# シクミ (shikumi) — Next.js + Supabase

副業 × AI × 自動化を学ぶ無料アカデミー「シクミ」の本サイト。

> Vercel 本番 (`shikumi-lake.vercel.app`) は **`main` ブランチ追従**です。
> （旧記載の `nextjs` ブランチは廃止済み。静的LP `xtp3/` `xtp4/` は GitHub Pages 配信のまま）

## Stack

- Next.js 16 (App Router) + TypeScript
- Supabase (Auth + Postgres + RLS) — Tokyo region
- Vercel (host + CI/CD)
- pnpm

## Dev

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # 本番ビルド検証
```

## Env

`.env.local` は gitignore 済。必要なキーは:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Branch strategy

| branch | host | 用途 |
|---|---|---|
| `main` | Vercel (`shikumi-lake.vercel.app`) ＋ GitHub Pages（`xtp3/` `xtp4/` LP） | 本番。Next.js 本サイト |
| `design/v1-orange` | — | 旧デザイン（オレンジ基調・v1）の保存ブランチ。**削除禁止** |

## デザインのロールバック

2026-07-26 にデザインv2（コーラル基調・ダッシュボード型。ハンドオフは `.docs/design/v2-coral-handoff/`）を適用。
旧デザイン（v1 オレンジ基調）は以下に保全してある。

- タグ: `design-v1`（= v1 最終コミット `e0338bb`）。**削除禁止**
- ブランチ: `design/v1-orange`（同コミット）

**v1 に戻す手順（推奨）** — 本番は main 追従なので push だけで自動反映される:

```bash
git checkout main
git revert -m 1 <v2マージコミットのSHA>   # マージコミットを打ち消す
git push origin main
```

- v2 を再適用したくなったら「revert の revert」でクリーンに戻せる
- `git push origin design-v1:main --force` は履歴書換のため非常用（通常は使わない）
