import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: "src/assets/scss/quasar-variables.sass",
    }),
  ],
  /*server: {
    proxy: {
      "/api": {
        target: "https://islandcrossing.anaelbonnafous.fr",
        changeOrigin: true,
      },
    },
  },*/
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
