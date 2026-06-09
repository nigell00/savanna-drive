import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Explicit Vite config with a top-level `plugins` array so external tooling
// (e.g. Cloudflare's TanStack Start integration / `@cloudflare/vite-plugin`)
// can introspect and modify it.
//
// To deploy on Cloudflare Workers, run `vite build` then `wrangler deploy`.
// Wrangler reads `wrangler.toml` at the repo root.
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      start: { entry: "./src/server.ts" },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    nitro({
      preset: "cloudflare-module",
      output: {
        dir: "dist",
        serverDir: "dist/server",
        publicDir: "dist/client",
      },
      cloudflare: {
        nodeCompat: true,
        deployConfig: true,
      },
    }),
    viteReact(),
  ],
});
