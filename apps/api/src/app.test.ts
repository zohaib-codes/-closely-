import { expect, test } from "vitest";
import { createApi } from "./app.js";

test("GET /health/live returns a healthy response", async () => {
  const api = createApi();

  try {
    const response = await api.inject({
      method: "GET",
      url: "/health/live",
    });

    expect(response.statusCode).toBe(200);

    const responseBody = response.json<unknown>();
    expect(responseBody).toEqual({ status: "ok" });
  } finally {
    await api.close();
  }
});
