/*
Deep equality
=== compares objects by REFERENCE: two objects with the same contents are not ===.
deepEqual compares by VALUE, recursively.

Edge cases interviewers look for:
  - NaN should equal NaN (Object.is handles it, === does not)
  - [] is not equal to {} even though both have no keys
  - key ORDER does not matter for objects, but it does for arrays
  - Dates compare by time
*/

function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;// [] vs {}, Date vs {}

  if (a instanceof Date) return a.getTime() === b.getTime();

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) => Object.hasOwn(b, key) && deepEqual(a[key], b[key]));
}

console.log("<<<< === compares references >>>>");
console.log({ a: 1 } === { a: 1 });// false

console.log("<<<< deepEqual compares values >>>>");
console.log(deepEqual({ a: 1, b: { c: [1, 2] } }, { b: { c: [1, 2] }, a: 1 }));// true
console.log(deepEqual([1, 2, 3], [1, 3, 2]));// false   (array order matters)
console.log(deepEqual({ a: undefined }, { b: undefined }));// false   (different keys)
console.log(deepEqual([], {}));// false
console.log(deepEqual(NaN, NaN));// true
console.log(deepEqual(new Date(0), new Date(0)));// true
console.log(deepEqual(null, {}));// false

console.log("<<<< Node has it built in, for tests >>>>");
const { isDeepStrictEqual } = require("node:util");
console.log(isDeepStrictEqual({ x: [1, { y: 2 }] }, { x: [1, { y: 2 }] }));// true
