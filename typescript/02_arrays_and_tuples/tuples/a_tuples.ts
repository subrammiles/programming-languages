/*
A tuple is an array with a fixed length and a known type at each position.
 [number, boolean, string]
*/

let myTuple: [number, boolean, string];
myTuple = [5, false, "subbu"];
console.log(myTuple);
// myTuple = [false, 5, "subbu"]; // error: wrong types in positions 0 and 1
// myTuple[0] = "subbu";          // error TS2322: Type 'string' is not assignable to type 'number'.

// A known weakness: push is still allowed on a (non-readonly) tuple.
myTuple.push("new element");
console.log(myTuple, myTuple.length); // [ 5, false, 'subbu', 'new element' ] 4
// Use readonly tuples (c_readonly_tuples.ts) to prevent this.

function minMax(nums: number[]): [number, number] {
  return [Math.min(...nums), Math.max(...nums)];
}
console.log(minMax([4, 9, 1])); // [ 1, 9 ]
