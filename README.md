# シクミ (shikumi) — Next.js + Supabase

副業 × AI × 自動化を学ぶ無料アカデミー「シクミ」の本サイト。

> このブランチ (`nextjs`) は **Next.js + Supabase + Vercel** 構成の新サイトです。
> `main` ブランチには旧静的サイト（GitHub Pages 配信、`xtp3/` `xtp4/` 含む）が残っています。

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
| `main` | GitHub Pages (`mitama987.github.io/youpapa-school/`) | 旧静的サイト＋ `xtp3/` `xtp4/` LP |
| `nextjs` | Vercel (`shikumi.vercel.app`) | 新 Next.js 本サイト |
