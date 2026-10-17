# Architecture decision records

Status: accepted defaults from this conversation, with explicit adaptations. Change through a new ADR and update dependent specifications.

| ID      | Decision                                                         | Basis                                                    | Tradeoff                                                           |
| ------- | ---------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| ADR-001 | Direct Fastify; engine independent of HTTP                       | User choice; adapt Frappe request/engine distinction     | Explicit dependency wiring and lifecycle ownership                 |
| ADR-002 | Modular monolith; separate API/worker/scheduler processes        | Adapt Frappe process responsibilities and Twenty modules | Requires strong package boundaries; fewer distributed transactions |
| ADR-003 | One PostgreSQL database per site                                 | Adopt Frappe site isolation, change database choice      | Provisioning, connections and upgrades cost at tenant scale        |
| ADR-004 | DocTypes create relational storage; Kysely under Document engine | Adopt Frappe metadata-driven records                     | Must implement dynamic schema, hooks and policy                    |
| ADR-005 | Explicit operation context and unit of work                      | Adapt Frappe site/user/transaction responsibilities      | More explicit parameters, less ambient state                       |
| ADR-006 | Versioned metadata with standard/custom overlays                 | Adopt Frappe custom fields/property overrides            | Need deterministic precedence and upgrade tests                    |
| ADR-007 | Same engine authorization for every entry point                  | Adopt permission intent, strengthen consistency          | Query policy compilation and cache invalidation are substantial    |
| ADR-008 | Native problem responses plus Frappe compatibility serializers   | Adapt centralized errors; preserve public contracts      | Two tested transport representations                               |
| ADR-009 | Transactional outbox, at-least-once idempotent delivery          | Project choice consistent with after-commit intent       | Additional storage/dispatch/reconciliation                         |
| ADR-010 | React Desk with Query/Zustand/form/URL ownership                 | Adapt separate frontend/shared UI; project libraries     | Legacy client APIs need explicit adapters                          |
| ADR-011 | Trusted app hooks versus restricted site-script service          | Preserve extension capability with TS implementation     | Python scripts need porting; isolation integration pending         |
| ADR-012 | ERP is an installed app, never a core dependency                 | Adopt Frappe/ERPNext relationship                        | SDK must support demanding transactional consumers                 |
| ADR-013 | Pin reference revision and require behavior evidence             | Project verification policy                              | Initial specification is not certified completeness                |
| ADR-014 | PostgreSQL-only native storage and Chromium/Nunjucks             | User-accepted stack                                      | SQL/print/Jinja/internal adapters have tracked differences         |

## Compatibility priority

Behavioral authority is tagged Frappe source plus recorded runtime behavior. Our safer native APIs may differ but compatibility adapters must record their differences explicitly. Never change core docstatus or document lifecycle to accommodate a library's default behavior. Never copy an upstream exception merely because it exists.

No architecture rule can eliminate bugs. These decisions reduce accidental variation and make deviations reviewable.

## ADR-015 — Foundation tooling trial (superseded)

The assistant trial selected exact tooling versions, workspace checks, reference capture and generated progress views. Its implementation was deliberately removed on 2026-10-08. It does not describe current installed packages, scripts or evidence. Exact future versions must be verified when the user reaches their installation lesson. Architecture defaults ADR-001 through ADR-014 remain the design baseline.

## ADR-016 — User-owned implementation and documentation-only reset

Accepted 2026-10-08 from explicit user instruction. The project exists to learn production engineering by building a full Frappe-like framework personally. The user creates files and runs commands; the assistant explains purpose, design, libraries, code and verification before each manageable action, then waits for the result.

Delete the assistant-created scaffold, project dependencies, harness and empty Git repository; preserve engineering, research, parity and continuity documents. Progress is manually maintained until the user builds tooling themselves. No assistant-written discarded scaffold counts as user completion or verified parity.

Tradeoff: delivery is paced by learning and review rather than autonomous generation. The full architectural and parity goals remain unchanged. See ../learning/WORKING-AGREEMENT.md for the operating protocol.

## ADR-017 — TypeScript native compiler with compiler-API compatibility

Accepted in the user's installed dependency selection, 2026-10-08. Closely uses @typescript/native as an alias for typescript 7.0.2 (tsc), and typescript as an alias for @typescript/typescript6 6.0.2 (tsc6 and legacy programmatic API). This follows Microsoft's documented side-by-side transition. No language/tooling integration test is claimed from manifest presence alone.

Typed lint tooling still declares TypeScript >=4.8.4 <6.1.0 at research time. Exact Nx/editor/lint integration is checked when introduced. Distinguish CLI typechecking, compiler API consumers and runtime transpilation; tsx is a development runner, not our typecheck gate.

Evidence: [TypeScript release and side-by-side guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/), [typescript-eslint compatibility](https://typescript-eslint.io/users/dependency-versions/). Package scope is @closely/*.

## ADR-018 — Separate site ownership from runtime database access

Accepted explicitly by the user on 2026-10-17. Each site has a NOLOGIN owner role and a separate restricted runtime login. Runtime processes receive only required database/schema/table/sequence privileges; they must not inherit or SET ROLE into the owner. Controlled provisioning and schema changes use an administrative path. Ownership of future schema objects must be assigned deliberately; database ownership alone does not transfer all object ownership.

This is a Closely adaptation: pinned Frappe PostgreSQL setup creates a password login and assigns it database ownership on PostgreSQL versions above 15. Separating ownership reduces privileges held during ordinary requests but adds grant maintenance and a distinct schema-change path, including future DocType changes. Application-user authorization remains engine policy.

First increment: require an explicit existing owner in create-site-database and create the database with TEMPLATE template0 and ALLOW_CONNECTIONS false in one statement. This low-level administrative command validates identifiers; it does not yet certify an existing role's full privilege/membership policy. Provisioning must establish that policy before a site is ready. PUBLIC defaults still require explicit removal before enabling access. Disabled connections also block setup connections to the new database; subsequent configuration must deliberately sequence database-level restrictions, opening connections, schema setup and readiness.

CREATE DATABASE cannot run inside a transaction block. Do not automatically drop/adopt a database on failure or retry. A lost response can leave a successfully created, closed database; inspect catalog ownership and connection state through the maintenance database before deciding recovery. Durable provisioning history, concurrency/recovery handling and site readiness remain required later work under OPS-001, not implemented guarantees of this increment. Preserve existing closely_alpha and the existing closely_beta role.

Sources: [PostgreSQL 18 CREATE DATABASE](https://www.postgresql.org/docs/18/sql-createdatabase.html), [role membership](https://www.postgresql.org/docs/18/role-membership.html), [pinned Frappe setup](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/database/postgres/setup_db.py). No runtime parity or new check results claimed.
