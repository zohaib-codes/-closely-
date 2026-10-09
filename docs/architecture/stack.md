# Final stack and ownership

Choices are the agreed design defaults. Foundation dependency manifests/lockfile/node_modules now exist; see ../progress/HANDOFF.md for the actual pending configuration/source/check state. The previous assistant scaffold was removed for user-led learning. Explain and install each dependency only when its owning responsibility is taught. Verify compatibility and pin exact versions at that step; upgrade deliberately with tests.

| Responsibility              | Choice                                                                          |
| --------------------------- | ------------------------------------------------------------------------------- |
| Language/runtime/repository | Strict TypeScript, Node.js LTS, ESM, pnpm, Nx                                   |
| HTTP/contracts              | Fastify, TypeBox, Ajv, Fastify Swagger/UI                                       |
| Database                    | PostgreSQL, pg, Kysely                                                          |
| Frontend                    | React, Vite, TanStack Router                                                    |
| State                       | TanStack Query, Zustand, React Hook Form                                        |
| UI                          | Tailwind, Radix, shadcn source components, Lucide, Sonner, cmdk                 |
| Tables/builders             | TanStack Table/Virtual, dnd-kit, React Flow                                     |
| Editors/views               | Tiptap OSS, CodeMirror 6, ECharts, FullCalendar standard, custom Gantt          |
| Dates/numbers/i18n          | date-fns, @date-fns/tz, decimal.js, Intl, i18next/react-i18next                 |
| Expressions                 | jsep parser with allowlisted evaluator; no arbitrary eval                       |
| Auth                        | Fastify cookie/session, Redis session store, Argon2id, openid-client, otplib    |
| HTTP protections            | Fastify helmet/rate-limit/multipart/env; CSRF policy in auth boundary           |
| Jobs/realtime               | BullMQ, Redis, Socket.IO/Redis adapter, PostgreSQL outbox                       |
| Storage/images              | S3-compatible API, AWS SDK v3, Sharp                                            |
| Mail/imports                | Nodemailer, ImapFlow, mailparser, ExcelJS, csv-parse/stringify                  |
| Templates/printing          | Nunjucks, markdown-it, Playwright Chromium print workers                        |
| Sanitization                | DOMPurify browser, sanitize-html server                                         |
| CLI                         | Commander, @clack/prompts                                                       |
| Testing                     | Vitest, Testing Library/user-event, Testcontainers, Playwright, k6              |
| Tooling                     | ESLint, Prettier, GitHub Actions                                                |
| Operations                  | Docker/Compose, Caddy, Pino, OpenTelemetry, Prometheus/Grafana/Loki, pgBackRest |

## Scope that needs adapters

Frappe's Python/Jinja scripting, legacy JavaScript APIs, LDAP, OAuth provider role, SMS/push/network printing, connector providers and engine-specific search/sync adapters require explicit modules. Existing packages above do not implement them automatically. Use `ldapts` for LDAP and `oidc-provider` for a standards-based OAuth/OIDC provider adapter; legacy Frappe endpoint semantics still require compatibility tests. Use Leaflet for map fields and html5-qrcode for browser scanning. QR rendering uses qrcode; barcode rendering uses JsBarcode. Confirm supported browsers and licenses when adding these modules.

Nunjucks is not a promise of complete Jinja compatibility. TypeScript scripts replace Python execution. Chromium PDFs need output comparison against the pinned print formats. PostgreSQL-only support changes storage portability. DuckDB/SQLite search-sync features in the reference inventory need scoped adapters or an explicit approved divergence; PostgreSQL full-text search alone cannot certify them.

## Engine ownership

DocType/schema registry, document lifecycle, query/permission engine, naming, child handling, app installation/migrations, workflow/automation policy, reporting and compatibility SDKs are our implementations of referenced contracts. We reuse libraries for transport/rendering/storage rather than inventing new primitive frameworks.

Protocol and package choices do not prove performance or stability superiority to Twenty/Frappe. The comparison is target fit; actual claims require measurements and production evidence.
