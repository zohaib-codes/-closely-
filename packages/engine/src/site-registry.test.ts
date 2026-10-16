import { expect, test } from "vitest";
import { createSiteRegistry } from "./site-registry.js";

test("resolves two registered hostnames to their own sites", () => {
  const registry = createSiteRegistry([
    {
      hostname: "alpha.example.test",
      site: { siteName: "alpha" },
    },
    {
      hostname: "beta.example.test",
      site: { siteName: "beta" },
    },
  ]);

  expect(registry.resolveHostname("alpha.example.test")).toEqual({
    kind: "resolved",
    site: { siteName: "alpha" },
  });

  expect(registry.resolveHostname("beta.example.test")).toEqual({
    kind: "resolved",
    site: { siteName: "beta" },
  });

  expect(registry.resolveHostname("alpha.example.test")).toEqual({
    kind: "resolved",
    site: { siteName: "alpha" },
  });
});

test("returns an explicit failure for an unknown hostname", () => {
  const registry = createSiteRegistry([
    {
      hostname: "alpha.example.test",
      site: { siteName: "alpha" },
    },
  ]);

  expect(registry.resolveHostname("unknown.example.test")).toEqual({
    kind: "unknown_site",
  });
});

test("rejects duplicate hostname registrations", () => {
  expect(() =>
    createSiteRegistry([
      {
        hostname: "alpha.example.test",
        site: { siteName: "alpha" },
      },
      {
        hostname: "alpha.example.test",
        site: { siteName: "beta" },
      },
    ]),
  ).toThrow("DUPLICATE_SITE_HOSTNAME");
});

test("keeps its registration snapshot when input objects change", () => {
  const registration = {
    hostname: "alpha.example.test",
    site: { siteName: "alpha" },
  };

  const registry = createSiteRegistry([registration]);

  registration.hostname = "beta.example.test";
  registration.site.siteName = "beta";

  expect(registry.resolveHostname("alpha.example.test")).toEqual({
    kind: "resolved",
    site: { siteName: "alpha" },
  });

  expect(registry.resolveHostname("beta.example.test")).toEqual({
    kind: "unknown_site",
  });
});
test("normalizes both registered and lookup hostnames", () => {
  const registry = createSiteRegistry([
    {
      hostname: "ALPHA.Example.Test.",
      site: { siteName: "alpha" },
    },
  ]);

  expect(registry.resolveHostname("alpha.example.test")).toEqual({
    kind: "resolved",
    site: { siteName: "alpha" },
  });

  expect(registry.resolveHostname("ALPHA.EXAMPLE.TEST.")).toEqual({
    kind: "resolved",
    site: { siteName: "alpha" },
  });
});

test("rejects hostname duplicates after normalization", () => {
  expect(() =>
    createSiteRegistry([
      {
        hostname: "alpha.example.test",
        site: { siteName: "alpha" },
      },
      {
        hostname: "ALPHA.EXAMPLE.TEST.",
        site: { siteName: "beta" },
      },
    ]),
  ).toThrow("DUPLICATE_SITE_HOSTNAME");
});

test("distinguishes malformed input from a valid unknown hostname", () => {
  const registry = createSiteRegistry([
    {
      hostname: "alpha.example.test",
      site: { siteName: "alpha" },
    },
  ]);

  expect(() => registry.resolveHostname("alpha.example.test/path")).toThrow(
    "INVALID_SITE_HOSTNAME",
  );

  expect(registry.resolveHostname("unknown.example.test")).toEqual({
    kind: "unknown_site",
  });
});
