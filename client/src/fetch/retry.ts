import { RetryWithExponentialBackoff } from "@/@types/fetch";

/**
 * Retries a function with exponential backoff.
 * @param fn - The function to retry.
 * @param retries - Number of retries.
 * @param delay - Initial delay in milliseconds.
 * @returns The result of the function.
 */
export const retryWithExponentialBackoff: RetryWithExponentialBackoff<any> = async (
  fn,
  retries = 3,
  delay = 1000
) => {
  // First attempt
  try {
    return await fn();
  } catch (error) {
    // Start retrying if the first attempt fails
    let attempt = 1; // Start counting retries from 1

    while (attempt <= retries) {
      try {
        console.log(`Retrying again; attempt=${attempt}`);
        return await fn(); // Attempt the function
      } catch (error) {
        if (attempt >= retries) {
          console.log(`Retry failed; attempt=${attempt}`);
          throw error; // Rethrow the error if max retries reached
        }

        const backoff = Math.pow(2, attempt) * delay; // Calculate exponential backoff
        console.log(`Current backoff; backoff=${backoff}`);
        await new Promise(res => setTimeout(res, backoff)); // Wait before retrying
        attempt++;
      }
    }
  }

  throw new Error('Retry limit reached'); // Fallback error if somehow no error is thrown
};
