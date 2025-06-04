import { defineField, defineType } from "sanity";

export const printsPasswordType = defineType({
  name: "printsPassword",
  type: "document",
  fields: [
    defineField({
      name: "password",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
    prepare() {
      return { title: "Info" };
    },
  },
});
