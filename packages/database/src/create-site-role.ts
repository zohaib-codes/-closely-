import { Client, escapeIdentifier, DatabaseError } from "pg";

function validateRoleName(roleName: string): void {
  const allowedRoleNamePattern = /^closely_[a-z0-9_]{1,55}$/;
  if (roleName !== roleName.trim() || !allowedRoleNamePattern.test(roleName)) {
    throw new Error("INVALID_SITE_ROLE_NAME");
  }
}

export async function createSiteRole(
  connectionString: string,
  roleName: string,
): Promise<void> {
  validateRoleName(roleName);

  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 5000,
    query_timeout: 5000,
  });

  try {
    await client.connect();
    await client.query(`CREATE ROLE ${escapeIdentifier(roleName)}
    WITH
    NOLOGIN
    NOSUPERUSER
    NOCREATEDB
    NOCREATEROLE
    NOREPLICATION
    NOBYPASSRLS
    `);
  } catch (error: unknown) {
    if (error instanceof DatabaseError && error.code === "42710") {
      throw new Error("SITE_ROLE_ALREADY_EXISTS", { cause: error });
    }
    throw error;
  } finally {
    await client.end();
  }
}
