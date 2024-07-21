export interface FetchApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: HeadersInit;
}

export interface FetchApiResult {
  data?: any;
  error?: string;
}

export type FetchApiCall = (url: string, options: FetchApiOptions) => Promise<FetchApiResult>;

export type FetchApi = (url: string, options?: FetchApiOptions, retries?: number) => Promise<FetchApiResult>;

/**
 * Type for a function that retries a promise-returning function with exponential backoff.
 */
export type RetryWithExponentialBackoff<T> = (
  fn: () => Promise<T>,
  retries?: number,
  delay?: number
) => Promise<T>;
