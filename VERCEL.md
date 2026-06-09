# Deploying to Vercel

This project is a **TanStack Start** app (SSR), not a plain Vite SPA. The 404 on Vercel happens when Vercel is configured as **"Vite"** framework — it then deploys only the static `dist/` folder and there is no server to render routes, so every URL except `/index.html` returns 404.

## Fix — configure the project correctly

In **Vercel → Project → Settings → General → Build & Development Settings**:

| Setting              | Value                |
| -------------------- | -------------------- |
| Framework Preset     | **Other** (not Vite) |
| Build Command        | `vite build`         |
| Output Directory     | *(leave empty)*      |
| Install Command      | `npm install` (or `bun install`) |

Then redeploy.

## How it works

`vite.config.ts` auto-detects Vercel (via the `VERCEL=1` env var Vercel sets
during builds) and switches Nitro to the `vercel` preset. That emits a proper
serverless function bundle to `.vercel/output/`, which Vercel picks up
automatically — no `outputDirectory` override needed.

You can also force the target manually:

```bash
DEPLOY_TARGET=vercel vite build
```

## Why "Vite" framework gives 404

The Vite preset assumes a static SPA and serves `dist/` only. TanStack Start
needs an SSR runtime for every route — without it, only `/` works (and even
that only if `index.html` exists). Switching to **Other** lets our config
produce the SSR output Vercel expects.
