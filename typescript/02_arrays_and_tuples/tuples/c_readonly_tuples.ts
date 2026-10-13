/*
readonly tuples can't be changed after creation.
*/

let myRTuple: readonly [number, boolean, string] = [5, false, "subbu"];
// myRTuple.push("x"); // error TS2339: Property 'push' does not exist
// myRTuple[0] = 6;     // error TS2540: Cannot assign to '0' because it is a read-only property.
myRTuple = [6, true, "subbu"]; // the VARIABLE can point to a new tuple (it's let)
console.log(myRTuple);

const rgb = [255, 128, 0] as const; // "as const" makes a readonly tuple of literal types
console.log(rgb); // type: readonly [255, 128, 0]
