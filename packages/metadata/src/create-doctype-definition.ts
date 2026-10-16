import type {
  DocFieldDefinition,
  DocTypeDefinition,
} from "./doctype-definition.js";
import { normalizeDocFieldName } from "./normalize-docfield-name.js";
import {
  requireUnreservedDocFieldName,
  requireUnrestrictedDocFieldName,
  requireValidDocFieldName,
} from "./validate-docfield-name.js";
import { requireValidDocTypeName } from "./validate-doctype-name.js";

function requireUniqueFieldNames(fields: readonly DocFieldDefinition[]): void {
  const seenFieldNames = new Set<string>();

  for (const field of fields) {
    if (seenFieldNames.has(field.fieldname)) {
      throw new Error("DUPLICATE_DOCFIELD_NAME");
    }

    seenFieldNames.add(field.fieldname);
  }
}

export function createDocTypeDefinition(
  input: DocTypeDefinition,
): DocTypeDefinition {
  requireValidDocTypeName(input.name);
  for (const field of input.fields) {
    requireUnrestrictedDocFieldName(field.fieldname);
  }
  const normalizedFields: DocFieldDefinition[] = input.fields.map((field) => ({
    fieldname: normalizeDocFieldName(field.fieldname, field.label),
    fieldtype: field.fieldtype,
    label: field.label,
    reqd: field.reqd,
    read_only: field.read_only,
    unique: field.unique,
  }));

  for (const field of normalizedFields) {
    requireValidDocFieldName(field.fieldname);

    requireUnreservedDocFieldName(input.name, field.fieldname);
  }

  requireUniqueFieldNames(normalizedFields);

  const fields: readonly DocFieldDefinition[] = Object.freeze(
    normalizedFields.map((field) => Object.freeze(field)),
  );

  return Object.freeze({
    name: input.name,
    module: input.module,
    fields,
  });
}
