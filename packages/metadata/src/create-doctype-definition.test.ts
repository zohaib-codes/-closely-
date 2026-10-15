import { expect, test } from "vitest";
import { createDocTypeDefinition } from "./create-doctype-definition.js";
import type { DocTypeDefinition } from "./doctype-definition.js";

function createDefinitionInput() {
  return {
    name: "Sales Invoice",
    module: "Accounts",
    fields: [
      {
        fieldname: "customer_name",
        fieldtype: "Data",
        label: "Customer Name",
        reqd: true,
        read_only: false,
        unique: false,
      },
      {
        fieldname: "external_reference",
        fieldtype: "Data",
        label: "External Reference",
        reqd: false,
        read_only: true,
        unique: true,
      },
    ],
  } satisfies DocTypeDefinition;
}

test("preserves logical names, field order and flags", () => {
  const input = createDefinitionInput();
  const definition = createDocTypeDefinition(input);

  expect(definition).toEqual(input);
  expect(definition.fields.map((field) => field.fieldname)).toEqual([
    "customer_name",
    "external_reference",
  ]);
});

test("keeps an independent snapshot when the caller changes its input", () => {
  const input = createDefinitionInput();
  const definition = createDocTypeDefinition(input);

  input.name = "Changed Model";
  input.module = "Changed Module";

  for (const field of input.fields) {
    Object.assign(field, { label: "Changed Label", reqd: false });
  }

  input.fields.length = 0;

  expect(definition).toEqual(createDefinitionInput());
  expect(Object.isFrozen(input)).toBe(false);
  expect(Object.isFrozen(input.fields)).toBe(false);
});

test("rejects runtime changes at every object level", () => {
  const definition = createDocTypeDefinition(createDefinitionInput());

  expect(Object.isFrozen(definition)).toBe(true);
  expect(Object.isFrozen(definition.fields)).toBe(true);

  expect(() => Object.assign(definition, { module: "Changed Module" })).toThrow(
    TypeError,
  );

  expect(() => Object.assign(definition.fields, { length: 0 })).toThrow(
    TypeError,
  );

  for (const field of definition.fields) {
    expect(Object.isFrozen(field)).toBe(true);
    expect(() => Object.assign(field, { label: "Changed Label" })).toThrow(
      TypeError,
    );
  }
});

test("rejects duplicate field names without changing the input", () => {
  const input = createDefinitionInput();

  input.fields.push({
    fieldname: "customer_name",
    fieldtype: "Data",
    label: "Another Customer Field",
    reqd: false,
    read_only: true,
    unique: true,
  });

  const before = structuredClone(input);

  expect(() => createDocTypeDefinition(input)).toThrow(
    "DUPLICATE_DOCFIELD_NAME",
  );

  expect(input).toEqual(before);
  expect(Object.isFrozen(input)).toBe(false);
  expect(Object.isFrozen(input.fields)).toBe(false);

  for (const field of input.fields) {
    expect(Object.isFrozen(field)).toBe(false);
  }
});

test("permits the same field names in different DocTypes", () => {
  const salesInput = createDefinitionInput();
  const purchaseInput = createDefinitionInput();
  purchaseInput.name = "Purchase Invoice";

  const salesDefinition = createDocTypeDefinition(salesInput);
  const purchaseDefinition = createDocTypeDefinition(purchaseInput);

  expect(salesDefinition.name).toBe("Sales Invoice");
  expect(purchaseDefinition.name).toBe("Purchase Invoice");
  expect(salesDefinition.fields).toEqual(purchaseDefinition.fields);
});

test("normalizes explicit field names without changing the input", () => {
  const input = createDefinitionInput();

  for (const field of input.fields) {
    if (field.fieldname === "customer_name") {
      field.fieldname = "Customer.Name";
    }
  }

  const before = structuredClone(input);
  const definition = createDocTypeDefinition(input);

  expect(definition.fields.map((field) => field.fieldname)).toEqual([
    "customername",
    "external_reference",
  ]);
  expect(definition.fields.map((field) => field.label)).toEqual([
    "Customer Name",
    "External Reference",
  ]);
  expect(definition.name).toBe("Sales Invoice");
  expect(input).toEqual(before);
});

