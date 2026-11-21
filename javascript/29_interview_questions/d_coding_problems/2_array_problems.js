/*
Coding problems: arrays
Common patterns: hash map lookups, two pointers, sliding window, running max/min.
*/

console.log("<<<< 1. Remove duplicates >>>>");
const nums = [3, 1, 3, 2, 1, 4];
console.log([...new Set(nums)]);// [ 3, 1, 2, 4 ]
console.log(nums.filter((n, i) => nums.indexOf(n) === i));// [ 3, 1, 2, 4 ]   (O(n^2), but no Set)

console.log("<<<< 2. Largest and second largest (one pass) >>>>");
function topTwo(arr) {
  let first = -Infinity;
  let second = -Infinity;
  for (const n of arr) {
    if (n > first) [second, first] = [first, n];
    else if (n > second && n !== first) second = n;
  }
  return [first, second];
}
console.log(topTwo([12, 35, 1, 10, 34, 35]));// [ 35, 34 ]

console.log("<<<< 3. Two sum: indices of two numbers that add up to target >>>>");
function twoSum(arr, target) {
  const seen = new Map();// value -> index
  for (let i = 0; i < arr.length; i++) {
    const need = target - arr[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(arr[i], i);
  }
  return null;// O(n) instead of the O(n^2) double loop
}
console.log(twoSum([2, 7, 11, 15], 9), twoSum([3, 2, 4], 6));// [ 0, 1 ] [ 1, 2 ]

console.log("<<<< 4. Find the missing number in 1..n >>>>");
function missingNumber(arr) {
  const n = arr.length + 1;
  const expected = (n * (n + 1)) / 2;// sum of 1..n
  return expected - arr.reduce((a, b) => a + b, 0);
}
console.log(missingNumber([1, 2, 4, 5, 6]));// 3

console.log("<<<< 5. Rotate an array by k to the right >>>>");
function rotate(arr, k) {
  k %= arr.length;
  return [...arr.slice(-k), ...arr.slice(0, -k)];
}
console.log(rotate([1, 2, 3, 4, 5], 2));// [ 4, 5, 1, 2, 3 ]

console.log("<<<< 6. Chunk an array >>>>");
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
console.log(chunk([1, 2, 3, 4, 5], 2));// [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]

console.log("<<<< 7. Intersection and union >>>>");
const a = [1, 2, 2, 3, 4];
const b = [2, 4, 6];
const setB = new Set(b);
console.log([...new Set(a.filter((x) => setB.has(x)))]);// [ 2, 4 ]
console.log([...new Set([...a, ...b])]);// [ 1, 2, 3, 4, 6 ]
console.log([...new Set(a).intersection(setB)]);// [ 2, 4 ]   (Set methods, Node 22+)

console.log("<<<< 8. Move zeros to the end, keeping order (in place) >>>>");
function moveZeros(arr) {
  let write = 0;
  for (const n of arr) if (n !== 0) arr[write++] = n;
  arr.fill(0, write);
  return arr;
}
console.log(moveZeros([0, 1, 0, 3, 12]));// [ 1, 3, 12, 0, 0 ]

console.log("<<<< 9. Maximum subarray sum (Kadane's algorithm) >>>>");
function maxSubarray(arr) {
  let best = arr[0];
  let current = arr[0];
  for (let i = 1; i < arr.length; i++) {
    current = Math.max(arr[i], current + arr[i]);// extend the run, or start fresh here
    best = Math.max(best, current);
  }
  return best;
}
console.log(maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));// 6   (4, -1, 2, 1)

console.log("<<<< 10. Best time to buy and sell a stock >>>>");
function maxProfit(prices) {
  let minPrice = Infinity;
  let profit = 0;
  for (const p of prices) {
    minPrice = Math.min(minPrice, p);
    profit = Math.max(profit, p - minPrice);
  }
  return profit;
}
console.log(maxProfit([7, 1, 5, 3, 6, 4]));// 5   (buy at 1, sell at 6)

console.log("<<<< 11. Merge two sorted arrays (two pointers) >>>>");
function mergeSorted(x, y) {
  const out = [];
  let i = 0;
  let j = 0;
  while (i < x.length && j < y.length) out.push(x[i] <= y[j] ? x[i++] : y[j++]);
  return out.concat(x.slice(i), y.slice(j));
}
console.log(mergeSorted([1, 4, 7], [2, 3, 8, 9]));// [ 1, 2, 3, 4, 7, 8, 9 ]

console.log("<<<< 12. Count occurrences / group by >>>>");
const fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"];
console.log(fruits.reduce((acc, f) => ({ ...acc, [f]: (acc[f] ?? 0) + 1 }), {}));
// { apple: 3, banana: 2, cherry: 1 }
const people = [
  { name: "Ann", dept: "IT" },
  { name: "Bo", dept: "HR" },
  { name: "Cy", dept: "IT" },
];
console.log(Object.groupBy(people, (p) => p.dept));
// [Object: null prototype] {
//   IT: [ { name: 'Ann', dept: 'IT' }, { name: 'Cy', dept: 'IT' } ],
//   HR: [ { name: 'Bo', dept: 'HR' } ]
// }

console.log("<<<< 13. Sort an array of objects by a key >>>>");
const scores = [
  { name: "Ann", score: 82 },
  { name: "Bo", score: 95 },
  { name: "Cy", score: 82 },
];
const sorted = scores.toSorted((p, q) => q.score - p.score || p.name.localeCompare(q.name));
console.log(sorted.map((s) => `${s.name}:${s.score}`));// [ 'Bo:95', 'Ann:82', 'Cy:82' ]
