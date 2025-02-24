import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },

  vite: {
    assetsInclude: ["**/*.json"]
  },

  app: {
    head: {
      title: "Dinosaur Encyclopedia"
    }
  },

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  compatibilityDate: "2024-11-06",
  modules: ["@nuxt/test-utils/module", "nuxt-auth-utils"]
});
