import {
  checkPostgresConnection,
  createSiteDatabase,
  createSiteRole,
} from "@closely/database";

async function main(): Promise<void> {
  const command = process.argv[2];
  const databaseName = process.argv[3];
  const ownerRoleName = process.argv[4];
  const roleName = process.argv[3];
  if (
    command !== "check-database" &&
    command !== "create-site-database" &&
    command !== "create-site-role"
  ) {
    throw new Error("UNKNOWN_COMMAND");
  }

  if (command === "check-database" && process.argv.length !== 3) {
    throw new Error("INVALID_ARGUMENTS");
  }

  if (
    command === "create-site-database" &&
    (databaseName === undefined ||
      ownerRoleName === undefined ||
      process.argv.length !== 5)
  ) {
    throw new Error("INVALID_ARGUMENTS");
  }
  if (
    command === "create-site-role" &&
    (roleName === undefined || process.argv.length !== 4)
  ) {
    throw new Error("INVALID_ARGUMENTS");
  }

  const connectionString = process.env["CLOSELY_DATABASE_URL"];

  if (connectionString === undefined || connectionString.trim().length === 0) {
    throw new Error("DATABASE_URL_REQUIRED");
  }

  if (command === "check-database") {
    await checkPostgresConnection(connectionString);
    console.log("DATABASE_CONNECTION_OK");
    return;
  }

  if (command === "create-site-database") {
    if (databaseName === undefined || ownerRoleName === undefined) {
      throw new Error("INVALID_ARGUMENTS");
    }

    await createSiteDatabase(connectionString, databaseName, ownerRoleName);
    console.log("SITE_DATABASE_CREATED");
    return;
  }

  if (command === "create-site-role") {
    if (roleName === undefined) {
      throw new Error("INVALID_ARGUMENTS");
    }

    await createSiteRole(connectionString, roleName);
    console.log("SITE_ROLE_CREATED");
    return;
  }
}

try {
  await main();
} catch (error: unknown) {
  const safeCodes = new Set([
    "UNKNOWN_COMMAND",
    "INVALID_ARGUMENTS",
    "DATABASE_URL_REQUIRED",
    "INVALID_DATABASE_NAME",
    "DATABASE_ALREADY_EXISTS",
    "INVALID_SITE_ROLE_NAME",
    "SITE_ROLE_ALREADY_EXISTS",
  ]);

  if (error instanceof Error && error.message === "SITE_OWNER_NOT_FOUND") {
    console.error(
      "SITE_OWNER_NOT_FOUND: The specified database owner role does not exist. Create the owner role first, then retry.",
    );
  } else if (error instanceof Error && safeCodes.has(error.message)) {
    console.error(error.message);
  } else if (process.argv[2] === "create-site-database") {
    console.error("SITE_DATABASE_CREATION_FAILED");
  } else if (process.argv[2] === "create-site-role") {
    console.error("SITE_ROLE_CREATION_FAILED");
  } else {
    console.error("DATABASE_CHECK_FAILED");
  }

  process.exitCode = 1;
}
