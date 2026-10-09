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
