import { Config } from '../index';
import { username } from './username';
import { name } from './name';
import { slug } from './slug';

export const generators: Record<string, (config: Config) => string> = {
  username,
  name,
  slug,
};
