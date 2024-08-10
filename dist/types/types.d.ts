import { generators } from './generators';
export interface Config {
    fn?: keyof typeof generators;
    keys?: Record<string, any>;
    dictionaries?: string[][];
    seed?: string | number;
    length?: number;
}
