# Frontend engineering rules

## State ownership

TanStack Query owns committed records, metadata, lists and server caches. Zustand owns shared UI (dock/tabs/panels, builder selection and preferences). React Hook Form owns unsaved form values and field validation. URL owns shareable filters, sorting, view type and pagination. Component state owns local behavior.

Never maintain the same canonical server record in Zustand and Query. Separate a dirty draft from the committed Query snapshot; background updates must not overwrite it. A conflict prompts reload/merge; it does not silently replace user input. Prefer event handlers and derived values over effects that synchronize duplicate state.

## Query and mutation policy

Query keys include site, session/authorization generation, entity and parameters. Clear scoped caches on logout/site switch; do not retain cross-user private data. Virtualized/infinite lists have stable names/keys and server pagination. Configure staleness per data class, not one global infinity setting.

Invalidate/update caches only after successful server mutations. Realtime events invalidate/refetch with deduplication. Optimistic UI is restricted to explicitly reversible actions; submit/cancel/posting require server confirmation. Reads have bounded retries; mutations follow the error/idempotency policy.

## Metadata-driven forms

Field registry owns renderer, formatter, input parser, validation mapping, filter editor and capability declaration. Shared metadata does not mean browser/server validation has identical implementations; server is authoritative. Unknown field types fail visibly rather than disappearing.

Preserve explicit null/empty/default distinctions, dependent mandatory/read-only/visibility rules, fetch-from behavior, child grids, field permission levels, dirty tracking, and action-specific lifecycle. Hidden/read-only controls do not provide authorization. Conditions are parsed through a restricted evaluator rather than evaluated as arbitrary code.

## Components and UX parity

Shared primitives live in ui; document-specific behavior lives in Desk features/field-controls. No database imports or direct provider secret access. Use functional components and named exports. Hooks expose meaningful feature behavior rather than just wrapping individual fetch calls.

Required states: loading, empty, inaccessible, malformed/invalid, stale/conflict, retryable outage, unexpected failure. Forms retain input after failure. Focus moves to the first invalid field. Dialogs have keyboard controls, labels and sensible focus restoration. Themes use design tokens; avoid one-off inline styles for core layout.

Define a reference screenshot set at fixed desktop/mobile widths, fonts, locale and timezone. Rebuild Frappe v16 navigation (apps/desktop, sidebar, dock/workspaces) against that set. Radix/shadcn defaults are a starting point, not evidence of Frappe visual parity.

## Client SDK/scripts

Maintain a public client compatibility surface for `frappe.call`, form events, dialogs, controls, list settings and supported utilities. React internals must not leak through that API. Each supported method has its own fixture. DOM/jQuery manipulation compatibility requires specific adapters and cannot be claimed universally.

Rich text and HTML rendering use sanitization. Site scripts run only in configured trusted scopes; a frontend cannot keep a secret from its user. Translation keys cover UI strings and validation; document content language, user locale and site timezone are independently explicit. Lazy-load large editors/charts and cap retained UI state.
