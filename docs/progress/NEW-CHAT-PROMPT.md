# Prompt for a new chat

Open a new local chat in the same project folder /home/zabii/frappe clone, then paste:

```text
Continue Closely in this project. Read AGENTS.md, docs/progress/START-HERE.md and docs/progress/HANDOFF.md, then the relevant lesson documents. Check the actual files and resume from the recorded checkpoint.

Keep our coding-led teaching style: briefly explain purpose, link relevant official docs, give exact paths/code/commands with explanations, and let me write and run everything. Ask learning questions at the end of the coding session. Do not implement on my behalf or assume pending checks passed. Maintain the progress docs as we go.
```

If you work in a different checkout/computer, bring these docs with the project. A fresh chat needs access to the files; a prompt alone does not supply their contents. Do not paste the entire old conversation when these records are current.

Before changing chats you can say: “Update the handoff; I’m switching chats.” The assistant then inspects relevant files read-only, records the exact pending action and unverified checks, and updates HANDOFF.md, CURRENT.md, state.json and the session note. No implementation is performed during the handoff.
