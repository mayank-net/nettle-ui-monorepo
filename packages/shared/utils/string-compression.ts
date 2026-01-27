export const EMPTY_STRING_HASH =
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

export async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function compareStringsByHash(
  fileString1: string,
  fileString2: string
): Promise<boolean> {
  const hash1 = await hashString(fileString1 || "");
  const hash2 = await hashString(fileString2 || "");
  return hash1 === hash2;
}
