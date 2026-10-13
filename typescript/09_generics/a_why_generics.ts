/*
Why generics?
Without them, a reusable function either works for ONE type, or uses any and loses all checking.
A generic function has a TYPE PARAMETER, written <T>, filled in when it's called.
*/

function firstNumber(items: number[]): number | undefined {
  return items[0]; // works only for numbers
}

function firstAny(items: any[]): any {
  return items[0]; // works for everything, but the result is unchecked
}

function first<T>(items: T[]): T | undefined {
  return items[0]; // works for everything AND keeps the type
}

console.log(firstNumber([1, 2]));
const a = firstAny(["x"]); // any: a.toFixed() would compile and crash
const s = first(["x", "y"]); // string | undefined
const n = first([10, 20]); // number | undefined
console.log(a, s?.toUpperCase(), n?.toFixed(1)); // x X 10.0
