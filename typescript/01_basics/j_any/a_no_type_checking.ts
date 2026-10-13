/*
any turns type checking OFF for a value. Everything is allowed, so mistakes
only show up when the program crashes. Treat any as a last resort.
*/

let v: any = true;
v = "string"; // no error
console.log(Math.round(v)); // NaN -> no compile error, just a wrong result

try {
  v.notAFunction(); // compiles fine...
} catch (e) {
  console.log((e as Error).message); // v.notAFunction is not a function -> ...fails at runtime
}
