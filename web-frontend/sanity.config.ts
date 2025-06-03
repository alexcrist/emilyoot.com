import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import SanityStudioIcon from "./src/components/SanityStudioIcon";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  title: "emilyoot.com",
  projectId: "42gabzk9",
  dataset: "production",
  icon: SanityStudioIcon,
  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("info").title("Info"),
            orderableDocumentListDeskItem({
              type: "works",
              S,
              context,
              title: "Work",
            }),
            orderableDocumentListDeskItem({
              type: "socials",
              S,
              context,
              title: "Social Network Links",
            }),
          ]);
      },
    }),
  ],
  schema,
});
