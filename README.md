# Nuniq

`nuniq` is a TypeScript-compatible node package for generating unique names, usernames, random strings, and more with customizable configurations. It supports various generator functions, optional seeds for deterministic output, and flexible configurations to suit different use cases.

## Features

- **Random String Generator**: Create cryptic and hashed random strings of a specified length.
- **Unique Username Generator**: Generate unique usernames based on full names, email addresses, and custom dictionaries.
- **Unique Name Generator**: Generate random and unique names.
- **Unique Slug Generator**: Generate URL-friendly, unique, and customizable slugs.
- **Customizable Configuration**: Configure generators with keys, dictionaries, and seed values.
- **Flexible Input**: Accepts configurations in various formats to simplify usage.
- **Custom Generator**: Define and use your own custom generator functions with `nuniq`.

## Installation

```bash
npm install nuniq
```

## Basic Example

You can generate a random string by simply calling `nuniq()` with an optional length:

```typescript
import { nuniq } from 'nuniq';

// Generate a random string with a default length of 12 characters
const randomString = nuniq();
console.log(randomString); // Example output: "n1kbsbf4mct"

// Generate a random string with a specified length
const randomString20 = nuniq(20); 
/* Other valid ways to specify length:
const randomString20 = nuniq(20, {});  
const randomString20 = nuniq({}, 20);
const randomString20 = nuniq({ length: 20 });
*/
console.log(randomString20); // Example output: "qk56dra7u2lbx1c98en0"
```

## Usage of `username` Function

### Configuring the Unique Username Generator

You can customize the username generator by providing a configuration object. The configuration can include `fn`, `keys`, `dictionaries`, and an optional `seed`.

```typescript
import { nuniq } from 'nuniq';

const config = {
  fn: 'username',
  keys: {
    fullName: 'Shafin Ahmed',
    email: 'besaoct@example.com',
    length: 28,
    withUnderscore: true,
  },
  seed: '1', // Optional seed for deterministic output
  dictionaries: [['blue', 'green', 'red'], ['rabbit', 'cat']],
};

// Generate a username with the given configuration
const usernameWithSeed = nuniq(config);
console.log(usernameWithSeed); // Example output: "shafin__green_blcp8049myijc9"
```

### Handling Different Seed Scenarios in `fn: 'username'`

- **No Seed or Empty Seed:**
  When the seed is empty or not provided, the output will vary each time.

  ```typescript
  const configWithoutSeed = {
    fn: 'username',
    keys: {
      fullName: 'Shafin Ahmed',
      email: 'besaoct@example.com',
      length: 28,
      withUnderscore: true,
    },
    dictionaries: [['blue', 'green', 'red'], ['rabbit', 'cat']],
  };

  const username1 = nuniq(configWithoutSeed);
  console.log(username1); // Example output: "shafin__cat_kbcp20244a5v3yui"

  const username2 = nuniq(configWithoutSeed);
  console.log(username2); // Example output: "shafinr_o_se_lcbk90248ch3dfz"
  ```

- **Fixed Seed:**
  When a seed is provided, the output will be deterministic.

  ```typescript
  const configWithSeed = {
    fn: 'username',
    keys: {
      fullName: 'Shafin Ahmed',
      email: 'besaoct@example.com',
      length: 28,
      withUnderscore: true,
    },
    seed: '1', // Fixed seed for deterministic output
    dictionaries: [['blue', 'green', 'red'], ['rabbit', 'cat']],
  };

  const username1 = nuniq(configWithSeed);
  console.log(username1); // Example output: "shafin__green_blcp8049myijc9"

  const username2 = nuniq(configWithSeed);
  console.log(username2); // Example output: "shafin__green_blcp8049myijc9"
  ```

### Empty Configuration or No Configuration

- **Empty Configuration:**

  ```typescript
  const emptyConfig = {};
  const randomString = nuniq(emptyConfig);
  console.log(randomString); // Example output: "n1kbsbf4mct"
  ```

- **No Configuration:**

  ```typescript
  const randomString = nuniq();
  console.log(randomString); // Example output: "qk56dra7u2l"
  ```

## Usage of `name` Function

The `name` function generates a name by combining random words from provided dictionaries, with options to include additional salts (random strings) like alphabets, numbers, and alphanumeric characters. The function can be configured with various options to customize the output, such as case style, separators, and the length of the generated name and salts.

