export type SiteContext = {
  readonly siteName: string;
};

export type ActorContext =
  | {
      readonly kind: "guest";
    }
  | {
      readonly kind: "user";
      readonly userName: string;
    };

export type OperationSource = "http" | "job" | "cli" | "scheduler" | "script";

export type OperationContext = {
  readonly site: SiteContext;
  readonly actor: ActorContext;
  readonly operationId: string;
  readonly source: OperationSource;
};

function requireContextIdentifier(value: unknown): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error("INVALID_OPERATION_CONTEXT");
  }

  return value;
}

export function createOperationContext(
  input: OperationContext,
): OperationContext {
  const siteName = requireContextIdentifier(input.site.siteName);
  const operationId = requireContextIdentifier(input.operationId);

  let actor: ActorContext;

  if (input.actor.kind === "guest") {
    actor = Object.freeze({ kind: "guest" });
  } else if (input.actor.kind === "user") {
    actor = Object.freeze({
      kind: "user",
      userName: requireContextIdentifier(input.actor.userName),
    });
  } else {
    throw new Error("INVALID_OPERATION_CONTEXT");
  }

  const source = input.source;

  if (
    source !== "http" &&
    source !== "job" &&
    source !== "cli" &&
    source !== "scheduler" &&
    source !== "script"
  ) {
    throw new Error("INVALID_OPERATION_CONTEXT");
  }

  return Object.freeze({
    site: Object.freeze({ siteName }),
    actor,
    operationId,
    source,
  });
}
