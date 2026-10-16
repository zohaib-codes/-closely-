# Requested chat handoff — site resolution to operation context

Date: 2026-10-12. User explicitly requested handoff after answering HTTP-boundary recap. Assistant changed teaching/progress docs only.

## Last confirmed work and evidence

User Host-adapter correction batch passed with explicit exit0: root lint/format, uncached engine+API typecheck/test/build, engine11/API7 tests and final format:check. Read-only app.ts confirms boolean trustProxy:false. Five adapter tests now pass: two-site host selection ignoring overrides, unknown-host404, malformed-authority400 with no success marker, site-independent liveness, and direct unexpected registry failure propagation. Prior source/test review retained. Tests use an injected test-only route; no shipped tenant route, authentication/database isolation, native unknown-error serializer or Frappe routing parity verified.

Last output attachment: /home/zabii/.codex/attachments/fdc671f4-6dc9-4253-b215-2583b9c72925/Pasted text.txt. Supplied output has explicit0, engine11/API7 pass and uncached typecheck/build. Prior source/test review plus current app.ts/index/context review retained. No assistant implementation/check execution.

Read-only Git status reports modified/untracked implementation/config/lockfile/progress files. HEAD d383b295bdf8bdfa502ee39909c6c5f1ddb6f447 unchanged; last remote CI38146717183 belongs to that older SHA. New work uncommitted and not remotely verified. No service inventory/cleanup performed.

## Explained versus demonstrated understanding

User demonstrated registry/hostname/public-entry design reasons: reject ambiguous duplicates, snapshot siteName strings, normalize equivalent hostname spellings before duplicate detection, distinguish malformed from unregistered hostnames, use the public package entry, and build declarations before typed lint. Latest answers correctly explain ignored forwarding/site-override headers as preventing unauthorized routing overrides and unexpected registry failures as server problems requiring500 rather than400. Clarification: even direct Host is untrusted; registration selects a site, not an authenticated actor or permission grant. Current failure test proves rethrowing only, not complete HTTP500 serialization/redaction. Authentication and independent site-versus-source understanding remain unconfirmed.

Host is not authentication. Approved-domain mapping prevents arbitrary tenant-resource selection; actor permissions are still required. Unexpected500 policy is understood by the user; current direct failure test only demonstrates propagation, not safe HTTP serialization. Previous ambiguous site-versus-source wording not treated as independently resolved. No new quiz gate.

## Next single lesson

Resume M1.01 explicit operation-context construction. Read startup/checkpoint/agreement, current state and ROADMAP; inspect existing context types, public exports and request-site adapter/test fixture. Explain how the resolved site, explicitly supplied actor, operation/request ID and source travel together through engine calls. Review runtime validation/immutability needs, then supply one coherent user-owned factory/test chunk with per-request context checks using the existing test-only fixture. Guest is an explicit unauthenticated actor; never accept authenticated identity from hostname/body/header. No factory source or commands assigned yet. Do not repeat completed registry/hostname/public-entry/Host checks or require recap answers before coding.

No operation-context factory code has been supplied or created. Context types already exist and must not be recreated. No unsupplied output remains for the last assigned batch. Later native serializer/auth/IDNA/IPv6/HTTP2/raw socket headers/provisioning/storage/parity remain pending. M1 not complete; product feature statuses unchanged.

## Documentation checkpoint

HANDOFF.md and CURRENT.md compacted; state.json records latest recap/evidence/pending lesson and this session. NEW-CHAT-PROMPT.md reusable startup retained with current checkpoint note. Older detailed sessions retained:2026-10-11-site-registry.md,2026-10-12-engine-public-entry.md,2026-10-12-http-site-resolution.md. Handoff source/config inspection read-only; implementation unmodified. Newest docs postdate passing format check. Preserve all changes, do not run checks or make a docs-only commit on user's behalf.
