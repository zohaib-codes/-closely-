# Prompt for a new chat

Open a new local chat in the same project folder /home/zabii/frappe clone, then paste:

```text
Continue Closely in this project. Read AGENTS.md, docs/progress/START-HERE.md and docs/progress/HANDOFF.md, then the relevant lesson documents. Check the actual files and resume from the recorded checkpoint.

Keep our coding-led teaching style. Before each new package/file, explain in plain English the real action it supports, where it fits in the full system, why we chose that responsibility and what failure it prevents. Do not assume architecture knowledge or give unexplained file instructions. Link focused official docs, explain the code, then give one manageable edit-and-check chunk and let me write and run everything. Ask learning questions at the end of the coding session. Do not implement on my behalf or assume pending checks passed. Maintain the progress docs as we go.
```

If you work in a different checkout/computer, bring these docs with the project. A fresh chat needs access to the files; a prompt alone does not supply their contents. Do not paste the entire old conversation when these records are current.

Before changing chats you can say: “Update the handoff; I’m switching chats.” The assistant then inspects relevant files read-only, records the exact pending action and unverified checks, and updates HANDOFF.md, CURRENT.md, state.json and the session note. No implementation is performed during the handoff.

Current checkpoint (2026-10-16): physical database creation and failure cases checked; closely_alpha exists. Full local workspace validation passed, including 68 package tests and 13 comparator tests. Implementation commit 15179c2 is pushed to origin/codex/site-foundation-checkpoint. Teaching/Git/progress documents still need their second commit and push; PR/CI/merge remain pending. Follow HANDOFF.md for the exact next action.

Continue beginner-first, complete-feature teaching: explain the visible goal and how the pieces connect before code. After the Git checkpoint, resume persistent site-setup design. Do not repeat database creation or return to isolated helpers or the withdrawn /__debug/site proposal. Full site registration and tenant database isolation remain unfinished.
