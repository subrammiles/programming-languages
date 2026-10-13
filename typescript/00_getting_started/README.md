# Getting started

## Setup (once)
```bash
cd typescript
npm install          # installs TypeScript 7 and Node's type definitions into node_modules/
```
You need **Node.js 22.18 or newer** (24 recommended): `node --version`.

## Running and checking
| Command | What it does |
|---|---|
| `node 00_getting_started/hello_world.ts` | run a file (Node removes the types and runs the JavaScript) |
| `npm run check` | type-check every file with `tsc` (finds errors, runs nothing) |
| `npx tsc --noEmit some/file.ts` | check one file (ignores tsconfig) |
| `npm test` | run the tests (chapter 17) |

Node only *strips* types; it never checks them. Always run `npm run check` (or watch the
red underlines in VS Code) to find type errors.

A few features generate code, not just types (`enum`, `namespace`, class parameter
properties). Files using them say so at the top and run with:
```bash
node --experimental-transform-types file.ts
```

## tsconfig.json
`tsconfig.json` (in the `typescript/` folder) holds the compiler settings. It turns on `strict` mode and
the other safety checks most projects use. Every option is commented there.

## Try it online
[typescriptlang.org/play](https://www.typescriptlang.org/play) – write TypeScript and see the errors and output instantly.
