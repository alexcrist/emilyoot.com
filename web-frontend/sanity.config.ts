import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  projectId: "42gabzk9",
  dataset: "production",
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
          ]);
      },
    }),
  ],
  schema,
});
