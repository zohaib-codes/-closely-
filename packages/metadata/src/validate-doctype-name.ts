const DOCTYPE_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9_ -]+$/;
const MAX_DOCTYPE_NAME_LENGTH = 61;

export function requireValidDocTypeName(name: unknown): void {
  if (
    typeof name !== "string" ||
    name.length > MAX_DOCTYPE_NAME_LENGTH ||
    name.trim() !== name ||
    !DOCTYPE_NAME_PATTERN.test(name)
  ) {
    throw new Error("INVALID_DOCTYPE_NAME");
  }
}
