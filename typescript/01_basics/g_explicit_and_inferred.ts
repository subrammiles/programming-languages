/*
Two ways a variable gets its type:
 Explicit: you write it          let name: string = "Dylan"
 Inferred: TypeScript works it out from the value
Prefer inference for simple values; annotate function parameters and public APIs.
*/

let lastName: string = "Dylan"; // explicit
let isActive: boolean = true;
let myNumber: number = 34;

let lastName2 = "Dylan"; // inferred: string
let isActive2 = true; // inferred: boolean
let myNumber2 = 34; // inferred: number
// lastName2 = 3; // error TS2322: Type 'number' is not assignable to type 'string'.

const pi = 3.14; // const infers the LITERAL type 3.14, since it can never change
let radius = 2; // let infers the wider type number

console.log(lastName, isActive, myNumber, lastName2, isActive2, myNumber2, pi * radius ** 2);
