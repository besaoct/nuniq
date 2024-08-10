import { Config } from '../index';
import { RandomSeed } from '../index';
import { NuniqDictionary } from '../dictionaries/nuniq-dictionaries';

/**
 * Generates a slug from content, author, and additional configurations.
 * @param config - The configuration object.
 * @returns A slug string.
 */

export const name = (config: Config): string => {

    // Default dictionaries
    const { Adjectives, Colors, Animals, Digits, Alphabets, MaleFirstNames, FemaleFirstNames } = NuniqDictionary;

    // Extracting from config
    const {
        keys = {},
        dictionaries = [], // User can provide custom dictionaries
        seed,
    } = config;

    const {
        wordLength = 3, // Number of words in the generated name
        separator = ' ', // Separator between words
        caseStyle = '', // Case style for the generated name
        stringSaltLength = 0, // When provided, adds a string of random alphabets of provided length
        numberSaltLength = 0, // When provided, adds a string of random numbers of provided length
        alphaNumericSaltLength = 0, // When provided, adds a random alphanumeric string of provided length
    } = keys;

    // Initialize RNG with sanitized seed or use Math.random
    const rng = seed ? RandomSeed(seed) : Math.random;

    // Use user-provided dictionaries if any, otherwise fallback to the default ones
    const availableDictionaries = dictionaries?.length > 0
        ? dictionaries
        : [Adjectives, Colors, Animals, Digits, Alphabets, MaleFirstNames, FemaleFirstNames];

    // Helper functions

    const getRandomItem = <T>(list: T[]): T => {
        return list[Math.floor(rng() * list?.length)];
    };

    const getRandomAlphabets = (length: number, rng: () => number): string => {
        const Alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
        return Array.from({ length }, () => Alphabets[Math.floor(rng() * Alphabets.length)]).join('');
    };

    const getRandomNumbers = (length: number, rng: () => number): string => {
        const Digits = '0123456789'.split('');
        return Array.from({ length }, () => Digits[Math.floor(rng() * Digits.length)]).join('');
    };

    const getRandomAlphaNumeric = (length: number, rng: () => number): string => {
        const AlphaNumeric = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
        return Array.from({ length }, () => AlphaNumeric[Math.floor(rng() * AlphaNumeric.length)]).join('');
    };

    // Function to apply case style
    const applyCaseStyle = (text: string): string => {
        switch (caseStyle) {
            case 'capital':
                return text
                    .split(separator)
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(separator);
            case 'uppercase':
                return text.toUpperCase();
            case 'lowercase':
                return text.toLowerCase();
            default:
                return text;
        }
    };

    // Function to generate a name, wrapped in a try-catch loop
    const generateName = (): string => {
        try {
            let generatedName = Array.from({ length: wordLength }, () => {
                const randomDictionary = getRandomItem(availableDictionaries);
                return getRandomItem(randomDictionary);
            }).join(separator);

            // Generate salts and insert them into the name
            const salts: string[] = [];
            if (stringSaltLength > 0) {
                salts.push(getRandomAlphabets(stringSaltLength, rng));
            }
            if (numberSaltLength > 0) {
                salts.push(getRandomNumbers(numberSaltLength, rng));
            }
            if (alphaNumericSaltLength > 0) {
                salts.push(getRandomAlphaNumeric(alphaNumericSaltLength, rng));
            }

            // Apply case style to salts
            const styledSalts = salts.map(salt => applyCaseStyle(salt));

            // Insert salts at random positions in the generated name
            if (styledSalts.length > 0) {
                const nameParts = generatedName.split(separator);
                let insertPosition = Math.floor(rng() * (nameParts.length + 1));

                styledSalts.forEach(salt => {
                    nameParts.splice(insertPosition, 0, salt);
                    insertPosition = Math.floor(rng() * (nameParts.length + 1));
                });

                generatedName = nameParts.join(separator);
            }


            if (typeof generatedName === 'string') {
                // Apply case style to the final generated name
                return applyCaseStyle(generatedName);
            } else {
                return ''
            }
        } catch (error) {
            return '';
        }
    };

    // Keep generating until a valid name is created
    let finalName = '';
    while (!finalName) {
        finalName = generateName();
    }

    return finalName;
};
