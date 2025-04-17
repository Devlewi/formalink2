/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // ← ici on définit ton site Next.js
    setupNodeEvents(on, config) {
      // Tu pourras ajouter des plugins ici plus tard si nécessaire
    },
    supportFile: "cypress/support/e2e.ts", // ← important pour charger les commandes globales
  },
});
