# L00 — Repository, monorepo, apps and engine packages

Delivered conceptually on 2026-10-08. User response demonstrates shared-engine and dependency-direction reasoning. Domain terminology needs refinement: Document means a business record, not primarily a generated PDF. No implementation is confirmed. No code is created in this lesson. [Official reading](READING-GUIDE.md).

## Four responsibilities

A Git repository stores version history; developers work in a checkout containing source, configuration and documentation. GitHub is a hosting/collaboration service, not required for a local Git repository. The present documentation workspace has not yet been re-initialized as a Git repository.

A monorepo is one repository containing multiple related projects. We plan one repository for the framework API, Desk, shared libraries and eventually the ERP consumer. Shared changes can be reviewed and checked together. Tradeoffs include enforcing boundaries and avoiding unnecessary rebuilds. Repository layout does not determine whether deployment uses one process, several processes or microservices.

A workspace package is a separately named unit with a manifest, dependency list and public exports. It can be internal/private without being published to npm. A TypeScript module is typically a file with imports/exports; a package can contain many modules. A folder alone does not enforce a package boundary.

An app is an executable entry point plus wiring/configuration. Our API accepts HTTP; Desk runs in a browser; workers consume jobs; scheduler dispatches due work; CLI executes administrative commands. Each chooses its concrete dependencies and calls engine services. The name apps/ is our convention, not a special Node feature.

## Engine and adapters

The engine is a reusable server library owning document behavior and policy: validation, lifecycle, docstatus, child ownership, naming and permission decisions. It has no HTTP listener or React screens. Metadata definitions belong to metadata; engine consumes them. Persistence mechanics belong to database; engine declares the interfaces its operations require. API/worker/CLI composition roots provide the concrete adapters explicitly.

For example, a create-document HTTP request is validated by the transport. The engine receives an explicit site and actor, checks policy and performs the lifecycle inside a unit of work. PostgreSQL persists parent/children/audit/outbox records atomically. After commit, a worker delivers the durable intent. CLI and job entry points use the same engine rules. A denied action cannot become allowed simply by entering through a different transport.

## Two meanings of app

apps/api and apps/worker are runnable platform programs. business-apps/erp is an installed business extension: DocTypes, reports, hooks and migrations loaded by the framework. It does not need a dedicated HTTP server per installed app. ERP defines invoice/accounting policy through the public server SDK; the engine remains reusable for CRM/helpdesk/other apps and cannot import ERP business code.

## Planned dependency boundaries

- Engine imports metadata/contracts, never Fastify, React or ERP.
- Database/infrastructure adapters implement engine interfaces and are supplied by entry-point wiring.
- Desk uses browser-safe contracts/client SDK; server behavior is reached over HTTP/realtime rather than direct engine imports.
- ERP uses public server SDK exports; it does not import engine implementation files.

Nx/lint checks will enforce forbidden imports later; directories themselves offer no protection. Runtime authorization and tenant isolation need their own tests.

## Learning check

Explain in your own words why a CLI create-document command should use the same engine as HTTP, and why the engine must not import the future ERP package. This checks boundary understanding, not memorized vocabulary. No file creation or installation yet.

## Review of the user's response

The user correctly explained shared rules, reduced duplication, reusable interfaces, independent core testing and the dependency/circularity risks of importing ERP into core. Their examples framed documents around formatting/templates/PDF generation; clarify that our engine primarily manages business-record behavior.

DocType is a metadata definition; Document is an instance such as a Customer or Sales Invoice; a printed PDF is a representation of that record. Engine policy governs permissions, validation, lifecycle and atomic persistence. Native HTTP/CLI output may differ while business behavior stays consistent. A browser UI calls server APIs, not the server engine directly.

ERP registers trusted app controllers/hooks through public extension contracts. The engine invokes registered callbacks without importing ERP modules; ERP database mutations remain inside the same explicit unit of work. Persistence adapters and app-domain hooks are different responsibilities.

Official reading: [Understanding DocTypes](https://docs.frappe.io/framework/user/en/basics/doctypes), introductory definition; [Document API](https://docs.frappe.io/framework/user/en/api/document), opening definition and insert/save descriptions. Read behavior, not Python syntax, and do not run examples.

Follow-up learning check: for submitting a Sales Invoice, identify who enforces generic submit permission and who enforces ERP-specific accounting rules. Then move to L01 after addressing questions. No full mastery or completion assumed from this correction alone.
