# Testing, review, and production rules

These are agreed future requirements, not installed tools or existing automated checks. All scaffold and harness code was removed for user-led learning on 2026-10-08.

## Tests selected by risk

Pure calculations use Vitest unit tests. Persistence/permissions/migrations use real PostgreSQL integration tests through Testcontainers. Redis/BullMQ integration tests exercise retry and restart. Fastify inject tests cover transport validation and serializers. Testing Library + user-event covers components by visible role/text. Playwright covers Desk/portal and reference comparisons. k6 measures representative workloads, not only hello-world throughput.

Every business mutation has rollback and denied-access tests. Permissions also cover lists/counts/reports/search/files/realtime. Tenant tests run two sites with overlapping record names. Concurrency tests use separate real connections and barriers. Job tests simulate committed work followed by crash/redelivery. Migration tests cover older data, preserved customizations, interruption and repeat invocation.

ERP probes are framework acceptance fixtures, not the production ERP implementation. No mock-only test can prove locking, SQL constraints, transaction atomicity, or parity.

## CI gates and current coverage

1. Frozen-lockfile installation on pinned Node/pnpm tooling.
2. Formatting, ESLint, strict typecheck and Nx dependency boundaries.
3. Changed-package unit/integration tests and dependent-package build checks.
4. Migration/contract generation drift checks when relevant.
5. Permission, isolation, lifecycle and mutation regression suite.
6. Relevant browser/parity tests with fixed reference fixtures.
7. Production build and image smoke check.

Nx inputs include generators, lockfile, TS config, environment-dependent inputs and generated contracts. Correctness-critical changed checks run without cache during release verification. Do not treat a stale cached pass as evidence.

## Review checklist

Link feature ID and explain trigger/outcome. Confirm boundary ownership, actor/site context, validation, permissions, atomicity, retry safety and secret redaction. Schema changes identify migration and recovery. UI changes identify accessibility/error states and reference screenshots. New libraries require compatibility, maintenance and license review. Avoid unrelated generated/translation churn.

## Deployment and processes

Build immutable Docker images with pinned base-image digests at release time; run as non-root with explicit resource limits. API/worker/scheduler/script runner have separate startup commands and responsibilities. Caddy terminates TLS. Trust forwarded headers only from configured proxies. Database, queue Redis and cache Redis are private infrastructure.

Readiness checks inspect required dependencies; liveness measures process health without causing dependency outage restart loops. Graceful shutdown stops accepting work, drains bounded tasks, closes pools, and leaves incomplete queue work recoverable. Exactly one logical scheduled occurrence is dispatched using site-aware locking/idempotency, even with multiple schedulers.

## Observability and reliability

Structured logs correlate HTTP, jobs and integrations. OpenTelemetry traces boundaries. Metrics include request latency/error rate, pool wait/usage, queue age/failures, outbox age, scheduler lag, migration status and backup freshness. Avoid per-record/site labels with unbounded cardinality; detailed identity belongs in secured logs.

Agree measurable SLOs and dataset/workload assumptions before a production claim. Timeout/cancellation propagation, query limits, file/body limits and provider retry budgets are configured. Health dashboards do not replace action-oriented alerts.

## Backup and recovery

Use pgBackRest for cluster/database recovery capabilities and site-oriented export/restore tooling for Frappe-like operations. Maintain a manifest connecting database recovery point, app versions, metadata revision and attachment snapshot. Object-storage versions/lifecycle and secrets recovery are included.

Run a restore into an isolated environment, verify integrity and representative workflows, and measure recovery time/data loss. Do not publish numeric RPO/RTO promises before that evidence exists. Restore testing is mandatory before releasing destructive migrations or claiming operational readiness.

## Enforcement status

No automated enforcement is currently implemented. Build/typecheck, ESLint/Nx boundaries, formatting, CI, reference capture and all product suites are future user-built work. The documentation describes intended standards. See ../progress/state.json for actual current progress.
