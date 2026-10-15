# M1.03 — Data-field label derivation assignment

Date: 2026-10-13. User writes and runs; assistant teaches/reviews.

## Source and meaning

Pinned doctype.py scrub_field_names: absent supplied fieldname derives from nonempty label using strip/lower/literal-space replacement/endpoint-question-mark stripping; generated restricted candidate gains1 before punctuation removal/lowercase. Reserved rules and duplicate checks still follow. Explicit fieldnames remain a separate branch. This Data-only increment does not implement layout-only randomized names.

Current typed internal string contract uses empty fieldname string as absence. Unknown JSON absent/null values are not admitted; raw decoder later. Missing label empty string throws MISSING_DOCFIELD_NAME; whitespace-only/question-only/punctuation-only labels generate invalid empty names and fail existing grammar. JS trim translates Python strip for this increment; broad cross-runtime Unicode whitespace differences unverified. No name/label mutation.

A generated restricted Name -> name1; explicit name still rejected. DocType label -> doctype remains reserved and rejects. Suffix1 is not a general uniqueness allocator: collisions reject, not silently choose name2. Preserve pinned raw/normalized order and known source caveats.

## Assigned

User adds internal isRestrictedDocFieldName membership helper in validate-docfield-name.ts and reuses it in existing restricted guard. normalize-docfield-name.ts imports it; signature accepts fieldname:string,label:string and derives only for exact empty name. Constructor passes field.label.

Previous invalid normalized field test includes empty name with usable Customer Name label; remove only that obsolete case, retain slash/space and other explicit malformed inputs. Add fixture helper with empty first name and chosen label;5 tests cover label generation/copy preservation, restricted suffix, absent/unusable labels, reserved derived name and collisions including name1 suffix collision. Expected19 tests, not observed.

Run root format/lint, uncached metadata typecheck/test/build and final format:check with exit status. No public export/dependency/config changes. Source/output pending. Raw decoder, module/route/controller checks, site registry, complete fields/modes/options/permissions and physical storage mapping remain pending. Assistant changed progress docs only; latest documentation format unchecked.

## Verification received

User label-derivation batch passes with final exit0: root format/lint succeeds with cached contracts/engine declaration builds; uncached metadata typecheck/test/build succeeds with19 tests; final format:check passes. Read-only shared restricted helper, normalizer, constructor and tests match assignment: empty supplied name derives from label, restricted generated names gain1, blank/unusable labels and reserved/colliding generated names reject without input mutation, obsolete empty-name invalid case removed. Both collision scenarios present. No engine/API rerun, raw metadata decoding, registry/storage or Frappe runtime parity evidence.

Next checkpoint: Continue M1.03 with a DocType definition registry: explain approved-definition lookup, duplicate logical DocType rejection and caller-owned site scoping, inspect reference identity/lookup behavior before assigning code. Current initial normal-DocType/Data constructor/name/label slice checked locally with19 tests. Next registry source/code/commands not assigned. Metadata package must not import engine; no process-global or cross-site shared mutable registry. Raw unknown decoding, module/controller/route checks, full fields/modes/options/permissions and physical storage mapping remain pending; source-order/Unicode parity caveats retained.

Assistant changes documentation only. Latest docs edits postdate passing formatting; no new execution/parity result inferred.
