# M1.01 — Site registry lesson assigned

Date: 2026-10-11. User owns implementation and command execution.

## Reviewed

Read AGENTS.md, startup/checkpoint/current/manual state, working agreement, roadmap, handbook, project structure, data/tenancy and coding conventions. Inspected live engine manifest/config/context, API test/build conventions, root tooling/boundary rules and CI definition. Engine source contains only operation-context.ts. Existing progress changes retained; no implementation commands or fresh checks executed.

## Explained and assigned

Resume M1.01 with two separate sites using the same framework. Resolve an approved hostname before tenant access; actor identifies who and source identifies the entry point. A site can contain multiple ERP Company records; site is the isolation boundary, not an ERP Company identifier.

Small user-owned chunk: site-registry.ts builds a private Map from trusted canonical hostname/site registrations, copies siteName strings, rejects duplicate hostname registration and returns a discriminated resolved/unknown_site result with a fresh context. Tests cover two registered sites, an unknown hostname, duplicates and independence from later input mutation. This is a project implementation choice within accepted explicit context/registry architecture. Exact lookup assumes canonical input; normalization and external unknown validation are deferred to boundary work.

Add engine test script using existing root Vitest and a build config excluding tests; retain typecheck coverage of tests. Registry remains internal until public export/API integration. No dependency installation assigned.

Official reading supplied: Frappe Sites for isolation terminology; TypeScript readonly properties/ReadonlyArray and discriminated unions; JavaScript Map get/set/has; Vitest toEqual/toThrow. Live Frappe docs explain terminology only. Pinned frappe-app.py init_request inspected: site resolution precedes configuration/database connection, with upstream override/header paths. No hostname failure fixture exists; no exact Frappe routing parity or error envelope claimed.

## Pending user action and evidence

Create packages/engine/src/site-registry.ts and site-registry.test.ts; add packages/engine/tsconfig.build.json excluding src/**/*.test.ts; update package scripts test/build. Run root format, lint, uncached engine typecheck/test/build, then format:check and supply complete output plus exit status.

User has not reported edits or checks for this chunk. Last confirmed implementation remains commit d383b29 and its previously recorded exact-SHA CI success. No mastery or parity status advanced. Review user files/output before dependent work. Authentication, HTTP wiring, host parsing/trusted proxy policy, provisioning/lifecycle state, storage and actual two-site database isolation remain pending. OPS-001 and all other product parity statuses unchanged.

Progress summaries and state updated by assistant only; no fresh post-document formatting evidence. Save learning questions for the end of the coding session.

## 2026-10-12 — First implementation reviewed; typecheck correction pending

User supplied first registry batch: install up-to-date, root formatting and lint succeed, uncached engine build succeeds and all4 registry tests pass; engine typecheck fails with20 missing Node-global errors in Vitest/Vite/tinybench declarations, final exit1. Final format:check was skipped by &&. Read-only registry/test/manifest/build-config review matches assigned implementation. Engine tsconfig types:[] omits Node ambient globals needed by test tooling; installed @types/node24.19.1 defines Event/EventTarget/AbortSignal/WebSocket. Correction assigned, not implemented or verified.

Assistant lesson omitted the test-tooling Node ambient types correction. Explained types versus lib and test compilation versus production compilation. No source/config correction performed by assistant.

Correct test-tooling ambient types: user changes packages/engine/tsconfig.json types to ["node"], and adds compilerOptions.types:[] in packages/engine/tsconfig.build.json to retain the production ambient restriction while excluding tests. Run root format/lint, uncached engine typecheck/test/build, format:check and supply output/exit status. Four registry tests and engine build passed previously; corrected typecheck and complete green batch remain pending. No install, HTTP wiring or parity claim.

Progress updated only; new documentation formatting has not been checked. Last remote CI remains d383b29 and does not cover registry work.

## 2026-10-12 — Correction passes; local registry slice checked

User correction batch passed with explicit exit0: root format/lint, uncached engine typecheck/test/build, all4 registry tests, and final format:check. Read-only configs confirm types:["node"] for source/test checking and build override types:[] with test exclusion. Registry source reviewed previously matches the lesson. Local registry slice is checked; no new commit/remote CI or HTTP/database/Frappe parity evidence.

