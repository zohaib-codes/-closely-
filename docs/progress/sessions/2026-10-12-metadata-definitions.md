# M1.03 — metadata package and initial definition types

Date: 2026-10-12. User implements/runs; assistant teaches/reviews read-only.

## Prior checkpoint

Decoder checked with supplied engine21/API8 batch and explicit0. User demonstrated cast-versus-runtime-validation and registry-domain responsibility recap.

## Reference and responsibility

Reviewed engineering handbook/data/structure/coding rules, META-001/002/003 entries, current Nx/ESLint/compiler/workspace configuration and retained DocField metadata. Read pinned Frappe6b450a166e076dd842e4db7ea0843f62881e62ac doctype.py (scrub_field_names, validate_name) and model/**init**.py; official DocType overview explains model metadata versus record data. Source inspection is not runtime parity. No upstream implementation copied into product.

Create metadata package at agreed architecture location. Metadata defines model facts; engine owns document validation/lifecycle/permission policy, database interprets validated metadata for storage, Desk will render permitted metadata. Metadata must not import engine, Fastify, React or ERP. Use existing TypeScript/Nx/pnpm tools, no new runtime dependency.

Initial contract is a deliberately partial internal normal-DocType/Data-field slice: name/module/ordered fields, fieldname/fieldtype/label plus reqd/read_only/unique booleans. Booleans are normalized internal representation of flag meaning, not acceptance of upstream numeric wire flags. No raw Frappe JSON decoder yet. Literal Data support is explicit rather than accepting arbitrary string field types. All other field types, modes, options/defaults, permissions, normalizers/reserved-name validators and registry remain planned. No source behavior or complete META feature claimed.

## Assigned

M1.03 first package/type chunk assigned: user creates packages/metadata/package.json, tsconfig.json, tsconfig.build.json, src/doctype-definition.ts and src/index.ts; adds metadata-only dependency constraint to eslint.config.mjs. @closely/metadata uses scope:platform/type:metadata/runtime:server, public dist entry and existing root compiler tools. Initial normalized internal types describe a normal DocType and Data-only fields with explicit boolean flags; no runtime normalization/validation/registry yet. User runs pnpm install, root format/lint, uncached metadata typecheck/build and format:check with exit status. No new third-party dependency or engine consumer yet. Source/check output pending.

Checks are package discovery through root lint plus metadata typecheck/build and final formatting. No runtime tests assigned for type-only exports; runtime behavior and tests are next. Expected outcomes are not observed outcomes. Session questions at end, not a gate. Progress docs changed only.

## Clarification and verification

User asked whether these definitions are the types of DocType/DocField. Explained three layers: compiler contract, actual model metadata object, actual document record; no working Customer/table/form exists from types alone. Independent restatement not assessed.

User metadata package/type batch passes with explicit exit0: pnpm12.10.1 install recognizes6 workspace projects including root; root format/lint succeeds and Nx discovers5 named projects including @closely/metadata; uncached metadata typecheck/build and final format:check pass. Read-only manifests/configs/types/public entry/ESLint constraint and emitted declarations match assigned chunk. No new runtime behavior or tests, no engine metadata consumer or negative metadata dependency probe executed; prior engine21/API8 evidence remains historical, not rerun in this batch.

Continue M1.03 with actual normal-DocType/Data-field definition construction and behavioral tests: inspect pinned name/field normalization, restricted/reserved names and duplicate behavior before selecting validation policy; explain logical metadata names versus storage identifiers and approved adaptations. Initial metadata package/types are locally checked; types-only layer has no runtime validation/registry. No constructor/registry source or commands assigned yet. Full field catalog/modes/options/permissions and raw Frappe JSON decoding remain pending.

Only documentation edited by assistant. New documentation edits postdate passing formatter; no new test or remote CI result inferred.
