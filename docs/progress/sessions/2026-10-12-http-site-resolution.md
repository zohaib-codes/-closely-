# M1.01 — Direct HTTP Host to approved site

Date: 2026-10-12. User owns implementation and execution.

## Starting evidence

Previous public entry/consumer batch passed supplied root lint/format and uncached engine11/API2 tests/typecheck/build with exit0. User correctly explained public entry and declaration build dependencies. Live createApi only registers process liveness; server creates it without tenant config. Approved registry is not yet used by a production HTTP route. OPS-001 remains not_started; provisioning/recovery and actual database isolation are unimplemented.

## Assigned chunk

API Host adapter chunk assigned: user creates apps/api/src/resolve-request-site.ts with Pick<FastifyRequest,"headers"> input, bounded direct Host authority validation (ASCII hostname plus optional decimal port1–65535), RequestSiteError codes INVALID_HOST400/UNKNOWN_SITE404, approved registry lookup and selective invalid-hostname translation with unexpected errors rethrown. Explicit trustProxy:false in createApi. Add resolve-request-site.test.ts using a test-only /__test/site route for two-site requests, ignored forwarding/site-override headers, unknown/malformed hosts, independent liveness and unexpected failure propagation. No production tenant route or server registry config assigned. Run format/lint and uncached engine+API typecheck/test/build, format:check; output/exit pending.

## Explained choices and evidence limits

Installed Fastify5.12.5 request.js inspected read-only: hostname getter preserves bracketed IPv6 but otherwise splits host on colon without validating the entire authority. Current official Fastify latest docs identify v5.12.5 and explain host/hostname/port untrusted metadata and trustProxy forwarding behavior. Read Request, Server trustProxy, Reply Errors, Testing inject and TypeScript Pick docs. No new library required.

Adapter reads direct request.headers.host and accepts unknown at its value boundary. Initial authority grammar permits the existing ASCII hostname grammar plus optional1–5 digit port1–65535, ignores port for site identity, rejects other characters/multiple colons/empty suffix and bounds input at260 characters. Input normalization stays in engine; no source/deep imports. Forwarded and X-Frappe-Site-Name headers are not authorities in this native policy. HTTP/2 :authority, duplicate raw headers/socket parser behavior, IPv6 and IDNA support remain pending rather than silently removed from scope.

RequestSiteError is API-specific: stable safe code/message and statusCode are used by current Fastify error handling. It does not replace the planned centralized domain errors/RFC9457 native serializer or Frappe compatibility adapters. Only known INVALID_SITE_HOSTNAME is translated; unexpected registry failure remains thrown. Normal unknown-site result is converted to native404. No host/site name is echoed in errors. Unknown-error response redaction is not claimed by this adapter; full serialization remains pending.

Tests wire the real createApi plus real registry to a route registered only in the test file. Route resolves before reaching its success marker and returns site identity solely to observe test behavior; no diagnostic tenant endpoint is shipped. Independent liveness stays unchanged. Promise.all tests two concurrent injected requests at routing/context level only, not socket/database concurrency. Unexpected dependency failure test is a direct adapter probe; no real persistence or Frappe routing parity established.

Expected new5 tests, for API7 total plus engine11, green checks/exit0. User has not reported implementation/output yet; no assistant runtime edits or commands. Updated docs are not formatter-checked.

## First adapter run — proxy option string/boolean mismatch

User first Host-adapter batch: root format/lint passes; uncached engine11 tests and engine/API typecheck/build pass; API2 tests pass and5 fail, final exit1. All HTTP/liveness tests fail during createApi before adapter execution because live app.ts has trustProxy:"false" (string). Fastify interprets it as a trusted proxy address and rejects invalid IP address:false. Read-only adapter/tests otherwise match assigned chunk. Final format:check skipped. No successful new HTTP host-resolution evidence yet.

User correction: in apps/api/src/app.ts change trustProxy:"false" to trustProxy:false (boolean, no quotes). Both string and boolean are valid Fastify option types because strings express proxy addresses; typecheck cannot reject this particular wrong value. Then run root format/lint, uncached engine+API typecheck/test/build and format:check; supply complete output/exit. Expected engine11/API7 pass. No other source/test/install change assigned.

Explained boolean false versus string "false", proxy string/address semantics, and why a union accepting strings allows this to pass typecheck while failing runtime configuration. No assistant runtime edit or execution. Documentation update is not formatter-checked.

## Boolean correction passes — HTTP adapter locally checked

User Host-adapter correction batch passed with explicit exit0: root lint/format, uncached engine+API typecheck/test/build, engine11/API7 tests and final format:check. Read-only app.ts confirms boolean trustProxy:false. Five adapter tests now pass: two-site host selection ignoring overrides, unknown-host404, malformed-authority400 with no success marker, site-independent liveness, and direct unexpected registry failure propagation. Prior source/test review retained. Tests use an injected test-only route; no shipped tenant route, authentication/database isolation, native unknown-error serializer or Frappe routing parity verified.

Next M1.01 working chunk: build an explicit operation context from the resolved site, an explicitly supplied actor, operation/request ID and source, then exercise per-request context through the test-only HTTP fixture. Explain Guest actor as an explicit unauthenticated state; do not infer authentication from hostname or request body. Review runtime context-validation requirements before supplying one small user-owned factory/test chunk. No new source/commands assigned yet. Native unknown-error redaction, full transport serializer, auth, tenant provisioning/storage and Unicode/IDNA remain pending; no M1 exit or parity claim.

Optional recap prompts: why forwarding/site-override headers cannot select a site in this setup; why unexpected registry failure must not become400. Answers not supplied yet; no gate. Error stacks in supplied output are server-side logs; no complete error-redaction/serialization audit inferred. Newest documentation formatter evidence pending; no assistant implementation/check execution.

## HTTP recap reviewed and chat switch requested

User demonstrated registry/hostname/public-entry design reasons: reject ambiguous duplicates, snapshot siteName strings, normalize equivalent hostname spellings before duplicate detection, distinguish malformed from unregistered hostnames, use the public package entry, and build declarations before typed lint. Latest answers correctly explain ignored forwarding/site-override headers as preventing unauthorized routing overrides and unexpected registry failures as server problems requiring500 rather than400. Clarification: even direct Host is untrusted; registration selects a site, not an authenticated actor or permission grant. Current failure test proves rethrowing only, not complete HTTP500 serialization/redaction. Authentication and independent site-versus-source understanding remain unconfirmed.

Compact checkpoint refreshed; latest note is 2026-10-12-chat-handoff.md. Next remains explicit operation-context factory/testing, not yet assigned.
