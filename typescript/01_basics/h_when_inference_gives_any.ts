/*
Inference can't always know the type. JSON.parse returns "any",
which silently turns off checking for everything that touches it.
Fix: give the result a type yourself (and ideally validate it at runtime).
*/

const json = JSON.parse("55");
console.log(typeof json); // number -> most code would expect an object here
// json.name.toUpperCase(); // TypeScript allows this (any), but it CRASHES at runtime

type User = { name: string; age: number };
const user: User = JSON.parse('{"name": "Asha", "age": 30}');
console.log(user.name.toUpperCase()); // ASHA -> now checked

const safer: unknown = JSON.parse('{"name": "Ravi"}');
if (typeof safer === "object" && safer !== null && "name" in safer) {
  console.log(safer.name); // Ravi -> narrowed step by step
}
