import { Buffer } from 'buffer';
import { fetchApi } from "@/fetch";

/**
 * Handles a base64 encoding request and fetches data from an external API.
 * @param {Object} params - The parameters object containing the text to encode.
 * @returns {Response} - The HTML response with base64 encoding
 */
export const base64Handler = async ({ params }: any): Promise<Response> => {
  // Decode text like "Hello%20world" into "Hello world"
  const input = decodeURIComponent(params.text);

  // Construct a buffer from our input
  const buffer = Buffer.from(input, "utf8");

  // Serialize the buffer into a base64 string
  const base64 = buffer.toString("base64");


  // Return the HTML response with the base64 string
  return new Response(`
<p>Base64 encoding: <code>${base64}</code></p>
`, {
    headers: {
      "Content-Type": "text/html"
    }
  });
};
