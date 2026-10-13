/*
Basic types
 string number boolean      the everyday ones (number covers ints and floats)
 bigint symbol               less common primitives
 null undefined              "no value"
 any                         turns type checking OFF (avoid)
 unknown                     "could be anything", but safe: you must check before using it
 never                       a value that can never exist
 A | B                       union: either type
*/

let firstName: string = "Dylan";
let age: number = 12;
let isValidAge: boolean = false;
let big: bigint = 9_007_199_254_740_993n;
let nothing: undefined = undefined;
let empty: null = null;
console.log(firstName, age, isValidAge, big, nothing, empty);

let anything: any;
anything = true;
anything = "ty";
anything = 2;
console.log(anything.toFixed(1)); // 2.0 -> no checking at all; anything.foo() would crash at runtime

let w: unknown = 1;
w = "subbu"; // any value can be stored...
// w.toUpperCase(); // error: 'w' is of type 'unknown' -> ...but you must check it first
if (typeof w === "string") console.log(w.toUpperCase()); // SUBBU

// never: e.g. a function that always throws never returns a value
function fail(message: string): never {
  throw new Error(message);
}
try {
  fail("boom");
} catch (e) {
  console.log((e as Error).message); // boom
}

// Union: a value can be one of several types. Use | ("or").
function printStatus(code: string | number): void {
  console.log(`Status ${code}`);
}
printStatus(404);
printStatus("OK");

// Literal types: only these exact values
let direction: "up" | "down" = "up";
// direction = "left"; // error TS2322
console.log(direction);
