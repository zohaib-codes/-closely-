# 2026-10-17 — Selective startup and reliable handoffs

## Authorization and reason

User explicitly requested fixing excessive workflow context usage without losing reliable continuity across chats, then returning to the pending coding/Git work. Only workflow and progress documentation was changed. Runtime/config/test files and Git index were not modified by the assistant.

The former eight startup files totaled 199,462 bytes; state.json alone was 136,783 bytes and included extensive historical evidence. CURRENT and HANDOFF duplicated status. Oversized reads in the prior turn were truncated and followed by repeated reads. File sizes measure source volume, not exact billed tokens or account usage.

## Adopted workflow

AGENTS retains teaching, engineering and Git safeguards. START-HERE requires one current checkpoint, actual relevant source/diff and Git inspection, then expands into relevant roadmap/engineering sections before runtime guidance. Missing or conflicting evidence triggers targeted historical retrieval; token savings never justify guessing or bypassing gates.

The prior state.json is preserved byte-for-byte as ../archive/state-through-2026-10-17.json. The new schemaVersion 3 state is a small index, not an automated tracker API. CURRENT is a stable pointer. NEW-CHAT-PROMPT contains no stale status. The working agreement retains its historical rationale with precedence clarified; roadmap links continue to expose full scope and historical tasks. No memory files were changed.

## Evidence and pending action

Before these documentation edits, user supplied successful formatting and staged diff checks with exit 0. Assistant inspected all ten intended staged paths. Source checks/live probes remain prior-session evidence; see 2026-10-17-database-access-handoff.md. The new workflow docs need a fresh user-run formatting check and explicit staging. The existing index remains intact; current docs may differ from staged versions.

Assistant verification passed: SHA-256 of the archived tracker matches the pre-edit bytes; both JSON files parse; relative Markdown links in the changed policy/startup/checkpoint/learning docs resolve; no unstaged apps/packages changes exist. The staged diff remains the same ten paths with 189 insertions and 20 deletions; no Git mutation was performed. This is document integrity review, not project tests or an automated future enforcement system. No commit/push or model-usage savings has been measured.
