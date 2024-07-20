import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { connectToMongoDB } from './db/connection';
import { graphqlServer } from './server';

let cachedHandler: any;

export const handler = async (...args: any) => {
  if (!cachedHandler) {
    await connectToMongoDB();
    cachedHandler = startServerAndCreateLambdaHandler(
      graphqlServer,
      handlers.createAPIGatewayProxyEventRequestHandler()
    );
  }
  return cachedHandler(...args);
};
