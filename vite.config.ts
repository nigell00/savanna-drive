import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Explicit Vite config with a top-level `plugins` array so external tools
// (e.g. Cloudflare's TanStack Start integration) can introspect and modify it.
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      target: "cloudflare-module",
      customViteReactPlugin: true,
      server: { entry: "./src/server.ts" },
    }),
    viteReact(),
  ],
});
