/*
Coding problems: numbers and recursion
*/

console.log("<<<< 1. FizzBuzz >>>>");
const fizzBuzz = (n) =>
  Array.from({ length: n }, (_, i) => {
    const k = i + 1;
    return k % 15 === 0 ? "FizzBuzz" : k % 3 === 0 ? "Fizz" : k % 5 === 0 ? "Buzz" : k;
  });
console.log(fizzBuzz(15).join(" "));// 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz

console.log("<<<< 2. Factorial: recursive, iterative, BigInt >>>>");
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
function factorialLoop(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
const factorialBig = (n) => (n <= 1n ? 1n : n * factorialBig(n - 1n));
console.log(factorial(5), factorialLoop(10));// 120 3628800
console.log(factorialBig(25n));// 15511210043330985984000000n   (too big for a normal number)

console.log("<<<< 3. Fibonacci: naive, memoized, iterative >>>>");
const fibNaive = (n) => (n < 2 ? n : fibNaive(n - 1) + fibNaive(n - 2));// O(2^n)
function fibMemo(n, memo = {}) {
  if (n < 2) return n;
  return (memo[n] ??= fibMemo(n - 1, memo) + fibMemo(n - 2, memo));// O(n)
}
function fibLoop(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;// O(n) time, O(1) memory
}
console.log(fibNaive(10), fibMemo(50), fibLoop(50));// 55 12586269025 12586269025
console.log(Array.from({ length: 10 }, (_, i) => fibLoop(i)).join(","));// 0,1,1,2,3,5,8,13,21,34

console.log("<<<< 4. Prime check and primes up to n (Sieve of Eratosthenes) >>>>");
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;// only test up to sqrt(n)
  return true;
}
function primesUpTo(n) {
  const isComposite = new Uint8Array(n + 1);
  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (isComposite[i]) continue;
    primes.push(i);
    for (let j = i * i; j <= n; j += i) isComposite[j] = 1;
  }
  return primes;
}
console.log(isPrime(97), isPrime(100));// true false
console.log(primesUpTo(30));// [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 ]

console.log("<<<< 5. GCD and LCM >>>>");
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));// Euclid's algorithm
const lcm = (a, b) => (a * b) / gcd(a, b);
console.log(gcd(48, 18), lcm(4, 6));// 6 12

console.log("<<<< 6. Reverse an integer and check a number palindrome >>>>");
function reverseInt(n) {
  const reversed = Number(String(Math.abs(n)).split("").reverse().join(""));
  return Math.sign(n) * reversed;
}
console.log(reverseInt(-1230), reverseInt(121) === 121);// -321 true

console.log("<<<< 7. Sum of digits and Armstrong numbers >>>>");
const sumDigits = (n) => [...String(n)].reduce((s, d) => s + Number(d), 0);
const isArmstrong = (n) => {
  const digits = [...String(n)];
  return digits.reduce((s, d) => s + Number(d) ** digits.length, 0) === n;// 153 = 1^3 + 5^3 + 3^3
};
console.log(sumDigits(9875), isArmstrong(153), isArmstrong(154));// 29 true false

console.log("<<<< 8. Power set (all subsets) with recursion >>>>");
function subsets(arr) {
  if (arr.length === 0) return [[]];
  const [first, ...rest] = arr;
  const withoutFirst = subsets(rest);
  return [...withoutFirst, ...withoutFirst.map((s) => [first, ...s])];
}
console.log(subsets(["a", "b", "c"]).map((s) => s.join("") || "{}").join(" "));// {} c b bc a ac ab abc

console.log("<<<< 9. All permutations of a string >>>>");
function permutations(s) {
  if (s.length <= 1) return [s];
  const out = [];
  for (let i = 0; i < s.length; i++) {
    const rest = s.slice(0, i) + s.slice(i + 1);
    for (const p of permutations(rest)) out.push(s[i] + p);
  }
  return out;
}
console.log(permutations("abc"));// [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]

console.log("<<<< 10. Count (climbing) stairs: 1 or 2 steps at a time >>>>");
function climbStairs(n) {
  let [a, b] = [1, 1];// ways to reach step 0 and step 1
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;// it is Fibonacci in disguise
}
console.log(climbStairs(5));// 8

console.log("<<<< 11. Format a number with thousands separators >>>>");
console.log((1234567.891).toLocaleString("en-US"));// 1,234,567.891
console.log(String(1234567).replace(/\B(?=(\d{3})+(?!\d))/g, ","));// 1,234,567   (the regex way)
