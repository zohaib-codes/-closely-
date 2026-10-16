const RESTRICTED_DOCFIELD_NAMES: ReadonlySet<string> = new Set([
  "name",
  "parent",
  "creation",
  "owner",
  "modified",
  "modified_by",
  "parentfield",
  "parenttype",
  "file_list",
  "flags",
  "docstatus",
]);

const RESERVED_DOCFIELD_NAMES: ReadonlySet<string> = new Set([
  "doctype",
  "flags",
  "_parent_doc",
  "_doc_before_save",
  "_action",
  "dont_update_if_missing",
  "meta",
  "permitted_fieldnames",
  "_weakref",
  "_table_fieldnames",
  "_non_computed_table_fieldnames",
]);

const INVALID_DOCFIELD_CHARACTER_PATTERN = /[^\p{L}\p{N}_]/u;
const MAX_DOCFIELD_NAME_LENGTH = 64;

export function requireValidDocFieldName(fieldname: string): void {
  const characterCount = [...fieldname].length;

  if (
    characterCount === 0 ||
    characterCount > MAX_DOCFIELD_NAME_LENGTH ||
    INVALID_DOCFIELD_CHARACTER_PATTERN.test(fieldname)
  ) {
    throw new Error("INVALID_DOCFIELD_NAME");
  }
}

export function isRestrictedDocFieldName(fieldname: string): boolean {
  return RESTRICTED_DOCFIELD_NAMES.has(fieldname);
}

export function requireUnrestrictedDocFieldName(fieldname: string): void {
  if (isRestrictedDocFieldName(fieldname)) {
    throw new Error("RESTRICTED_DOCFIELD_NAME");
  }
}

export function requireUnreservedDocFieldName(
  doctypeName: string,
  fieldname: string,
): void {
  if (
    RESERVED_DOCFIELD_NAMES.has(fieldname) ||
    (fieldname === "autoname" && doctypeName !== "DocType")
  ) {
    throw new Error("RESERVED_DOCFIELD_NAME");
  }
}
