/*
TypeScript infers the element type from the initial values.
*/

const myNumbers = [1, 2, 3]; // number[]
myNumbers.push(4);
// myNumbers.push("5"); // error TS2345
console.log(myNumbers);

const mixed = [1, "two"]; // (string | number)[]
const empty = []; // any[] at first, then "evolves" as you push; better to annotate: const e: number[] = []
empty.push(1);
console.log(mixed, empty);
