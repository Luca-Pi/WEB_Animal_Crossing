import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      config.env.API_URL = process.env.VITE_API_BASE_URL ?? "localhost:8080"

      return config
    },
  },
});
