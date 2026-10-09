# 2026-10-08 — Learning reset

## User instruction

The user wants to personally write every file and execute commands after learning their purpose, mechanics, libraries and engineering rationale. Delete the assistant-created scaffold and harness while retaining documentation and agent instructions. Keep the full Frappe-like framework and later ERP goal.

## Actions performed by the assistant

Removed apps/, packages/, tests/, tools/, infra/, artifacts/, business-apps/, node_modules/, .nx/, .github/, root package/lock/tooling configuration and the newly initialized empty .git directory. Git had zero commits and no remotes. Reference containers were already stopped; deleted only the task-owned frappe-ts-reference_bench and frappe-ts-reference_database volumes.

Preserved README.md, AGENTS.md and all existing docs/, including pinned upstream research snapshots. Updated current implementation claims, reset task state, retired the old scaffold handoff and added the learning agreement. Research snapshots remain reference evidence, not product code or required learner reading.

System Docker images, global tools and shared package caches were not purged. No project credential files or runtime fixtures remain.

## User progress and next lesson

No user-confirmed implementation step or completed lesson is recorded. Architecture documents are plans, not demonstrated understanding. All framework parity implementation and runtime verification remain pending.

Next: explain repository, packages, monorepo boundaries and the distinction between application entry points and reusable engine modules. Then explain the first foundation file and give one user action. Wait for the user's result before advancing. Never silently rebuild the discarded scaffold.

## Verification

Cleanup output confirmed root entries AGENTS.md, README.md and docs/. Docker confirmed deletion of both named volumes. Final read-only checks passed: all 29 pinned snapshot hashes match, maintained Markdown links resolve, tracker file references exist, and root contains only the three preserved entries. Docker listings confirm no task-owned reference containers or volumes remain. No project test suite exists.
