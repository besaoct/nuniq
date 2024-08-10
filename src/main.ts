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
 * Creates a pseudo-random number generator based on a given seed.
 * The generator returns numbers between 0 and 1.
 * @param seed - The seed value, which can be a number or a string.
 * @returns A function that generates pseudo-random numbers.
 */
export function RandomSeed(seed: number | string): () => number {
  // Sanitize and normalize the seed value
  const sanitizedSeed = typeof seed === 'number'
    ? seed.toString()  // Convert number seed to string
    : seed.replace(/[^a-zA-Z0-9]/g, ''); // Remove non-alphanumeric characters from string seed

  /**
   * Hashes a string using the FNV-1a algorithm.
   * FNV-1a is a non-cryptographic hash function that generates a 32-bit hash.
   * @param str - The input string to hash.
   * @returns A 32-bit hash of the input string.
   */
  function fnv1aHash(str: string): number {
    let hash = 2166136261; // FNV-1a 32-bit offset basis
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i); // XOR with the byte value of the character
      // Multiply by the FNV prime (2^24 + 2^8 + 0x93)
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash >>> 0; // Ensure the hash is unsigned and 32-bit
  }

  // Hash the sanitized seed to create a hashed seed value
  const hashedSeed = fnv1aHash(sanitizedSeed);

  // Convert the hashed seed to a usable RNG state
  let x = hashedSeed;

  /**
   * Generates a pseudo-random number between 0 and 1.
   * @returns A pseudo-random number between 0 and 1.
   */
  return (): number => {
    // Xorshift algorithm to generate the next state
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    // Normalize the result to a number between 0 and 1
    return (x >>> 0) / 0xFFFFFFFF;
  };
}