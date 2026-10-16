import type { SiteContext, SiteRegistry } from "@closely/engine";
import type { FastifyRequest } from "fastify";

const HOST_AUTHORITY_PATTERN = /^([A-Za-z0-9.-]+)(?::([0-9]{1,5}))?$/;

type RequestSiteErrorCode = "INVALID_HOST" | "UNKNOWN_SITE";

export class RequestSiteError extends Error {
  readonly code: RequestSiteErrorCode;
  readonly statusCode: 400 | 404;

  constructor(code: RequestSiteErrorCode) {
    super(code);
    this.name = "RequestSiteError";
    this.code = code;
    this.statusCode = code === "INVALID_HOST" ? 400 : 404;
  }
}

export function resolveRequestSite(
  request: Pick<FastifyRequest, "headers">,
  registry: SiteRegistry,
): SiteContext {
  const hostHeader: unknown = request.headers.host;

  if (
    typeof hostHeader !== "string" ||
    hostHeader.length === 0 ||
    hostHeader.length > 260 ||
    /[^A-Za-z0-9.:-]/.test(hostHeader)
  ) {
    throw new RequestSiteError("INVALID_HOST");
  }

  const authority = HOST_AUTHORITY_PATTERN.exec(hostHeader);

  if (authority === null || authority[1] === undefined) {
    throw new RequestSiteError("INVALID_HOST");
  }

  const portText = authority[2];

  if (portText !== undefined) {
    const port = Number(portText);

    if (port < 1 || port > 65535) {
      throw new RequestSiteError("INVALID_HOST");
    }
  }

  try {
    const resolution = registry.resolveHostname(authority[1]);

    if (resolution.kind === "unknown_site") {
      throw new RequestSiteError("UNKNOWN_SITE");
    }

    return resolution.site;
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "INVALID_SITE_HOSTNAME") {
      throw new RequestSiteError("INVALID_HOST");
    }

    throw error;
  }
}
