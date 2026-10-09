# First runtime start — 2026-10-09

User performed: reported silent typecheck after shutdown code.

Checked: read-only server.ts review confirms intended logic. Cosmetic extra indentation on SIGINT registration; no functional correction required. No assistant runtime/build/check execution.

Explained / next action: tsx development runner executes TypeScript without typechecking; pnpm exec uses installed binary. User runs pnpm exec tsx apps/api/src/server.ts from project root and leaves process running. Expected listening log for 127.0.0.1:3000; await actual output.

Remaining: startup, HTTP liveness, SIGINT/SIGTERM, deadline and failure behavior unverified. No new conceptual questions reported; parity unchanged. Progress summaries refreshed.

## Runtime evidence update

User supplied incoming/completed Fastify logs for GET / and /favicon.ico, both 404. Explained that only /health/live was registered; browser favicon request is ordinary. Listener handling is evidenced; health success is not. API remains running per latest evidence. Next action: user opens /health/live and supplies body and statusCode; expected JSON status ok and HTTP 200. Shutdown verification remains pending.

## Liveness passed

User supplied {"status":"ok"} browser response and req-3 incoming GET /health/live plus completion statusCode 200. Recorded pass for HTTP liveness. Earlier favicon 404 remains expected and unrelated.

Next explained action: press Ctrl+C once; signal should start guarded shutdown, await Fastify close and permit natural exit. Ask for logs and prompt return. No signal, deadline or active-request draining success assumed. Server not yet reported stopped.

## SIGINT passed

User supplied startup PID 85959, SIGINT shutdown started/completed logs and shell prompt return. Normal Ctrl+C shutdown verified; exit status not provided. Last observed run stopped.

Next lesson check: restart API, obtain fresh logged PID, send kill -s TERM PID from second terminal. Explain process ID, Bash kill -s signal selection, and SIGTERM graceful request. Never reuse historical PID. Await logs/prompt; other failure/deadline/draining cases still unverified.

## SIGTERM passed

User supplied startup PID 86556, SIGTERM shutdown started/completed and returned prompt. Normal SIGTERM shutdown verified; process stopped. Exit status not supplied.

Next explained check: occupied port startup failure. Run first API instance in terminal A, same command in B; expect API startup failed / EADDRINUSE and B exit. Immediately echo $? to observe failure status 1. Keep A running until cleanup instruction after results. Active-request draining and deadline/failure behavior unverified.

## Occupied-port startup failure passed

User supplied first listener PID 87220; second PID 87395 logged EADDRINUSE / API startup failed; echo $? returned 1. Recorded failure-path pass. First listener remains running per latest output.

Next action: Ctrl+C in terminal A, immediately echo $? after prompt return, report logs/status. Expected successful graceful exit 0; do not assume cleanup or exit status until supplied. No active-request drain/deadline/failure verification.

## Cleanup and session checkpoint

User confirmed echo $? returned 0 after instructed terminal A Ctrl+C cleanup. Recorded successful exit and stopped instance by user report; no new shutdown logs supplied. No project server known running.

Manual checks now cover liveness response/status, normal SIGINT/SIGTERM shutdown, occupied-port startup failure exit 1 and successful shutdown exit 0. Active-request draining and watchdog/failure paths remain unverified; automated coverage absent. M0 and all parity statuses remain incomplete/unchanged.

Next single coding lesson: first automated API behavior test, using planned Vitest and Fastify inject. Before installation inspect actual dependencies and verify official version/compatibility; explain tooling purpose and one user action. Optional recap prompts about factory/listener separation and exitCode/exit are not gates.

## User recap

User correctly explained app.ts creates/configures routes and server.ts starts the server. User described process.exit as immediate; described exitCode as allowing synchronous work and reporting process finished. Clarified that exitCode only sets eventual status, does not stop/report completion itself, and permits pending asynchronous work that keeps Node alive. Clarification understanding not assumed confirmed. Next coding lesson unchanged: automated API behavior test.
