# Session startup and handoff

Every new chat must read this before assuming progress or executing work.

## Startup

1. Read root AGENTS.md and [learning agreement](../learning/WORKING-AGREEMENT.md).
2. Read [checkpoint](HANDOFF.md), [current state](CURRENT.md) and [task tracker](state.json). Read the latest session only if more detail is needed; do not load the entire historical log.
3. Read ../learning/ROADMAP.md, the relevant lesson/official reading, engineering/architecture docs and feature entry.
4. Inspect relevant existing files read-only. Read CURRENT.md for actual files. Inspect current state: Closely manifests, lockfile and dependency tree now exist; source/configuration/check completion must be verified rather than assumed. Config files now exist; consult HANDOFF.md for the pending source action.
5. Resume from the user's last confirmed action. If none is recorded, start the first conceptual lesson. A plan or previous assistant implementation does not establish user completion.

## Records

- state.json: authoritative task status and recorded evidence; maintained manually.
- CURRENT.md: concise readable summary, maintained manually alongside state.json.
- sessions/: learning handoffs and historical records; latestSession identifies the current handoff.
- ../parity/features.json: product capability status, separate from learning/tooling progress.
- ../architecture/decisions.md: architectural decisions and explicit differences.
- ../research/reference-lock.json: pinned behavioral source and snapshot identities.

## During a lesson

Explain purpose, architecture, code and commands before the user acts. Give one manageable action and wait for their result. Update progress only from actual evidence; preserve questions and incomplete verification. Do not run installation/build/test commands or modify implementation on the user's behalf without specific authorization.

## Handoff

Record what was explained, the last user-confirmed action, files actually created by the user, exact verification results, open questions and the next single lesson. Keep state.json and CURRENT.md consistent manually. No automated documentation/progress tools exist yet. Record retained services if any; never include secrets.

Current human instructions take precedence. Fix stale summaries with an explanation. Do not silently change stack, baseline, tenancy or scope. All planned automation and production gates remain future user-built work.

## Switching chats

Keep [NEW-CHAT-PROMPT.md](NEW-CHAT-PROMPT.md) as the reusable entry message. Refresh HANDOFF.md, CURRENT.md, state.json and a dated note at meaningful progress/decision boundaries and before a requested handoff. Record failures and unsupplied outputs. Read only current/relevant docs to reduce context use; detailed historical notes remain available when needed.
