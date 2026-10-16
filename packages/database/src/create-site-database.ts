import { Client, DatabaseError, escapeIdentifier } from "pg";

function validateDatabaseName(name: string): void {
  const allowedNamePattern = /^closely_[a-z0-9_]{1,56}$/;

  if (name !== name.trim() || !allowedNamePattern.test(name)) {
    throw new Error("INVALID_DATABASE_NAME");
  }
}

export async function createSiteDatabase(
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
      `CREATE DATABASE ${escapeIdentifier(databaseName)} TEMPLATE template0`,
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
