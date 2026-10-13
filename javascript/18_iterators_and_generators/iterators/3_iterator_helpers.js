/*
Iterator helpers (ES2025)
Requires Node 22+.
Iterators now have map, filter, take, drop, flatMap, reduce, toArray, forEach, some, every, find.
Unlike array methods, they are LAZY: values are produced one at a time, only when needed.
This works even on infinite sequences.
*/
function* naturals() {
  let n = 1;
  while (true) yield n++;
}

console.log("<<<<lazy chain on an infinite generator>>>>>")
const firstFiveEvenSquares = naturals()
  .filter(n => n % 2 === 0)
  .map(n => n * n)
  .take(5)
  .toArray();
console.log(firstFiveEvenSquares);// [ 4, 16, 36, 64, 100 ]

console.log("<<<<drop>>>>>")
console.log(naturals().drop(10).take(3).toArray());// [ 11, 12, 13 ]

console.log("<<<<Iterator.from - use helpers on any iterable>>>>>")
const set = new Set(["a", "b", "c"]);
console.log(set.values().map(s => s.toUpperCase()).toArray());// [ 'A', 'B', 'C' ]

console.log("<<<<reduce>>>>>")
console.log(naturals().take(100).reduce((sum, n) => sum + n, 0));// 5050