Next M1.01/M1.02 boundary lesson: explain why typed hostname strings do not validate external input, then define the supported hostname grammar and canonicalization policy before supplying one focused user-owned validation/test chunk. Keep pure registry lookup separate from HTTP Host/port/proxy parsing. Registry public exports and API wiring follow boundary work. No new implementation chunk assigned yet; optional session recap is not an advancement gate.

End-of-chunk recap prompts: why reject duplicate hostnames; why copy siteName strings rather than retain the supplied site object? Answers not yet supplied; understanding unconfirmed. No quiz gate. Documentation updates follow the passing formatter and have not been rechecked.

## 2026-10-12 — Registry recap answers reviewed

User correctly explains duplicate rejection as preventing ambiguous configuration and catching mistakes instead of silent overwrite. User correctly explains copying siteName as keeping registry state simple and preventing later mutation of the original site object from changing lookups. These two registry design reasons are demonstrated in the user answers; broader hostname validation, authentication and site/source understanding are not inferred.

No implementation/check evidence changed. Next remains hostname boundary validation; no new code assigned in this recap reply. Progress documentation edits are not yet formatter-checked.

## 2026-10-12 — Hostname boundary chunk assigned

Hostname boundary chunk assigned: user adds packages/engine/src/site-hostname.ts and site-hostname.test.ts; normalizeSiteHostname accepts unknown, validates ASCII hostname labels/length, lowercases and removes one terminal root dot, throws INVALID_SITE_HOSTNAME for malformed input. User applies the same helper to registration and lookup in site-registry.ts, changes resolveHostname input to unknown, adds normalization/duplicate/invalid-vs-unknown integration tests, and changes engine test script to vitest run src. Run root format/lint, uncached engine typecheck/test/build and format:check; output/exit pending. This incremental grammar is not full URL/HTTP Host/IP/IDNA parsing or Frappe parity; Unicode/IDNA, trusted proxy policy and HTTP serialization remain pending.

Explained runtime unknown narrowing, ASCII labels of1–63 characters with alphanumeric ends and internal hyphens, total canonical length up to253, ASCII case folding and one terminal root-dot removal. localhost/single labels permitted; no IP-address classification or IDNA validation promised. No trim or general URL parsing. Constructor and lookup share normalization; duplicates checked after normalization. Malformed input throws a stable error code, while a valid unregistered hostname returns unknown_site. Future transport adapter owns status/envelope translation. Tests cover hostile/non-string shapes, valid/case/root-dot behavior, label/total-length edges and normalized duplicate rejection. Use RFC1035 preferred syntax plus RFC1123 leading-digit allowance as terminology/grammar basis, not exact Frappe behavior. Full international-domain support is pending rather than removed from scope. Official TS typeof narrowing reading supplied. No runtime implementation by assistant.

## 2026-10-12 — Hostname boundary chunk checked

User hostname-boundary batch passed with explicit exit0: root format/lint, uncached engine typecheck/test/build, 11 tests across hostname4/registry7, and final format:check. Read-only source review confirms unknown input checking, bounded ASCII label validation, shared lowercase/root-dot normalization before duplicate detection and lookup, malformed input throwing INVALID_SITE_HOSTNAME, and valid unregistered names returning unknown_site. No fresh remote CI/HTTP/database/Frappe routing parity evidence.

Next user-owned chunk: expose the checked site-registry factory/types and operation-context types through an engine public entry point, update package exports, then check public consumer resolution before API wiring. Explain package entry point versus internal modules and keep dependency direction intact. No code or commands assigned for that chunk yet. Host authority/port/proxy parsing, Unicode/IDNA, authentication, site lifecycle/provisioning and real tenant storage remain pending; no M1 completion or OPS-001 parity claim.

Optional recap prompts: why normalize before duplicate detection; difference between malformed hostname and valid-but-unregistered hostname. Answers not yet supplied; no quiz gate. Newest progress documentation edits postdate formatter result. No implementation commands run by assistant.

## 2026-10-12 — Hostname recap answers reviewed

User correctly explains that normalization precedes duplicate detection so equivalent hostnames such as GOOGLE.COM and google.com share one key. User correctly distinguishes malformed input violating hostname grammar from a valid hostname absent from the registry. These two hostname-boundary concepts are demonstrated by the user answers; HTTP parsing/serialization, IDNA and authentication understanding are not inferred.

No implementation or execution evidence changed. Next remains the public engine entry point; no new implementation chunk assigned in this recap. Newest documentation formatting unchecked.
