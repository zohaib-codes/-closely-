import { fastify } from "fastify";
import type { HealthResponse } from "@closely/contracts";

export function createApi() {
  const api = fastify({ logger: true, trustProxy: false });

  api.get("/health/live", (): HealthResponse => {
    return {
      status: "ok",
    };
  });

  return api;
}
