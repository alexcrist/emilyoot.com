import react from "@astrojs/react";
import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [
    sanity({
      projectId: "42gabzk9",
      dataset: "production",
      useCdn: false,
      apiVersion: "2025-05-29",
      studioBasePath: "/studio",
    }),
    react(),
  ],
});
