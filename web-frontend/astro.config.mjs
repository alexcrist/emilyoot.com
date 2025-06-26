import react from "@astrojs/react";
import sanity from "@sanity/astro";
import astroIcon from "astro-icon";
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://emilyoot.com",
  integrations: [
    sanity({
      projectId: "42gabzk9",
      dataset: "production",
      useCdn: false,
      apiVersion: "2025-05-29",
      studioBasePath: "/studio",
    }),
    react(),
    astroIcon(),
  ],
  output: "server",
  adapter: vercel(),
});
