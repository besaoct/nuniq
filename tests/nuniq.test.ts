// src/nuniq.test.ts
import { nuniq, Config } from './../src';
test('should generate a random string if no valid function is provided', () => {
    const config = { fn: 'nonExistentFunction' } as Config;
  
    const result = nuniq(config);
    expect(result).toMatch(/^[a-z0-9]{12}$/);
  });
  