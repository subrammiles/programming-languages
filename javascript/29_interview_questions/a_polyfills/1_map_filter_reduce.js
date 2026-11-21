/*
Polyfills: map, filter, reduce, forEach
"Write your own Array.prototype.map" is one of the most common JS interview questions.
A polyfill re-implements a built-in so old environments get it too.

Points interviewers check:
  - the callback receives (element, index, array)
  - `thisArg` is passed through for map/filter/forEach
  - holes in sparse arrays are skipped (`i in this`)
  - reduce without an initial value uses the first element, and
    throws a TypeError on an empty array
We add them as myMap, myFilter... so the real ones are not replaced.
*/

Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== "function") throw new TypeError(`${callback} is not a function`);
  const result = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) result[i] = callback.call(thisArg, this[i], i, this);
  }
  return result;
};

Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== "function") throw new TypeError(`${callback} is not a function`);
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) result.push(this[i]);
  }
  return result;
};

Array.prototype.myForEach = function (callback, thisArg) {
  if (typeof callback !== "function") throw new TypeError(`${callback} is not a function`);
  for (let i = 0; i < this.length; i++) {
    if (i in this) callback.call(thisArg, this[i], i, this);
  }
};

Array.prototype.myReduce = function (callback, ...initial) {
  if (typeof callback !== "function") throw new TypeError(`${callback} is not a function`);
  let i = 0;
  let acc;
  if (initial.length > 0) {
    acc = initial[0];
  } else {
    while (i < this.length && !(i in this)) i++;// skip leading holes
    if (i >= this.length) throw new TypeError("Reduce of empty array with no initial value");
    acc = this[i++];
  }
  for (; i < this.length; i++) {
    if (i in this) acc = callback(acc, this[i], i, this);
  }
  return acc;
};

const nums = [1, 2, 3, 4];

console.log("<<<< myMap >>>>");
console.log(nums.myMap((n) => n * 2));// [ 2, 4, 6, 8 ]
console.log(nums.myMap((n, i) => n * i));// [ 0, 2, 6, 12 ]

console.log("<<<< myFilter >>>>");
console.log(nums.myFilter((n) => n % 2 === 0));// [ 2, 4 ]

console.log("<<<< myReduce >>>>");
console.log(nums.myReduce((sum, n) => sum + n, 0));// 10
console.log(nums.myReduce((sum, n) => sum + n));// 10   (starts from the first element)
console.log(["a", "b", "a"].myReduce((count, ch) => ({ ...count, [ch]: (count[ch] ?? 0) + 1 }), {}));
// { a: 2, b: 1 }
try {
  [].myReduce((a, b) => a + b);
} catch (e) {
  console.log(e.message);// Reduce of empty array with no initial value
}

console.log("<<<< myForEach with thisArg >>>>");
const multiplier = { factor: 10 };
nums.myForEach(function (n) {
  process.stdout.write(n * this.factor + " ");
}, multiplier);
console.log();// 10 20 30 40

console.log("<<<< sparse arrays: holes are skipped, like the real map >>>>");
const sparse = [1, , 3];
console.log(sparse.myMap((n) => n * 2));// [ 2, <1 empty item>, 6 ]
console.log(sparse.map((n) => n * 2));// [ 2, <1 empty item>, 6 ]
