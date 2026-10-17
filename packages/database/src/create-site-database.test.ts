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
      createSiteDatabase(
        "not-a-valid-connection-url",
        databaseName,
        "closely_beta",
      ),
    ).rejects.toThrow("INVALID_DATABASE_NAME");
  },
);

test.each(invalidNames)(
  "rejects invalid owner role name %j before connecting",
  async (ownerRoleName) => {
    await expect(
      createSiteDatabase(
        "not-a-valid-connection-url",
        "closely_beta",
        ownerRoleName,
      ),
    ).rejects.toThrow("INVALID_SITE_ROLE_NAME");
  },
);

test("validates the database name before the owner role name", async () => {
  await expect(
    createSiteDatabase("not-a-valid-connection-url", "alpha", "beta"),
  ).rejects.toThrow("INVALID_DATABASE_NAME");
});
