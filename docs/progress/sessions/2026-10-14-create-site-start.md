# Create and reopen a local site — first setup step

Date: 2026-10-14. Feature-first teaching; user owns implementation and commands.

## Purpose and scope

Create a local site with real separate PostgreSQL storage and persistent setup; reopen and verify database access after restart. CLI is the intended administration interface. Exact command/schema/config persistence design remains to be expanded before edits. Completion must include duplicate rejection, safe failure/partial-state handling and two-site non-overlap checks. Empty database creation alone is not full Frappe new-site parity; initial framework tables and actual saved identity/setup must be defined and exercised. No debug-only endpoint as the feature outcome.

Site setup describes how to locate/open the site's database; tenant data belongs inside that database. PostgreSQL server is a running service and can host separate Alpha/Beta databases. In-memory hostname maps must be reconstructed from saved setup after restart. Exact secret storage and control registry implementation not yet selected.

## Evidence and roadmap

Read-only project docs and files: PostgreSQL/pg/Kysely, separate database per site already adopted. infra/reference/compose.yaml is the separate Frappe MariaDB stack; no Closely database adapter/runtime Compose exists in reviewed tree. Pinned Frappe installer.py at6b450a166e076dd842e4db7ea0843f62881e62ac reviewed: new site creates directories/config/database, bootstraps database and installs framework app. Source evidence only, not runtime parity.

Feature maps to OPS-001 and brings forward focused M8.01/M8.02 plus M1.06/M1.08/M1.10 prerequisites under the accepted feature-first sequence. Full milestone gates and scope retained.

## Assigned

User runs docker version, docker compose version, docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}'. Purpose: current client/daemon availability, Compose version and existing running container ports before assigning persistent PostgreSQL setup. Official Docker command descriptions linked and explained. No output received, no runtime changes/install/build/test commands run by assistant. Last completed implementation remains metadata25/engine26/API8 batch.

## Docker evidence and PostgreSQL assignment

User Docker output confirms Engine client/server29.8.2 linux/amd64, Compose5.6.0 and no running containers. Assigned next: user creates infra/development/compose.yaml for closely-development PostgreSQL18.6-bookworm pinned sha256:afc7e2d441324c0388fa80c3d24f733b4194a4eb7f47dd8ee2b08eb1a24a647c; loopback15432->5432, development-only bootstrap superuser/password, default postgres DB, named postgres-data at /var/lib/postgresql, pg_isready healthcheck. User validates Compose, starts with --wait, checks ps and executes SQL version/current_database/current_user. No output received yet; no PostgreSQL start/query/persistence success claimed. Restart persistence and limited site-specific roles remain next feature work.

Official PostgreSQL version table and Docker image tag/remote manifest metadata consulted live;18.6 supported and published. PostgreSQL18 image volume mount is /var/lib/postgresql. Source tree inspected read-only: no development Compose file yet. Fixed local development password is deliberately public sample, not deployment credentials. Bootstrap role is database superuser for local setup, not Closely Administrator actor or future runtime role. No new npm dependency. Assistant modified progress docs only.
