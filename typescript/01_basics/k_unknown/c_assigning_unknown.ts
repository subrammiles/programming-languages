/*
An unknown value can only be assigned to unknown or any, nothing more specific.
*/

let a: unknown;
console.log(a); // undefined
let b: unknown = a; // fine
let c: any = a; // fine
console.log(b, c);

let value: unknown = 42;
// let num: number = value; // error TS2322: Type 'unknown' is not assignable to type 'number'.
let num: number = typeof value === "number" ? value : 0; // check first
console.log(num); // 42
