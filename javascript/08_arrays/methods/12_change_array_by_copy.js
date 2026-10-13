/*
"Change array by copy" methods (ES2023)
sort(), reverse() and splice() CHANGE (mutate) the original array.
Their new versions return a NEW array and leave the original alone:
  sort()     -> toSorted()
  reverse()  -> toReversed()
  splice()   -> toSpliced()
  arr[i] = x -> with(i, x)
Useful in React/Redux where state must not be mutated.
*/
console.log("<<<<sort vs toSorted>>>>>")
const nums = [3, 1, 2];
const sorted = nums.toSorted();
console.log(sorted);// [ 1, 2, 3 ]
console.log(nums);// [ 3, 1, 2 ]  original unchanged

nums.sort();
console.log(nums);// [ 1, 2, 3 ]  original changed!

console.log("<<<<toReversed>>>>>")
const letters = ["a", "b", "c"];
console.log(letters.toReversed());// [ 'c', 'b', 'a' ]
console.log(letters);// [ 'a', 'b', 'c' ]

console.log("<<<<toSpliced>>>>>")
const months = ["Jan", "Mar", "Apr"];
console.log(months.toSpliced(1, 0, "Feb"));// [ 'Jan', 'Feb', 'Mar', 'Apr' ]
console.log(months);// [ 'Jan', 'Mar', 'Apr' ]

console.log("<<<<with>>>>>")
const scores = [10, 20, 30];
console.log(scores.with(1, 99));// [ 10, 99, 30 ]
console.log(scores.with(-1, 0));// [ 10, 20, 0 ]
console.log(scores);// [ 10, 20, 30 ]
