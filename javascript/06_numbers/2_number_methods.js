/*
Number: properties and static methods
JS has ONE number type for integers and decimals: a 64-bit floating point (IEEE 754).
That gives exact integers only up to 2^53 - 1, and decimals that are approximations.
(For bigger integers use BigInt, see 4_bigint.js.)
*/

console.log("<<<< limits >>>>");
console.log(Number.MAX_SAFE_INTEGER);// 9007199254740991   (2^53 - 1)
console.log(Number.MIN_SAFE_INTEGER);// -9007199254740991
console.log(Number.MAX_VALUE);// 1.7976931348623157e+308
console.log(Number.EPSILON);// 2.220446049250313e-16   (gap between 1 and the next number)
console.log(Number.MAX_SAFE_INTEGER + 2);// 9007199254740992   (wrong! precision is lost)

console.log("<<<< checking numbers >>>>");
console.log(Number.isInteger(5), Number.isInteger(5.0), Number.isInteger(5.5));// true true false
console.log(Number.isSafeInteger(2 ** 53), Number.isSafeInteger(2 ** 53 - 1));// false true
console.log(Number.isFinite(1 / 0), Number.isFinite("5"));// false false
console.log(isFinite("5"));// true    (the old global version converts the argument first)
console.log(Number.isNaN("abc"), isNaN("abc"));// false true   (same difference)

console.log("<<<< converting strings to numbers >>>>");
console.log(Number("42px"), parseInt("42px"), parseFloat("3.14abc"));// NaN 42 3.14
console.log(Number(""), Number(" 12 "), Number(null), Number(undefined));// 0 12 0 NaN
console.log(parseInt("ff", 16), parseInt("1010", 2));// 255 10   (always pass the radix)
console.log(+"3.5", Number("1e3"));// 3.5 1000

console.log("<<<< converting numbers to strings >>>>");
const n = 1234.5678;
console.log(n.toFixed(2));// 1234.57    (fixed decimals, returns a STRING)
console.log(n.toPrecision(6));// 1234.57    (significant digits)
console.log((255).toString(16), (255).toString(2));// ff 11111111
console.log((1e21).toString(), (0.000001234).toString());// 1e+21 0.000001234

console.log("<<<< rounding gotchas >>>>");
console.log((1.005).toFixed(2));// 1.00   (1.005 is really 1.00499999..., so it rounds down)
console.log(Math.round(1.005 * 100) / 100);// 1    (same problem)
console.log(Math.round((1.005 + Number.EPSILON) * 100) / 100);// 1.01   (common fix)
console.log(0.1 * 3);// 0.30000000000000004
// For money, store whole cents as integers (1999 instead of 19.99) or use a decimal library.

console.log("<<<< numeric separators and literals >>>>");
console.log(1_000_000, 0xff, 0o17, 0b1010, 1e-3);// 1000000 255 15 10 0.001

console.log("<<<< special values >>>>");
console.log(1 / 0, -1 / 0, 0 / 0);// Infinity -Infinity NaN
console.log(0 === -0, Object.is(0, -0));// true false
