// src/generators.ts

import { GeneratorFn } from './types';
import { username } from './utils';

export const generators: Record<string, GeneratorFn> = {
  username,
};
