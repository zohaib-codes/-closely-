# Project structure and dependency rules

The structure adapts Twenty's separation of server, frontend, shared code, UI, SDK, and E2E work while retaining Frappe's platform/app separation. Directory names below are our TS translation, not upstream directory names.

```text
apps/
  api/                 Fastify composition root and HTTP adapters
  desk/                React application and feature screens
  worker/              BullMQ job consumers and outbox dispatch
  scheduler/           Site-aware scheduled-task dispatch
  script-runner/       Restricted site-script execution service
  cli/                 Site/app/admin commands
business-apps/
  erp/                 Future ERP consumer; no framework imports from here
packages/
  contracts/           Wire schemas, safe DTOs, public codes; browser-safe
  metadata/            DocType definitions, normalization, registry
  engine/              Document lifecycle, policy, app runtime
  database/            PostgreSQL repositories, transactions, migration executor
  auth/                Sessions, credentials, login providers
  infrastructure/      Redis, queues, object storage, email adapters
  sdk/                 Public TypeScript app and browser SDKs, separate exports
  ui/                  Accessible reusable visual components
  field-controls/      Metadata-driven field renderers
  testing/             Factories, site fixtures, database harness
tools/                 Code generation and boundary-check tooling
infra/                 Compose, Docker, proxy, telemetry, backup config
docs/                  Engineering, ADRs, parity and research
tests/
  contract/            HTTP/SDK compatibility
  parity/              Reference fixture comparisons
  e2e/                 Desk, website and portal workflows
  recovery/            Migration, restore and crash scenarios
```

This is the agreed target tree, not a claim that empty application packages are implemented. Create packages when their responsibility is first implemented.

## Dependency direction

`contracts` has no server/browser-specific runtime dependency. `metadata` may depend on contracts and validation primitives. `engine` may depend on metadata/contracts and owns interfaces for persistence, delivery, and app callbacks. `database`, `auth`, and `infrastructure` implement those interfaces. Composition roots wire implementations explicitly.

UI/field-controls depend on browser-safe contracts/SDK exports, never engine/database. ERP depends on public server SDK exports, never engine internals. Engine never depends on ERP. Browser bundles must not import Node, database drivers, secrets, or server SDK exports.

Use Nx tags (`scope:platform`, `scope:erp`, `type:contract`, `type:engine`, `type:adapter`, `type:ui`, `type:app`, `runtime:browser`, `runtime:server`) and ESLint boundary rules to enforce this graph during scaffolding. No deep imports across packages; public exports define the dependency surface.

## Initial engine public entry

Implemented M1.01 package surface: @closely/engine root entry explicitly re-exports operation context types, createOperationContext, decodeSiteRegistrations, createSiteRegistry and its registration/registry/resolution types through src/index.ts, with package exports targeting emitted dist/index.js and dist/index.d.ts. Hostname normalization stays internal. API declares a workspace runtime dependency on engine and consumes its public name; no deep source/dist imports across packages. Consumer test/check evidence is recorded in progress, not inferred from this design.

Typed ESLint also needs emitted public library declarations. The root lint script builds contracts/metadata/engine/database before ESLint so the same ordering works locally and in CI. Tests that import emitted dependency entry points need dependency builds first; Nx test ordering is ^build, matching existing typecheck/build ordering. User-supplied local checks on 2026-10-12 pass with engine11/API2 tests and exit0; root script and emitted public entry reviewed read-only. This is a package integration check, not HTTP/permission/database isolation evidence.

## Initial metadata package

@closely/metadata implements an initial normal-DocType/Data-field internal contract, immutable construction, explicit/label-derived field normalization, logical name grammar/length and restricted/reserved/duplicate checks. User-supplied local metadata19-test/typecheck/build/root lint/format batch passes on2026-10-13; progress records contain evidence and caveats. Boolean flags are normalized internal representation; raw JSON/runtime flag decoding, full fields/modes/options/permissions, module/controller/route checks and physical storage remain pending.

A fixed DocType registry is locally checked with user-supplied25 metadata tests/typecheck/build/root lint/format and exit0 on2026-10-13: one private map per supplied collection, constructor-checked snapshots, exact logical-name duplicate rejection and explicit lookup result. Public package exposes factory/types; helpers remain internal. Engine selects the proper site-owned registry from explicit operation context through createSiteMetadataRegistry; metadata does not import engine. Independent instances alone do not prove site isolation.

Package tags scope:platform/type:metadata/runtime:server; internal dependency rule allows contracts only and bans Fastify/React. Constraint reviewed but not independently negative-probed. Engine consumes the public metadata package; production request wiring remains pending.

## Within a module

```text
documents/
  document-service.ts
  document-repository.ts     Interface; PostgreSQL adapter lives in database
  document-errors.ts
  document-types.ts
  lifecycle/
  policies/
  __tests__/
```

Prefer feature folders over one giant controllers/services/utils directory. Do not add an interface for every class; create interfaces at boundaries with alternate implementations or required test seams. Explicit factories wire dependencies; a general dependency-injection container is not required.

Fastify plugins compose routes and HTTP hooks. They do not become the document engine's module system. Worker, CLI, and scripts invoke the same engine services.

## Installed app format

An app contains `app.manifest.json`, modules, DocType JSON, TypeScript controllers, report definitions, pages/assets, fixtures, translations, and ordered migrations. Public logical names remain Frappe-like (`Sales Invoice`, `customer_name`); filenames use kebab-case. Runtime identifiers are resolved by a registry rather than arbitrary module imports from HTTP input.

## Site data

Site configuration, backups, private/public files, and runtime state live on external volumes/object storage, outside source packages. A control registry stores routing/provisioning status and secret references; tenant metadata and business records live in each site's database. Never commit real site credentials.
