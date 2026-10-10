import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
import { assertResponseMatches, parseCapturedResponse } from "./response.js";

function readFixture(name: string): string {
  return readFileSync(
    new URL(`./fixtures/frappe-v16.51.0/${name}.http`, import.meta.url),
    "utf8",
  );
}

test("reads the captured v1 ping envelope", () => {
  expect(parseCapturedResponse(readFixture("v1-ping"))).toEqual({
    status: 200,
    body: { message: "pong" },
  });
});

test("reads the captured v2 ping envelope", () => {
  expect(parseCapturedResponse(readFixture("v2-ping"))).toEqual({
    status: 200,
    body: { data: "pong" },
  });
});

test("reads the captured guest permission denial", () => {
  const response = parseCapturedResponse(readFixture("guest-user-list"));

  expect(response.status).toBe(403);
  expect(response.body).toEqual(
    expect.objectContaining({ exc_type: "PermissionError" }),
  );
});

test("accepts a matching candidate", () => {
  const reference = parseCapturedResponse(readFixture("v1-ping"));

  expect(() =>
    assertResponseMatches(reference, {
      status: 200,
      body: { message: "pong" },
    }),
  ).not.toThrow();
});

test("rejects the wrong version envelope", () => {
  const reference = parseCapturedResponse(readFixture("v1-ping"));
  const candidate = parseCapturedResponse(readFixture("v2-ping"));

  expect(() => assertResponseMatches(reference, candidate)).toThrow(
    "JSON body differs",
  );
});

test("rejects the wrong status even when the body matches", () => {
  const reference = parseCapturedResponse(readFixture("v1-ping"));

  expect(() =>
    assertResponseMatches(reference, { ...reference, status: 403 }),
  ).toThrow("HTTP status differs");
});

test("rejects truncated JSON", () => {
  const raw = readFixture("v1-ping");

  expect(() => parseCapturedResponse(raw.slice(0, -1))).toThrow(SyntaxError);
});

test("rejects a redirect capture", () => {
  const raw = readFixture("v1-ping").replace(
    "HTTP/1.1 200 OK",
    "HTTP/1.1 302 Found",
  );

  expect(() => parseCapturedResponse(raw)).toThrow("Redirects");
});
test("allows a changed error ID only with the explicit denial policy", () => {
  const raw = readFixture("guest-user-list");
  const changedRaw = raw.replace(/[a-f0-9]{56}/, "synthetic-id");

  expect(changedRaw).not.toBe(raw);

  const reference = parseCapturedResponse(raw);
  const candidate = parseCapturedResponse(changedRaw);

  expect(() =>
    assertResponseMatches(reference, candidate, "guest-user-denial"),
  ).not.toThrow();

  expect(() => assertResponseMatches(reference, candidate)).toThrow(
    "JSON body differs",
  );
});

test("still rejects a changed permission message", () => {
  const raw = readFixture("guest-user-list");
  const reference = parseCapturedResponse(raw);
  const candidate = parseCapturedResponse(
    raw.replace("Insufficient Permission", "Access granted"),
  );

  expect(() =>
    assertResponseMatches(reference, candidate, "guest-user-denial"),
  ).toThrow("JSON body differs");
});

test("rejects malformed nested message JSON", () => {
  const reference = parseCapturedResponse(readFixture("guest-user-list"));
  const candidate = {
    status: 403,
    body: {
      exc_type: "PermissionError",
      _server_messages: "not-json",
    },
  };

  expect(() =>
    assertResponseMatches(reference, candidate, "guest-user-denial"),
  ).toThrow(SyntaxError);
});

test("rejects a missing error ID", () => {
  const raw = readFixture("guest-user-list");
  const reference = parseCapturedResponse(raw);
  const candidate = parseCapturedResponse(
    raw.replace("__frappe_exc_id", "unexpected_id"),
  );

  expect(() =>
    assertResponseMatches(reference, candidate, "guest-user-denial"),
  ).toThrow("Expected a nonempty __frappe_exc_id");
});
test("fixtures identify the pinned Frappe reference", () => {
  const manifest: unknown = JSON.parse(
    readFileSync(
      new URL("./fixtures/frappe-v16.51.0/manifest.json", import.meta.url),
      "utf8",
    ),
  );

  expect(manifest).toMatchObject({
    schemaVersion: 1,
    reference: {
      repository: "https://github.com/frappe/frappe",
      tag: "v16.51.0",
      commit: "6b450a166e076dd842e4db7ea0843f62881e62ac",
    },
  });
});
