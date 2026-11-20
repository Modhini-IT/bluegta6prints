import { defineConfig } from "vitest/config";
import path from "node:path";

process.env.DATABASE_URL = process.env.DATABASE_URL || "file:data/dsc_events_test.db";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.ts"],
    fileParallelism: false,
    maxWorkers: 1,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
