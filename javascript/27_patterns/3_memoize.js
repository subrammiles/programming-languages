/*
Memoization
Cache a function's results so the same input is never computed twice.
Only safe for "pure" functions (same input -> same output, no side effects).
*/
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

console.log("<<<< slow fibonacci >>>>");
let calls = 0;
function slowFib(n) {
  calls++;
  return n < 2 ? n : slowFib(n - 1) + slowFib(n - 2);
}
console.log(slowFib(25), "calls:", calls);// 75025 calls: 242785

console.log("<<<< memoized fibonacci >>>>");
calls = 0;
const fastFib = memoize((n) => {
  calls++;
  return n < 2 ? n : fastFib(n - 1) + fastFib(n - 2);
});
console.log(fastFib(25), "calls:", calls);// 75025 calls: 26
console.log(fastFib(90));// 2880067194370816000 (instant)
