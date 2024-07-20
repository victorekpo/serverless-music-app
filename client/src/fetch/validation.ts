/**
 * Validates and parses the response based on the content type.
 * @param response - The Response object from fetch.
 * @returns The parsed response data.
 */
export const validateResponseType = (response: Response): Promise<any> => {
  const contentType = response.headers.get('Content-Type');

  if (contentType && contentType.includes('application/json')) {
    return response.json(); // Parse JSON responses
  } else {
    return response.text(); // Handle non-JSON responses
  }
}
