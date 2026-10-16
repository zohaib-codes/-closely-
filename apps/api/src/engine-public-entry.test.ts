import { createSiteRegistry, decodeSiteRegistrations } from "@closely/engine";
import type { SiteRegistry } from "@closely/engine";
import { expect, test } from "vitest";

test("API can consume the engine public registry entry", () => {
  const configuration: unknown = [
    {
      hostname: "alpha.example.test",
      site: { siteName: "alpha" },
    },
  ];

  const registry: SiteRegistry = createSiteRegistry(
    decodeSiteRegistrations(configuration),
  );

  expect(registry.resolveHostname("ALPHA.EXAMPLE.TEST.")).toEqual({
    kind: "resolved",
    site: { siteName: "alpha" },
  });

  expect(registry.resolveHostname("unknown.example.test")).toEqual({
    kind: "unknown_site",
  });
});
