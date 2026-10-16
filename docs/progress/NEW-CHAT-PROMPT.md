# Prompt for a new chat

Open a new local chat in the same project folder /home/zabii/frappe clone, then paste:

```text
Continue Closely in this project. Read AGENTS.md, docs/progress/START-HERE.md and docs/progress/HANDOFF.md, then the relevant lesson documents. Check the actual files and resume from the recorded checkpoint.

Keep our coding-led teaching style. Before each new package/file, explain in plain English the real action it supports, where it fits in the full system, why we chose that responsibility and what failure it prevents. Do not assume architecture knowledge or give unexplained file instructions. Link focused official docs, explain the code, then give one manageable edit-and-check chunk and let me write and run everything. Ask learning questions at the end of the coding session. Do not implement on my behalf or assume pending checks passed. Maintain the progress docs as we go.
```

If you work in a different checkout/computer, bring these docs with the project. A fresh chat needs access to the files; a prompt alone does not supply their contents. Do not paste the entire old conversation when these records are current.

Before changing chats you can say: “Update the handoff; I’m switching chats.” The assistant then inspects relevant files read-only, records the exact pending action and unverified checks, and updates HANDOFF.md, CURRENT.md, state.json and the session note. No implementation is performed during the handoff.

Current checkpoint (2026-10-16): create-site-role implementation, 20 database tests and live NOLOGIN role behavior checked. Role closely_beta exists; database closely_beta does not. Role chunk commit/push pending on codex/site-database-account; last confirmed remote commit dd87ebc. Follow HANDOFF.md before further implementation.
