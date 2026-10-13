/*
To use an unknown value, "narrow" it first with a check (typeof, instanceof, in, Array.isArray ...).
*/

let first: unknown = 1;
let second: unknown = 2;
// console.log(first + second); // error TS18046: 'first' is of type 'unknown'.

if (typeof first === "number" && typeof second === "number") {
  console.log(first + second); // 3 -> inside the if, both are numbers
} else {
  console.log("not able to add these values");
}

function describe(value: unknown): string {
  if (typeof value === "string") return `string of length ${value.length}`;
  if (Array.isArray(value)) return `array of ${value.length} items`;
  if (value instanceof Date) return `date in ${value.getFullYear()}`;
  return "something else";
}
console.log(describe("hello"), "|", describe([1, 2]), "|", describe(new Date(2026, 0, 1)), "|", describe(5));
