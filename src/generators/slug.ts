import { Config } from "../types";
import { RandomSeed } from "../index";

/**
 * Generates a slug from content, author, and additional configurations.
 * @param config - The configuration object.
 * @returns A slug string.
 */

export const slug = (config: Config): string => {
  const { keys = {}, dictionaries = [], seed } = config;

  const {
    content = "",
    author = "guest",
    contentLength = 64,
    separator = "-",
  } = keys;

  // Truncate the content based on the provided contentLength
  const truncatedContent =
    content.length > contentLength ? content.slice(0, contentLength) : content;

  // Base slug generation
  let baseSlug = `${truncatedContent}${separator}by${separator}${author}`
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, separator)
    .replace(new RegExp(`${separator}+`, "g"), separator)
    .replace(new RegExp(`^${separator}+|${separator}+$`, "g"), "");

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
  const dateStr = `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}-${String(date.getHours()).padStart(
    2,
    "0"
  )}-${String(date.getMinutes()).padStart(2, "0")}-${String(
    date.getSeconds()
  ).padStart(2, "0")}`;

  // Generate a random string using the seeded random generator
  const characters = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ0123456789";
  let randomString = "";

  for (let i = 0; i < 16; i++) {
    randomString += characters[Math.floor(rng() * characters.length)];
  }

  // Final slug construction
  return `${baseSlug}${separator}${dateStr}${separator}${randomString}`;
};
