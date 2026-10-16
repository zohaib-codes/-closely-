import { expect, test } from "vitest";
import { createSiteRole } from "./create-site-role.js";

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
  "rejects invalid role name %j before connecting",
  async (roleName) => {
    await expect(
      createSiteRole("not-a-valid-connection-url", roleName),
    ).rejects.toThrow("INVALID_SITE_ROLE_NAME");
  },
);
