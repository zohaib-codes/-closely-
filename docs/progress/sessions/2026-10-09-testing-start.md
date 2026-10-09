# L09 testing start — 2026-10-09

Observed: root and API manifests lack Vitest; no Vitest lockfile match. app.ts now returns success: ok; prior verified contract was status: ok. No current runtime/typecheck executed; earlier evidence remains historical.

Explained: automated behavior test catches response contract drift. Vitest is planned runner/assertions (alternative Node runner has fewer dependencies); Vite provides its transformation tooling. Both are root development tools, not API runtime dependencies. Fastify inject will exercise routing without TCP; no server startup/shutdown claim from inject.

Verified read-only from npm registry latest metadata: Vitest 5.0.3 MIT, Node ^22.12 || ^24 || >=26; Vite peer ^6.4 || ^7 || ^8. Vite 8.3.4 MIT, Node ^20.19 || >=22.12. Compatible with declared Node 24. Official Vitest Getting Started, Vite Overview, Fastify Testing and pnpm add docs inspected.

Pending single action: pnpm add --workspace-root --save-dev --save-exact vitest@5.0.3 vite@8.3.4. Explain flags and root manifest/lockfile responsibilities. Await output/warnings. No installation or implementation done by assistant.

Next after install: first health test expecting status: ok should expose current success key; review failure then guide correction. Fits roadmap L09 red/green gate. No parity status change. No project server known running.
