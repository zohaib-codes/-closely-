# Project architecture/file tour

Date: 2026-10-12.

User requested explanation of every folder and file in apps/packages and how connections work, using a map expanded gradually, before further implementation. No new source edits/checks assigned. Read-only inspected authored files, source imports/manifests/configurations, generated-output inventory and test route setup.

First explanation covers apps versus reusable packages, five existing folders, every apps/api authored file, dist generated outputs, server/app separation and current liveness request cycle. Source connections distinguish actual production liveness from test-only site/context routes and Desk not yet calling API. Growing map: docs/learning/PROJECT-MAP.md.

Next: Desk browser startup with index.html -> main.tsx -> App.tsx, Vite/compiler/package responsibilities, then contracts, engine, metadata and combined flow. Full tour pending; no understanding assumed from delivery. M1.03 naming implementation checkpoint retained until tour complete. Progress/map/session documents only changed by assistant; formatting unchecked after updates.

## User-selected engine expansion

User chose packages/engine instead of Desk. All current engine authored files/configs/test responsibilities and generated JS/declarations inspected and explained. Map expanded with setup decoder/registry path and per-operation HTTP adapter/lookup/context path, explicit actor origin, public exports and current wiring limits. Remaining tour folders follow user choice; metadata naming checkpoint retained. No source changes/check execution or demonstrated understanding inferred.

## Return to coding

User reports understanding engine tour and requests actual coding. Remaining folder walkthroughs deferred by user; return to M1.03 duplicate field-name validation. Tour is not claimed complete or independently assessed.
