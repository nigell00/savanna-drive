# Cloudflare deployment

This project builds with TanStack Start + Nitro and deploys to **Cloudflare Workers**.

## Prerequisites
```bash
npm install
npm install -D wrangler
```

## Build
```bash
npm run build
```
Output:
- `dist/server/index.mjs` — Worker entry (referenced by `wrangler.toml`)
- `dist/client/` — static assets served via the `ASSETS` binding

## Local preview
```bash
npx wrangler dev
```

## Deploy
```bash
npx wrangler deploy
```

## Notes
- `vite.config.ts` exposes an explicit top-level `plugins` array so
  Cloudflare's TanStack Start integration (and any `@cloudflare/vite-plugin`
  flow) can introspect and modify the config.
- The Lovable wrapper (`@lovable.dev/vite-tanstack-config`) is no longer used
  in `vite.config.ts`; it remains in `devDependencies` only for parity with
  the Lovable preview and can be removed if you don't use it.
- `nodejs_compat` is required because the SSR entry uses Node built-ins via
  the TanStack/Nitro runtime.
- Set runtime secrets via `npx wrangler secret put NAME` — do not commit them.
