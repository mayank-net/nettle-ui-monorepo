import getQueryString from "shared/utils/get-query-string";
import { ApiPromise, ApiResponse } from "shared/types";
import { getHeaders } from "../utils/headers";
import {
  getErrorResponse,
  isErrorResponse,
  handleResponse,
} from "../utils/helpers";

const METHOD_GET = "GET";
const METHOD_POST = "POST";
const METHOD_PUT = "PUT";
const METHOD_PATCH = "PATCH";
const METHOD_DELETE = "DELETE";

// Interceptors allow us to modify the response before it is returned to the caller
type Interceptor = (response: ApiResponse, options?: Json) => ApiResponse;
type RequestOptions = {
  url: string;
  options: Json;
};

// Middlewares allow us to modify the request url and options/args before it is sent to the server
type Middleware = (arg: RequestOptions) => Promise<RequestOptions>;

const interceptors: Interceptor[] = [];
const middlewares: Middleware[] = [];

const api = {
  registerInterceptor(interceptor: Interceptor): void {
    interceptors.push(interceptor);
  },

  registerMiddleware(middleware: Middleware): void {
    middlewares.push(middleware);
  },

  get<T>(
    url: string,
    options: Json = {},
    abortSignal?: AbortSignal
  ): ApiPromise<T> {
    const controller = new AbortController();
    const signal = abortSignal || controller.signal;
    const response = new Promise<T>((resolve, reject) => {
      // Execute middleware promises one by one to
      // get final url and options
      const middlewarePromise = async () => {
        let requestOptions = { url, options };
        for (const middleware of middlewares) {
          requestOptions = await middleware(requestOptions);
        }

        return requestOptions;
      };

      middlewarePromise().then((reqOptions: RequestOptions) => {
        fetch(`${reqOptions.url}?${getQueryString(reqOptions.options)}`, {
          signal,
          method: METHOD_GET,
          headers: getHeaders({}),
        })
          .then((response: Response): Promise<ApiResponse> => {
            return handleResponse(response);
          })
          .then((streamedResponse: ApiResponse) => {
            let response = streamedResponse;

            interceptors.forEach((interceptor) => {
              response = interceptor(response, options);
            });

            if (isErrorResponse(response)) {
              reject(getErrorResponse(response));
            }

            resolve(response.data as T);
          })
          .catch((error: Error) => {
            if (!error.message.match(/aborted/)) {
              // Ignore abort error
              reject(error);
            }
          });
      });
    }) as ApiPromise<T>;

    response.abort = () => {
      controller.abort();
    };

    return response;
  },

  put<T>(
    url: string,
    options: Json = {},
    abortSignal?: AbortSignal
  ): ApiPromise<T> {
    const controller = new AbortController();
    const signal = abortSignal || controller.signal;
    const response = new Promise<T>((resolve, reject) => {
      const middlewarePromise = async () => {
        let requestOptions = { url, options };
        for (const middleware of middlewares) {
          requestOptions = await middleware(requestOptions);
        }

        return requestOptions;
      };

      middlewarePromise().then((reqOptions: RequestOptions) => {
        fetch(reqOptions.url, {
          signal,
          method: METHOD_PUT,
          headers: getHeaders({}),
          body: JSON.stringify(reqOptions.options),
        })
          .then((response: Response): Promise<ApiResponse> => {
            return handleResponse(response);
          })
          .then((streamedResponse: ApiResponse) => {
            let response = streamedResponse;
            interceptors.forEach((interceptor) => {
              response = interceptor(response, options);
            });

            if (isErrorResponse(response)) {
              reject(getErrorResponse(response));
            }

            resolve(response.data as T);
          })
          .catch((error: Error) => {
            if (!error.message.match(/aborted/)) {
              // Ignore abort error
              reject(error);
            }
          });
      });
    }) as ApiPromise<T>;

    response.abort = () => {
      controller.abort();
    };

    return response;
  },

  patch<T>(
    url: string,
    options: Json = {},
    abortSignal?: AbortSignal
  ): ApiPromise<T> {
    const controller = new AbortController();
    const signal = abortSignal || controller.signal;
    const response = new Promise<T>((resolve, reject) => {
      const middlewarePromise = async () => {
        let requestOptions = { url, options };
        for (const middleware of middlewares) {
          requestOptions = await middleware(requestOptions);
        }

        return requestOptions;
      };

      middlewarePromise().then((reqOptions: RequestOptions) => {
        fetch(reqOptions.url, {
          signal,
          method: METHOD_PATCH,
          headers: getHeaders({}),
          body: JSON.stringify(reqOptions.options),
        })
          .then((response: Response): Promise<ApiResponse> => {
            return handleResponse(response);
          })
          .then((streamedResponse: ApiResponse) => {
            let response = streamedResponse;
            interceptors.forEach((interceptor) => {
              response = interceptor(response, options);
            });

            if (isErrorResponse(response)) {
              reject(getErrorResponse(response));
            }

            resolve(response.data as T);
          })
          .catch((error: Error) => {
            if (!error.message.match(/aborted/)) {
              // Ignore abort error
              reject(error);
            }
          });
      });
    }) as ApiPromise<T>;

    response.abort = () => {
      controller.abort();
    };

    return response;
  },

  post<T>(
    url: string,
    options: Json = {},
    abortSignal?: AbortSignal
  ): ApiPromise<T> {
    const controller = new AbortController();
    const signal = abortSignal || controller.signal;
    const response = new Promise<T>((resolve, reject) => {
      const middlewarePromise = async () => {
        let requestOptions = { url, options };
        for (const middleware of middlewares) {
          requestOptions = await middleware(requestOptions);
        }
        return requestOptions;
      };

      middlewarePromise().then((reqOptions: RequestOptions) => {
        fetch(reqOptions.url, {
          signal,
          method: METHOD_POST,
          headers: getHeaders({}),
          body: JSON.stringify(reqOptions.options),
        })
          .then((response: Response): Promise<ApiResponse> => {
            return handleResponse(response);
          })
          .then((streamedResponse: ApiResponse) => {
            let response = streamedResponse;

            interceptors.forEach((interceptor) => {
              response = interceptor(response, options);
            });

            if (isErrorResponse(response)) {
              reject(getErrorResponse(response));
            }

            resolve(response.data as T);
          })
          .catch((error: Error) => {
            if (!error.message.match(/aborted/)) {
              // Ignore abort error
              reject(error);
            }
          });
      });
    }) as ApiPromise<T>;

    response.abort = () => {
      controller.abort();
    };

    return response;
  },

  postMultiPart<T>(
    url: string,
    formData: FormData,
    abortSignal?: AbortSignal
  ): ApiPromise<T> {
    const controller = new AbortController();
    const signal = abortSignal || controller.signal;
    const response = new Promise<T>((resolve, reject) => {
      const headers = getHeaders({});
      delete headers["Content-Type"];

      fetch(url, {
        signal,
        method: METHOD_POST,
        headers,
        body: formData,
      })
        .then((response: Response): Promise<ApiResponse> => {
          return handleResponse(response);
        })
        .then((streamedResponse: ApiResponse) => {
          let response = streamedResponse;
          interceptors.forEach((interceptor) => {
            response = interceptor(response, formData);
          });

          if (isErrorResponse(response)) {
            reject(getErrorResponse(response));
          }

          resolve(response.data as T);
        })
        .catch((error: Error) => {
          if (!error.message.match(/aborted/)) {
            // Ignore abort error
            reject(error);
          }
        });
    }) as ApiPromise<T>;

    response.abort = () => {
      controller.abort();
    };

    return response;
  },

  delete<T>(
    url: string,
    options: Json = {},
    abortSignal?: AbortSignal
  ): ApiPromise<T> {
    const controller = new AbortController();
    const signal = abortSignal || controller.signal;
    const response = new Promise<T>((resolve, reject) => {
      const middlewarePromise = async () => {
        let requestOptions = { url, options };
        for (const middleware of middlewares) {
          requestOptions = await middleware(requestOptions);
        }

        return requestOptions;
      };

      middlewarePromise().then((reqOptions: RequestOptions) => {
        fetch(reqOptions.url, {
          signal,
          method: METHOD_DELETE,
          headers: getHeaders({}),
          body: JSON.stringify(reqOptions.options),
        })
          .then((response: Response): Promise<ApiResponse> => {
            return handleResponse(response);
          })
          .then((streamedResponse: ApiResponse) => {
            let response = streamedResponse;
            interceptors.forEach((interceptor) => {
              response = interceptor(response, options);
            });

            if (isErrorResponse(response)) {
              reject(getErrorResponse(response));
            }

            resolve(response.data as T);
          })
          .catch((error: Error) => {
            if (!error.message.match(/aborted/)) {
              // Ignore abort error
              reject(error);
            }
          });
      });
    }) as ApiPromise<T>;

    response.abort = () => {
      controller.abort();
    };

    return response;
  },
};

export default api;
