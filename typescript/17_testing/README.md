# Testing

Node's built-in test runner (`node:test`) runs TypeScript test files directly.

```bash
npm test                                  # all *.test.ts files
node --test 17_testing/                   # this folder only
node --test --watch 17_testing/           # re-run when files change
node --test --experimental-test-coverage  # coverage report
npm run check                             # tests are type-checked too
```

| Feature | In `cart.test.ts` |
|---|---|
| `describe` / `it` | grouping tests |
| `beforeEach` | a fresh `Cart` for every test |
| loops | one test per discount (table-driven) |
| `assert.throws` / `assert.rejects` | expecting errors |
| `mock.fn` | a fake function that records its calls |

Popular alternatives: **Vitest** (fast, Jest-compatible), **Jest**, **Playwright** (browser tests).
