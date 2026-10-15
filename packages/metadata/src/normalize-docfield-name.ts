import { isRestrictedDocFieldName } from "./validate-docfield-name.js";

const REMOVED_FIELDNAME_CHARACTERS = /['",./%@()<>{}]/g;
const EDGE_QUESTION_MARKS = /^\?+|\?+$/g;

export function normalizeDocFieldName(
  fieldname: string,
  label: string,
): string {
  let candidate = fieldname;

  if (candidate === "") {
    if (label === "") {
      throw new Error("MISSING_DOCFIELD_NAME");
    }

    candidate = label
      .trim()
      .toLowerCase()
      .replaceAll(" ", "_")
      .replace(EDGE_QUESTION_MARKS, "");

    if (isRestrictedDocFieldName(candidate)) {
      candidate += "1";
    }
  }

  return candidate.replace(REMOVED_FIELDNAME_CHARACTERS, "").toLowerCase();
}
