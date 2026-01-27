/**
 * Gets headers for API Requests. Some headers are different on desktop and mobile
 * @param {Object = {}} overrideHeaders Headers to override default headers
 */
export function getHeaders(
  overrideHeaders?: Record<string, string>
): Record<string, string>;
