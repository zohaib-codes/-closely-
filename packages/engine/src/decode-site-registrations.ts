import type { SiteRegistration } from "./site-registry.js";

function hasExactObjectKeys(
  value: unknown,
  keys: readonly string[],
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.keys(value).length === keys.length &&
    keys.every((key) => Object.hasOwn(value, key))
  );
}

export function decodeSiteRegistrations(
  input: unknown,
): readonly SiteRegistration[] {
  if (!Array.isArray(input)) {
    throw new Error("INVALID_SITE_REGISTRATIONS");
  }

  const entries: readonly unknown[] = input;
  const registrations: SiteRegistration[] = [];

  for (const entry of entries) {
    if (!hasExactObjectKeys(entry, ["hostname", "site"])) {
      throw new Error("INVALID_SITE_REGISTRATIONS");
    }

    const hostname = entry["hostname"];
    const site = entry["site"];

    if (
      typeof hostname !== "string" ||
      !hasExactObjectKeys(site, ["siteName"])
    ) {
      throw new Error("INVALID_SITE_REGISTRATIONS");
    }

    const siteName = site["siteName"];

    if (typeof siteName !== "string" || siteName.trim().length === 0) {
      throw new Error("INVALID_SITE_REGISTRATIONS");
    }

    registrations.push({
      hostname,
      site: { siteName },
    });
  }

  return registrations;
}
