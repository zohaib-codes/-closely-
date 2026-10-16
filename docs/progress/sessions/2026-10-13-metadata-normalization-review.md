# M1.03 — explicit field-name normalization review

Date: 2026-10-13. User implements/runs; assistant reviews read-only.

## Evidence

User-supplied explicit fieldname normalization batch passes with final exit0: root format/lint succeeds, contracts/engine lint-prerequisite builds use cache; uncached metadata typecheck/test/build succeeds with7 tests; final format:check passes. Read-only normalizer/constructor/tests/public entry match assignment: specified punctuation removal and lowercase on copied fields, duplicate check after normalization, then freezing; input names and labels/DocType name remain unchanged, normalization collisions rejected. Normalizer remains internal. No engine/API tests rerun, registry/storage or Frappe runtime parity evidence added.

Read attachment 543952d8-8379-4b73-9244-e1d9aea61ab5/Pasted text.txt and live normalizer/constructor/all7 tests/public entry. Exact supplied-name comparisons have become comparisons after punctuation removal/lowercase. Constructor operates on copies and returns only frozen accepted definitions; collision rejection leaves caller objects unchanged/unfrozen.

## Next lesson

Continue M1.03 with pinned restricted/reserved fieldname validation: distinguish supplied-name restricted checks from post-normalization BaseDocument reserved keys, controller conflicts and autoname DocType exception before choosing implementation. Current explicit-name normalization/collision constructor locally checked with7 tests. Next source/code/commands not yet assigned. Missing-name derivation, grammar/length, DocType name validation, unknown decoding, registry and full fields/modes/options/permissions remain pending.

Tests prove focused local behavior only. No new Frappe fixture/comparison, engine/API rerun, unknown decoder, registry or storage evidence. Labels and logical DocType names are preserved; normalized logical fieldnames are not direct SQL fragments.

Only progress records changed by assistant. Fresh documentation edits postdate the passing formatter; no extra documentation-only check requested. Optional recap is not a gate; independent normalization restatement unassessed.
