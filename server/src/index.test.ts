import { Template } from 'aws-cdk-lib/assertions';
import * as CDK from 'aws-cdk-lib';
import { MusicAppApiStack, MusicAppFnsStack } from './index';

let templateApi: Template;
let templateFns: Template;

describe('CDK Stack', () => {
  beforeAll(() => {
    const app = new CDK.App();
    const apiStack = new MusicAppApiStack(app, 'MyTestStack-API');
    const fnsStack = new MusicAppFnsStack(app, 'MyTestStack-Fns');
    templateApi = Template.fromStack(apiStack);
    templateFns = Template.fromStack(fnsStack);
    console.log('Template', JSON.stringify(templateApi, null, 2));
    console.log('Template', JSON.stringify(templateFns, null, 2));
  });

  test('API Gateway Proxy Created', () => {
    console.log('Testing API Gateway');
    templateApi.hasResourceProperties('AWS::ApiGateway::Resource', {
      'PathPart': 'health', // use proxy for catch all '{proxy+}'
    });
    templateFns.hasResourceProperties('AWS::ApiGateway::Resource', {
      'PathPart': 'graphql', // use proxy for catch all '{proxy+}'
    });
  });

  test('1 Lambda Function Created', () => {
    console.log('Testing Lambda Functions');
    templateFns.resourceCountIs('AWS::Lambda::Function', 1);
  });
});
