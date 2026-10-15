import { expect, test } from "vitest";
import { createDocTypeDefinition } from "./create-doctype-definition.js";
import type { DocTypeDefinition } from "./doctype-definition.js";
import { createDocTypeRegistry } from "./doctype-registry.js";

function createDefinitionInput(name: string, label: string) {
  return {
    name,
    module: "CRM",
    fields: [
      {
        fieldname: "",
        fieldtype: "Data",
        label,
        reqd: true,
        read_only: false,
        unique: false,
      },
    ],
  } satisfies DocTypeDefinition;
}

test("resolves registered models to their normalized definitions", () => {
  const customer = createDefinitionInput("Customer", "Customer Name");
  const supplier = createDefinitionInput("Supplier", "Supplier Name");
  const registry = createDocTypeRegistry([customer, supplier]);

  expect(registry.resolveDocType("Customer")).toEqual({
    kind: "resolved",
    definition: createDocTypeDefinition(customer),
  });
  expect(registry.resolveDocType("Supplier")).toEqual({
    kind: "resolved",
    definition: createDocTypeDefinition(supplier),
  });
});

test("distinguishes unknown models from malformed lookup names", () => {
  const registry = createDocTypeRegistry([
    createDefinitionInput("Customer", "Customer Name"),
  ]);

  for (const name of ["Missing Model", "customer"]) {
    expect(registry.resolveDocType(name)).toEqual({
      kind: "unknown_doctype",
    });
  }

  expect(createDocTypeRegistry([]).resolveDocType("Customer")).toEqual({
    kind: "unknown_doctype",
  });

  for (const name of ["", " Customer", 42]) {
    expect(() => registry.resolveDocType(name)).toThrow("INVALID_DOCTYPE_NAME");
  }
});

test("rejects duplicate logical DocType names", () => {
  const inputs = [
    createDefinitionInput("Customer", "Customer Name"),
    createDefinitionInput("Customer", "Different Field"),
  ];
  const before = structuredClone(inputs);

  expect(() => createDocTypeRegistry(inputs)).toThrow("DUPLICATE_DOCTYPE_NAME");
  expect(inputs).toEqual(before);
});

test("runs definition validation during registration", () => {
  expect(() =>
    createDocTypeRegistry([createDefinitionInput("X", "Title")]),
  ).toThrow("INVALID_DOCTYPE_NAME");

  expect(() =>
    createDocTypeRegistry([createDefinitionInput("Customer", "Invalid-Field")]),
  ).toThrow("INVALID_DOCFIELD_NAME");
});

test("keeps frozen snapshots when caller-owned inputs change", () => {
  const input = createDefinitionInput("Customer", "Customer Name");
  const expected = createDocTypeDefinition(input);
  const inputs = [input];
  const registry = createDocTypeRegistry(inputs);

  input.name = "Changed Customer";

  for (const field of input.fields) {
    field.label = "Changed Label";
  }

  input.fields.length = 0;
  inputs.length = 0;

  const resolution = registry.resolveDocType("Customer");

  if (resolution.kind !== "resolved") {
    throw new Error("Expected Customer to remain registered");
  }

  expect(resolution.definition).toEqual(expected);
  expect(Object.isFrozen(resolution.definition)).toBe(true);
  expect(Object.isFrozen(resolution.definition.fields)).toBe(true);

  for (const field of resolution.definition.fields) {
    expect(Object.isFrozen(field)).toBe(true);
    expect(() => Object.assign(field, { label: "Changed" })).toThrow(TypeError);
  }

  expect(registry.resolveDocType("Changed Customer")).toEqual({
    kind: "unknown_doctype",
  });
});

test("keeps independent registry collections without fallback", () => {
  const alphaCustomer = createDefinitionInput("Customer", "Alpha Name");
  const betaCustomer = createDefinitionInput("Customer", "Beta Name");

  const alphaRegistry = createDocTypeRegistry([
    alphaCustomer,
    createDefinitionInput("Alpha Only", "Alpha Code"),
  ]);
  const betaRegistry = createDocTypeRegistry([betaCustomer]);

  expect(alphaRegistry.resolveDocType("Customer")).toEqual({
    kind: "resolved",
    definition: createDocTypeDefinition(alphaCustomer),
  });
  expect(betaRegistry.resolveDocType("Customer")).toEqual({
    kind: "resolved",
    definition: createDocTypeDefinition(betaCustomer),
  });
  expect(betaRegistry.resolveDocType("Alpha Only")).toEqual({
    kind: "unknown_doctype",
  });
});
