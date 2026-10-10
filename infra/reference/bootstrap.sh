#!/usr/bin/env bash
set -euo pipefail

cd /workspace

if [[ -e frappe-bench ]]; then
  echo "frappe-bench already exists; stop and review before retrying."
  exit 1
fi

bench init frappe-bench \
  --frappe-path https://github.com/frappe/frappe.git \
  --frappe-branch v16.51.0 \
  --python python3.14 \
  --skip-redis-config-generation \
  --skip-assets \
  --no-procfile \
  --no-backups

cd /workspace/frappe-bench

reference_commit=$(git -C apps/frappe rev-parse HEAD)
printf "Frappe source: %s\n" "$reference_commit"
test "$reference_commit" = "6b450a166e076dd842e4db7ea0843f62881e62ac"

bench set-config -g db_host db
bench set-config -g redis_cache redis://redis-cache:6379
bench set-config -g redis_queue redis://redis-queue:6379
bench set-config -g redis_socketio redis://redis-queue:6379

bench build

bench new-site reference.localhost \
  --db-type mariadb \
  --db-host db \
  --db-root-username root \
  --db-root-password closely-reference-only \
  --mariadb-user-host-login-scope "%" \
  --admin-password closely-reference-only \
  --set-default

bench version
bench --site reference.localhost list-apps