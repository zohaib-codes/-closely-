# Acceptance scenarios and fixture contract

These are test specifications, not executed tests. Every capability's proposed `PARITY-*` test must cover its positive and negative criteria. Shared scenarios below define the correctness bar.

## Fixture setup

Create sites alpha/beta with identical logical document names but different data. Use admin, ordinary role, owner-restricted role, field-restricted role, website user and guest. Define Parent Record, Child Record, Single Settings, Tree Record and a submittable Test Voucher. Preserve source configuration and fixture seed hash in `tests/parity/fixtures/<feature-id>/manifest.json` when captured.

Fixture manifest fields: reference commit/tag, app versions, database/runtime versions, site settings, actors/roles, seed hash, operation, expected safe response/status, resulting records, hook trace, event/outbox outcomes, screenshot viewport/locale/timezone where relevant, normalization rules and explicit differences. Secrets are never stored in fixtures.

## GWT-001 — Atomic parent/child save

Given a parent with two children and an after-persistence hook that throws, when a save adds a child and edits the parent, then all parent/child/version changes roll back and no committed business event is delivered. Re-read through a separate connection. Compare reference hook trace as well as record outcomes.

## GWT-002 — Denied field paths

Given a user who can read a record but cannot read its confidential field, when they fetch/list/filter/search/report/export/print/subscribe, then the restricted value cannot be inferred through serialized fields, aggregates, errors or event payloads. A crafted write to that field is denied even if the UI hides it.

## GWT-003 — Site isolation

Given alpha/beta each contain Test Voucher V-001, when alpha's actor requests HTTP, queues a job, downloads a file, uses a socket or searches, then only alpha resources are accessed. Spoofing payload site ID, object prefix, job context or socket room cannot change the resolved authority.

## GWT-004 — Concurrent save

Given two separate connections load the same revision, when both attempt incompatible updates behind a synchronization barrier, then the committed outcome preserves one valid update and rejects/explicitly resolves the stale other update. A test using sequential saves does not establish concurrency correctness.

## GWT-005 — Submit/cancel/amend

Given a submittable voucher with typed children, when submit succeeds, then docstatus and hooks match the reference and effects occur once. A second concurrent submit does not repeat effects. Protected edits fail; allowed-on-submit edits follow their own hooks. Cancel/amend preserve links and tested reversal history.

## GWT-006 — Crash after commit

Given a mutation writes business data plus outbox intent, when the process exits after commit but before delivery, then restart eventually dispatches the intent. Redelivery is harmless under the handler's idempotency identity. A rolled-back mutation never produces successful delivery.

## GWT-007 — Upgrade with customization

Given installed app version A plus custom field/property/layout and existing records, when version B adds/changes a standard definition, then valid customizations and data survive. Inject failure after one migration, rerun, and verify checksum/order/maintenance state without replaying committed effects or claiming universal rollback.

## GWT-008 — Import failure/retry

Given a sheet with valid rows, invalid links, a duplicate key and children, when preview/import/retry runs, then row outcomes, partial-success rules, child mapping and duplicate treatment match recorded reference behavior. Do not choose all-or-nothing or partial success before capturing the reference contract.

## GWT-009 — Backup/restore

Given a site with files, customizations, roles, app versions and submitted vouchers, when a backup is restored into a clean isolated target, then records, attachment access, app versions and key workflows are consistent. Missing object versions or incompatible code stop with an actionable error. Measure actual recovery time and data loss.

## GWT-010 — HTTP errors

Given malformed input, missing auth, denied action, missing record, duplicate and stale save, when native and legacy endpoints are invoked, then native contracts and pinned endpoint-specific legacy contracts are each preserved. An unexpected driver error is safe, traceable and not a false validation success.

## GWT-011 — UI parity

Given fixed seed, viewport, fonts, language and timezone, when navigation, form, child grid, submit/error, workspace and print flows execute, then behavior and reference screenshots meet recorded criteria. Test keyboard/focus/mobile layouts. Different rendering libraries do not excuse missing interaction behavior.

## GWT-012 — Restricted extension execution

Given a site script attempts infinite CPU, forbidden file/network access or another site's document, when executed, then resource boundaries terminate it, capabilities deny access, errors stay observable, and API/worker availability remains intact. Trusted installed app hooks are separately audited; a process boundary alone is not the complete security policy.

## GWT-013 — ERP readiness probes

Given a minimal installed test app with a voucher and ledger/stock handlers, when posting runs, then debit/credit balance and required quantity/valuation invariants hold under an explicit rounding policy. Hook failure rolls back all effects; retry/concurrent posting do not duplicate them. This proves framework seams, not completed ERPNext parity.

## GWT-014 — Revocation

Given cached queries, a socket and a pending job, when a user loses roles/sharing or the session is revoked, then subsequent access/delivery follows refreshed policy. Jobs run with declared service capability or current user policy, never implicitly with admin rights.

## GWT-015 — Reference edge cases

Capture cancellation of linked document chains, absent versus zero currency values, numeric naming fields, unauthorized attachments, stale single-setting forms, layout customization restore and report language/letterhead behavior. These correspond to release-adjacent regression areas; release notes guide cases but source/runtime settles exact expectations.
