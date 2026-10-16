# Prompt for a new chat

Open a new local chat in the same project folder /home/zabii/frappe clone, then paste:

```text
Continue Closely in this project. Read AGENTS.md, docs/progress/START-HERE.md and docs/progress/HANDOFF.md, then the relevant lesson documents. Check the actual files and resume from the recorded checkpoint.

Keep our coding-led teaching style. Before each new package/file, explain in plain English the real action it supports, where it fits in the full system, why we chose that responsibility and what failure it prevents. Do not assume architecture knowledge or give unexplained file instructions. Link focused official docs, explain the code, then give one manageable edit-and-check chunk and let me write and run everything. Ask learning questions at the end of the coding session. Do not implement on my behalf or assume pending checks passed. Maintain the progress docs as we go.
```

If you work in a different checkout/computer, bring these docs with the project. A fresh chat needs access to the files; a prompt alone does not supply their contents. Do not paste the entire old conversation when these records are current.

Before changing chats you can say: “Update the handoff; I’m switching chats.” The assistant then inspects relevant files read-only, records the exact pending action and unverified checks, and updates HANDOFF.md, CURRENT.md, state.json and the session note. No implementation is performed during the handoff.

Current checkpoint (2026-10-16): previous PR #1 merged and main synchronized. Active branch codex/site-database-account. Database name suffix corrected to 55; 10 database tests/typecheck/build pass with user-supplied exit 0. Correction and handoff docs are uncommitted. Resume from HANDOFF.md: preserve this small correction with a Git checkpoint, then design the site login and its permissions. No account creation code assigned yet. Do not repeat completed database creation, length correction, or previous PR steps.
