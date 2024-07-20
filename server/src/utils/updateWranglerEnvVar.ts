import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { WRANGLER_TOML_FILE_LOCATION } from '../constants';
import { parse, stringify } from '@iarna/toml';

/**
 * Writes or updates an environment variable in the wrangler.toml file.
 *
 * @param key - The environment variable key.
 * @param value - The value to set for the environment variable.
 */
export const updateWranglerEnvVariable = (key: string, value: string): void => {
  const wranglerFilePath = resolve(process.cwd(), WRANGLER_TOML_FILE_LOCATION);
  let wranglerContent = '';

  if (existsSync(wranglerFilePath)) {
    wranglerContent = readFileSync(wranglerFilePath, 'utf8');
    const tomlConfig: any = parse(wranglerContent);

    // Ensure the [vars] section exists
    if (!tomlConfig.vars) {
      tomlConfig.vars = {};
    }

    // Update or add the environment variable
    tomlConfig.vars[key] = value;

    // Convert back to TOML format and write to file
    const updatedTomlContent = stringify(tomlConfig);
    writeFileSync(wranglerFilePath, updatedTomlContent, 'utf8');
  } else {
    console.error(`File not found: ${wranglerFilePath}`);
  }
};
