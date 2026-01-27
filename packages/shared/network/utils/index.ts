import pako from "pako";

export function queryStringParser<T>(arg: T): string {
  const payload = arg as { [key: string]: string };
  const keys = Object.keys(payload);
  const url = keys.reduce((acc, curr) => {
    acc += `${curr}=${payload[curr]}&`;
    return acc;
  }, "");
  return url;
}

// Function to compress and encode the payload for a URL query string
export function compressPayloadForQueryString(payload: Record<string, string>) {
  const jsonString = JSON.stringify(payload); // Convert the object to a JSON string
  const compressed = pako.deflate(jsonString); // Compress using pako
  const base64Data = btoa(
    String.fromCharCode.apply(null, new Uint8Array(compressed))
  );
  return encodeURIComponent(base64Data); // Encode to make it URL-safe
}
