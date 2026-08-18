import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * `TZ` is pinned because several date helpers format with local-time getters
 * (`getMonth`, `getDate`), so their output depends on the machine's timezone —
 * a congress stored as 2026-09-14T00:00:00Z renders as "September 13" in
 * UTC-3 and "September 14" in UTC. UTC is what the deployment actually runs
 * in, so tests assert what production renders rather than what the developer's
 * laptop happens to show.
 */
process.env.TZ = "UTC";

export default defineConfig({
  resolve: {
    // Mirror the `@/*` path alias from tsconfig.json.
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    env: { TZ: "UTC" },
  },
});
