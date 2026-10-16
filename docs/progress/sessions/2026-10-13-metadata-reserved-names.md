# M1.03 — restricted/reserved field names

Date: 2026-10-13. User writes source and runs checks.

## Purpose and reference

Restricted names protect framework-owned record identity/audit/child relationship fields; reserved names protect document object/internal metadata keys. These are naming rules, not role/permission checks or SQL keyword blacklists. Pin Frappe6b450a166e076dd842e4db7ea0843f62881e62ac doctype.py scrub_field_names supplied-name restrictions, validate_fields/check_invalid_fieldnames and BaseDocument RESERVED_KEYWORDS plus all5 cached properties. Source inspected live; runtime fixtures pending.

Restricted supplied-name set: name,parent,creation,owner,modified,modified_by,parentfield,parenttype,file_list,flags,docstatus.
Reserved normalized set: doctype,flags,_parent_doc,_doc_before_save,_action,dont_update_if_missing,meta,permitted_fieldnames,_weakref,_table_fieldnames,_non_computed_table_fieldnames.
autoname is separately forbidden unless DocType logical name is exactly DocType.

Preserve source order rather than silently strengthening restrictions: restricted check on supplied name, normalize, reserved check on normalized name, duplicate guard, freeze. This means Name normalizes to name without matching the initial restricted list; do not claim all case/punctuation-derived system collisions protected. Runtime fixtures and explicit parity/design review required before changing that behavior. Full controller method/property conflicts remain pending until controller model exists.

Implementation is independently written TS; listed names/invariants adapted from pinned source, no upstream Python code copied. No extra architecture change or dependency. Native error codes RESTRICTED_DOCFIELD_NAME/RESERVED_DOCFIELD_NAME are incremental internal diagnostics, not upstream payload parity.

## Assigned

User creates packages/metadata/src/validate-docfield-name.ts: module-private ReadonlySet<string> views of fixed lists; two exported internal helper functions requireUnrestrictedDocFieldName and requireUnreservedDocFieldName. ReadonlySet restricts TypeScript mutation API; it is not runtime freezing. Neither list stores tenant/actor state. Do not export helpers from package index.

Constructor calls supplied-name guard before normalization, checks normalized reserved keys and DocType-dependent autoname before duplicate validation/freeze. Existing copy behavior preserved.

Append3 constructor tests using helper that replaces first fixture fieldname: all raw restricted names fail without changing input; all reserved keys via uppercase input normalize then fail; autoname rejects Sales Invoice but accepts exact DocType. Expected10 total tests, not observed.

User-run root format/lint, uncached metadata typecheck/test/build and final format:check with exit status. No install or config changes. Source/results pending. All remaining grammar/length/label derivation/DocType names/raw decode/registry/full metadata behavior retained.

Assistant changed progress/session documentation only; latest doc formatting pending. Questions remain at session end, no quiz gate.

## Verification received

User restricted/reserved-name batch passes with final exit0: root format/lint succeeds with cached contracts/engine declaration builds; uncached metadata typecheck/test/build succeeds with10 tests; final format:check passes. Read-only validator/name lists/constructor/tests/public entry match assignment: raw restricted guard, copied explicit normalization, normalized reserved guard with exact DocType autoname exception, duplicate guard, freeze. Helpers remain internal. No engine/API rerun, reference runtime parity, registry/storage or complete metadata validation established.

Next checkpoint: Continue M1.03 with required-name/fieldname grammar and length policy plus DocType name validation before registry admission. Inspect pinned Unicode word semantics, adapter-specific identifier limits, missing-name label generation and raw versus normalized checks; explain policy and any adaptation before assigning code. Current restricted/reserved/normalization/collision constructor checked locally with10 tests. Next code/commands unassigned. Preserve Name-to-name source-order caveat; controller conflict checks, raw JSON decoding, registry and full fields/modes/options/permissions remain pending.

No source edits/checks executed by assistant; documentation only updated. New docs postdate passing format check.
