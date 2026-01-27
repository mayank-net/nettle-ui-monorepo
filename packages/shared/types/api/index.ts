export interface ApiPromise<T> extends Promise<T> {
  /**
   * JavaScript fetch API doesn't support aborting request directly
   * from promise. ApiPromise adds support for that
   * @returns
   */
  abort(): void;
}

export interface ErrorResponse {
  error?: string;
  errors?: string | Record<string, string | string[]>;
}

export type ApiResponseData<T = Json> = T | ErrorResponse | string;

export interface ApiResponse<T = Json> {
  status: number;
  url: string;
  data: ApiResponseData<T>;
  ok: boolean;
  statusText: string;
  type: string;
  message?: string | null;
}

export interface ApiError extends ApiResponse {
  data: ErrorResponse;
  message: string;
}

export type TEventData = Record<string, any> & {
  text: string;
  [key: string]: unknown;
};

export type TEventStreamData = { type: string; data: TEventData };

export type TEventHandlerFunc = (arg: TEventStreamData) => void;
