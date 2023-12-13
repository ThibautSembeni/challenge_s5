import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import hmr from "./react-hmr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), hmr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
