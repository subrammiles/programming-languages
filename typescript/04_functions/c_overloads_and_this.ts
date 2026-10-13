/*
Overloads: several call signatures for one function, when the return type
depends on the arguments. Write the signatures, then ONE implementation.
(Often a union or generics is simpler; use overloads when they read better.)

void vs undefined: a callback typed "() => void" may return a value; it's just ignored.
*/

function parse(value: string): number;
function parse(value: string[]): number[];
function parse(value: string | string[]): number | number[] {
  return Array.isArray(value) ? value.map(Number) : Number(value);
}

const one = parse("42"); // number
const many = parse(["1", "2"]); // number[]
console.log(one + 1, many); // 43 [ 1, 2 ]

const results: number[] = [];
["a", "b"].forEach((s) => results.push(s.length)); // push returns a number; forEach expects void: fine
console.log(results); // [ 1, 1 ]

// Typing "this" as the first (fake) parameter
function describeThis(this: { name: string }): string {
  return `I am ${this.name}`;
}
const person = { name: "Asha", describeThis };
console.log(person.describeThis()); // I am Asha
// describeThis(); // error TS2684: The 'this' context of type 'void' is not assignable
