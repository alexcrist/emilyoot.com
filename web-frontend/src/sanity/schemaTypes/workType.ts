import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const workType = defineType({
  name: "works",
  type: "document",
  fields: [
    orderRankField({
      type: "works",
      newItemPosition: "before",
    }),
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description (optional)",
      type: "string",
    }),
  ],
});
