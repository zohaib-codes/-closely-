# Git foundation — 2026-10-10

## Learning evidence
User correctly answers contracts recap: generated dist/health.d.ts supplies HealthResponse, type-only import is erased, workspace:* ensures local workspace resolution. L06/L04 foundation example and recap complete; M0 incomplete. Prior check evidence levels remain unchanged.

## Read-only review
git status and rev-parse report no Git repository in this checkout or parents. File inventory finds no root .gitignore or nx.json. No implementation/check commands run; Git not initialized by assistant.

## Explained and pending
L01 selected from roadmap before task/cache tooling. Explain history versus current files, generated output versus maintained source, and ignore-directory matching. Official Git gitignore Description/Pattern Format linked. User action: root .gitignore with node_modules/ and dist/; source review pending. Root lockfile, manifests, source and docs remain intended history inputs. Next dependent steps: user Git initialization, ignore verification, deliberate staging/diff/first commit, one action at a time. No comprehension gate before coding.

## Ignore file reviewed; initialization assigned
User reports .gitignore created; read-only content confirms node_modules/ and dist/. Next user command: git init --initial-branch=main from workspace root. Explain .git metadata, working files versus commits, initial branch name and local repository creation. Official installed Git 2.43.0 git-init Description/--initial-branch documentation linked. Command/output pending. No staging, commit, remote or assistant initialization.

## Git initialized; ignore verification assigned
User supplied initialization success; read-only symbolic-ref confirms main and status has untracked files only. Next user action: git check-ignore --verbose --non-matching node_modules/ apps/api/node_modules/ apps/api/dist/app.js packages/contracts/dist/health.d.ts apps/api/src/app.ts pnpm-lock.yaml. Explain verbose source/line/pattern and nonmatching empty fields. Expect dependencies/emission ignored and source/lock unignored. Actual output pending; no staging/commit performed. Official git-check-ignore 2.43 docs linked.

## Ignore verification passed; staging assigned
User supplies exact expected check-ignore matches: root/API node_modules line 1, API/contracts dist line 2; source and lockfile :: unignored. Next manageable action: git add .gitignore then git diff --cached -- .gitignore, supplying diff. Explain working tree/index/commit and staged content snapshot; --cached compares index with last commit (empty tree before first commit), -- ends options. Only ignore file staged for this first learning step; no broad staging or commit assigned. Official git-add/git-diff 2.43 docs linked.

## First staged diff reviewed
User supplies expected new-file diff for .gitignore, showing no final newline; output is in pager (END). Read-only index inventory confirms only .gitignore staged. Explain q to exit pager and git --no-pager for next diff. Next user step: add final newline after dist/, save, restage .gitignore, inspect staged diff without pager. This illustrates index content does not automatically update on edits. Updated diff/first commit pending; no assistant edits to ignore or index.

## Newline still absent
User supplies restaged diff still showing no newline; read-only bytes confirm saved file itself lacks newline. Restaging worked on unchanged saved content. Next user action uses exact printf rewrite of known two-rule ignore file including final newline, then add/diff. Explain printf newline escapes and > replacing this file; no other content exists to preserve. Updated diff/commit pending.

## Staged newline corrected; identity pending
User supplies corrected staged diff without newline marker; only .gitignore staged on read-only review. Read-only git var GIT_AUTHOR_IDENT unavailable (checked without printing identity). Before first commit, user sets local author name/email of their choice using git config --local. Explain commit attribution, local scope in .git/config and no login requirement. Official git-config 2.43 user.name/user.email/--local documentation linked. No identity values chosen/stored in progress docs; configuration/result/commit pending.

## Identity verified; first commit assigned
User reports identity configuration done. Read-only git var confirms usable author identity; values not displayed or retained. Staged inventory confirms only .gitignore. Next user action: git commit -m "chore: ignore dependencies and build output". Explain commit saves index snapshot, metadata/message and identifier; -m supplies message, chore convention describes maintenance. Commit output pending; remaining project files not yet saved in history. No assistant Git mutations.

## First commit verified; foundation staging assigned
User supplies root commit bcf7bac (ignore rules, one file/two lines); read-only log confirms. Status shows other project files untracked. Inventory shows expected API/contracts source/manifests/configs. Next user action: stage root package manifest/workspace/lock/shared TS config and apps/api/packages/contracts, then inspect cached --stat. Expect 13 foundation files, no dist/node_modules. Docs/README/AGENTS remain future snapshot; no first-foundation commit yet. Explain --stat file/line summary and that staging does not execute or verify checks. Staged scope output pending.

## Foundation staged content reviewed; commit assigned
User supplies 13-file/1878-line staged stat. Read-only staged source/config and index inventory match intended foundation; no generated/install artifacts. Existing inconsistent formatting/final newlines deferred to formatting lesson. No new runtime or check result inferred from staging/review. Next user command: git commit -m "feat: add API foundation and shared health contract". Explain feat message denotes added behavior, not full M0/parity completion; commit output pending. Documentation snapshot follows.

## Foundation commit verified; documentation snapshot prepared
User supplies 8ba5d24 foundation commit (13 files/1878 insertions); read-only log confirms. Only AGENTS.md/README.md/docs remain untracked. Inventory/provenance inspected: engineering/learning/progress/parity/research evidence; upstream snapshots remain reference material outside product packages. README stale empty-app/no-runtime description corrected to current foundation and honest evidence limits. Next user action: git add AGENTS.md README.md docs, then cached --stat; staged review/commit pending. Assistant edits documentation only, no Git mutations.

## Documentation staged scope and identities reviewed
Pasted attachment supplies staging/stat: 79 files, 21492 insertions. Read-only index inventory matches intended AGENTS/README/docs scope; 29 staged reference snapshot blobs hash-match staged reference-lock.json. Source identity check is not live reference attestation/parity. Assistant updates progress docs with review; user must restage docs/progress before docs commit. Next: git add docs/progress then git commit -m "docs: preserve engineering guidance and learning checkpoints"; commit output pending. No assistant Git mutation.
