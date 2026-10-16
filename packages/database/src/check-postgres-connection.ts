import { Client } from "pg";

export async function checkPostgresConnection(
  connectionString: string,
): Promise<void> {
  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 5000,
    query_timeout: 5000,
  });

  try {
    await client.connect();
    await client.query("SELECT 1");
  } finally {
    await client.end();
  }
}
