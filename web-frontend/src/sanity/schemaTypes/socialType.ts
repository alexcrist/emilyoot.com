import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const socialType = defineType({
  name: "socials",
  type: "document",
  fields: [
    orderRankField({
      type: "socials",
      newItemPosition: "after",
    }),
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "url",
      type: "url",
    }),
  ],
});
