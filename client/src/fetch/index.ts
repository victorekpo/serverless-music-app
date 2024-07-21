import { fetchCall } from "@/fetch/call";
import { retryWithExponentialBackoff } from "@/fetch/retry";
import { FetchApi } from "@/@types/fetch";

/**
 * Fetches data from a given URL with optional retry logic and exponential backoff.
 * @param url - The URL to fetch data from.
 * @param options - Options to customize the fetch request (method, body, headers).
 * @param retries - The number of times to retry the request on failure (default is 0, meaning no retries).
 * @returns An object containing either the fetched data or an error message.
 */
export const fetchApi: FetchApi = async (url, options = {}, retries = 0) => {
  try {
    // Attempt to fetch data using retry logic with exponential backoff
    const data = await retryWithExponentialBackoff(() => fetchCall(url, options), retries);

    // Return the fetched data if successful
    return { data };
  } catch (err: any) {
    // Return an error message if the request fails after retries
    return { error: `Error occurred while fetching API; message=${err.message}` };
  }
};