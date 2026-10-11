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
