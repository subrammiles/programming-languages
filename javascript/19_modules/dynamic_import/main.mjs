/*
ES modules: dynamic import(), import.meta, live bindings, import attributes
Run: node main.mjs   (from this folder, or node 19_modules/dynamic_import/main.mjs)

Static `import x from "..."`:
  - must be at the top level, with a fixed string path
  - loaded before any code in the file runs
Dynamic `import("...")`:
  - an expression that returns a PROMISE of the module object
  - works anywhere (inside if, functions, event handlers), in CommonJS files too
  - the path can be computed at runtime
  - used for lazy loading / code splitting (bundlers split the code at each import())
*/
import describe, { count, increment } from "./counter.mjs";
import * as counterModule from "./counter.mjs";// namespace import: every export as one object
import config from "./config.json" with { type: "json" };// import attributes (ES2025)

console.log("<<<< live bindings >>>>");
console.log(count, describe());// 0 count is 0
increment();
increment();
console.log(count, describe());// 2 count is 2   (the imported `count` updated itself)
try {
  count = 10;// imports are read-only views
} catch (e) {
  console.log(e.constructor.name);// TypeError
}
console.log(Object.keys(counterModule));// [ 'count', 'default', 'increment' ]

console.log("<<<< import.meta >>>>");
console.log(import.meta.filename.endsWith("main.mjs"));// true   (Node 20.11+; replaces __filename)
console.log(import.meta.dirname.endsWith("dynamic_import"));// true   (replaces __dirname)
console.log(import.meta.url.startsWith("file://"));// true

console.log("<<<< JSON import with import attributes >>>>");
console.log(config.appName, config.features);// demo [ 'search', 'export' ]

console.log("<<<< dynamic import: load only when needed >>>>");
async function calculate(op, n) {
  const math = await import("./heavy_math.mjs");// loaded on first call only, then cached
  return math[op](n);
}
console.log("before first call");
console.log(await calculate("square", 4));// (heavy_math.mjs loaded)  then  16
console.log(await calculate("cube", 3));// 27   (no second "loaded" message: modules are cached)

console.log("<<<< dynamic import with a computed path and error handling >>>>");
for (const name of ["heavy_math", "does_not_exist"]) {
  try {
    const mod = await import(`./${name}.mjs`);
    console.log(name, "exports:", Object.keys(mod));// heavy_math exports: [ 'cube', 'square' ]
  } catch (e) {
    console.log(name, "failed:", e.code);// does_not_exist failed: ERR_MODULE_NOT_FOUND
  }
}

console.log("<<<< loading a CommonJS / built-in module dynamically >>>>");
const { platform } = await import("node:os");
console.log(typeof platform());// string
