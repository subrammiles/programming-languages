/*
Function composition
pipe(f, g, h)(x)    = h(g(f(x)))   runs left to right
compose(f, g, h)(x) = f(g(h(x)))   runs right to left
Build bigger functions out of small ones.
*/
const pipe = (...fns) => (input) => fns.reduce((value, fn) => fn(value), input);
const compose = (...fns) => (input) => fns.reduceRight((value, fn) => fn(value), input);

const trim = (s) => s.trim();
const lower = (s) => s.toLowerCase();
const toSlug = (s) => s.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const slugify = pipe(trim, lower, toSlug);
console.log(slugify("  Hello World! JavaScript 2026  "));// hello-world-javascript-2026

const slugify2 = compose(toSlug, lower, trim);// same thing, read right to left
console.log(slugify2("  Learn JS  "));// learn-js
