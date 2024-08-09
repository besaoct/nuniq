// nuniq.ts

import { Config } from './types';
import { generators } from './generators';

/**
 * Generates a unique name or string based on the provided configuration.
 * Delegates the generation process to the appropriate function.
 * @param config - The configuration object or length.
 * @returns A unique name or string.
 */
export function nuniq(config?: Config | number, lengthOrConfig?: number | Config): string {

  let finalConfig: Config = {};

  if (typeof config === 'number') {
    finalConfig = { length: config };
  } else if (typeof lengthOrConfig === 'number') {
    finalConfig = { ...config, length: lengthOrConfig };
  } else if (config) {
    finalConfig = { ...config, ...(lengthOrConfig || {}) };
  }

  const { fn } = finalConfig;

  const generatorFn = fn && generators[fn];

  if (generatorFn) {
    return generatorFn(finalConfig);
  }

  // Fallback: Generate a random string if no valid function is provided
  const length = finalConfig.length || 12;

  return randomString(length);
}

/**
 * Registers a custom generator function.
 * @param name - The name to associate with the custom generator.
 * @param generatorFn - The generator function that generates a string based on the provided configuration.
 */
export function nuniqor(name: string, generatorFn: (config: Config) => string) {
  if (typeof name === 'string' && typeof generatorFn === 'function') {
    generators[name] = generatorFn;
  } else {
    console.error('Invalid name or generator function provided to nuniqor');
  }
}

/**
 * Generates a cryptic random string.
 * @param len - Length of the random string.
 * @returns A cryptic random string of the specified length.
 */
const randomString = (len: number): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  let dateSalt = new Date().toISOString().replace(/[^0-9]/g, '');
  let combinedSeed = `${Math.random()}${dateSalt}${len}`;
  
  for (let i = 0; i < len; i++) {
    let hash = 0;
    for (let j = 0; j < combinedSeed.length; j++) {
      hash = (hash << 5) - hash + combinedSeed.charCodeAt(j);
      hash |= 0;
    }
    result += charset[Math.abs(hash) % charset.length];
    combinedSeed = result; // Use the result as a new seed for the next iteration
  }
  return result;
};
