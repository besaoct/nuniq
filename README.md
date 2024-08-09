# nuniq

`nuniq` is a TypeScript-compatible utility for generating unique names, usernames, or random strings with customizable configurations. It supports various generator functions, optional seeds for deterministic output, and flexible configurations to suit different use cases.

## Features

- **Random String Generator**: Create cryptic and hashed random strings of a specified length.
- **Unique Username Generator**: Generate unique usernames based on full names, email addresses, and custom dictionaries.
- **Unique Name Generator**:  For generating random and unique names.
- **Unique Slug Generator**:  For generating url friendly unique and customizable slugs.
- **Customizable Configuration**: Configure generators with keys, dictionaries, and seed values.
- **Flexible Input**: Accepts configurations in various formats to simplify usage.
- **Custom Generator**: You can define and use your own custom generator functions with `nuniq`.

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
/* Same length of output for:
const randomString20 = nuniq(20, {});  
const randomString20 = nuniq({}, 20);
const randomString20 = nuniq({20});
*/
console.log(randomString20); // Example output: "qk56dra7u2lbx1c98en0"
```

## Usage of `username` Fn

### Configuring the Unique username generator

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

### Handling Different Seed Scenarios in `fn:'username'`

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

## Usage of `name` Fn

Coming soon...

## Usage of `slug` Fn

Coming soon...

## API

### `nuniq(config?: Config | number, lengthOrConfig?: number | Config): string`

Generates a unique string based on the provided configuration or length.

- **`config`**: An optional configuration object or a number:
  - If a configuration object is provided, it can include the following properties:
    - **`fn`**: The generator function to use. It should match a key in the `generators` object. Default is `undefined`.
    - **`keys`**: An optional object containing key-value pairs to customize the generator function.
    - **`dictionaries`**: An optional array of arrays, where each sub-array represents a word list to be used in generation.
    - **`seed`**: An optional seed (string or number) for deterministic generation.
    - **`length`**: Optional length for fallback random string.
  - If a number is provided, it specifies the length of the fallback generated string.
- **`lengthOrConfig`**: An optional parameter that can either be:
  - A number specifying the length of the generated string, or
  - Another configuration object, which will be merged with the first `config` parameter if provided.
  - Note: The length parameter will not override the length of the string generated by specific functions (`fn`). It's primarily useful for fallback random string generation or when no specific generator function is used.

### `nuniqor(name: string, generatorFn: GeneratorFn)`

Registers a custom generator function.

- **`name`**: The name to associate with the custom generator.
- **`generatorFn`**: The generator function.

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

## Custom Generator

You can define and use your own custom generator functions with `nuniq`.

### Define and Register a Custom Generator

1. **Define Your Custom Generator Function:**

   ```typescript
   // customGenerators.ts
   
   import { GeneratorFn } from 'nuniq';

   export const myCustomGenerator: GeneratorFn = (keys, dictionaries, seed) => {
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
  fn: 'myCustomGenerator',  // Use the name of your custom generator
  keys: { /* your keys here */ },
  dictionaries: [ /* your dictionaries here */ ],
  seed: 'optional_seed',
};

const generatedString = nuniq(configCustom);
console.log(generatedString); // Output will be generated by your custom generator
```

## License

MIT License © Shafin(@besaoct)
