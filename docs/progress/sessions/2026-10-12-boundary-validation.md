# M1.02 — fixed configuration boundary

Date: 2026-10-12. User implements/runs; assistant explains/reviews read-only.

## Prior evidence

Initial context factory checked with user-supplied engine16/API8 tests, uncached checks/root lint/format and exit0. Copy/freeze and trusted authentication recap demonstrated.

## Choice and explanation

Use existing site registration shape as the first concrete unknown-input decoder. Future server-owned configuration parsing supplies unknown; decoder checks exact own enumerable keys hostname/site and nested siteName, strings without coercion and nonblank siteName. Rebuild only allowed data. Registry owns hostname grammar/normalization and duplicate rejection. No arbitrary JSON is cast to SiteRegistration[]. No HTTP registration endpoint or filesystem loader. Approval/provenance remain server responsibility; valid shape is not trusted origin.

Fixed contracts have authored keys; later DocType document fields are determined by resolved, validated site metadata. Do not forbid every dynamic field using a hardcoded document object shape. This narrow hand-written decoder teaches checks/narrowing; planned TypeBox/Ajv schema tooling for HTTP/contracts remains unchanged. Strict unknown-key rejection is initial project configuration policy, not Frappe parsing parity. No core tenant/auth contract change requiring a new ADR.

Official reading: TypeScript narrowing (typeof/type predicates), JavaScript Array.isArray and Object.hasOwn. No dependency installation.

## Assigned, not completed

M1.02 fixed configuration decoder chunk assigned: user creates packages/engine/src/decode-site-registrations.ts and its test, exports decodeSiteRegistrations through index.ts, and updates apps/api/src/engine-public-entry.test.ts to consume unknown configuration through decoder then registry. Strict own-key shape hostname/site/siteName, no coercion, nonblank site name, independent copies; registry retains hostname grammar/normalization/duplicate ownership. Server-owned JSON-like configuration only; no request-controlled registrations or file loader. User runs root format/lint, uncached engine/API typecheck/test/build and format:check with explicit exit status. Source/output pending.

Engine tests cover valid+empty input, malformed outer/entry/nested/string input, unknown/inherited fields, caller mutation and composition with registry rules. API public consumer uses unknown config -> decoder -> registry. Expected results await user evidence. No assistant source/config/test edits or check execution. Questions at coding-session end.

## Implementation and verification

User decoder batch passes with explicit exit0: root format/lint, uncached engine/API typecheck/test/build, engine21 tests (5 decoder,5 context,4 hostname,7 registry), API8 tests and final format:check. Read-only decoder/tests/public export/consumer review matches assigned chunk. Cases verify malformed shapes/types, extra/inherited fields, independent copied values and registry hostname/duplicate rules. Public consumer composes unknown config -> decoder -> registry. No production config loader, provisioning, authentication, database isolation or Frappe parity established.

Initial M1.02 fixed configuration decoder is locally checked. End-of-session recap covers why casting unknown is insufficient and why hostname semantics remain in registry; user answers pending, never a quiz gate. Next coding lesson M1.03: DocType/DocField definitions and metadata registry, starting with pinned reference shape, logical/reserved-name rules and one minimal user-owned metadata slice. Read relevant engineering and feature evidence before assigning source. No metadata source/dependency/check commands assigned yet; planned TypeBox/Ajv HTTP contracts and dynamic DocType validation remain pending.

Assistant updated documentation only. New documentation edits postdate the passing formatter; no new formatting/CI execution inferred.

## Decoder learning recap

User correctly explains that input as SiteRegistration[] asks TypeScript to trust a type without runtime validation, and that hostname normalization/duplicate rejection belong to registry domain rules beyond structural validation. Assistant clarifies registry rules apply to every caller, including already-typed callers. Decoder/runtime versus domain-policy responsibility recap demonstrated.

Next is M1.03; no metadata code/check chunk assigned yet. No new checks executed.
