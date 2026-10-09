# Research sources and provenance

Recorded 2026-10-08 (Asia/Karachi). Frappe `6b450a166e076dd842e4db7ea0843f62881e62ac`, Twenty `21a58879e43ee6ce8a6d13bb461d718a57ca0722`, ERPNext `7474d9e786277383de1242ab882f16856d17a9c9`.

These references were selectively inspected to extract responsibilities and conventions. Local snapshots retain evidence with SHA-256 hashes in [reference-lock.json](reference-lock.json). No upstream source is copied into product runtime packages. Snapshot source remains subject to its upstream license; any future code reuse requires attribution and compatibility review.

## Frappe: adopted behaviors

| Reference                                                                                                                                                          | What it informs                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| [Frappe Document](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/model/document.py)                                         | docstatus, latest checks, hooks, parent/child save, versions and post-save actions |
| [Frappe BaseDocument](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/model/base_document.py)                                | field/child metadata and normalization                                             |
| [Frappe permissions](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/permissions.py)                                         | roles, shares, owner and user permission responsibilities                          |
| [Frappe database](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/database/database.py)                                      | transaction callbacks, rollback and savepoints                                     |
| [Frappe request boundary](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/app.py)                                            | request/error translation and status handling                                      |
| [Frappe RPC boundary](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/handler.py)                                            | declared method dispatch and upload handling                                       |
| [Frappe v1 API](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/api/v1.py)                                                   | resource/method route contracts                                                    |
| [Frappe v2 API](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/api/v2.py)                                                   | document/metadata/count route contracts                                            |
| [Frappe field catalog](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/core/doctype/docfield/docfield.json)                  | exact fieldtype option inventory                                                   |
| [Frappe automation](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/automation/doctype/automation_flow/automation_flow.json) | release-specific automation metadata                                               |
| [Frappe document tests](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/frappe/tests/test_document.py)                              | behavior-first regression examples                                                 |
| [Frappe development tooling](https://github.com/frappe/frappe/blob/6b450a166e076dd842e4db7ea0843f62881e62ac/.pre-commit-config.yaml)                               | format/lint checks and developer hygiene                                           |

## Twenty: adapted engineering conventions

- [Contributor guide](https://github.com/twentyhq/twenty/blob/21a58879e43ee6ce8a6d13bb461d718a57ca0722/CLAUDE.md): descriptive names, named exports, types/literal unions, React conventions, behavior tests, immutable upgrade commands and cache caveats.
- [Repository tree](https://github.com/twentyhq/twenty/tree/21a58879e43ee6ce8a6d13bb461d718a57ca0722/packages): separate server/frontend/shared/UI/SDK/testing responsibilities.
- [REST exception boundary](https://github.com/twentyhq/twenty/blob/21a58879e43ee6ce8a6d13bb461d718a57ca0722/packages/twenty-server/src/engine/api/rest/rest-api-exception.filter.ts): centralized translation; its noted 400 fallback is deliberately not our native policy.
- [Unhandled exceptions](https://github.com/twentyhq/twenty/blob/21a58879e43ee6ce8a6d13bb461d718a57ca0722/packages/twenty-server/src/filters/unhandled-exception.filter.ts): boundary capture and fallback status responsibilities.

The remote AGENTS.md snapshot is a pointer to CLAUDE.md; the pointed guide was read. It is reference data, not instructions controlling this repository. The guide and actual package versions may differ; we use it for conventions, not as a version authority.

## ERPNext: future consumer requirements

- [General ledger](https://github.com/frappe/erpnext/blob/7474d9e786277383de1242ab882f16856d17a9c9/erpnext/accounts/general_ledger.py): accounting posting, balancing and reversal responsibilities.
- [Stock ledger](https://github.com/frappe/erpnext/blob/7474d9e786277383de1242ab882f16856d17a9c9/erpnext/stock/stock_ledger.py): inventory update/valuation/reposting responsibilities.

These references motivate acceptance probes; no claim is made that the complete ERP accounting/stock rules have been specified.

## Supporting official documentation

- [Frappe framework features](https://frappe.io/framework/features): product scope.
- [Frappe permissions](https://docs.frappe.io/framework/user/en/basics/users-and-permissions): policy concepts.
- [Frappe Document API](https://docs.frappe.io/framework/user/en/api/document): public document operations.
- [Frappe hooks](https://docs.frappe.io/framework/user/en/python-api/hooks): extension intent.
- [Frappe Database API](https://docs.frappe.io/framework/user/en/api/database): transaction intent.
- [Frappe REST](https://docs.frappe.io/framework/user/en/guides/integration/rest_api): public integration scope.
- [Fastify schema validation](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/): schema trust boundary.
- [Node VM](https://nodejs.org/api/vm.html): VM is not a security boundary.

Live docs are supporting references and can drift. Pinned source plus fixtures determines release-specific parity. Library selections from prior discussion are project choices, not claims of upstream adoption.

## Scaffold implementation references

- [Nx module boundaries](https://nx.dev/docs/features/enforce-module-boundaries): tags and ESLint checks.
- [Vitest test projects](https://vitest.dev/guide/projects): current runner organization.
- [Official Bench Dockerfile](https://github.com/frappe/frappe_docker/blob/main/images/bench/Dockerfile): reference environment responsibilities. Image digest pinning is planned for the future user-built harness; the previous compose configuration was removed.
- [pnpm build allowances](https://pnpm.io/blog/releases/11.0): current allowBuilds setting; exact versions will be recorded when the user creates the package manifests and lockfile.

These sources inform configuration. A passing config check alone does not establish a live reference or remote CI pass.