test("rejects field names that collide after normalization", () => {
  const input = createDefinitionInput();

  for (const field of input.fields) {
    field.fieldname =
      field.fieldname === "customer_name" ? "Customer.Name" : "customername";
  }

  const before = structuredClone(input);

  expect(() => createDocTypeDefinition(input)).toThrow(
    "DUPLICATE_DOCFIELD_NAME",
  );

  expect(input).toEqual(before);
  expect(Object.isFrozen(input.fields)).toBe(false);

  for (const field of input.fields) {
    expect(Object.isFrozen(field)).toBe(false);
  }
});

function createDefinitionWithFieldName(fieldname: string) {
  const input = createDefinitionInput();

  input.fields = input.fields.map((field, index) => ({
    ...field,
    fieldname: index === 0 ? fieldname : field.fieldname,
  }));

  return input;
}

test("rejects explicitly supplied restricted field names", () => {
  const restrictedNames = [
    "name",
    "parent",
    "creation",
    "owner",
    "modified",
    "modified_by",
    "parentfield",
    "parenttype",
    "file_list",
    "flags",
    "docstatus",
  ];

  for (const fieldname of restrictedNames) {
    const input = createDefinitionWithFieldName(fieldname);
    const before = structuredClone(input);

    expect(() => createDocTypeDefinition(input)).toThrow(
      "RESTRICTED_DOCFIELD_NAME",
    );
    expect(input).toEqual(before);

    for (const field of input.fields) {
      expect(Object.isFrozen(field)).toBe(false);
    }
  }
});

test("rejects reserved keys after field-name normalization", () => {
  const reservedNames = [
    "doctype",
    "flags",
    "_parent_doc",
    "_doc_before_save",
    "_action",
    "dont_update_if_missing",
    "meta",
    "permitted_fieldnames",
    "_weakref",
    "_table_fieldnames",
    "_non_computed_table_fieldnames",
  ];

  for (const fieldname of reservedNames) {
    const input = createDefinitionWithFieldName(fieldname.toUpperCase());
    const before = structuredClone(input);

    expect(() => createDocTypeDefinition(input)).toThrow(
      "RESERVED_DOCFIELD_NAME",
    );
    expect(input).toEqual(before);
  }
});

test("permits autoname only in the DocType definition", () => {
  const input = createDefinitionWithFieldName("AutoName");

  expect(() => createDocTypeDefinition(input)).toThrow(
    "RESERVED_DOCFIELD_NAME",
  );

  input.name = "DocType";

  const definition = createDocTypeDefinition(input);

  expect(definition.fields.map((field) => field.fieldname)).toEqual([
    "autoname",
    "external_reference",
  ]);
});

test("rejects invalid logical DocType names", () => {
  const invalidNames = [
    "",
    "A",
    " Sales Invoice",
    "Sales Invoice ",
    "Sales Invoice\n",
    "Sales\tInvoice",
    "1Invoice",
    "_Invoice",
    "Sales/Invoice",
    "Sales.Invoice",
    "发票",
    "A".repeat(62),
  ];

  for (const name of invalidNames) {
    const input = createDefinitionInput();
    input.name = name;

    expect(() => createDocTypeDefinition(input)).toThrow(
      "INVALID_DOCTYPE_NAME",
    );
  }
});

test("preserves valid DocType names including the length boundary", () => {
  for (const name of [
    "Customer",
    "Sales Invoice",
    "Sales_Invoice-2",
    "A".repeat(61),
  ]) {
    const input = createDefinitionInput();
    input.name = name;

    expect(createDocTypeDefinition(input).name).toBe(name);
  }
});

