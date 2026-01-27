import { ApiResponse, ErrorResponse, TEventHandlerFunc } from "shared/types";

/**
 * Returns an error response object with a 'message' key that can directly be used
 * to display error messages
 * @param {ApiResponse} response Response of API call
 */
export function getErrorResponse(response: ApiResponse): ApiResponse {
  if (response.status === 401) {
    let message = "Unauthorized";
    try {
      const unauthMessage = getErrorMessage(response.data);

      if (unauthMessage === "An error occurred!") {
        message = "Unauthorized";
      } else {
        message = unauthMessage;
      }
    } catch (e) {
      //
    }

    return {
      ...response,
      message,
    };
  } else if (response.status >= 500) {
    return {
      ...response,
      message: "Something went wrong! We are looking into it.",
    };
  } else if (response.status >= 400 && response.status < 500) {
    return {
      ...response,
      message: getErrorMessage(response.data),
    };
  } else {
    return response;
  }
}

/**
 * Resolve the response body and convert it into text/html based on content type
 * @param {Response} response Response of API call
 */
export function handleResponse(
  response: Response,
  eventStream?: TEventHandlerFunc
): Promise<ApiResponse> {
  // Any changes in this function should also be made in chrome-extension's
  // insert-shadow-dom.ts file as functions cannot be serialized so we need
  // to duplicate code

  return new Promise(async (resolve) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("text/html") !== -1) {
      response.text().then((text: string) => {
        resolve({
          status: response.status,
          url: response.url,
          ok: response.ok,
          statusText: response.statusText,
          type: response.statusText,
          data: text,
        });
      });
    } else if (contentType && contentType.indexOf("text/csv") !== -1) {
      response.blob().then((blob: Blob | ErrorResponse) => {
        resolve({
          status: response.status,
          url: response.url,
          ok: response.ok,
          statusText: response.statusText,
          type: response.statusText,
          data: blob,
        });
      });
    } else {
      response.json().then((json: Json | ErrorResponse) => {
        resolve({
          status: response.status,
          url: response.url,
          ok: response.ok,
          statusText: response.statusText,
          type: response.statusText,
          data: json,
        });
      });
    }
  });
}

/**
 * Checks if the response received is an error response
 */
export function isErrorResponse(response: ApiResponse): boolean {
  return (
    !response ||
    (response &&
      ((response.status >= 400 && response.status <= 600) ||
        (response.data && response.data.errors !== undefined)))
  );
}
/**
 * Checks if the response received is an error response
 */
export function isErrorResponseLegacy(response: ApiResponse["data"]): boolean {
  return (
    !response ||
    (response &&
      (response.status === 500 ||
        response.status === 404 ||
        response.status === 422 ||
        typeof response.errors !== "undefined"))
  );
}

/**
 * Extracts error message from response. Error message can be
 * hidden at many places in responses of different APIs from
 * backend
 */
export function getErrorMessage(response: ErrorResponse): string {
  if (typeof response.error === "string") {
    return response.error;
  } else if (typeof response.errors === "string") {
    return response.errors;
  } else if (response.errors !== undefined && Array.isArray(response.errors)) {
    return response.errors.reduce((acc, err) => {
      return `${err} ${acc}`;
    }, "");
  } else if (
    response.errors !== undefined &&
    typeof response.errors === "object"
  ) {
    return Object.keys(response.errors).reduce((acc, key) => {
      if (
        response.errors !== undefined &&
        typeof response.errors !== "string" &&
        Array.isArray(response.errors[key]) &&
        response.errors[key].length > 0
      ) {
        return `${response.errors[key][0]} ${acc}`;
      } else {
        return acc;
      }
    }, "");
  } else {
    return "An error occurred!";
  }
}

export function getQueryKey<T>(
  moduleName: string,
  apiEndpointName: string,
  queryParams?: T
): [string, string, T | Record<string, never>] {
  return [moduleName, apiEndpointName, queryParams || {}];
}
