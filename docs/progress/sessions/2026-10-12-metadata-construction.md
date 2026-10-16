# M1.03 — immutable metadata construction assignment

Date: 2026-10-12. User writes implementation and runs commands; assistant reviews read-only and maintains teaching documents.

## Resume evidence

Read AGENTS.md, START-HERE.md, HANDOFF.md, WORKING-AGREEMENT.md, CURRENT.md/state.json, ROADMAP.md, engineering handbook/data/structure/coding documents and META-001/002/003 entries. Live metadata inventory contains only doctype-definition.ts and index.ts. Types, package scripts and compiler configurations match the recorded type-only checkpoint. Last metadata check batch remains prior user-supplied evidence; no checks rerun. Git HEAD remains d383b295bdf8bdfa502ee39909c6c5f1ddb6f447; existing modified/untracked work retained.

## Research and teaching

Pinned Frappe6b450a166e076dd842e4db7ea0843f62881e62ac DocType controller separates validate_name, scrub_field_names and validate_fields. Explicit field names and label-generated names have different handling; restricted fields, BaseDocument reserved keys/controller properties and post-normalization duplicates require separate coverage. Model default/child names reviewed. Source inspection is not a runtime fixture or parity result. Logical names retain display identity; storage identifiers must later be resolved independently by validated registry/adapter rules. No naming policy or upstream code copied into product in this increment.

References: [pinned controller](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/core/doctype/doctype/doctype.py), [reserved keys](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/model/base_document.py), [model system fields](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/model/__init__.py).

One manageable coding increment: immutable construction and behavioral tests, then naming validation before registry admission. No M1.03 gate removed. Explain type versus actual definition versus document values, readonly versus runtime freeze, shallow freezing and explicit copying; reuses existing tools without dependencies. Relevant reading: TypeScript Object Types readonly/ReadonlyArray, satisfies operator documentation, MDN Object.freeze Description/Deep freezing and existing Vitest guide.

## Assigned user action

Create packages/metadata/src/create-doctype-definition.ts: typed constructor copies the supported name/module/field properties and freezes each field, ordered array and outer object. Add factory to public src/index.ts, add package test script vitest run src, create create-doctype-definition.test.ts. Tests preserve logical names/field order/flags, isolate output from caller mutations and reject runtime writes to frozen output while caller remains mutable. Sample model exists only in tests; no production model/table/form.

User runs root format/lint, uncached metadata typecheck/test/build and final format:check with explicit exit status. No install required. Typed input is not an unknown boundary decoder; this increment does not normalize/validate names or reserved/duplicate identifiers and must not be treated as registry-ready metadata. Naming rules, registry, full fields/modes/options/permissions and storage remain pending. No API/engine consumer introduced.

## Status and next lesson

Explained/assigned only. No user edits or supplied results yet; no new checks executed by assistant. Review actual files/output next, then add reference-backed naming validation before registry admission. Learning questions remain at coding-session end; no quiz gate. Assistant modified only state.json, CURRENT.md, HANDOFF.md and this session note; latest documentation formatting remains unchecked.

## First implementation review and lint correction

User supplied first metadata construction batch: workspace install up-to-date, root formatting succeeds; lint prerequisites use two cached dependency builds and Nx discovers five named projects; ESLint fails once at test line69 with no-unsafe-return for any[] from Array.prototype.reverse.call, final exit1. Chained metadata typecheck/test/build and final format:check did not run. Read-only factory/tests/public export/package script review matches assigned chunk. Correction assigned; no runtime metadata pass claimed.

The original assistant-supplied assertion returns an unsafe any[] through the Array prototype. Assigned replacement uses Object.assign on the fields array length; frozen length is non-writable and must throw TypeError. It avoids the unsafe prototype result while retaining array-mutation coverage. User correction and full rerun pending. Only documentation changed by assistant; no implementation edits or checks executed.

## Correction verified

User supplied metadata construction correction batch passes with explicit exit0: root formatting/lint succeeds, lint dependency builds are cached, five named Nx projects discovered; uncached metadata typecheck/test/build succeeds with3 tests; final format:check passes. Read-only constructor/tests/public export/test script and emitted factory declaration match assignment, including Object.assign array-length correction. No engine/API tests rerun, metadata consumer integration, naming validation, registry or Frappe parity established.

Current checkpoint: Continue M1.03 with reference-backed DocType/DocField naming validation, reserved/restricted names and duplicate detection before registry admission. Immutable typed constructor is locally checked with3 tests; naming-validator code/commands not assigned yet. Explain explicit field names versus label-generated names and logical versus storage identity. Raw JSON decoding, registry and full fields/modes/options/permissions remain pending. Optional construction recap questions at session end are pending, not an advancement gate.

Progress summaries refreshed to remove superseded pending-correction/type-only status. Latest documentation edits postdate the passing formatter; no extra check requested solely for documentation.

## Construction recap clarification

User construction recap: correctly states freezing prevents later changes and validation checks expected input. Corrections needed: copying creates independence from caller-owned input; freezing protects the returned snapshot, and freezing is shallow. Current constructor accepts reserved name and duplicate fieldnames because no naming validation exists. Clarification delivered; independent corrected restatement not yet assessed. Continue naming validation alongside code, no quiz gate.
