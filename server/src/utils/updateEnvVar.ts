import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SERVER_ENV_FILE_LOCATION } from '../constants';

/**
 * Writes or updates an environment variable in a .env.server file.
 *
 * @param key - The environment variable key.
 * @param value - The value to set for the environment variable.
 */
export const updateEnvVariable = (key: string, value: string): void => {
  const envFilePath = resolve(process.cwd(), SERVER_ENV_FILE_LOCATION);
  let envContent = '';

  // Read the existing .env.server file if it exists
  if (existsSync(envFilePath)) {
    envContent = readFileSync(envFilePath, 'utf8');
  }

  // Create or update the environment variable entry
  const keyPattern = new RegExp(`^${key}=.*$`, 'm');
  const newEntry = `${key}=${value}`;

  if (keyPattern.test(envContent)) {
    // Replace the existing key with the new value
    envContent = envContent.replace(keyPattern, newEntry);
  } else {
    // Append the new key-value pair
    envContent += `\n${newEntry}`;
  }

  // Write the updated content back to the .env.server file
  writeFileSync(envFilePath, envContent.trim(), 'utf8');
};