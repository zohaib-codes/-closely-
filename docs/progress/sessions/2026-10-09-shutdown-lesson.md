# Shutdown lesson — 2026-10-09

User performed: wrote server.ts and reported silent API typecheck completion. Recorded as user-reported pass.

Checked: read-only review confirms intended server.ts listener and startup catch. No assistant implementation/build/test execution.

Explained / next supplied: graceful close, SIGINT/SIGTERM, duplicate guard, signal literal union, Promise<void>, internally handled async callback, 10-second unref watchdog. Timer intentionally remains armed after close to catch lingering handles without holding a healthy process open. Forced exit can truncate pending work/logs; chosen only at deadline. Signal listeners installed after successful listen to avoid startup/close race in this lesson.

Pending: user adds shutdown code and reports new typecheck result. Then verify runtime liveness and signals; deadline/failure behavior needs separate evidence. No parity claim. No conceptual questions supplied.

Maintained state.json, CURRENT.md and HANDOFF.md; source unchanged by assistant.
