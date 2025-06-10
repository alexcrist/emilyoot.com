import { defineField, defineType } from "sanity";

export const infoType = defineType({
  name: "info",
  type: "document",
  fields: [
    defineField({
      title: "Content",
      name: "content",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
    prepare() {
      return { title: "Info" };
    },
  },
});
