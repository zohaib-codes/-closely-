import { expect, test } from "vitest";
import { createOperationContext } from "./operation-context.js";
import type { OperationContext, OperationSource } from "./operation-context.js";

test("constructs an explicit Guest context", () => {
  const context = createOperationContext({
    site: { siteName: "alpha" },
    actor: { kind: "guest" },
    operationId: "request-1",
    source: "http",
  });

  expect(context).toEqual({
    site: { siteName: "alpha" },
    actor: { kind: "guest" },
    operationId: "request-1",
    source: "http",
  });
});

test("keeps a frozen snapshot when caller-owned objects change", () => {
  const input = {
    site: { siteName: "alpha" },
    actor: { kind: "user", userName: "alice@example.test" },
    operationId: "request-1",
    source: "http",
  } satisfies OperationContext;

  const context = createOperationContext(input);

  input.site.siteName = "beta";
  input.actor.userName = "bob@example.test";
  input.operationId = "request-2";

  expect(context.site.siteName).toBe("alpha");
  expect(context.actor).toEqual({
    kind: "user",
    userName: "alice@example.test",
  });
  expect(context.operationId).toBe("request-1");

  expect(Object.isFrozen(context)).toBe(true);
  expect(Object.isFrozen(context.site)).toBe(true);
  expect(Object.isFrozen(context.actor)).toBe(true);

  expect(() => Object.assign(context.site, { siteName: "beta" })).toThrow(
    TypeError,
  );
  expect(() => Object.assign(context.actor, { kind: "guest" })).toThrow(
    TypeError,
  );
  expect(() => Object.assign(context, { operationId: "changed" })).toThrow(
    TypeError,
  );
});

test("rejects blank site, operation and user identifiers", () => {
  for (const blank of ["", "   ", "\t\n"]) {
    expect(() =>
      createOperationContext({
        site: { siteName: blank },
        actor: { kind: "guest" },
        operationId: "request-1",
        source: "http",
      }),
    ).toThrow("INVALID_OPERATION_CONTEXT");

    expect(() =>
      createOperationContext({
        site: { siteName: "alpha" },
        actor: { kind: "guest" },
        operationId: blank,
        source: "http",
      }),
    ).toThrow("INVALID_OPERATION_CONTEXT");

    expect(() =>
      createOperationContext({
        site: { siteName: "alpha" },
        actor: { kind: "user", userName: blank },
        operationId: "request-1",
        source: "http",
      }),
    ).toThrow("INVALID_OPERATION_CONTEXT");
  }
});

test("supports every declared operation source", () => {
  const sources: readonly OperationSource[] = [
    "http",
    "job",
    "cli",
    "scheduler",
    "script",
  ];

  for (const source of sources) {
    const context = createOperationContext({
      site: { siteName: "alpha" },
      actor: { kind: "guest" },
      operationId: "operation-1",
      source,
    });

    expect(context.source).toBe(source);
  }
});

test("rejects unsupported runtime actor and source values", () => {
  const input = {
    site: { siteName: "alpha" },
    actor: { kind: "guest" },
    operationId: "request-1",
    source: "http",
  } satisfies OperationContext;

  Object.assign(input.actor, { kind: "administrator" });

  expect(() => createOperationContext(input)).toThrow(
    "INVALID_OPERATION_CONTEXT",
  );

  Object.assign(input.actor, { kind: "guest" });
  Object.assign(input, { source: "browser" });

  expect(() => createOperationContext(input)).toThrow(
    "INVALID_OPERATION_CONTEXT",
  );
});