### Configuring the Name Generator

You can customize the name generator by providing a configuration object with `keys` and optional `dictionaries`, and `seed`.

```typescript
import { nuniq, NuniqDictionary } from 'nuniq';

const { Colors, Adjectives, Digits } = NuniqDictionary;

const config = {
  fn: 'name',
  keys: {
    wordLength: 2, // Number of words from dictionaries to include in the generated name
    separator: '_', // Separator between words and salts
    caseStyle: 'capital', // Capitalize the first letter of each word and salt
    stringSaltLength: 10, // Add a random string of 10 alphabets as salt
    numberSaltLength: 5, // Add a random string of 5 digits as salt
    alphanumericSaltLength: 6, // Add a random alphanumeric string of 6 characters as salt
  },
  seed: 1, // Optional seed for deterministic output
  dictionaries: [['shafin'], Digits, Colors, Adjectives], // Custom dictionaries to generate the name
};

const generatedName = nuniq(config);

console.log(generatedName);
```

#### Example Output

Running the above code could generate an output like:

```console
Shafin_blue_Ouowhfpjid_01234_Rvjgl9
```

### Handling Different Scenarios in `fn: 'name'`

- **No Configuration or Empty Configuration:**

  ```typescript
  const defaultNameConfig = {};
  const defaultName = nuniq(defaultNameConfig);
  console.log(defaultName); // Example output: "big-cat"
  ```

- **Custom Dictionaries:**

  ```typescript
  const customDictionaries = [
    ['powerful', 'mighty', 'strong'],
    ['red', 'green', 'blue'],
    ['lion', 'tiger', 'bear']
  ];
  
  const customNameConfig = {
    fn: 'name',
    keys: { wordLength: 3, separator: '_' },
    dictionaries: customDictionaries,
  };
  
  const customName = nuniq(customNameConfig);
  console.log(customName); // Example output: "powerful_lion_bear"
  ```

### Configuration Options

- **`fn: string`** - Specifies the function to use. In this case, `'name'`.
  
- **`keys: object`** - Configuration options for the `name` function:
  - **`wordLength: number`** - The number of words to pick from the provided dictionaries.
  - **`separator: string`** - A string to use as a separator between the words and salts.
  - **`caseStyle: string`** - The case style to apply to the generated name and salts. Options are:
    - `'capital'` - Capitalize the first letter of each word.
    - `'uppercase'` - Convert all characters to uppercase.
    - `'lowercase'` - Convert all characters to lowercase.
  - **`stringSaltLength: number`** - The length of the random alphabetic string salt to be added.
  - **`numberSaltLength: number`** - The length of the random numeric string salt to be added.
  - **`alphanumericSaltLength: number`** - The length of the random alphanumeric string salt to be added.
  
- **`dictionaries: Array<string[]>`** - An array of dictionaries from which words will be randomly selected. Each dictionary should be an array of strings.

### Behavior

- The function randomly selects words from the provided dictionaries based on `wordLength`.
- It then generates salts (random strings) as per the provided salt lengths (`stringSaltLength`, `numberSaltLength`, `alphanumericSaltLength`).
- These salts are inserted at random positions in the generated name.
- The entire name, including salts, can be customized with separators and case styling.

## Usage of `slug` Function

The `slug` function generates a URL-friendly slug with customizable content, author, and separators. It also appends random words and a timestamp.

### Configuring the Slug Generator

You can customize the slug generator by providing a configuration object with `keys` and optional `dictionaries`, and `seed`.

```typescript
import { nuniq } from 'nuniq';

const slugConfig = {
  fn: 'slug',
  keys: {
    content: 'My Awesome Blog Post',
    author: 'john_doe',
    contentLength: 50,
    separator: '-', 
  },
  dictionaries: [
    ['quick', 'lazy', 'bright'], // Custom words to append
  ],
  seed: '5678', // Optional seed for deterministic output
};

// Generate a slug with the given configuration
const slug = nuniq(slugConfig);
console.log(slug); // Example output: "quick-lazy-bright-my-awesome-blog-post-john_doe-12-08-2024-14-30-45-randomstring"
```

### Handling Different Scenarios in `fn: 'slug'`

