import { Config, GeneratorFn } from './types';
import { generators} from './generators';
/**
 * Generates a unique name or string based on the provided configuration.
 * Delegates the generation process to the appropriate function.
 * @param config - The configuration object.
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

  const { fn, keys, dictionaries, seed } = finalConfig;
  
  const generatorFn = fn && generators[fn];

  if (generatorFn) {
    return generatorFn(keys, dictionaries, seed);
  }

  // Fallback: Generate a random string if no valid function is provided
  const length = finalConfig.length || 12;

  // Fallback: Generate a cryptic random string if no valid function is provided
  return randomString(length);
}



/**
 * Registers a custom generator function.
 * @param name - The name to associate with the custom generator.
 * @param generatorFn - The generator function.
 */
export function nuniqor(name: string, generatorFn: GeneratorFn) {
  generators[name] = generatorFn;
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
