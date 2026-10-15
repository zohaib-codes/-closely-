# Teaching correction — 2026-10-13

## Beginner-first architecture teaching — 2026-10-13

User has built simple CRUD websites and explicitly reports that code-led copying plus unfamiliar architecture vocabulary is not producing enough understanding. User accepted the following teaching change; it takes precedence over interpreting faster pacing as more code per reply.

- Begin with a familiar user action and a concrete example from a simple CRUD app. Explain new terms immediately in ordinary words; avoid unexplained phrases such as definition path, record path, composition root or boundary.
- Distinguish implemented behavior from future examples. Guest/user is the current actor representation; administrator in a future example describes permission/responsibility, not a newly implemented actor kind.
- Show the complete small feature journey, then mark existing, missing and connected-to-running-app pieces. Explain architecture as which part does which job and how they cooperate.
- Before naming the next file, explain the problem that makes it necessary, alternatives and why this responsibility belongs there. Show the next few steps and why their order makes sense. Make design decisions visible and invite user participation without quiz gates.
- Explain who actually calls each function. Test-only use is evidence of a working component, not a finished application feature. Do not keep accumulating disconnected helpers without explaining and planning their real use. Prefer a small observable end-to-end behavior when appropriate, preserving full Frappe scope and security requirements.
- Then assign one manageable user-owned edit/check step. Gradually leave small design/implementation decisions to the learner with support. Learning questions remain at session end.
- Current next action: pause new code and explain administrator versus actor kinds, model description versus an individual saved item, and why site/context functions currently have only test callers. Then walk through a familiar customer CRUD flow using actual files and agree on a small visible milestone. Raw metadata decoder is deferred, not removed from scope.

## Evidence

Read-only source search confirms createSiteRegistry and createOperationContext have test callers and public exports but no running API call sites. app.ts exposes /health/live only; server.ts constructs/listens to that API. No code or checks run. Prior passing metadata25/engine26/API8 evidence retained. User site-selection recap correct. Working agreement and current checkpoints updated; new code paused for explanation. No claim that full architecture is understood.

## Actual request walkthrough

Read-only review: server.ts calls createApi then listen; app.ts creates Fastify and registers /health/live. Route registration happens at startup; the handler runs for a matching request. start executes emitted dist/server.js. resolve-request-site.test.ts explicitly adds /__test/site and /__test/context and supplies approved alpha/beta mappings; these routes are absent from normal startup. createSiteRegistry prepares lookup once, registry.resolveHostname performs per-request lookup, resolveRequestSite reads/checks HTTP Host, createOperationContext packages supplied site/actor/id/source without authenticating or authorizing.

Explanation delivered using opening /health/live, then proposed future site-aware request. Proposed next visible milestone: connect a minimal site-aware request in the running API and observe different approved hosts and unknown-host rejection, before adding more disconnected helpers. Exact endpoint/configuration and code not assigned; discuss purpose and scope first. Customer persistence remains later and requires storage/permissions. User understanding not yet assessed. No implementation or check execution.

## Next design lesson: startup settings and a visible request

Explained approved hostname list as server-owner configuration, distinct from request data. Proposed local-only diagnostic route /__debug/site to observe Alpha/Beta/unknown behavior; explicitly a learning/debug aid, not a Frappe compatibility endpoint or permanent product API. Not implemented or approved as a permanent contract. Proposed flow: startup settings -> decodeSiteRegistrations -> createSiteRegistry once -> createApi receives registry; each diagnostic request -> resolveRequestSite -> createOperationContext (Guest) -> small response. Explain reading a JSON configuration file versus hardcoding sample sites and passing dependencies as ordinary function arguments. Exact storage/loading/config mechanism remains to be settled before code. No new files or commands assigned; no implementation or checks run.

Short route ahead: agree visible diagnostic scope and startup configuration; connect settings to app and diagnostic request with focused tests/manual observation; later replace demonstration with real metadata/document behavior. Do not equate server-owner configuration with implemented Administrator permissions or trust Host as authentication.

## Complete usable features first — 2026-10-13

User explicitly replaces the component-first lesson sequence with small complete feature journeys, similar to implementing create/save in a CRUD app across UI, API and database. Every work unit must have a visible outcome and an agreed completion checklist. Build the real storage, startup/request wiring, user interaction and meaningful failure handling needed for that outcome before switching to an unrelated feature. A command is a valid user interaction for a server administration feature; a browser feature includes its actual UI. Do not add disconnected helpers or diagnostic endpoints as substitutes for usable product behavior.

Explain the feature in ordinary language first, trace its full journey, map existing and missing parts, show the short implementation sequence and explain each file at its point of use. User still writes source and runs commands. Tests support the feature and do not replace demonstrating it in the running app. Complete means the agreed behavior works with its required failure cases; it does not mean every future extension of the whole subsystem is finished.

Roadmap lesson IDs remain scope and acceptance references, not a requirement to finish all components in milestone order before connecting a feature. Bring forward only the prerequisites needed for the chosen feature; preserve dependency/security gates, record outstanding scope and do not declare whole milestones or Frappe parity complete. This changes delivery sequence, not adopted architecture or full target scope.

The proposed /__debug/site detour is withdrawn. Proposed first real feature for scoping: create a local site with real PostgreSQL storage, persist its setup and reopen it after restarting the server. Exact command, schema, setup lifecycle and failure acceptance must be designed against pinned evidence before coding; this proposal is not yet an implemented or complete Frappe site lifecycle.

Documentation only. Previous diagnostic proposal superseded. No runtime changes, dependency installs or tests executed.
