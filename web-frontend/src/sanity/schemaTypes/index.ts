import type { SchemaTypeDefinition } from "sanity";
import { infoType } from "./infoType";
import { printType } from "./printType";
import { socialType } from "./socialType";
import { workType } from "./workType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [infoType, workType, printType, socialType],
};
