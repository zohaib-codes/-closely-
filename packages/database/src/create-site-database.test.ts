import { expect, test } from "vitest";
import { createSiteDatabase } from "./create-site-database.js";

const invalidNames = [
  "",
  "closely_",
  "alpha",
  "closely_Alpha",
  "closely_alpha-beta",
  "closely_alpha ",
  "closely_alpha\n",
  'closely_alpha"; DROP DATABASE postgres; --',
  `closely_${"a".repeat(57)}`,
  `closely_${"a".repeat(56)}`,
];

test.each(invalidNames)(
  "rejects invalid database name %j before connecting",
  async (databaseName) => {
    await expect(
      createSiteDatabase("not-a-valid-connection-url", databaseName),
    ).rejects.toThrow("INVALID_DATABASE_NAME");
  },
);
