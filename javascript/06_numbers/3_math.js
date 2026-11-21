/*
Math
A built-in object (not a constructor) with math constants and functions.
*/

console.log("<<<< rounding >>>>");
console.log(Math.round(4.5), Math.round(-4.5));// 5 -4   (.5 rounds toward +Infinity)
console.log(Math.floor(4.7), Math.floor(-4.2));// 4 -5   (down)
console.log(Math.ceil(4.2), Math.ceil(-4.7));// 5 -4    (up)
console.log(Math.trunc(4.7), Math.trunc(-4.7));// 4 -4   (drop the decimals)

console.log("<<<< min, max, abs, sign >>>>");
const scores = [40, 95, 72];
console.log(Math.max(...scores), Math.min(...scores));// 95 40
console.log(Math.abs(-7), Math.sign(-7), Math.sign(0));// 7 -1 0

console.log("<<<< powers and roots >>>>");
console.log(Math.pow(2, 10), 2 ** 10);// 1024 1024
console.log(Math.sqrt(81), Math.cbrt(27), Math.hypot(3, 4));// 9 3 5

console.log("<<<< logs and constants >>>>");
console.log(Math.PI.toFixed(5), Math.E.toFixed(5));// 3.14159 2.71828
console.log(Math.log10(1000), Math.log2(8), Math.log(Math.E));// 3 3 1

console.log("<<<< trigonometry (radians) >>>>");
const degToRad = (deg) => (deg * Math.PI) / 180;
console.log(Math.sin(degToRad(90)), Math.cos(0));// 1 1

console.log("<<<< random numbers >>>>");
// Math.random() gives a float in [0, 1)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;// inclusive
const dice = Array.from({ length: 1000 }, () => randomInt(1, 6));
console.log(Math.min(...dice), Math.max(...dice));// 1 6
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
console.log(["red", "green", "blue"].includes(pick(["red", "green", "blue"])));// true

console.log("<<<< shuffle an array (Fisher-Yates) >>>>");
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
console.log(shuffle([1, 2, 3, 4, 5]).toSorted((x, y) => x - y));// [ 1, 2, 3, 4, 5 ]   (same items, new order)
// Do NOT use arr.sort(() => Math.random() - 0.5): the result is biased.
// Math.random is not secure; for tokens and passwords use crypto (23_node_builtins/8_crypto.js).

console.log("<<<< clamp a value into a range >>>>");
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
console.log(clamp(150, 0, 100), clamp(-5, 0, 100), clamp(42, 0, 100));// 100 0 42
