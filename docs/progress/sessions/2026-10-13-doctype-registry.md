# M1.03 — DocType registry assignment

Date: 2026-10-13. User implements/runs; assistant teaches/reviews.

## Purpose and research

Read live metadata constructor/type/public entry/package/build configs, engineering dependency structure, M1 roadmap and META-001/002/003 entries. Pinned frappe/model/meta.py get_meta/Meta load behavior reviewed: metadata lookup by logical name with loading/customizations/cache. This lesson supplies a fixed native in-memory snapshot, not upstream Meta/cache/database behavior. No upstream code copied.

One registry captures one supplied collection; each factory call owns a private map. Future engine/composition layer must select a site-owned instance from explicit resolved context. Metadata cannot import engine. Independent registry tests do not establish actual tenant/storage isolation. Exact string keys, unknown_doctype union and native errors are incremental project API; no Frappe case/collation/error parity asserted.

## Assigned

User creates src/doctype-registry.ts:

- DocTypeResolution discriminated union resolved definition or unknown_doctype.
- DocTypeRegistry exposes resolveDocType(name:unknown).
- factory accepts typed definition array, calls createDocTypeDefinition for admitted copies, rejects duplicate logical names with DUPLICATE_DOCTYPE_NAME, stores private Map and returns frozen method object.
- lookup requires valid logical DocType name, gets exact name and returns union.

No global state, mutable registration API, lazy loading, database/cache, HTTP codes or fallback model. Private map construction may fail, but object published only after every definition passes. Existing constructor only validates its current slice; raw types/flags/module ownership/full schema remain incomplete. Revalidation inherits known raw restricted-name source-order caveat; do not call this complete Frappe admission.

Public index exports factory and2 types. Internal normalizer/validators remain unexported. No installation/config/new consumer.

Six registry tests: known two-model lookup and normalized definition; valid unknown/empty registry plus malformed identifier; duplicate logical registration; invalid definition admission; copied input and frozen output; independent instances including same model with different fields and no fallback.

Run root format/lint, uncached metadata typecheck/test/build, final format:check and exit status. Expected25 tests (constructor19 plus registry6), not observed. User source/output pending.

## Remaining

Engine site selection, real two-site isolation, unknown metadata decoder/runtime flags, module/controller/route checks, full field/mode/options/permissions/customization and storage remain pending. No product parity claim. Assistant updates documentation only; latest formatting unverified.

## Verification received

User DocType registry batch passes with final exit0: root format/lint succeeds with cached contracts/engine builds; uncached metadata typecheck/test/build succeeds with25 tests (constructor19, registry6); final format:check passes. Read-only registry/tests/public index and emitted JS/declarations match assignment. Covers normalized known lookup, exact-case unknown/malformed distinction, duplicate model rejection, constructor validation during admission, frozen snapshot ownership and independent collections/no fallback. No engine metadata dependency/consumer, actual site integration/isolation, registry cache/database or Frappe runtime parity checked.

Engine manifest and permitted dependency tags inspected; no consumer exists. Next checkpoint: Continue M1.03 with engine consumption of public @closely/metadata and explicit site-owned definition registry selection. Explain site binding ownership, no fallback/cross-site lookup and emitted-declaration/build ordering before assigning source/package changes and behavioral tests. Current metadata constructor/registry slice locally checked with25 tests. Engine manifest has no metadata dependency yet; existing engine boundary already allows metadata. Next code/commands unassigned. Raw unknown decoding/runtime flags, module/controller/route checks, full fields/modes/options/permissions/cache/storage and real tenant isolation remain pending.

Current/HANDOFF rewritten compactly to remove superseded pending/type-only summaries. Assistant modified only documentation; new docs edits postdate passing formatter.
