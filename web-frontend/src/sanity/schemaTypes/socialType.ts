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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
