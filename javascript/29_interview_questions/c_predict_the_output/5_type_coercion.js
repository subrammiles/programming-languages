/*
Predict the output: type coercion and other quirks
JS converts types automatically in many places. The rules behind the "WAT" answers:
  - `+` with a string on either side -> string concatenation
  - other math operators (- * / %) -> convert to numbers
  - objects/arrays become primitives first: [] -> "", [1,2] -> "1,2", {} -> "[object Object]"
  - == converts types before comparing; === never does (always use ===)
  - falsy values: false, 0, -0, 0n, "", null, undefined, NaN. Everything else is truthy.
*/

console.log("<<<< Q1: + vs - >>>>");
console.log("5" + 3);// 53
console.log("5" - 3);// 2
console.log("5" * "2");// 10
console.log(1 + 2 + "3");// 33    (left to right: 3 + "3")
console.log("1" + 2 + 3);// 123
console.log(+"42", +"", +"abc");// 42 0 NaN
console.log(true + true);// 2

console.log("<<<< Q2: arrays and objects >>>>");
console.log([] + []);// ""   (empty string, prints as a blank line)
console.log([] + {});// [object Object]
console.log([1, 2] + [3]);// 1,23
console.log([] == false);// true    ([] -> "" -> 0, false -> 0)
console.log(!![]);// true    (but every object is truthy!)

console.log("<<<< Q3: == vs === >>>>");
console.log(0 == "");// true
console.log(0 == "0");// true
console.log("" == "0");// false   (== is not transitive)
console.log(null == undefined);// true
console.log(null === undefined);// false
console.log(null == 0);// false   (null only == null or undefined)
console.log(null >= 0);// true    (but >= converts null to 0!)

console.log("<<<< Q4: NaN >>>>");
console.log(NaN === NaN);// false   (NaN is not equal to anything, even itself)
console.log(Number.isNaN(NaN), Object.is(NaN, NaN));// true true
console.log(typeof NaN);// number
console.log([NaN].includes(NaN), [NaN].indexOf(NaN));// true -1

console.log("<<<< Q5: typeof surprises >>>>");
console.log(typeof null);// object    (a bug from 1995 that can never be fixed)
console.log(typeof []);// object    (use Array.isArray)
console.log(typeof function () {});// function
console.log(typeof class {});// function
console.log(typeof 10n);// bigint

console.log("<<<< Q6: numbers >>>>");
console.log(0.1 + 0.2);// 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);// false
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON);// true   (compare floats like this)
console.log(9007199254740992 === 9007199254740993);// true   (beyond Number.MAX_SAFE_INTEGER)
console.log(1 / 0, -1 / 0);// Infinity -Infinity
console.log(Math.max(), Math.min());// -Infinity Infinity
console.log([10, 1, 3].sort());// [ 1, 10, 3 ]   (default sort compares as strings!)
console.log([10, 1, 3].sort((a, b) => a - b));// [ 1, 3, 10 ]
console.log(["1", "7", "11"].map(parseInt));// [ 1, NaN, 3 ]   (parseInt(value, index) uses index as the radix)

console.log("<<<< Q7: || vs ?? >>>>");
console.log(0 || "default");// default
console.log(0 ?? "default");// 0   (?? only replaces null and undefined)
console.log("" || "default", "" ?? "default");// default ""   ('' is printed as an empty string)

console.log("<<<< Q8: references >>>>");
const a = { value: 1 };
const b = a;
b.value = 2;
console.log(a.value);// 2   (a and b are the same object)
console.log([1, 2] === [1, 2]);// false
const arr = [1, 2, 3];
arr.length = 1;
console.log(arr);// [ 1 ]   (setting length truncates)
