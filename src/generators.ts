// generators.ts

import { Config } from './types';
import { name, slug, username } from './utils';

export const generators: Record<string, (config: Config) => string> = {
  username,
  name,
  slug,
};
