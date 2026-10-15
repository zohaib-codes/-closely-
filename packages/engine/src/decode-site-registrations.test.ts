import { expect, test } from "vitest";
import { decodeSiteRegistrations } from "./decode-site-registrations.js";
import { createSiteRegistry } from "./site-registry.js";

test("decodes valid registrations and permits an empty configuration", () => {
  const input: unknown = [
    {
      hostname: "ALPHA.EXAMPLE.TEST.",
      site: { siteName: "alpha" },
    },
  ];

  expect(decodeSiteRegistrations(input)).toEqual([
    {
      hostname: "ALPHA.EXAMPLE.TEST.",
      site: { siteName: "alpha" },
    },
  ]);
  expect(decodeSiteRegistrations([])).toEqual([]);
});

test("rejects malformed configuration without coercing values", () => {
  const invalidInputs: readonly unknown[] = [
    null,
    undefined,
    {},
    "[]",
    42,
    [null],
    [[]],
    [{}],
    [{ hostname: 42, site: { siteName: "alpha" } }],
    [{ hostname: "alpha.example.test", site: null }],
    [{ hostname: "alpha.example.test", site: [] }],
    [{ hostname: "alpha.example.test", site: {} }],
    [{ hostname: "alpha.example.test", site: { siteName: 42 } }],
    [{ hostname: "alpha.example.test", site: { siteName: "" } }],
    [{ hostname: "alpha.example.test", site: { siteName: " \t\n" } }],
  ];

  for (const input of invalidInputs) {
    expect(() => decodeSiteRegistrations(input)).toThrow(
      "INVALID_SITE_REGISTRATIONS",
    );
  }
});

test("rejects unknown keys and inherited registration fields", () => {
  const inheritedEntry: unknown = Object.create({
    hostname: "alpha.example.test",
    site: { siteName: "alpha" },
  });

  const invalidInputs: readonly unknown[] = [
    [
      {
        hostname: "alpha.example.test",
        site: { siteName: "alpha" },
        actor: { kind: "user", userName: "Administrator" },
      },
    ],
    [
      {
        hostname: "alpha.example.test",
        site: { siteName: "alpha", permissionBypass: true },
      },
    ],
    [inheritedEntry],
  ];

  for (const input of invalidInputs) {
    expect(() => decodeSiteRegistrations(input)).toThrow(
      "INVALID_SITE_REGISTRATIONS",
    );
  }
});

test("copies checked values without retaining input objects", () => {
  const entry = {
    hostname: "alpha.example.test",
    site: { siteName: "alpha" },
  };
  const input = [entry];

  const registrations = decodeSiteRegistrations(input);

  entry.hostname = "beta.example.test";
  entry.site.siteName = "beta";
  input.length = 0;

  expect(registrations).toEqual([
    {
      hostname: "alpha.example.test",
      site: { siteName: "alpha" },
    },
  ]);
});

test("leaves hostname grammar and duplicate rejection to the registry", () => {
  const malformedHostname = decodeSiteRegistrations([
    {
      hostname: "alpha.example.test/path",
      site: { siteName: "alpha" },
    },
  ]);

  expect(() => createSiteRegistry(malformedHostname)).toThrow(
    "INVALID_SITE_HOSTNAME",
  );

  const duplicateHostnames = decodeSiteRegistrations([
    {
      hostname: "alpha.example.test",
      site: { siteName: "alpha" },
    },
    {
      hostname: "ALPHA.EXAMPLE.TEST.",
      site: { siteName: "beta" },
    },
  ]);

  expect(() => createSiteRegistry(duplicateHostnames)).toThrow(
    "DUPLICATE_SITE_HOSTNAME",
  );
});
