import type { SchemaTypeDefinition } from "sanity";
import { infoType } from "./infoType";
import { socialType } from "./socialType";
import { workType } from "./workType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [infoType, workType, socialType],
};
