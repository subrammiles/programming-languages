/*
The modern alternative to enums: a plain object "as const" plus a derived union type.
 - no generated code: runs with plain "node file.ts"
 - works with any string, e.g. values from JSON
 - the type is a simple union of literals
*/

const Status = {
  Active: "ACTIVE",
  Suspended: "SUSPENDED",
} as const;

type Status = (typeof Status)[keyof typeof Status]; // "ACTIVE" | "SUSPENDED"

function canLogIn(status: Status): boolean {
  return status === Status.Active;
}

console.log(canLogIn(Status.Active), canLogIn("SUSPENDED")); // true false
// canLogIn("DELETED"); // error TS2345
console.log(Object.values(Status)); // [ 'ACTIVE', 'SUSPENDED' ]

// Or simply a union of string literals, with no object at all:
type Direction = "up" | "down" | "left" | "right";
const move = (d: Direction) => `moving ${d}`;
console.log(move("left"));