- **No Configuration or Empty Configuration:**

  ```typescript
  const defaultSlugConfig = {};
  const defaultSlug = nuniq(defaultSlugConfig);
  console.log(defaultSlug); // Example output: "default-slug"
  ```

- **Custom Content and Author:**

  ```typescript
  const customSlugConfig = {
    fn: 'slug',
    keys: {
      content: 'New Product Launch',
      author: 'marketing_team',
      contentLength: 16, // Maximum number of characters to which the content should be truncated
      separator: '_', //you can use: '_' or '-'
    },
    dictionaries: [
      ['exciting', 'innovative'], // Custom words to append
    ],
  };
  
  const customSlug = nuniq(customSlugConfig);
  console.log(customSlug); // Example output: "exciting_innovative_new_product_launch_by_marketing_team_12-08-2024-14-30-45-randomstring"
  ```

## API

### `nuniq(config?: Config | number, lengthOrConfig?: number | Config): string`

Generates a unique string based on the provided configuration or length.

- **`config`**: An optional configuration object or a number:
  - If a configuration object is provided, it can include the following properties:
    - **`fn`**: The generator function to use. It should match a key in the `generators` object. Default is `undefined`.
    - **`keys`**: An optional object containing key-value pairs to customize the generator function.
    - **`dictionaries`**: An optional array of arrays, where each sub-array represents a word list to be used in generation.
    - **`seed`**: An optional seed (string or number) for deterministic generation.
    - **`length`**: Optional length for fallback random string generation.
  - If a number is provided, it specifies the length of the fallback generated string.
- **`lengthOrConfig`**: An optional parameter that can either be:
  - A number specifying the length of the generated string, or
  - Another configuration object, which will be merged with the first `config` parameter if provided.
  - Note: The length parameter will not override the length of the string generated by specific functions (`fn`). It's primarily useful for fallback random string generation or when no specific generator function is used.

### `nuniqor(name: string, config: Config)`

Registers a custom generator function.

- **`name`**: The name to associate with the custom generator.
- **`config`**: The configuration object for the custom generator function.

### Config Interface

```typescript
interface Config {
  fn?: keyof typeof generators; // Optional generator function key
  keys?: Record<string, any>;   // Optional keys for the generator function
  dictionaries?: string[][];    // Optional dictionaries for word generation
  seed?: string | number;       // Optional seed for deterministic output
  length?: number;              // Optional length for fallback random string
}
```

## Dictionaries: `NuniqDictionaries`

You can use our predefined dictionaries to generate names, usernames or slugs.

```typescript
import { NuniqDictionaries } from 'nuniq';

// Access predefined dictionaries
const { Adjectives, Colors, FemaleFirstNames, FemaleSurnames, MaleFirstNames, MaleSurnames, Animals, Digits, Alphabets} = NuniqDictionaries;
```

## Custom Generator

You can define and use your own custom generator functions with `nuniq`.

### Define and Register a Custom Generator

1. **Define Your Custom Generator Function:**

   ```typescript
   // customGenerators.ts

   import { Config, RandomSeed } from 'nuniq';

   export const myCustomGenerator = (config: Config): string => {
     const { keys = {}, dictionaries = [], seed } = config;

     // Initialize RNG with sanitized seed or use Math.random
     const rng = seed ? RandomSeed(seed) : Math.random;

     const {
       // Custom keys
       length = 12, // Example length
     } = keys;

     // Your custom generation logic here
     return 'custom_generated_string';
   };
   ```

2. **Register Your Custom Generator:**

   ```typescript
   // index.ts or any entry point of your application

   import { nuniqor } from 'nuniq';
   import { myCustomGenerator } from './customGenerators';

   nuniqor('myCustomGenerator', myCustomGenerator);
   ```

### Use Your Custom Generator

You can now use your custom generator function with `nuniq`:

```typescript
import { nuniq } from 'nuniq';

const configCustom = {
  fn: 'myCustomGenerator', // Use the name of your custom generator
  keys: { /* your keys here */ },
  dictionaries: [ /* your dictionaries here */ ],
  seed: 'optional_seed',
};

const generatedString = nuniq(configCustom);
console.log(generatedString); // Output will be generated by your custom generator
```

## License

MIT [License](https://raw.githubusercontent.com/besaoct/nuniq/Main/LICENSE) © Shafin (@besaoct)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/besaoct/nuniq).
