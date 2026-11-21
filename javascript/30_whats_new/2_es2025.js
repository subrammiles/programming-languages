/*
What's new: ES2025 (finalised June 2025)
All of these run on Node 24 and current browsers.
*/

console.log("<<<< iterator helpers: lazy map/filter/take on any iterator >>>>");
function* naturals() {
  let n = 1;
  while (true) yield n++;
}
console.log(naturals().filter((n) => n % 3 === 0).map((n) => n * 10).take(3).toArray());// [ 30, 60, 90 ]
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
console.log(map.values().reduce((sum, v) => sum + v, 0));// 6   (no need for [...map.values()])
console.log(Iterator.from({ next: () => ({ done: true }) }).toArray());// []

console.log("<<<< Set methods >>>>");
const js = new Set(["Ann", "Bo", "Cy"]);
const py = new Set(["Bo", "Cy", "Dee"]);
console.log(js.union(py), js.intersection(py));// Set(4) { 'Ann', 'Bo', 'Cy', 'Dee' } Set(2) { 'Bo', 'Cy' }
console.log(js.difference(py), js.symmetricDifference(py));// Set(1) { 'Ann' } Set(2) { 'Ann', 'Dee' }
console.log(new Set(["Bo"]).isSubsetOf(js), js.isDisjointFrom(new Set(["Zed"])));// true true

console.log("<<<< Promise.try: run sync-or-async code, always get a promise >>>>");
Promise.try(() => {
  throw new Error("sync error");
}).catch((e) => console.log("caught as a rejection:", e.message));// caught as a rejection: sync error
// (printed at the very end: .catch callbacks run as microtasks, after this file's sync code)

console.log("<<<< RegExp.escape: safely build a regex from user input >>>>");
const userInput = "1+1=2?";
console.log(new RegExp(RegExp.escape(userInput)).test("is 1+1=2? yes"));// true
// new RegExp(userInput) would treat + and ? as special characters

console.log("<<<< regex modifiers: flags for part of a pattern >>>>");
const re = /(?i:hello) World/;// only "hello" is case-insensitive
console.log(re.test("HELLO World"), re.test("hello WORLD"));// true false

console.log("<<<< duplicate named capture groups (in different alternatives) >>>>");
const dateRe = /(?<year>\d{4})-\d{2}|\d{2}\/(?<year>\d{4})/;
console.log("2025-06".match(dateRe).groups.year, "06/2025".match(dateRe).groups.year);// 2025 2025

console.log("<<<< Float16Array and Math.f16round >>>>");
const half = new Float16Array([1.337, 65504, 70000]);
console.log(half, half.BYTES_PER_ELEMENT);// Float16Array(3) [ 1.3369140625, 65504, Infinity ] 2
console.log(Math.f16round(0.1));// 0.0999755859375   (half precision: used by GPUs and ML models)

// Also ES2025: JSON modules with import attributes
//   import config from "./config.json" with { type: "json" };
// See 19_modules/dynamic_import/main.mjs
