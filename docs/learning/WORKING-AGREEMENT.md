# Learning and implementation agreement

Current concise policy lives in root AGENTS.md; startup follows ../progress/START-HERE.md. This document preserves detailed teaching rationale and dated decisions. Read relevant sections when needed; dated next-action statements are historical and never override the current HANDOFF.md.

Accepted from the user's correction on 2026-10-08. This overrides the earlier autonomous scaffolding workflow.

## Goal and ownership

Build a serious Frappe-like framework in TypeScript and later an ERPNext-like app. Learn production architecture, TypeScript, libraries, tools and engineering decisions by implementing them personally. The user writes code and executes commands; the assistant teaches and reviews. Keeping the full target does not require installing or creating everything at once.

## Each lesson

1. Explain the concrete problem and where it fits in the complete system.
2. Explain the chosen approach, reference behavior and alternatives with tradeoffs. Separate Frappe behavior, Twenty engineering examples and our adaptations.
3. Introduce only the files, concepts and dependencies needed for this step. Before first use, provide official documentation with specific sections and a reading goal. Explain what each package supplies, why it fits and what we still must implement ourselves.
4. Explain the code before asking the user to write it. Provide exact paths and commands, explain flags and expected results. Teach unfamiliar TypeScript and framework mechanics without assuming prior understanding.
5. Give one manageable working chunk, including its user-run verification, then wait for output. Avoid separate save-only confirmation turns for routine edits. Answer questions before moving on.
6. Review the user's actual result. Explain failures and guide corrections; do not silently fix implementation files.
7. Record what the user completed, verification evidence, open questions and the next lesson.

No unexplained generated files, silent installations, giant code dumps or autonomous scaffold/harness creation. Specific explicit user authorization can permit an assistant action, but ordinary requests to continue a lesson do not.

## Resume point

The original reset is historical. Resume from [current checkpoint](../progress/HANDOFF.md) and actual files, never automatically restart L00. The user has created initial manifests/dependencies and TS configurations; remaining source/check steps are tracked separately.

## Continuity

Progress is manually maintained in the progress documents. A discussed idea is not an implemented capability; written code is not verified behavior; a passing synthetic test is not Frappe parity. Record understanding only when the user communicates it. Consult archived references selectively to answer engineering questions; the user need not study upstream source.

## Teaching plan

Follow [ROADMAP.md](ROADMAP.md) and [READING-GUIDE.md](READING-GUIDE.md). Plan capability scope and acceptance gates in advance; expand exact lesson details before each stage. Reference measurements can correct assumptions, but architectural/scope changes must be explained, agreed and recorded. Never promise that all unknown details can be fixed in advance or that completing a checklist alone guarantees production stability or expert skill.

## Updated pacing preference

The user requested coding-led lessons on 2026-10-08. Explain briefly before each concrete action; reserve comprehension questions for the end of the coding session. Waiting for command results remains necessary for dependent steps, but conceptual quizzes are not prerequisites to starting. Begin with workspace/API package setup; weave Git and architecture explanations into the work. The user still writes files and runs commands.

## Faster pacing — 2026-10-11

User requested faster progress toward actual framework features. Default to a small coherent implementation chunk with its verification in one reply; user writes and runs everything. Keep explanations and official reading focused, avoid repeated save/review/run turns and redundant setup probes, and deepen teaching when asked or when a failure needs diagnosis. Preserve required milestone gates and evidence limits; do not silently declare preparation or parity complete. Prioritize prerequisites for the next useful feature and defer optional tooling exercises with explicit pending status.

## Preferred response style

Teach through the current implementation. Start with a brief concrete purpose, link focused official documentation before use, give exact paths and manageable code/commands, explain the important lines/options, then show expected verification and wait for the user's output. Stay friendly, direct and practical. Expand explanations when asked. Questions belong at the end of a coding session. Documentation updates may be performed by the assistant; source/config/install/build/test actions remain user-owned.

Refresh the compact progress checkpoint after meaningful changes and before switching chats. See [new-chat prompt](../progress/NEW-CHAT-PROMPT.md). A fresh chat must read those files and verify current evidence instead of assuming previous history.

## Explain the reason before the artifact — 2026-10-11 correction

