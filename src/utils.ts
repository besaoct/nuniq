// src/utils.ts

import { Config } from './types';
import { RandomSeed} from './seed'; // Import the custom seed function
import {NuniqDictionary} from './dictionaries'
/**
 * Generates a slug from content, author, and additional configurations.
 * @param config - The configuration object.
 * @returns A slug string.
 */


// `username` fn

export const username = (config: Config): string => {
  const {
    keys = {},
    dictionaries = [],
    seed,
  } = config;

  // Initialize RNG with sanitized seed or use Math.random
  const rng = seed ? RandomSeed(seed) : Math.random;

  const {
    fullName = '',
    email = '',
    withUnderscore = true,
    length = 12,
  } = keys;

  const firstName = fullName.split(' ')[0].toLowerCase().replace(/\s+/g, '_');
  const emailLocalPart = email.split('@')[0].toLowerCase();
  const emailWithoutVowels = emailLocalPart.replace(/[aeiou]/gi, '');
  const shuffledEmailPart = emailWithoutVowels.split('').sort(() => rng() - 0.5).join('').slice(0, 4);
  
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}`;
  const shuffledDate = formattedDate.split('').sort(() => rng() - 0.5).join('').slice(0, 4);
  
  let combinedPart = `${shuffledEmailPart}${shuffledDate}`;
  
  if (dictionaries.length > 0) {
    const nonEmptyDictionaries = dictionaries.filter(dict => dict && dict.length > 0);
    if (nonEmptyDictionaries.length > 0) {
      const randomDictionaryIndex = Math.floor(rng() * nonEmptyDictionaries.length);
      const randomDictionary = nonEmptyDictionaries[randomDictionaryIndex];
      if (randomDictionary.length > 0) {
        const randomWords = randomDictionary.slice(0, 2); // Take up to 2 words
        combinedPart = `${randomWords.join('_')}_${combinedPart}`;
      } else {
        console.warn('Random dictionary is empty:', randomDictionary);
      }
    } else {
      console.warn('No valid dictionaries provided:', dictionaries);
    }
  }
  
  if (withUnderscore) {
    const combinedPartArr = combinedPart.split('');
    const maxUnderscores = 2;
    let underscoreCount = 0;

    for (let i = 0; i < combinedPartArr.length; i++) {
      if (rng() > 0.5 && underscoreCount < maxUnderscores) {
        combinedPartArr.splice(i, 0, '_');
        underscoreCount++;
      }
    }

    combinedPart = combinedPartArr.join('');
  }
  
  let generatedUsername = `${firstName}${combinedPart}`.toLowerCase().replace(/[^a-z0-9_]/g, '');
  
  if (generatedUsername.length > length) {
    generatedUsername = generatedUsername.slice(0, length);
  } else if (generatedUsername.length < length) {
    while (generatedUsername.length < length) {
      generatedUsername += rng().toString(36).substr(2, length - generatedUsername.length);
    }
  }

  return generatedUsername;
};



// `slug` fn

export const slug = (config: Config): string => {
  const {
      keys = {},
      dictionaries = [],
      seed,
  } = config;

  const {
      content = '',       
      author = 'guest',
      contentLength = 64,  
      separator = '-',
  } = keys;

  // Truncate the content based on the provided contentLength
  const truncatedContent = content.length > contentLength ? content.slice(0, contentLength) : content;

  // Base slug generation
 let baseSlug = `${truncatedContent}${separator}by${separator}${author}`
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, separator)
      .replace(new RegExp(`${separator}+`, 'g'), separator)
      .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');

  // Initialize the random generator based on seed
  const rng = seed ? RandomSeed(seed) : Math.random;

  // Append random words from dictionaries
  if (dictionaries.length > 0) {
      const randomWords: string[] = [];
      const maxWords = Math.min(Math.floor(rng() * 9) + 1, dictionaries.length);

      for (let i = 0; i < maxWords; i++) {
          const dict = dictionaries[i];
          if (dict && dict.length > 0) {
              const randomIndex = Math.floor(rng() * dict.length);
              randomWords.push(dict[randomIndex]);
          }
      }

      baseSlug = `${randomWords.join(separator)}${separator}${baseSlug}`;
  }

  // Generate the current date string
  const date = new Date();
  const dateStr = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}-${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}-${String(date.getSeconds()).padStart(2, '0')}`;

  // Generate a random string using the seeded random generator
  const characters = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ0123456789';
  let randomString = '';

  for (let i = 0; i < 16; i++) {
      randomString += characters[Math.floor(rng() * characters.length)];
  }

  // Final slug construction
  return `${baseSlug}${separator}${dateStr}${separator}${randomString}`;
}


// `name` fn

export const name = (config: Config): string => {
  // Default dictionaries
 
  const {Adjectives, Colors, Animals, Digits, Alphabets, MaleFirstNames, FemaleFirstNames} = NuniqDictionary

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
  } = keys;

  // Initialize RNG with sanitized seed or use Math.random
  const rng = seed ? RandomSeed(seed) : Math.random;

  // Use user-provided dictionaries if any, otherwise fallback to the default ones
  const availableDictionaries = dictionaries.length > 0
    ? dictionaries
    : [Adjectives, Colors, Animals, Digits, Alphabets, MaleFirstNames, FemaleFirstNames];

  // Helper function to pick a random item from a list
  const getRandomItem = <T>(list: T[]): T => list[Math.floor(rng() * list.length)];

  // Generate the random name based on the specified word length
  let generatedName = Array.from({ length: wordLength }, () => {
    // Pick a random dictionary, then a random item from that dictionary
    const randomDictionary = getRandomItem(availableDictionaries);
    return getRandomItem(randomDictionary);
  }).join(separator);

  // Apply case style if specified
  switch (caseStyle) {
    case 'capital':
      generatedName = generatedName.replace(/\b\w/g, char => char.toUpperCase());
      break;
    case 'uppercase':
      generatedName = generatedName.toUpperCase();
      break;
    case 'lowercase':
      generatedName = generatedName.toLowerCase();
      break;
    default:
      break; // No case style applied
  }

  return generatedName;
};