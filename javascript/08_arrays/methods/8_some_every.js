/*
some(fn)  -> true if AT LEAST ONE element passes
every(fn) -> true if ALL elements pass
Both stop early as soon as the answer is known.
*/
const marks = [72, 45, 90, 38];

console.log(marks.some(m => m < 40));// true  (38 failed)
console.log(marks.every(m => m >= 35));// true  (everyone passed 35)
console.log(marks.every(m => m >= 40));// false

// Edge case: empty array
console.log([].some(x => x > 0));// false
console.log([].every(x => x > 0));// true (nothing failed)
