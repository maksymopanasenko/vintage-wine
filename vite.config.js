import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'https://vintage-wine-dfmhh6ye3-sviats-projects-0463f59c.vercel.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
