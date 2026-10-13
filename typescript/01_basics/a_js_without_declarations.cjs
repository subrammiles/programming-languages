// Plain JavaScript in "sloppy mode" lets you create a variable without let/const/var.
// It silently becomes a GLOBAL variable, a common source of bugs.
// Run: node 01_basics/a_js_without_declarations.cjs
//
// .cjs = an old-style CommonJS script, which runs in sloppy mode.
// In a .js ES module (this project's package.json says "type": "module") or with
// "use strict", the same line throws:  ReferenceError: a is not defined
// TypeScript rejects it at compile time instead (see b_ts_needs_declarations.ts).

a = 2;
console.log(a, globalThis.a); // 2 2 -> it leaked onto the global object
