import path from "path";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  esbuild: {
    loader: "tsx",
    include: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"],
    exclude: ["node_modules"],
  },
  server: {
    host: "localhost",
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build",
  },
    base: "/test-guru/",
});
