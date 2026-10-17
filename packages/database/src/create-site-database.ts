import { Client, DatabaseError, escapeIdentifier } from "pg";

function validateDatabaseNameAndOwnerRoleName(
  name: string,
  ownerRoleName: string,
): void {
  const allowedNamePattern = /^closely_[a-z0-9_]{1,55}$/;

  if (name !== name.trim() || !allowedNamePattern.test(name)) {
    throw new Error("INVALID_DATABASE_NAME");
  } else if (
    ownerRoleName !== ownerRoleName.trim() ||
    !allowedNamePattern.test(ownerRoleName)
  ) {
    throw new Error("INVALID_SITE_ROLE_NAME");
  }
}

export async function createSiteDatabase(
  connectionString: string,
  databaseName: string,
  ownerRoleName: string,
): Promise<void> {
  validateDatabaseNameAndOwnerRoleName(databaseName, ownerRoleName);

  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 5000,
    query_timeout: 5000,
  });

  try {
    await client.connect();

    const ownerResult = await client.query(
      "SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = $1",
      [ownerRoleName],
    );

    if (ownerResult.rows.length === 0) {
      throw new Error("SITE_OWNER_NOT_FOUND");
    }

    await client.query(
      `CREATE DATABASE ${escapeIdentifier(databaseName)}
      OWNER ${escapeIdentifier(ownerRoleName)}
      ALLOW_CONNECTIONS false
      TEMPLATE template0`,
    );
  } catch (error: unknown) {
    if (error instanceof DatabaseError && error.code === "42P04") {
      throw new Error("DATABASE_ALREADY_EXISTS", { cause: error });
    }

    throw error;
  } finally {
    await client.end();
  }
}
