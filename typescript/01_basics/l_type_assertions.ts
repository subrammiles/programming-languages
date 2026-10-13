/*
Type assertions tell TypeScript "trust me, this value is of type X".
 value as string       (preferred)
 <string>value         (older syntax; not allowed in .tsx files)
They do NOT convert or check anything at runtime, so a wrong assertion causes bugs.
Prefer narrowing (typeof checks) where you can.
*/

let x: unknown = "hello";
console.log((x as string).length); // 5
// console.log((<string>x).length); // the same, but Node's type stripping rejects this older syntax

const wrong: unknown = 123;
console.log((wrong as string).length); // undefined -> the assertion lied, no error raised

// Non-null assertion: value! says "this is not null or undefined"
const names = new Map([["a", "Asha"]]);
console.log(names.get("a")!.toUpperCase()); // ASHA

// "as const" makes a value read-only with literal types
const config = { mode: "dark", retries: 3 } as const;
// config.mode = "light"; // error TS2540: Cannot assign to 'mode' because it is a read-only property.
console.log(config.mode);
