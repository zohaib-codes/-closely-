import { Client, escapeIdentifier } from "pg";

function validateDatabaseName(databaseName: string): void {
  const allowedDatabaseNamePattern = /^closely_[a-z0-9_]{1,55}$/;
  if (
    databaseName !== databaseName.trim() ||
    !allowedDatabaseNamePattern.test(databaseName)
  ) {
    throw new Error("INVALID_DATABASE_NAME");
  }
}

export async function restrictSiteDatabaseAccess(
  connectionString: string,
  databaseName: string,
): Promise<void> {
  validateDatabaseName(databaseName);
  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 5000,
    query_timeout: 5000,
  });

  try {
    await client.connect();
    await client.query(
      `REVOKE ALL PRIVILEGES ON DATABASE ${escapeIdentifier(databaseName)} FROM PUBLIC`,
    );
    const verification = await client.query(
      `SELECT 1
           FROM pg_catalog.pg_database AS database
           WHERE database.datname = $1
             AND NOT EXISTS (
               SELECT 1
               FROM pg_catalog.aclexplode(
                 COALESCE(database.datacl, pg_catalog.acldefault('d', database.datdba))
               ) AS privileges
               WHERE privileges.grantee = 0
             )`,
      [databaseName],
    );
    if (verification.rows.length !== 1) {
      throw new Error("SITE_DATABASE_ACCESS_NOT_RESTRICTED");
    }
  } finally {
    await client.end();
  }
}
