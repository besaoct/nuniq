
import { generators } from './generators';

 export type Config = {
  fn?: keyof typeof generators; // Optional generator function key
  keys?: Record<string, any>;   // Optional keys for the generator function
  dictionaries?: string[][];    // Optional dictionaries for word generation
  seed?: string | number;       // Optional seed for deterministic output
  length?: number;              // Optional length of the generated string
}
