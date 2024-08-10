import { Config } from './types';
/**
 * Generates a unique name or string based on the provided configuration.
 * Delegates the generation process to the appropriate function.
 * @param config - The configuration object or length.
 * @returns A unique name or string.
 */
export declare function nuniq(config?: Config | number, lengthOrConfig?: number | Config): string;
/**
 * Registers a custom generator function.
 * @param name - The name to associate with the custom generator.
 * @param generatorFn - The generator function that generates a string based on the provided configuration.
 */
export declare function nuniqor(name: string, generatorFn: (config: Config) => string): void;
/**
 * Creates a pseudo-random number generator based on a given seed.
 * The generator returns numbers between 0 and 1.
 * @param seed - The seed value, which can be a number or a string.
 * @returns A function that generates pseudo-random numbers.
 */
export declare function RandomSeed(seed: number | string): () => number;