User explicitly reports that creating engine/operation-context without understanding their purpose did not meet the teaching goal. Faster pacing never means assuming architecture knowledge. Before each new package/file, start with a concrete user action in the finished Frappe-like system, trace where the file participates, explain why the responsibility is separated and the practical failure this prevents. Use plain English; introduce technical terms only with an immediate explanation. Explain the engineering decision and alternatives before code. The aim is learning architecture and production workflows, not following folder/file instructions. Expand the explanation when needed rather than interpreting brevity as a requirement to omit the why. No comprehension quiz gate; no new coding action while answering this correction.

## Beginner-first architecture teaching — 2026-10-13

User has built simple CRUD websites and explicitly reports that code-led copying plus unfamiliar architecture vocabulary is not producing enough understanding. User accepted the following teaching change; it takes precedence over interpreting faster pacing as more code per reply.

- Begin with a familiar user action and a concrete example from a simple CRUD app. Explain new terms immediately in ordinary words; avoid unexplained phrases such as definition path, record path, composition root or boundary.
- Distinguish implemented behavior from future examples. Guest/user is the current actor representation; administrator in a future example describes permission/responsibility, not a newly implemented actor kind.
- Show the complete small feature journey, then mark existing, missing and connected-to-running-app pieces. Explain architecture as which part does which job and how they cooperate.
- Before naming the next file, explain the problem that makes it necessary, alternatives and why this responsibility belongs there. Show the next few steps and why their order makes sense. Make design decisions visible and invite user participation without quiz gates.
- Explain who actually calls each function. Test-only use is evidence of a working component, not a finished application feature. Do not keep accumulating disconnected helpers without explaining and planning their real use. Prefer a small observable end-to-end behavior when appropriate, preserving full Frappe scope and security requirements.
- Then assign one manageable user-owned edit/check step. Gradually leave small design/implementation decisions to the learner with support. Learning questions remain at session end.
- Current next action: pause new code and explain administrator versus actor kinds, model description versus an individual saved item, and why site/context functions currently have only test callers. Then walk through a familiar customer CRUD flow using actual files and agree on a small visible milestone. Raw metadata decoder is deferred, not removed from scope.

## Complete usable features first — 2026-10-13

User explicitly replaces the component-first lesson sequence with small complete feature journeys, similar to implementing create/save in a CRUD app across UI, API and database. Every work unit must have a visible outcome and an agreed completion checklist. Build the real storage, startup/request wiring, user interaction and meaningful failure handling needed for that outcome before switching to an unrelated feature. A command is a valid user interaction for a server administration feature; a browser feature includes its actual UI. Do not add disconnected helpers or diagnostic endpoints as substitutes for usable product behavior.

Explain the feature in ordinary language first, trace its full journey, map existing and missing parts, show the short implementation sequence and explain each file at its point of use. User still writes source and runs commands. Tests support the feature and do not replace demonstrating it in the running app. Complete means the agreed behavior works with its required failure cases; it does not mean every future extension of the whole subsystem is finished.

Roadmap lesson IDs remain scope and acceptance references, not a requirement to finish all components in milestone order before connecting a feature. Bring forward only the prerequisites needed for the chosen feature; preserve dependency/security gates, record outstanding scope and do not declare whole milestones or Frappe parity complete. This changes delivery sequence, not adopted architecture or full target scope.

The proposed /__debug/site detour is withdrawn. Proposed first real feature for scoping: create a local site with real PostgreSQL storage, persist its setup and reopen it after restarting the server. Exact command, schema, setup lifecycle and failure acceptance must be designed against pinned evidence before coding; this proposal is not yet an implemented or complete Frappe site lifecycle.

## Independent implementation — 2026-10-16

User requests exact next files and their purpose/behavior, without solution code, so they can attempt implementation independently. Default to a small specification, focused official reading and acceptance cases; review their attempt before supplying corrections. Do not provide implementation code unless requested. Preserve beginner-first complete-feature context.

## Git checkpoints — 2026-10-16

Follow the mandatory Git workflow in [AGENTS.md](../../AGENTS.md#git-workflow-branch-verify-commit-push-review-merge). Feature branches, coherent verified commits, frequent checkpoint pushes and reviewed PR merges are part of learning and feature completion. The assistant must raise the Git checkpoint before unrelated work or handoff instead of letting changes accumulate. User executes Git actions unless specifically delegated.

Immediate next lesson: preserve and review the existing accumulated work on main, move it safely to a feature/checkpoint branch, group it into honest reviewable commits, verify the combined state and push for review. Do not pretend this historical backlog was committed incrementally or that older partial test batches certify the whole present tree. No new runtime coding until this Git checkpoint is handled.
