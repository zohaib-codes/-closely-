import { deepStrictEqual, strictEqual } from "node:assert";

export interface HttpObservation {
  status: number;
  body: unknown;
}

export function parseCapturedResponse(raw: string): HttpObservation {
  const separator = raw.indexOf("\r\n\r\n");

  if (separator === -1) {
    throw new Error("Missing HTTP header/body separator");
  }

  const headers = raw.slice(0, separator);
  const statusLine = headers.split("\r\n")[0] ?? "";
  const statusMatch = /^HTTP\/1\.1 ([1-5]\d{2})(?: .*)?$/.exec(statusLine);
  const statusText = statusMatch?.[1];

  if (statusText === undefined) {
    throw new Error("Invalid HTTP status line");
  }

  const status = Number(statusText);

  if (status >= 300 && status < 400) {
    throw new Error("Redirects are not valid baseline observations");
  }

  if (
    !/^Content-Type:\s*application\/json(?:\s*;[^\r\n]*)?\r?$/im.test(headers)
  ) {
    throw new Error("Expected application/json");
  }

  const body: unknown = JSON.parse(raw.slice(separator + 4));

  return { status, body };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeGuestUserDenial(body: unknown): unknown {
  if (!isRecord(body) || body.exc_type !== "PermissionError") {
    throw new Error("Expected PermissionError body");
  }

  if (typeof body._server_messages !== "string") {
    throw new Error("Expected encoded _server_messages");
  }

  const messages: unknown = JSON.parse(body._server_messages);

  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("Expected a nonempty server-message array");
  }

  const normalizedMessages = messages.map((entry: unknown) => {
    if (typeof entry !== "string") {
      throw new Error("Expected an encoded server message");
    }

    const message: unknown = JSON.parse(entry);

    if (!isRecord(message)) {
      throw new Error("Expected a server-message object");
    }

    if (
      typeof message.__frappe_exc_id !== "string" ||
      message.__frappe_exc_id.length === 0
    ) {
      throw new Error("Expected a nonempty __frappe_exc_id");
    }

    return { ...message, __frappe_exc_id: "<variable>" };
  });

  return { ...body, _server_messages: normalizedMessages };
}

export function assertResponseMatches(
  reference: HttpObservation,
  candidate: HttpObservation,
  policy: "exact" | "guest-user-denial" = "exact",
): void {
  strictEqual(candidate.status, reference.status, "HTTP status differs");

  if (policy === "guest-user-denial") {
    strictEqual(reference.status, 403, "Guest denial must have status 403");
    deepStrictEqual(
      normalizeGuestUserDenial(candidate.body),
      normalizeGuestUserDenial(reference.body),
      "JSON body differs",
    );
    return;
  }

  deepStrictEqual(candidate.body, reference.body, "JSON body differs");
}
