import { base64Handler } from './encoding/base64/router.js';
import { graphqlHandler } from './graphql/router';
import { healthHandler } from './health/router';
import { postHandler } from './post/router.js';
import { rootHandler } from './root/router.js';
import { routesAndAssetsHandler } from './handler';
import { authMiddleware } from './auth/router';
import { loggerMiddleware } from './logger/router';

export {
  base64Handler,
  graphqlHandler,
  healthHandler,
  postHandler,
  rootHandler,
  routesAndAssetsHandler,
  authMiddleware,
  loggerMiddleware
}