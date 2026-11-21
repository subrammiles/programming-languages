/*
Higher-order functions and pure functions

Higher-order function: takes a function as an argument, or returns a function.
  map, filter, reduce, setTimeout, addEventListener all take functions.
  Closures make "functions that return functions" useful.

Pure function:
  1. same input -> always the same output
  2. no side effects (does not change outside variables, the DOM, files, network...)
Pure functions are easy to test, cache (memoize) and run in parallel.
*/

console.log("<<<< functions as arguments >>>>");
function repeat(times, action) {
  for (let i = 0; i < times; i++) action(i);
}
repeat(3, (i) => console.log(`run ${i}`));
// run 0
// run 1
// run 2

console.log("<<<< functions that return functions >>>>");
const multiplyBy = (factor) => (n) => n * factor;
const double = multiplyBy(2);
const triple = multiplyBy(3);
console.log([1, 2, 3].map(double), [1, 2, 3].map(triple));// [ 2, 4, 6 ] [ 3, 6, 9 ]

console.log("<<<< wrapping a function to add behaviour >>>>");
function withLogging(fn) {
  return function (...args) {
    const result = fn.apply(this, args);
    console.log(`${fn.name}(${args.join(", ")}) = ${result}`);
    return result;
  };
}
const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(2, 3);// add(2, 3) = 5

console.log("<<<< chaining array higher-order functions >>>>");
const orders = [
  { item: "book", price: 12, qty: 2 },
  { item: "pen", price: 1.5, qty: 10 },
  { item: "lamp", price: 30, qty: 1 },
];
const bigOrderTotal = orders
  .filter((o) => o.price * o.qty > 20)
  .map((o) => o.price * o.qty)
  .reduce((sum, t) => sum + t, 0);
console.log(bigOrderTotal);// 54

console.log("<<<< impure vs pure >>>>");
let taxRate = 0.2;
const impurePrice = (price) => price * (1 + taxRate);// depends on outside state
const purePrice = (price, rate) => price * (1 + rate);// depends only on its inputs
console.log(impurePrice(100), purePrice(100, 0.2));// 120 120
taxRate = 0.5;
console.log(impurePrice(100), purePrice(100, 0.2));// 150 120   (impure result changed)

console.log("<<<< avoid mutating inputs >>>>");
function addTagImpure(user, tag) {
  user.tags.push(tag);// changes the caller's object!
  return user;
}
function addTagPure(user, tag) {
  return { ...user, tags: [...user.tags, tag] };// returns a new object
}
const user = { name: "Ann", tags: ["admin"] };
const updated = addTagPure(user, "editor");
console.log(user.tags, updated.tags);// [ 'admin' ] [ 'admin', 'editor' ]
addTagImpure(user, "oops");
console.log(user.tags);// [ 'admin', 'oops' ]

console.log("<<<< non-mutating array methods (ES2023) >>>>");
const nums = [3, 1, 2];
console.log(nums.toSorted(), nums.toReversed(), nums.with(0, 99), nums);
// [ 1, 2, 3 ] [ 2, 1, 3 ] [ 99, 1, 2 ] [ 3, 1, 2 ]
