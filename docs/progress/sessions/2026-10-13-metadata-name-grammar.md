# M1.03 — explicit name grammar and logical length assignment

Date: 2026-10-13. User implements/runs; assistant teaches/reviews and maintains docs.

## Reference and responsibility

Read current metadata validators/constructor and pinned doctype.py validate_name/patterns, schema.py Unicode special-character/length checks, Database MAX_COLUMN_LENGTH64, Postgres subclass with no override found. Logical DocType limit61 and field limit64 arise from source metadata checks. PostgreSQL standard physical identifier limit63 bytes is independent; future registry/adapter must map and safely quote bounded physical identifiers rather than silently truncate/directly trust logical names.

DocType source ASCII pattern requires first letter plus at least one following letter/digit/space/underscore/hyphen; padding forbidden. Retain one-character rejection and preserve display name spelling, no automatic trim/scrub. Website route conflict requires future route registry, not this pure helper.

Python Unicode word grammar allows letters/numbers/underscore. Translate with JS Unicode Letter and Number property escapes plus underscore; count codepoints with string iteration rather than UTF16 units. Unicode database versions and broad cross-runtime equivalence remain unverified. Test representative ASCII/Arabic/CJK/astral names, invalid marks/symbols and boundaries. Literal SQL identifiers still require later adapter rules.

Explicit normalized internal fieldname must be nonempty for this contract; no label-derived name implemented. This is an incremental internal precondition, not complete Frappe form/raw JSON acceptance or upstream empty-name parity. Full raw decoder and missing-name label generation remain planned.

## Assigned

User creates internal src/validate-doctype-name.ts with typed unknown identifier check,2-to61 ASCII characters and no padding; INVALID_DOCTYPE_NAME. Add requireValidDocFieldName to validate-docfield-name.ts: typed string,1-to64 codepoints, Unicode letters/numbers/underscore; INVALID_DOCFIELD_NAME. Existing restricted/reserved lists unchanged.

Constructor calls DocType helper first. Restricted raw check precedes normalization; normalized grammar check precedes reserved and duplicate guards, then freeze. Normalized punctuation-only name fails empty check. Helpers stay internal, no package export/config/dependency changes.

Append4 constructor tests: rejected DocType names/padding/control/one-character/62 length; accepted logical spellings/61 boundary; rejected normalized field syntax/empty/65 ASCII and astral lengths; accepted representative Unicode/64 boundaries. Expected14 total, not observed.

User runs root format/lint, uncached metadata typecheck/test/build and final format:check with exit status. Source/results pending. Optional recap at session end, no gate.

## Remaining

Missing-name derivation, module/route/controller existence/conflicts, full fields/options/flags/modes/permissions, unknown metadata decoding, per-site registry and storage mapping remain pending. Name-to-name restriction order caveat retained. No runtime reference/parity or new broader checks. Assistant modified progress/session documents only; latest docs formatting unchecked.

## Verification received

User name-grammar batch passes with explicit final exit0: root format/lint succeeds with cached contracts/engine declarations; uncached metadata typecheck/test/build succeeds with14 tests; final format:check passes. Read-only DocType/field validators, constructor ordering, tests and public entry match assignment. Covers2-to61 ASCII logical DocType names/no padding, normalized nonempty Unicode letter/number/underscore fieldnames up to64 codepoints, invalid syntax/65 limits and representative Unicode/astral boundaries. Helpers remain internal. No engine/API rerun, full Unicode/reference runtime parity, module/controller/route checks, registry or storage evidence.

Next checkpoint: Continue M1.03 with pinned missing fieldname derivation from labels for Data fields, distinguishing absent explicit name from a nonempty name that normalizes to empty; inspect restricted-name suffix behavior and normalization/collision order before supplying code. Current explicit-name construction/normalization/reserved/grammar slice locally checked with14 tests. Next code/commands not assigned. Unknown metadata decoder, module/controller/route checks, per-site registry, full fields/modes/options/permissions and physical storage mapping remain pending; Name-to-name restriction caveat retained.

Assistant updated progress/session documents only. New docs edits postdate passing formatter; no extra docs-only check requested.
