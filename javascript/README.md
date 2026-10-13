# JavaScript

Examples organised as chapters, in the order they are meant to be read.
Run any file with `node <file>.js`. Most examples work on Node 20+.

| #  | Chapter | Topics |
|----|---------|--------|
| 00 | [Getting started](00_getting_started) | hello world, `console.log`, Node vs browser |
| 01 | [Variables and scope](01_variables_and_scope) | `var` / `let` / `const`, hoisting, block/function/global scope, template literals |
| 02 | [Data types](02_data_types) | primitives, `typeof`, type conversion, value vs reference |
| 03 | [Operators](03_operators) | arithmetic, equality, logical, bitwise, ternary, `??`, `?.`, `\|\|=` / `&&=` / `??=`, destructuring, spread, `instanceof` |
| 04 | [Loops and control flow](04_loops_and_control_flow) | `for`, `for...in` / `for...of`, `while`, `switch`, `break` / `continue`, labels, iterables |
| 05 | [Strings](05_strings) | quotes, escape characters, tagged templates, string methods (`replaceAll`, `padStart`, `trim`, `at`, `matchAll`, ...) |
| 06 | [Numbers](06_numbers) | numbers |
| 07 | [Functions](07_functions) | declarations vs expressions, arrow functions, callbacks, hoisting, IIFE, `bind` |
| 08 | [Arrays](08_arrays) | creating, iterating, rest/spread, `filter` / `map` / `reduce` / sort, `find` / `some` / `every` / `flat`, `toSorted` / `with`, `Object.groupBy`¹ |
| 09 | [Objects](09_objects) | creating, accessing, copying, getters/setters, constructors, `delete`, `freeze` / `seal`, `structuredClone`, `Object.hasOwn`, `entries` / `fromEntries` |
| 10 | [The `this` keyword](10_this_keyword) | global, function, method, arrow and callback `this` (Node and browser) |
| 11 | [Maps and sets](11_maps_and_sets) | `Map`, `Set`, map vs object, `WeakMap` / `WeakSet` / `WeakRef`, set methods (`union`, `intersection`, ...)² |
| 12 | [Symbols](12_symbols) | object keys, `Symbol` |
| 13 | [Prototypes and inheritance](13_prototypes_and_inheritance) | prototype chain, `setPrototypeOf`, extending built-ins |
| 14 | [Classes](14_classes) | class syntax, fields, private/static members, `static {}` blocks, `#x in obj`, inheritance, mixins, `super`, class vs function constructor |
| 15 | [Closures](15_closures) | lexical scope, closures, the counter dilemma |
| 16 | [Error handling](16_error_handling) | `Error`, `throw`, `try` / `catch` / `finally`, custom errors, `cause`, `AggregateError` |
| 17 | [Asynchronous programming](17_asynchronous_programming) | event loop, callbacks, promises (`all`, `allSettled`, `race`, `any`, `withResolvers`², `try`³), `async` / `await`, `fetch`, `AbortController` |
| 18 | [Iterators and generators](18_iterators_and_generators) | iterator protocol, `Symbol.iterator`, iterator helpers², `function*`, `yield*`, async generators |
| 19 | [Modules](19_modules) | CommonJS (`require`), ES modules (`import` / `export`) |
| 20 | [JSON](20_json) | `JSON.stringify`, `JSON.parse`, fixing invalid JSON |
| 21 | [Regular expressions](21_regular_expressions) | flags, named groups, lookahead/lookbehind, common patterns |
| 22 | [Proxy and Reflect](22_proxy_and_reflect) | traps, validation, `Reflect`, a tiny reactivity system |
| 23 | [Node built-ins](23_node_builtins) | `fs/promises`, `path`, `process`, `EventEmitter`, streams |
| 24 | [Testing](24_testing) | `node:test`, `node:assert`, mocking |
| 25 | [Browser and DOM](25_browser_dom) | selecting elements, events, delegation, `localStorage`, a to-do app (open the `.html` files in a browser) |
| 26 | [Workers](26_workers) | `worker_threads` (Node), Web Workers (browser) |
| 27 | [Patterns](27_patterns) | debounce, throttle, memoize, currying, compose/pipe, once |
| 28 | [Misc](28_misc) | dates, Temporal, `setTimeout` / `setInterval`, `eval` |

¹ needs Node 21+  ² needs Node 22+  ³ needs Node 23+.
Files that need a newer Node say so in their top comment.
The `fetch` examples need an internet connection.
