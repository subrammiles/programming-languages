# TypeScript

Examples organised as chapters, in the order they are meant to be read.
They cover the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
plus the modern features and tooling used in projects today.

Uses **TypeScript 7** and **Node.js 22.18+** (Node runs `.ts` files directly).

## Setup and running

```bash
cd typescript
npm install                                   # once: installs TypeScript and Node's types
node 05_unions_and_narrowing/b_discriminated_unions.ts   # run any file
npm run check                                 # type-check everything (tsc)
npm test                                      # run the tests (chapter 17)
```

**Node runs the code; TypeScript checks it.** Node only removes the types, it never
reports type errors, so keep `npm run check` (or VS Code's red underlines) in your routine.

A few files use features that generate code (`enum`, parameter properties). They say so at
the top and run with `node --experimental-transform-types file.ts`. Decorators need
`npx tsx file.ts` until Node supports them.

Files starting `a_`, `b_`, `c_` … are meant to be read in that order.

## Chapters

| #  | Chapter | Topics |
|----|---------|--------|
| 00 | [Getting started](00_getting_started) | install, running `.ts` with Node, `tsc`, `tsconfig.json` |
| 01 | [Basics](01_basics) | JS vs TS, `let` / `const`, basic types, inference, `any`, `unknown`, `never`, literal types, assertions, modules vs scripts |
| 02 | [Arrays and tuples](02_arrays_and_tuples) | typed arrays, unions, `readonly`, tuples (named, optional, readonly) |
| 03 | [Objects](03_objects) | object types, optional and `readonly` properties, excess property checks, index signatures |
| 04 | [Functions](04_functions) | parameters, optional/default/rest, function types, overloads, `this` |
| 05 | [Unions and narrowing](05_unions_and_narrowing) | `typeof` / `in` / `instanceof`, discriminated unions, `never` checks, type predicates, `satisfies` |
| 06 | [Type aliases and interfaces](06_type_aliases_and_interfaces) | `type`, `interface`, `extends`, intersections, declaration merging |
| 07 | [Enums](07_enums) | numeric and string enums, the `as const` alternative |
| 08 | [Classes](08_classes) | fields, access modifiers, `#private`, getters/setters, `static`, `implements`, `abstract`, parameter properties |
| 09 | [Generics](09_generics) | generic functions and classes, constraints, `keyof`, `const` type parameters, `NoInfer` |
| 10 | [Utility types](10_utility_types) | `Partial`, `Required`, `Readonly`, `Record`, `Pick`, `Omit`, `Exclude`, `ReturnType`, `Parameters`, `Awaited` |
| 11 | [Advanced types](11_advanced_types) | `keyof` / `typeof` / indexed access, conditional types, `infer`, mapped types, template literal types, branded types |
| 12 | [Modules](12_modules) | `import` / `export`, `import type`, barrels, dynamic `import()` |
| 13 | [Async](13_async) | `Promise<T>`, `async` / `await`, `unknown` in `catch`, a typed `fetch` |
| 14 | [Decorators](14_decorators) | standard decorators for methods and classes |
| 15 | [Patterns](15_patterns) | Result types, `using`, exhaustive checks, typed fluent APIs |
| 16 | [Declarations and JavaScript](16_declarations_and_javascript) | `.d.ts` files, JSDoc types, `declare global`, migrating from JS |
| 17 | [Testing](17_testing) | `node:test` with TypeScript, mocks, async tests |
| 18 | [What's new](18_whats_new) | TypeScript 4.9 → 7.0 |
