import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Pick the deploy target via env so the same config works on Cloudflare and Vercel.
//   DEPLOY_TARGET=cloudflare  (default — outputs to ./dist for `wrangler deploy`)
//   DEPLOY_TARGET=vercel      (outputs to ./.vercel/output, auto-detected by Vercel)
//   DEPLOY_TARGET=node        (plain Node server in ./dist for self-hosting)
//
// Vercel sets the VERCEL=1 env var during builds, so we auto-detect it too.
const target =
  process.env.DEPLOY_TARGET ??
  (process.env.VERCEL ? "vercel" : "cloudflare");

const nitroOptions =
  target === "vercel"
    ? { preset: "vercel" as const }
    : target === "node"
      ? {
          preset: "node-server" as const,
          output: {
            dir: "dist",
            serverDir: "dist/server",
            publicDir: "dist/client",
          },
        }
      : {
          preset: "cloudflare-module" as const,
          output: {
            dir: "dist",
            serverDir: "dist/server",
            publicDir: "dist/client",
          },
          cloudflare: {
            nodeCompat: true,
            deployConfig: true,
          },
        };

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
    nitro(nitroOptions as Parameters<typeof nitro>[0]),
    viteReact(),
  ],
});
