import { createDocTypeDefinition } from "./create-doctype-definition.js";
import type { DocTypeDefinition } from "./doctype-definition.js";
import { requireValidDocTypeName } from "./validate-doctype-name.js";

export type DocTypeResolution =
  | {
      readonly kind: "resolved";
      readonly definition: DocTypeDefinition;
    }
  | {
      readonly kind: "unknown_doctype";
    };

export type DocTypeRegistry = {
  readonly resolveDocType: (name: unknown) => DocTypeResolution;
};

export function createDocTypeRegistry(
  inputs: readonly DocTypeDefinition[],
): DocTypeRegistry {
  const definitionsByName = new Map<string, DocTypeDefinition>();

  for (const input of inputs) {
    const definition = createDocTypeDefinition(input);

    if (definitionsByName.has(definition.name)) {
      throw new Error("DUPLICATE_DOCTYPE_NAME");
    }

    definitionsByName.set(definition.name, definition);
  }

  return Object.freeze({
    resolveDocType(name: unknown): DocTypeResolution {
      requireValidDocTypeName(name);

      if (typeof name !== "string") {
        throw new Error("INVALID_DOCTYPE_NAME");
      }

      const definition = definitionsByName.get(name);

      if (definition === undefined) {
        return { kind: "unknown_doctype" };
      }

      return { kind: "resolved", definition };
    },
  });
}
