import { commonHeaders } from '@/fetch/headers';
import { validateResponseType } from '@/fetch/validation';
import { FetchApiCall } from '@/@types/fetch';

/**
 * Performs a fetch request with retry and exponential backoff.
 * @param url - The URL to fetch.
 * @param options - Fetch options.
 * @returns The response data or throws an error.
 */
export const fetchCall: FetchApiCall = async (url, options) => {
  const { body, method = 'GET', headers = {} } = options;

  console.log('Fetching...', url, JSON.stringify(options, null, 2));
  const response = await fetch(url, {
    method,
    ...(body && { body }),
    headers: {
      ...commonHeaders,
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return validateResponseType(response);
};
