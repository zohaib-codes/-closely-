import { createOperationContext, createSiteRegistry } from "@closely/engine";
import type { OperationContext, SiteRegistry } from "@closely/engine";
import { expect, test } from "vitest";
import { createApi } from "./app.js";
import { resolveRequestSite } from "./resolve-request-site.js";

function createSiteTestApi() {
  const api = createApi();
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
  const reachedSites: string[] = [];

  const reachedContexts: OperationContext[] = [];

  api.get("/__test/context", (request) => {
    const context = createOperationContext({
      site: resolveRequestSite(request, registry),
      actor: { kind: "guest" },
      operationId: request.id,
      source: "http",
    });

    reachedContexts.push(context);
    return context;
  });

  api.get("/__test/site", (request) => {
    const site = resolveRequestSite(request, registry);
    reachedSites.push(site.siteName);
    return { siteName: site.siteName };
  });

  return { api, reachedSites, reachedContexts };
}

test("resolves two request hosts without accepting site overrides", async () => {
  const { api, reachedSites } = createSiteTestApi();

  try {
    const [alpha, beta] = await Promise.all([
      api.inject({
        method: "GET",
        url: "/__test/site",
        headers: {
          host: "ALPHA.EXAMPLE.TEST.:3000",
          "x-forwarded-host": "beta.example.test",
          "x-frappe-site-name": "beta",
        },
      }),
      api.inject({
        method: "GET",
        url: "/__test/site",
        headers: { host: "beta.example.test" },
      }),
    ]);

    expect(alpha.statusCode).toBe(200);
    expect(alpha.json<unknown>()).toEqual({ siteName: "alpha" });
    expect(beta.statusCode).toBe(200);
    expect(beta.json<unknown>()).toEqual({ siteName: "beta" });
    expect(reachedSites.sort()).toEqual(["alpha", "beta"]);
  } finally {
    await api.close();
  }
});

test("rejects an unknown host despite forged forwarding headers", async () => {
  const { api, reachedSites } = createSiteTestApi();

  try {
    const response = await api.inject({
      method: "GET",
      url: "/__test/site",
      headers: {
        host: "unknown.example.test",
        "x-forwarded-host": "alpha.example.test",
        "x-frappe-site-name": "alpha",
      },
    });

    expect(response.statusCode).toBe(404);
    expect(response.json<unknown>()).toMatchObject({
      code: "UNKNOWN_SITE",
      message: "UNKNOWN_SITE",
    });
    expect(reachedSites).toEqual([]);
  } finally {
    await api.close();
  }
});

test("rejects malformed host authorities before reaching site work", async () => {
  const { api, reachedSites } = createSiteTestApi();

  try {
    for (const host of [
      "alpha.example.test:abc",
      "alpha.example.test:0",
      "alpha.example.test:65536",
      "alpha.example.test:",
      "alpha.example.test/path",
      "alpha..test",
      "alpha.example.test:443:444",
    ]) {
      const response = await api.inject({
        method: "GET",
        url: "/__test/site",
        headers: { host },
      });

      expect(response.statusCode).toBe(400);
      expect(response.json<unknown>()).toMatchObject({
        code: "INVALID_HOST",
        message: "INVALID_HOST",
      });
    }

    expect(reachedSites).toEqual([]);
  } finally {
    await api.close();
  }
});

test("process liveness does not require a registered site", async () => {
  const { api, reachedSites } = createSiteTestApi();

  try {
    const response = await api.inject({
      method: "GET",
      url: "/health/live",
      headers: { host: "unknown.example.test" },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json<unknown>()).toEqual({ status: "ok" });
    expect(reachedSites).toEqual([]);
  } finally {
    await api.close();
  }
});

test("does not translate an unexpected registry failure into bad input", () => {
  const unexpectedError = new Error("REGISTRY_UNAVAILABLE");
  const registry: SiteRegistry = {
    resolveHostname() {
      throw unexpectedError;
    },
  };

  expect(() =>
    resolveRequestSite({ headers: { host: "alpha.example.test" } }, registry),
  ).toThrow(unexpectedError);
});

test("constructs separate Guest contexts for two HTTP requests", async () => {
  const { api, reachedContexts } = createSiteTestApi();

  try {
    const responses = await Promise.all(
      ["alpha", "beta"].map((siteName) =>
        api.inject({
          method: "GET",
          url: "/__test/context",
          headers: {
            host: `${siteName}.example.test`,
            "x-user-name": "Administrator",
          },
        }),
      ),
    );

    for (const response of responses) {
      expect(response.statusCode).toBe(200);
      expect(response.json<unknown>()).toMatchObject({
        actor: { kind: "guest" },
        source: "http",
      });
    }

    expect(reachedContexts).toHaveLength(2);
    expect(
      reachedContexts.map((context) => context.site.siteName).sort(),
    ).toEqual(["alpha", "beta"]);
    expect(
      new Set(reachedContexts.map((context) => context.operationId)).size,
    ).toBe(2);

    for (const context of reachedContexts) {
      expect(context.operationId.trim().length).toBeGreaterThan(0);
      expect(Object.isFrozen(context)).toBe(true);
    }
  } finally {
    await api.close();
  }
});
