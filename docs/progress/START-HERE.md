# Resume Closely reliably

## Required startup

1. Apply root AGENTS.md. If its complete instructions are already supplied in the chat, do not reread the same file unless there is evidence it changed.
2. Read [HANDOFF.md](HANDOFF.md), the single current checkpoint. Do not also load CURRENT.md, the full tracker archive, historical sessions, the full working agreement or the whole roadmap by default.
3. Inspect branch, HEAD, working tree and upstream read-only. Inspect the exact source/diff relevant to the next action, including staged versus unstaged changes. Read only enough to establish the current behavior; a checkpoint is a navigation aid, not proof of implementation.
4. Follow the checkpoint's reading pointers. Before runtime guidance, read the relevant roadmap milestone/lesson, engineering handbook and relevant engineering/feature sections. For a Git-only checkpoint, review the diff and Git rules; unrelated runtime lessons can wait.
5. State confirmed status and give one manageable user-owned step. Never restart completed lessons solely because this is a new chat.

## Expand context when needed

Search first, then read matching sections. Use state.json for history pointers; extract the relevant task/check from its historical tracker instead of printing the whole JSON. Read the linked session when exact commands, authorship, output, rationale or unresolved questions are absent from HANDOFF.md. Read WORKING-AGREEMENT.md for a teaching ambiguity; consult ADRs and reference-lock.json for architecture/reference questions.

If files, user reports and checkpoint disagree, inspect the specific evidence and explain the discrepancy. Ask only when the missing fact blocks a safe next step. Do not fill gaps with memory or inference, silently assume checks passed, or discard a relevant requirement to meet a reading budget. Large diffs may require more reading; retrieve them in bounded sections rather than truncating them.

## Record ownership

- AGENTS.md: current teaching, engineering and Git rules.
- HANDOFF.md: current actionable status, preferably 500–800 words; exceed this when necessary to preserve critical facts.
- state.json: small index of current milestone and evidence/history locations; no duplicated narrative.
- CURRENT.md: stable pointer to HANDOFF.md; no updates needed during ordinary work.
- sessions/: dated detailed evidence and decisions; older statements remain historical.
- archive/: preserved old trackers, retrieved selectively.
- ROADMAP.md and parity/features.json: full lesson gates and product scope; shrinking startup never reduces scope.

## During work and chat switches

Update HANDOFF.md after meaningful progress, decisions or blockers, and before a requested chat switch. Record objective/scope, actual user versus authorized assistant work, branch/commit/staging/upstream, local versus remote evidence, failed/unrun checks, exact next action, open questions, protected resources and reading pointers. Put lengthy logs/rationale in a dated session and link them. Update state.json only when its pointers or milestone change. Keep NEW-CHAT-PROMPT.md generic.

Do not rewrite several summaries or create another documentation-only commit merely to record a commit/CI refresh. Preserve all unfinished work. No startup/build/test/Git mutation is authorized by these instructions; no automatic progress validator exists. Tell the user what documentation changed.
