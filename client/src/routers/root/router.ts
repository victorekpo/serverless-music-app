import indexHTML from '../../../dist/index.html';

/**
 * Handles requests to serve the index.html file.
 * Uses the indexHTML imported from the public directory.
 */
export const rootHandler = async (request: any) => {
  return new Response(indexHTML, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
};
