import { expect, test } from "vitest";
import type { DocTypeDefinition } from "@closely/metadata";
import { createOperationContext, createSiteMetadataRegistry } from "./index.js";

function createDefinition(name: string, module: string) {
  return {
    name,
    module,
    fields: [],
  } satisfies DocTypeDefinition;
}

function createContext(siteName: string) {
  return createOperationContext({
    site: { siteName },
    actor: { kind: "guest" },
    operationId: `metadata-${siteName}`,
    source: "cli",
  });
}

test("selects different definitions using the operation site", () => {
  const alphaCustomer = createDefinition("Customer", "Alpha CRM");
  const betaCustomer = createDefinition("Customer", "Beta CRM");
  const registry = createSiteMetadataRegistry([
    { site: { siteName: "alpha" }, definitions: [alphaCustomer] },
    { site: { siteName: "beta" }, definitions: [betaCustomer] },
  ]);

  expect(registry.resolveDocType(createContext("alpha"), "Customer")).toEqual({
    kind: "resolved",
    definition: alphaCustomer,
  });
  expect(registry.resolveDocType(createContext("beta"), "Customer")).toEqual({
    kind: "resolved",
    definition: betaCustomer,
  });
});

test("does not fall back when a site or its model is absent", () => {
  const registry = createSiteMetadataRegistry([
    {
      site: { siteName: "alpha" },
      definitions: [createDefinition("Alpha Only", "CRM")],
    },
    { site: { siteName: "beta" }, definitions: [] },
  ]);

  expect(registry.resolveDocType(createContext("beta"), "Alpha Only")).toEqual({
    kind: "unknown_doctype",
  });
  expect(
    registry.resolveDocType(createContext("missing"), "Alpha Only"),
  ).toEqual({
    kind: "unknown_site",
  });
  expect(registry.resolveDocType(createContext("Alpha"), "Alpha Only")).toEqual(
    {
      kind: "unknown_site",
    },
  );
});

test("rejects duplicate and blank site bindings", () => {
  expect(() =>
    createSiteMetadataRegistry([
      { site: { siteName: "alpha" }, definitions: [] },
      { site: { siteName: "alpha" }, definitions: [] },
    ]),
  ).toThrow("DUPLICATE_METADATA_SITE");

  for (const siteName of ["", "   "]) {
    expect(() =>
      createSiteMetadataRegistry([{ site: { siteName }, definitions: [] }]),
    ).toThrow("INVALID_METADATA_SITE");
  }
});

test("preserves metadata admission and lookup validation", () => {
  expect(() =>
    createSiteMetadataRegistry([
      {
        site: { siteName: "alpha" },
        definitions: [createDefinition("X", "CRM")],
      },
    ]),
  ).toThrow("INVALID_DOCTYPE_NAME");

  const registry = createSiteMetadataRegistry([
    { site: { siteName: "alpha" }, definitions: [] },
  ]);

  expect(() => registry.resolveDocType(createContext("alpha"), 42)).toThrow(
    "INVALID_DOCTYPE_NAME",
  );
});

test("keeps site bindings and definitions after caller mutation", () => {
  const site = { siteName: "alpha" };
  const definition = createDefinition("Customer", "Original CRM");
  const definitions = [definition];
  const registrations = [{ site, definitions }];
  const registry = createSiteMetadataRegistry(registrations);

  site.siteName = "beta";
  definition.module = "Changed CRM";
  definitions.length = 0;
  registrations.length = 0;

  const result = registry.resolveDocType(createContext("alpha"), "Customer");

  if (result.kind !== "resolved") {
    throw new Error("Expected the original Customer definition");
  }

  expect(result.definition.module).toBe("Original CRM");
  expect(Object.isFrozen(result.definition)).toBe(true);
  expect(registry.resolveDocType(createContext("beta"), "Customer")).toEqual({
    kind: "unknown_site",
  });
});
