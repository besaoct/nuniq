// src/types.ts
import { generators } from './generators';

export type GeneratorFn = (keys?: Record<string, any>, dictionaries?: string[][], seed?: string | number) => string;
export type GeneratorKeys = keyof typeof generators;

export interface Config {
  fn?: GeneratorKeys;            // Optional generator function key
  keys?: Record<string, any>;   // Optional keys for the generator function
  dictionaries?: string[][];    // Optional dictionaries for word generation
  seed?: string | number;       // Optional seed for deterministic output
  length?: number;              // Optional length of the generated string
}
