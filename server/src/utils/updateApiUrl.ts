import * as AWS from 'aws-sdk';
import { updateEnvVariable } from './updateEnvVar';
import { updateWranglerEnvVariable } from './updateWranglerEnvVar';

const region = 'us-east-1';
const tagKey = 'aws:cloudformation:stack-name';
const tagValue = 'MusicApp-API';

// Configure AWS SDK
AWS.config.update({ region });

// Initialize the API Gateway client
const apiClient = new AWS.APIGateway();

const getApiId = async () => {
  try {
    // Retrieve the API Gateway ID
    const data = await apiClient.getRestApis().promise();

    if (!data || !data?.items) {
      throw new Error('No data received');
    }

    const api = data.items.find(item => item.tags?.[tagKey] === tagValue);
    return api?.id || null;
  } catch (error) {
    console.error('Error retrieving API Gateway ID:', error);
    process.exit(1);
  }
};

export const updateApiUrl = async () => {
  const apiId = await getApiId();
  if (!apiId) {
    console.error('API Gateway ID not found');
    process.exit(1);
  }

  // Construct the API URL
  const stage = 'prod';
  const apiUrl = `https://${apiId}.execute-api.${region}.amazonaws.com/${stage}`;

  console.log('\n\n**** API URL:', apiUrl, '****\n\n');

  // Write the API Gateway URL to the .env.server file to be read by the client
  updateEnvVariable('API_URL', apiUrl);
  // Write the API Gateway URL to the wrangler.toml file to be read by the worker script
  updateWranglerEnvVariable('API_URL', apiUrl);
};