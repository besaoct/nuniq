// src/utils.ts

import { GeneratorFn } from './types';
import { RandomSeed} from './seed'; // Import the custom seed function

export const username: GeneratorFn = (keys = {}, dictionaries = [], seed) => {
  // Initialize RNG with sanitized seed or use Math.random
  const rng = seed ? RandomSeed(seed) : Math.random;

  const fullName = keys.fullName || '';
  const email = keys.email || '';
  
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
  
  if (keys.withUnderscore !== false) {
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
  const length = keys.length || 12;
  
  if (generatedUsername.length > length) {
    generatedUsername = generatedUsername.slice(0, length);
  } else if (generatedUsername.length < length) {
    while (generatedUsername.length < length) {
      generatedUsername += rng().toString(36).substr(2, length - generatedUsername.length);
    }
  }

  return generatedUsername;
};
