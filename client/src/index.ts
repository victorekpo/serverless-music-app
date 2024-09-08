import { Router } from 'itty-router';
import * as routes from "./routers";

const router = Router();

const {
  base64Handler,
  graphqlHandler,
  healthHandler,
  postHandler,
  rootHandler,
  routesAndAssetsHandler,
  authMiddleware,
  loggerMiddleware
} = routes;

// Apply the authentication middleware to all routes
router.all('*', authMiddleware)

// Apply the logging middleware
router.all('*', loggerMiddleware)

router.get('/login', (request) => {
  return new Response('Please login to continue.')
})

/**
 * Health route
 * This route is used to check the health status of the application.
 * When a GET request is made to /health, it will be handled by the healthHandler.
 */
router.get('/health', healthHandler);

/**
 * Test route for base64 encoding
 * This route takes a text parameter and returns its base64 encoded version.
 * When a GET request is made to /base64/:text, it will be handled by the base64Handler.
 */
router.get("/base64/:text", base64Handler);

/**
 * Test POST route
 * This route is used to handle POST requests for testing purposes.
 * When a POST request is made to /post, it will be handled by the postHandler.
 */
router.post("/post", postHandler);

/**
 * Test route for base64 encoding
 * This route takes a text parameter and returns its base64 encoded version.
 * When a GET request is made to /base64/:text, it will be handled by the base64Handler.
 */
router.post("/graphql", graphqlHandler);

/**
 * Catch-all route for serving the React app
 * This is the last route we define. It will match any route that hasn't been
 * defined above, making it useful as a catch-all route.
 * This ensures that any route not explicitly defined will serve the React app,
 * allowing the client-side routing of React Router to take over.
 */
router.all('*', rootHandler);

/**
 * Event listener for incoming requests
 * All incoming requests to the worker are passed to the router where your routes
 * are called, and the response is sent. The routesAndAssetsHandler will map
 * assets and routes accordingly.
 */

export default {
  fetch: (request, env, ctx) =>
    routesAndAssetsHandler(request, router, env, ctx)
}