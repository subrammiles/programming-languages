/*
What's new: ES2022, ES2023, ES2024
A quick tour; most features have a longer example in their own chapter.
All of these run on Node 22+ and current browsers.
*/

console.log("======== ES2022 ========");

console.log("<<<< .at(): negative indexes >>>>");
const letters = ["a", "b", "c"];
console.log(letters.at(-1), "hello".at(-1));// c o

console.log("<<<< Object.hasOwn (safer than obj.hasOwnProperty) >>>>");
const noProto = Object.create(null);
noProto.x = 1;
console.log(Object.hasOwn(noProto, "x"));// true   (noProto.hasOwnProperty would throw)

console.log("<<<< class fields, private members, static blocks, #x in obj >>>>");
class Counter {
  count = 0;// public field
  #step = 1;// private field
  static instances = 0;
  static {// static initialisation block
    Counter.instances = 0;
  }
  constructor() {
    Counter.instances++;
  }
  #log() {// private method
    return `count=${this.count}`;
  }
  inc() {
    this.count += this.#step;
    return this.#log();
  }
  static isCounter(obj) {
    return #step in obj;// brand check without try/catch
  }
}
const c = new Counter();
console.log(c.inc(), Counter.instances, Counter.isCounter(c), Counter.isCounter({}));// count=1 1 true false

console.log("<<<< Error cause >>>>");
try {
  try {
    JSON.parse("{bad");
  } catch (err) {
    throw new Error("could not load config", { cause: err });
  }
} catch (e) {
  console.log(e.message, "<-", e.cause.constructor.name);// could not load config <- SyntaxError
}

console.log("<<<< RegExp match indices (/d) >>>>");
console.log(/(?<word>world)/d.exec("hello world").indices.groups.word);// [ 6, 11 ]

// Also ES2022: top-level await in ES modules (see 19_modules/dynamic_import/main.mjs)

console.log("======== ES2023 ========");

console.log("<<<< findLast / findLastIndex >>>>");
const nums = [5, 12, 8, 130, 44];
console.log(nums.findLast((n) => n > 10), nums.findLastIndex((n) => n > 10));// 44 4

console.log("<<<< change array by copy: toSorted, toReversed, toSpliced, with >>>>");
const original = [3, 1, 2];
console.log(original.toSorted(), original.toReversed(), original.toSpliced(1, 1), original.with(0, 9));
// [ 1, 2, 3 ] [ 2, 1, 3 ] [ 3, 2 ] [ 9, 1, 2 ]
console.log(original);// [ 3, 1, 2 ]   (unchanged)

console.log("<<<< symbols as WeakMap keys >>>>");
const cache = new WeakMap([[Symbol("key"), "value"]]);
console.log(cache instanceof WeakMap);// true

// Also ES2023: #!/usr/bin/env node (hashbang) is allowed at the top of a file

console.log("======== ES2024 ========");

console.log("<<<< Object.groupBy / Map.groupBy >>>>");
const people = [
  { name: "Ann", age: 17 },
  { name: "Bo", age: 34 },
  { name: "Cy", age: 15 },
];
const byGroup = Object.groupBy(people, (p) => (p.age >= 18 ? "adult" : "minor"));
console.log(byGroup.minor.map((p) => p.name), byGroup.adult.map((p) => p.name));// [ 'Ann', 'Cy' ] [ 'Bo' ]

console.log("<<<< Promise.withResolvers >>>>");
const { promise, resolve } = Promise.withResolvers();
setTimeout(() => resolve("resolved from outside"), 10);

console.log("<<<< well-formed strings (lone surrogates) >>>>");
console.log("ok 😀".isWellFormed(), "bad \uD800".isWellFormed(), "bad \uD800".toWellFormed());// true false bad �

console.log("<<<< RegExp /v flag: set operations in character classes >>>>");
console.log("Hello Wörld".match(/[\p{L}--[a-z]]/gv));// [ 'H', 'W', 'ö' ]   (letters, minus a-z)

console.log("<<<< resizable ArrayBuffer >>>>");
const buf = new ArrayBuffer(2, { maxByteLength: 16 });
buf.resize(8);
console.log(buf.byteLength, buf.resizable);// 8 true

promise.then((v) => console.log("withResolvers:", v));// withResolvers: resolved from outside
