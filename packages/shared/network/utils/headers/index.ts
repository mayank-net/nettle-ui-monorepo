import { getAccessToken } from "shared/services";
import { JSON_CONTENT_TYPE } from "shared/network/config";

export function getHeaders(
  overrideHeaders: Record<string, string> = {}
): Record<string, string> {
  const accessToken = getAccessToken();

  return {
    "Content-Type": JSON_CONTENT_TYPE,
    ...(accessToken ? { "access-token": accessToken } : {}),
    ...overrideHeaders,
  };
}
