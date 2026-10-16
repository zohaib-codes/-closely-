import { checkPostgresConnection, createSiteDatabase } from "@closely/database";

async function main(): Promise<void> {
  const command = process.argv[2];
  const databaseName = process.argv[3];

  if (command !== "check-database" && command !== "create-site-database") {
    throw new Error("UNKNOWN_COMMAND");
  }

  if (command === "check-database" && process.argv.length !== 3) {
    throw new Error("INVALID_ARGUMENTS");
  }

  if (
    command === "create-site-database" &&
    (databaseName === undefined || process.argv.length !== 4)
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

  if (databaseName === undefined) {
    throw new Error("INVALID_ARGUMENTS");
  }

  await createSiteDatabase(connectionString, databaseName);
  console.log("SITE_DATABASE_CREATED");
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
  ]);

  if (error instanceof Error && safeCodes.has(error.message)) {
    console.error(error.message);
  } else if (process.argv[2] === "create-site-database") {
    console.error("SITE_DATABASE_CREATION_FAILED");
  } else {
    console.error("DATABASE_CHECK_FAILED");
  }

  process.exitCode = 1;
}
