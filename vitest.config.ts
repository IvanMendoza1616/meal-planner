import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dotenv from "dotenv";

dotenv.config({ path: resolve(__dirname, ".env") });

export default defineConfig({
  plugins: [react()],
  test: {
    alias: { "@/": new URL("./", import.meta.url).pathname },
    environment: "jsdom",
    setupFiles: ["./setup/mongo-memory-server.ts"],
  },
});
