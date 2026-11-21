# What's new in JavaScript

JavaScript is standardised as **ECMAScript** by the TC39 committee. Since 2015 a new edition
comes out every June, named after its year (ES2015, ES2016, …). A feature joins an edition once
its proposal reaches **stage 4**; browsers and Node often ship it earlier.

| File | Covers |
|---|---|
| [1_es2022_to_es2024.js](1_es2022_to_es2024.js) | `.at()`, `Object.hasOwn`, class fields and `#private`, error `cause`, `findLast`, `toSorted` / `with`, `Object.groupBy`, `Promise.withResolvers`, the RegExp `/v` flag, resizable `ArrayBuffer` |
| [2_es2025.js](2_es2025.js) | iterator helpers, Set methods, `Promise.try`, `RegExp.escape`, regex modifiers, duplicate named groups, `Float16Array`, JSON modules |
| [3_newest_features.js](3_newest_features.js) | `using` / `await using`, `DisposableStack`, `Error.isError`, `Array.fromAsync` |

## Older editions at a glance

| Edition | Main features | Where in this repo |
|---|---|---|
| ES2015 (ES6) | `let` / `const`, arrows, classes, modules, promises, template literals, destructuring, spread / rest, default parameters, `Map` / `Set`, symbols, iterators, generators, `Proxy` | chapters 01, 03, 07, 11–14, 17–19, 22 |
| ES2016 | `**` operator, `Array.prototype.includes` | 03, 08 |
| ES2017 | `async` / `await`, `Object.entries` / `values`, `padStart` / `padEnd` | 05, 09, 17 |
| ES2018 | object rest / spread, async iteration (`for await`), `Promise.finally`, regex named groups and lookbehind | 03, 17, 18, 21 |
| ES2019 | `flat` / `flatMap`, `Object.fromEntries`, optional `catch` binding | 08, 09, 16 |
| ES2020 | `?.`, `??`, `BigInt`, `Promise.allSettled`, `globalThis`, dynamic `import()` | 03, 06, 17, 19 |
| ES2021 | `replaceAll`, `Promise.any`, `&&=` / `\|\|=` / `??=`, numeric separators, `WeakRef` | 03, 05, 11, 17 |

Track what your runtime supports at [node.green](https://node.green) and on MDN's compatibility tables.
