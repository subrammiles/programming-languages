/*
Custom narrowing functions
 type predicate:     function isX(v): v is X        -> true means v is X
 assertion function: function assertX(v): asserts v is X  -> throws if not
Since TypeScript 5.5, simple predicates like (x) => x !== undefined are INFERRED,
so .filter() removes undefined from the result type automatically.
*/

type User = { name: string; email: string };

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Record<string, unknown>).name === "string" &&
    typeof (value as Record<string, unknown>).email === "string"
  );
}

function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== "number") throw new TypeError(`expected a number, got ${typeof value}`);
}

const data: unknown = JSON.parse('{"name": "Asha", "email": "asha@example.com"}');
if (isUser(data)) {
  console.log(data.email); // narrowed to User
}

const input: unknown = 42;
assertIsNumber(input);
console.log(input.toFixed(1)); // 42.0 -> after the assertion, input is a number

try {
  assertIsNumber("42");
} catch (e) {
  console.log((e as Error).message); // expected a number, got string
}

const maybeNames = ["Asha", undefined, "Ravi", undefined];
const names = maybeNames.filter((n) => n !== undefined); // string[] (inferred predicate, TS 5.5)
console.log(names.map((n) => n.toUpperCase())); // [ 'ASHA', 'RAVI' ]
