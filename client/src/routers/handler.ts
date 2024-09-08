import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
// @ts-ignore
import manifestJSON from "__STATIC_CONTENT_MANIFEST";

/**
 * Handles requests for both routes and static assets.
 * If the request matches certain file types (e.g., .js, .html, .css),
 * it serves them directly from KV storage using getAssetFromKV.
 * For other requests, it delegates handling to the provided router.
 * @param {Event} request - The Cloudflare Worker request object.
 * @param {Router} router - The router object responsible for handling non-static asset requests.
 * @param env - The Cloudflare Worker env object.
 * @param ctx - The Cloudflare Worker ctx object.
 * @returns {Response} A Response object containing the requested asset or routed content.
 */
export const routesAndAssetsHandler = async (request: any, router: any, env, ctx): Promise<Response> => {
  // Extract the request from the event
  console.log("ENV", env)
  const assetManifest = JSON.parse(manifestJSON);

  // Check if the request is for a static asset (e.g., bundle.js, .html, .ico, .svg, .jpg, .png, .css)
  if (
    (request.url.includes('bundle') && request.url.endsWith('.js'))
    || request.url.endsWith('.html')
    || request.url.endsWith('/favicon.ico')
    || request.url.endsWith('.svg')
    || request.url.endsWith('.jpg')
    || request.url.endsWith('.png')
    || request.url.endsWith('.css')
  ) {
    // Serve the bundle.js file from KV storage
    try {
      // Pass the event object to getAssetFromKV
      const event = {
        request,
        waitUntil: (p) => ctx.waitUntil(p),
      }
      return await getAssetFromKV(event,
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
        });
    } catch (e: any) {
      return new Response(`Bundle not found: ${e.message}`, {
        status: 404,
        statusText: 'Not Found',
      });
    }
  }

  // For any other requests, handle them with the router
  return router.handle(request, env);
};

// Note: If getting Uncaught SyntaxError: Unexpected token '<', this is an indicator that the asset might not be mapped properly.