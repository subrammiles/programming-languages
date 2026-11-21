# JavaScript

Examples organised as chapters, in the order they are meant to be read.
They cover the core language (following [javascript.info](https://javascript.info/) and
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)), Node.js, the browser,
and the features added up to ES2025 and beyond.

Written for **Node.js 24** (most files also run on Node 20+; the ones that need newer
features say so at the top). Check your version with `node --version`.

## Running the examples

Every `.js` file is a standalone script:

```bash
cd javascript
node 15_closures/c_closure.js
node 19_modules/dynamic_import/main.mjs   # .mjs files are ES modules
```

Files in [25_browser_dom](25_browser_dom) and the web examples are `.html`: open them in a browser.
Each `console.log` is followed by a `// comment` with the expected output.

## Chapters

| #  | Chapter | Topics |
|----|---------|--------|
| 00 | [Getting started](00_getting_started) | running JS with Node, `console.log`, the Node CLI |
| 01 | [Variables and scope](01_variables_and_scope) | `var` / `let` / `const`, global, function and block scope, hoisting, template literals |
| 02 | [Data types](02_data_types) | primitives vs objects, `typeof`, type conversion, pass by value vs reference |
| 03 | [Operators](03_operators) | arithmetic, `==` vs `===`, logical, bitwise, ternary, destructuring, spread, `?.`, `??`, logical assignment |
| 04 | [Loops and control flow](04_loops_and_control_flow) | `for`, `for...in` / `for...of`, `while`, `switch`, `break` / `continue`, labels |
| 05 | [Strings](05_strings) | quotes, escapes, tagged templates, string methods |
| 06 | [Numbers](06_numbers) | number methods, `Number.*` checks, rounding gotchas, `Math`, random numbers, `BigInt` |
| 07 | [Functions](07_functions) | declarations vs expressions, arrows, callbacks, `bind`, hoisting, IIFE, default and rest parameters, `arguments`, higher-order and pure functions, recursion |
| 08 | [Arrays](08_arrays) | creating, iterating, `map` / `filter` / `reduce`, `find`, `flat`, `at`, copy methods, `groupBy` |
| 09 | [Objects](09_objects) | creation, access, iteration, copying and cloning, freeze / seal, getters / setters, property descriptors |
| 10 | [The `this` keyword](10_this_keyword) | `this` in functions, methods, arrows, callbacks, constructors, Node vs browser |
| 11 | [Maps and sets](11_maps_and_sets) | `Map`, `Set`, Set methods, `WeakMap`, `WeakSet`, `WeakRef` |
| 12 | [Symbols](12_symbols) | unique keys, `Symbol.for`, well-known symbols (`iterator`, `toPrimitive`, `hasInstance`) |
| 13 | [Prototypes and inheritance](13_prototypes_and_inheritance) | prototype chain, `Object.create`, `__proto__`, extending built-ins |
| 14 | [Classes](14_classes) | syntax, fields, private `#members`, static, getters / setters, inheritance, `super`, mixins |
| 15 | [Closures](15_closures) | lexical scope, closures, the counter problem |
| 16 | [Error handling](16_error_handling) | `try` / `catch` / `finally`, `throw`, custom errors, `cause`, `AggregateError` |
| 17 | [Asynchronous programming](17_asynchronous_programming) | callbacks, promises and the Promise API, `async` / `await`, the event loop, `fetch`, `AbortController` |
| 18 | [Iterators and generators](18_iterators_and_generators) | iterator protocol, custom iterables, generators, `next` / `return` / `throw`, `yield*`, async generators, iterator helpers |
| 19 | [Modules](19_modules) | CommonJS (`require`), ES modules (`import` / `export`), dynamic `import()`, `import.meta`, live bindings, JSON modules |
| 20 | [JSON](20_json) | `JSON.stringify`, `JSON.parse`, common parsing errors |
| 21 | [Regular expressions](21_regular_expressions) | patterns, flags, named groups, lookahead / lookbehind, common patterns |
| 22 | [Proxy and Reflect](22_proxy_and_reflect) | traps, validation, `Reflect`, a small reactivity system |
| 23 | [Node built-ins](23_node_builtins) | `fs`, `path`, `process`, `EventEmitter`, streams, an HTTP server, `child_process`, `crypto` |
| 24 | [Testing](24_testing) | `node:test` and `node:assert` |
| 25 | [Browser DOM](25_browser_dom) | selecting and changing elements, events, event delegation, `localStorage`, a todo app |
| 26 | [Workers](26_workers) | Web Workers, Node `worker_threads` |
| 27 | [Patterns](27_patterns) | debounce, throttle, memoize, currying, compose / pipe, once, module, singleton, factory, builder, observer, strategy |
| 28 | [Misc](28_misc) | `Date`, Temporal, timers, `eval`, strict mode, `Intl` formatting, typed arrays and binary data |
| 29 | [Interview questions](29_interview_questions) | polyfills, implementations from scratch, "predict the output" puzzles, coding problems |
| 30 | [What's new](30_whats_new) | ES2022 → ES2025 and the newest features (`using`, `Error.isError`, `Array.fromAsync`) |

## Interview preparation

[29_interview_questions](29_interview_questions) collects the programs interviews ask you to write or predict:
polyfills (`map`, `bind`, `Promise.all`, a custom Promise), utilities (deep clone, EventEmitter, LRU cache,
retry, concurrency limit), "predict the output" puzzles (hoisting, closures, `this`, event loop, coercion)
and classic coding problems (strings, arrays, recursion, sorting, linked lists and trees).
