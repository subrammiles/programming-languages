# Testing

Node has a built-in test runner (`node:test`) and assertion library (`node:assert`).

```bash
cd 24_testing
node --test            # run all *.test.js files
node --test --watch    # re-run on save
```

| Assertion | Checks |
|---|---|
| `assert.equal(a, b)` | `a === b` (with `assert/strict`) |
| `assert.deepEqual(a, b)` | same structure and values |
| `assert.ok(x)` | `x` is truthy |
| `assert.throws(fn, expected)` | `fn` throws |
| `assert.rejects(promise, expected)` | promise rejects |
| `assert.match(str, /re/)` | string matches a regex |

Other popular test frameworks: **Vitest** (fast, Vite-based), **Jest**, **Playwright** (browser end-to-end).
