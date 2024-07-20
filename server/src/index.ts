import * as CDK from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as Lambda from 'aws-cdk-lib/aws-lambda';
import * as Apigw from 'aws-cdk-lib/aws-apigateway';
import { createLambda, createLambdaFunctions } from './lambda';

export class MusicAppApiStack extends CDK.Stack {
  constructor(scope: Construct, id: string, props?: CDK.StackProps) {
    super(scope, id, props);

    // API Gateway
    const api = new Apigw.RestApi(this, 'MusicAppAPIGateway', {
      restApiName: 'Serverless Backend API Gateway for Music App',
      description: 'This service handles serverless backend requests for the music app.',
      deployOptions: {
        stageName: 'test',
      },
    });

    // Health check route
    const healthResource = api.root.addResource('health');
    healthResource.addMethod('GET', new Apigw.MockIntegration({
      integrationResponses: [{
        statusCode: '200',
        responseTemplates: {
          'application/json': JSON.stringify({ message: 'Health check OK' }),
        },
      }],
      requestTemplates: {
        'application/json': '{"statusCode": 200}',
      },
    }), {
      methodResponses: [{
        statusCode: '200',
        responseModels: {
          'application/json': Apigw.Model.EMPTY_MODEL,
        },
      }],
    });

    // // // Tag API Gateway for easy identification
    // CDK.Tags.of(api).add('APIName', 'MusicAppApi');

    // Export values
    new CDK.CfnOutput(this, 'MusicAppApiUrlOutput', {
      value: api.url,
      exportName: 'MusicAppApiUrlOutput'
    });

    new CDK.CfnOutput(this, 'MusicAppUrlApiIdOutput', {
      value: api.restApiId,
      exportName: 'MusicAppUrlApiIdOutput'
    });

    new CDK.CfnOutput(this, 'MusicAppUrlApiRootResourceIdOutput', {
      value: api.root.resourceId,
      exportName: 'MusicAppUrlApiRootResourceIdOutput'
    });
  }
}

export class MusicAppFnsStack extends CDK.Stack {
  constructor(scope: Construct, id: string, props?: CDK.StackProps) {
    super(scope, id, props);

    // Lambda Layers
    const awsSdkLayer = new Lambda.LayerVersion(this, 'AWSdkLayer', {
      code: Lambda.Code.fromAsset('src/layers/aws-sdk'),
      compatibleRuntimes: [Lambda.Runtime.NODEJS_20_X],
      description: 'A layer for aws-sdk library',
    });

    const uuidLayer = new Lambda.LayerVersion(this, 'UuidLayer', {
      code: Lambda.Code.fromAsset('src/layers/uuid'),
      compatibleRuntimes: [Lambda.Runtime.NODEJS_20_X],
      description: 'A layer for uuid library',
    });

    const apolloGraphqlLayer = new Lambda.LayerVersion(this, 'apolloGraphQlLayer', {
      code: Lambda.Code.fromAsset('src/layers/apollo-server'),
      compatibleRuntimes: [Lambda.Runtime.NODEJS_20_X],
      description: 'A layer for apollo server library',
    });

    const mongooseLayer = new Lambda.LayerVersion(this, 'mongooseLayer', {
      code: Lambda.Code.fromAsset('src/layers/mongoose'),
      compatibleRuntimes: [Lambda.Runtime.NODEJS_20_X],
      description: 'A layer for monogodb monogoose library',
    });

    const layers = [awsSdkLayer, uuidLayer, apolloGraphqlLayer, mongooseLayer];

    const restApiId = CDK.Fn.importValue('MusicAppUrlApiIdOutput');
    const rootResourceId = CDK.Fn.importValue('MusicAppUrlApiRootResourceIdOutput');

    // Reference existing API Gateway
    const api = Apigw.RestApi.fromRestApiAttributes(this, 'ImportedMusicAppApi', {
      restApiId,
      rootResourceId,
    });

    const { graphqlServerLambda } = createLambdaFunctions(this, createLambda, layers);

    // Add new routes and methods to API Gateway
    const graphqlResource = api.root.addResource('graphql');
    graphqlResource.addMethod('GET', new Apigw.LambdaIntegration(graphqlServerLambda));
    graphqlResource.addMethod('POST', new Apigw.LambdaIntegration(graphqlServerLambda));

    // Deploy the API Gateway stage
    const deployment = new Apigw.Deployment(this, 'Deployment', { api });
    deployment.node.addDependency(graphqlServerLambda);

    console.log('Redeploying API with new methods');
    new Apigw.Stage(this, 'ProdStage', {
      deployment,
      stageName: 'prod',
    });

    // Construct the API Url from the Static Value restApiId (refer to static vs token values in CDK)
    const apiUrl = `https://${api.restApiId}.execute-api.${CDK.Aws.REGION}.amazonaws.com/prod`;

    new CDK.CfnOutput(this, 'ImportedMusicAppApiUrl', {
      value: apiUrl,
    });
  }
}

const app = new CDK.App();

const apiStack = new MusicAppApiStack(app, 'MusicApp-API');
console.log('MusicApp-API deployed');

const functionsStack = new MusicAppFnsStack(app, 'MusicApp-Fns');
functionsStack.addDependency(apiStack);
console.log('MusicApp-LambdaFns deployed');