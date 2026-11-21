/*
Rest parameters and the `arguments` object
  ...rest    -> a REAL array of the remaining arguments (ES2015, use this)
  arguments  -> an array-LIKE object of all arguments (old style)
                not available in arrow functions
*/

console.log("<<<< rest parameters >>>>");
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(), sum(1, 2, 3));// 0 6

function tag(label, ...items) {// rest must be the LAST parameter
  return `${label}: ${items.join(", ")}`;
}
console.log(tag("fruits", "apple", "kiwi"));// fruits: apple, kiwi

console.log("<<<< arguments object >>>>");
function oldSum() {
  console.log(Array.isArray(arguments), arguments.length);// false 3
  let total = 0;
  for (let i = 0; i < arguments.length; i++) total += arguments[i];
  return total;
}
console.log(oldSum(1, 2, 3));// 6

function toArray() {
  return [Array.from(arguments), [...arguments], Array.prototype.slice.call(arguments)];
}
console.log(toArray("a", "b"));// [ [ 'a', 'b' ], [ 'a', 'b' ], [ 'a', 'b' ] ]

console.log("<<<< arrow functions have no own arguments >>>>");
function outer() {
  const inner = () => arguments[0];// uses outer's arguments
  return inner("ignored");
}
console.log(outer("from outer"));// from outer

console.log("<<<< spread is the opposite of rest >>>>");
const values = [5, 1, 9];
console.log(Math.max(...values));// 9   (spread: array -> separate arguments)

console.log("<<<< extra and missing arguments >>>>");
function two(a, b) {
  return [a, b];
}
console.log(two(1), two(1, 2, 3));// [ 1, undefined ] [ 1, 2 ]   (no error either way)
