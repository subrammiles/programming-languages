/*
BigInt
Integers of any size. Write them with an `n` suffix (10n) or BigInt(value).
Use them for IDs from databases, cryptography, or any integer above 2^53 - 1.

Rules:
  - you cannot mix BigInt and Number in math: 1n + 1 is a TypeError
  - division truncates (no decimals): 7n / 2n is 3n
  - Math.* functions do not accept BigInt
  - JSON.stringify cannot serialise BigInt by default
*/

console.log("<<<< the problem with big Numbers >>>>");
console.log(9007199254740993);// 9007199254740992   (wrong: not a safe integer)
console.log(9007199254740993n);// 9007199254740993n  (exact)

console.log("<<<< creating BigInts >>>>");
console.log(123n, BigInt(123), BigInt("12345678901234567890"));// 123n 123n 12345678901234567890n
console.log(typeof 1n);// bigint

console.log("<<<< arithmetic >>>>");
console.log(2n ** 100n);// 1267650600228229401496703205376n
console.log(7n / 2n, 7n % 2n);// 3n 1n
console.log(-7n / 2n);// -3n   (truncates toward zero)

console.log("<<<< mixing with Number >>>>");
try {
  console.log(1n + 1);
} catch (e) {
  console.log(e.constructor.name + ": " + e.message);// TypeError: Cannot mix BigInt and other types, use explicit conversions
}
console.log(1n + BigInt(1), Number(10n) + 1);// 2n 11
console.log(1n == 1, 1n === 1, 2n > 1);// true false true   (comparisons do work)

console.log("<<<< JSON >>>>");
const data = { id: 12345678901234567890n };
try {
  JSON.stringify(data);
} catch (e) {
  console.log(e.message);// Do not know how to serialize a BigInt
}
console.log(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));
// {"id":"12345678901234567890"}

console.log("<<<< limiting to a bit width >>>>");
console.log(BigInt.asUintN(8, 257n), BigInt.asIntN(8, 255n));// 1n -1n