test("rejects invalid normalized field names and excessive lengths", () => {
  const invalidNames = [
    "/",
    " ",
    "customer name",
    "customer-name",
    "customer$code",
    "customer:code",
    "customer\n",
    "😀",
    "a".repeat(65),
    "𐐨".repeat(65),
  ];

  for (const fieldname of invalidNames) {
    const input = createDefinitionWithFieldName(fieldname);
    const before = structuredClone(input);

    expect(() => createDocTypeDefinition(input)).toThrow(
      "INVALID_DOCFIELD_NAME",
    );
    expect(input).toEqual(before);
  }
});

test("accepts Unicode field names and counts code points for length", () => {
  const validNames = [
    "café",
    "客户_编号",
    "رقم_العميل",
    "a".repeat(64),
    "𐐨".repeat(64),
  ];

  for (const fieldname of validNames) {
    const input = createDefinitionWithFieldName(fieldname);
    const definition = createDocTypeDefinition(input);

    expect(definition.fields.map((field) => field.fieldname)).toEqual([
      fieldname,
      "external_reference",
    ]);
  }
});

function createDefinitionWithMissingFieldName(label: string) {
  const input = createDefinitionWithFieldName("");

  input.fields = input.fields.map((field, index) => ({
    ...field,
    label: index === 0 ? label : field.label,
  }));

  return input;
}

test("derives a missing field name while preserving input and label", () => {
  const input = createDefinitionWithMissingFieldName(" Customer Name? ");
  const before = structuredClone(input);
  const definition = createDocTypeDefinition(input);

  expect(definition.fields.map((field) => field.fieldname)).toEqual([
    "customer_name",
    "external_reference",
  ]);
  expect(definition.fields.map((field) => field.label)).toEqual([
    " Customer Name? ",
    "External Reference",
  ]);
  expect(input).toEqual(before);
});

test("appends one to restricted names generated from labels", () => {
  for (const label of ["Name", "Owner", "Flags"]) {
    const input = createDefinitionWithMissingFieldName(label);
    const definition = createDocTypeDefinition(input);

    expect(definition.fields.map((field) => field.fieldname)).toEqual([
      `${label.toLowerCase()}1`,
      "external_reference",
    ]);
  }
});

test("rejects missing or unusable labels when a field name is missing", () => {
  const cases = [
    { label: "", errorCode: "MISSING_DOCFIELD_NAME" },
    { label: "   ", errorCode: "INVALID_DOCFIELD_NAME" },
    { label: "???", errorCode: "INVALID_DOCFIELD_NAME" },
    { label: "/", errorCode: "INVALID_DOCFIELD_NAME" },
    { label: "Customer-Code", errorCode: "INVALID_DOCFIELD_NAME" },
    { label: "a".repeat(65), errorCode: "INVALID_DOCFIELD_NAME" },
  ];

  for (const { label, errorCode } of cases) {
    const input = createDefinitionWithMissingFieldName(label);
    const before = structuredClone(input);

    expect(() => createDocTypeDefinition(input)).toThrow(errorCode);
    expect(input).toEqual(before);
  }
});

test("still rejects reserved names generated from labels", () => {
  const input = createDefinitionWithMissingFieldName("DocType");

  expect(() => createDocTypeDefinition(input)).toThrow(
    "RESERVED_DOCFIELD_NAME",
  );
});

test("rejects generated-name collisions instead of allocating new names", () => {
  const inputs = [
    createDefinitionWithMissingFieldName("External Reference"),
    createDefinitionWithMissingFieldName("Name"),
  ];

  inputs[1]?.fields.forEach((field, index) => {
    if (index === 1) {
      field.fieldname = "name1";
    }
  });

  for (const input of inputs) {
    const before = structuredClone(input);

    expect(() => createDocTypeDefinition(input)).toThrow(
      "DUPLICATE_DOCFIELD_NAME",
    );
    expect(input).toEqual(before);
  }
});
