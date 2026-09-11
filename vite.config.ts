import path from "path";
import { defineConfig } from "vite";

// deployed to github pages from ./docs (see README)
export default defineConfig({
  root: "src/client",
  base: "./",
  publicDir: path.resolve(__dirname, "public"),
  server: {
    port: 5178,
    host: true,
    allowedHosts: true,
    strictPort: true,
  },
  build: {
    outDir: path.resolve(__dirname, "docs"),
    emptyOutDir: true,
  },
});
