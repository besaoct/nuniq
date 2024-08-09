// src/seed.ts

function fnv1aHash(str: string): number {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash >>> 0;
}

export function RandomSeed(seed: number | string): () => number {
    // Sanitize and normalize seed
    const sanitizedSeed = typeof seed === 'number'
        ? seed.toString()
        : seed.replace(/[^a-zA-Z0-9]/g, '');

    // Hash the sanitized seed
    const hashedSeed = fnv1aHash(sanitizedSeed);

    // Convert hashed seed to a usable RNG state
    let x = hashedSeed;

    // Return a function to generate pseudo-random numbers
    return () => {
        x ^= x << 13;
        x ^= x >> 17;
        x ^= x << 5;
        return (x >>> 0) / 0xFFFFFFFF;
    };
}
