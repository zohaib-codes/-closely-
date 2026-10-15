# Error handling and API contracts

Adopt centralized boundary translation from Frappe's request handler and Twenty's exception filters. Adapt to Fastify. Do not copy Twenty's observed REST fallback that treats some unknown errors as 400; our native unknown-error default is 500. Reference-compatible routes preserve measured Frappe statuses and response shapes through an adapter.

## Internal errors

Domain errors carry a stable `code`, translation key, safe parameters, optional field issues, retry category, and internal `cause`. Engine errors do not import Fastify and do not contain HTTP reply objects. SQL/Redis/provider errors are converted at their owning adapter; raw driver messages never reach clients.

Native APIs use an RFC 9457-style problem response (`application/problem+json`) with `type`, `title`, `status`, `detail`, `instance`, and extensions `code`, `requestId`, optional `fieldErrors`. Detail is safe and does not contain credentials, SQL, stacks, or another tenant's identifiers.

| Internal category                             | Native HTTP | Client behavior                 | Retry                           |
| --------------------------------------------- | ----------- | ------------------------------- | ------------------------------- |
| Malformed request/schema                      | 400         | Explain invalid request         | No                              |
| Unauthenticated/expired session               | 401         | Login flow, preserve safe draft | No automatic replay of mutation |
| Permission denied                             | 403         | Explain denied action           | No                              |
| Missing or concealed record                   | 404         | Missing/available-access state  | No                              |
| Duplicate, stale document, invalid transition | 409         | Resolve conflict/reload         | Explicit user action            |
| Field/business validation                     | 422         | Keep input, show field errors   | No                              |
| Payload too large                             | 413         | Explain limits                  | No                              |
| Rate limit                                    | 429         | Respect Retry-After             | Bounded                         |
| Unexpected failure                            | 500         | Safe message + request ID       | Reads only by policy            |
| Temporary dependency outage                   | 503         | Recoverable service state       | Idempotent operations only      |

Errors are thrown, not returned as success-shaped values. Catch only to translate, recover deliberately, add context, or finalize resources. Never log-and-return-success; never log the same failure independently at every layer. Preserve internal causes.

## Compatibility routes

Track `/api/resource`, `/api/method`, explicit `/api/v1` aliases where reference routing provides them, and `/api/v2/document`, `/api/v2/doctype`, `/api/v2/method`. Observe trailing slash behavior, method rules, pagination defaults, fields/filters syntax, response envelopes, and naming paths from tagged `frappe/api/*` and runtime fixtures.

Do not substitute the native 422/problem response for Frappe's validation response. Snapshot safe `data`, `message`, error type, server-message fields, and status behavior per endpoint. Unsafe trace/context exposure is an explicit intentional divergence rather than a reason to return secrets. Native TypeScript SDK contracts and legacy compatibility contracts are versioned separately.

## Requests and mutations

Create a server request ID; forward a validated correlation ID for tracing if needed. Resolve site from a trusted domain registry; untrusted Host/forwarded headers must not select arbitrary connections. Resolve actor/session, validate payload, authorize, open the unit of work, invoke the engine, commit, then serialize.

Reads do not produce business mutations. Compatibility exceptions must match a verified legacy contract, be marked, and retain protections. Whitelisted method invocation uses a declared registry and allowed HTTP methods, never arbitrary file/module paths.

Authentication with cookies requires CSRF validation for state-changing requests, same-origin defaults, explicit allowed origins, and secure HttpOnly cookies. Logout invalidates sessions. Public API credentials have revocation and audit semantics. Request body limits, query complexity, and per-site quotas are explicit.

### Initial direct Host adapter lesson

Implemented initial M1.01 native adapter: validate the complete direct Host authority before resolving the approved hostname registry. Explicit trustProxy:false; forwarded and X-Frappe-Site-Name headers do not select sites. Initial authority support is ASCII hostname plus optional decimal port1–65535; port does not change site identity. RequestSiteError uses stable INVALID_HOST400/UNKNOWN_SITE404 codes; known hostname validation failure is translated and unexpected failures remain thrown.

This is an incremental API boundary lesson exercised through a test-only route, not a shipped tenant diagnostic endpoint or authenticated document operation. Fastify's current error representation is temporary; centralized RFC9457 serialization, unknown-error redaction and Frappe compatibility payloads remain separate pending work. HTTP/2 authority, raw duplicate/missing-header socket behavior, IPv6, Unicode/IDNA and a deployment-specific trusted proxy configuration still need implementation/evidence. Local user-supplied engine11/API7 tests/typecheck/build/root lint/format pass on 2026-10-12 with exit0; boolean proxy option reviewed. Successful HTTP cases use inject and a test-only route, not production tenant resources. No operation may infer a tenant connection from an unregistered hostname.

## Retrying and frontend handling

Mutation retries require a scoped idempotency key and stored request hash/result where supported. Never retry a failed write simply because the connection closed: it may already have committed. Reference adapters preserve legacy endpoints while exposing stronger optional safeguards through native contracts.

Frontend parses one normalized error type. Field failures appear inline; form errors keep unsaved input. One toast for an action, not one per component. Authentication is handled centrally. Unexpected failures show a request ID, and code never renders raw stack/SQL strings.

## Jobs and logging

Job envelopes contain site ID, actor/service capability, correlation ID, schema version, and idempotency identity. Retry transient failures with bounded exponential backoff and jitter; validation/auth failures stop. Failed jobs remain visible with replay controls. Log event/code/site/request or job ID/duration; redact cookies, tokens, passwords, provider secrets and sensitive payloads.
