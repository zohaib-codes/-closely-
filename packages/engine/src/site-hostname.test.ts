import { expect, test } from "vitest";
import { normalizeSiteHostname } from "./site-hostname.js";

test("lowercases a hostname and removes one terminal root dot", () => {
  expect(normalizeSiteHostname("ALPHA.Example.Test.")).toBe(
    "alpha.example.test",
  );
});

test("accepts single labels, leading digits and internal hyphens", () => {
  for (const hostname of ["localhost", "1alpha.test", "alpha-beta.test"]) {
    expect(normalizeSiteHostname(hostname)).toBe(hostname);
  }
});

test("accepts the maximum label and canonical hostname lengths", () => {
  const longestLabel = "a".repeat(63);
  const longestHostname = [
    longestLabel,
    longestLabel,
    longestLabel,
    "b".repeat(61),
  ].join(".");

  expect(longestHostname.length).toBe(253);
  expect(normalizeSiteHostname(longestLabel)).toBe(longestLabel);
  expect(normalizeSiteHostname(`${longestHostname}.`)).toBe(longestHostname);

  expect(() => normalizeSiteHostname(`${longestHostname}b`)).toThrow(
    "INVALID_SITE_HOSTNAME",
  );
});

test("rejects malformed and non-string hostname input", () => {
  const invalidInputs: unknown[] = [
    undefined,
    null,
    42,
    {},
    ["alpha.example.test"],
    "",
    ".",
    " alpha.example.test",
    "alpha.example.test ",
    "alpha.example.test\n",
    "https://alpha.example.test",
    "alpha.example.test:443",
    "alpha.example.test/path",
    "alpha.example.test@beta.example.test",
    "alpha..test",
    "alpha.test..",
    "-alpha.test",
    "alpha-.test",
    "alpha_test",
    "café.test",
    `${"a".repeat(64)}.test`,
  ];

  for (const input of invalidInputs) {
    expect(() => normalizeSiteHostname(input)).toThrow("INVALID_SITE_HOSTNAME");
  }
});
