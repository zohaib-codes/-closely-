const HOSTNAME_LABEL_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

export function normalizeSiteHostname(input: unknown): string {
  if (
    typeof input !== "string" ||
    input.length === 0 ||
    input.length > 254 ||
    /[^A-Za-z0-9.-]/.test(input)
  ) {
    throw new Error("INVALID_SITE_HOSTNAME");
  }

  const lowercaseHostname = input.toLowerCase();
  const hostname = lowercaseHostname.endsWith(".")
    ? lowercaseHostname.slice(0, -1)
    : lowercaseHostname;

  if (
    hostname.length === 0 ||
    hostname.length > 253 ||
    !hostname.split(".").every((label) => HOSTNAME_LABEL_PATTERN.test(label))
  ) {
    throw new Error("INVALID_SITE_HOSTNAME");
  }

  return hostname;
}
