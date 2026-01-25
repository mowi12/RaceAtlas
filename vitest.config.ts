import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      enabled: true,
      cleanOnRerun: true,
      reporter: process.env.GITHUB_ACTIONS ? ["lcovonly"] : ["html"],
    },
  },
  resolve: {
    alias: {
      "@/lib": "./lib",
    },
  },
});
