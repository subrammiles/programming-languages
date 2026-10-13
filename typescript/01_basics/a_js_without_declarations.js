// Plain JavaScript (sloppy mode) lets you create a variable without let/const/var.
// It silently becomes a GLOBAL variable, a common source of bugs.
// Run: node 01_basics/a_js_without_declarations.js
// (This is a .js file, so TypeScript doesn't check it.)

a = 2;
console.log(a, globalThis.a); // 2 2 -> it leaked onto the global object
