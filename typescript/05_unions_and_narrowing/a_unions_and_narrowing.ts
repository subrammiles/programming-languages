/*
A union type is "one of these types":  string | number
You can only use what ALL members have, until you NARROW the type with a check:
 typeof x === "string"     primitives
 Array.isArray(x)          arrays
 x instanceof Date         classes
 "prop" in x               objects with a property
 x === null / x !== undefined / truthiness
TypeScript follows your if/else and switch statements ("control flow analysis").
*/

function format(value: string | number | Date | string[] | null): string {
  if (value === null) return "nothing";
  if (typeof value === "string") return value.toUpperCase(); // value: string
  if (typeof value === "number") return value.toFixed(2); // value: number
  if (value instanceof Date) return value.toISOString().slice(0, 10); // value: Date
  return value.join(", "); // only string[] is left
}

console.log(format("hi"), format(3.14159), format(new Date(Date.UTC(2026, 9, 13))), format(["a", "b"]), format(null));
// HI 3.14 2026-10-13 a, b nothing

type Fish = { swim(): string };
type Bird = { fly(): string };

function move(animal: Fish | Bird): string {
  if ("swim" in animal) return animal.swim(); // narrowed to Fish
  return animal.fly(); // narrowed to Bird
}
console.log(move({ swim: () => "swimming" }), move({ fly: () => "flying" }));

function greet(name?: string): string {
  return name ? `Hello ${name}` : "Hello stranger"; // truthiness narrowing removes undefined
}
console.log(greet("Ravi"), "|", greet());
