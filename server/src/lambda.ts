import { Construct } from 'constructs';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';
import { Duration } from 'aws-cdk-lib';

/**
 * Create Lambda Function for backend
 */

export const createLambdaFunctions = (scope: Construct, createFn: any, layers: LayerVersion[]) => {
  const createFnWithLayers = (args: Record<string, any>) => {
    return createFn({ ...args, layers });
  };

  // Lambda
  const graphqlServerLambda = createFnWithLayers({
    scope,
    id: 'graphqlHandler',
    handler: join('backend', 'graphql', 'index.ts'),
    environment: {
      MONGODB_URI: process.env.MONGODB_URI,
      API_KEY: process.env.API_KEY
    }
  });

  return {
    graphqlServerLambda
  };
};

/**
 * Utility method to create Lambda blueprint
 * @param scope
 * @param id
 * @param handler
 * @param environment
 * @param layers
 */

export const createLambda = ({ scope, id, handler, environment, layers }: {
  scope: Construct;
  id: string;
  handler: string;
  environment: Record<string, string>,
  tables: Table[] | null;
  layers?: LayerVersion[] | undefined;
}) => {
  return new NodejsFunction(scope, id, {
    runtime: Runtime.NODEJS_20_X,
    entry: join('src', 'functions', handler),
    memorySize: 512, // Set memory size to 512 MB
    timeout: Duration.seconds(30), // Set timeout to 30 seconds
    environment: {
      ...(environment && { ...environment }),
    },
    ...(layers && { layers })
  });
};
