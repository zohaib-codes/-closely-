# M1.03 — duplicate field-name validation assignment

Date: 2026-10-12. User writes source and runs checks.

## Resume and scope

User reports understanding engine explanation and requests return to actual coding. Remaining folder tour deferred by user. Existing constructor/tests/type definitions reviewed read-only. Last verified user-supplied construction batch remains3 tests/exit0. No new checks run.

## Purpose and reference

A DocType cannot define two fields with identical fieldname; later record lookup, form binding and storage mapping would be ambiguous. Guard belongs to metadata constructor so every typed caller encounters the same rule. This differs from DocField unique flag, which concerns duplicate stored values across records.

Pinned Frappe6b450a166e076dd842e4db7ea0843f62881e62ac doctype.py validate_fields/check_unique_fieldname rejects duplicated field names. Adopt that invariant; implement independently using built-in Set, not copied upstream code or a dependency. Native DUPLICATE_DOCFIELD_NAME error is an incremental internal code, not Frappe error-payload parity. Current guard compares supplied names exactly; Frappe's prior normalization means case/scrubbing collisions remain pending until normalization is implemented. No full naming validation or product parity claimed.

Reading: MDN Set Description/add/has; TypeScript generic Set<string> restricts stored values, built-in collection needs no install. A new Set per constructor invocation scopes uniqueness to one model and avoids mutable global validation state.

## Assigned user action

Add private requireUniqueFieldNames(fields: readonly DocFieldDefinition[]): void to packages/metadata/src/create-doctype-definition.ts. Scan field names using local Set; throw DUPLICATE_DOCFIELD_NAME on repeat, add unseen names. Call guard at start of createDocTypeDefinition before copied/frozen result construction.

Append2 behavioral tests: reject duplicate name despite differing labels/flags while preserving mutable original input; permit fieldnames reused across distinct DocType definitions. Existing3 tests retain construction behavior.

Run root format/lint, uncached metadata typecheck/test/build and final format:check, report exit status. Expected5 tests, not observed. No new exports/config/dependencies required. Assistant changed progress documents only.

## Pending

User source/output pending. Reserved/restricted field names, DocType name grammar, canonicalization/collision detection, raw decoding, registry and complete fields/modes/permissions remain pending. Recap questions at end, no gate. User-reported engine understanding is not independently assessed skill evidence.

## Verification received

User duplicate fieldname batch passes with explicit exit0: root format/lint succeeds, contracts/engine lint-prerequisite builds use cache; uncached metadata typecheck/test/build succeeds with5 tests; final format:check passes. Read-only guard and tests match assignment: per-call Set detects exact duplicate fieldnames before construction, rejected input stays unchanged/unfrozen, and different DocTypes reuse names. No engine/API tests rerun or Frappe parity/metadata consumer/registry evidence added.

Next checkpoint: Continue M1.03 with reference-backed fieldname normalization and reserved/restricted identifier checks, including duplicate collisions after normalization, before registry admission. Exact supplied-name duplicate guard and immutable construction checked locally with5 metadata tests. New normalization/reserved-name source/code/commands not yet assigned; explain policy before user edits. DocType name validation, unknown metadata decoding, registry and full fields/modes/options/permissions remain pending.

Only progress documentation modified by assistant; new docs edits postdate the passing format check.

## Explicit name normalization assignment

User requested next. Reviewed pinned doctype.py scrub_field_names: supplied names have the listed punctuation removed, then are lowercased; field duplicate validation happens afterward. Restricted supplied names and later reserved BaseDocument keys/controller properties are separate policies; autoname has a DocType exception. Schema column grammar uses Python Unicode word semantics; do not substitute JavaScript ASCII word regex or arbitrary ASCII-only policy. None of those remaining rules is implemented/claimed in this increment.

Assigned internal normalize-docfield-name.ts helper using explicit listed punctuation removal and toLowerCase. No unknown decoder, missing-name label derivation or complete grammar/reserved validation. Constructor copies normalized fields, checks duplicate names on copies before freezing and returns immutable snapshot. DocType logical name and labels remain unchanged. Do not treat metadata name as raw SQL; future registry/adapter owns storage identifier mapping.

Add2 constructor tests: Customer.Name -> customername while original spelling/label remain unchanged, and Customer.Name colliding with customername rejected without changing/freezing caller input. Existing5 tests retained; expected7, not observed. Built-in String.replace/global regex/toLowerCase explained using MDN. No new dependencies, public exports or configs.

Source/user-run output pending. Run root format/lint, uncached metadata typecheck/test/build and final format:check with exit status. Assistant changes progress documents only; new documentation formatting pending.

## Normalization results received 2026-10-13

User-supplied explicit fieldname normalization batch passes with final exit0: root format/lint succeeds, contracts/engine lint-prerequisite builds use cache; uncached metadata typecheck/test/build succeeds with7 tests; final format:check passes. Read-only normalizer/constructor/tests/public entry match assignment: specified punctuation removal and lowercase on copied fields, duplicate check after normalization, then freezing; input names and labels/DocType name remain unchanged, normalization collisions rejected. Normalizer remains internal. No engine/API tests rerun, registry/storage or Frappe runtime parity evidence added.

See sessions/2026-10-13-metadata-normalization-review.md for the current next lesson.
