# Declaration files and JavaScript

| File | Shows |
|---|---|
| `legacy.js` | plain JavaScript typed with **JSDoc** comments and `// @ts-check` |
| `legacy.d.ts` | a **declaration file**: types for JavaScript that lives elsewhere |
| `types/globals.d.ts` | `declare global`, and augmenting Node's `ProcessEnv` |
| `main.ts` | importing the JavaScript with full type checking |

Most npm packages ship their own `.d.ts` files. For older ones, install community types:
```bash
npm install --save-dev @types/express
```
Browse them at [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

## Migrating a JavaScript project
1. Add a `tsconfig.json` with `"allowJs": true` and `"checkJs": false`.
2. Turn on checking file by file with `// @ts-check`, fixing errors as you go.
3. Rename files from `.js` to `.ts` one at a time; tighten `strict` options last.
